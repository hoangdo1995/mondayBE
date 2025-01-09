import { Body, Controller, Get, Patch, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.interface";
import { UserDto } from "./dto/user.dto";
import { ResponseData } from "src/global/responseData";
import { HttpMessage, HttpStatus, Role } from "src/global/globalEnum";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "src/guards/roles.guard";
import { UserInfo } from "./dto/userInfo.dto";
import { UserUpdate } from "./dto/userUpdate.dto";
import { VerifyDecentralization } from "src/guards/verifyDecentralization.guard";
import { UpdateRole } from "./dto/updateRole.dto";
import { Request } from "express";
import { AuthGuard } from "src/guards/auth.guard";
import { AuthMiddleware } from "src/middlewares/auth.middleware";

@UseGuards(RolesGuard)
@Controller('users')
export class UsersControllers {
    constructor(
      private usersService:UsersService,
    ){}

    @UseGuards(AuthGuard)
    @Roles([Role.ADMIN])
    @Get('')
    async getUsers():Promise<ResponseData<User[]|null>>{
        try {
            return new ResponseData<User[]>(HttpStatus.SUCCESS, HttpMessage.SUCCESS, await this.usersService.findAll());
        } catch (error) {
            return new ResponseData<null>(HttpStatus.ERROR, HttpMessage.ERROR, null);
        }
    }


    // create new user
    @Post('')
    async createUser(@Body() user:UserDto):Promise<ResponseData<UserInfo|null>>{
        try {
            return new ResponseData<UserInfo>(HttpStatus.SUCCESS, 'Create a new account was successful' , await this.usersService.create(user));
        } catch (error) {
            return new ResponseData<null>(error.status, error.response.errors,null,error.toString());
        }
    }

    
    @UseGuards(VerifyDecentralization)
    @Roles([Role.USER,Role.ADMIN])
    @Patch('')
    async updateUser(@Body() user:UserUpdate):Promise<ResponseData<UserUpdate|null>>{
        try {
            return new ResponseData<UserUpdate>(HttpStatus.SUCCESS,HttpMessage.SUCCESS,await this.usersService.update(user))
        } catch (error) {
            return new ResponseData<null>(error.status,error.response.errors, null, error.toString())
        }
    }


    @Patch('role')
    @UseGuards()
    @Roles([Role.ADMIN])
    async updateRole(@Body() updateRole:UpdateRole, @Req() request:Request):Promise<ResponseData<User|null>>{
        try {
            return new ResponseData(HttpStatus.SUCCESS,HttpMessage.SUCCESS,await this.usersService.updateRole(updateRole, request))
            
        } catch (error) {
            return new ResponseData(HttpStatus.SUCCESS,HttpMessage.SUCCESS,null, error.toString())
        }
    }

}