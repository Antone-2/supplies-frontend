import React, { useEffect, useState } from 'react';
import apiClient from '@/config/apiClient';
import { Button } from '@/components/ui/button';

const AdminProductManagement: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [subcategories, setSubcategories] = useState<any[]>([]);
    const [brands, setBrands] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<any>({ title: '', price: '', quantity: '', description: '', category: '', subcategory: '', brand: '' });
    const [editId, setEditId] = useState<string | null>(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await apiClient.get('/products');
            setProducts(res.data.getAllProducts || res.data.products || []);
        } catch {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await apiClient.get('/categories');
            setCategories(res.data.getAllCategories || res.data.categories || []);
        } catch {
            setCategories([]);
        }
    };
    const fetchSubcategories = async () => {
        try {
            const res = await apiClient.get('/subcategories');
            setSubcategories(res.data.getAllSubCategories || res.data.subcategories || []);
        } catch {
            setSubcategories([]);
        }
    };
    const fetchBrands = async () => {
        try {
            const res = await apiClient.get('/brands');
            setBrands(res.data.getAllBrands || res.data.brands || []);
        } catch {
            setBrands([]);
        }
    };
    useEffect(() => { fetchProducts(); fetchCategories(); fetchSubcategories(); fetchBrands(); }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete this product?')) return;
        setLoading(true);
        try {
            await apiClient.delete(`/products/${id}`);
            setProducts(products => products.filter(p => p._id !== id));
        } catch {
            setError('Failed to delete product');
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editId) {
                await apiClient.put(`/products/${editId}`, formData);
            } else {
                await apiClient.post('/products', formData);
            }
            setShowForm(false);
            setFormData({ title: '', price: '', quantity: '', description: '', category: '' });
            setEditId(null);
            fetchProducts();
        } catch {
            setError('Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product: any) => {
        setFormData({
            title: product.title,
            price: product.price,
            quantity: product.quantity,
            description: product.description,
            category: product.category?._id || product.category || '',
            subcategory: product.subcategory?._id || product.subcategory || '',
            brand: product.brand?._id || product.brand || ''
        });
        setEditId(product._id);
        setShowForm(true);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Product Management</h1>
            <Button onClick={() => { setShowForm(true); setEditId(null); setFormData({ title: '', price: '', quantity: '', description: '' }); }} className="mb-4">Add Product</Button>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            {loading && <div>Loading...</div>}
            <table className="w-full border mb-6">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Title</th>
                        <th className="p-2 border">Price</th>
                        <th className="p-2 border">Quantity</th>
                        <th className="p-2 border">Category</th>
                        <th className="p-2 border">Subcategory</th>
                        <th className="p-2 border">Brand</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td className="p-2 border">{product.title}</td>
                            <td className="p-2 border">KES {product.price}</td>
                            <td className="p-2 border">{product.quantity}</td>
                            <td className="p-2 border">{product.category?.name || product.category || ''}</td>
                            <td className="p-2 border">{product.subcategory?.name || product.subcategory || ''}</td>
                            <td className="p-2 border">{product.brand?.name || product.brand || ''}</td>
                            <td className="p-2 border">
                                <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>Edit</Button>
                                <Button size="sm" variant="destructive" onClick={() => handleDelete(product._id)} className="ml-2">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showForm && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
                        <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={() => setShowForm(false)}>&times;</button>
                        <h2 className="text-lg font-bold mb-2">{editId ? 'Edit' : 'Add'} Product</h2>
                        <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
                            <input required name="title" placeholder="Title" className="border rounded px-2 py-1" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            <input required name="price" type="number" placeholder="Price" className="border rounded px-2 py-1" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                            <input required name="quantity" type="number" placeholder="Quantity" className="border rounded px-2 py-1" value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: e.target.value })} />
                            <textarea required name="description" placeholder="Description" className="border rounded px-2 py-1" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            <select required name="category" className="border rounded px-2 py-1" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                <option value="">Select Category</option>
                                {categories.map((cat: any) => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                            <select required name="subcategory" className="border rounded px-2 py-1" value={formData.subcategory} onChange={e => setFormData({ ...formData, subcategory: e.target.value })}>
                                <option value="">Select Subcategory</option>
                                {subcategories
                                    .filter((sub: any) => sub.category === formData.category || sub.category?._id === formData.category)
                                    .map((sub: any) => (
                                        <option key={sub._id} value={sub._id}>{sub.name}</option>
                                    ))}
                            </select>
                            <select required name="brand" className="border rounded px-2 py-1" value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })}>
                                <option value="">Select Brand</option>
                                {brands.map((brand: any) => (
                                    <option key={brand._id} value={brand._id}>{brand.name}</option>
                                ))}
                            </select>
                            <Button type="submit">{editId ? 'Update' : 'Add'} Product</Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProductManagement;
