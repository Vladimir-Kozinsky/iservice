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
exports.CreateAircraftDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAircraftDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Boeing 737-300', description: "Aircraft type" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAircraftDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '25891', description: "Aircraft manufacturer's Serial Number" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAircraftDto.prototype, "msn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'EX-76009', description: "Aircraft registration number" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAircraftDto.prototype, "regNum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1989-01-30', description: "Aircraft manufacturere date" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAircraftDto.prototype, "manufDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '45231:00', description: "Aircraft FH at the time of adding to the system" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAircraftDto.prototype, "initFh", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5231', description: "Aircraft FC at the time of adding to the system" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAircraftDto.prototype, "initFc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '45231:00', description: "Current FH" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAircraftDto.prototype, "fh", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '4523', description: "Current FC" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAircraftDto.prototype, "fc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '4', description: "The number of aircraft overhauls." }),
    __metadata("design:type", Number)
], CreateAircraftDto.prototype, "overhaulNum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-30', description: "Last overhaul date" }),
    __metadata("design:type", String)
], CreateAircraftDto.prototype, "lastOverhaulDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '45231:00', description: "FH at the time of last overhaul" }),
    __metadata("design:type", String)
], CreateAircraftDto.prototype, "tsnAtLastOverhaul", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '4523', description: "FC at the time of last overhaul" }),
    __metadata("design:type", String)
], CreateAircraftDto.prototype, "csnAtLastOverhaul", void 0);
exports.CreateAircraftDto = CreateAircraftDto;
//# sourceMappingURL=create-aircraft.dto.js.map