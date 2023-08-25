import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAircraftDto } from 'src/dto/create-aircraft.dto';
import { CreateLimitDto } from 'src/dto/create-limit.dto';
import { DeleteLimitDto } from 'src/dto/delete-limit.dto';
import { InstallApuDto } from 'src/dto/apu/install-apu.dto';
import { InstallEngineDto } from 'src/dto/install-engine.dto';
import { Aircraft } from 'src/schemas/aircraft.schema';
import { Apu } from 'src/schemas/apu.schema';
import { Engine } from 'src/schemas/engine.schema';
import { Limit } from 'src/schemas/limit.schema';

@Injectable()
export class AircraftService {
    constructor(
        @InjectModel(Aircraft.name)
        private readonly aircraftModel: Model<Aircraft>,
        @InjectModel(Engine.name)
        private readonly engineModel: Model<Engine>,
        @InjectModel(Apu.name)
        private readonly apuModel: Model<Apu>,
        @InjectModel(Limit.name)
        private readonly limitModel: Model<Limit>,
    ) { }

    async add(createAircraftDto: CreateAircraftDto) {
        const aircraft = await this.aircraftModel.findOne({ msn: createAircraftDto.msn });
        if (aircraft) throw new HttpException('Aircraft with this msn already exists', HttpStatus.BAD_REQUEST);
        return await this.aircraftModel.create(createAircraftDto);
    }

    async getAircrafts() {
        const aircrafts = await this.aircraftModel.find()
            .populate('apu').populate('limits');
        if (!aircrafts.length) throw new HttpException('Aircrafts not found', HttpStatus.BAD_REQUEST);
        return aircrafts;
    }

    async installEngine(installDataDto: InstallEngineDto) {
        const engine = await this.engineModel.findOne({ msn: installDataDto.engine });
        if (!engine) throw new HttpException('Engine not found', HttpStatus.BAD_REQUEST);
        const aircraft = await this.aircraftModel.findOne({ msn: installDataDto.aircraft });
        if (!aircraft) throw new HttpException('Aircraft not found', HttpStatus.BAD_REQUEST);


        const installedEngine = aircraft.engines.find((engine: Engine) => engine.msn === installDataDto.engine);
        if (installedEngine) throw new HttpException('Engine has already installed', HttpStatus.BAD_REQUEST);

        const isEmptyEnginePos = aircraft.engines.find((engine: Engine) => engine.position === installDataDto.position);
        if (isEmptyEnginePos) throw new HttpException(`Engine has already installed on ${installDataDto.position} position`, HttpStatus.BAD_REQUEST);

        engine.engineHistory.push(installDataDto);
        engine.position = installDataDto.position;
        await engine.save();

        aircraft.engines.push(engine);
        await aircraft.save();

        return engine;
    }

    async installApu(installDataDto: InstallApuDto) {
        const apu = await this.apuModel.findOne({ msn: installDataDto.apu });
        if (!apu) throw new HttpException('Apu not found', HttpStatus.BAD_REQUEST);
        const aircraft = await this.aircraftModel.findOne({ msn: installDataDto.aircraft });
        if (!aircraft) throw new HttpException('Aircraft not found', HttpStatus.BAD_REQUEST);

        const installedApu = aircraft.apu;
        if (installedApu) throw new HttpException('Apu has already installed', HttpStatus.BAD_REQUEST);
        aircraft.apu = apu;
        await aircraft.save();

        apu.apuHistory.push(installDataDto);
        await apu.save();

        return apu;
    }

    async removeEngine(removalDataDto: InstallEngineDto) {

        const engine = await this.engineModel.findOne({ msn: removalDataDto.engine });
        if (!engine) throw new HttpException('Engine not found', HttpStatus.BAD_REQUEST);

        const aircraft = await this.aircraftModel.findOne({ msn: removalDataDto.aircraft });
        if (!aircraft) throw new HttpException('Aircraft not found', HttpStatus.BAD_REQUEST);

        engine.engineHistory.push(removalDataDto);
        engine.position = 0;
        await engine.save();

        const index = aircraft.engines.findIndex((engine: Engine) => engine.msn === removalDataDto.engine)
        if (index < 0) throw new HttpException('Engine has already removed', HttpStatus.BAD_REQUEST);
        aircraft.engines.splice(index, 1);
        await aircraft.save();

        return engine;
    }

    async addLimit(createLimitDto: CreateLimitDto) {
        const limit = await this.limitModel.create(createLimitDto);
        const aircraft = await this.aircraftModel.findOne({ msn: createLimitDto.msn });
        if (!aircraft) throw new HttpException('Aircraft not found', HttpStatus.BAD_REQUEST);
        aircraft.limits.push(limit);
        await aircraft.save();
        return limit;
    }

    async delLimit(deleteLimitDto: DeleteLimitDto) {
        const limit = await this.limitModel.deleteOne({ _id: deleteLimitDto.limitId });
        if (!limit.deletedCount) throw new HttpException('Limit not found', HttpStatus.BAD_REQUEST);

        const aircraft = await this.aircraftModel.findOne({ msn: deleteLimitDto.msn });
        if (!aircraft) throw new HttpException('Aircraft not found', HttpStatus.BAD_REQUEST);

        const index = aircraft.limits.findIndex((limit: Limit) => limit._id.toString() == deleteLimitDto.limitId)
        if (index < 0) throw new HttpException('Limit has already deleted', HttpStatus.BAD_REQUEST);

        aircraft.limits.splice(index, 1);
        await aircraft.save()

        return deleteLimitDto.limitId;
    }

    async updateLimit(deleteLimitDto: DeleteLimitDto) {
        const limit = await this.limitModel.updateOne({ _id: deleteLimitDto.limitId }, { dependence: "fc" });
        if (!limit) throw new HttpException('Limit not found', HttpStatus.BAD_REQUEST);

        const aircraft = await this.aircraftModel.findOne({ msn: deleteLimitDto.msn }).populate('limits');

        return limit
    }

}
