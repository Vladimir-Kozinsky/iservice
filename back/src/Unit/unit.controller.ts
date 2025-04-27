import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UnitService } from './unit.service';
import { Unit } from 'src/schemas/unit.schema';
import { CreateUnitDto } from 'src/dto/unit/create-unit.dto';

@ApiTags('Unit')
@Controller('unit')
export class UnitController {
    constructor(private readonly unitService: UnitService) { }
    
    @ApiOperation({ summary: 'Add unit' })
    @ApiResponse({ status: 201, type: Unit })
    @Post('/create')
    @HttpCode(201)
    async create(@Body() createUnitDto: CreateUnitDto) {
        return await this.unitService.createUnit(createUnitDto)
    }

    @ApiOperation({ summary: 'Add unit' })
    @ApiResponse({ status: 201, type: Unit })
    @Get('/units')
    @HttpCode(201)
    async units() {
        return await this.unitService.getLastTenUnits()
    }
}
