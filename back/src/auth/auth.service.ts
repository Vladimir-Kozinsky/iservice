import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AuthUserDto } from 'src/dto/auth-user.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { SignOutUserDto } from 'src/dto/signout-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { Token } from 'src/schemas/token.schema';
import { TokenUserDto } from 'src/dto/token-user.dto';
import jwt, { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        @InjectModel(Token.name)
        private readonly tokenModel: Model<Token>,
        private jwtService: JwtService
    ) { }

    async signup(createUserDto: CreateUserDto) {
        const candidate = await this.userModel.findOne({ email: createUserDto.email });
        if (candidate) throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
        const hashPassword = await bcrypt.hash(createUserDto.password, 5);
        const activationLink = uuidv4();
        const user = await this.userModel.create({ ...createUserDto, password: hashPassword, activationLink: activationLink });
        await this.sendActivationMail(createUserDto.email, activationLink);
        const tokenUserDto = new TokenUserDto(user);
        const tokens = await this.generateTokens({ ...tokenUserDto });
        await this.saveToken(tokenUserDto._id, tokens.refreshToken);
        return { ...tokens, tokenUserDto }
    }

    async signIn(authUserDto: AuthUserDto) {
        const user = await this.validateUser(authUserDto);
        return this.generateTokens(user);
    }

    async signout(_id: SignOutUserDto) {
        const user = await this.userModel.findOne({ _id: _id }).exec();
        console.log(user)
        return _id;
    }

    async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({ email: email }).exec();
        if (!user) throw new HttpException("User with this e-mail doesn't exist", HttpStatus.BAD_REQUEST);
        return user;
    }

    private async generateTokens(user: TokenUserDto) {
        const accessToken = await this.jwtService.signAsync(user, { expiresIn: '15m' });
        const refreshToken = await this.jwtService.signAsync(user, { expiresIn: '15d' });
        return {
            accessToken,
            refreshToken
        }
    }

    private async saveToken(userId: Types.ObjectId, refreshToken: string) {
        const tokenData = await this.tokenModel.findOne({ user: userId }).exec();
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            tokenData.save();
        }
        const token = await this.tokenModel.create({ user: userId, refreshToken })
        return token

    }

    private async validateUser(authUserDto: AuthUserDto) {
        const user = await this.getUserByEmail(authUserDto.email);
        const passwordEquals = await bcrypt.compare(authUserDto.password, user.password);
        if (user && passwordEquals) return user;
        throw new UnauthorizedException({ message: 'Incorrect e-mail or password' })
    }

    private async sendActivationMail(to: string, link: string) {

    }

    async getUsers() {
        const users = await this.userModel.find().exec();
        return users
    }
}
