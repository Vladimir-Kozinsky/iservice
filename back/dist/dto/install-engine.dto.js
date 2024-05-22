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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstallEngineDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class InstallEngineDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-30', description: "Install date" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InstallEngineDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'removal', description: "Action" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InstallEngineDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '25891', description: "Aircraft MSN" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InstallEngineDto.prototype, "aircraft", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '36891', description: "Engine MSN" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InstallEngineDto.prototype, "engine", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2', description: "Engine position" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], InstallEngineDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2891:00', description: "Aircraft Time Since New" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InstallEngineDto.prototype, "aircraftTsn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2891:00', description: "Cycles Time Since New" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InstallEngineDto.prototype, "aircraftCsn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5891:00', description: "Engine Time Since New" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InstallEngineDto.prototype, "engineTsn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '3891:00', description: "Engine Time Cycles New" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InstallEngineDto.prototype, "engineCsn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'none', description: "Engine removal reason" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InstallEngineDto.prototype, "reason", void 0);
exports.InstallEngineDto = InstallEngineDto;
//# sourceMappingURL=install-engine.dto.js.map