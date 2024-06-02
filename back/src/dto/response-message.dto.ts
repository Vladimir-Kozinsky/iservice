import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";
import { Types } from "mongoose";
import { User } from "src/schemas/user.schema";

export class ResponseMessageDto {
  
  @ApiProperty({ example: 'User succesfully sign out', description: "Response message" })
  @IsNotEmpty()
  readonly message: string;

  
}