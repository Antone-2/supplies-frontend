import Order from '../models/Order';
import cartModel from '../models/Cart';

export async function placeOrder(userId: string) {
  const cart = await cartModel.findOne({ userId: userId }).populate('cartItem.productId');
  if (!cart || cart.cartItem.length === 0) throw new Error('Cart is empty');

  // Calculate total
  const totalAmount = cart.cartItem.reduce(
    (sum: number, item: any) => sum + item.quantity * (item.productId as any).price,
    0
  );

  // Prepare order items
  const orderItems = cart.cartItem.map((item: any) => ({
    product: item.productId._id,
    quantity: item.quantity,
    price: (item.productId as any).price,
  }));

  const order = new Order({
    user: userId,
    items: orderItems,
    totalAmount,
    status: 'Pending',
  });

  await order.save();

  // Clear the cart
  cart.cartItem = [];
  await cart.save();

  return order;
}

export async function getOrders(userId: string, isAdmin: boolean) {
  if (isAdmin) {
    return Order.find().populate('user', 'name email').populate('items.product');
  }
  return Order.find({ user: userId }).populate('items.product');
}

export async function updateOrderStatus(orderId: string, status: string) {
  const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  if (!validStatuses.includes(status)) throw new Error('Invalid order status');

  const order = await Order.findById(orderId);
  if (!order) throw new Error('Order not found');

  // Update order fields based on status
  if (status === 'Delivered') {
    order.isDelivered = true;
    order.deliveredAt = new Date();
  } else if (status === 'Shipped' || status === 'Processing') {
    // You can add more logic for shipped/processing if needed
  } else if (status === 'Cancelled') {
    // Optionally handle cancellation logic
  }
  // Optionally, you can store the status as a custom field if needed
  // order.status = status;

  return order.save();
}
