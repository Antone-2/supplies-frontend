import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm: React.FC = () => {
    const [form, setForm] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        image: null as File | null,
    });
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setForm({ ...form, image: e.target.files[0] });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Assumes admin is logged in
        const data = new FormData();
        data.append('name', form.name);
        data.append('price', form.price);
        data.append('description', form.description);
        data.append('category', form.category);
        if (form.image) data.append('image', form.image);
        try {
            await axios.post(
                '/api/v1/products',
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setMessage('Product added successfully!');
        } catch (err: any) {
            setMessage(err.response?.data?.message || 'Error adding product');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input mb-2 w-full" required />
            <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="input mb-2 w-full" required />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input mb-2 w-full" required />
            <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="input mb-2 w-full" required />
            <input name="image" type="file" accept="image/*" onChange={handleFileChange} className="input mb-2 w-full" />
            <button type="submit" className="btn btn-primary w-full">Add Product</button>
            {message && <div className="mt-2 text-center">{message}</div>}
        </form>
    );
};

export default AddProductForm;
