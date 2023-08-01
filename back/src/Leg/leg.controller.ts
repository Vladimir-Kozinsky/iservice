import { Controller, HttpCode, Get, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LegService } from './leg.service';
import { Leg } from 'src/schemas/leg.schema';
import { CreateLegDto } from 'src/dto/leg/create-leg.dto';
import { Types } from 'mongoose';

@ApiTags('Leg')
@Controller('leg')
export class LegController {
    constructor(private readonly legService: LegService) { }

    @ApiOperation({ summary: 'Get legs' })
    @ApiResponse({ status: 201, type: [Leg] })
    @Get('/legs')
    @HttpCode(201)
    async getAircafts() {
        return await this.legService.getLegs();
    }

    @ApiOperation({ summary: 'Create leg' })
    @ApiResponse({ status: 201, type: Leg })
    @Post('/create')
    @HttpCode(201)
    async createLeg(@Body() createLegDto: CreateLegDto) {
        return await this.legService.createLeg(createLegDto);
    }

    @ApiOperation({ summary: 'Delete leg' })
    @ApiResponse({ status: 201, type: Leg })
    @Post('/delete')
    @HttpCode(201)
    async deleteLeg(@Body() legId: Types.ObjectId) {
        return await this.legService.deleteLeg(legId);
    }
}
