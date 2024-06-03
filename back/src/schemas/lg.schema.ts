
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type LgDocument = HydratedDocument<Lg>;

@Schema()
export class Lg {
    _id: Types.ObjectId

    @ApiProperty({ example: '65-73762-21', description: "LG part number" })
    @Prop({ required: true })
    pn: string;

    @ApiProperty({ example: 'BN0876', description: "LG serial number" })
    @Prop({ required: true })
    sn: string;

    @ApiProperty({ example: '2024-01-30', description: "Last overhaul date" })
    @Prop({ required: true })
    lastOverhaulDate: string;

    @ApiProperty({ example: '4569', description: "LG Cycles Since New" })
    @Prop({ required: true })
    csn: string;

    @ApiProperty({ example: '4523', description: "FC at the time of last overhaul" })
    @Prop({ required: true })
    csnAtLastOverhaul: string;
}

export const LgSchema = SchemaFactory.createForClass(Lg);