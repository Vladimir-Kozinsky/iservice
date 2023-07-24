import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAircraftDto } from 'src/dto/create-aircraft.dto';
import { InstallEngineDto } from 'src/dto/install-engine.dto';
import { Aircraft } from 'src/schemas/aircraft.schema';
import { Engine } from 'src/schemas/engine.schema';

@Injectable()
export class AircraftService {
    constructor(
        @InjectModel(Aircraft.name)
        private readonly aircraftModel: Model<Aircraft>,
        @InjectModel(Engine.name)
        private readonly engineModel: Model<Engine>,
    ) { }

    async add(createAircraftDto: CreateAircraftDto) {
        const aircraft = await this.aircraftModel.findOne({ msn: createAircraftDto.msn });
        if (aircraft) throw new HttpException('Aircraft with this msn already exists', HttpStatus.BAD_REQUEST);
        return await this.aircraftModel.create(createAircraftDto);
    }

    async getAircrafts() {
        const aircrafts = await this.aircraftModel.find();
        if (!aircrafts.length) throw new HttpException('Aircrafts not found', HttpStatus.BAD_REQUEST);
        return aircrafts;
    }

    async installEngine(installDataDto: InstallEngineDto) {
        const engine = await this.engineModel.findOne({ msn: installDataDto.engine });
        if (!engine) throw new HttpException('Engine not found', HttpStatus.BAD_REQUEST);
        const aircraft = await this.aircraftModel.findOne({ msn: installDataDto.aircraft });
        if (!aircraft) throw new HttpException('Aircraft not found', HttpStatus.BAD_REQUEST);

        engine.engineHistory.push(installDataDto);
        await engine.save();

        aircraft.engines.push(engine);
        await aircraft.save();

        return aircraft.engines;
    }
}
