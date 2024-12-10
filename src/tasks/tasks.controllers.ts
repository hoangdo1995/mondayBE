import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskDto } from "./task.dto";
import { ResponseData } from "src/global/responseData";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { Task } from "./task.interfaces";

@Controller('tasks')
export class TasksControllers {
    constructor(
        private tasksServices: TasksService
    ){}

    @Get('')
    async getAll(){
        return this.tasksServices.findAll();
    }

    @Post('')
    async createTask(@Body(new ValidationPipe())taskDto: TaskDto):Promise<ResponseData<Task>>{
        try {
            return new ResponseData(HttpStatus.SUCCESS, HttpMessage.SUCCESS, await this.tasksServices.create(taskDto))
        } catch (error) {
            return new ResponseData(HttpStatus.ERROR, HttpMessage.ERROR, await this.tasksServices.create(taskDto))
        }
    }
}
