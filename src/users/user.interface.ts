import { IsNotEmpty, Validator } from "class-validator";
import { Document } from "mongoose";

export interface User extends Document {
    readonly name: string;
    readonly age: number;
    readonly password: string;
    readonly email:string;
    readonly role:string
}