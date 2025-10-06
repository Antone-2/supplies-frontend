export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  imageSrcSet?: string;
  inStock: boolean;
  isNew: boolean;
  discount: number;
  category: string;
  description: string;
  features: string[];
}

export const products: Product[] = [
  // Diagnostic Equipment
  {
    id: 100,
    name: "Sample Product",
    brand: "Brand A",
    price: 100,
    originalPrice: 120,
    rating: 4.5,
    reviews: 10,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop"
    ],
    imageSrcSet: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=150&fit=crop 200w, https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop 400w, https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop 800w",
    inStock: true,
    isNew: true,
    discount: 20,
    category: "Diagnostics",
    description: "A sample diagnostic product.",
    features: ["Feature 1", "Feature 2"]
  },
  // ...existing products...
  {
    id: 1,
    name: "Digital Blood Pressure Monitor",
    brand: "Omron",
    price: 8500,
    originalPrice: 10000,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop"
    ],
    inStock: true,
    isNew: false,
    discount: 15,
    category: "Diagnostic Equipment",
    description: "Accurate digital blood pressure monitor with large display and memory function",
    features: ["Large LCD display", "Memory for 60 readings", "Irregular heartbeat detection", "Auto shut-off"]
  },
  {
    id: 2,
    name: "Infrared Thermometer",
    brand: "Beurer",
    price: 3200,
    originalPrice: 3200,
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    ],
    inStock: true,
    isNew: true,
    discount: 0,
    category: "Diagnostic Equipment",
    description: "Non-contact infrared thermometer for accurate temperature measurement",
    features: ["Non-contact measurement", "1-second reading", "Fever alarm", "Memory function"]
  },
  {
    id: 3,
    name: "Pulse Oximeter",
    brand: "ChoiceMMed",
    price: 2800,
    originalPrice: 3500,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop"
    ],
    inStock: true,
    isNew: false,
    discount: 20,
    category: "Diagnostic Equipment",
    description: "Fingertip pulse oximeter for measuring oxygen saturation and pulse rate",
    features: ["OLED display", "Low power consumption", "Automatic power off", "Lightweight design"]
  },
  {
    id: 4,
    name: "Stethoscope Classic III",
    brand: "3M Littmann",
    price: 15000,
    originalPrice: 15000,
    rating: 4.9,
    reviews: 342,
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    ],
    inStock: true,
    isNew: false,
    discount: 0,
    category: "Diagnostic Equipment",
    description: "Professional stethoscope with excellent acoustic performance",
    features: ["Dual-sided chestpiece", "Tunable diaphragm", "High acoustic sensitivity", "Anatomically designed headset"]
  },
  {
    id: 5,
    name: "Digital Weighing Scale",
    brand: "Tanita",
    price: 12000,
    originalPrice: 14000,
    rating: 4.6,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    ],
    inStock: true,
    isNew: false,
    discount: 14,
    category: "Diagnostic Equipment",
    description: "Professional digital weighing scale with BMI calculation",
    features: ["High precision", "BMI calculation", "Memory function", "Large platform"]
  },

  // Surgical Instruments
  {
    id: 6,
    name: "Surgical Forceps Set",
    brand: "Aesculap",
    price: 8500,
    originalPrice: 8500,
    rating: 4.8,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    ],
    inStock: true,
    isNew: true,
    discount: 0,
    category: "Surgical Instruments",
    description: "Professional surgical forceps set for medical procedures",
    features: ["Stainless steel construction", "Ergonomic design", "Autoclavable", "Non-slip grip"]
  },
  {
    id: 7,
    name: "Disposable Scalpel Blades",
    brand: "BD",
    price: 2500,
    originalPrice: 3000,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop"
    ],
    inStock: true,
    isNew: false,
    discount: 17,
    category: "Surgical Instruments",
    description: "High-quality disposable scalpel blades for surgical procedures",
    features: ["Sharp cutting edge", "Sterile packaging", "Various sizes", "Single-use design"]
  },
  {
    id: 8,
    name: "Surgical Scissors",
    brand: "Medtronic",
    price: 6500,
    originalPrice: 6500,
    rating: 4.9,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop"
    ],
    inStock: false,
    isNew: false,
    discount: 0,
    category: "Surgical Instruments",
    description: "Premium surgical scissors for precise cutting",
    features: ["Sharp blades", "Comfortable grip", "Autoclavable", "Rust resistant"]
  },

  // Patient Care
  {
    id: 9,
    name: "Hospital Bed Sheets Set",
    brand: "ComfortCare",
    price: 4500,
    originalPrice: 5000,
    rating: 4.5,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1586294149308-26d678996e1f?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586294149308-26d678996e1f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    ],
    inStock: true,
    isNew: false,
    discount: 10,
    category: "Patient Care",
    description: "Comfortable and hygienic hospital bed sheets",
    features: ["Antimicrobial fabric", "Easy to wash", "Wrinkle resistant", "Soft texture"]
  },
  {
    id: 10,
    name: "Patient Gowns",
    brand: "MedWear",
    price: 1200,
    originalPrice: 1500,
    rating: 4.4,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1586294149308-26d678996e1f?w=400&h=300&fit=crop"
    ],
    inStock: true,
    isNew: true,
    discount: 20,
    category: "Patient Care",
    description: "Comfortable disposable patient gowns",
    features: ["Disposable design", "Comfortable fit", "Easy to wear", "Hygienic material"]
  },

  // Safety & PPE
  {
    id: 11,
    name: "Nitrile Gloves",
    brand: "Medline",
    price: 1800,
    originalPrice: 2000,
    rating: 4.8,
    reviews: 245,
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    ],
    inStock: true,
    isNew: false,
    discount: 10,
    category: "Safety & PPE",
    description: "High-quality nitrile examination gloves",
    features: ["Powder-free", "Puncture resistant", "Chemical resistant", "100 pieces per box"]
  },
  {
    id: 12,
    name: "N95 Face Masks",
    brand: "3M",
    price: 3500,
    originalPrice: 4000,
    rating: 4.9,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&h=300&fit=crop"
    ],
    inStock: true,
    isNew: false,
    discount: 13,
    category: "Safety & PPE",
    description: "N95 respirator masks for healthcare workers",
    features: ["95% filtration efficiency", "Comfortable fit", "Adjustable straps", "CE certified"]
  },
  {
    id: 13,
    name: "Safety Goggles",
    brand: "Honeywell",
    price: 2200,
    originalPrice: 2200,
    rating: 4.6,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    ],
    inStock: true,
    isNew: true,
    discount: 0,
    category: "Safety & PPE",
    description: "Protective safety goggles for medical procedures",
    features: ["Anti-fog coating", "Adjustable strap", "Impact resistant", "Clear vision"]
  },

  // Pharmaceuticals
  {
    id: 14,
    name: "Paracetamol Tablets",
    brand: "GlaxoSmithKline",
    price: 250,
    originalPrice: 300,
    rating: 4.5,
    reviews: 123,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop"
    ],
    inStock: true,
    isNew: false,
    discount: 17,
    category: "Pharmaceuticals",
    description: "Pain relief and fever reducer tablets",
    features: ["500mg tablets", "100 tablets per pack", "Pain relief", "Fever reducer"]
  },
  {
    id: 15,
    name: "Antiseptic Solution",
    brand: "Dettol",
    price: 450,
    originalPrice: 450,
    rating: 4.7,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&h=300&fit=crop"
    ],
    inStock: true,
    isNew: false,
    discount: 0,
    category: "Pharmaceuticals",
    description: "Antiseptic solution for wound cleaning",
    features: ["Antiseptic properties", "250ml bottle", "Multi-purpose", "Trusted brand"]
  },

  // Medical Supplies
  {
    id: 16,
    name: "Elastic Bandages",
    brand: "Johnson & Johnson",
    price: 350,
    originalPrice: 400,
    rating: 4.6,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1586294149308-26d678996e1f?w=400&h=300&fit=crop"
    ],
    inStock: true,
    isNew: false,
    discount: 13,
    category: "Medical Supplies",
    description: "Elastic bandages for wound care and support",
    features: ["Stretchable material", "Self-adhesive", "Various sizes", "Reusable"]
  },
  {
    id: 17,
    name: "Gauze Pads",
    brand: "Medline",
    price: 180,
    originalPrice: 200,
    rating: 4.4,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop"
    ],
    inStock: true,
    isNew: true,
    discount: 10,
    category: "Medical Supplies",
    description: "Sterile gauze pads for wound dressing",
    features: ["Sterile packaging", "Absorbent material", "Multiple sizes", "50 pieces per pack"]
  },
  {
    id: 18,
    name: "First Aid Kit",
    brand: "RedCross",
    price: 2800,
    originalPrice: 3200,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1586294149308-26d678996e1f?w=400&h=300&fit=crop"
    ],
    inStock: true,
    isNew: false,
    discount: 13,
    category: "Medical Supplies",
    description: "Complete first aid kit for emergency care",
    features: ["Complete kit", "Portable case", "Emergency supplies", "User manual included"]
  }
];

