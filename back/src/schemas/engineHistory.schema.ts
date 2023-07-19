import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type EngineHistoryDocument = HydratedDocument<EngineHistory>;

@Schema()
export class EngineHistory {

    _id: Types.ObjectId

    @ApiProperty({ example: '2023-01-30', description: 'Action date' })
    @Prop({ required: true })
    date: string;

    @ApiProperty({ example: 'removal', description: 'Action' })
    @Prop({ required: true })
    action: string;

    @ApiProperty({ example: '25891', description: 'Aircraft MSN' })
    @Prop({ required: true })
    aircraft: string;

    @ApiProperty({ example: '2', description: 'Engine position' })
    @Prop({ required: true })
    position: string;

    @ApiProperty({ example: '2891:00', description: 'Aircraft Time Since New' })
    @Prop({ required: true })
    aircraftTsn: string;

    @ApiProperty({ example: '2891:00', description: 'Aircraft Cycles Since New' })
    @Prop({ required: true })
    aircraftCsn: string;

    @ApiProperty({ example: '5891:00', description: 'Engine Time Since New' })
    @Prop({ required: true })
    engineTsn: string;

    @ApiProperty({ example: '5891:00', description: 'Engine Cycles Since New' })
    @Prop({ required: true })
    engineCsn: string;

    @ApiProperty({ example: 'Overhaul', description: 'Engine removal reason' })
    @Prop({ required: true })
    reason: string
}

export const EngineHistorySchema = SchemaFactory.createForClass(EngineHistory);