import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateEngineDto } from 'src/dto/create-engine.dto';
import { DeleteLimitDto } from 'src/dto/delete-limit.dto';
import { Engine } from 'src/schemas/engine.schema';
import { Cfm56Limit } from 'src/schemas/cfm56Limit.schema';
import { CreateCfm56LimitDto } from 'src/dto/create-engineLimit.dto';
import { DeleteEngineLLPDto } from 'src/dto/engine/delete-engineLLP.dto';

@Injectable()
export class EngineService {
    constructor(
        @InjectModel(Engine.name)
        private readonly engineModel: Model<Engine>,
        @InjectModel(Cfm56Limit.name)
        private readonly engineLimitModel: Model<Cfm56Limit>,
    ) { }

    async add(createEngineDto: CreateEngineDto) {
        const engine = await this.engineModel.findOne({ msn: createEngineDto.msn });
        if (engine) throw new HttpException('Engine with this msn already exists', HttpStatus.BAD_REQUEST);
        createEngineDto.initFh = createEngineDto.tsn;
        createEngineDto.initFc = createEngineDto.csn;
        return await this.engineModel.create(createEngineDto);
    }

    async getEngines() {
        const engines = await this.engineModel.find();
        if (!engines.length) throw new HttpException('Engines not found', HttpStatus.BAD_REQUEST);
        return engines;
    }

    async getEngine(getEngineDto: { id: Types.ObjectId }) {
        const engine = await this.engineModel.findById(getEngineDto.id);
        if (!engine) throw new HttpException('Engine not found', HttpStatus.BAD_REQUEST);
        return engine;
    }

    async getEngineByMsn(getEngineByMsnDto: { msn: string }) {
        const engine = await this.engineModel.findOne({ msn: getEngineByMsnDto.msn });
        if (!engine) throw new HttpException('Engine not found', HttpStatus.BAD_REQUEST);
        return engine;
    }

    async addLimit(createEngineLimitDto: CreateCfm56LimitDto) {
        const limit = await this.engineLimitModel.create(createEngineLimitDto);
        const engine = await this.engineModel.findOne({ msn: createEngineLimitDto.esn });
        if (!engine) throw new HttpException('Engine not found', HttpStatus.BAD_REQUEST);
        engine.limits.push(limit);
        await engine.save();
        await this.engineLimitModel.findByIdAndRemove(limit._id);
        return limit;
    }

    async delLimit(deleteLimitDto: DeleteEngineLLPDto) {
        const engine = await this.engineModel.findOne({ msn: deleteLimitDto.msn });
        if (!engine) throw new HttpException('Engine not found', HttpStatus.BAD_REQUEST);

        const index = engine.limits.findIndex((limit: Cfm56Limit) => limit.sn == deleteLimitDto.sn)
        if (index < 0) throw new HttpException('Limit has already deleted', HttpStatus.BAD_REQUEST);

        engine.limits.splice(index, 1);
        await engine.save()

        return deleteLimitDto.sn;
    }

    async updateEngineLLP(eng: { esn: string }) {
        const engine = await this.engineModel.findOne({ msn: eng.esn });
        if (!engine) throw new HttpException('Engine not found', HttpStatus.BAD_REQUEST);

        const updateLimits = this.reculcEngineLLP(engine);

        const updatedEngine = await this.engineModel.updateOne({ msn: eng.esn }, { $set: { limits: updateLimits } })



        const engines = await this.engineModel.find();
        if (!engines.length) throw new HttpException('Engines not found', HttpStatus.BAD_REQUEST);

        console.log(updatedEngine);
        return engines;
    }

    private reculcEngineLLP(engine: Engine): [Cfm56Limit] {
        const updatedLimits = engine.limits.map((limit: Cfm56Limit) => {
            const updatedLimit = (+engine.csn - (+limit.engCsn)) + (+limit.csnA)
            limit.csnA = updatedLimit.toString();
            return limit
        }) as [Cfm56Limit]
        return updatedLimits;
    }
}
