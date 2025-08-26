
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  if (!user) {
    return <div>You are not logged in.</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const updateData: any = {
        name: form.name,
        email: form.email,
      };
      if (form.password) updateData.password = form.password;
      await updateUser(updateData);
      setSuccess('Profile updated successfully!');
      setEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      {success && <div className="mb-2 text-green-600">{success}</div>}
      {error && <div className="mb-2 text-red-600">{error}</div>}
      <div className="flex items-center mb-4">
        <div className="h-20 w-20 rounded-full border-2 border-indigo-500 flex items-center justify-center bg-gray-200 text-2xl font-bold">
          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
        </div>
        <button className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded" onClick={() => setEditing(e => !e)}>
          {editing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>
      {editing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Name" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Email" />
          </div>
          <div>
            <label className="block text-sm font-medium">Password (leave blank to keep unchanged)</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Password" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">Save Changes</button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
