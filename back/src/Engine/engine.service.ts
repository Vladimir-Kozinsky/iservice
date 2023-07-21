import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEngineDto } from 'src/dto/create-engine.dto';
import { Engine } from 'src/schemas/engine.schema';

@Injectable()
export class EngineService {
    constructor(
        @InjectModel(Engine.name)
        private readonly engineModel: Model<Engine>,
    ) { }

    async add(createEngineDto: CreateEngineDto) {
        const engine = await this.engineModel.findOne({ msn: createEngineDto.msn });
        if (engine) throw new HttpException('Engine with this msn already exists', HttpStatus.BAD_REQUEST);
        return await this.engineModel.create(createEngineDto);
    }

    async getEngines() {
        const engines = await this.engineModel.find();
        if (!engines.length) throw new HttpException('Engines not found', HttpStatus.BAD_REQUEST);
        return engines;
    }
}
