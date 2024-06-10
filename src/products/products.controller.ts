// import {
//   Controller,
//   Post,
//   Body,
//   UsePipes,
//   ValidationPipe,
// } from '@nestjs/common';
// import { CreatePostDto } from './dtos/CreatePost.dto';
// import { PostsService } from './posts.service';

// @Controller('posts')
// export class PostsController {
//   constructor(private postsService: PostsService) {}

//   @Post()
//   @UsePipes(new ValidationPipe())
//   createPost(@Body() createPostDto: CreatePostDto) {
//     return this.postsService.createPost(createPostDto);
//   }
// }

import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import mongoose from 'mongoose';
import { CreateProductDto } from './dto/CreateProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  async getProductsByUserId(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('User not found', 404);
    const products = await this.productService.findProductsById(id);
    if (products.length <= 0)
      throw new HttpException('products not found', 404);
    return products;
  }
}
