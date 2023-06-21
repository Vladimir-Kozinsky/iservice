import { Body, Controller, Get, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthUserDto } from 'src/dto/auth-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/schemas/user.schema';
import { AuthGuard } from './auth.guard';
import { Roles } from './roles-auth.decorator';
import { RolesGuard } from './roles.guard';
import cookieParser from 'cookie-parser';
import { SignOutUserDto } from 'src/dto/signout-user.dto';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiOperation({ summary: 'Sign up' })
    @ApiResponse({ status: 201, type: User })
    @Post('signup')
    @HttpCode(201)
    async signup(@Res({ passthrough: true }) response: Response, @Body() createUserDto: CreateUserDto) {
        const userData = await this.authService.signup(createUserDto)
        response.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true });
        return userData;
    }

    @ApiOperation({ summary: 'Sign in' })
    @ApiResponse({ status: 200, type: User })
    @Post('signin')
    @HttpCode(200)
    async signIn(@Body() authUserDto: AuthUserDto) {
        return await this.authService.signIn(authUserDto)
    }

    @ApiOperation({ summary: 'Sign out' })
    @ApiResponse({ status: 200, type: User })
    @Post('signout')
    @HttpCode(200)
    async signOut(@Body() authUserDto: AuthUserDto) {
        // return await this.authService.signout(SignOutUserDto)
    }

    @ApiOperation({ summary: 'Activation' })
    @ApiResponse({ status: 200, type: User })
    @Get('activate/:link')
    @HttpCode(200)
    async activate(@Body() authUserDto: AuthUserDto) {
        // return await this.authService.signout(SignOutUserDto)
    }


    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get users' })
    @ApiResponse({ status: 200, type: [User] })
    @Roles("admin")
    @UseGuards(RolesGuard)
    @Get('users')
    @HttpCode(200)
    async getUsers() {
        return await this.authService.getUsers()
    }
}