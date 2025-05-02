import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UnitService } from './unit.service';
import { Unit } from 'src/schemas/unit.schema';
import { CreateUnitDto } from 'src/dto/unit/create-unit.dto';
import { GetUnitsDto } from 'src/dto/unit/get-units.dto';
import { ChangeUnitDto } from 'src/dto/unit/change-unit.dto';

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

    @ApiOperation({ summary: 'Edit unit' })
    @ApiResponse({ status: 201, type: Unit })
    @Post('/edit')
    @HttpCode(201)
    async edit(@Body() editUnitDto: ChangeUnitDto) {
        return await this.unitService.editUnit(editUnitDto)
    }

    @ApiOperation({ summary: 'Delete unit' })
    @ApiResponse({ status: 201, type: Unit })
    @Post('/delete')
    @HttpCode(201)
    async delete(@Body() deleteUnitDto: { sn: string }) {
        return await this.unitService.deleteUnit(deleteUnitDto)
    }

    @ApiOperation({ summary: 'Get units' })
    @ApiResponse({ status: 201, type: Unit })
    @Post('/units')
    @HttpCode(201)
    async units(@Body() getUnitsDto: GetUnitsDto ) {
        return await this.unitService.getLastTenUnits(getUnitsDto)
    }
}
