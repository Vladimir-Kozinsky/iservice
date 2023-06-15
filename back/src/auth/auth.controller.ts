import { Body, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthUserDto } from 'src/dto/auth-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/schemas/user.shcema';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiOperation({ summary: 'Sign up' })
    @ApiResponse({ status: 201, type: User })
    @Post('signup')
    @HttpCode(201)
    signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signup(createUserDto);
    }

    @ApiOperation({ summary: 'Sign in' })
    @ApiResponse({ status: 200, type: User })
    @Post('signin')
    @HttpCode(200)
    async signIn(@Body() authUserDto: AuthUserDto) {
        return await this.authService.signIn(authUserDto)
    }
}