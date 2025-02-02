import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';

export type LegDocument = HydratedDocument<Leg>;

@Schema()
export class Leg {

    _id: Types.ObjectId;

    @ApiProperty({ example: '25891', description: 'Aircraft MSN' })
    @Prop({ required: true })
    aircraft: string;

    @ApiProperty({ example: '[25891]', description: 'Engine MSN' })
    @Prop({ required: true })
    engines: [
        {
            msn: string,
        }

    ];

    @ApiProperty({ example: '[25891]', description: 'Gear SN' })
    @Prop({ required: true })
    gears: [
        {
            sn: string,
        }

    ];


    @ApiProperty({ example: '25891', description: 'APU MSN' })
    @Prop({ required: true })
    apu: string;

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

    @ApiProperty({ example: '56006:40', description: 'Aircraft FH' })
    @Prop({ required: true })
    fh: string;

    @ApiProperty({ example: '6656', description: 'Aircraft FC' })
    @Prop({ required: true })
    fc: string;
}



export const LegSchema = SchemaFactory.createForClass(Leg);


LegSchema.method('reculcFhFc', function (){
    console.log(this.legs)
})
