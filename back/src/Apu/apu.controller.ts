import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApuService } from './apu.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateApuDto } from 'src/dto/apu/create-apu.dto';
import { Apu } from 'src/schemas/apu.schema';
import { Limit } from 'src/schemas/limit.schema';
import { CreateLimitDto } from 'src/dto/create-limit.dto';
import { DeleteLimitDto } from 'src/dto/delete-limit.dto';

@Controller('apu')
export class ApuController {
    constructor(private readonly apuService: ApuService) { }

    @ApiOperation({ summary: 'Add APU' })
    @ApiResponse({ status: 201, type: Apu })
    @Post('/add')
    @HttpCode(201)
    async add(@Body() createApuDto: CreateApuDto) {
        return await this.apuService.add(createApuDto)
    }

    @ApiOperation({ summary: 'Get APUs' })
    @ApiResponse({ status: 201, type: [Apu] })
    @Get('/apus')
    @HttpCode(201)
    async getApus() {
        return await this.apuService.getApus();
    }

    @ApiOperation({ summary: 'Add new limit' })
    @ApiResponse({ status: 201, type: Limit })
    @Post('/limit/add')
    @HttpCode(201)
    async addLimit(@Body() createLimitDto: CreateLimitDto ) {
        return await this.apuService.addLimit(createLimitDto);
    }

    @ApiOperation({ summary: 'Delete limit' })
    @ApiResponse({ status: 201, type: Limit })
    @Post('/limit/delete')
    @HttpCode(201)
    async delLimit(@Body() deleteLimitDto: DeleteLimitDto ) {
        return await this.apuService.delLimit(deleteLimitDto);

    }

}
