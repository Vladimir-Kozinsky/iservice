import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAircraftDto {

  @ApiProperty({ example: 'EX-76009', description: "Aircraft registration number" })
  @IsNotEmpty()
  readonly regNum: string;

  @ApiProperty({ example: 'Boeing 737-300', description: "Aircraft type" })
  @IsNotEmpty()
  readonly type: string;

  @ApiProperty({ example: 'A16WE', description: "Aircraft type certificate number" })
  @IsNotEmpty()
  readonly typeCert: string;

  @ApiProperty({ example: '1989-01-30', description: "Aircraft manufacturere date" })
  @IsNotEmpty()
  readonly manufDate: string;

  @ApiProperty({ example: '25891', description: "Aircraft manufacturer's Serial Number" })
  @IsNotEmpty()
  readonly msn: string;

  @ApiProperty({ example: '016', description: "Effectivity code" })
  @IsNotEmpty()
  readonly code: string;

  @ApiProperty({ example: '61234', description: "Max Take-Off Cross Weight" })
  @IsNotEmpty()
  mtow: number;

  @ApiProperty({ example: '48307', description: "Max Zero Fuel Weight" })
  @IsNotEmpty()
  mzfw: number;

  @ApiProperty({ example: '51709', description: "Max Landing Weight" })
  @IsNotEmpty()
  mlw: number;

  @ApiProperty({ example: '61461', description: "Max Taxi Weight" })
  @IsNotEmpty()
  mtw: number;

  @ApiProperty({ example: '20104', description: "Fuel Capacity" })
  @IsNotEmpty()
  fuelCap: number;

  @ApiProperty({ example: '31138', description: "Basic Empty Weight" })
  @IsNotEmpty()
  bew: number;

  @ApiProperty({ example: '1.04', description: "Center of gravity" })
  @IsNotEmpty()
  cg: number;

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
}