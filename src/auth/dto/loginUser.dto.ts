import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginUser{
    @IsNotEmpty()
    @IsEmail()
    email:string;
    
    @IsNotEmpty()
    password:string
}