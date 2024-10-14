import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateLimitDto {

  @ApiProperty({ example: '25891', description: 'MSN' })
  @IsNotEmpty()
  readonly msn: string;

  @ApiProperty({ example: 'Life limit', description: 'Limit title' })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ example: '25.05.2024', description: 'Inspection date' })
  readonly lastInspDate: string;

  @ApiProperty({ example: '10526:00', description: 'FH at the time of last Inspection' })
  readonly tsnAtLastInsp: string;

  @ApiProperty({ example: '10526', description: 'FC at the time of last Inspection' })
  readonly csnAtLastInsp: string;

  @ApiProperty({ example: '25.05.2024', description: 'Next inspection date' })
  readonly nextInspDate: string;

  @ApiProperty({ example: '10526:00', description: 'FH at the time of last Inspection' })
  readonly tsnAtNextInsp: string;

  @ApiProperty({ example: '10526', description: 'FC at the time of last Inspection' })
  readonly csnAtNextInsp: string;

  // @ApiProperty({ example: 'FH', description: 'Dependence' })
  // @IsNotEmpty()
  // readonly dependence: string;

  // @ApiProperty({ example: '10526:00', description: 'Threshold' })
  // @IsNotEmpty()
  // readonly threshold: string;

}