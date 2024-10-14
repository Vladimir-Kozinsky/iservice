import { Controller, Post, HttpCode, Body, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EngineService } from './engine.service';
import { CreateEngineDto } from 'src/dto/create-engine.dto';
import { Limit } from 'src/schemas/limit.schema';
import { CreateLimitDto } from 'src/dto/create-limit.dto';
import { DeleteLimitDto } from 'src/dto/delete-limit.dto';
import { Types } from 'mongoose';
import { Engine } from 'src/schemas/engine.schema';

@ApiTags('Engine')
@Controller('engine')
export class EngineController {
    constructor(private readonly engineService: EngineService) { }

    @ApiOperation({ summary: 'Add engine' })
    @ApiResponse({ status: 201, type: CreateEngineDto })
    @Post('/add')
    @HttpCode(201)
    async add(@Body() createUserDto: CreateEngineDto) {
        return await this.engineService.add(createUserDto)
    }

    @ApiOperation({ summary: 'Get engines' })
    @ApiResponse({ status: 201, type: [CreateEngineDto] })
    @Get('/engines')
    @HttpCode(201)
    async getEngines() {
        return await this.engineService.getEngines();
    }

    @ApiOperation({ summary: 'Get  engine' })
    @ApiResponse({ status: 201, type: Engine })
    @Get('/id')
    @HttpCode(201)
    async getInstalledEngines(@Query() getEngineDto: { id: Types.ObjectId }) {
        return await this.engineService.getEngine(getEngineDto);
    }
    @ApiOperation({ summary: 'Get  engine' })
    @ApiResponse({ status: 201, type: Engine })
    @Get('/')
    @HttpCode(201)
    async getEngine(@Query() getEngineByMsnDto: { msn: string }) {
        return await this.engineService.getEngineByMsn(getEngineByMsnDto);
    }

    @ApiOperation({ summary: 'Add new limit' })
    @ApiResponse({ status: 201, type: Limit })
    @Post('/limit/add')
    @HttpCode(201)
    async addLimit(@Body() createLimitDto: CreateLimitDto) {
        return await this.engineService.addLimit(createLimitDto);
    }

    @ApiOperation({ summary: 'Delete limit' })
    @ApiResponse({ status: 201, type: Limit })
    @Post('/limit/delete')
    @HttpCode(201)
    async delLimit(@Body() deleteLimitDto: DeleteLimitDto) {
        return await this.engineService.delLimit(deleteLimitDto);

    }
}
