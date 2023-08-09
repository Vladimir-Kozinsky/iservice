import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GetLegsDto {
   
    @ApiProperty({ example: '25891', description: "Aircraft MSN" })
    @IsNotEmpty()
    readonly aircraft: string;

    @ApiProperty({ example: '2024-01-30', description: 'Filter start date' })
    @IsNotEmpty()
    readonly from: string;

    @ApiProperty({ example: '2024-01-30', description: 'Filter end date' })
    @IsNotEmpty()
    readonly to: string;

    @ApiProperty({ example: '1', description: 'Page' })
    @IsNotEmpty()
    readonly page: number;
   
}