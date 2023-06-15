import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthUserDto } from 'src/dto/auth-user.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/schemas/user.shcema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async signup(createUserDto: CreateUserDto) {
        const candidate = await this.userModel.findOne({ email: createUserDto.email });
        if (candidate) throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
        const hashPassword = await bcrypt.hash(createUserDto.password, 5);
        const user = await this.userModel.create({ ...createUserDto, password: hashPassword });
        return this.generateToken(user);
    }

    async signIn(authUserDto: AuthUserDto) {
        const user = await this.validateUser(authUserDto);
        return this.generateToken(user);
    }

    async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({ email: email }).exec();
        if (!user) throw new HttpException("User isn't exist", HttpStatus.BAD_REQUEST);
        return user;
    }

    private async generateToken(user: User) {
        const payload = {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            position: user.position,
            role: user.role,
        }
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    private async validateUser(authUserDto: AuthUserDto) {
        const user = await this.getUserByEmail(authUserDto.email);
        const passwordEquals = await bcrypt.compare(authUserDto.password, user.password);
        if (user && passwordEquals) return user;
        throw new UnauthorizedException({ message: 'Incorrect email or password' })
    }

    async getUsers() {
        const users = await this.userModel.find().exec();
        return users
    }
}
