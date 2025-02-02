import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class InstallGearDto {

  @ApiProperty({ example: '2023-01-30', description: "Install date" })
    @IsNotEmpty()
    readonly date: string;

    @ApiProperty({ example: 'removal', description: "Action" })
    @IsNotEmpty()
    readonly action: string;

    @ApiProperty({ example: '25891', description: "Aircraft MSN" })
    @IsNotEmpty()
    readonly aircraft: string;

    @ApiProperty({ example: '36891', description: "Gear Serial number" })
    @IsNotEmpty()
    readonly gear: string;

    @ApiProperty({ example: 'NLG', description: "Gear Position" })
    @IsNotEmpty()
    readonly position: string;

    @ApiProperty({ example: '2891:00', description: "Aircraft Time Since New" })
    @IsNotEmpty()
    readonly aircraftTsn: string;
   
    @ApiProperty({ example: '2891:00', description: "Aircraft Cycles Time Since New" })
    @IsNotEmpty()
    readonly aircraftCsn: string;
    
    @ApiProperty({ example: '5891:00', description: "Gear Time Since New" })
    @IsNotEmpty()
    readonly gearTsn: string;
   
    @ApiProperty({ example: '3891:00', description: "Gear Time Cycles New" })
    @IsNotEmpty()
    readonly gearCsn: string;
   
    @ApiProperty({ example: 'none', description: "Gear removal reason" })
    @IsNotEmpty()
    readonly reason: string;
    

}