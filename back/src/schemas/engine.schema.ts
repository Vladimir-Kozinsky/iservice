
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { EngineHistory } from './engineHistory.schema';
import { Leg } from './leg.schema';
import { Cfm56Limit } from './cfm56Limit.schema';

export type EngineDocument = HydratedDocument<Engine>;

@Schema()
export class Engine {
    _id: Types.ObjectId

    @ApiProperty({ example: 'CFM56-3C1', description: "Engine type" })
    @Prop({ required: true })
    type: string;

    @ApiProperty({ example: '20000', description: "Engine Thrust Rating" })
    @Prop({ required: true })
    thrust: string;

    @ApiProperty({ example: '25891', description: "Engine manufacturer's Serial Number" })
    @Prop({ required: true })
    msn: string;

    @ApiProperty({ example: '1989-01-30', description: "Engine manufacturere date" })
    @Prop({ required: true })
    manufDate: string;

    @ApiProperty({ example: 'CFM', description: "Engine manufacturer" })
    @Prop({ required: true })
    manuf: string;

    @ApiProperty({ example: '1', description: "Engine position" })
    @Prop({ required: false })
    position: number;

    @ApiProperty({ example: '45231:00', description: "Engine tsn at the time of adding to the system" })
    @Prop({ required: true })
    initFh: string;

    @ApiProperty({ example: '5231', description: "Engine csn at the time of adding to the system" })
    @Prop({ required: true })
    initFc: string;

    @ApiProperty({ example: '45697:00', description: "Engine Time Since New" })
    @Prop({ required: true })
    tsn: string;

    @ApiProperty({ example: '4569', description: "Engine Cycles Since New" })
    @Prop({ required: true })
    csn: string;

    @ApiProperty({ example: 'none', description: "Engine removal/instolation action" })
    @Prop({ ref: 'EngineHistory' })
    engineHistory: [EngineHistory]

    @ApiProperty({ example: '2024-01-30', description: "Last overhaul date" })
    @Prop({ required: false })
    lastOverhaulDate: string;

    @ApiProperty({ example: '45231:00', description: "FH at the time of last overhaul" })
    @Prop({ required: false })
    tsnAtLastOverhaul: string;

    @ApiProperty({ example: '4523', description: "FC at the time of last overhaul" })
    @Prop({ required: false })
    csnAtLastOverhaul: string;

    @ApiProperty({ example: 'none', description: "Limit" })
    @Prop({ ref: 'Cfm56Limit' })
    limits: [Cfm56Limit];

    @ApiProperty({ example: 'none', description: "Legs" })
    @Prop({ ref: 'Leg' })
    legs: Leg[];
}

export const EngineSchema = SchemaFactory.createForClass(Engine);


