import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AuthUserDto } from 'src/dto/auth-user.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { Token } from 'src/schemas/token.schema';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
import { TokenUserDto } from 'src/dto/token-user.dto';
const nodemailer = require('nodemailer');

@Injectable()
export class AuthService {
    transporter: any;
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        @InjectModel(Token.name)
        private readonly tokenModel: Model<Token>,
        private jwtService: JwtService
    ) {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    async signup(createUserDto: CreateUserDto) {
        const candidate = await this.userModel.findOne({ email: createUserDto.email });
        if (candidate) throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
        const hashPassword = await bcrypt.hash(createUserDto.password, 5);
        const activationLink = uuidv4();
        const user = await this.userModel.create({ ...createUserDto, password: hashPassword, activationLink: activationLink });
        await this.sendActivationMail(createUserDto.email, `${process.env.API_URL}/auth/activate/${activationLink}`);
        const tokenUserDto = new TokenUserDto(user);
        const tokens = await this.generateTokens({ ...tokenUserDto });
        await this.saveToken(tokenUserDto._id, tokens.refreshToken);
        return { ...tokens }
    }

    async signIn(authUserDto: AuthUserDto) {
        const user = await this.validateUser(authUserDto);
        const tokenUserDto = new TokenUserDto(user);
        const tokens = await this.generateTokens({ ...tokenUserDto });
        await this.saveToken(tokenUserDto._id, tokens.refreshToken);
        return { ...tokens }
    }

    async signout(refreshToken: string) {
        const token = await this.tokenModel.deleteOne({ refreshToken });
        if (!token.deletedCount) throw new HttpException('Token not found ', HttpStatus.NOT_FOUND)
        return {
            message: 'User succesfully sign out'
        };
    }

   private async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({ email: email });
        if (!user) throw new HttpException("User with this e-mail doesn't exist", HttpStatus.BAD_REQUEST);
        return user;
    }

    private async generateTokens(user: TokenUserDto) {
        const accessToken = await this.jwtService.signAsync({ ...user }, { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15m' });
        const refreshToken = await this.jwtService.signAsync({ ...user }, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '15d' });
        return {
            accessToken,
            refreshToken
        }
    }

    private async saveToken(userId: Types.ObjectId, refreshToken: string) {
        const tokenData = await this.tokenModel.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            tokenData.save();
            return tokenData;
        } 
        const token = await this.tokenModel.create({ user: userId, refreshToken })
        return token
    }

    private async validateUser(authUserDto: AuthUserDto) {
        const user = await this.getUserByEmail(authUserDto.email);
        const passwordEquals = await bcrypt.compare(authUserDto.password, user.password);
        if (user && passwordEquals) return user;
        throw new UnauthorizedException('Incorrect e-mail or password')
    }

    private async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Activation mail custom' + process.env.API_URL,
            text: '',
            credentials: '',
            html:
                `
                 <div>
                    <h1>Для активации акаунта перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                 </div>
                `
        }, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log('EMAIL SENT')
            }
        })
    }

    async activateUser(activationLink: string) {

        const user = await this.userModel.findOne({ activationLink }).exec();
        if (!user) {
            throw new Error('Неккоректная ссылка активации')
        }
        user.isActivated = true;
        await user.save();
        return user;
    }

    private async validateAccessToken(token: string) {
        try {
            const userData = await this.jwtService.verify(token, { secret: process.env.JWT_ACCESS_SECRET });
            return userData;
        } catch (error) {
            return null;
        }
    }

    private async validateRefreshToken(token: string) {
        try {
            const userData = await this.jwtService.verify(token, { secret: process.env.JWT_REFRESH_SECRET });
            return userData;
        } catch (error) {
            return null;
        }
    }

    private async findToken(token: string) {
        const tokenData = await this.tokenModel.findOne({ refreshToken: token });
        return tokenData;
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) throw new UnauthorizedException('Refresh token not found');
        const userData = await this.validateRefreshToken(refreshToken);
        const tokenFromDB = await this.findToken(refreshToken);
        if (!userData || !tokenFromDB) throw new UnauthorizedException('Token is not valid')
        const user = await this.userModel.findById(userData._id);
        const tokenUserDto = new TokenUserDto(user);
        const tokens = await this.generateTokens({ ...tokenUserDto });
        await this.saveToken(tokenUserDto._id, tokens.refreshToken);
        return { ...tokens }
    }

    async getUsers() {
        const users = await this.userModel.find().exec();
        return users
    }

}
