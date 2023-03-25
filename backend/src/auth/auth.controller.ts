/* eslint-disable prettier/prettier */
import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { Response } from 'express';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from './auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
    constructor
        (
            private readonly usersService: UsersService,
            private readonly jwtService: JwtService
        ) { }

    //-------------------------------- User sign up ---------------------------------------
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto): Promise<User> {
        const user = await this.usersService.findOne(createUserDto.email)
        if (createUserDto.pass !== createUserDto.confirmPass) {
            throw new BadRequestException('password do not match !!');
        }
        if (user) {
            throw new BadRequestException('Already exists !!')
        } else {
            const user = new User();
            user.email = createUserDto.email;
            user.user_name = createUserDto.user_name;
            const salt = await bcrypt.genSalt();
            user.salt = salt;
            user.pass = await bcrypt.hash(createUserDto.pass, salt);
            return await this.usersService.create(user)
        }
    }
    //------------------------------------ Login ---------------------------------------
    @Post('login')
    async login(
        @Body() loginUser: LoginUserDto,
        @Res({ passthrough: true }) response: Response
    ) {
        const user = await this.usersService.findOne(loginUser.email);
        if (!user) {
            throw new BadRequestException('Email or Password is incorrect !!');
        }
        if (!await bcrypt.compare(loginUser.password, user.pass)) {
            throw new BadRequestException('Email or password is incorrect !!');
        }
        const jwt = await this.jwtService.signAsync({ id: user.id })
        response.cookie('jwt', jwt, { httpOnly: true })
        return user;
    }

    //-------------------------------- Get auth user ------------------------------
    @UseGuards(AuthGuard)
    @Get()
    async signedInUser(@Req() request: Request) {
        const cookie = request.cookies['jwt'];
        const userId = await this.jwtService.verifyAsync(cookie);
        const user = await this.usersService.findOneById(userId.id)
        return user;
    }
    //--------------------------------- Log out ------------------------------
    @UseGuards(AuthGuard)
    @Get('logout')
    logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');
        return {
            message: 'you are loged out'
        }
    }
}