export const categories = [
  {
    name: "Diagnostic Equipment",
    count: products.filter(p => p.category === "Diagnostic Equipment").length,
    description: "Stethoscopes, BP monitors, thermometers"
  },
  {
    name: "Surgical Instruments",
    count: products.filter(p => p.category === "Surgical Instruments").length,
    description: "Syringes, scalpels, surgical tools"
  },
  {
    name: "Patient Care",
    count: products.filter(p => p.category === "Patient Care").length,
    description: "Bed sheets, gowns, comfort items"
  },
  {
    name: "Safety & PPE",
    count: products.filter(p => p.category === "Safety & PPE").length,
    description: "Gloves, masks, protective equipment"
  },
  {
    name: "Pharmaceuticals",
    count: products.filter(p => p.category === "Pharmaceuticals").length,
    description: "Over-the-counter medications"
  },
  {
    name: "Medical Supplies",
    count: products.filter(p => p.category === "Medical Supplies").length,
    description: "Bandages, gauze, first aid"
  }
];

// Utility functions for filtering products
export const searchProducts = (query: string): Product[] => {
  if (!query.trim()) return products;

  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery)
  );
};

export const filterProductsByCategory = (category: string): Product[] => {
  if (!category) return products;
  return products.filter(product => product.category === category);
};

export const filterProductsByPriceRange = (priceRange: string): Product[] => {
  if (!priceRange) return products;

  const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
  const minPrice = parseInt(min);
  const maxPrice = max ? parseInt(max) : Infinity;

  return products.filter(product =>
    product.price >= minPrice && product.price <= maxPrice
  );
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.rating >= 4.7 || product.isNew).slice(0, 8);
};