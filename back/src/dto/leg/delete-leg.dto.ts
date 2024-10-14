import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class DeleteLegDto {
   
    @ApiProperty({ example: '5', description: "Total pages" })
    @IsNotEmpty()
    readonly legId: Types.ObjectId;

    @ApiProperty({ example: '2', description: 'Current page' })
    @IsNotEmpty()
    readonly aircraftMsn: number;

    

}