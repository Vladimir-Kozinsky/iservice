import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateLimitDto {

  @ApiProperty({ example: '25891', description: 'MSN' })
  @IsNotEmpty()
  readonly msn: string;

  @ApiProperty({ example: 'Life limit', description: 'Limit title' })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ example: 'FH', description: 'Dependence' })
  @IsNotEmpty()
  readonly dependence: string;

  @ApiProperty({ example: '10526:00', description: 'Threshold' })
  @IsNotEmpty()
  readonly threshold: string;

}