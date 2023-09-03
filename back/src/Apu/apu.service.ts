import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateApuDto } from 'src/dto/apu/create-apu.dto';
import { CreateLimitDto } from 'src/dto/create-limit.dto';
import { DeleteLimitDto } from 'src/dto/delete-limit.dto';
import { Apu } from 'src/schemas/apu.schema';
import { Limit } from 'src/schemas/limit.schema';

@Injectable()
export class ApuService {
    constructor(
        @InjectModel(Apu.name)
        private readonly apuModel: Model<Apu>,
        @InjectModel(Limit.name)
        private readonly limitModel: Model<Limit>,
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

    async addLimit(createLimitDto: CreateLimitDto) {
        const limit = await this.limitModel.create(createLimitDto);
        const apu = await this.apuModel.findOne({ msn: createLimitDto.msn });
        if (!apu) throw new HttpException('APU not found', HttpStatus.BAD_REQUEST);
        apu.limits.push(limit);
        await apu.save();
        return limit;
    }

    async delLimit(deleteLimitDto: DeleteLimitDto) {
        const limit = await this.limitModel.deleteOne({ _id: deleteLimitDto.limitId });
        if (!limit.deletedCount) throw new HttpException('Limit not found', HttpStatus.BAD_REQUEST);

        const apu = await this.apuModel.findOne({ msn: deleteLimitDto.msn });
        if (!apu) throw new HttpException('APU not found', HttpStatus.BAD_REQUEST);

        const index = apu.limits.findIndex((limit: Limit) => limit._id.toString() == deleteLimitDto.limitId);
        if (index < 0) throw new HttpException('Limit has already deleted', HttpStatus.BAD_REQUEST);

        apu.limits.splice(index, 1);
        await apu.save()

        return deleteLimitDto.limitId;
    }
}
