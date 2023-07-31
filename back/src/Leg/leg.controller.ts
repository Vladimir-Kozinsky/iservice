import { Controller, HttpCode, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LegService } from './leg.service';
import { Leg } from 'src/schemas/leg.schema';

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
}
