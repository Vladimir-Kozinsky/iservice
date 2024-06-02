import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class DeleteLimitDto {

  @ApiProperty({ example: '25891', description: 'MSN' })
  @IsNotEmpty()
  readonly msn: string;

  @ApiProperty({ example: '64c1297e7be0907b18821f78', description: 'Limit id' })
  @IsNotEmpty()
  readonly limitId: string;



}