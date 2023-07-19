
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Limit } from './limit.schema';

export type EngineDocument = HydratedDocument<Engine>;

@Schema()
export class Engine {
    _id: Types.ObjectId

    @ApiProperty({ example: 'CFM56-3C1', description: "Engine type" })
    @Prop({ required: true })
    type: string;

    @ApiProperty({ example: '25891', description: "Engine manufacturer's Serial Number" })
    @Prop({ required: true })
    msn: string;

    @ApiProperty({ example: '1989-01-30', description: "Engine manufacturere date" })
    @Prop({ required: true })
    manufDate: string;

    @ApiProperty({ example: '45697:00', description: "Engine Time Since New" })
    @Prop({ required: true })
    tsn: string;

    @ApiProperty({ example: '45697:00', description: "Engine Time Since New" })
    @Prop({ ref: 'EngineHistory' })
    engineHistory: EngineHistory

    @ApiProperty({ example: '4', description: "The number of engine overhauls." })
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

    @ApiProperty({ example: 'none', description: "Limit" })
    @Prop({ ref: 'Limit' })
    limits: [Limit];

}

export const EngineSchema = SchemaFactory.createForClass(Engine);