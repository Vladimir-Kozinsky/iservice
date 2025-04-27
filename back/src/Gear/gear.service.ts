import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateGearDto } from 'src/dto/create-gear.dto';
import { CreateGearLimitDto } from 'src/dto/create-gearLimit.dto';
import { Gear } from 'src/schemas/gear.schema';
import { GearLimit } from 'src/schemas/gearLimit.schema';

@Injectable()
export class GearService {
    constructor(
        @InjectModel(Gear.name)
        private readonly gearModel: Model<Gear>,
        @InjectModel(GearLimit.name)
        private readonly gearLimitModel: Model<GearLimit>,
    ) { }

    async add(createGearDto: CreateGearDto) {
        const gear = await this.gearModel.findOne({ sn: createGearDto.sn });
        if (gear) throw new HttpException('Gear with this sn already exists', HttpStatus.BAD_REQUEST);
        return await this.gearModel.create(createGearDto);
    }

    async getGears() {
        const gears = await this.gearModel.find();
        if (!gears.length) throw new HttpException('Gears not found', HttpStatus.BAD_REQUEST);
        return gears;
    }

    async getGear(getGearDto: { id: Types.ObjectId }) {
        console.log(getGearDto)
        const gear = await this.gearModel.findById(getGearDto.id);
        if (!gear) throw new HttpException('Gear not found', HttpStatus.BAD_REQUEST);
        return gear;
    }

    async addLimit(createGearLimitDto: CreateGearLimitDto) {
        const limit = await this.gearLimitModel.create(createGearLimitDto);
        const gear = await this.gearModel.findOne({ sn: createGearLimitDto.gearSn });
        if (!gear) throw new HttpException('Gear not found', HttpStatus.BAD_REQUEST);
        gear.limits.push(limit);
        await gear.save();
        await this.gearLimitModel.findByIdAndRemove(limit._id);
        return limit;
    }
    // async addLimit(createLimitDto: CreateLimitDto) {
    //     const limit = await this.limitModel.create(createLimitDto);
    //     const apu = await this.apuModel.findOne({ msn: createLimitDto.msn });
    //     if (!apu) throw new HttpException('APU not found', HttpStatus.BAD_REQUEST);
    //     apu.limits.push(limit);
    //     await apu.save();
    //     return limit;
    // }

    // async delLimit(deleteLimitDto: DeleteLimitDto) {
    //     const limit = await this.limitModel.deleteOne({ _id: deleteLimitDto.limitId });
    //     if (!limit.deletedCount) throw new HttpException('Limit not found', HttpStatus.BAD_REQUEST);

    //     const apu = await this.apuModel.findOne({ msn: deleteLimitDto.msn });
    //     if (!apu) throw new HttpException('APU not found', HttpStatus.BAD_REQUEST);

    //     const index = apu.limits.findIndex((limit: Limit) => limit._id.toString() == deleteLimitDto.limitId);
    //     if (index < 0) throw new HttpException('Limit has already deleted', HttpStatus.BAD_REQUEST);

    //     apu.limits.splice(index, 1);
    //     await apu.save()

    //     return deleteLimitDto.limitId;
    // }
}
