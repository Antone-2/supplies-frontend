import { useState } from 'react';
import {
    LuShoppingCart, LuHeart, LuEye, LuShare2, LuDownload, LuPhone, LuMail, LuMessageCircle
} from 'react-icons/lu';
// import other icons similarly if this works
import { Button } from '../components/ui/button';
import { useCart } from '../context/cartContext';
import { useWishlist } from '../context/wishlistContext';
import { toast } from 'react-hot-toast';

interface ButtonActionsProps {
    product?: any;
    variant?: 'card' | 'detail' | 'list' | 'category';
    size?: 'sm' | 'default' | 'lg';
    onAction?: (action: string) => void;
}

// Add to Cart Button
export const AddToCartButton = ({ product, size = 'default' }: ButtonActionsProps) => {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async () => {
        if (!product) return;

        setIsAdding(true);
        try {
            await addToCart(product._id, 1);
            toast.success(`${product.name} added to cart!`);
        } catch (error) {
            toast.error('Failed to add item to cart');
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <Button
            onClick={handleAddToCart}
            disabled={isAdding || !product}
            size={size}
            className="w-full"
        >
            <LuShoppingCart className="mr-2 h-4 w-4" />
            {isAdding ? 'Adding...' : 'Add to Cart'}
        </Button>
    );
};

// Wishlist Button
export const WishlistButton = ({ product }: ButtonActionsProps) => {
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const [isLoading, setIsLoading] = useState(false);

    const isInWishlist = product ? wishlist.some((item: any) => item._id === product._id) : false;

    const handleWishlist = async () => {
        if (!product) return;

        setIsLoading(true);
        try {
            if (isInWishlist) {
                await removeFromWishlist(product._id);
                toast.success('Removed from wishlist');
            } else {
                await addToWishlist(product);
                toast.success('Added to wishlist');
            }
        } catch (error) {
            toast.error('Failed to update wishlist');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={handleWishlist}
            disabled={isLoading}
            variant={isInWishlist ? "destructive" : "outline"}
            size="icon"
        >
            <LuHeart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
        </Button>
    );
};

// Quick View Button
export const QuickViewButton = ({ onAction }: ButtonActionsProps) => {
    const handleQuickView = () => {
        if (onAction) {
            onAction('quick-view');
        }
    };

    return (
        <Button
            onClick={handleQuickView}
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10"
        >
            <LuEye className="h-4 w-4" />
        </Button>
    );
};

// Share Button
export const ShareButton = ({ product }: ButtonActionsProps) => {
    const handleShare = async () => {
        if (!product) return;

        const shareUrl = `${window.location.origin}/product/${product._id}`;
        const shareText = `Check out ${product.name} at Medhelm Supplies!`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    text: shareText,
                    url: shareUrl,
                });
                toast.success('Shared successfully');
            } catch (error) {
                toast.error('Failed to share');
            }
        } else {
            navigator.clipboard.writeText(shareUrl);
            toast.success('Link copied to clipboard');
        }
    };

    return (
        <Button
            onClick={handleShare}
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10"
        >
            <LuShare2 className="h-4 w-4" />
        </Button>
    );
};

// Download Button
export const DownloadButton = ({ product }: ButtonActionsProps) => {
    const handleDownload = () => {
        if (!product) return;

        // Create a downloadable PDF or image
        const link = document.createElement('a');
        link.href = product.image || '/placeholder-product.pdf';
        link.download = `${product.name}-product-info.pdf`;
        link.click();

        toast.success('Download started');
    };

    return (
        <Button
            onClick={handleDownload}
            variant="outline"
            size="sm"
        >
            <LuDownload className="mr-2 h-4 w-4" />
            Download
        </Button>
    );
};

// Contact Buttons
export const ContactButtons = () => {
    const handleCall = () => {
        window.location.href = 'tel:+254746020323';
    };

    const handleEmail = () => {
        window.location.href = 'mailto:info@medhelmsupplies.com';
    };

    const handleWhatsApp = () => {
        window.open('https://wa.me/254746020323', '_blank');
    };

    return (
        <div className="flex gap-2">
            <Button onClick={handleCall} variant="outline" size="sm">
                <LuPhone className="mr-2 h-4 w-4" />
                Call
            </Button>
            <Button onClick={handleEmail} variant="outline" size="sm">
                <LuMail className="mr-2 h-4 w-4" />
                Email
            </Button>
            <Button onClick={handleWhatsApp} variant="default" size="sm">
                <LuMessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
            </Button>
        </div>
    );
};

// Category Button
export const CategoryButton = ({ category, onClick }: { category: any; onClick: () => void }) => {
    return (
        <Button
            onClick={onClick}
            variant="outline"
            className="w-full justify-start text-left hover:bg-primary/10"
        >
            {category.name}
        </Button>
    );
};

// Filter Button
export const FilterButton = ({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) => {
    return (
        <Button
            onClick={onClick}
            variant={isActive ? "default" : "outline"}
            size="sm"
            className="rounded-full"
        >
            {label}
        </Button>
    );
};

// Pagination Button
export const PaginationButton = ({ page, isActive, onClick }: { page: number; isActive: boolean; onClick: () => void }) => {
    return (
        <Button
            onClick={onClick}
            variant={isActive ? "default" : "outline"}
            size="sm"
            className="min-w-[40px]"
        >
            {page}
        </Button>
    );
};

// Loading Button
export const LoadingButton = ({ isLoading, children, ...props }: any) => {
    return (
        <Button disabled={isLoading} {...props}>
            {isLoading ? (
                <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Loading...
                </>
            ) : (
                children
            )}
        </Button>
    );
};

// Product Action Buttons Group
export const ProductActionButtons = ({ product }: { product: any }) => {
    return (
        <div className="flex gap-2">
            <AddToCartButton product={product} size="sm" />
            <WishlistButton product={product} />
            <QuickViewButton product={product} />
            <ShareButton product={product} />
        </div>
    );
};

// Mobile Action Buttons
export const MobileActionButtons = ({ product }: { product: any }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 md:hidden">
            <div className="flex gap-2">
                <AddToCartButton product={product} size="lg" />
                <WishlistButton product={product} />
            </div>
        </div>
    );
};

// Button Factory for different contexts
export const createButtonActions = (context: string) => {
    const buttonMap = {
        product: ProductActionButtons,
        category: CategoryButton,
        mobile: MobileActionButtons,
        contact: ContactButtons,
    };

    return buttonMap[context as keyof typeof buttonMap] || ProductActionButtons;
};
