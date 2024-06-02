import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type LimitDocument = HydratedDocument<Limit>;

@Schema()
export class Limit {

    _id?: Types.ObjectId

    @ApiProperty({ example: 'Life limit', description: 'Limit title' })
    @Prop({ required: true})
    title: string;

    @ApiProperty({ example: 'FH', description: 'Dependence' })
    @Prop({ required: true })
    dependence: string;
   
    @ApiProperty({ example: '10526:00', description: 'Threshold' })
    @Prop({ required: true })
    threshold: string;
}

export const LimitSchema = SchemaFactory.createForClass(Limit);