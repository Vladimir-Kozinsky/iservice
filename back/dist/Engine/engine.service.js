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
exports.EngineService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const engine_schema_1 = require("../schemas/engine.schema");
const limit_schema_1 = require("../schemas/limit.schema");
let EngineService = class EngineService {
    constructor(engineModel, limitModel) {
        this.engineModel = engineModel;
        this.limitModel = limitModel;
    }
    async add(createEngineDto) {
        const engine = await this.engineModel.findOne({ msn: createEngineDto.msn });
        if (engine)
            throw new common_1.HttpException('Engine with this msn already exists', common_1.HttpStatus.BAD_REQUEST);
        return await this.engineModel.create(createEngineDto);
    }
    async getEngines() {
        const engines = await this.engineModel.find();
        if (!engines.length)
            throw new common_1.HttpException('Engines not found', common_1.HttpStatus.BAD_REQUEST);
        return engines;
    }
    async addLimit(createLimitDto) {
        const limit = await this.limitModel.create(createLimitDto);
        const engine = await this.engineModel.findOne({ msn: createLimitDto.msn });
        if (!engine)
            throw new common_1.HttpException('Engine not found', common_1.HttpStatus.BAD_REQUEST);
        engine.limits.push(limit);
        await engine.save();
        return limit;
    }
    async delLimit(deleteLimitDto) {
        const limit = await this.limitModel.deleteOne({ _id: deleteLimitDto.limitId });
        if (!limit.deletedCount)
            throw new common_1.HttpException('Limit not found', common_1.HttpStatus.BAD_REQUEST);
        const engine = await this.engineModel.findOne({ msn: deleteLimitDto.msn });
        if (!engine)
            throw new common_1.HttpException('Engine not found', common_1.HttpStatus.BAD_REQUEST);
        const index = engine.limits.findIndex((limit) => limit._id.toString() == deleteLimitDto.limitId);
        if (index < 0)
            throw new common_1.HttpException('Limit has already deleted', common_1.HttpStatus.BAD_REQUEST);
        engine.limits.splice(index, 1);
        await engine.save();
        return deleteLimitDto.limitId;
    }
};
EngineService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(engine_schema_1.Engine.name)),
    __param(1, (0, mongoose_1.InjectModel)(limit_schema_1.Limit.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], EngineService);
exports.EngineService = EngineService;
//# sourceMappingURL=engine.service.js.map