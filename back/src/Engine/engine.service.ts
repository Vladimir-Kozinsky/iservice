import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateEngineDto } from 'src/dto/create-engine.dto';
import { CreateLimitDto } from 'src/dto/create-limit.dto';
import { DeleteLimitDto } from 'src/dto/delete-limit.dto';
import { Engine } from 'src/schemas/engine.schema';
import { Limit } from 'src/schemas/limit.schema';

@Injectable()
export class EngineService {
    constructor(
        @InjectModel(Engine.name)
        private readonly engineModel: Model<Engine>,
        @InjectModel(Limit.name)
        private readonly limitModel: Model<Limit>,
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
        console.log(getEngineDto)
        const engine = await this.engineModel.findById(getEngineDto.id);
        if (!engine) throw new HttpException('Engine not found', HttpStatus.BAD_REQUEST);
        return engine;
    }

    async getEngineByMsn(getEngineByMsnDto: { msn: string }) {
        const engine = await this.engineModel.findOne({ msn: getEngineByMsnDto.msn });
        if (!engine) throw new HttpException('Engine not found', HttpStatus.BAD_REQUEST);
        return engine;
    }

    async addLimit(createLimitDto: CreateLimitDto) {
        const limit = await this.limitModel.create(createLimitDto);
        const engine = await this.engineModel.findOne({ msn: createLimitDto.msn });
        if (!engine) throw new HttpException('Engine not found', HttpStatus.BAD_REQUEST);
        engine.limits.push(limit);
        await engine.save();
        return limit;
    }

    async delLimit(deleteLimitDto: DeleteLimitDto) {
        const limit = await this.limitModel.deleteOne({ _id: deleteLimitDto.limitId });
        if (!limit.deletedCount) throw new HttpException('Limit not found', HttpStatus.BAD_REQUEST);

        const engine = await this.engineModel.findOne({ msn: deleteLimitDto.msn });
        if (!engine) throw new HttpException('Engine not found', HttpStatus.BAD_REQUEST);

        const index = engine.limits.findIndex((limit: Limit) => limit._id.toString() == deleteLimitDto.limitId)
        if (index < 0) throw new HttpException('Limit has already deleted', HttpStatus.BAD_REQUEST);

        engine.limits.splice(index, 1);
        await engine.save()

        return deleteLimitDto.limitId;
    }
}
