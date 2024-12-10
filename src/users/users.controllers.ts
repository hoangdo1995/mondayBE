import { Body, Controller, Get, HttpCode, Post, Request, UseGuards, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.interface";
import { UserDto } from "./dto/user.dto";
import { ResponseData } from "src/global/responseData";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { AuthGuard } from "src/guards/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "src/guards/roles.guard";

@Controller('users')
export class UsersControllers {
    constructor(
      private usersService:UsersService  
    ){}

    @UseGuards()
    @Roles(['user'])
    @Get('')
    async getUsers():Promise<ResponseData<User[]|null>>{
        try {
            return new ResponseData<User[]>(HttpStatus.SUCCESS, HttpMessage.SUCCESS, await this.usersService.findAll());
        } catch (error) {
            return new ResponseData<null>(HttpStatus.ERROR, HttpMessage.ERROR, null);
        }
    }


    @Post('')
    async createUser(@Body() user:UserDto):Promise<ResponseData<UserDto|null>>{
        try {
            return new ResponseData<UserDto>(HttpStatus.SUCCESS, HttpMessage.SUCCESS, await this.usersService.create(user));
        } catch (error) {
            return new ResponseData<null>(error.status, error.response.errors,null,error.toString());
        }
    }

}