import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ApuHistory } from "src/schemas/apuHistory.schema";
import { Limit } from "src/schemas/limit.schema";

export class CreateApuDto {

  @ApiProperty({ example: 'CFM56-3C1', description: "APU type" })
  @IsNotEmpty()
  readonly type: string;

  @ApiProperty({ example: '25891', description: "APU manufacturer's Serial Number" })
  @IsNotEmpty()
  readonly msn: string;

  @ApiProperty({ example: '1989-01-30', description: "APU manufacturere date" })
  @IsNotEmpty()
  readonly manufDate: string;

  @ApiProperty({ example: 'CFM', description: "Engine manufacturer" })
  @IsNotEmpty()
  manuf: string;

  @ApiProperty({ example: '45697:00', description: "APU Time Since New" })
  @IsNotEmpty()
  readonly tsn: string;

  @ApiProperty({ example: '45697:00', description: "APU Cycles Since New" })
  @IsNotEmpty()
  readonly csn: string;

  @ApiProperty({ example: 'none', description: "APU removal/instolation action" })
  readonly apuHistory: [ApuHistory];

  @ApiProperty({ example: '4', description: "The number of engine overhauls." })
  readonly overhaulNum: number;

  @ApiProperty({ example: '2024-01-30', description: "Last overhaul date" })
  readonly lastOverhaulDate: string;

  @ApiProperty({ example: '45231:00', description: "FH at the time of last overhaul" })
  readonly tsnAtLastOverhaul: string;

  @ApiProperty({ example: '4523', description: "FC at the time of last overhaul" })
  readonly csnAtLastOverhaul: string;

  @ApiProperty({ example: 'none', description: "Limit" })
  readonly limits: [Limit];

}