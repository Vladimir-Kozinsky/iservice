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
exports.AircraftController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const aircraft_service_1 = require("./aircraft.service");
const create_aircraft_dto_1 = require("../dto/create-aircraft.dto");
const aircraft_schema_1 = require("../schemas/aircraft.schema");
const install_engine_dto_1 = require("../dto/install-engine.dto");
const engine_schema_1 = require("../schemas/engine.schema");
const limit_schema_1 = require("../schemas/limit.schema");
const create_limit_dto_1 = require("../dto/create-limit.dto");
const delete_limit_dto_1 = require("../dto/delete-limit.dto");
const install_apu_dto_1 = require("../dto/apu/install-apu.dto");
const apu_schema_1 = require("../schemas/apu.schema");
let AircraftController = class AircraftController {
    constructor(aircraftService) {
        this.aircraftService = aircraftService;
    }
    async add(createAircraftDto) {
        return await this.aircraftService.add(createAircraftDto);
    }
    async getAircafts() {
        return await this.aircraftService.getAircrafts();
    }
    async installEngine(installDataDto) {
        return await this.aircraftService.installEngine(installDataDto);
    }
    async removeEngine(removalDataDto) {
        return await this.aircraftService.removeEngine(removalDataDto);
    }
    async installApu(installDataDto) {
        return await this.aircraftService.installApu(installDataDto);
    }
    async removeApu(removalDataDto) {
        return await this.aircraftService.removeApu(removalDataDto);
    }
    async addLimit(createLimitDto) {
        return await this.aircraftService.addLimit(createLimitDto);
    }
    async delLimit(deleteLimitDto) {
        return await this.aircraftService.delLimit(deleteLimitDto);
    }
    async updateLimit(deleteLimitDto) {
        return await this.aircraftService.updateLimit(deleteLimitDto);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add aircraft' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: aircraft_schema_1.Aircraft }),
    (0, common_1.Post)('/add'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_aircraft_dto_1.CreateAircraftDto]),
    __metadata("design:returntype", Promise)
], AircraftController.prototype, "add", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get aircrafts' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: [aircraft_schema_1.Aircraft] }),
    (0, common_1.Get)('/aircrafts'),
    (0, common_1.HttpCode)(201),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AircraftController.prototype, "getAircafts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Install engine' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: [engine_schema_1.Engine] }),
    (0, common_1.Post)('/engine/install'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [install_engine_dto_1.InstallEngineDto]),
    __metadata("design:returntype", Promise)
], AircraftController.prototype, "installEngine", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Remove engine' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: engine_schema_1.Engine }),
    (0, common_1.Post)('/engine/remove'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [install_engine_dto_1.InstallEngineDto]),
    __metadata("design:returntype", Promise)
], AircraftController.prototype, "removeEngine", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Install APU' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: [engine_schema_1.Engine] }),
    (0, common_1.Post)('/apu/install'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [install_apu_dto_1.InstallApuDto]),
    __metadata("design:returntype", Promise)
], AircraftController.prototype, "installApu", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Remove APU' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: apu_schema_1.Apu }),
    (0, common_1.Post)('/apu/remove'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [install_apu_dto_1.InstallApuDto]),
    __metadata("design:returntype", Promise)
], AircraftController.prototype, "removeApu", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add new limit' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: limit_schema_1.Limit }),
    (0, common_1.Post)('/limit/add'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_limit_dto_1.CreateLimitDto]),
    __metadata("design:returntype", Promise)
], AircraftController.prototype, "addLimit", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete limit' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: limit_schema_1.Limit }),
    (0, common_1.Post)('/limit/delete'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_limit_dto_1.DeleteLimitDto]),
    __metadata("design:returntype", Promise)
], AircraftController.prototype, "delLimit", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update limit' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: limit_schema_1.Limit }),
    (0, common_1.Post)('/limit/update'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_limit_dto_1.DeleteLimitDto]),
    __metadata("design:returntype", Promise)
], AircraftController.prototype, "updateLimit", null);
AircraftController = __decorate([
    (0, swagger_1.ApiTags)('Aircraft'),
    (0, common_1.Controller)('/aircraft'),
    __metadata("design:paramtypes", [aircraft_service_1.AircraftService])
], AircraftController);
exports.AircraftController = AircraftController;
//# sourceMappingURL=aircraft.controller.js.map