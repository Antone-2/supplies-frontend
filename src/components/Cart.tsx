import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/context/cartContext';
import {
  ShoppingCart,
  Heart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const {
    items,
    wishlist,
    total,
    itemCount,
    removeFromCart,
    updateQuantity,
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

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    // TODO: Implement checkout logic
    console.log('Proceeding to checkout with items:', items);
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
            Cart ({itemCount})
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Wishlist ({wishlist.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cart" className="space-y-6">
          {items.length === 0 ? (
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
                {items.map((item: any) => (
                  <Card key={item.product?._id || item._id}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <img
                          src={item.product?.imageUrl || item.image}
                          alt={item.product?.name || item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-medical-heading">{item.product?.name || item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.product?.brand || item.brand}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.product?._id || item._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item.product?._id || item._id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-primary">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {formatPrice(item.price)} each
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
                      <span>Subtotal ({itemCount} items)</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(total)}</span>
                    </div>

                    <div className="space-y-2">
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleCheckout}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Proceed to Checkout
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={clearCart}
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
              {wishlist.map((item: any) => (
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