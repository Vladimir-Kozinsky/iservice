import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUnitDto } from 'src/dto/unit/create-unit.dto';
import { Unit } from 'src/schemas/unit.schema';

@Injectable()
export class UnitService {
    constructor(
        @InjectModel(Unit.name)
        private readonly unitModel: Model<Unit>,

    ) { }
    async createUnit(createUnitDto: CreateUnitDto) {
        const unit = await this.unitModel.findOne({ sn: createUnitDto.sn });
        if (unit) throw new HttpException('Unit with this sn already exists', HttpStatus.BAD_REQUEST);
        return await this.unitModel.create(createUnitDto);
    }

    async getLastTenUnits() {
        const units = await this.unitModel.find();
        if (!units.length) throw new HttpException('Units not found', HttpStatus.BAD_REQUEST);
        return units.splice(0, 10);
    }
}
