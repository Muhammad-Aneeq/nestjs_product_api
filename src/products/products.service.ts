import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schemas/Product.schema';
import { User } from '../schemas/User.schema';
import { CreateProductDto } from './dto/CreateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createProduct({ userId, ...createPostDto }: CreateProductDto) {
    const findUser = await this.userModel.findById(userId);

    if (!findUser) throw new HttpException('User Not Found', 404);
    const newProduct = new this.productModel({
      ...createPostDto,
      user: userId,
    });
    const savedProduct = await newProduct.save();
    await findUser.updateOne({
      $push: {
        products: savedProduct._id,
      },
    });
    return savedProduct;
  }

  getProducts() {
    return this.productModel.find();
  }

  findProductsById(id: string) {
    return this.productModel.find({ user: id });
  }
}
