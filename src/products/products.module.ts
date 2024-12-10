import { Module } from "@nestjs/common";
import { ProductsProviders } from "./products.providers";
import { ProductsController } from "./products.controllers";
import { ProductsService } from "./products.service";
import { DatabaseModule } from "src/database/database.module";

@Module({
    imports:[DatabaseModule],
    controllers:[ProductsController],
    providers:[...ProductsProviders, ProductsService],
    exports:[ProductsService]
})
export class ProductsModules {

}