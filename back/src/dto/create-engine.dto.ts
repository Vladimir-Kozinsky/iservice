import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { EngineHistory } from "src/schemas/engineHistory.schema";
import { Leg } from "src/schemas/leg.schema";
import { Limit } from "src/schemas/limit.schema";

export class CreateEngineDto {

  @ApiProperty({ example: 'CFM56-3C1', description: "Engine type" })
  @IsNotEmpty()
  readonly type: string;
  
  @ApiProperty({ example: '20000', description: "Engine Thrust Rating" })
  @IsNotEmpty()
  readonly thrust: string;

  @ApiProperty({ example: '25891', description: "Engine manufacturer's Serial Number" })
  @IsNotEmpty()
  readonly msn: string;

  @ApiProperty({ example: '1989-01-30', description: "Engine manufacturere date" })
  @IsNotEmpty()
  readonly manufDate: string;

  @ApiProperty({ example: 'CFM', description: "Engine manufacturer" })
  @IsNotEmpty()
  readonly manuf: string;

  @ApiProperty({ example: '45231:00', description: "Engine tsn at the time of adding to the system" })
  @IsNotEmpty()
  initFh: string;

  @ApiProperty({ example: '5231', description: "Engine csn at the time of adding to the system" })
  @IsNotEmpty()
  initFc: string;

  @ApiProperty({ example: '45697:00', description: "Engine Time Since New" })
  @IsNotEmpty()
  readonly tsn: string;

  @ApiProperty({ example: '45697:00', description: "Engine Cycles Since New" })
  @IsNotEmpty()
  readonly csn: string;

  @ApiProperty({ example: 'none', description: "Engine removal/instolation action" })
  readonly engineHistory: EngineHistory;

  @ApiProperty({ example: '2024-01-30', description: "Last overhaul date" })
  readonly lastOverhaulDate: string;

  @ApiProperty({ example: '45231:00', description: "FH at the time of last overhaul" })
  readonly tsnAtLastOverhaul: string;

  @ApiProperty({ example: '4523', description: "FC at the time of last overhaul" })
  readonly csnAtLastOverhaul: string;

  @ApiProperty({ example: 'none', description: "Limit" })
  readonly limits: [Limit];

  @ApiProperty({ example: 'none', description: "Legs" })
    readonly legs: [Leg];

}