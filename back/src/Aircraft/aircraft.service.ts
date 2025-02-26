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
import { Gear } from 'src/schemas/gear.schema';
import { InstallGearDto } from 'src/dto/install-gear.dto';

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
        @InjectModel(Gear.name)
        private readonly gearModel: Model<Gear>,
    ) { }

    async add(createAircraftDto: CreateAircraftDto) {
        const aircraft = await this.aircraftModel.findOne({ msn: createAircraftDto.msn });
        if (aircraft) throw new HttpException('Aircraft with this msn already exists', HttpStatus.BAD_REQUEST);
        return await this.aircraftModel.create(createAircraftDto);
    }

    async getAircrafts() {
        const aircrafts = await this.aircraftModel.find()
            .populate('apu');//.populate('limits');//.populate('lgs');
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

        const engine = await this.engineModel.findOne({ _id: removalDataDto.engine });
        if (!engine) throw new HttpException('Engine not found', HttpStatus.BAD_REQUEST);

        const aircraft = await this.aircraftModel.findOne({ msn: removalDataDto.aircraft });
        if (!aircraft) throw new HttpException('Aircraft not found', HttpStatus.BAD_REQUEST);

        const index = aircraft.engines.findIndex((engine: Engine) => engine._id.toString() === removalDataDto.engine)
        if (index < 0) throw new HttpException('Engine has already removed', HttpStatus.BAD_REQUEST);
        aircraft.engines.splice(index, 1);
        await aircraft.save();

        const removalData = Object.assign(removalDataDto, { engine: engine.msn });
        engine.engineHistory.push(removalData);
        engine.position = 0;
        await engine.save();     

        return engine;
    }

    async removeApu(removalDataDto: InstallApuDto) {

        const apu = await this.apuModel.findOne({ msn: removalDataDto.apu });
        if (!apu) throw new HttpException('Engine not found', HttpStatus.BAD_REQUEST);

        const aircraft = await this.aircraftModel.findOne({ msn: removalDataDto.aircraft });
        if (!aircraft) throw new HttpException('Aircraft not found', HttpStatus.BAD_REQUEST);

        apu.apuHistory.push(removalDataDto);
        await apu.save();


        aircraft.apu = null;
        await aircraft.save();

        return apu;
    }

    async addLimit(createLimitDto: CreateLimitDto) {
        const limit = await this.limitModel.create(createLimitDto);
        const aircraft = await this.aircraftModel.findOne({ msn: createLimitDto.msn })
            .populate('apu');
        if (!aircraft) throw new HttpException('Aircraft not found', HttpStatus.BAD_REQUEST);
        aircraft.limits.push(limit);
        await aircraft.save();

        await this.limitModel.findByIdAndRemove(limit._id);
        return aircraft;
    }

    async delLimit(deleteLimitDto: DeleteLimitDto) {
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

    async installGear(installDataDto: InstallGearDto) {
        const gear = await this.gearModel.findOne({ sn: installDataDto.gear });
        if (!gear) throw new HttpException('Gear is not found', HttpStatus.BAD_REQUEST);
        const aircraft = await this.aircraftModel.findOne({ msn: installDataDto.aircraft });
        if (!aircraft) throw new HttpException('Aircraft not found', HttpStatus.BAD_REQUEST);


        const installedGear = aircraft.lgs.find((gear: Gear) => gear.sn === installDataDto.gear);
        if (installedGear) throw new HttpException('Gear has already installed', HttpStatus.BAD_REQUEST);

        const isEmptyGearPos = aircraft.lgs.find((gear: Gear) => gear.pos === installDataDto.position);
        if (isEmptyGearPos) throw new HttpException(`Gear has already installed on ${installDataDto.position} position`, HttpStatus.BAD_REQUEST);

        gear.gearHistory.push(installDataDto);
        gear.pos = installDataDto.position;
        await gear.save();

        aircraft.lgs.push(gear);
        await aircraft.save();

        return gear;
    }

    async removeGear(removalDataDto: InstallGearDto) {

        const gear = await this.gearModel.findOne({ sn: removalDataDto.gear });
        if (!gear) throw new HttpException('Gear not found', HttpStatus.BAD_REQUEST);

        const aircraft = await this.aircraftModel.findOne({ msn: removalDataDto.aircraft });
        if (!aircraft) throw new HttpException('Aircraft not found', HttpStatus.BAD_REQUEST);

        gear.gearHistory.push(removalDataDto);
        await gear.save();

        const index = aircraft.lgs.findIndex((g: Gear) => g._id.toString() === gear._id.toString())

        if (index < 0) throw new HttpException('Gear has already removed', HttpStatus.BAD_REQUEST);
        aircraft.lgs.splice(index, 1);
        await aircraft.save();

        return gear;
    }

}
