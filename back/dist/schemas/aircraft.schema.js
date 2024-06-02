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
exports.AircraftSchema = exports.Aircraft = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
const apu_schema_1 = require("./apu.schema");
let Aircraft = class Aircraft {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'EX-76009', description: "Aircraft registration number" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Aircraft.prototype, "regNum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Boeing 737-300', description: "Aircraft type" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Aircraft.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A16WE', description: "Aircraft type certificate Number" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Aircraft.prototype, "typeCert", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1989-01-30', description: "Aircraft manufacture date" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Aircraft.prototype, "manufDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '25891', description: "Aircraft manufacturer's Serial Number" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Aircraft.prototype, "msn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '016', description: "Effectivity code" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Aircraft.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '61234', description: "Max Take-Off Cross Weight" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Aircraft.prototype, "mtow", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '48307', description: "Max Zero Fuel Weight" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Aircraft.prototype, "mzfw", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '51709', description: "Max Landing Weight" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Aircraft.prototype, "mlw", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '61461', description: "Max Taxi Weight" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Aircraft.prototype, "mtw", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '20104', description: "Fuel Capacity" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Aircraft.prototype, "fuelCap", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '31138', description: "Basic Empty Weight" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Aircraft.prototype, "bew", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1.04', description: "Center of gravity" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Aircraft.prototype, "cg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '45231:00', description: "Aircraft FH at the time of adding to the system" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Aircraft.prototype, "initFh", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5231', description: "Aircraft FC at the time of adding to the system" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Aircraft.prototype, "initFc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '45231:00', description: "Current FH" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Aircraft.prototype, "fh", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '4523', description: "Current FC" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Aircraft.prototype, "fc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '4', description: "The number of aircraft overhauls." }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], Aircraft.prototype, "overhaulNum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-30', description: "Last overhaul date" }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Aircraft.prototype, "lastOverhaulDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '45231:00', description: "FH at the time of last overhaul" }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Aircraft.prototype, "tsnAtLastOverhaul", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '4523', description: "FC at the time of last overhaul" }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Aircraft.prototype, "csnAtLastOverhaul", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1, 25981', description: "Installed engines" }),
    (0, mongoose_1.Prop)({ ref: 'Engine' }),
    __metadata("design:type", Array)
], Aircraft.prototype, "engines", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'none', description: "APU" }),
    (0, mongoose_1.Prop)({ type: mongoose_2.default.SchemaTypes.ObjectId, ref: 'Apu' }),
    __metadata("design:type", apu_schema_1.Apu)
], Aircraft.prototype, "apu", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'none', description: "Limit" }),
    (0, mongoose_1.Prop)({ type: [mongoose_2.default.SchemaTypes.ObjectId], ref: 'Limit' }),
    __metadata("design:type", Array)
], Aircraft.prototype, "limits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'none', description: "Landing gears" }),
    (0, mongoose_1.Prop)({ type: [mongoose_2.default.SchemaTypes.ObjectId], ref: 'landingGear' }),
    __metadata("design:type", Array)
], Aircraft.prototype, "landingGears", void 0);
Aircraft = __decorate([
    (0, mongoose_1.Schema)()
], Aircraft);
exports.Aircraft = Aircraft;
exports.AircraftSchema = mongoose_1.SchemaFactory.createForClass(Aircraft);
//# sourceMappingURL=aircraft.schema.js.map