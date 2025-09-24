import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
    Heart,
    Stethoscope,
    Pill,
    Truck,
    Baby,
    Eye,
    ChevronRight
} from 'lucide-react';

const Categories = () => {
    const categories = [
        {
            id: 1,
            name: 'Cardiology',
            icon: Heart,
            description: 'Heart monitoring and care equipment',
            color: 'bg-red-50 text-red-600',
            link: '/category/cardiology'
        },
        {
            id: 2,
            name: 'General Medicine',
            icon: Stethoscope,
            description: 'Essential medical instruments and tools',
            color: 'bg-blue-50 text-blue-600',
            link: '/category/general-medicine'
        },
        {
            id: 3,
            name: 'Pharmacy',
            icon: Pill,
            description: 'Medications and pharmaceutical supplies',
            color: 'bg-green-50 text-green-600',
            link: '/category/pharmacy'
        },
        {
            id: 4,
            name: 'Emergency',
            icon: Truck,
            description: 'Emergency response and first aid equipment',
            color: 'bg-orange-50 text-orange-600',
            link: '/category/emergency'
        },
        {
            id: 5,
            name: 'Pediatrics',
            icon: Baby,
            description: 'Specialized equipment for children',
            color: 'bg-purple-50 text-purple-600',
            link: '/category/pediatrics'
        },
        {
            id: 6,
            name: 'Ophthalmology',
            icon: Eye,
            description: 'Eye care and vision equipment',
            color: 'bg-indigo-50 text-indigo-600',
            link: '/category/ophthalmology'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Medical Categories
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Browse our comprehensive range of medical supplies organized by specialty
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <Card key={category.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className={`p-3 rounded-lg ${category.color}`}>
                                            <Icon className="h-8 w-8" />
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <CardTitle className="text-xl">{category.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 mb-4">{category.description}</p>
                                    <Link to={category.link}>
                                        <Button className="w-full">
                                            Explore {category.name}
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="mt-12 text-center">
                    <Link to="/shop">
                        <Button variant="outline" size="lg">
                            View All Products
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Categories;
