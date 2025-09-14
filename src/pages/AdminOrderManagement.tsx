import React, { useEffect, useState } from 'react';
// import { format, isAfter, isBefore } from 'date-fns';
// ...existing code...
import 'react-day-picker/dist/style.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
// Utility to convert orders to CSV and trigger download
function exportOrdersToCSV(orders: any[]) {
    if (!orders.length) return;
    const headers = [
        'Order ID',
        'User',
        'Status',
        'Total',
        'Date',
        'Shipping Address',
        'Customer Email',
        'Customer Phone',
        'Items'
    ];
    const rows = orders.map(order => [
        order._id,
        order.user?.email || order.user || '',
        order.orderStatus,
        order.totalAmount,
        order.createdAt ? new Date(order.createdAt).toLocaleString() : '',
        [order.shippingAddress?.address, order.shippingAddress?.city, order.shippingAddress?.country].filter(Boolean).join(' '),
        order.shippingAddress?.email || '',
        order.shippingAddress?.phone || '',
        (order.items || order.cartItem || []).map((item: any) => `${item.quantity}x${item.product?.name || item.productId || item.product} @KES${item.price || item.unitPrice || '-'}`).join('; ')
    ]);
    const csvContent = [headers, ...rows]
        .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
        .join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
import apiClient from '@/config/apiClient';
import { Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';


const AdminOrderManagement: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [analytics, setAnalytics] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState('');
    const [search, setSearch] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
    const [fromDate, setFromDate] = useState<Date | undefined>();
    const [toDate, setToDate] = useState<Date | undefined>();
    const [lowStock, setLowStock] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            apiClient.get('/orders/all'),
            apiClient.get('/orders/analytics'),
            apiClient.get('/products/low-stock')
        ])
            .then(([ordersRes, analyticsRes, lowStockRes]) => {
                setOrders(ordersRes.data.orders || []);
                setAnalytics(analyticsRes.data);
                setLowStock(lowStockRes.data.products || []);
            })
            .catch(() => setError('Failed to fetch orders, analytics, or stock info'))
            .finally(() => setLoading(false));
    }, []);

    const updateStatus = async (orderId: string, status: string) => {
        setLoading(true);
        setError(null);
        try {
            await apiClient.patch(`/orders/status/${orderId}`, { status });
            setOrders((orders: any[]) => orders.map(o => o._id === orderId ? { ...o, orderStatus: status } : o));
        } catch {
            setError('Failed to update status');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    // Filtering and searching
    const filteredOrders = orders.filter((order: any) => {
        const matchesStatus = statusFilter ? order.orderStatus === statusFilter : true;
        const matchesSearch = search
            ? order._id.toLowerCase().includes(search.toLowerCase()) ||
            (order.user?.email || order.user || '').toLowerCase().includes(search.toLowerCase())
            : true;
        let matchesDate = true;
        if (fromDate) {
            // const orderDate = order.createdAt ? new Date(order.createdAt) : undefined;
            // matchesDate = orderDate ? !isBefore(orderDate, fromDate) : true;
        }
        if (toDate) {
            // const orderDate = order.createdAt ? new Date(order.createdAt) : undefined;
            // matchesDate = matchesDate && orderDate ? !isAfter(orderDate, toDate) : matchesDate;
        }
        return matchesStatus && matchesSearch && matchesDate;
    });

    return (
        <div className="max-w-5xl mx-auto p-4">
            {lowStock.length > 0 && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-3 mb-4 rounded">
                    <b>Low Stock Alert:</b> The following products are low in stock:
                    <ul className="list-disc pl-6">
                        {lowStock.map((prod: any) => (
                            <li key={prod._id}>
                                {prod.title} <span className="text-xs">(Qty: {prod.quantity})</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-2 gap-2">
                <h1 className="text-2xl font-bold">Admin Order Management</h1>
                <Button onClick={() => exportOrdersToCSV(filteredOrders)} variant="outline" className="w-fit">Export CSV</Button>
            </div>
            {analytics && (
                <div className="flex flex-col gap-6 mb-6">
                    <div className="flex gap-8">
                        <div className="bg-blue-100 text-blue-900 rounded p-4 flex-1">
                            <div className="text-lg font-semibold">Total Orders</div>
                            <div className="text-2xl font-bold">{analytics.totalOrders}</div>
                        </div>
                        <div className="bg-green-100 text-green-900 rounded p-4 flex-1">
                            <div className="text-lg font-semibold">Total Sales</div>
                            <div className="text-2xl font-bold">KES {analytics.totalSales?.toLocaleString?.() || analytics.totalSales}</div>
                        </div>
                        <div className="bg-purple-100 text-purple-900 rounded p-4 flex-1">
                            <div className="text-lg font-semibold">Total Users</div>
                            <div className="text-2xl font-bold">{analytics.totalUsers}</div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sales per Month Chart */}
                        <div className="bg-white rounded shadow p-4 flex-1 min-w-[300px]">
                            <div className="font-semibold mb-2">Sales per Month</div>
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={analytics.salesPerMonth || []} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="_id" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip formatter={(value: any) => `KES ${value.toLocaleString()}`} />
                                    <Bar dataKey="total" fill="#3b82f6" name="Sales" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Top Products */}
                        <div className="bg-white rounded shadow p-4 flex-1 min-w-[220px]">
                            <div className="font-semibold mb-2">Top Products</div>
                            <ol className="list-decimal pl-5">
                                {(analytics.topProducts || []).map((prod: any, idx: number) => (
                                    <li key={prod._id || idx} className="mb-1">
                                        <span className="font-medium">{prod.name || prod._id}</span> — {prod.quantity} sold (KES {prod.totalSales?.toLocaleString?.() || prod.totalSales})
                                    </li>
                                ))}
                                {(!analytics.topProducts || analytics.topProducts.length === 0) && <li>No data</li>}
                            </ol>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 mb-4 items-end">
                <input
                    type="text"
                    placeholder="Search by Order ID or User Email"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="border rounded px-3 py-2 flex-1"
                />
                <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="border rounded px-3 py-2 w-48"
                >
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                <div className="flex flex-col gap-1">
                    <label className="text-xs">From</label>
                    <input
                        type="date"
                        // value={fromDate ? format(fromDate, 'yyyy-MM-dd') : ''}
                        onChange={e => setFromDate(e.target.value ? new Date(e.target.value) : undefined)}
                        className="border rounded px-2 py-1"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs">To</label>
                    <input
                        type="date"
                        // value={toDate ? format(toDate, 'yyyy-MM-dd') : ''}
                        onChange={e => setToDate(e.target.value ? new Date(e.target.value) : undefined)}
                        className="border rounded px-2 py-1"
                    />
                </div>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>User</th>
                        <th>Status</th>
                        <th>Actions</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order: any) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user?.email || order.user}</td>
                            <td>{order.orderStatus}</td>
                            <td>
                                {["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"].map(status => (
                                    <Button key={status} size="sm" variant="outline" onClick={() => updateStatus(order._id, status)} disabled={order.orderStatus === status}>
                                        {status}
                                    </Button>
                                ))}
                            </td>
                            <td>
                                <Button size="sm" variant="secondary" onClick={() => setSelectedOrder(order)}>
                                    View
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative overflow-y-auto max-h-[90vh]">
                        <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={() => setSelectedOrder(null)}>&times;</button>
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-xl font-bold">Order Details</h2>
                            <a
                                href={`${import.meta.env.VITE_API_BASE_URL || ''}/orders/invoice/${selectedOrder._id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                            >
                                Download Invoice
                            </a>
                        </div>
                        <div className="mb-2"><b>Order ID:</b> {selectedOrder._id}</div>
                        <div className="mb-2"><b>User:</b> {selectedOrder.user?.email || selectedOrder.user}</div>
                        <div className="mb-2"><b>Status:</b> {selectedOrder.orderStatus}</div>
                        <div className="mb-2"><b>Total:</b> KES {selectedOrder.totalAmount?.toLocaleString?.() || selectedOrder.totalAmount}</div>
                        <div className="mb-2"><b>Shipping Address:</b> {selectedOrder.shippingAddress?.address || ''} {selectedOrder.shippingAddress?.city || ''} {selectedOrder.shippingAddress?.country || ''}</div>
                        <div className="mb-2"><b>Customer Email:</b> {selectedOrder.shippingAddress?.email}</div>
                        <div className="mb-2"><b>Customer Phone:</b> {selectedOrder.shippingAddress?.phone}</div>
                        <div className="mb-2"><b>Items:</b></div>
                        <ul className="list-disc pl-6 mb-2">
                            {(selectedOrder.items || selectedOrder.cartItem || []).map((item: any, idx: number) => (
                                <li key={idx}>
                                    {item.quantity} x {item.product?.name || item.productId || item.product} @ KES {item.price || item.unitPrice || '-'}
                                </li>
                            ))}
                        </ul>

                        {/* Admin Notes Section */}
                        <div className="mb-4">
                            <div className="font-semibold mb-1">Admin Notes</div>
                            <ul className="border rounded p-2 bg-gray-50 max-h-32 overflow-y-auto text-sm mb-2">
                                {(selectedOrder.notes || []).map((note: any, idx: number) => (
                                    <li key={note.createdAt || idx} className="mb-1">
                                        <span className="font-medium">{note.author?.name || note.author?.email || 'Admin'}:</span> {note.content} <span className="text-gray-500">{note.createdAt ? new Date(note.createdAt).toLocaleString() : ''}</span>
                                    </li>
                                ))}
                                {(!selectedOrder.notes || selectedOrder.notes.length === 0) && <li>No notes yet.</li>}
                            </ul>
                            <form
                                onSubmit={async e => {
                                    e.preventDefault();
                                    const form = e.target as HTMLFormElement;
                                    const content = (form.elements.namedItem('note') as HTMLInputElement).value;
                                    if (!content) return;
                                    try {
                                        await apiClient.post(`/orders/note/${selectedOrder._id}`, { content });
                                        setSelectedOrder((prev: any) => ({
                                            ...prev,
                                            notes: [...(prev.notes || []), { author: { name: 'You' }, content, createdAt: new Date() }]
                                        }));
                                        form.reset();
                                    } catch {
                                        alert('Failed to add note');
                                    }
                                }}
                                className="flex gap-2"
                            >
                                <input name="note" type="text" placeholder="Add note..." className="border rounded px-2 py-1 flex-1" />
                                <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Add</button>
                            </form>
                        </div>

                        {/* Timeline/Activity Log */}
                        {(selectedOrder.timeline || selectedOrder.activityLog) && (
                            <div className="mt-4">
                                <div className="font-semibold mb-1">Order Timeline / Activity Log</div>
                                <ul className="border rounded p-2 bg-gray-50 max-h-40 overflow-y-auto text-sm">
                                    {(selectedOrder.timeline || []).map((entry: any, idx: number) => (
                                        <li key={entry.changedAt || idx} className="mb-1">
                                            <span className="font-medium">{entry.status}</span> — {entry.note ? entry.note + ' — ' : ''}<span className="text-gray-500">{entry.changedAt ? new Date(entry.changedAt).toLocaleString() : ''}</span>
                                        </li>
                                    ))}
                                    {(selectedOrder.activityLog || []).map((log: any, idx: number) => (
                                        <li key={log.createdAt || idx} className="mb-1">
                                            <span className="font-medium">{log.action}</span>: {log.message} <span className="text-gray-500">{log.createdAt ? new Date(log.createdAt).toLocaleString() : ''}</span>
                                        </li>
                                    ))}
                                    {(!selectedOrder.timeline?.length && !selectedOrder.activityLog?.length) && <li>No activity yet.</li>}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrderManagement;
