/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MaxLength(16, { message: 'invalid values !!' })
    @MinLength(6, { message: 'invalid values !!' })
    password: string;
}