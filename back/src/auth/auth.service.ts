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
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>, private jwtService: JwtService) { }

    async signup(createUserDto: CreateUserDto) {
        const createdUser = await this.userModel.create(createUserDto);
        return createdUser;
    }

    async signin(authUserDto: AuthUserDto) {
        const user = await this.validateUser(authUserDto);
        return this.generateToken(user);
    }

    async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({ email: email }).exec();
        if (!user) throw new HttpException("User isn't exist", HttpStatus.BAD_REQUEST);
        return user;
    }

    private async generateToken(user: User) {
        const payload = {...user};
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(authUserDto: AuthUserDto) {
        const user = await this.getUserByEmail(authUserDto.email);
        // const passwordEquals = await bcrypt.compare(authUserDto.password, user.password) second argument to be encrypted password;
        const passwordEquals = authUserDto.password === user.password ? true : false;
        if (user && passwordEquals) return user;
    
        throw new UnauthorizedException({ message: 'Incorrect email or password' })
    }
}
