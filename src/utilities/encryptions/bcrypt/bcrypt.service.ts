import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";

@Injectable()
export class BcryptService {
    constructor(
        private configService:ConfigService){}
    private readonly saltRounds =  this.configService.get<number>('SALT_ROUNDS')||10;

    async hashValue(value:string):Promise<string>{
        const salt = await bcrypt.genSalt(this.saltRounds );
        return bcrypt.hash(value,salt);
    }

    async validateValue (inputValue:string, hashedValue:string):Promise<boolean>{
        return bcrypt.compare(inputValue, hashedValue);
    }
}