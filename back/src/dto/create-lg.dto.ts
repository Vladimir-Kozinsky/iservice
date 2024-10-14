import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateLgDto {

  @ApiProperty({ example: '25.05.2024', description: 'Action date' })
  @IsNotEmpty()
  readonly date: string;

  @ApiProperty({ example: '25891', description: 'MSN' })
  @IsNotEmpty()
  readonly msn: string;

  @ApiProperty({ example: '10526:00', description: 'Aircraft FH' })
  readonly aircraftFh: string;

  @ApiProperty({ example: '1526', description: 'Aircraft FC' })
  readonly aircraftFc: string;
  
  @ApiProperty({ example: 'NLG', description: 'Position' })
  @IsNotEmpty()
  readonly pos: string;

  @ApiProperty({ example: 'Part Number', description: 'Part Number' })
  @IsNotEmpty()
  readonly pn: string;

  @ApiProperty({ example: 'Serial Number', description: 'Serial Number' })
  @IsNotEmpty()
  readonly sn: string;

  @ApiProperty({ example: '10526:00', description: 'LG FH' })
  readonly tsn: string;

  @ApiProperty({ example: '10526', description: 'LG FC' })
  readonly csn: string;

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

}