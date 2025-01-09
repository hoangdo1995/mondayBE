import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateBoardDto {

    @Field()
    @IsString()
    @IsNotEmpty()
    readonly name: String;

    @Field()
    @IsString()
    @IsNotEmpty()
    readonly template: String

    @Field()
    @IsString()
    @IsNotEmpty()
    readonly owner:String

}
