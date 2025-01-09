import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateRole {
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    newRole: string;
}