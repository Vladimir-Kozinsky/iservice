import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChangeUnitDto } from 'src/dto/unit/change-unit.dto';
import { CreateUnitDto } from 'src/dto/unit/create-unit.dto';
import { GetUnitsDto } from 'src/dto/unit/get-units.dto';
import { GetPrintUnitsDto } from 'src/dto/unit/print-units.dto';
import { UseUnitDto } from 'src/dto/unit/use-unit.dto';
import { Unit } from 'src/schemas/unit.schema';

@Injectable()
export class UnitService {
    constructor(
        @InjectModel(Unit.name)
        private readonly unitModel: Model<Unit>,

    ) { }
    async createUnit(createUnitDto: CreateUnitDto) {
        const unit = await this.unitModel.findOne({ sn: createUnitDto.sn });
        if (unit && createUnitDto.sn) throw new HttpException('Unit with this sn already exists', HttpStatus.BAD_REQUEST);
        return await this.unitModel.create(createUnitDto);
    }

    async editUnit(editUnitDto: ChangeUnitDto) {
        const unit = await this.unitModel.findOneAndReplace({ _id: editUnitDto._id }, editUnitDto);
        if (!unit) throw new HttpException('Unit with this sn is not exists', HttpStatus.BAD_REQUEST);

        const updatedUnit = await this.unitModel.findOne({ _id: editUnitDto._id });
        if (!updatedUnit) throw new HttpException('Unit with this id is not exists', HttpStatus.BAD_REQUEST);
        await console.log(updatedUnit)
        return updatedUnit;
    }

    async deleteUnit(deleteUnitDto: { id: string }) {
        const unit = await this.unitModel.findOneAndDelete({ _id: deleteUnitDto.id });
        console.log(unit)
        if (!unit) throw new HttpException('Unit with this id is not exists', HttpStatus.BAD_REQUEST);
        return unit;
    }

    async getUnits(getUnitsDto: GetUnitsDto) {
        if (!getUnitsDto.searchText) {
            const unitsNumber = await this.unitModel.find().count();
            if (!unitsNumber) throw new HttpException('Units not found', HttpStatus.BAD_REQUEST);
            const numberUnitsToScip = getUnitsDto.page === 1 ? 0 : (getUnitsDto.page - 1) * getUnitsDto.unitsAtPage;

            const units = await this.unitModel
                .find({ location: getUnitsDto.locationFilter })
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
            pn: { $regex: getUnitsDto.searchText }
        }));

        if (!units.length) throw new HttpException('Units not found', HttpStatus.BAD_REQUEST);

        return {
            totalPages: Math.ceil(+units.length / getUnitsDto.unitsAtPage),
            currentPage: getUnitsDto.page,
            units: units
        };

    }


    async getPrintUnits(getPrintUnitsDto: GetPrintUnitsDto) {

        if (!getPrintUnitsDto.searchText) {
            const units = await this.unitModel.find({ location: getPrintUnitsDto.locationFilter })
            if (!units.length) throw new HttpException('Units not found', HttpStatus.BAD_REQUEST);
            return units;
        }

        const units = await this.unitModel.find(({
            location: getPrintUnitsDto.locationFilter,
            pn: { $regex: getPrintUnitsDto.searchText }
        }));

        if (!units.length) throw new HttpException('Units not found', HttpStatus.BAD_REQUEST);

        return units;
    }

    async useUnit(useUnitDto: UseUnitDto) {
        const currentUnit = await this.unitModel.findOne({ _id: useUnitDto._id });
        if (!currentUnit) throw new HttpException('Unit with this id is not exists', HttpStatus.BAD_REQUEST);


        const unit = await this.unitModel.findOneAndUpdate({ _id: useUnitDto._id }, { quantity: currentUnit.quantity - useUnitDto.quantity });
        if (!unit) throw new HttpException('Unit with this id is not exists', HttpStatus.BAD_REQUEST);
        unit.usage.push({
            date: useUnitDto.date,
            aircraft: useUnitDto.aircraft,
            wo: useUnitDto.wo,
            quantity: useUnitDto.quantity,
            remark: useUnitDto.remark
        });

        unit.save();

        const updatedUnit = await this.unitModel.findOne({ _id: useUnitDto._id });
        if (!updatedUnit) throw new HttpException('Unit with this id is not exists', HttpStatus.BAD_REQUEST);
        await console.log(updatedUnit)
        return updatedUnit;
    }
}
