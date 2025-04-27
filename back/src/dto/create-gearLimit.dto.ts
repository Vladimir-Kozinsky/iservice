import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateGearLimitDto {

  @ApiProperty({ example: '25891', description: 'MSN' })
  @IsNotEmpty()
  readonly gearSn: string;

  @ApiProperty({ example: '25005:00', description: 'Gear TSN' })
  @IsNotEmpty()
  gearTsn: string;

  @ApiProperty({ example: '25005', description: 'Gear CSN' })
  @IsNotEmpty()
  gearCsn: string;

  @ApiProperty({ example: '1', description: 'Gear section module' })
  @IsNotEmpty()
  item: string;

  @ApiProperty({ example: 'SPOOL-BOOSTER', description: 'Part description' })
  @IsNotEmpty()
  part: string;

  @ApiProperty({ example: '335-009-306-0', description: 'Part number' })
  @IsNotEmpty()
  pn: string;

  @ApiProperty({ example: 'DA432292', description: 'Serial number' })
  @IsNotEmpty()
  sn: string;

  @ApiProperty({ example: '1989-01-30', description: 'Part instalation date' })
  @IsNotEmpty()
  instDate: string;

  @ApiProperty({ example: '25050:00', description: 'initial TSN' })
  @IsNotEmpty()
  initTsn: string;

  @ApiProperty({ example: '25050', description: 'initial CSN' })
  @IsNotEmpty()
  initCsn: string;

  @ApiProperty({ example: '25050:00', description: 'Part Times Since New' })
  @IsNotEmpty()
  tsn: string;

  @ApiProperty({ example: '25050', description: 'Part Cycles Since New' })
  @IsNotEmpty()
  csn: string;

  @ApiProperty({ example: '25050', description: 'Part Cycles at instalation' })
  @IsNotEmpty()
  instCsn: string;

  @ApiProperty({ example: '25050:00', description: 'Part Life Limit Times' })
  @IsNotEmpty()
  tsnLim: string;

  @ApiProperty({ example: '25050', description: 'Part Life Limit Cycles' })
  @IsNotEmpty()
  csnLim: string;

}