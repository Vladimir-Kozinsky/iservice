import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAircraftDto {

  @ApiProperty({ example: 'Boeing 737-300', description: "Aircraft type" })
  @IsNotEmpty()
  readonly type: string;

  @ApiProperty({ example: '25891', description: "Aircraft manufacturer's Serial Number" })
  @IsNotEmpty()
  readonly msn: string;

  @ApiProperty({ example: 'EX-76009', description: "Aircraft registration number" })
  @IsNotEmpty()
  readonly regNum: string;

  @ApiProperty({ example: '1989-01-30', description: "Aircraft manufacturere date" })
  @IsNotEmpty()
  readonly manufDate: string;

  @ApiProperty({ example: '45231:00', description: "Aircraft FH at the time of adding to the system" })
  @IsNotEmpty()
  readonly initFh: string;

  @ApiProperty({ example: '5231', description: "Aircraft FC at the time of adding to the system" })
  @IsNotEmpty()
  readonly initFc: string;

  @ApiProperty({ example: '45231:00', description: "Current FH" })
  @IsNotEmpty()
  readonly fh: string;

  @ApiProperty({ example: '4523', description: "Current FC" })
  @IsNotEmpty()
  readonly fc: string;

  @ApiProperty({ example: '4', description: "The number of aircraft overhauls." })
  readonly overhaulNum: number;

  @ApiProperty({ example: '2024-01-30', description: "Last overhaul date" })
  readonly lastOverhaulDate: string;

  @ApiProperty({ example: '45231:00', description: "FH at the time of last overhaul" })
  readonly tsnAtLastOverhaul: string;

  @ApiProperty({ example: '4523', description: "FC at the time of last overhaul" })
  readonly csnAtLastOverhaul: string;

}