import { Module } from "@nestjs/common";
import { TasksProviders } from "./tasks.providers";
import { TasksService } from "./tasks.service";
import { TasksControllers } from "./tasks.controllers";
import { DatabaseModule } from "src/database/database.module";

@Module({
    imports:[DatabaseModule],
    controllers:[TasksControllers],
    providers:[...TasksProviders, TasksService],
    exports:[TasksService]
})
export class TasksModules {

}