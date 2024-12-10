import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product, ProductDto } from './product.interface';

@Injectable()
export class ProductsService {
    constructor(
        @Inject('PRODUCT_MODEL')
        private productModel: Model<Product>,
    ){}

    async findAll():Promise<Product[]>{
        return await this.productModel.find().exec();
    }

    async create(productDto:ProductDto):Promise<Product>{
        return await this.productModel.create(productDto)
    }
}
