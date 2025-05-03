import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';

export type LegDocument = HydratedDocument<Unit>;

@Schema()
export class Unit {

    _id: Types.ObjectId;

    @ApiProperty({ example: '25', description: 'ATA Chapter' })
    @Prop({ required: false })
    ata: string;

    @ApiProperty({ example: '2589134', description: 'Part Number' })
    @Prop({ required: true })
    pn: string;

    @ApiProperty({ example: '289134', description: 'Serial Number' })
    @Prop({ required: false })
    sn: string;

    @ApiProperty({ example: 'Consumables', description: 'Parts type' })
    @Prop({ required: true })
    type: string;

    @ApiProperty({ example: 'CSD', description: 'Part description' })
    @Prop({ required: true })
    desc: string;

    @ApiProperty({ example: 'NWY23423432', description: 'Part GRN number' })
    @Prop({ required: false })
    grn: string;

    @ApiProperty({ example: '10', description: 'Parts quantity' })
    @Prop({ required: true })
    quantity: number;

    @ApiProperty({ example: 'EA', description: 'EA or Pack' })
    @Prop({ required: true })
    eapack: string;

    @ApiProperty({ example: 'Sharjah', description: 'Parts location' })
    @Prop({ required: true })
    location: string;

    @ApiProperty({ example: '1', description: 'Rack location' })
    @Prop({ required: false })
    rack: string;

    @ApiProperty({ example: '2', description: 'Shelf location' })
    @Prop({ required: false })
    shelf: string;

    @ApiProperty({ example: 'NEW', description: 'Parts condition' })
    @Prop({ required: true })
    condition: string;

    @ApiProperty({ example: '25.06.2029', description: 'Life limit' })
    @Prop({ required: false })
    lifelimit: string;

    @ApiProperty({ example: '25.06.2029', description: 'Shelf life' })
    @Prop({ required: false })
    shelflife: string;

    @ApiProperty({ example: 'Remarks', description: 'Remarks' })
    @Prop({ required: false })
    remarks: string;

    @ApiProperty({ example: 'Remarks', description: 'Remarks' })
    @Prop({ required: false })
    usage: [
        {
            date: string,
            aircraft: string,
            wo: string,
            quantity: number,
            remark: string
        }
    ]

}


export const UnitSchema = SchemaFactory.createForClass(Unit);
