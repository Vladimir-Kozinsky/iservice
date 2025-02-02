import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { GearHistory } from "src/schemas/gearHistory.schema";

export class CreateGearDto {

  @ApiProperty({ example: 'NLG', description: "LG position" })
  @IsNotEmpty()
  readonly pos: string;

  @ApiProperty({ example: '65-73762-21', description: "LG part number" })
  @IsNotEmpty()
  readonly pn: string;

  @ApiProperty({ example: 'BN0876', description: "LG serial number" })
  @IsNotEmpty()
  readonly sn: string;

  @ApiProperty({ example: '45231:00', description: "Gear tsn at the time of adding to the system" })
  @IsNotEmpty()
  initFh: string;

  @ApiProperty({ example: '5231', description: "Gear csn at the time of adding to the system" })
  @IsNotEmpty()
  initFc: string;

  @ApiProperty({ example: '4523:00', description: "LG total FH" })
  @IsNotEmpty()
  readonly tsn: string;

  @ApiProperty({ example: '4523', description: "LG total FC" })
  @IsNotEmpty()
  csn: string;

  @ApiProperty({ example: '2024-01-30', description: "Last inspection date" })
  @IsNotEmpty()
  lastInspDate: string;

  @ApiProperty({ example: '4523:00', description: "FH at the time of last Inspection" })
  @IsNotEmpty()
  readonly tsnAtLastInsp: string;

  @ApiProperty({ example: '4523', description: "FC at the time of last Inspection" })
  @IsNotEmpty()
  readonly csnAtLastInsp: string;

  @ApiProperty({ example: '25.05.2024', description: 'Next inspection date' })
  @IsNotEmpty()
  readonly nextInspDate: string;

  @ApiProperty({ example: '10526:00', description: 'FH at the time of next Inspection' })
  @IsNotEmpty()
  readonly tsnAtNextInsp: string;

  @ApiProperty({ example: '10526', description: 'FC at the time of next Inspection' })
  @IsNotEmpty()
  readonly csnAtNextInsp: string;

  @ApiProperty({ example: 'none', description: "LG removal/instolation action" })
    readonly gearHistory: [GearHistory];
}