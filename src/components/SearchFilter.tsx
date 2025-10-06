import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  X,
  SlidersHorizontal
} from 'lucide-react';
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

const SearchFilter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for medical supplies, equipment, medications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-base border-2 border-border focus:border-primary rounded-lg"
            />
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
                  <SlidersHorizontal className="h-4 w-4" />
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
            <Button className="bg-primary hover:bg-primary-light">
              <Search className="h-4 w-4 lg:mr-2" />
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
                <X className="h-3 w-3" />
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