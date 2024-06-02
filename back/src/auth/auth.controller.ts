import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthUserDto } from 'src/dto/auth-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/schemas/user.schema';
import { AuthGuard } from './auth.guard';
import { Roles } from './roles-auth.decorator';
import { RolesGuard } from './roles.guard';
import { Request, Response } from 'express';
import { HashUserDto } from 'src/dto/hash-user.dto';
import { ResponseMessageDto } from 'src/dto/response-message.dto';
import 'dotenv/config';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiOperation({ summary: 'Sign up' })
    @ApiResponse({ status: 201, type: HashUserDto })
    @Post('signup')
    @HttpCode(201)
    async signup(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
        const userData = await this.authService.signup(createUserDto)
        response.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true });
        return userData;
    }

    @ApiOperation({ summary: 'Sign in' })
    @ApiResponse({ status: 200, type: HashUserDto })
    @Post('signin')
    @HttpCode(200)
    async signIn(@Body() authUserDto: AuthUserDto, @Res({ passthrough: true }) response: Response) {
        const userData = await this.authService.signIn(authUserDto);
        response.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true });
        return userData;
    }

    @ApiOperation({ summary: 'Sign out' })
    @ApiResponse({ status: 200, type: ResponseMessageDto })
    @Post('signout')
    @HttpCode(200)
    async signOut(@Req() request: Request) {
        const { refreshToken } = request.cookies;
        return await this.authService.signout(refreshToken);
    }

    @ApiOperation({ summary: 'Activation' })
    @ApiResponse({ status: 200 })
    @Get('activate/:link')
    @HttpCode(200)
    async activate(@Req() request: Request, @Res() response: Response) {
        const activationLink = request.params.link;
        await this.authService.activateUser(activationLink);
        response.redirect(process.env.CLIENT_URL);
    }

    @ApiOperation({ summary: 'Refresh' })
    @ApiResponse({ status: 200 })
    @Get('refresh')
    @HttpCode(200)
    async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
        const { refreshToken } = request.cookies;
        const userData = await this.authService.refresh(refreshToken);
        response.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true });
        return userData;
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