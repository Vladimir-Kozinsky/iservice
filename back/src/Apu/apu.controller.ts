import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApuService } from './apu.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateApuDto } from 'src/dto/apu/create-apu.dto';
import { Apu } from 'src/schemas/apu.schema';

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


}
