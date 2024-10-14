import { Controller, Post, HttpCode, Body, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AircraftService } from './aircraft.service';
import { CreateAircraftDto } from 'src/dto/create-aircraft.dto';
import { Aircraft } from 'src/schemas/aircraft.schema';
import { InstallEngineDto } from 'src/dto/install-engine.dto';
import { Engine } from 'src/schemas/engine.schema';
import { Limit } from 'src/schemas/limit.schema';
import { CreateLimitDto } from 'src/dto/create-limit.dto';
import { DeleteLimitDto } from 'src/dto/delete-limit.dto';
import { InstallApuDto } from 'src/dto/apu/install-apu.dto';
import { Apu } from 'src/schemas/apu.schema';
import { Lg } from 'src/schemas/gear.schema';
import { CreateLgDto } from 'src/dto/create-lg.dto';

@ApiTags('Aircraft')
@Controller('/aircraft')
export class AircraftController {
    constructor(private readonly aircraftService: AircraftService) { }

    @ApiOperation({ summary: 'Add aircraft' })
    @ApiResponse({ status: 201, type: Aircraft })
    @Post('/add')
    @HttpCode(201)
    async add(@Body() createAircraftDto: CreateAircraftDto) {
        return await this.aircraftService.add(createAircraftDto)
    }

    @ApiOperation({ summary: 'Get aircrafts' })
    @ApiResponse({ status: 201, type: [Aircraft] })
    @Get('/aircrafts')
    @HttpCode(201)
    async getAircafts() {
        return await this.aircraftService.getAircrafts();
    }

    @ApiOperation({ summary: 'Install engine' })
    @ApiResponse({ status: 201, type: [Engine] })
    @Post('/engine/install')
    @HttpCode(201)
    async installEngine(@Body() installDataDto: InstallEngineDto) {
        return await this.aircraftService.installEngine(installDataDto);
    }
   
    @ApiOperation({ summary: 'Remove engine' })
    @ApiResponse({ status: 201, type: Engine })
    @Post('/engine/remove')
    @HttpCode(201)
    async removeEngine(@Body() removalDataDto: InstallEngineDto) {
        return await this.aircraftService.removeEngine(removalDataDto);
    }


    @ApiOperation({ summary: 'Install APU' })
    @ApiResponse({ status: 201, type: [Engine] })
    @Post('/apu/install')
    @HttpCode(201)
    async installApu(@Body() installDataDto: InstallApuDto) {
        return await this.aircraftService.installApu(installDataDto);
    }

    @ApiOperation({ summary: 'Remove APU' })
    @ApiResponse({ status: 201, type: Apu })
    @Post('/apu/remove')
    @HttpCode(201)
    async removeApu(@Body() removalDataDto: InstallApuDto) {
        return await this.aircraftService.removeApu(removalDataDto);
    }

    @ApiOperation({ summary: 'Add new limit' })
    @ApiResponse({ status: 201, type: Limit })
    @Post('/limit/add')
    @HttpCode(201)
    async addLimit(@Body() createLimitDto: CreateLimitDto ) {
        return await this.aircraftService.addLimit(createLimitDto);
    }

    @ApiOperation({ summary: 'Delete limit' })
    @ApiResponse({ status: 201, type: Limit })
    @Post('/limit/delete')
    @HttpCode(201)
    async delLimit(@Body() deleteLimitDto: DeleteLimitDto ) {
        return await this.aircraftService.delLimit(deleteLimitDto);
    }

    @ApiOperation({ summary: 'Add new LG' })
    @ApiResponse({ status: 201, type: Lg })
    @Post('/lg/add')
    @HttpCode(201)
    async addLg(@Body() createLgDto: CreateLgDto ) {
        return await this.aircraftService.addLg(createLgDto);
    }

    @ApiOperation({ summary: 'Update limit' })
    @ApiResponse({ status: 201, type: Limit })
    @Post('/limit/update')
    @HttpCode(201)
    async updateLimit(@Body() deleteLimitDto: DeleteLimitDto ) {
        return await this.aircraftService.updateLimit(deleteLimitDto);
    }
}
