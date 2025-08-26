import { Document, Types } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  category?: string;
  brand?: string;
  stock?: number;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

declare const Product: import('mongoose').Model<IProduct>;
export default Product;
