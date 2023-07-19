import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';

export type LegDocument = HydratedDocument<Leg>;

@Schema()
export class Leg {

    _id: Types.ObjectId

    @ApiProperty({ example: '2024-01-30', description: 'Depature date' })
    @Prop({ required: true })
    depDate: string;

    @ApiProperty({ example: 'TXC2578', description: 'Flight number' })
    @Prop({ required: true })
    flightNumber: string;

    @ApiProperty({ example: 'EDTO', description: 'Depature airport code' })
    @Prop({ required: true })
    from: string;

    @ApiProperty({ example: 'EDDE', description: 'Arrive airport code' })
    @Prop({ required: true })
    to: string;

    @ApiProperty({ example: '15:40', description: 'Block Off time' })
    @Prop({ required: true })
    blockOff: string;

    @ApiProperty({ example: '15:40', description: 'Take Off time' })
    @Prop({ required: true })
    takeOff: string;

    @ApiProperty({ example: '15:40', description: 'Langing time' })
    @Prop({ required: true })
    landing: string;

    @ApiProperty({ example: '15:40', description: 'Block On time' })
    @Prop({ required: true })
    blockOn: string;

    @ApiProperty({ example: '5:40', description: 'Flight time' })
    @Prop({ required: true })
    flightTime: string;

    @ApiProperty({ example: '6:40', description: 'Block time' })
    @Prop({ required: true })
    blockTime: string;

    @ApiProperty({ example: '45231:00', description: "Current FH" })
    @Prop({ required: true })
    fh: string;

    @ApiProperty({ example: '4523', description: "Current FC" })
    @Prop({ required: true })
    fc: string;
}

export const LegSchema = SchemaFactory.createForClass(Leg);