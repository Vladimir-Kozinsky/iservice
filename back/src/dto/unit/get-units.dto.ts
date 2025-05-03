import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GetUnitsDto {

    @ApiProperty({ example: '2', description: 'Page number' })
    @IsNotEmpty()
    readonly page: number;

    @ApiProperty({ example: '25', description: 'Units at page' })
    @IsNotEmpty()
    readonly unitsAtPage: number;

    @ApiProperty({ example: 'Manas', description: 'Location' })
    readonly locationFilter: string[];

    // @ApiProperty({ example: 'Rotable', description: 'Part type' })
    // readonly typeFilter: string[];

    @ApiProperty({ example: 'up', description: 'Filter direction up or down' })
    readonly filterDirection: string;

    @ApiProperty({ example: 'wheel', description: 'Search text' })
    readonly searchText: string;
}