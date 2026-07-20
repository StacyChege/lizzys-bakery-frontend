import { useState, useEffect } from 'react';
import { fetchCategories } from '../../api/categories';
import { fetchProducts } from '../../api/products';
import type Category from '../../types/Category';
import type Product from '../../types/Product';
import useDebounce from '../../hooks/useDebounce';

export default function MenuPage() {
  // --- STATE ---
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
  // Filter & Search State
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // '' means "All Categories"
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearch = useDebounce(searchQuery, 400); // Waits 400ms after user stops typing

  // Loading & Error states
  const [isLoading, setIsLoading] = useState(true);          // Initial page load
  const [isFiltering, setIsFiltering] = useState(false);      // Loading filtered results
  const [error, setError] = useState('');

  // --- 1. INITIAL LOAD (Runs ONCE when page opens) ---
  useEffect(() => {
    async function loadInitialData() {
      try {
        const [categoriesData, productsData] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
        ]);
        setCategories(categoriesData);
        setProducts(productsData);
      } catch {
        setError('Could not load the menu. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    }

    loadInitialData();
  }, []);

  // --- 2. FILTERED FETCH (Runs whenever selectedCategory or debouncedSearch changes) ---
  useEffect(() => {
    // Skip this on the very first mount since loadInitialData already ran above
    if (isLoading) return;

    async function loadFilteredProducts() {
      setIsFiltering(true);
      try {
        // Send selectedCategory (or undefined if 'All') & debouncedSearch query to Django
        const filteredData = await fetchProducts(
          selectedCategory || undefined,
          debouncedSearch || undefined
        );
        setProducts(filteredData);
      } catch {
        setError('Failed to fetch filtered products.');
      } finally {
        setIsFiltering(false);
      }
    }

    loadFilteredProducts();
  }, [selectedCategory, debouncedSearch, isLoading]);

  // --- CONDITIONAL RENDERING (Initial Load) ---
  if (isLoading) {
    return (
      <div className="text-center py-20 font-body text-bakery-brown">
        Loading the menu…
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 font-body text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 font-body">
      {/* Page Header */}
      <h1 className="font-script text-4xl text-bakery-pink-dark mb-6 text-center sm:text-left">
        Our Menu
      </h1>

      {/* --- SEARCH BAR --- */}
      <div className="mb-6 max-w-md">
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-bakery-pink/30 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bakery-pink text-bakery-brown placeholder:text-bakery-brown/40"
        />
      </div>

      {/* --- CATEGORY FILTER PILLS --- */}
      <div className="flex flex-wrap gap-2 mb-8">
        {/* 'All' Category Pill */}
        <button
          onClick={() => setSelectedCategory('')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === ''
              ? 'bg-bakery-pink text-white'
              : 'bg-bakery-cream text-bakery-brown hover:bg-bakery-pink/20'
          }`}
        >
          All
        </button>

        {/* Dynamic Category Pills fetched from Django */}
        {categories.map((category) => {
          const isSelected = selectedCategory === category.name;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isSelected
                  ? 'bg-bakery-pink text-white'
                  : 'bg-bakery-cream text-bakery-brown hover:bg-bakery-pink/20'
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      {/* --- PRODUCTS GRID --- */}
      {isFiltering ? (
        <div className="text-center py-12 text-bakery-brown/60">
          Updating menu...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border border-bakery-pink/20 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="font-semibold text-bakery-brown">{product.name}</p>
                <p className="text-sm text-bakery-brown/60">{product.category}</p>
                <p className="text-bakery-pink-dark font-medium mt-2">
                  KES {Number(product.base_price).toLocaleString()}
                </p>
                {!product.is_available && (
                  <p className="text-red-500 text-xs font-semibold mt-1">Sold Out</p>
                )}
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <p className="text-center text-bakery-brown/60 mt-10">
              No products match your search or filter.
            </p>
          )}
        </>
      )}
    </div>
  );
}