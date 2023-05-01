import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthUserDto {
  @ApiProperty({example: 'email@mail.com', description: "User email address"})
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({example: '123_sdsd!', description: "User password"})
  @IsNotEmpty()
  readonly password: string;
}