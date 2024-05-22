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
exports.EngineHistorySchema = exports.EngineHistory = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let EngineHistory = class EngineHistory {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-30', description: 'Action date' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EngineHistory.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'removal', description: 'Action' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EngineHistory.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '25891', description: 'Aircraft MSN' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EngineHistory.prototype, "aircraft", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '29891', description: 'Engine MSN' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EngineHistory.prototype, "engine", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2', description: 'Engine position' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], EngineHistory.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2891:00', description: 'Aircraft Time Since New' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EngineHistory.prototype, "aircraftTsn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2891:00', description: 'Aircraft Cycles Since New' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EngineHistory.prototype, "aircraftCsn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5891:00', description: 'Engine Time Since New' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EngineHistory.prototype, "engineTsn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5891:00', description: 'Engine Cycles Since New' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EngineHistory.prototype, "engineCsn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Overhaul', description: 'Engine removal reason' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EngineHistory.prototype, "reason", void 0);
EngineHistory = __decorate([
    (0, mongoose_1.Schema)()
], EngineHistory);
exports.EngineHistory = EngineHistory;
exports.EngineHistorySchema = mongoose_1.SchemaFactory.createForClass(EngineHistory);
//# sourceMappingURL=engineHistory.schema.js.map