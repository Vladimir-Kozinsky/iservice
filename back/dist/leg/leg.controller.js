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
exports.LegController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const leg_service_1 = require("./leg.service");
const leg_schema_1 = require("../schemas/leg.schema");
const create_leg_dto_1 = require("../dto/leg/create-leg.dto");
const mongoose_1 = require("mongoose");
const get_legs_dto_1 = require("../dto/leg/get-legs.dto");
const response_legs_dto_1 = require("../dto/leg/response-legs.dto");
const get_print_legs_dto_1 = require("../dto/leg/get-print-legs.dto");
let LegController = class LegController {
    constructor(legService) {
        this.legService = legService;
    }
    async getAircafts(getLegsDto) {
        return await this.legService.getLegs(getLegsDto);
    }
    async getLastTenLegs(getLastTenLegsDto) {
        return await this.legService.getLastTenLegs(getLastTenLegsDto.aircraft);
    }
    async getPrintLegs(getPrintLegsDto) {
        return await this.legService.getPrintLegs(getPrintLegsDto);
    }
    async createLeg(createLegDto) {
        return await this.legService.createLeg(createLegDto);
    }
    async deleteLeg(deleteLegDto) {
        return await this.legService.deleteLeg(deleteLegDto);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get legs' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: response_legs_dto_1.ResponseLegsDto }),
    (0, common_1.Get)('/legs'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_legs_dto_1.GetLegsDto]),
    __metadata("design:returntype", Promise)
], LegController.prototype, "getAircafts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get ten legs' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: [leg_schema_1.Leg] }),
    (0, common_1.Get)('/legs/last'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LegController.prototype, "getLastTenLegs", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get legs for print' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: [leg_schema_1.Leg] }),
    (0, common_1.Get)('/legs/print'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_print_legs_dto_1.GetPrintLegsDto]),
    __metadata("design:returntype", Promise)
], LegController.prototype, "getPrintLegs", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create leg' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: leg_schema_1.Leg }),
    (0, common_1.Post)('/create'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_leg_dto_1.CreateLegDto]),
    __metadata("design:returntype", Promise)
], LegController.prototype, "createLeg", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete leg' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: mongoose_1.Types.ObjectId }),
    (0, common_1.Post)('/delete'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [leg_schema_1.Leg]),
    __metadata("design:returntype", Promise)
], LegController.prototype, "deleteLeg", null);
LegController = __decorate([
    (0, swagger_1.ApiTags)('Leg'),
    (0, common_1.Controller)('leg'),
    __metadata("design:paramtypes", [leg_service_1.LegService])
], LegController);
exports.LegController = LegController;
//# sourceMappingURL=leg.controller.js.map