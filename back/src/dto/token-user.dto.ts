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
  readonly password: string;

  @IsNotEmpty()
  readonly role: string;
  
  @IsNotEmpty()
  readonly isActivated: boolean;

  constructor(model: User) {
    this._id = model._id;
    this.email = model.email;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.position = model.position;
    this.role = model.role;
    this.isActivated = model.isActivated;
  }
}