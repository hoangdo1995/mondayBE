import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, Req } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { UserDto } from './dto/user.dto';
import { BcryptService } from 'src/utilities/encryptions/bcrypt/bcrypt.service';
import { UserInfo } from './dto/userInfo.dto';
import { UserUpdate } from './dto/userUpdate.dto';
import { Role } from 'src/global/globalEnum';
import { UpdateRole } from './dto/updateRole.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { Request } from 'express';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<User>,
        private readonly bcryptService:BcryptService,
        //   redis
        @InjectRedis()
        private readonly redis:Redis
    ){}

    async findAll():Promise<User[]>{
        return await this.userModel.find().exec();
    }

    // register user account service
    async create(user:UserDto):Promise<UserInfo>{
        const {password} = user;
        // encrypt password with bcrypt
        if(password) {
            const hashPassword = await this.bcryptService.hashValue(password);
            user.password = hashPassword;
        }
        try {
            // add default role
            const newUser:User = {...user,role:Role.USER};
            const newUserPost = await this.userModel.create(newUser);
            const {password,role, ...userInfo} = newUser;
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
                        throw new ConflictException({
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

    // update user account
    async update(userUpdate:UserUpdate):Promise<UserUpdate>{
        try {
            // check account exist
            const userFind:User|null = await this.userModel.findOne({email:userUpdate?.email})
            if(userFind){
                const idUpdate:string = ((userFind as any)['_id']);
                const update:User|null = await this.userModel.findByIdAndUpdate(
                    idUpdate,
                    userUpdate,
                    {
                        new:true,
                        runValidators:true
                    }
                )
            }else {
                throw new NotFoundException("User is not exist");
            }
            return userUpdate;
        } catch (error) {
            switch(error.name){
                default: throw new BadRequestException();
            }
        }
    }

    async updateRole(updateRole: UpdateRole, request:Request):Promise<User>{
        try {
            const currentUser = await this.userModel.findOne({email:updateRole.email});
            const idUpdate:string = (currentUser as any)['_id'];
            const update = await this.userModel.findByIdAndUpdate(
                idUpdate,
                {role:updateRole.newRole},
                {
                    new:true,
                    runValidators:true
                }
            )
            if(update){
                this.redis.set(`${update.email}_deadToken`, (request as any).user?.access_token)
                return update;
            }
            else {
                throw new NotFoundException("Account not exist")
            }
        } catch (error) {
            throw new BadRequestException();
        }
    }

}
