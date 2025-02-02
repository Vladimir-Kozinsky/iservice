import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { GearService } from './gear.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Gear } from 'src/schemas/gear.schema';
import { CreateGearDto } from 'src/dto/create-gear.dto';
import { Types } from 'mongoose';

@Controller('gear')
export class GearController {
    constructor(private readonly gearService: GearService) { }

    @ApiOperation({ summary: 'Add Gear' })
    @ApiResponse({ status: 201, type: Gear })
    @Post('/add')
    @HttpCode(201)
    async add(@Body() CreateGearDto: CreateGearDto) {
        return await this.gearService.add(CreateGearDto)
    }

    @ApiOperation({ summary: 'Get Gears' })
    @ApiResponse({ status: 201, type: [Gear] })
    @Get('/gears')
    @HttpCode(201)
    async getGears() {
        return await this.gearService.getGears();
    }

    @ApiOperation({ summary: 'Get  gear' })
    @ApiResponse({ status: 201, type: Gear })
    @Get('/id')
    @HttpCode(201)
    async getInstalledGears(@Query() getGearDto: { id: Types.ObjectId }) {
        return await this.gearService.getGear(getGearDto);
    }

    // @ApiOperation({ summary: 'Add new limit' })
    // @ApiResponse({ status: 201, type: Limit })
    // @Post('/limit/add')
    // @HttpCode(201)
    // async addLimit(@Body() createLimitDto: CreateLimitDto ) {
    //     return await this.apuService.addLimit(createLimitDto);
    // }

    // @ApiOperation({ summary: 'Delete limit' })
    // @ApiResponse({ status: 201, type: Limit })
    // @Post('/limit/delete')
    // @HttpCode(201)
    // async delLimit(@Body() deleteLimitDto: DeleteLimitDto ) {
    //     return await this.apuService.delLimit(deleteLimitDto);

    // }

}
