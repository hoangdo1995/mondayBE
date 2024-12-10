import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { Product, ProductDto } from "./product.interface";
import { ProductsService } from "./products.service";
import { ResponseData } from "src/global/responseData";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { AuthGuard } from "src/guards/auth.guard";

@Controller('products')
export class ProductsController {
    constructor(
        private productsService:ProductsService
    ){}

    @Get('')
    async getProducts():Promise<Product[]>{
        return this.productsService.findAll();
    }

    @Post("")
    async createProduct(@Body(new ValidationPipe()) productDto:ProductDto):Promise<ResponseData<Product>>{
        try {
            return new ResponseData(HttpStatus.SUCCESS, HttpMessage.SUCCESS, await this.productsService.create(productDto))
        } catch (error) {
            return new ResponseData(HttpStatus.ERROR, HttpMessage.ERROR, await this.productsService.create(productDto))
        }
    }   
}