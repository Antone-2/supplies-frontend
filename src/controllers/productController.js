const Product = require('../models/Product');

// GET /api/products - List all products, with optional query/filter
exports.getProducts = async (req, res) => {
    try {
        // Optionally support filtering, pagination and sorting from query params
        const { search, category, minPrice, maxPrice, page = 1, limit = 20 } = req.query;
        const query = {};

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        if (category) {
            query.category = category;
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const products = await Product.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: 'Server error fetching products' });
    }
};

// GET /api/products/:id - Get product details by ID
exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: 'Server error fetching product' });
    }
};

// POST /api/products - Create a new product (admin only)
exports.createProduct = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const { name, description, price, category, imageUrl, stock } = req.body;

        const product = new Product({
            name,
            description,
            price,
            category,
            imageUrl,
            stock,
            createdAt: new Date(),
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: 'Server error creating product' });
    }
};

// PUT /api/products/:id - Update product (admin only)
exports.updateProduct = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const productId = req.params.id;
        const updates = req.body;

        const product = await Product.findByIdAndUpdate(productId, updates, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.json(product);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: 'Server error updating product' });
    }
};

// DELETE /api/products/:id - Delete product (admin only)
exports.deleteProduct = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const productId = req.params.id;
        const product = await Product.findByIdAndDelete(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: 'Server error deleting product' });
    }
};