import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';

export type LimitDocument = HydratedDocument<GearLimit>;

@Schema()
export class GearLimit {

    _id?: Types.ObjectId

    @ApiProperty({ example: '25005:00', description: 'Gear TSN' })
    @Prop({ required: true })
    gearTsn: string;

    @ApiProperty({ example: '25005', description: 'Gear CSN' })
    @Prop({ required: true })
    gearCsn: string;

    @ApiProperty({ example: '1', description: 'Gear section module' })
    @Prop({ required: true })
    item: string; 

    @ApiProperty({ example: 'SPOOL-BOOSTER', description: 'Part description' })
    @Prop({ required: true })
    part: string;

    @ApiProperty({ example: '335-009-306-0', description: 'Part number' })
    @Prop({ required: true })
    pn: string;

    @ApiProperty({ example: 'DA432292', description: 'Serial number' })
    @Prop({ required: true })
    sn: string;

    @ApiProperty({ example: '1989-01-30', description: 'Part instalation date' })
    @Prop({ required: false })
    instDate: string;

    @ApiProperty({ example: '25050:00', description: 'initial TSN' })
    @Prop({ required: false })
    initTsn: string;

    @ApiProperty({ example: '25050', description: 'initial CSN' })
    @Prop({ required: false })
    initCsn: string;

    @ApiProperty({ example: '25050:00', description: 'Part Times Since New' })
    @Prop({ required: false })
    tsn: string;

    @ApiProperty({ example: '25050', description: 'Part Cycles Since New' })
    @Prop({ required: false })
    csn: string;

    @ApiProperty({ example: '25050', description: 'Part Cycles at instalation' })
    @Prop({ required: false })
    instCsn: string;

    @ApiProperty({ example: '25050:00', description: 'Part Life Limit Times' })
    @Prop({ required: false })
    tsnLim: string;

    @ApiProperty({ example: '25050', description: 'Part Life Limit Cycles' })
    @Prop({ required: false })
    csnLim: string;

}

export const GearLimitSchema = SchemaFactory.createForClass(GearLimit);