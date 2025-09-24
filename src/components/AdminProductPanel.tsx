import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = '/api/admin/products';

const AdminProductPanel: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', price: '', descripton: '', quantity: '', imgCover: '' });
  const [loading, setLoading] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setProducts(res.data.data || []);
    } catch (err) {
      alert('Failed to load products');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await axios.put(`${API_BASE}/${editing._id}`, form);
      } else {
        await axios.post(API_BASE, form);
      }
      setForm({ title: '', price: '', descripton: '', quantity: '', imgCover: '' });
      setEditing(null);
      fetchProducts();
    } catch (err) {
      alert('Failed to save product');
    }
    setLoading(false);
  };

  // Edit product
  const handleEdit = (product: any) => {
    setEditing(product);
    setForm({
      title: product.title || '',
      price: product.price || '',
      descripton: product.descripton || '',
      quantity: product.quantity || '',
      imgCover: product.imgCover || '',
    });
  };

  // Delete product
  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this product?')) return;
    setLoading(true);
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchProducts();
    } catch (err) {
      alert('Failed to delete product');
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Product Management</h2>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 w-full" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="border p-2 w-full" required />
        <textarea name="descripton" value={form.descripton} onChange={handleChange} placeholder="Description" className="border p-2 w-full" required />
        <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" type="number" className="border p-2 w-full" required />
        <input name="imgCover" value={form.imgCover} onChange={handleChange} placeholder="Image URL" className="border p-2 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          {editing ? 'Update Product' : 'Add Product'}
        </button>
        {editing && <button type="button" className="ml-2 px-4 py-2" onClick={() => { setEditing(null); setForm({ title: '', price: '', descripton: '', quantity: '', imgCover: '' }); }}>Cancel</button>}
      </form>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th className="p-2">Price</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p: any) => (
            <tr key={p._id} className="border-t">
              <td className="p-2">{p.title}</td>
              <td className="p-2">{p.price}</td>
              <td className="p-2">{p.quantity}</td>
              <td className="p-2">
                <button className="text-blue-600 mr-2" onClick={() => handleEdit(p)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductPanel;
