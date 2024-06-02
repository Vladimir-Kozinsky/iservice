import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type ApuHistoryDocument = HydratedDocument<ApuHistory>;

@Schema()
export class ApuHistory {

    @ApiProperty({ example: '2023-01-30', description: 'Action date' })
    @Prop({ required: true })
    date: string;

    @ApiProperty({ example: 'removal', description: 'Action' })
    @Prop({ required: true })
    action: string;

    @ApiProperty({ example: '25891', description: 'Aircraft MSN' })
    @Prop({ required: true })
    aircraft: string;

    @ApiProperty({ example: '29891', description: 'APU MSN' })
    @Prop({ required: true })
    apu: string;

    @ApiProperty({ example: '2891:00', description: 'Aircraft Time Since New' })
    @Prop({ required: true })
    aircraftTsn: string;

    @ApiProperty({ example: '2891:00', description: 'Aircraft Cycles Since New' })
    @Prop({ required: true })
    aircraftCsn: string;

    @ApiProperty({ example: '5891:00', description: 'APU Time Since New' })
    @Prop({ required: true })
    apuTsn: string;

    @ApiProperty({ example: '5891:00', description: 'APU Cycles Since New' })
    @Prop({ required: true })
    apuCsn: string;

    @ApiProperty({ example: 'Overhaul', description: 'APU removal reason' })
    @Prop({ required: true })
    reason: string
}

export const EngineHistorySchema = SchemaFactory.createForClass(ApuHistory);