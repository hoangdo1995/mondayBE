import { BadRequestException, Inject, Injectable, Req } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { UserDto } from './dto/user.dto';
import { ResponseData } from 'src/global/responseData';
import { BcryptService } from 'src/utilities/encryptions/bcrypt/bcrypt.service';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<User>,
        private readonly bcryptService:BcryptService
    ){}

    async findAll():Promise<User[]>{
        return await this.userModel.find().exec();
    }

    // register user account service
    async create(user:UserDto):Promise<UserDto>{
        const {password} = user;
        // encrypt password with bcrypt
        if(password) {
            const hashPassword = await this.bcryptService.hashValue(password);
            user.password = hashPassword;
        }

        try {
            const newUser = await this.userModel.create(user);
            const {password, ...userInfo} = user;
            return userInfo;
            
        }catch(error){
            switch(error.name){
                case 'ValidationError':{
                    const errorMessages = Object.values(error.errors).map((error: any) => error.message);
                    throw new BadRequestException({
                        message: 'Validation error',
                        errors: errorMessages,
                    });
                    break;
                }
                case 'MongoServerError':{
                    if (error.code === 11000) {
                        const field = Object.keys(error.keyValue)[0];
                        const value = error.keyValue[field];
                        throw new BadRequestException({
                          message: 'Duplicate field error',
                          errors: [`${value} is already exists.`],
                        });
                    }else{
                        const errorMessages = Object.values(error.errors).map((error: any) => error.message);
                        throw new BadRequestException({
                            message: 'Validation error',
                            errors: errorMessages,
                        });
                    }
                    break;
                }
                default:{
                    throw new BadRequestException('An unexpected error occurred');
                }
            }
            
        }
    }

}
