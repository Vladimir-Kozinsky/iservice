
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { GearHistory } from './gearHistory.schema';
import { Leg } from './leg.schema';
import { GearLimit } from './gearLimit.schema';

export type GearDocument = HydratedDocument<Gear>;

@Schema()
export class Gear {
    _id: Types.ObjectId;

    @ApiProperty({ example: 'NLG', description: "LG position" })
    @Prop({ required: true })
    pos: string;

    @ApiProperty({ example: '65-73762-21', description: "LG part number" })
    @Prop({ required: true })
    pn: string;

    @ApiProperty({ example: 'BN0876', description: "LG serial number" })
    @Prop({ required: true })
    sn: string;

    @ApiProperty({ example: '45231:00', description: "Engine tsn at the time of adding to the system" })
    @Prop({ required: true })
    initFh: string;

    @ApiProperty({ example: '5231', description: "Engine csn at the time of adding to the system" })
    @Prop({ required: true })
    initFc: string;

    @ApiProperty({ example: '4523:00', description: "LG total FH" })
    @Prop({ required: false })
    tsn: string;

    @ApiProperty({ example: '4523', description: "LG total FC" })
    @Prop({ required: true })
    csn: string;

    @ApiProperty({ example: '2024-01-30', description: "Last inspection date" })
    @Prop({ required: true })
    lastInspDate: string;

    @ApiProperty({ example: '4523:00', description: "FH at the time of last Inspection" })
    @Prop({ required: true })
    tsnAtLastInsp: string;

    @ApiProperty({ example: '4523', description: "FC at the time of last Inspection" })
    @Prop({ required: true })
    csnAtLastInsp: string;

    @ApiProperty({ example: '25.05.2024', description: 'Next inspection date' })
    @Prop({ required: false })
    nextInspDate: string;

    @ApiProperty({ example: '10526:00', description: 'FH at the time of last Inspection' })
    @Prop({ required: false })
    tsnAtNextInsp: string;

    @ApiProperty({ example: '10526', description: 'FC at the time of last Inspection' })
    @Prop({ required: false })
    csnAtNextInsp: string;

    @ApiProperty({ example: 'none', description: "LG removal/instolation action" })
    @Prop({ ref: 'GearHistory' })
    gearHistory: [GearHistory];

    @ApiProperty({ example: 'none', description: "Legs" })
    @Prop({ ref: 'Leg' })
    legs: Leg[];

    @ApiProperty({ example: 'none', description: "Limits" })
    @Prop({ ref: 'GearLimit' })
    limits: GearLimit[];
}

export const GearSchema = SchemaFactory.createForClass(Gear);