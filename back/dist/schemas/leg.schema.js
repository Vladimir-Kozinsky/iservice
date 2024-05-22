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
exports.LegSchema = exports.Leg = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let Leg = class Leg {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '25891', description: 'Aircraft MSN' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Leg.prototype, "aircraft", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '[25891]', description: 'Engine MSN' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Array)
], Leg.prototype, "engines", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '25891', description: 'APU MSN' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Leg.prototype, "apu", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-30', description: 'Depature date' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Leg.prototype, "depDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TXC2578', description: 'Flight number' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Leg.prototype, "flightNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'EDTO', description: 'Depature airport code' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Leg.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'EDDE', description: 'Arrive airport code' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Leg.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '15:40', description: 'Block Off time' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Leg.prototype, "blockOff", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '15:40', description: 'Take Off time' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Leg.prototype, "takeOff", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '15:40', description: 'Langing time' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Leg.prototype, "landing", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '15:40', description: 'Block On time' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Leg.prototype, "blockOn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5:40', description: 'Flight time' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Leg.prototype, "flightTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '6:40', description: 'Block time' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Leg.prototype, "blockTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '56006:40', description: 'Aircraft FH' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Leg.prototype, "fh", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '6656', description: 'Aircraft FC' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Leg.prototype, "fc", void 0);
Leg = __decorate([
    (0, mongoose_1.Schema)()
], Leg);
exports.Leg = Leg;
exports.LegSchema = mongoose_1.SchemaFactory.createForClass(Leg);
//# sourceMappingURL=leg.schema.js.map