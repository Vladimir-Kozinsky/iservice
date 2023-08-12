import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Aircraft } from 'src/schemas/aircraft.schema';
import { Model, Types } from 'mongoose';
import { Leg } from 'src/schemas/leg.schema';
import { CreateLegDto } from 'src/dto/leg/create-leg.dto';
import { GetLegsDto } from 'src/dto/leg/get-legs.dto';

@Injectable()
export class LegService {
    constructor(
        @InjectModel(Leg.name)
        private readonly legModel: Model<Leg>,
        @InjectModel(Aircraft.name)
        private readonly aircraftModel: Model<Aircraft>,
    ) { }

    async getLegs(getLegsDto: GetLegsDto) {
        const pageLegs = 10;
        const legs = await this.legModel.find({ aircraft: getLegsDto.aircraft });
        if (!legs.length) throw new HttpException('Aircraft legs not found', HttpStatus.BAD_REQUEST);

        const filteredLegs = legs.filter((leg: Leg) => {
            const from = new Date(getLegsDto.from);
            const to = new Date(getLegsDto.to);
            const legDate = new Date(leg.depDate)
            return (legDate > from || legDate.getTime() === from.getTime())
                && (legDate < to || legDate.getTime() === to.getTime())
        })

        const sortedLegs = this.sortLegs(filteredLegs);

        const totalPages = Math.ceil(sortedLegs.length / pageLegs);

        const legsPortion = sortedLegs.splice(getLegsDto.page * pageLegs - pageLegs, pageLegs);

        const response = {
            totalPages: totalPages,
            currentPage: +getLegsDto.page,
            legs: legsPortion
        }
        return response;
    }

    async getLastTenLegs(aircraft: string) {
        const legs = await this.legModel.find({ aircraft: aircraft });
        if (!legs.length) throw new HttpException('Aircraft legs not found', HttpStatus.BAD_REQUEST);
        const sortedLegs = this.sortLegs(legs);
        return sortedLegs.splice(0, 10);

    }

    async createLeg(createLegDto: CreateLegDto) {
        return await this.legModel.create(createLegDto);
    }

    async deleteLeg(legId: Types.ObjectId) {
        const legForDelete = await this.legModel.findOne({ _id: legId });
        if (!legForDelete) throw new HttpException('Leg not found', HttpStatus.BAD_REQUEST);
        const leg = await this.legModel.findByIdAndRemove(legId);
        return leg;
    }

    private sortLegs(legs: Leg[]) {
        return legs.sort((a: Leg, b: Leg) => {
            const aLegDate = new Date(`${a.depDate} ${a.takeOff}`);
            const bLegDate = new Date(`${b.depDate} ${b.takeOff}`);
            if (aLegDate.getTime() < bLegDate.getTime()) return 1;
            if (aLegDate.getTime() > bLegDate.getTime()) return -1;
            return 0;
        })
    }
}