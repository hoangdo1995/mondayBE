import { Module } from "@nestjs/common";
import { UsersProviders } from "./users.providers";
import { DatabaseModule } from "src/database/database.module";
import { UsersControllers } from "./users.controllers";
import { UsersService } from "./users.service";
import { BcryptService } from "src/utilities/encryptions/bcrypt/bcrypt.service";
import { JwtService } from "@nestjs/jwt";

@Module(
    {
        imports:[DatabaseModule],
        providers:[...UsersProviders,UsersService, BcryptService,JwtService],
        controllers:[UsersControllers],
        exports:[UsersService]
    }
)
export class UsersModule {

}