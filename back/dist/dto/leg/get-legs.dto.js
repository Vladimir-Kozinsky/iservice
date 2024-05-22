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
exports.GetLegsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class GetLegsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '25891', description: "Aircraft MSN" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetLegsDto.prototype, "aircraft", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-30', description: 'Filter start date' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetLegsDto.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-30', description: 'Filter end date' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetLegsDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Page' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetLegsDto.prototype, "page", void 0);
exports.GetLegsDto = GetLegsDto;
//# sourceMappingURL=get-legs.dto.js.map