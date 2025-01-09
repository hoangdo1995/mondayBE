import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "src/decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
      private reflector: Reflector,
    ){}
    matchRoles(requiredRoles: string[], userRoles: string[]): boolean {
        if (!userRoles || userRoles.length === 0) {
          return false; 
        }
        return requiredRoles.some(role => userRoles.includes(role));
      }
    async canActivate(context: ExecutionContext): Promise<boolean>{

        const roles = this.reflector.get(Roles,context.getHandler());
        if(!roles){
            return true;
        }
        const request = context.switchToHttp().getRequest();
        try {
            const user = request.user;
          if(!user.role){
            throw new BadRequestException("Role is missing")
          }else{
            return this.matchRoles(roles,user.role);
          }
        } catch (error) {
          throw new  UnauthorizedException(error.toString());
        }
    }
}