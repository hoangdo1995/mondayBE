import { MinLength } from "class-validator";
import { Document } from "mongoose";

export interface Product {
    readonly id:string;
    readonly name :string;
    readonly age: number;
}  

export class ProductDto{
    @MinLength(5)
    name?: string;
    price?: number
}