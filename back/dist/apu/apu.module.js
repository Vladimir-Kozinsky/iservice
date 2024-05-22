"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApuModule = void 0;
const common_1 = require("@nestjs/common");
const apu_controller_1 = require("./apu.controller");
const apu_service_1 = require("./apu.service");
const mongoose_1 = require("@nestjs/mongoose");
const apu_schema_1 = require("../schemas/apu.schema");
const limit_schema_1 = require("../schemas/limit.schema");
let ApuModule = class ApuModule {
};
ApuModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: apu_schema_1.Apu.name,
                    schema: apu_schema_1.ApuSchema
                }]),
            mongoose_1.MongooseModule.forFeature([{
                    name: limit_schema_1.Limit.name,
                    schema: limit_schema_1.LimitSchema
                }]),
        ],
        controllers: [apu_controller_1.ApuController],
        providers: [apu_service_1.ApuService]
    })
], ApuModule);
exports.ApuModule = ApuModule;
//# sourceMappingURL=apu.module.js.map