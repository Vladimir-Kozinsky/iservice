import { Controller, Post, HttpCode, Body, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AircraftService } from './aircraft.service';
import { CreateAircraftDto } from 'src/dto/create-aircraft.dto';

@ApiTags('Aircraft')
@Controller('/aircraft')
export class AircraftController {
    constructor(private readonly aircraftService: AircraftService) { }

    @ApiOperation({ summary: 'Add aircraft' })
    @ApiResponse({ status: 201, type: CreateAircraftDto })
    @Post('/add')
    @HttpCode(201)
    async add(@Body() createUserDto: CreateAircraftDto) {
        return await this.aircraftService.add(createUserDto)
    }

    @ApiOperation({ summary: 'Get aircrafts' })
    @ApiResponse({ status: 201, type: [CreateAircraftDto] })
    @Get('/aircrafts')
    @HttpCode(201)
    async getAircafts() {
        return await this.aircraftService.getAircrafts();
    }
}
