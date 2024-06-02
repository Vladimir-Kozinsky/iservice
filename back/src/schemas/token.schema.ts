import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {

    @ApiProperty({ example: 'a8sd9df0fg08d9gfdg', description: 'User id' })
    @Prop({ required: true, ref: 'User' })
    user: Types.ObjectId

    @ApiProperty({ example: 'a8sd9df0fg08d9gfdg', description: 'Refresh token' })
    @Prop({ required: true })
    refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);