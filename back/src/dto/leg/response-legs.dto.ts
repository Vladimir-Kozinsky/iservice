import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Leg } from "src/schemas/leg.schema";

export class ResponseLegsDto {
   
    @ApiProperty({ example: '5', description: "Total pages" })
    @IsNotEmpty()
    readonly totalPages: number;

    @ApiProperty({ example: '2', description: 'Current page' })
    @IsNotEmpty()
    readonly currentPage: number;


    @ApiProperty({ example: 'Legs', description: 'Legs' })
    @IsNotEmpty()
    readonly legs: [Leg];
   
}