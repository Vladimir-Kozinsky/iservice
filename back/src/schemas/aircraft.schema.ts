
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Limit, LimitSchema } from './limit.schema';
import { Leg } from './leg.schema';
import { Engine } from './engine.schema';
import { Apu } from './apu.schema';
import { Gear } from './gear.schema';

export type AircraftDocument = HydratedDocument<Aircraft>;

@Schema()
export class Aircraft {

    _id: Types.ObjectId

    @ApiProperty({ example: 'EX-76009', description: "Aircraft registration number" })
    @Prop({ required: true })
    regNum: string;

    @ApiProperty({ example: 'Boeing 737-300', description: "Aircraft type" })
    @Prop({ required: true })
    type: string;

    @ApiProperty({ example: 'A16WE', description: "Aircraft type certificate number" })
    @Prop({ required: true })
    typeCert: string;

    @ApiProperty({ example: '1989-01-30', description: "Aircraft manufacture date" })
    @Prop({ required: true })
    manufDate: string;

    @ApiProperty({ example: '25891', description: "Aircraft manufacturer's Serial Number" })
    @Prop({ required: true })
    msn: string;

    @ApiProperty({ example: '016', description: "Effectivity code" })
    @Prop({ required: true })
    code: string;

    @ApiProperty({ example: '61234', description: "Max Take-Off Cross Weight" })
    @Prop({ required: true })
    mtow: number;

    @ApiProperty({ example: '48307', description: "Max Zero Fuel Weight" })
    @Prop({ required: true })
    mzfw: number;

    @ApiProperty({ example: '51709', description: "Max Landing Weight" })
    @Prop({ required: true })
    mlw: number;

    @ApiProperty({ example: '61461', description: "Max Taxi Weight" })
    @Prop({ required: true })
    mtw: number;

    @ApiProperty({ example: '20104', description: "Fuel Capacity" })
    @Prop({ required: true })
    fuelCap: number;

    @ApiProperty({ example: '31138', description: "Basic Empty Weight" })
    @Prop({ required: true })
    bew: number;

    @ApiProperty({ example: '1.04', description: "Center of gravity" })
    @Prop({ required: true })
    cg: number;

    @ApiProperty({ example: '45231:00', description: "Aircraft FH at the time of adding to the system" })
    @Prop({ required: true })
    initFh: string;

    @ApiProperty({ example: '5231', description: "Aircraft FC at the time of adding to the system" })
    @Prop({ required: true })
    initFc: string;

    @ApiProperty({ example: '45231:00', description: "Current FH" })
    @Prop({ required: true })
    fh: string;

    @ApiProperty({ example: '4523', description: "Current FC" })
    @Prop({ required: true })
    fc: string;

    @ApiProperty({ example: '1, 25981', description: "Installed engines" })
    @Prop({ type: [mongoose.SchemaTypes.ObjectId], ref: 'Engine' })
    engines: Engine[];

    @ApiProperty({ example: 'none', description: "APU" })
    @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: 'Apu' })
    apu: Apu;

    @ApiProperty({ example: 'none', description: "Limit" })
    @Prop({ref: 'Limit'})
    limits: Limit[];

    @ApiProperty({ example: 'none', description: "Landing gears" })
    @Prop({ type: [mongoose.SchemaTypes.ObjectId], ref: 'Gear' })
    lgs: Gear[];

    @ApiProperty({ example: 'none', description: "Legs" })
    @Prop({ref: 'Leg'})
    legs: Leg[];
}

export const AircraftSchema = SchemaFactory.createForClass(Aircraft);

AircraftSchema.methods.reculcFhFc = function () {
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

    const fh = this.legs.reduce((prevValue, item, index) => {
        prevValue += toMins(item.flightTime);
        item.fh = minsToStr(prevValue);
        item.fc = +this.initFc + (+index + 1);
        return prevValue
    }, toMins(this.initFh))

    this.fh = minsToStr(fh);
    this.fc = +this.initFc + this.legs.length;
}