import { Module } from "@nestjs/common";
import { UsersProviders } from "./users.providers";
import { DatabaseModule } from "src/database/database.module";
import { UsersControllers } from "./users.controllers";
import { UsersService } from "./users.service";
import { BcryptService } from "src/utilities/encryptions/bcrypt/bcrypt.service";
import { JwtService } from "@nestjs/jwt";
import { RedisModule } from "@nestjs-modules/ioredis";

@Module(
    {
        imports:[DatabaseModule, RedisModule],
        providers:[...UsersProviders,UsersService, BcryptService,JwtService,RedisModule],
        controllers:[UsersControllers],
        exports:[UsersService, RedisModule]
    }
)
export class UsersModule {

}