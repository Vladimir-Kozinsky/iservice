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
exports.TokenSchema = exports.Token = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
let Token = class Token {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'a8sd9df0fg08d9gfdg', description: 'User id' }),
    (0, mongoose_1.Prop)({ required: true, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Token.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'a8sd9df0fg08d9gfdg', description: 'Refresh token' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Token.prototype, "refreshToken", void 0);
Token = __decorate([
    (0, mongoose_1.Schema)()
], Token);
exports.Token = Token;
exports.TokenSchema = mongoose_1.SchemaFactory.createForClass(Token);
//# sourceMappingURL=token.schema.js.map