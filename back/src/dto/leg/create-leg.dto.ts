import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateLegDto {
    @ApiProperty({ example: '25891', description: "Aircraft MSN" })
    @IsNotEmpty()
    readonly aircraft: string;

    @ApiProperty({ example: '[25891]', description: "Engine MSN" })
    @IsNotEmpty()
    readonly engines: [
        {
            msn: string,
        }

    ];
    @ApiProperty({ example: '[25891]', description: "Gear SN" })
    @IsNotEmpty()
    readonly gears: [
        {
            sn: string,
        }

    ];

    @ApiProperty({ example: '25891', description: "APU MSN" })
    @IsNotEmpty()
    readonly apu: string;

    @ApiProperty({ example: '2024-01-30', description: 'Depature date' })
    @IsNotEmpty()
    readonly depDate: string;

    @ApiProperty({ example: 'TXC2578', description: 'Flight number' })
    @IsNotEmpty()
    readonly flightNumber: string;

    @ApiProperty({ example: 'EDTO', description: 'Depature airport code' })
    @IsNotEmpty()
    readonly from: string;

    @ApiProperty({ example: 'EDDE', description: 'Arrive airport code' })
    @IsNotEmpty()
    readonly to: string;

    @ApiProperty({ example: '15:40', description: 'Block Off time' })
    @IsNotEmpty()
    readonly blockOff: string;

    @ApiProperty({ example: '15:40', description: 'Take Off time' })
    @IsNotEmpty()
    readonly takeOff: string;

    @ApiProperty({ example: '15:40', description: 'Langing time' })
    @IsNotEmpty()
    readonly landing: string;

    @ApiProperty({ example: '15:40', description: 'Block On time' })
    @IsNotEmpty()
    readonly blockOn: string;

    @ApiProperty({ example: '5:40', description: 'Flight time' })
    @IsNotEmpty()
    readonly flightTime: string;

    @ApiProperty({ example: '6:40', description: 'Block time' })
    @IsNotEmpty()
    readonly blockTime: string;

    @ApiProperty({ example: '56006:40', description: 'Aircraft FH' })
    @IsNotEmpty()
    readonly fh: string;

    @ApiProperty({ example: '6656', description: 'Aircraft FC' })
    @IsNotEmpty()
    readonly fc: string;
}