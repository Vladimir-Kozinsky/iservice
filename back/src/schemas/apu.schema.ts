
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Limit } from './limit.schema';
import { ApuHistory } from './apuHistory.schema';

export type ApuDocument = HydratedDocument<Apu>;

@Schema()
export class Apu {
    _id: Types.ObjectId

    @ApiProperty({ example: 'TA-6A', description: "APU type" })
    @Prop({ required: true })
    type: string;

    @ApiProperty({ example: '25891', description: "APU manufacturer's Serial Number" })
    @Prop({ required: true })
    msn: string;

    @ApiProperty({ example: '1989-01-30', description: "APU manufacturere date" })
    @Prop({ required: true })
    manufDate: string;

    @ApiProperty({ example: 'CFM', description: "Engine manufacturer" })
    @Prop({ required: true })
    manuf: string;

    @ApiProperty({ example: '45697:00', description: "APU Time Since New" })
    @Prop({ required: true })
    tsn: string;

    @ApiProperty({ example: '45697:00', description: "APU Time Since New" })
    @Prop({ required: true })
    csn: string;

    @ApiProperty({ example: '45697:00', description: "APU Time Since New" })
    @Prop({ ref: 'ApuHistory' })
    apuHistory: [ApuHistory]

    @ApiProperty({ example: '4', description: "The number of APU overhauls." })
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
    @Prop({ type: [mongoose.SchemaTypes.ObjectId], ref: 'Limit' })
    limits: [Limit];

}

export const ApuSchema = SchemaFactory.createForClass(Apu);