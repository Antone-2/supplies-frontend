import React from 'react';

interface ProductFiltersProps {
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
    availableCategories: string[];
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
    priceRange,
    setPriceRange,
    selectedCategories,
    setSelectedCategories,
    availableCategories,
}) => {
    const handlePriceChange = (type: 'min' | 'max', value: number) => {
        const newRange: [number, number] = type === 'min'
            ? [value, priceRange[1]]
            : [priceRange[0], value];
        setPriceRange(newRange);
    };

    const handleCategoryChange = (category: string) => {
        const newCategories = selectedCategories.includes(category)
            ? selectedCategories.filter(c => c !== category)
            : [...selectedCategories, category];
        setSelectedCategories(newCategories);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>

            <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Price Range</h4>
                <div className="space-y-2">
                    <div>
                        <label className="text-xs text-gray-600">Min: KES {priceRange[0]}</label>
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={priceRange[0]}
                            onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-600">Max: KES {priceRange[1]}</label>
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={priceRange[1]}
                            onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Categories</h4>
                <div className="space-y-2">
                    {availableCategories.map(category => (
                        <label key={category} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                                className="mr-2"
                            />
                            <span className="text-sm">{category}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};
