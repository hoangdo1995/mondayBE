import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Role } from "src/global/globalEnum";

export class VerifyDecentralization implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        try {
            const {email:targetEmail, role} = context.switchToHttp().getRequest()['user'];
            const currentEmail = context.switchToHttp().getRequest().body.email;
            if(role === Role.ADMIN) return true;
            if(targetEmail === currentEmail){
                return true;
            }
            else {
                throw new ForbiddenException("The email do not match")
            }
        } catch (error) {
            switch(error.name){
                case 'ForbiddenException':
                    throw new ForbiddenException("The email do not match")

                default:
                    throw new BadRequestException()
            }
        }
    }
}