import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";
import { Types } from "mongoose";
import { User } from "src/schemas/user.schema";

export class TokenUserDto {
  @IsNotEmpty()
  readonly _id: Types.ObjectId;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  readonly position: string;

  @IsNotEmpty()
  readonly role: string;

  @IsNotEmpty()
  readonly isActivated: boolean;

  constructor(user: User) {
    this._id = user._id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.position = user.position;
    this.role = user.role;
    this.isActivated = user.isActivated;
  }
}