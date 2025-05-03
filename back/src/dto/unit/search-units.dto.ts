import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GetUnitsDto {

    @ApiProperty({ example: 'whell', description: 'Search text' })
    @IsNotEmpty()
    readonly text: string;

    @ApiProperty({ example: '25', description: 'Units at page' })
    @IsNotEmpty()
    readonly unitsAtPage: number;
    
}