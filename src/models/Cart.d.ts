import { Document, Types } from 'mongoose';

export interface CartItem {
  productId: Types.ObjectId;
  quantity: number;
  price?: number;
  totalProductDiscount?: number;
}

export interface ICart extends Document {
  userId: Types.ObjectId;
  cartItem: CartItem[];
  totalPrice?: number;
  totalPriceAfterDiscount?: number;
  discount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

declare const cartModel: import('mongoose').Model<ICart>;
export default cartModel;
