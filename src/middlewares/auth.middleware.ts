
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
        private readonly jwtService:JwtService,
        private readonly configService: ConfigService
  ){}
  async use(request: Request, response: Response, next: NextFunction) {
    
    const authHeader = request.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer')) 
    {
        const access_token = authHeader.split(' ')[1];
        try {
            // verify token
            const isValidateToken = await this.jwtService.verify(access_token,{secret:this.configService.get<string>('JWT_SECRET_KEY')});
            const decode = this.jwtService.decode(access_token);
            const {iat,exp, ...userInfo} = decode;
            (request as any).user = {access_token,...userInfo };
          } catch (error) {
            throw new UnauthorizedException("Expired or invalid token")
          }
        }
        else{
          throw new  UnauthorizedException("Access token is missing");
        }
    next();
  }
}
