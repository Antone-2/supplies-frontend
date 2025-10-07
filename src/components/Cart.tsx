import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/context/CartContext';
import {
  ShoppingCart,
  Heart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { useState } from 'react';

const Cart = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [processingItems, setProcessingItems] = useState<Set<number>>(new Set());
  const { isAuthenticated } = useAuth();
  const {
    cart,
    wishlist,
    getTotalItems,
    removeFromCart,
    updateCartQuantity,
    addToCart,
    removeFromWishlist,
    clearCart
  } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleQuantityChange = async (productId: number, newQuantity: number) => {
    setProcessingItems(prev => new Set([...prev, productId]));

    try {
      // Simulate API delay for better UX demonstration
      await new Promise(resolve => setTimeout(resolve, 300));

      if (newQuantity <= 0) {
        removeFromCart(productId);
      } else {
        updateCartQuantity(productId, newQuantity);
      }
    } finally {
      setProcessingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleCheckout = async () => {
    // Check if cart has items
    if (cart.length === 0) {
      toast.error('Cart is Empty', {
        description: 'Please add items to your cart before checkout.',
      });
      return;
    }
    // Require authentication
    if (!isAuthenticated) {
      toast.error('Authentication Required', {
        description: 'Please sign in to proceed to checkout.',
      });
      navigate('/auth');
      return;
    }
    setLoading(true);
    try {
      // Calculate total
      const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      console.log('Proceeding to checkout with items:', cart);
      console.log('Total amount:', formatPrice(total));
      // Show success toast
      toast.success('Proceeding to Checkout', {
        description: `${cart.length} item(s) for ${formatPrice(total)}`,
      });
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Navigate to checkout page
      navigate('/checkout');
    } catch (error) {
      toast.error('Checkout Error', {
        description: 'Unable to proceed to checkout. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClearCart = () => {
    if (cart.length === 0) {
      toast.info('Cart Already Empty', {
        description: 'There are no items to remove.',
      });
      return;
    }

    toast.success('Confirm Clear Cart', {
      description: `Remove all ${getTotalItems()} items from cart?`,
      action: {
        label: 'Clear All',
        onClick: clearCart,
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-medical-heading">Shopping Cart</h1>
      </div>

      <Tabs defaultValue="cart" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cart" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Cart ({getTotalItems()})
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Wishlist ({wishlist.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cart" className="space-y-6">
          {cart.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-medical-heading mb-2">
                  Your cart is empty
                </h3>
                <p className="text-muted-foreground mb-4">
                  Start shopping to add items to your cart
                </p>
                <Button onClick={() => navigate('/products')}>
                  Browse Products
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <Card key={item.product.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-medical-heading">{item.product.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={processingItems.has(item.product.id)}
                                onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              >
                                {processingItems.has(item.product.id) ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  <Minus className="h-3 w-3" />
                                )}
                              </Button>
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={processingItems.has(item.product.id)}
                                onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              >
                                {processingItems.has(item.product.id) ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  <Plus className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-primary">
                                {formatPrice(item.product.price * item.quantity)}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {formatPrice(item.product.price)} each
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal ({getTotalItems()} items)</span>
                      <span>{formatPrice(cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0))}</span>
                    </div>

                    <div className="space-y-2">
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleCheckout}
                        disabled={cart.length === 0 || loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Proceed to Checkout ({getTotalItems()} items)
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleClearCart}
                        disabled={cart.length === 0}
                      >
                        Clear Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="wishlist" className="space-y-6">
          {wishlist.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Heart className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-medical-heading mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-muted-foreground mb-4">
                  Save items you like to your wishlist
                </p>
                <Button onClick={() => navigate('/products')}>
                  Browse Products
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {wishlist.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                        <h3 className="font-semibold text-medical-heading">{item.name}</h3>
                      </div>
                      <p className="text-lg font-bold text-primary">
                        {formatPrice(item.price)}
                      </p>
                      <Button
                        className="w-full"
                        onClick={() => addToCart(item)}
                        disabled={!item.inStock}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Cart;