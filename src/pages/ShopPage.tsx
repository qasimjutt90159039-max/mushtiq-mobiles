import React, { useState, useEffect, useMemo } from 'react';
import { Filter, X, SlidersHorizontal, ArrowUpDown, Grid, List, Check, RotateCcw, Search } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { initialCategories, initialBrands } from '../data/seedData';
import { Product } from '../types';
import { formatPKR } from '../config/siteConfig';

interface ShopPageProps {
  initialQuery?: string;
  initialCategory?: string;
  onNavigate: (page: string, param?: string) => void;
  onQuickView: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ initialQuery, initialCategory, onNavigate, onQuickView }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [selectedPtaStatus, setSelectedPtaStatus] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 600000]);
  const [selectedRam, setSelectedRam] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Parse initial query params (e.g. category=smartphones or search=iphone)
  useEffect(() => {
    if (initialQuery) {
      const params = new URLSearchParams(initialQuery);
      if (params.get('category')) setSelectedCategory(params.get('category')!);
      if (params.get('brand')) setSelectedBrand(params.get('brand')!);
      if (params.get('search')) setSearchWord(params.get('search')!);
      if (params.get('minPrice')) {
        const min = Number(params.get('minPrice'));
        const max = params.get('maxPrice') ? Number(params.get('maxPrice')) : 600000;
        setPriceRange([min, max]);
      }
    }
  }, [initialQuery]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (selectedCategory !== 'all') queryParams.append('category', selectedCategory);
        if (selectedBrand !== 'all') queryParams.append('brand', selectedBrand);
        if (selectedCondition !== 'all') queryParams.append('condition', selectedCondition);
        if (selectedPtaStatus !== 'all') queryParams.append('ptaStatus', selectedPtaStatus);
        if (searchWord.trim()) queryParams.append('search', searchWord.trim());
        if (priceRange[0] > 0) queryParams.append('minPrice', String(priceRange[0]));
        if (priceRange[1] < 600000) queryParams.append('maxPrice', String(priceRange[1]));
        if (sortBy) queryParams.append('sort', sortBy);

        const res = await fetch(`/api/products?${queryParams.toString()}`);
        const data = await res.json();
        if (data.success && data.products) {
          let list: Product[] = data.products;
          if (inStockOnly) {
            list = list.filter(p => p.inStock);
          }
          if (selectedRam !== 'all') {
            list = list.filter(p => p.specs?.ram?.includes(selectedRam));
          }
          setProducts(list);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedBrand, selectedCondition, selectedPtaStatus, searchWord, priceRange, sortBy, inStockOnly, selectedRam]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedCondition('all');
    setSelectedPtaStatus('all');
    setPriceRange([0, 600000]);
    setSelectedRam('all');
    setInStockOnly(false);
    setSearchWord('');
    setSortBy('featured');
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (selectedBrand !== 'all') count++;
    if (selectedCondition !== 'all') count++;
    if (selectedPtaStatus !== 'all') count++;
    if (priceRange[0] > 0 || priceRange[1] < 600000) count++;
    if (selectedRam !== 'all') count++;
    if (inStockOnly) count++;
    if (searchWord.trim()) count++;
    return count;
  }, [selectedCategory, selectedBrand, selectedCondition, selectedPtaStatus, priceRange, selectedRam, inStockOnly, searchWord]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/* Breadcrumb & Title */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-sage-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:text-graphite cursor-pointer">
            Home
          </button>
          <span>/</span>
          <span className="text-graphite font-semibold">Shop</span>
          {selectedCategory !== 'all' && (
            <>
              <span>/</span>
              <span className="text-accent font-semibold capitalize">{selectedCategory}</span>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-graphite tracking-tight">
              Mobiles & Accessories
            </h1>
            <p className="text-xs text-sage-500 mt-1">
              Showing {products.length} verified products available at Katchehry Chowk Multan
            </p>
          </div>

          {/* Mobile Filter Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex-1 py-2 px-4 rounded-xl border border-sage-200 bg-white text-graphite font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Filter className="w-4 h-4 text-accent" />
              <span>Filters ({activeFiltersCount})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* ================= DESKTOP FILTER SIDEBAR ================= */}
        <div className="hidden lg:block lg:col-span-1 space-y-6 bg-white p-5 rounded-2xl border border-sage-200 h-fit sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-sage-200">
            <div className="flex items-center gap-2 font-heading font-bold text-sm text-graphite">
              <SlidersHorizontal className="w-4 h-4 text-accent" />
              <span>Filter Products</span>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-accent hover:underline flex items-center gap-1 cursor-pointer font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Search within shop */}
          <div>
            <label className="text-xs font-bold text-graphite block mb-1.5">Keywords</label>
            <div className="relative">
              <input
                type="text"
                value={searchWord}
                onChange={e => setSearchWord(e.target.value)}
                placeholder="Model, chip, storage..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-sage-50 border border-sage-200 text-xs focus:border-accent"
              />
              <Search className="w-3.5 h-3.5 text-sage-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="text-xs font-bold text-graphite block mb-2 uppercase tracking-wider">
              Category
            </label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                  selectedCategory === 'all' ? 'bg-graphite text-white font-bold' : 'text-sage-700 hover:bg-sage-100'
                }`}
              >
                <span>All Categories</span>
              </button>
              {initialCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === cat.slug ? 'bg-graphite text-white font-bold' : 'text-sage-700 hover:bg-sage-100'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className={`text-[10px] ${selectedCategory === cat.slug ? 'text-sage-300' : 'text-sage-400'}`}>
                    {cat.productCount ?? cat.itemCount}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div>
            <label className="text-xs font-bold text-graphite block mb-2 uppercase tracking-wider">
              Brand
            </label>
            <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedBrand('all')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                  selectedBrand === 'all' ? 'bg-graphite text-white font-bold' : 'text-sage-700 hover:bg-sage-100'
                }`}
              >
                <span>All Brands</span>
              </button>
              {initialBrands.map(b => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBrand(b.name)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedBrand.toLowerCase() === b.name.toLowerCase() ? 'bg-graphite text-white font-bold' : 'text-sage-700 hover:bg-sage-100'
                  }`}
                >
                  <span>{b.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-graphite uppercase tracking-wider">
                Max Price
              </label>
              <span className="text-xs font-bold font-mono text-accent">
                {formatPKR(priceRange[1])}
              </span>
            </div>
            <input
              type="range"
              min={1000}
              max={600000}
              step={5000}
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full accent-accent cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-sage-400 mt-1">
              <span>Rs. 1,000</span>
              <span>Rs. 600,000</span>
            </div>
          </div>

          {/* Condition */}
          <div>
            <label className="text-xs font-bold text-graphite block mb-2 uppercase tracking-wider">
              Condition
            </label>
            <div className="grid grid-cols-3 gap-1 bg-sage-100 p-1 rounded-xl text-xs">
              {['all', 'New', 'Used'].map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCondition(c)}
                  className={`py-1.5 rounded-lg font-semibold text-center transition-all ${
                    selectedCondition === c ? 'bg-white text-graphite shadow-xs' : 'text-sage-600 hover:text-graphite'
                  }`}
                >
                  {c === 'all' ? 'All' : c}
                </button>
              ))}
            </div>
          </div>

          {/* PTA Status */}
          <div>
            <label className="text-xs font-bold text-graphite block mb-2 uppercase tracking-wider">
              PTA Status
            </label>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'all', label: 'All Devices' },
                { id: 'PTA Approved', label: 'PTA Approved (Official Tax Paid)' },
                { id: 'Non-PTA', label: 'Non-PTA / JV / Factory' }
              ].map(opt => (
                <label key={opt.id} className="flex items-center gap-2 cursor-pointer text-sage-700 hover:text-graphite">
                  <input
                    type="radio"
                    name="ptaStatus"
                    checked={selectedPtaStatus === opt.id}
                    onChange={() => setSelectedPtaStatus(opt.id)}
                    className="accent-accent"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* RAM Filter */}
          <div>
            <label className="text-xs font-bold text-graphite block mb-2 uppercase tracking-wider">
              RAM Capacity
            </label>
            <div className="flex flex-wrap gap-1.5">
              {['all', '4GB', '6GB', '8GB', '12GB', '16GB'].map(r => (
                <button
                  key={r}
                  onClick={() => setSelectedRam(r)}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-semibold cursor-pointer ${
                    selectedRam === r ? 'border-accent bg-orange-50 text-accent' : 'border-sage-200 text-sage-600 hover:border-sage-300'
                  }`}
                >
                  {r === 'all' ? 'Any RAM' : r}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock toggle */}
          <div className="pt-2 border-t border-sage-200">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-graphite">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={e => setInStockOnly(e.target.checked)}
                className="accent-accent w-4 h-4 rounded"
              />
              <span>In Stock at Multan Shop Only</span>
            </label>
          </div>
        </div>

        {/* ================= PRODUCTS MAIN AREA ================= */}
        <div className="lg:col-span-3 space-y-5">
          {/* Top Filter Bar: Sort, View mode, Active tags */}
          <div className="bg-white p-4 rounded-2xl border border-sage-200 flex flex-wrap items-center justify-between gap-4">
            {/* Active Filter Chips */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sage-100 text-graphite text-xs font-medium">
                  <span>Cat: {selectedCategory}</span>
                  <button onClick={() => setSelectedCategory('all')} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedBrand !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sage-100 text-graphite text-xs font-medium">
                  <span>Brand: {selectedBrand}</span>
                  <button onClick={() => setSelectedBrand('all')} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCondition !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sage-100 text-graphite text-xs font-medium">
                  <span>{selectedCondition}</span>
                  <button onClick={() => setSelectedCondition('all')} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedPtaStatus !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sage-100 text-graphite text-xs font-medium">
                  <span>{selectedPtaStatus}</span>
                  <button onClick={() => setSelectedPtaStatus('all')} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchWord.trim() && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sage-100 text-graphite text-xs font-medium">
                  <span>"{searchWord}"</span>
                  <button onClick={() => setSearchWord('')} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-semibold text-accent hover:underline cursor-pointer ml-1"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Sort Dropdown & Layout Toggles */}
            <div className="flex items-center gap-3 ml-auto">
              <div className="flex items-center gap-1.5 text-xs text-sage-600">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="bg-sage-50 border border-sage-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-graphite focus:outline-none focus:border-accent"
                >
                  <option value="featured">Featured / Best Sellers</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>

              {/* View toggle */}
              <div className="hidden sm:flex items-center bg-sage-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-white text-graphite shadow-xs' : 'text-sage-500 hover:text-graphite'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'list' ? 'bg-white text-graphite shadow-xs' : 'text-sage-500 hover:text-graphite'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Loading or Product List */}
          {loading ? (
            <div className="py-24 text-center space-y-3">
              <div className="w-10 h-10 border-4 border-sage-200 border-t-accent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-sage-500 font-medium">Filtering mobile models...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-sage-200 space-y-3">
              <h3 className="font-heading font-bold text-lg text-graphite">No products found</h3>
              <p className="text-xs text-sage-500 max-w-sm mx-auto">
                No mobile devices or accessories matched your current filter criteria. Try expanding your price limit or clearing active filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 px-5 py-2.5 rounded-xl bg-graphite text-white text-xs font-semibold hover:bg-accent transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onNavigate={onNavigate}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {products.map(product => (
                <div
                  key={product.id}
                  onClick={() => onNavigate('product-detail', product.slug)}
                  className="bg-white p-4 rounded-2xl border border-sage-200 hover:border-accent hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-4 cursor-pointer"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-24 h-24 object-contain rounded-xl bg-sage-50 p-2 shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                      {product.brand} • {product.ptaStatus}
                    </span>
                    <h3 className="font-heading font-bold text-sm text-graphite mt-0.5 truncate">
                      {product.title}
                    </h3>
                    <p className="text-xs text-sage-500 line-clamp-2 mt-1">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start text-xs">
                      <span className="font-mono font-bold text-graphite text-base">
                        {formatPKR(product.basePrice)}
                      </span>
                      {product.originalPrice && (
                        <span className="line-through text-sage-400 font-mono text-xs">
                          {formatPKR(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex sm:flex-col gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                      className="px-4 py-2 rounded-xl border border-sage-200 bg-white text-xs font-bold text-graphite hover:bg-sage-100"
                    >
                      Quick View
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('product-detail', product.slug);
                      }}
                      className="px-4 py-2 rounded-xl bg-graphite text-white text-xs font-bold hover:bg-accent transition-colors"
                    >
                      View Specs
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= MOBILE FILTER DRAWER ================= */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div className="absolute inset-0 bg-graphite/60 backdrop-blur-xs" onClick={() => setMobileFilterOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col p-5 overflow-y-auto space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-sage-200">
                <h3 className="font-heading font-bold text-base text-graphite">Filters</h3>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1 rounded-lg text-sage-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile categories */}
              <div>
                <label className="text-xs font-bold text-graphite block mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full p-2 rounded-xl bg-sage-50 border border-sage-200 text-xs"
                >
                  <option value="all">All Categories</option>
                  {initialCategories.map(c => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Mobile brands */}
              <div>
                <label className="text-xs font-bold text-graphite block mb-2">Brand</label>
                <select
                  value={selectedBrand}
                  onChange={e => setSelectedBrand(e.target.value)}
                  className="w-full p-2 rounded-xl bg-sage-50 border border-sage-200 text-xs"
                >
                  <option value="all">All Brands</option>
                  {initialBrands.map(b => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>

              {/* Mobile condition */}
              <div>
                <label className="text-xs font-bold text-graphite block mb-2">Condition</label>
                <div className="grid grid-cols-3 gap-1 bg-sage-100 p-1 rounded-xl text-xs">
                  {['all', 'New', 'Used'].map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedCondition(c)}
                      className={`py-1.5 rounded-lg font-semibold text-center ${
                        selectedCondition === c ? 'bg-white text-graphite shadow-xs' : 'text-sage-600'
                      }`}
                    >
                      {c === 'all' ? 'All' : c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-sage-200 flex gap-2">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-2.5 rounded-xl border border-sage-200 text-xs font-bold text-graphite"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-graphite text-white text-xs font-bold"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
