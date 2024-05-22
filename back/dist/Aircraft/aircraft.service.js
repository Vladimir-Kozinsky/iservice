"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AircraftService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const aircraft_schema_1 = require("../schemas/aircraft.schema");
const apu_schema_1 = require("../schemas/apu.schema");
const engine_schema_1 = require("../schemas/engine.schema");
const limit_schema_1 = require("../schemas/limit.schema");
let AircraftService = class AircraftService {
    constructor(aircraftModel, engineModel, apuModel, limitModel) {
        this.aircraftModel = aircraftModel;
        this.engineModel = engineModel;
        this.apuModel = apuModel;
        this.limitModel = limitModel;
    }
    async add(createAircraftDto) {
        const aircraft = await this.aircraftModel.findOne({ msn: createAircraftDto.msn });
        if (aircraft)
            throw new common_1.HttpException('Aircraft with this msn already exists', common_1.HttpStatus.BAD_REQUEST);
        return await this.aircraftModel.create(createAircraftDto);
    }
    async getAircrafts() {
        const aircrafts = await this.aircraftModel.find()
            .populate('apu').populate('limits');
        if (!aircrafts.length)
            throw new common_1.HttpException('Aircrafts not found', common_1.HttpStatus.BAD_REQUEST);
        return aircrafts;
    }
    async installEngine(installDataDto) {
        const engine = await this.engineModel.findOne({ msn: installDataDto.engine });
        if (!engine)
            throw new common_1.HttpException('Engine not found', common_1.HttpStatus.BAD_REQUEST);
        const aircraft = await this.aircraftModel.findOne({ msn: installDataDto.aircraft });
        if (!aircraft)
            throw new common_1.HttpException('Aircraft not found', common_1.HttpStatus.BAD_REQUEST);
        const installedEngine = aircraft.engines.find((engine) => engine.msn === installDataDto.engine);
        if (installedEngine)
            throw new common_1.HttpException('Engine has already installed', common_1.HttpStatus.BAD_REQUEST);
        const isEmptyEnginePos = aircraft.engines.find((engine) => engine.position === installDataDto.position);
        if (isEmptyEnginePos)
            throw new common_1.HttpException(`Engine has already installed on ${installDataDto.position} position`, common_1.HttpStatus.BAD_REQUEST);
        engine.engineHistory.push(installDataDto);
        engine.position = installDataDto.position;
        await engine.save();
        aircraft.engines.push(engine);
        await aircraft.save();
        return engine;
    }
    async installApu(installDataDto) {
        const apu = await this.apuModel.findOne({ msn: installDataDto.apu });
        if (!apu)
            throw new common_1.HttpException('Apu not found', common_1.HttpStatus.BAD_REQUEST);
        const aircraft = await this.aircraftModel.findOne({ msn: installDataDto.aircraft });
        if (!aircraft)
            throw new common_1.HttpException('Aircraft not found', common_1.HttpStatus.BAD_REQUEST);
        const installedApu = aircraft.apu;
        if (installedApu)
            throw new common_1.HttpException('Apu has already installed', common_1.HttpStatus.BAD_REQUEST);
        aircraft.apu = apu;
        await aircraft.save();
        apu.apuHistory.push(installDataDto);
        await apu.save();
        return apu;
    }
    async removeEngine(removalDataDto) {
        const engine = await this.engineModel.findOne({ msn: removalDataDto.engine });
        if (!engine)
            throw new common_1.HttpException('Engine not found', common_1.HttpStatus.BAD_REQUEST);
        const aircraft = await this.aircraftModel.findOne({ msn: removalDataDto.aircraft });
        if (!aircraft)
            throw new common_1.HttpException('Aircraft not found', common_1.HttpStatus.BAD_REQUEST);
        engine.engineHistory.push(removalDataDto);
        engine.position = 0;
        await engine.save();
        const index = aircraft.engines.findIndex((engine) => engine.msn === removalDataDto.engine);
        if (index < 0)
            throw new common_1.HttpException('Engine has already removed', common_1.HttpStatus.BAD_REQUEST);
        aircraft.engines.splice(index, 1);
        await aircraft.save();
        return engine;
    }
    async removeApu(removalDataDto) {
        const apu = await this.apuModel.findOne({ msn: removalDataDto.apu });
        if (!apu)
            throw new common_1.HttpException('Engine not found', common_1.HttpStatus.BAD_REQUEST);
        const aircraft = await this.aircraftModel.findOne({ msn: removalDataDto.aircraft });
        if (!aircraft)
            throw new common_1.HttpException('Aircraft not found', common_1.HttpStatus.BAD_REQUEST);
        apu.apuHistory.push(removalDataDto);
        await apu.save();
        aircraft.apu = null;
        await aircraft.save();
        return apu;
    }
    async addLimit(createLimitDto) {
        const limit = await this.limitModel.create(createLimitDto);
        const aircraft = await this.aircraftModel.findOne({ msn: createLimitDto.msn });
        if (!aircraft)
            throw new common_1.HttpException('Aircraft not found', common_1.HttpStatus.BAD_REQUEST);
        aircraft.limits.push(limit);
        await aircraft.save();
        return limit;
    }
    async delLimit(deleteLimitDto) {
        const limit = await this.limitModel.deleteOne({ _id: deleteLimitDto.limitId });
        if (!limit.deletedCount)
            throw new common_1.HttpException('Limit not found', common_1.HttpStatus.BAD_REQUEST);
        const aircraft = await this.aircraftModel.findOne({ msn: deleteLimitDto.msn });
        if (!aircraft)
            throw new common_1.HttpException('Aircraft not found', common_1.HttpStatus.BAD_REQUEST);
        const index = aircraft.limits.findIndex((limit) => limit._id.toString() == deleteLimitDto.limitId);
        if (index < 0)
            throw new common_1.HttpException('Limit has already deleted', common_1.HttpStatus.BAD_REQUEST);
        aircraft.limits.splice(index, 1);
        await aircraft.save();
        return deleteLimitDto.limitId;
    }
    async updateLimit(deleteLimitDto) {
        const limit = await this.limitModel.updateOne({ _id: deleteLimitDto.limitId }, { dependence: "fc" });
        if (!limit)
            throw new common_1.HttpException('Limit not found', common_1.HttpStatus.BAD_REQUEST);
        const aircraft = await this.aircraftModel.findOne({ msn: deleteLimitDto.msn }).populate('limits');
        return limit;
    }
};
AircraftService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(aircraft_schema_1.Aircraft.name)),
    __param(1, (0, mongoose_1.InjectModel)(engine_schema_1.Engine.name)),
    __param(2, (0, mongoose_1.InjectModel)(apu_schema_1.Apu.name)),
    __param(3, (0, mongoose_1.InjectModel)(limit_schema_1.Limit.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], AircraftService);
exports.AircraftService = AircraftService;
//# sourceMappingURL=aircraft.service.js.map