import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class UserInterceptor implements NestInterceptor {
    constructor(
        // private readonly jwtService: JwtService
    ){}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const  jwtService: JwtService = new JwtService;
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();
        
        const authHeader = (request as any).headers['authorization'];
        if(authHeader && authHeader.startsWith('Bearer')){
            const access_token = authHeader.split(' ')[1];
            try {
                const decode = jwtService.decode(access_token);
                const {iat,exp, ...userInfo} = decode;
                (request as any).headers['user'] = userInfo;
            } catch (error) {
                throw new UnauthorizedException(error.toString());
            }
        }
        return next.handle(); // Tiếp tục thực thi handler
      }
}