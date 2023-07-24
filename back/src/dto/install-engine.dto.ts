import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class InstallEngineDto {

    @ApiProperty({ example: '2023-01-30', description: "Install date" })
    @IsNotEmpty()
    readonly date: string;

    @ApiProperty({ example: 'removal', description: "Action" })
    @IsNotEmpty()
    readonly action: string;

    @ApiProperty({ example: '25891', description: "Aircraft MSN" })
    @IsNotEmpty()
    readonly aircraft: string;

    @ApiProperty({ example: '36891', description: "Engine MSN" })
    @IsNotEmpty()
    readonly engine: string;

    @ApiProperty({ example: '2', description: "Engine position" })
    @IsNotEmpty()
    readonly position: number;

    @ApiProperty({ example: '2891:00', description: "Aircraft Time Since New" })
    @IsNotEmpty()
    readonly aircraftTsn: string;
   
    @ApiProperty({ example: '2891:00', description: "Cycles Time Since New" })
    @IsNotEmpty()
    readonly aircraftCsn: string;
    
    @ApiProperty({ example: '5891:00', description: "Engine Time Since New" })
    @IsNotEmpty()
    readonly engineTsn: string;
   
    @ApiProperty({ example: '3891:00', description: "Engine Time Cycles New" })
    @IsNotEmpty()
    readonly engineCsn: string;
   
    @ApiProperty({ example: 'none', description: "Engine removal reason" })
    @IsNotEmpty()
    readonly reason: string;
    
}