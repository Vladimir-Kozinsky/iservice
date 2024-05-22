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
exports.EngineSchema = exports.Engine = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
let Engine = class Engine {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CFM56-3C1', description: "Engine type" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Engine.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '25891', description: "Engine manufacturer's Serial Number" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Engine.prototype, "msn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1989-01-30', description: "Engine manufacturere date" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Engine.prototype, "manufDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: "Engine position" }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], Engine.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '45697:00', description: "Engine Time Since New" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Engine.prototype, "tsn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '4569', description: "Engine Cycles Since New" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Engine.prototype, "csn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'none', description: "Engine removal/instolation action" }),
    (0, mongoose_1.Prop)({ ref: 'EngineHistory' }),
    __metadata("design:type", Array)
], Engine.prototype, "engineHistory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '4', description: "The number of engine overhauls." }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], Engine.prototype, "overhaulNum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-30', description: "Last overhaul date" }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Engine.prototype, "lastOverhaulDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '45231:00', description: "FH at the time of last overhaul" }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Engine.prototype, "tsnAtLastOverhaul", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '4523', description: "FC at the time of last overhaul" }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Engine.prototype, "csnAtLastOverhaul", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'none', description: "Limit" }),
    (0, mongoose_1.Prop)({ type: [mongoose_2.default.SchemaTypes.ObjectId], ref: 'Limit' }),
    __metadata("design:type", Array)
], Engine.prototype, "limits", void 0);
Engine = __decorate([
    (0, mongoose_1.Schema)()
], Engine);
exports.Engine = Engine;
exports.EngineSchema = mongoose_1.SchemaFactory.createForClass(Engine);
//# sourceMappingURL=engine.schema.js.map