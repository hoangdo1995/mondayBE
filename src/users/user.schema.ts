import { validate } from "class-validator";
import mongoose, { Collection } from "mongoose";
import { MemberRole, Role } from "src/global/globalEnum";

export const UserSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    account_name:{ type: String, required: true},
    password: { type: String, required: true },
    email:{
        type:String, 
        require:true, 
        unique: true,
        
    },
    role:{
        type:String,
        enum: Role,
        require: true,
        default:Role.USER
    },
    personal_info:{
        bring_here:{type:String},
        current_role:{type:String},
        like_focus:{type:String},
        team_emails:{type:[{email:{type :String}, role:{type:String, enum: MemberRole}}]}
    }
},
{
    collection:'users',
    timestamps:true
}
)