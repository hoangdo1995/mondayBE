import { IsNotEmpty } from "class-validator";
import { Document } from "mongoose";

export class TaskDto{
    @IsNotEmpty()
    name?: string;
    email?:string
}