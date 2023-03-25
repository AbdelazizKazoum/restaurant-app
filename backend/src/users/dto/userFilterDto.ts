/* eslint-disable prettier/prettier */

import { IsNumber } from "class-validator";

export class UserFilterDto {
    search: string;
    page: number;
}