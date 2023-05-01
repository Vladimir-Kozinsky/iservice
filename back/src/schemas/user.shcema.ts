
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @ApiProperty({example: 'email@mail.com', description: "User email address"})
    @Prop({ required: true })
    email: string;

    @ApiProperty({example: 'Jhon', description: "User first name"})
    @Prop({ required: true })
    firstName: string;

    @ApiProperty({example: 'Smidt', description: "User last name"})
    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true })
    position: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    isAuth: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);