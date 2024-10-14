import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Aircraft } from 'src/schemas/aircraft.schema';
import { Model, Types } from 'mongoose';
import { Leg } from 'src/schemas/leg.schema';
import { CreateLegDto } from 'src/dto/leg/create-leg.dto';
import { GetLegsDto } from 'src/dto/leg/get-legs.dto';
import { GetPrintLegsDto } from 'src/dto/leg/get-print-legs.dto';
import { DeleteLegDto } from 'src/dto/leg/delete-leg.dto';
import { Engine } from 'src/schemas/engine.schema';
import { CreateLgDto } from 'src/dto/create-lg.dto';

@Injectable()
export class LegService {
    constructor(
        @InjectModel(Leg.name)
        private readonly legModel: Model<Leg>,
        @InjectModel(Aircraft.name)
        private readonly aircraftModel: Model<Aircraft>,
        @InjectModel(Engine.name)
        private readonly engineModel: Model<Engine>,
    ) { }

    async getLegs(getLegsDto: GetLegsDto) {
        const pageLegs = 10;

        const aircraft = await this.aircraftModel.findOne({ msn: getLegsDto.aircraft });
        if (!aircraft) throw new HttpException('Aircraft not found', HttpStatus.BAD_REQUEST);

        const legs = aircraft.legs;
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

    async getLastTenLegs(aircraftMsn: string) {
        const aircraft = await this.aircraftModel.findOne({ msn: aircraftMsn });
        if (!aircraft) throw new HttpException('Aircraft not found', HttpStatus.BAD_REQUEST);
        const legs = aircraft.legs;
        if (!legs.length) throw new HttpException('Aircraft legs not found', HttpStatus.BAD_REQUEST);
        const sortedLegs = this.sortLegs(legs);
        return sortedLegs.splice(0, 10);
    }

    async getPrintLegs(getPrintLegsDto: GetPrintLegsDto) {
       // const legs = await this.legModel.find({ aircraft: getPrintLegsDto.aircraft });
        const aircraft = await this.aircraftModel.findOne({ msn: getPrintLegsDto.aircraft });
        if (!aircraft) throw new HttpException('Aircraft not found', HttpStatus.BAD_REQUEST);
        if (!aircraft.legs.length) throw new HttpException('Aircraft legs not found', HttpStatus.BAD_REQUEST);
        
        const filteredLegs = aircraft.legs.filter((leg: Leg) => {
            const from = new Date(getPrintLegsDto.from);
            const to = new Date(getPrintLegsDto.to);
            const legDate = new Date(leg.depDate)
            return (legDate > from || legDate.getTime() === from.getTime())
                && (legDate < to || legDate.getTime() === to.getTime())
        })
        const sortedLegs = this.sortLegs(filteredLegs);
        return sortedLegs;
    }

    async createLeg(createLegDto: CreateLegDto) {
        const newLeg = await this.legModel.create(createLegDto);
        //const update = await this.aircraftModel.updateOne({ msn: createLegDto.aircraft }, { $push: { legs: createLegDto } });

        // ADD LEG FOR AIRCRAFT
        const aircraft = await this.aircraftModel.findOne({ msn: createLegDto.aircraft });
        if (!aircraft) throw new HttpException('Aircraft not found', HttpStatus.BAD_REQUEST);
        aircraft.legs.push(newLeg);
        await aircraft.save();


        const updatedAircraft = await this.aircraftModel.findOne({ msn: createLegDto.aircraft });
        if (!updatedAircraft) throw new HttpException('Aircraft not found', HttpStatus.BAD_REQUEST);

        const sortedLegs = this.sortLegs(updatedAircraft.legs);
        updatedAircraft.legs = this.reculcLegsFhFc(sortedLegs, updatedAircraft.initFh, updatedAircraft.initFc);

        const updatedFfFc = this.reculcFhFc(updatedAircraft);

        updatedAircraft.fh = updatedFfFc.fh;
        updatedAircraft.fc = updatedFfFc.fc;


        await updatedAircraft.save();


        // ADD LEG FOR ENG
        createLegDto.engines.forEach(async (eng: { msn: string }) => {
            const engine = await this.engineModel.findOne({ msn: eng.msn });
            if (!engine) throw new HttpException('Engine not found', HttpStatus.BAD_REQUEST);
            engine.legs.push(newLeg);
            await engine.save();

            const updatedEngine = await this.engineModel.findOne({ msn: eng.msn });
            if (!engine) throw new HttpException('Engine not found', HttpStatus.BAD_REQUEST);

            const sortedLegs = this.sortLegs(updatedEngine.legs);
            updatedEngine.legs = this.reculcLegsFhFc(sortedLegs, updatedEngine.initFh, updatedEngine.initFc);
            const updatedFfFc = this.reculcFhFc(updatedEngine);
            updatedEngine.tsn = updatedFfFc.fh;
            updatedEngine.csn = updatedFfFc.fc;
            await updatedEngine.save();
        })


        await this.legModel.findByIdAndRemove(newLeg._id);
        return updatedAircraft;
    }

    async deleteLeg(deleteLegDto: Leg) {
        const aircraft = await this.aircraftModel.findOne({ msn: deleteLegDto.aircraft });
        const index = aircraft.legs.findIndex((leg: Leg) => leg._id.toString() === deleteLegDto._id.toString());
        aircraft.legs.splice(index, 1);
        aircraft.legs = this.reculcLegsFhFc(aircraft.legs, aircraft.initFh, aircraft.initFc);
        const updatedFfFc = this.reculcFhFc(aircraft);
        aircraft.fh = updatedFfFc.fh;
        aircraft.fc = updatedFfFc.fc;
        await aircraft.save();

        // DEL LEG FOR ENG
        deleteLegDto.engines.forEach(async (eng: { msn: string }) => {
            const engine = await this.engineModel.findOne({ msn: eng.msn });
            if (!engine) throw new HttpException('Engine not found', HttpStatus.BAD_REQUEST);
            const index = engine.legs.findIndex((leg: Leg) => leg._id.toString() === deleteLegDto._id.toString());
            engine.legs.splice(index, 1);
            await engine.save();

            const updatedEngine = await this.engineModel.findOne({ msn: eng.msn });
            if (!engine) throw new HttpException('Engine not found', HttpStatus.BAD_REQUEST);

            const sortedLegs = this.sortLegs(updatedEngine.legs);
            updatedEngine.legs = this.reculcLegsFhFc(sortedLegs, updatedEngine.initFh, updatedEngine.initFc);
            const updatedFfFc = this.reculcFhFc(updatedEngine);
            updatedEngine.tsn = updatedFfFc.fh;
            updatedEngine.csn = updatedFfFc.fc;
            await updatedEngine.save();
        })

        return deleteLegDto._id;
    }

    private sortLegs(legs: Leg[]) {
        return legs.sort((a: Leg, b: Leg) => {
            const aLegDate = new Date(`${a.depDate} ${a.takeOff}`);
            const bLegDate = new Date(`${b.depDate} ${b.takeOff}`);
            if (aLegDate.getTime() < bLegDate.getTime()) return -1;
            if (aLegDate.getTime() > bLegDate.getTime()) return 1;
            return 0;
        })
    }


    private reculcFhFc(aircraft: Aircraft | Engine) {

        const toMins = (str) => {
            const hh = +str.split(':')[0] * 60;
            const mm = +str.split(':')[1];
            return hh + mm
        }

        const minsToStr = (mins) => {
            const hh = Math.floor(mins / 60);
            const mm = mins % 60;
            return `${hh}:${mm}`;
        }

        const fh = aircraft.legs.reduce((prevValue, item, index) => {
            prevValue += toMins(item.flightTime);
            item.fh = minsToStr(prevValue);
            item.fc = (+aircraft.initFc + (+index + 1)).toString();
            return prevValue
        }, toMins(aircraft.initFh))

        return {
            fh: minsToStr(fh),
            fc: (+aircraft.initFc + aircraft.legs.length).toString()
        }
    }

    private reculcLegsFhFc(legs: Leg[], initFh: string, initFc: string) {

        const toMins = (str) => {
            //console.log(str);
            const hh = +str.split(':')[0] * 60;
            const mm = +str.split(':')[1];
            return hh + mm
        }

        const minsToStr = (mins) => {
            const hh = Math.floor(mins / 60);
            const mm = mins % 60;
            return `${hh}:${mm}`;
        }

        const sortedLegs = this.sortLegs(legs);
        const updatedFhFcLegs = sortedLegs.map((leg: Leg, index: number, legs: Leg[]) => {
            if (index == 0) {
                leg.fh = minsToStr(toMins(initFh) + toMins(leg.flightTime));
                leg.fc = (+initFc + 1).toString()
                return leg;
            } else {
                const prevFh = legs[index - 1].fh;
                const prevFc = legs[index - 1].fc;
                leg.fh = minsToStr(toMins(prevFh) + toMins(leg.flightTime));
                leg.fc = (+prevFc + 1).toString()
                return leg;
            }
        })
        return updatedFhFcLegs;
    }

}