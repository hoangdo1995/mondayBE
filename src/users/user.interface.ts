import { IsNotEmpty, Validator } from "class-validator";
import { Document } from "mongoose";
import { ListTeamEmail } from "./dto/userInfo.dto";

export interface User {
    readonly full_name: string;
    readonly password: string;
    readonly email:string;
    readonly role:string;
    readonly account_name: string;
    readonly personal_info:{
        team_emails:[ListTeamEmail]
    }
}