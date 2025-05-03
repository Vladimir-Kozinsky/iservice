import { ApiProperty } from "@nestjs/swagger";

export class GetPrintUnitsDto {

    @ApiProperty({ example: 'Manas', description: 'Location' })
    readonly locationFilter: string[];

    @ApiProperty({ example: 'wheel', description: 'Search text' })
    readonly searchText: string;
}