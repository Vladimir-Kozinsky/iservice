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
exports.ApuSchema = exports.Apu = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
let Apu = class Apu {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TA-6A', description: "APU type" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Apu.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '25891', description: "APU manufacturer's Serial Number" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Apu.prototype, "msn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1989-01-30', description: "APU manufacturere date" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Apu.prototype, "manufDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '45697:00', description: "APU Time Since New" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Apu.prototype, "tsn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '45697:00', description: "APU Time Since New" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Apu.prototype, "csn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '45697:00', description: "APU Time Since New" }),
    (0, mongoose_1.Prop)({ ref: 'ApuHistory' }),
    __metadata("design:type", Array)
], Apu.prototype, "apuHistory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '4', description: "The number of APU overhauls." }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], Apu.prototype, "overhaulNum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-30', description: "Last overhaul date" }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Apu.prototype, "lastOverhaulDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '45231:00', description: "FH at the time of last overhaul" }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Apu.prototype, "tsnAtLastOverhaul", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '4523', description: "FC at the time of last overhaul" }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Apu.prototype, "csnAtLastOverhaul", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'none', description: "Limit" }),
    (0, mongoose_1.Prop)({ type: [mongoose_2.default.SchemaTypes.ObjectId], ref: 'Limit' }),
    __metadata("design:type", Array)
], Apu.prototype, "limits", void 0);
Apu = __decorate([
    (0, mongoose_1.Schema)()
], Apu);
exports.Apu = Apu;
exports.ApuSchema = mongoose_1.SchemaFactory.createForClass(Apu);
//# sourceMappingURL=apu.schema.js.map