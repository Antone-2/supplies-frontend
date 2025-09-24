
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_BASE = `${API_BASE_URL}/admin/orders`;

export const getOrders = async () => {
    const res = await axios.get(API_BASE);
    return res.data.data || [];
};

export const updateOrderStatus = async (orderId: string, status: string) => {
    await axios.put(`${API_BASE}/${orderId}/status`, { status });
};

export const cancelOrder = async (orderId: string) => {
    await axios.put(`${API_BASE}/${orderId}/status`, { status: 'cancelled' });
};
