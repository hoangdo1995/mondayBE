import { InjectRedis } from "@nestjs-modules/ioredis";
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import Redis from "ioredis";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService:JwtService,
        private readonly configService: ConfigService,
        
        @InjectRedis()
        private readonly redis:Redis

        
    ){}
    async canActivate(context: ExecutionContext) : Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const authHeader = request.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer')) 
        {
            const access_token = authHeader.split(' ')[1];
            try {
                // check deadToken
                const deadToken = await this.redis.get(`${request.user.email}_deadToken`);
                if(deadToken === access_token){
                    throw new ForbiddenException()
                }
                // verify token
                const isValidateToken = await this.jwtService.verify(access_token,{secret:this.configService.get<string>('JWT_SECRET_KEY')});
                return isValidateToken;
            } catch (error) {
                throw new UnauthorizedException("Expired or invalid token")
            }
        }
        else{
            throw new  UnauthorizedException("Access token is missing");
        }
    }
}