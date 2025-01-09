import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UserUpdate {
    @IsString()
    @IsOptional()
    name:string;
    
    @IsNotEmpty({message:'Email is required'})
    @IsEmail()
    email:string;

    @IsOptional()
    @IsNumber()
    age:number;
}