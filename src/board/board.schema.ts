import mongoose from "mongoose";
import { BoardType } from "./enums/board.enum";

export const BoardSchema = new mongoose.Schema({
        name:{type:String, required: true},
        template:{type:String, required:true},
        owner:{type:String, required: true},
        board_type:{type:String, enum: BoardType, default: BoardType.MAIN},
        is_favorite:{type: Boolean, default : false}
    },
    {
        collection:'boards',
        timestamps: true
    }
)