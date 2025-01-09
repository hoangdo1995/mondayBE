import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Board } from "./entities/board.entity";
import { Model } from "mongoose";
import { Inject, Injectable, Req, UseGuards } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/global/globalEnum";
import { RolesGuardGraphql } from "src/guards/rolesGql.guard";

@Injectable()
@Resolver(()=>Board)
@UseGuards(RolesGuardGraphql)
export class BoardResolver {
    constructor(
        @Inject('BOARD_MODEL')
    private readonly BoardModel : Model<Board>
    ){}

    @Query(()=>[Board])
    @Roles([Role.USER, Role.ADMIN])
    async getBoards():Promise<Board[]>{
        console.log('...loading')
        try {
            return await this.BoardModel.find();
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    @Mutation(()=>Board)
    async createBoard( @Args('createBoardDto') createBoardDto:CreateBoardDto):Promise<Board>{
        try {
            return await this.BoardModel.create(createBoardDto);
        } catch (error) {
            return error;
        }
    }
}