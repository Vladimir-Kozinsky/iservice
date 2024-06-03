
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Limit, LimitSchema } from './limit.schema';
import { Leg } from './leg.schema';
import { Engine } from './engine.schema';
import { Apu } from './apu.schema';
import { Lg } from './lg.schema';

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

    @ApiProperty({ example: 'A16WE', description: "Aircraft type certificate Number" })
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

    @ApiProperty({ example: '4', description: "The number of aircraft overhauls." })
    @Prop({ required: false })
    overhaulNum: number;

    @ApiProperty({ example: '2024-01-30', description: "Last overhaul date" })
    @Prop({ required: false })
    lastOverhaulDate: string;

    @ApiProperty({ example: '45231:00', description: "FH at the time of last overhaul" })
    @Prop({ required: false })
    tsnAtLastOverhaul: string;

    @ApiProperty({ example: '4523', description: "FC at the time of last overhaul" })
    @Prop({ required: false })
    csnAtLastOverhaul: string;

    @ApiProperty({ example: '1, 25981', description: "Installed engines" })
    @Prop({ ref: 'Engine' })
    engines: Engine[];

    @ApiProperty({ example: 'none', description: "APU" })
    @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: 'Apu' })
    apu: Apu;

    @ApiProperty({ example: 'none', description: "Limit" })
    @Prop({ type: [mongoose.SchemaTypes.ObjectId], ref: 'Limit' })
    limits: Limit[];

    @ApiProperty({ example: 'none', description: "Landing gears" })
    @Prop({ type: [mongoose.SchemaTypes.ObjectId], ref: 'Lg' })
    lgs: Lg[];
}

export const AircraftSchema = SchemaFactory.createForClass(Aircraft);