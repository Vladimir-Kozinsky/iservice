
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

    @ApiProperty({example: 'engineer', description: "User position"})
    @Prop({ required: true })
    position: string;

    @ApiProperty({example: '_1234qwer', description: "User password"})
    @Prop({ required: true })
    password: string;

    @ApiProperty({example: 'admin', description: "User role, admin or user"})
    @Prop({ required: true })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);