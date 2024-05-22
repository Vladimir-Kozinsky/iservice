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
exports.HashUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class HashUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE1N2U4OWI1ZmQyY2NmZDFmMTY5MmUiLCJlbWFpbCI6InUua2F6aW5za2lAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiSmhvbiIsImxhc3ROYW1lIjoiU21pZHQiLCJwb3NpdGlvbiI6ImVuZ2luZWVyIiwicm9sZSI6ImFkbWluIiwiaXNBY3RpdmF0ZWQiOnRydWUsImlhdCI6MTY4ODU2OTUzMywiZXhwIjoxNjg4NTcwNDMzfQ.3C4O8nmCXU6ex5VdLykohz2fXl9kQ-ZvqtuMPlFYAAc', description: "accessToken" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], HashUserDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE1N2U4OWI1ZmQyY2NmZDFmMTY5MmUiLCJlbWFpbCI6InUua2F6aW5za2lAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiSmhvbiIsImxhc3ROYW1lIjoiU21pZHQiLCJwb3NpdGlvbiI6ImVuZ2luZWVyIiwicm9sZSI6ImFkbWluIiwiaXNBY3RpdmF0ZWQiOnRydWUsImlhdCI6MTY4ODU2OTUzMywiZXhwIjoxNjg4NTcwNDMzfQ.3C4O8nmCXU6ex5VdLykohz2fXl9kQ-ZvqtuMPlFYAAc', description: "refreshToken" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], HashUserDto.prototype, "refreshToken", void 0);
exports.HashUserDto = HashUserDto;
//# sourceMappingURL=hash-user.dto.js.map