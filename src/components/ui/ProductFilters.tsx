import React from 'react';

interface ProductFiltersProps {
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
    selectedCategories: string[];
    setSelectedCategories: (cats: string[]) => void;
    availableCategories: string[];
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
    priceRange,
    setPriceRange,
    selectedCategories,
    setSelectedCategories,
    availableCategories
}) => {
    // Placeholder UI for now
    return (
        <div>
            <div>Price Range: {priceRange[0]} - {priceRange[1]}</div>
            <div>Categories: {selectedCategories.join(', ')}</div>
            <div>Available: {availableCategories.join(', ')}</div>
        </div>
    );
};
