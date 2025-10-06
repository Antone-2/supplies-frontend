import { useState } from 'react';

import { useState, useEffect } from 'react';

type Category = {
    _id: string;
    name: string;
    description?: string;
    [key: string]: any;
};

type CategoryForm = {
    name: string;
    description?: string;
};
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, FolderOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CategoriesManager = () => {
    // Simulate loading state for demonstration (replace with actual loading logic if needed)
    const [loading, setLoading] = useState(false);
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <LoadingSpinner size="lg" />
                    <p className="mt-4 text-medical-body">Loading categories...</p>
                </div>
            </div>
        );
    }
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editCategory, setEditCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState<CategoryForm>({ name: '', description: '' });
    const { toast } = useToast();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const response = await fetch(`${apiUrl}/categories`);
                if (!response.ok) throw new Error('Failed to fetch categories');
                const data = await response.json();
                setCategories(data.categories || data || []);
            } catch (error) {
                toast({ title: 'Error', description: 'Failed to load categories', variant: 'destructive' });
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleAddCategory = async (newCategory: CategoryForm) => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiUrl}/categories`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCategory)
            });
            if (!response.ok) throw new Error('Failed to add category');
            const data = await response.json();
            setCategories(prev => [...prev, data.category]);
            toast({ title: 'Category Added', description: 'Category successfully created.' });
            setShowAddModal(false);
            setFormData({ name: '', description: '' });
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to add category', variant: 'destructive' });
        }
    };

    const handleEditCategory = async (categoryId: string, updates: CategoryForm) => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiUrl}/categories/${categoryId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });
            if (!response.ok) throw new Error('Failed to update category');
            const data = await response.json();
            setCategories(prev => prev.map(c => c._id === categoryId ? data.category : c));
            toast({ title: 'Category Updated', description: 'Category successfully updated.' });
            setShowEditModal(false);
            setEditCategory(null);
            setFormData({ name: '', description: '' });
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to update category', variant: 'destructive' });
        }
    };

    const handleDeleteCategory = async (categoryId: string) => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiUrl}/categories/${categoryId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete category');
            setCategories(prev => prev.filter(c => c._id !== categoryId));
            toast({ title: 'Category Deleted', description: 'Category successfully deleted.', variant: 'destructive' });
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to delete category', variant: 'destructive' });
        }
    };

    if (loading) {
        return <div className="text-center py-12 text-lg text-muted-foreground">Loading categories...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                        <FolderOpen className="h-8 w-8" />
                        Categories Management
                    </h1>
                    <p className="text-muted-foreground">Manage your product categories</p>
                </div>
                <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Category
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Categories List</CardTitle>
                    <CardDescription>{categories.length} categories</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.map(category => (
                                    <TableRow key={category._id}>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>{category.description}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        setEditCategory(category);
                                                        setFormData({ name: category.name, description: category.description });
                                                        setShowEditModal(true);
                                                    }}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDeleteCategory(category._id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Add Category Modal */}
            <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Category</DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            handleAddCategory(formData);
                        }}
                        className="space-y-4"
                    >
                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                            required
                            className="w-full border rounded p-2"
                        />
                        <textarea
                            placeholder="Description"
                            value={formData.description}
                            onChange={e => setFormData(f => ({ ...f, description: e.target.value }))}
                            className="w-full border rounded p-2"
                        />
                        <div className="flex gap-2 justify-end">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Add Category</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Category Modal */}
            <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            if (editCategory) handleEditCategory(editCategory._id, formData);
                        }}
                        className="space-y-4"
                    >
                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                            required
                            className="w-full border rounded p-2"
                        />
                        <textarea
                            placeholder="Description"
                            value={formData.description}
                            onChange={e => setFormData(f => ({ ...f, description: e.target.value }))}
                            className="w-full border rounded p-2"
                        />
                        <div className="flex gap-2 justify-end">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save Changes</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CategoriesManager;
