import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCfm56LimitDto {

  @ApiProperty({ example: '859633', description: 'Engine Serial Number' })
  @IsNotEmpty()
  readonly esn: string;

  @ApiProperty({ example: '25200', description: 'Engine CSN at adding limit' })
  @IsNotEmpty()
  readonly engCsn: string;

  @ApiProperty({ example: '211', description: 'Engine section module' })
  @IsNotEmpty()
  readonly section: string;

  @ApiProperty({ example: 'SPOOL-BOOSTER', description: 'Part description' })
  @IsNotEmpty()
  readonly part: string;

  @ApiProperty({ example: '335-009-306-0', description: 'Part number' })
  @IsNotEmpty()
  readonly pn: string;

  @ApiProperty({ example: 'DA432292', description: 'Serial number' })
  @IsNotEmpty()
  readonly sn: string;

  @ApiProperty({ example: '25050', description: 'Part Cycles Since New' })
  @IsNotEmpty()
  readonly initCsnA: string;

  @ApiProperty({ example: '25050', description: 'Part Cycles Since New' })
  @IsNotEmpty()
  readonly initCsnB: string;

  @ApiProperty({ example: '25050', description: 'Part Cycles Since New' })
  @IsNotEmpty()
  readonly initCsnC: string;

  @ApiProperty({ example: '25050', description: 'Part Cycles Since New' })
  @IsNotEmpty()
  readonly csnA: string;

  @ApiProperty({ example: '25050', description: 'Part Cycles Since New' })
  @IsNotEmpty()
  readonly csnB: string;

  @ApiProperty({ example: '25050', description: 'Part Cycles Since New' })
  @IsNotEmpty()
  readonly csnC: string;

  @ApiProperty({ example: '25050', description: 'Cycles life limit' })
  @IsNotEmpty()
  readonly csnLimA: string;

  @ApiProperty({ example: '25050', description: 'Cycles life limit' })
  @IsNotEmpty()
  readonly csnLimB: string;

  @ApiProperty({ example: '25050', description: 'Cycles life limit' })
  @IsNotEmpty()
  readonly csnLimC: string;


}