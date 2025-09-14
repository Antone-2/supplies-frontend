import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LuSearch, LuX, LuSlidersHorizontal } from 'react-icons/lu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  "Diagnostic Equipment",
  "Surgical Instruments",
  "Patient Care",
  "Safety & PPE",
  "Pharmaceuticals",
  "Medical Supplies"
];

const priceRanges = [
  { label: "Under KSh 1,000", value: "0-1000" },
  { label: "KSh 1,000 - 5,000", value: "1000-5000" },
  { label: "KSh 5,000 - 10,000", value: "5000-10000" },
  { label: "Above KSh 10,000", value: "10000+" }
];


interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  products?: any[]; // Pass all products for live search
}

const SearchFilter = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, products = [] }: SearchFilterProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  // Live search effect
  useEffect(() => {
    if (searchQuery.trim() && products.length > 0) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchQuery, products]);

  // Hide dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      // ...existing code...
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (!activeFilters.includes(category)) {
      setActiveFilters([...activeFilters, category]);
    }
  };

  const handlePriceRangeSelect = (range: string) => {
    setSelectedPriceRange(range);
    const priceLabel = priceRanges.find(p => p.value === range)?.label || '';
    if (priceLabel && !activeFilters.includes(priceLabel)) {
      setActiveFilters([...activeFilters, priceLabel]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
    if (categories.includes(filter)) {
      setSelectedCategory('');
    }
    if (priceRanges.some(p => p.label === filter)) {
      setSelectedPriceRange('');
    }
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSelectedCategory('');
    setSelectedPriceRange('');
    setSearchQuery('');
  };

  return (
    <div className="bg-white border-b border-border py-4">
      <div className="container mx-auto px-4">
        {/* Main search and filter bar */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          {/* Enhanced search input */}
          <div className="flex-1 relative">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <div className="relative" ref={inputRef}>
              <Input
                type="text"
                placeholder="Search for medical supplies, equipment, medications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-base border-2 border-border focus:border-primary rounded-lg"
                onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
                autoComplete="off"
              />
              {showDropdown && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                  {searchResults.map((product, idx) => (
                    <div
                      key={product.id || idx}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-primary/10 cursor-pointer"
                      onClick={() => {
                        setSearchQuery(product.name);
                        setShowDropdown(false);
                      }}
                    >
                      <img src={product.image} alt={product.name} className="h-8 w-8 object-cover rounded" />
                      <div>
                        <div className="font-medium text-sm">{product.name}</div>
                        <div className="text-xs text-muted-foreground">{product.brand}</div>
                      </div>
                    </div>
                  ))}
                  {searchResults.length === 0 && (
                    <div className="px-4 py-2 text-muted-foreground text-sm">No results found.</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Filter controls */}
          <div className="flex gap-2 flex-wrap lg:flex-nowrap">
            {/* Category filter */}
            <Select value={selectedCategory} onValueChange={handleCategorySelect}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price range filter */}
            <Select value={selectedPriceRange} onValueChange={handlePriceRangeSelect}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Advanced filters */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <LuSlidersHorizontal className="h-4 w-4" />
                  More Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Advanced Filters</h4>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Availability</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="All items" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in-stock">In Stock</SelectItem>
                          <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                          <SelectItem value="pre-order">Pre-order</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Brand</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="All brands" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3m">3M</SelectItem>
                          <SelectItem value="bd">BD</SelectItem>
                          <SelectItem value="johnson">Johnson & Johnson</SelectItem>
                          <SelectItem value="medtronic">Medtronic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Rating</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="All ratings" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 Stars</SelectItem>
                          <SelectItem value="4">4 Stars & Up</SelectItem>
                          <SelectItem value="3">3 Stars & Up</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Search button */}
            <Button className="bg-primary hover:bg-primary-light" onClick={() => setShowDropdown(true)}>
              <LuSearch className="h-4 w-4 lg:mr-2" />
              <span className="hidden lg:inline">Search</span>
            </Button>
          </div>
        </div>

        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {activeFilters.map((filter) => (
              <Badge
                key={filter}
                variant="secondary"
                className="gap-1 cursor-pointer hover:bg-secondary/80"
                onClick={() => removeFilter(filter)}
              >
                {filter}
                <LuX className="h-3 w-3" />
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;