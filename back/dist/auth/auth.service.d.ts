/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model, Types } from 'mongoose';
import { AuthUserDto } from 'src/dto/auth-user.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/schemas/user.schema';
import { Token } from 'src/schemas/token.schema';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
export declare class AuthService {
    private readonly userModel;
    private readonly tokenModel;
    private jwtService;
    transporter: any;
    constructor(userModel: Model<User>, tokenModel: Model<Token>, jwtService: JwtService);
    signup(createUserDto: CreateUserDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signIn(authUserDto: AuthUserDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signout(refreshToken: string): Promise<{
        message: string;
    }>;
    private getUserByEmail;
    private generateTokens;
    private saveToken;
    private validateUser;
    private sendActivationMail;
    activateUser(activationLink: string): Promise<import("mongoose").Document<unknown, {}, User> & Omit<User & Required<{
        _id: Types.ObjectId;
    }>, never>>;
    private validateAccessToken;
    private validateRefreshToken;
    private findToken;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getUsers(): Promise<(import("mongoose").Document<unknown, {}, User> & Omit<User & Required<{
        _id: Types.ObjectId;
    }>, never>)[]>;
}
