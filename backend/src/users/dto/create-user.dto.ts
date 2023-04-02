/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    user_name: string;

    @IsString()
    @MinLength(8, { message: 'password must be longer or equal to 8' })
    @MaxLength(16, { message: 'password must be shorter than or equal to 16 ' })
    pass: string;

    @IsString()
    @MinLength(8, { message: 'password must be longer or equal to 8' })
    @MaxLength(16, { message: 'password must be shorter than or equal to 16 ' })
    confirmPass: string;

    salt: string;
}
