import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Package, Search } from 'lucide-react';
import { products as staticProducts, Product } from '@/data/products';
import { useToast } from '@/hooks/use-toast';

const ProductsManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    // Fetch products from backend API
    const fetchProducts = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.products || data || []);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load products',
          variant: 'destructive',
        });
      }
    };
    fetchProducts();
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const { toast } = useToast();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(products.map(p => p.category)));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  };

  const getStatusBadge = (product: Product) => {
    if (!product.inStock) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    }
    if (product.isNew) {
      return <Badge variant="default" className="bg-success text-white">New</Badge>;
    }
    return <Badge variant="secondary">In Stock</Badge>;
  };

  // Add Product
  const handleAddProduct = async (newProduct: Partial<Product>) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      if (!response.ok) throw new Error('Failed to add product');
      const data = await response.json();
      setProducts(prev => [...prev, data.product]);
      toast({ title: 'Product Added', description: 'Product successfully created.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to add product', variant: 'destructive' });
    }
    setShowAddModal(false);
    setFormData({});
  };

  // Edit Product
  const handleEditProduct = async (productId: number, updates: Partial<Product>) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!response.ok) throw new Error('Failed to update product');
      const data = await response.json();
      setProducts(prev => prev.map(p => p.id === productId ? data.product : p));
      setShowEditModal(false);
      setEditProduct(null);
      setFormData({});
      toast({ title: 'Product Updated', description: 'Product successfully updated.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update product', variant: 'destructive' });
    }
  };

  // Delete Product
  const handleDeleteProduct = async (productId: number) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/products/${productId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete product');
      setProducts(prev => prev.filter(p => p.id !== productId));
      toast({ title: 'Product Deleted', description: 'Product successfully deleted.', variant: 'destructive' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete product', variant: 'destructive' });
    }
  };

  if (products.length === 0) {
    // Show spinner while loading products
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mt-4 text-medical-body">Loading products...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Package className="h-8 w-8" />
            Products Management
          </h1>
          <p className="text-muted-foreground">
            Manage your medical supplies inventory
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Stock</p>
                <p className="text-2xl font-bold text-success">
                  {products.filter(p => p.inStock).length}
                </p>
              </div>
              <Badge variant="secondary" className="bg-success/10 text-success">
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-bold text-destructive">
                  {products.filter(p => !p.inStock).length}
                </p>
              </div>
              <Badge variant="destructive">
                Alert
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">{categories.length}</p>
              </div>
              <Badge variant="outline">
                {categories.length} Types
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Products</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name or brand..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products List</CardTitle>
          <CardDescription>
            {filteredProducts.length} of {products.length} products
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {product.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{formatCurrency(product.price)}</p>
                        {product.originalPrice > product.price && (
                          <p className="text-xs text-muted-foreground line-through">
                            {formatCurrency(product.originalPrice)}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(product)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">
                          ({product.reviews} reviews)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditProduct(product);
                            setFormData(product);
                            setShowEditModal(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {/* Add Product Modal */}
                        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add New Product</DialogTitle>
                            </DialogHeader>
                            <form
                              onSubmit={e => {
                                e.preventDefault();
                                handleAddProduct(formData);
                              }}
                              className="space-y-4"
                            >
                              <input
                                type="text"
                                placeholder="Name"
                                value={formData.name || ''}
                                onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                                required
                                className="w-full border rounded p-2"
                              />
                              <input
                                type="text"
                                placeholder="Brand"
                                value={formData.brand || ''}
                                onChange={e => setFormData(f => ({ ...f, brand: e.target.value }))}
                                required
                                className="w-full border rounded p-2"
                              />
                              <input
                                type="text"
                                placeholder="Category"
                                value={formData.category || ''}
                                onChange={e => setFormData(f => ({ ...f, category: e.target.value }))}
                                required
                                className="w-full border rounded p-2"
                              />
                              <input
                                type="number"
                                placeholder="Price"
                                value={formData.price || ''}
                                onChange={e => setFormData(f => ({ ...f, price: Number(e.target.value) }))}
                                required
                                className="w-full border rounded p-2"
                              />
                              <input
                                type="number"
                                placeholder="Original Price"
                                value={formData.originalPrice || ''}
                                onChange={e => setFormData(f => ({ ...f, originalPrice: Number(e.target.value) }))}
                                className="w-full border rounded p-2"
                              />
                              <input
                                type="number"
                                placeholder="Discount (%)"
                                value={formData.discount || ''}
                                onChange={e => setFormData(f => ({ ...f, discount: Number(e.target.value) }))}
                                className="w-full border rounded p-2"
                              />
                              <input
                                type="text"
                                placeholder="Image URL"
                                value={formData.image || ''}
                                onChange={e => setFormData(f => ({ ...f, image: e.target.value }))}
                                className="w-full border rounded p-2"
                              />
                              <textarea
                                placeholder="Description"
                                value={formData.description || ''}
                                onChange={e => setFormData(f => ({ ...f, description: e.target.value }))}
                                className="w-full border rounded p-2"
                              />
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={formData.inStock || false}
                                  onChange={e => setFormData(f => ({ ...f, inStock: e.target.checked }))}
                                />
                                In Stock
                              </label>
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={formData.isNew || false}
                                  onChange={e => setFormData(f => ({ ...f, isNew: e.target.checked }))}
                                />
                                New Product
                              </label>
                              <div className="flex gap-2 justify-end">
                                <DialogClose asChild>
                                  <Button type="button" variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Add Product</Button>
                              </div>
                            </form>
                          </DialogContent>
                        </Dialog>

                        {/* Edit Product Modal */}
                        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Product</DialogTitle>
                            </DialogHeader>
                            <form
                              onSubmit={e => {
                                e.preventDefault();
                                if (editProduct) handleEditProduct(editProduct.id, formData);
                              }}
                              className="space-y-4"
                            >
                              <input
                                type="text"
                                placeholder="Name"
                                value={formData.name || ''}
                                onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                                required
                                className="w-full border rounded p-2"
                              />
                              <input
                                type="text"
                                placeholder="Brand"
                                value={formData.brand || ''}
                                onChange={e => setFormData(f => ({ ...f, brand: e.target.value }))}
                                required
                                className="w-full border rounded p-2"
                              />
                              <input
                                type="text"
                                placeholder="Category"
                                value={formData.category || ''}
                                onChange={e => setFormData(f => ({ ...f, category: e.target.value }))}
                                required
                                className="w-full border rounded p-2"
                              />
                              <input
                                type="number"
                                placeholder="Price"
                                value={formData.price || ''}
                                onChange={e => setFormData(f => ({ ...f, price: Number(e.target.value) }))}
                                required
                                className="w-full border rounded p-2"
                              />
                              <input
                                type="number"
                                placeholder="Original Price"
                                value={formData.originalPrice || ''}
                                onChange={e => setFormData(f => ({ ...f, originalPrice: Number(e.target.value) }))}
                                className="w-full border rounded p-2"
                              />
                              <input
                                type="number"
                                placeholder="Discount (%)"
                                value={formData.discount || ''}
                                onChange={e => setFormData(f => ({ ...f, discount: Number(e.target.value) }))}
                                className="w-full border rounded p-2"
                              />
                              <input
                                type="text"
                                placeholder="Image URL"
                                value={formData.image || ''}
                                onChange={e => setFormData(f => ({ ...f, image: e.target.value }))}
                                className="w-full border rounded p-2"
                              />
                              <textarea
                                placeholder="Description"
                                value={formData.description || ''}
                                onChange={e => setFormData(f => ({ ...f, description: e.target.value }))}
                                className="w-full border rounded p-2"
                              />
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={formData.inStock || false}
                                  onChange={e => setFormData(f => ({ ...f, inStock: e.target.checked }))}
                                />
                                In Stock
                              </label>
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={formData.isNew || false}
                                  onChange={e => setFormData(f => ({ ...f, isNew: e.target.checked }))}
                                />
                                New Product
                              </label>
                              <div className="flex gap-2 justify-end">
                                <DialogClose asChild>
                                  <Button type="button" variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save Changes</Button>
                              </div>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
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
    </div>
  );
};

export default ProductsManager;