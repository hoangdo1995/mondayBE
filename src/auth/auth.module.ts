import { Module } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { AuthControllers } from "./auth.controllers";
import { AuthServices } from "./auth.services";
import { DatabaseModule } from "src/database/database.module";
import { UsersProviders } from "src/users/users.providers";
import { BcryptService } from "src/utilities/encryptions/bcrypt/bcrypt.service";
import { JwtModule, JwtSecretRequestType, JwtService } from "@nestjs/jwt";

@Module({
    imports:[DatabaseModule],
    providers:[...UsersProviders,BcryptService,AuthServices,JwtService],
    controllers:[AuthControllers],
    exports:[AuthServices]
})
export class AuthModule{}