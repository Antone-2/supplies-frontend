import { useCart } from '@/context/cartContext';
import { LuTrash2, LuPlus, LuMinus } from 'react-icons/lu';
import { useState } from 'react';

const CartDisplay = () => {
  const { cartItems, removeFromCart, updateQuantity, loading, error } = useCart();

  const getTotalPrice = () => {
    return cartItems.reduce((total: number, item: any) => total + (item.product.price * item.quantity), 0);
  };

  if (loading) return <div className="text-center py-8">Loading cart...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  // Kilimall-style cart: select all, delete, valid/invalid separation, modern layout
  const [selected, setSelected] = useState<string[]>(cartItems.map((item: any) => item.product._id));
  const allSelected = selected.length === cartItems.length && cartItems.length > 0;
  const toggleSelectAll = () => setSelected(allSelected ? [] : cartItems.map(item => item.product._id));
  const toggleSelect = (id: string) => setSelected(selected.includes(id) ? selected.filter((i: string) => i !== id) : [...selected, id]);

  // For demo, all items are valid; you can add logic for invalid items if needed
  const validItems = cartItems;
  const invalidItems: typeof cartItems = [];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <>
          {/* Select All & Delete */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleSelectAll}
                className="accent-primary w-4 h-4 rounded"
                aria-label="Select all items in cart"
                title="Select all"
              />
              <span className="font-medium text-gray-700">Select All</span>
            </div>
            <button
              className="text-red-600 hover:underline text-sm font-medium"
              onClick={() => selected.forEach((id: string) => removeFromCart(id))}
              disabled={selected.length === 0}
            >
              Delete
            </button>
          </div>

          {/* Valid Items */}
          <div className="rounded-lg border bg-white overflow-hidden">
            {validItems.map((item) => (
              <div key={item.product._id} className="flex items-center gap-3 border-b last:border-b-0 px-4 py-3 relative group">
                <input
                  type="checkbox"
                  checked={selected.includes(item.product._id)}
                  onChange={() => toggleSelect(item.product._id)}
                  className="accent-primary w-4 h-4 rounded mr-2"
                  aria-label={`Select ${item.product.name}`}
                  title={`Select ${item.product.name}`}
                />
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded border"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{item.product.name}</div>
                  <div className="text-xs text-gray-500">KES {item.product.price}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                    className="p-1 rounded-full border hover:bg-gray-100 text-gray-700"
                    aria-label={`Decrease quantity of ${item.product.name}`}
                    title="Decrease quantity"
                    disabled={item.quantity <= 1}
                  >
                    <LuMinus size={16} />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    className="p-1 rounded-full border hover:bg-gray-100 text-gray-700"
                    aria-label={`Increase quantity of ${item.product.name}`}
                    title="Increase quantity"
                  >
                    <LuPlus size={16} />
                  </button>
                </div>
                <div className="text-primary font-bold w-20 text-right">KES {(item.product.price * item.quantity).toLocaleString()}</div>
                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="text-gray-400 hover:text-red-600 ml-2"
                  aria-label={`Remove ${item.product.name} from cart`}
                  title="Remove item"
                >
                  <LuTrash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Invalid Items (if any) */}
          {invalidItems.length > 0 && (
            <div className="mt-6">
              <div className="font-semibold text-red-600 mb-2">Invalid</div>
              <div className="rounded-lg border bg-gray-50 overflow-hidden">
                {invalidItems.map((item) => (
                  <div key={item.product._id} className="flex items-center gap-3 border-b last:border-b-0 px-4 py-3 opacity-60">
                    <input type="checkbox" disabled className="w-4 h-4 rounded mr-2" aria-label="Invalid item" title="Invalid item" />
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded border"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate">{item.product.name}</div>
                      <div className="text-xs text-gray-500">KES {item.product.price}</div>
                    </div>
                    <span className="text-gray-400">Invalid</span>
                  </div>
                ))}
              </div>
              <button className="text-red-600 hover:underline text-sm font-medium mt-2">Delete</button>
            </div>
          )}

          {/* Total */}
          <div className="mt-6 border-t pt-4 flex justify-between items-center">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-lg font-bold text-primary">KES {getTotalPrice().toLocaleString()}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDisplay;
