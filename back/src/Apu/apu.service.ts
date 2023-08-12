import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateApuDto } from 'src/dto/apu/create-apu.dto';
import { Apu } from 'src/schemas/apu.schema';

@Injectable()
export class ApuService {
    constructor(
        @InjectModel(Apu.name)
        private readonly apuModel: Model<Apu>,
    ) { }

    async add(createApuDto: CreateApuDto) {
        const apu = await this.apuModel.findOne({ msn: createApuDto.msn });
        if (apu) throw new HttpException('Apu with this msn already exists', HttpStatus.BAD_REQUEST);
        return await this.apuModel.create(createApuDto);
    }

    async getApus() {
        const apus = await this.apuModel.find();
        if (!apus.length) throw new HttpException('Apus not found', HttpStatus.BAD_REQUEST);
        return apus;
    }
}
