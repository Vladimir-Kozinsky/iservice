import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type GearHistoryDocument = HydratedDocument<GearHistory>;

@Schema()
export class GearHistory {

    @ApiProperty({ example: '2023-01-30', description: 'Action date' })
    @Prop({ required: true })
    date: string;

    @ApiProperty({ example: 'removal', description: 'Action' })
    @Prop({ required: true })
    action: string;

    @ApiProperty({ example: '25891', description: 'Aircraft MSN' })
    @Prop({ required: true })
    aircraft: string;

    @ApiProperty({ example: '2891:00', description: 'Aircraft Time Since New' })
    @Prop({ required: true })
    aircraftFh: string;

    @ApiProperty({ example: '2891:00', description: 'Aircraft Cycles Since New' })
    @Prop({ required: true })
    aircraftFc: string;

    @ApiProperty({ example: '5891:00', description: 'Engine Time Since New' })
    @Prop({ required: true })
    tsn: string;

    @ApiProperty({ example: '5891:00', description: 'Engine Cycles Since New' })
    @Prop({ required: true })
    csn: string;

    @ApiProperty({ example: 'Overhaul', description: 'Engine removal reason' })
    @Prop({ required: false })
    reason: string
}

export const GearHistorySchema = SchemaFactory.createForClass(GearHistory);