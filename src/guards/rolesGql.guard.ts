import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Roles } from "src/decorators/roles.decorator";

@Injectable()
export class RolesGuardGraphql implements CanActivate {
    constructor(
        private reflector: Reflector,
      ){}
   
    canActivate(context: ExecutionContext): boolean | Promise<boolean>{
        const ctx = GqlExecutionContext.create(context).getContext();
        const roles = this.reflector.get(Roles, context.getHandler());
        if (!roles) {
            return true;
        }

        const user = ctx.req.user; // Lấy user từ req
        if (!user) {
            return false;
        }

        return roles.some(role => user.role?.includes(role));
    }
    
}
