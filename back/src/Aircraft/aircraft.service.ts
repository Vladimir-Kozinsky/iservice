import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAircraftDto } from 'src/dto/create-aircraft.dto';
import { Aircraft } from 'src/schemas/aircraft.schema';

@Injectable()
export class AircraftService {
    constructor(
        @InjectModel(Aircraft.name)
        private readonly aircraftModel: Model<Aircraft>,
    ) { }

    async add(createAircraftDto: CreateAircraftDto) {
        const aircraft = await this.aircraftModel.findOne({ msn: createAircraftDto.msn });
        if (aircraft) throw new HttpException('Aircraft with this msn already exists', HttpStatus.BAD_REQUEST);
        return await this.aircraftModel.create(createAircraftDto)
    }

    async getAircrafts() {
        const aircrafts = await this.aircraftModel.find();
        if (!aircrafts.length) throw new HttpException('Aircraft not found', HttpStatus.BAD_REQUEST);
        return aircrafts;
    }
}
