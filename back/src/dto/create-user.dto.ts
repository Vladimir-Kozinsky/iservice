import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: 'email@mail.com', description: "User email address" })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'John', description: "User First Name" })
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({ example: 'Wick', description: "User Last Name" })
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({ example: 'Engineer', description: "User position in the company" })
  @IsNotEmpty()
  readonly position: string;

  @ApiProperty({example: '123_sdsd!', description: "User password"})
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({example: 'admin', description: "User role"})
  @IsNotEmpty()
  readonly role: string;
}