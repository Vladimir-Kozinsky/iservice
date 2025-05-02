import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChangeUnitDto } from 'src/dto/unit/change-unit.dto';
import { CreateUnitDto } from 'src/dto/unit/create-unit.dto';
import { GetUnitsDto } from 'src/dto/unit/get-units.dto';
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

    async editUnit(editUnitDto: ChangeUnitDto) {
        const unit = await this.unitModel.findOneAndReplace({ _id: editUnitDto._id }, editUnitDto);
        if (!unit) throw new HttpException('Unit with this sn is not exists', HttpStatus.BAD_REQUEST);

        const updatedUnit = await this.unitModel.findOne({ sn: editUnitDto.sn });
        if (!unit) throw new HttpException('Unit with this sn is not exists', HttpStatus.BAD_REQUEST);
        await console.log(updatedUnit)
        return updatedUnit;
    }

    async deleteUnit(deleteUnitDto: { sn: string }) {
        const unit = await this.unitModel.findOneAndDelete({ sn: deleteUnitDto.sn });
        console.log(unit)
        if (!unit) throw new HttpException('Unit with this sn is not exists', HttpStatus.BAD_REQUEST);
        return unit;
    }

    async getLastTenUnits(getUnitsDto: GetUnitsDto) {
        if (!getUnitsDto.searchText) {
            const unitsNumber = await this.unitModel.find().count();
            if (!unitsNumber) throw new HttpException('Units not found', HttpStatus.BAD_REQUEST);
            const numberUnitsToScip = getUnitsDto.page === 1 ? 0 : (getUnitsDto.page - 1) * getUnitsDto.unitsAtPage;

            const units = await this.unitModel
                .find({ location: getUnitsDto.locationFilter, type: getUnitsDto.typeFilter })
                .skip(numberUnitsToScip)
                .limit(getUnitsDto.unitsAtPage);

            if (!units.length) throw new HttpException('Units not found', HttpStatus.BAD_REQUEST);
            return {
                totalPages: Math.ceil(unitsNumber / getUnitsDto.unitsAtPage),
                currentPage: getUnitsDto.page,
                units: units
            };
        }

        const units = await this.unitModel.find(({
            location: getUnitsDto.locationFilter,
            type: getUnitsDto.typeFilter,
            pn: { $regex: getUnitsDto.searchText }
        }));
        
        if (!units.length) throw new HttpException('Units not found', HttpStatus.BAD_REQUEST);

        return {
            totalPages: Math.ceil(+units.length / getUnitsDto.unitsAtPage),
            currentPage: getUnitsDto.page,
            units: units
        };

    }


}
