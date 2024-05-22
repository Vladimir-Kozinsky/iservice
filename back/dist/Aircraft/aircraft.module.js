"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AircraftModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const aircraft_schema_1 = require("../schemas/aircraft.schema");
const aircraft_service_1 = require("./aircraft.service");
const aircraft_controller_1 = require("./aircraft.controller");
const engine_schema_1 = require("../schemas/engine.schema");
const limit_schema_1 = require("../schemas/limit.schema");
const apu_schema_1 = require("../schemas/apu.schema");
let AircraftModule = class AircraftModule {
};
AircraftModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: aircraft_schema_1.Aircraft.name,
                    schema: aircraft_schema_1.AircraftSchema
                }]),
            mongoose_1.MongooseModule.forFeature([{
                    name: engine_schema_1.Engine.name,
                    schema: engine_schema_1.EngineSchema
                }]),
            mongoose_1.MongooseModule.forFeature([{
                    name: apu_schema_1.Apu.name,
                    schema: apu_schema_1.ApuSchema
                }]),
            mongoose_1.MongooseModule.forFeature([{
                    name: limit_schema_1.Limit.name,
                    schema: limit_schema_1.LimitSchema
                }]),
        ],
        controllers: [aircraft_controller_1.AircraftController],
        providers: [aircraft_service_1.AircraftService],
    })
], AircraftModule);
exports.AircraftModule = AircraftModule;
//# sourceMappingURL=aircraft.module.js.map