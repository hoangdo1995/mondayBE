import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Task } from './task.interfaces';
import { TaskDto } from './task.dto';

@Injectable()
export class TasksService {
    constructor(
        @Inject('TASK_MODEL')
        private taskModel: Model<Task>
    ){}

    async findAll(){
        return this.taskModel.find().exec();
    }

    async create(taskDto:TaskDto){
        return await this.taskModel.create(taskDto);
    }
}
