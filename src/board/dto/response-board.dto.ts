import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Document } from "mongoose";

export class ResponseBoarDto extends Document{
    @IsString()
    @IsNotEmpty()
    name: String;

    @IsEnum([])
    board_type: String

    @IsString()
    @IsNotEmpty()
    template: String

    @IsString()
    @IsNotEmpty()
    owner:String

}