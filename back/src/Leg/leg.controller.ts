import { Controller, HttpCode, Get, Post, Body, Param, Req, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LegService } from './leg.service';
import { Leg } from 'src/schemas/leg.schema';
import { CreateLegDto } from 'src/dto/leg/create-leg.dto';
import { Types } from 'mongoose';
import { GetLegsDto } from 'src/dto/leg/get-legs.dto';
import { ResponseLegsDto } from 'src/dto/leg/response-legs.dto';
import { GetPrintLegsDto } from 'src/dto/leg/get-print-legs.dto';

@ApiTags('Leg')
@Controller('leg')
export class LegController {
    constructor(private readonly legService: LegService) { }

    @ApiOperation({ summary: 'Get legs' })
    @ApiResponse({ status: 201, type: ResponseLegsDto })
    @Get('/legs')
    @HttpCode(201)
    async getAircafts(@Query() getLegsDto: GetLegsDto) {
        return await this.legService.getLegs(getLegsDto);
    }

    @ApiOperation({ summary: 'Get ten legs' })
    @ApiResponse({ status: 201, type: [Leg] })
    @Get('/legs/last')
    @HttpCode(201)
    async getLastTenLegs(@Query() getLastTenLegsDto: { aircraft: string }) {
        return await this.legService.getLastTenLegs(getLastTenLegsDto.aircraft);
    }

    @ApiOperation({ summary: 'Get legs for print' })
    @ApiResponse({ status: 201, type: [Leg] })
    @Get('/legs/print')
    @HttpCode(201)
    async getPrintLegs(@Query() getPrintLegsDto: GetPrintLegsDto) {
        return await this.legService.getPrintLegs(getPrintLegsDto);
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
    async deleteLeg(@Body() legId: { legId: Types.ObjectId }) {
        return await this.legService.deleteLeg(legId.legId);
    }
}
