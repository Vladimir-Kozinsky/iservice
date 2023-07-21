import { Controller, Post, HttpCode, Body, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EngineService } from './engine.service';
import { CreateEngineDto } from 'src/dto/create-engine.dto';

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
    async getAircafts() {
        return await this.engineService.getEngines();
    }
}
