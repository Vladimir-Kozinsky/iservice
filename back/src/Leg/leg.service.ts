import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Aircraft } from 'src/schemas/aircraft.schema';
import { Model } from 'mongoose';
import { Leg } from 'src/schemas/leg.schema';

@Injectable()
export class LegService {
    constructor(
        @InjectModel(Leg.name)
        private readonly legModel: Model<Leg>,
        @InjectModel(Aircraft.name)
        private readonly aircraftModel: Model<Aircraft>,
    ) { }

    async getLegs() {
        const legs = await this.legModel.find();
        if (!legs.length) throw new HttpException('Aircraft legs not found', HttpStatus.BAD_REQUEST);
        return legs;
    }

    async createLeg(createLegDto) {

    }

}
