import cartModel from '../models/Cart';
import { Types } from 'mongoose';
import Product from '../models/Product';

export async function getCartByUser(userId: string): Promise<any | null> {
  return cartModel.findOne({ userId: userId }).populate('cartItem.productId');
}

export async function addToCart(userId: string, productId: string, quantity: number) {
  const product = await Product.findById(productId);
  if (!product) throw new Error('Product not found');

  let cart = await cartModel.findOne({ userId: userId });
  if (!cart) {
  cart = new cartModel({ userId: userId, cartItem: [{ productId: new Types.ObjectId(productId), quantity }] });
  } else {
    const itemIndex = cart.cartItem.findIndex((item: any) => item.productId.toString() === productId);
    if (itemIndex !== -1) {
      cart.cartItem[itemIndex].quantity += quantity;
    } else {
  cart.cartItem.push({ productId: new Types.ObjectId(productId), quantity });
    }
  }
  return cart.save();
}

export async function updateCartItem(userId: string, productId: string, quantity: number) {
  const cart = await cartModel.findOne({ userId: userId });
  if (!cart) throw new Error('Cart not found');

  const itemIndex = cart.cartItem.findIndex((item: any) => item.productId.toString() === productId);
  if (itemIndex === -1) throw new Error('Product not found in cart');

  cart.cartItem[itemIndex].quantity = quantity;
  return cart.save();
}

export async function removeFromCart(userId: string, productId: string) {
  const cart = await cartModel.findOne({ userId: userId });
  if (!cart) throw new Error('Cart not found');

  cart.cartItem = cart.cartItem.filter((item: any) => item.productId.toString() !== productId);
  return cart.save();
}