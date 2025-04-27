import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DeleteEngineLLPDto {

  @ApiProperty({ example: '25891', description: 'MSN' })
  @IsNotEmpty()
  readonly msn: string;

  @ApiProperty({ example: '64C129', description: 'Part sn' })
  @IsNotEmpty()
  readonly sn: string;

}