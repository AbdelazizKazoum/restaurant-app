/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsOptional, IsStrongPassword, isNotEmpty } from 'class-validator';

export class UpdateUserDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    user_name: string;

    @IsOptional()
    // @IsStrongPassword()
    pass?: string;

    @IsOptional()
    // @IsStrongPassword()
    confirmPass?: string

}