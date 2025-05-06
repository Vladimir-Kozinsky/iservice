import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class ChangeUnitDto {

    @IsNotEmpty()
    readonly _id: Types.ObjectId;

    @ApiProperty({ example: '25', description: 'ATA Chapter' })
    @IsNotEmpty()
    readonly ata: string;

    @ApiProperty({ example: '2589134', description: 'Part Number' })
    @IsNotEmpty()
    readonly pn: string;

    @ApiProperty({ example: '289134', description: 'Serial Number' })
    readonly sn: string;

    @ApiProperty({ example: 'Consumables', description: 'Parts type' })
    @IsNotEmpty()
    readonly type: string;

    @ApiProperty({ example: 'CSD', description: 'Part description' })
    @IsNotEmpty()
    readonly desc: string;

    @ApiProperty({ example: 'NWC23423432', description: 'Part GRN number' })
    readonly grn: string;

    @ApiProperty({ example: '10', description: 'Parts quantity' })
    @IsNotEmpty()
    readonly quantity: string;

    @ApiProperty({ example: 'EA', description: 'EA or Pack' })
    @IsNotEmpty()
    readonly eapack: string;

    @ApiProperty({ example: 'Sharjah', description: 'Parts location' })
    @IsNotEmpty()
    readonly location: string;

    @ApiProperty({ example: '1', description: 'Rack location' })
    readonly rack: string;

    @ApiProperty({ example: '2', description: 'Shelf location' })
    readonly shelf: string;

    @ApiProperty({ example: 'NEW', description: 'Parts condition' })
    @IsNotEmpty()
    readonly condition: string;

    @ApiProperty({ example: '25.06.2029', description: 'Life limit' })
    readonly lifelimit: string;

    @ApiProperty({ example: '25.06.2029', description: 'Shelf life' })
    readonly shelflife: string;

    @ApiProperty({ example: 'Remarks', description: 'Remarks' })
    readonly remarks: string;
}