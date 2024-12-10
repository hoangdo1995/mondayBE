import { BadRequestException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Model } from "mongoose";
import { UserDto } from "src/users/dto/user.dto";
import { User } from "src/users/user.interface";
import { BcryptService } from "src/utilities/encryptions/bcrypt/bcrypt.service";
import { LoginUser } from "./dto/loginUser.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { LoginForm } from "./dto/loginForm.dto";

@Injectable()
export class AuthServices {
    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<User>,
        private readonly bcryptService:BcryptService,
        private jwtServices:JwtService,
        private readonly configService: ConfigService
    ){}
    async loginUser(userInfo:LoginUser):Promise<LoginForm>{
        const {email,password} = userInfo;
        try {
            const checkExistEmail:User |null = await this.userModel.findOne({email});
            if(checkExistEmail){
                const {password :hashPassword} = checkExistEmail;
                const checkPass = await this.bcryptService.validateValue(password,hashPassword);
                
                console.log(checkPass)
                if(checkPass){
                    const payload = {
                        email:userInfo.email,
                        name:checkExistEmail?.name,
                        role: checkExistEmail.role
                    } 
                    return new LoginForm(
                        await this.jwtServices.signAsync(payload,{secret:this.configService.get<string>('JWT_SECRET_KEY'),expiresIn:"30m"})
                    )
                }else {
                    throw new UnauthorizedException('Password incorrect');
                }
            }
            else {
                throw new UnauthorizedException('Email is not exists');
            }
        } catch (error) {
            if(error.name === 'UnauthorizedException'){
                throw new UnauthorizedException(error.response.message)
            }
            throw new BadRequestException('An unexpected error occurred');
        }

    }
}