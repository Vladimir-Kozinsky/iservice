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
exports.CreateApuDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateApuDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CFM56-3C1', description: "APU type" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateApuDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '25891', description: "APU manufacturer's Serial Number" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateApuDto.prototype, "msn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1989-01-30', description: "APU manufacturere date" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateApuDto.prototype, "manufDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '45697:00', description: "APU Time Since New" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateApuDto.prototype, "tsn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '45697:00', description: "APU Cycles Since New" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateApuDto.prototype, "csn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'none', description: "APU removal/instolation action" }),
    __metadata("design:type", Array)
], CreateApuDto.prototype, "apuHistory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '4', description: "The number of engine overhauls." }),
    __metadata("design:type", Number)
], CreateApuDto.prototype, "overhaulNum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-30', description: "Last overhaul date" }),
    __metadata("design:type", String)
], CreateApuDto.prototype, "lastOverhaulDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '45231:00', description: "FH at the time of last overhaul" }),
    __metadata("design:type", String)
], CreateApuDto.prototype, "tsnAtLastOverhaul", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '4523', description: "FC at the time of last overhaul" }),
    __metadata("design:type", String)
], CreateApuDto.prototype, "csnAtLastOverhaul", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'none', description: "Limit" }),
    __metadata("design:type", Array)
], CreateApuDto.prototype, "limits", void 0);
exports.CreateApuDto = CreateApuDto;
//# sourceMappingURL=create-apu.dto.js.map