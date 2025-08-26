// models/Wishlist.ts
import mongoose, { Document, Schema } from 'mongoose';

interface WishlistItem {
  product: mongoose.Types.ObjectId;
  addedAt: Date;
}

export interface IWishlist extends Document {
  user: mongoose.Types.ObjectId;
  items: WishlistItem[];
}

const wishlistItemSchema = new Schema<WishlistItem>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  addedAt: { type: Date, default: Date.now },
});

const wishlistSchema = new Schema<IWishlist>({
  user: { type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  items: [wishlistItemSchema],
});

export default mongoose.model<IWishlist>('Wishlist', wishlistSchema);