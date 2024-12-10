import { validate } from "class-validator";
import mongoose, { Collection } from "mongoose";
import { Role } from "src/global/globalEnum";

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    email:{
        type:String, 
        require:true, 
        unique: true,
    },
    role:{
        type:String,
        enum: Role,
        require: true
    }
},
{
    collection:'users',
    timestamps:true
}
)