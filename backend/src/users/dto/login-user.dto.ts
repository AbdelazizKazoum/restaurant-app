/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MaxLength(16, { message: 'Invalid password !' })
    @MinLength(6, { message: 'Invalid password !' })
    password: string;
}