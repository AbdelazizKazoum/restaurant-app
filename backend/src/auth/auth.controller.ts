/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { Response } from 'express';
import { Request } from 'express';


@Controller('auth')
export class AuthController {
    constructor
        (
            private readonly usersService: UsersService,
            private readonly jwtService: JwtService
        ) { }

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
            throw new BadRequestException('Email or password is invalid !!');
        }

        const jwt = this.jwtService.signAsync({ id: user.id })
        response.cookie('jwt', jwt, { httpOnly: true })

        return user;

    }

    @Get()
    async signedInUser(@Req() request: Request) {
        const cookie = request.cookies['jwt'];
        
        console.log(cookie);

        const userId = await this.jwtService.verifyAsync(cookie);

        return userId;
    }
}
