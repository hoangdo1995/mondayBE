import { HttpStatus } from "@nestjs/common";
import { error } from "console";

export class ResponseData<T> {
    statusCode:HttpStatus;
    message:string;
    data:T | T[];
    error?:string | undefined;
    constructor(httpStatusCode:number,httpMessage:string, data:T | T[],error?:string){
        this.statusCode = httpStatusCode;
        this.message = httpMessage;
        this.data = data;
        this.error = error;

        return this;
    }
}