import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class InstallApuDto {

    @ApiProperty({ example: '2023-01-30', description: "Install date" })
    @IsNotEmpty()
    readonly date: string;

    @ApiProperty({ example: 'removal', description: "Action" })
    @IsNotEmpty()
    readonly action: string;

    @ApiProperty({ example: '25891', description: "Aircraft MSN" })
    @IsNotEmpty()
    readonly aircraft: string;

    @ApiProperty({ example: '36891', description: "APU MSN" })
    @IsNotEmpty()
    readonly apu: string;

    @ApiProperty({ example: '2891:00', description: "Aircraft Time Since New" })
    @IsNotEmpty()
    readonly aircraftTsn: string;
   
    @ApiProperty({ example: '2891:00', description: "Cycles Time Since New" })
    @IsNotEmpty()
    readonly aircraftCsn: string;
    
    @ApiProperty({ example: '5891:00', description: "Engine Time Since New" })
    @IsNotEmpty()
    readonly apuTsn: string;
   
    @ApiProperty({ example: '3891:00', description: "Engine Time Cycles New" })
    @IsNotEmpty()
    readonly apuCsn: string;
   
    @ApiProperty({ example: 'none', description: "Engine removal reason" })
    @IsNotEmpty()
    readonly reason: string;
    
}