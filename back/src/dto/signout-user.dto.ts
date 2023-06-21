import { IsNotEmpty } from "class-validator";

export class SignOutUserDto {
  @IsNotEmpty()
  readonly _id: string;
}