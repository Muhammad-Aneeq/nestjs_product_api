/* eslint-disable */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from './Product.schema';

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: false })
  lastName?: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  age: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  products: Product[];
}

export const UserSchema = SchemaFactory.createForClass(User);
