import { Controller, Post, HttpCode, Body, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EngineService } from './engine.service';
import { CreateEngineDto } from 'src/dto/create-engine.dto';
import { Limit } from 'src/schemas/limit.schema';
import { DeleteLimitDto } from 'src/dto/delete-limit.dto';
import { Types } from 'mongoose';
import { Engine } from 'src/schemas/engine.schema';
import { CreateCfm56LimitDto } from 'src/dto/create-engineLimit.dto';
import { Cfm56Limit } from 'src/schemas/cfm56Limit.schema';
import { DeleteEngineLLPDto } from 'src/dto/engine/delete-engineLLP.dto';

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

    @ApiOperation({ summary: 'Add new Life limit' })
    @ApiResponse({ status: 201, type: Cfm56Limit })
    @Post('/limit/add')
    @HttpCode(201)
    async addLimit(@Body() createEngineLimitDto: CreateCfm56LimitDto) {
        return await this.engineService.addLimit(createEngineLimitDto);
    }

    @ApiOperation({ summary: 'Delete limit' })
    @ApiResponse({ status: 201, type: String })
    @Post('/limit/delete')
    @HttpCode(201)
    async delLimit(@Body() deleteLimitDto: DeleteEngineLLPDto) {
        return await this.engineService.delLimit(deleteLimitDto);

    }

    @ApiOperation({ summary: 'Update Engine LLP' })
    @ApiResponse({ status: 201, type: [Engine] })
    @Post('/limits/update')
    @HttpCode(201)
    async reculcEngineLLP(@Body() updateLimitsDto: {esn: string}) {
        return await this.engineService.updateEngineLLP(updateLimitsDto);
    }
}
