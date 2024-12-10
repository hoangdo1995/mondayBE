import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    @MinLength(5)
    name?: string;

    @IsInt()
    age?: number;

    @IsString()
    password?: string;

    @IsEmail()
    email?: string;

    @IsString()
    role?:string
}


