import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';

export type LimitDocument = HydratedDocument<Cfm56Limit>;

@Schema()
export class Cfm56Limit {

    _id?: Types.ObjectId

    @ApiProperty({ example: '211', description: 'Engine section module' })
    @Prop({ required: true })
    section: string;

    @ApiProperty({ example: '25005', description: 'Engine CSN' })
    @Prop({ required: true })
    engCsn: string;

    @ApiProperty({ example: 'SPOOL-BOOSTER', description: 'Part description' })
    @Prop({ required: true })
    part: string;

    @ApiProperty({ example: '335-009-306-0', description: 'Part number' })
    @Prop({ required: true })
    pn: string;

    @ApiProperty({ example: 'DA432292', description: 'Serial number' })
    @Prop({ required: true })
    sn: string;

    @ApiProperty({ example: '25050', description: 'Part Cycles Since New' })
    @Prop({ required: false })
    initCsnA: string;

    @ApiProperty({ example: '25050', description: 'Part Cycles Since New' })
    @Prop({ required: false })
    initCsnB: string;

    @ApiProperty({ example: '25050', description: 'Part Cycles Since New' })
    @Prop({ required: false })
    initCsnC: string;

    @ApiProperty({ example: '25050', description: 'Part Cycles Since New' })
    @Prop({ required: false })
    initCsn2C: string;

    @ApiProperty({ example: '25050', description: 'Part Cycles Since New' })
    @Prop({ required: false })
    csnA: string;

    @ApiProperty({ example: '25050', description: 'Part Cycles Since New' })
    @Prop({ required: false })
    csnB: string;

    @ApiProperty({ example: '25050', description: 'Part Cycles Since New' })
    @Prop({ required: false })
    csnC: string;

    @ApiProperty({ example: '25050', description: 'Cycles life limit' })
    @Prop({ required: false })
    csnLimA: string;

    @ApiProperty({ example: '25050', description: 'Cycles life limit' })
    @Prop({ required: false })
    csnLimB: string;

    @ApiProperty({ example: '25050', description: 'Cycles life limit' })
    @Prop({ required: false })
    csnLimC: string;

}

export const Cfm56LimitSchema = SchemaFactory.createForClass(Cfm56Limit);