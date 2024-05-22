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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
const bcrypt = require("bcryptjs");
const uuid_1 = require("uuid");
const token_schema_1 = require("../schemas/token.schema");
const jwt_1 = require("@nestjs/jwt");
require("dotenv/config");
const token_user_dto_1 = require("../dto/token-user.dto");
const nodemailer = require('nodemailer');
let AuthService = class AuthService {
    constructor(userModel, tokenModel, jwtService) {
        this.userModel = userModel;
        this.tokenModel = tokenModel;
        this.jwtService = jwtService;
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }
    async signup(createUserDto) {
        const candidate = await this.userModel.findOne({ email: createUserDto.email });
        if (candidate)
            throw new common_1.HttpException('User with this email already exists', common_1.HttpStatus.BAD_REQUEST);
        const hashPassword = await bcrypt.hash(createUserDto.password, 5);
        const activationLink = (0, uuid_1.v4)();
        const user = await this.userModel.create(Object.assign(Object.assign({}, createUserDto), { password: hashPassword, activationLink: activationLink }));
        await this.sendActivationMail(createUserDto.email, `${process.env.API_URL}/auth/activate/${activationLink}`);
        const tokenUserDto = new token_user_dto_1.TokenUserDto(user);
        const tokens = await this.generateTokens(Object.assign({}, tokenUserDto));
        await this.saveToken(tokenUserDto._id, tokens.refreshToken);
        return Object.assign({}, tokens);
    }
    async signIn(authUserDto) {
        const user = await this.validateUser(authUserDto);
        const tokenUserDto = new token_user_dto_1.TokenUserDto(user);
        const tokens = await this.generateTokens(Object.assign({}, tokenUserDto));
        await this.saveToken(tokenUserDto._id, tokens.refreshToken);
        return Object.assign({}, tokens);
    }
    async signout(refreshToken) {
        const token = await this.tokenModel.deleteOne({ refreshToken });
        if (!token.deletedCount)
            throw new common_1.HttpException('Token not found ', common_1.HttpStatus.NOT_FOUND);
        return {
            message: 'User succesfully sign out'
        };
    }
    async getUserByEmail(email) {
        const user = await this.userModel.findOne({ email: email });
        if (!user)
            throw new common_1.HttpException("User with this e-mail doesn't exist", common_1.HttpStatus.BAD_REQUEST);
        return user;
    }
    async generateTokens(user) {
        const accessToken = await this.jwtService.signAsync(Object.assign({}, user), { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15m' });
        const refreshToken = await this.jwtService.signAsync(Object.assign({}, user), { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '15d' });
        return {
            accessToken,
            refreshToken
        };
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await this.tokenModel.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            tokenData.save();
            return tokenData;
        }
        const token = await this.tokenModel.create({ user: userId, refreshToken });
        return token;
    }
    async validateUser(authUserDto) {
        const user = await this.getUserByEmail(authUserDto.email);
        const passwordEquals = await bcrypt.compare(authUserDto.password, user.password);
        if (user && passwordEquals)
            return user;
        throw new common_1.UnauthorizedException('Incorrect e-mail or password');
    }
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Activation mail custom' + process.env.API_URL,
            text: '',
            credentials: '',
            html: `
                 <div>
                    <h1>Для активации акаунта перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                 </div>
                `
        }, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('EMAIL SENT');
            }
        });
    }
    async activateUser(activationLink) {
        const user = await this.userModel.findOne({ activationLink }).exec();
        if (!user) {
            throw new Error('Неккоректная ссылка активации');
        }
        user.isActivated = true;
        await user.save();
        return user;
    }
    async validateAccessToken(token) {
        try {
            const userData = await this.jwtService.verify(token, { secret: process.env.JWT_ACCESS_SECRET });
            return userData;
        }
        catch (error) {
            return null;
        }
    }
    async validateRefreshToken(token) {
        try {
            const userData = await this.jwtService.verify(token, { secret: process.env.JWT_REFRESH_SECRET });
            return userData;
        }
        catch (error) {
            return null;
        }
    }
    async findToken(token) {
        const tokenData = await this.tokenModel.findOne({ refreshToken: token });
        return tokenData;
    }
    async refresh(refreshToken) {
        if (!refreshToken)
            throw new common_1.UnauthorizedException('Refresh token not found');
        const userData = await this.validateRefreshToken(refreshToken);
        const tokenFromDB = await this.findToken(refreshToken);
        if (!userData || !tokenFromDB)
            throw new common_1.UnauthorizedException('Token is not valid');
        const user = await this.userModel.findById(userData._id);
        const tokenUserDto = new token_user_dto_1.TokenUserDto(user);
        const tokens = await this.generateTokens(Object.assign({}, tokenUserDto));
        await this.saveToken(tokenUserDto._id, tokens.refreshToken);
        return Object.assign({}, tokens);
    }
    async getUsers() {
        const users = await this.userModel.find().exec();
        return users;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(token_schema_1.Token.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map