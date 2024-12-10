import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService:JwtService,
        private readonly configService: ConfigService
        
    ){}
    async canActivate(context: ExecutionContext) : Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const authHeader = request.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer')) 
        {
            const access_token = authHeader.split(' ')[1];
            try {
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