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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const aircraft_schema_1 = require("../schemas/aircraft.schema");
const mongoose_2 = require("mongoose");
const leg_schema_1 = require("../schemas/leg.schema");
let LegService = class LegService {
    constructor(legModel, aircraftModel) {
        this.legModel = legModel;
        this.aircraftModel = aircraftModel;
    }
    async getLegs(getLegsDto) {
        const pageLegs = 10;
        const legs = await this.legModel.find({ aircraft: getLegsDto.aircraft });
        if (!legs.length)
            throw new common_1.HttpException('Aircraft legs not found', common_1.HttpStatus.BAD_REQUEST);
        const filteredLegs = legs.filter((leg) => {
            const from = new Date(getLegsDto.from);
            const to = new Date(getLegsDto.to);
            const legDate = new Date(leg.depDate);
            return (legDate > from || legDate.getTime() === from.getTime())
                && (legDate < to || legDate.getTime() === to.getTime());
        });
        const sortedLegs = this.sortLegs(filteredLegs);
        const totalPages = Math.ceil(sortedLegs.length / pageLegs);
        const legsPortion = sortedLegs.splice(getLegsDto.page * pageLegs - pageLegs, pageLegs);
        const response = {
            totalPages: totalPages,
            currentPage: +getLegsDto.page,
            legs: legsPortion
        };
        return response;
    }
    async getLastTenLegs(aircraft) {
        const legs = await this.legModel.find({ aircraft: aircraft });
        if (!legs.length)
            throw new common_1.HttpException('Aircraft legs not found', common_1.HttpStatus.BAD_REQUEST);
        const sortedLegs = this.sortLegs(legs);
        return sortedLegs.splice(0, 10);
    }
    async getPrintLegs(getPrintLegsDto) {
        const legs = await this.legModel.find({ aircraft: getPrintLegsDto.aircraft });
        if (!legs.length)
            throw new common_1.HttpException('Aircraft legs not found', common_1.HttpStatus.BAD_REQUEST);
        const filteredLegs = legs.filter((leg) => {
            const from = new Date(getPrintLegsDto.from);
            const to = new Date(getPrintLegsDto.to);
            const legDate = new Date(leg.depDate);
            return (legDate > from || legDate.getTime() === from.getTime())
                && (legDate < to || legDate.getTime() === to.getTime());
        });
        const sortedLegs = this.sortLegs(filteredLegs);
        return sortedLegs;
    }
    async createLeg(createLegDto) {
        return await this.legModel.create(createLegDto);
    }
    async deleteLeg(legId) {
        const legForDelete = await this.legModel.findOne({ _id: legId });
        if (!legForDelete)
            throw new common_1.HttpException('Leg not found', common_1.HttpStatus.BAD_REQUEST);
        const leg = await this.legModel.findByIdAndRemove(legId);
        return leg;
    }
    sortLegs(legs) {
        return legs.sort((a, b) => {
            const aLegDate = new Date(`${a.depDate} ${a.takeOff}`);
            const bLegDate = new Date(`${b.depDate} ${b.takeOff}`);
            if (aLegDate.getTime() < bLegDate.getTime())
                return 1;
            if (aLegDate.getTime() > bLegDate.getTime())
                return -1;
            return 0;
        });
    }
};
LegService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(leg_schema_1.Leg.name)),
    __param(1, (0, mongoose_1.InjectModel)(aircraft_schema_1.Aircraft.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], LegService);
exports.LegService = LegService;
//# sourceMappingURL=leg.service.js.map