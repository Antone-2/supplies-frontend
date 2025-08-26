import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
    productId: string;
    userId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    isEditableByAdmin: boolean;
}

const reviewSchema = new Schema<IReview>(
    {
        productId: { type: String, required: true },
        userId: { type: String, required: true },
        content: { type: String, required: true },
        isEditableByAdmin: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model<IReview>('Review', reviewSchema);
