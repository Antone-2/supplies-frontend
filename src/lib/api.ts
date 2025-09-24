import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

export const fetchProducts = () => axios.get(`${API_BASE}/products`).then(res => res.data);
export const fetchOrders = () => axios.get(`${API_BASE}/orders`).then(res => res.data);
export const fetchUsers = () => axios.get(`${API_BASE}/users`).then(res => res.data);
export const fetchAnalytics = () => axios.get(`${API_BASE}/admin/overview`).then(res => res.data);
export const fetchSettings = () => axios.get(`${API_BASE}/settings`).then(res => res.data);

// Add more endpoints as needed
