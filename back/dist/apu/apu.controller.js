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
exports.ApuController = void 0;
const common_1 = require("@nestjs/common");
const apu_service_1 = require("./apu.service");
const swagger_1 = require("@nestjs/swagger");
const create_apu_dto_1 = require("../dto/apu/create-apu.dto");
const apu_schema_1 = require("../schemas/apu.schema");
const limit_schema_1 = require("../schemas/limit.schema");
const create_limit_dto_1 = require("../dto/create-limit.dto");
const delete_limit_dto_1 = require("../dto/delete-limit.dto");
let ApuController = class ApuController {
    constructor(apuService) {
        this.apuService = apuService;
    }
    async add(createApuDto) {
        return await this.apuService.add(createApuDto);
    }
    async getApus() {
        return await this.apuService.getApus();
    }
    async addLimit(createLimitDto) {
        return await this.apuService.addLimit(createLimitDto);
    }
    async delLimit(deleteLimitDto) {
        return await this.apuService.delLimit(deleteLimitDto);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add APU' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: apu_schema_1.Apu }),
    (0, common_1.Post)('/add'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_apu_dto_1.CreateApuDto]),
    __metadata("design:returntype", Promise)
], ApuController.prototype, "add", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get APUs' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: [apu_schema_1.Apu] }),
    (0, common_1.Get)('/apus'),
    (0, common_1.HttpCode)(201),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApuController.prototype, "getApus", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add new limit' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: limit_schema_1.Limit }),
    (0, common_1.Post)('/limit/add'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_limit_dto_1.CreateLimitDto]),
    __metadata("design:returntype", Promise)
], ApuController.prototype, "addLimit", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete limit' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: limit_schema_1.Limit }),
    (0, common_1.Post)('/limit/delete'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_limit_dto_1.DeleteLimitDto]),
    __metadata("design:returntype", Promise)
], ApuController.prototype, "delLimit", null);
ApuController = __decorate([
    (0, common_1.Controller)('apu'),
    __metadata("design:paramtypes", [apu_service_1.ApuService])
], ApuController);
exports.ApuController = ApuController;
//# sourceMappingURL=apu.controller.js.map