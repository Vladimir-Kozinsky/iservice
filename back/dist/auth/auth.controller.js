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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const create_user_dto_1 = require("../dto/create-user.dto");
const auth_user_dto_1 = require("../dto/auth-user.dto");
const swagger_1 = require("@nestjs/swagger");
const user_schema_1 = require("../schemas/user.schema");
const auth_guard_1 = require("./auth.guard");
const roles_auth_decorator_1 = require("./roles-auth.decorator");
const roles_guard_1 = require("./roles.guard");
const hash_user_dto_1 = require("../dto/hash-user.dto");
const response_message_dto_1 = require("../dto/response-message.dto");
require("dotenv/config");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signup(createUserDto, response) {
        const userData = await this.authService.signup(createUserDto);
        response.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true });
        return userData;
    }
    async signIn(authUserDto, response) {
        const userData = await this.authService.signIn(authUserDto);
        response.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true });
        return userData;
    }
    async signOut(request) {
        const { refreshToken } = request.cookies;
        return await this.authService.signout(refreshToken);
    }
    async activate(request, response) {
        const activationLink = request.params.link;
        await this.authService.activateUser(activationLink);
        response.redirect(process.env.CLIENT_URL);
    }
    async refresh(request, response) {
        const { refreshToken } = request.cookies;
        const userData = await this.authService.refresh(refreshToken);
        response.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true });
        return userData;
    }
    async getUsers() {
        return await this.authService.getUsers();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Sign up' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: hash_user_dto_1.HashUserDto }),
    (0, common_1.Post)('signup'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Sign in' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: hash_user_dto_1.HashUserDto }),
    (0, common_1.Post)('signin'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_user_dto_1.AuthUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Sign out' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: response_message_dto_1.ResponseMessageDto }),
    (0, common_1.Post)('signout'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signOut", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Activation' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, common_1.Get)('activate/:link'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "activate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Refresh' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, common_1.Get)('refresh'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get users' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [user_schema_1.User] }),
    (0, roles_auth_decorator_1.Roles)("admin"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('users'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUsers", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map