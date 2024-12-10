import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthServices } from "./auth.services";
import { ResponseData } from "src/global/responseData";
import { LoginUser } from "./dto/loginUser.dto";

@Controller('auth')
export class AuthControllers {
    constructor(private authService:AuthServices){}

    @Post('login')
    async loginUser(@Body() userInfo:LoginUser){
        try {
            return new ResponseData(HttpStatus.ACCEPTED,'Login success', await this.authService.loginUser(userInfo))

        } catch (error) {
            return new ResponseData<null>(HttpStatus.UNAUTHORIZED, error?.response?.message,null,error.toString());
        }
    }
    
}