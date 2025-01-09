import { IsBoolean, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Document } from "mongoose";
import { BoardType } from "../enums/board.enum";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Board extends Document {
    @Field()
    @IsString()
    @IsNotEmpty()
    name: String;


    @Field()
    @IsEnum(BoardType)
    @IsNotEmpty()
    board_type: String;

    @Field()
    @IsString()
    @IsNotEmpty()
    template: String

    @Field()
    @IsString()
    @IsNotEmpty()
    owner:String

    @Field()
    @IsBoolean()
    @IsNotEmpty()
    is_favorite: Boolean
}

