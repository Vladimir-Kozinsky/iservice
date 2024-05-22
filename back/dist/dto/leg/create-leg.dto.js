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
exports.CreateLegDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateLegDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '25891', description: "Aircraft MSN" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLegDto.prototype, "aircraft", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '[25891]', description: "Engine MSN" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CreateLegDto.prototype, "engines", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '25891', description: "APU MSN" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLegDto.prototype, "apu", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-30', description: 'Depature date' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLegDto.prototype, "depDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TXC2578', description: 'Flight number' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLegDto.prototype, "flightNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'EDTO', description: 'Depature airport code' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLegDto.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'EDDE', description: 'Arrive airport code' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLegDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '15:40', description: 'Block Off time' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLegDto.prototype, "blockOff", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '15:40', description: 'Take Off time' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLegDto.prototype, "takeOff", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '15:40', description: 'Langing time' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLegDto.prototype, "landing", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '15:40', description: 'Block On time' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLegDto.prototype, "blockOn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5:40', description: 'Flight time' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLegDto.prototype, "flightTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '6:40', description: 'Block time' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLegDto.prototype, "blockTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '56006:40', description: 'Aircraft FH' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLegDto.prototype, "fh", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '6656', description: 'Aircraft FC' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLegDto.prototype, "fc", void 0);
exports.CreateLegDto = CreateLegDto;
//# sourceMappingURL=create-leg.dto.js.map