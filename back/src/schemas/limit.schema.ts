import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type LimitDocument = HydratedDocument<Limit>;

@Schema()
export class Limit {

    _id?: Types.ObjectId

    @ApiProperty({ example: 'C-check', description: 'Inspection type' })
    @Prop({ required: true})
    title: string;

    @ApiProperty({ example: '25.05.2024', description: 'Inspection date' })
    @Prop({ required: false})
    lastInspDate: string;

    @ApiProperty({ example: '10526:00', description: 'FH at the time of last Inspection' })
    @Prop({ required: false})
    tsnAtLastInsp: string;

    @ApiProperty({ example: '10526', description: 'FC at the time of last Inspection' })
    @Prop({ required: false})
    csnAtLastInsp: string;

    @ApiProperty({ example: '25.05.2024', description: 'Inspection date' })
    @Prop({ required: false})
    nextInspDate: string;

    @ApiProperty({ example: '10526:00', description: 'FH at the time of last Inspection' })
    @Prop({ required: false})
    tsnAtNextInsp: string;

    @ApiProperty({ example: '10526', description: 'FC at the time of last Inspection' })
    @Prop({ required: false})
    csnAtNextInsp: string;

    // @ApiProperty({ example: 'FH', description: 'Dependence' })
    // @Prop({ required: true })
    // dependence: string;
   
    // @ApiProperty({ example: '10526:00', description: 'Threshold' })
    // @Prop({ required: true })
    // threshold: string;
}

export const LimitSchema = SchemaFactory.createForClass(Limit);