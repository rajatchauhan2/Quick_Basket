import React, { useState, useRef } from 'react';
import { db } from '../../services/dbService';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { GroceryProductCard } from './GroceryProductCard';
import { PriceTrendPredictor } from './PriceTrendPredictor';
import { SmartRecipeSuggestions } from './SmartRecipeSuggestions';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBasket,
  Search,
  Sparkles,
  Check,
  Store,
  Clock,
  MapPin,
  Leaf,
  Layers,
  TrendingDown,
  TrendingUp,
  LineChart,
  ChevronDown,
  ChevronUp,
  ChefHat
} from 'lucide-react';

const GROCERY_CATEGORIES = [
  'All',
  'Staples',
  'Vegetables',
  'Fruits',
  'Dairy Alternatives',
  'Beverages',
  'Chocolates',
  'Household',
  'Snacks'
];

export const GroceryMarketplace: React.FC = () => {
  const { navigateTo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStoreId, setSelectedStoreId] = useState<string>('all');
  const [organicOnly, setOrganicOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Price trend prediction states
  const [selectedTrendProductId, setSelectedTrendProductId] = useState<string>('groc_12');
  const [isTrendSectionVisible, setIsTrendSectionVisible] = useState<boolean>(true);
  const [isTrendModalOpen, setIsTrendModalOpen] = useState<boolean>(false);
  const trendSectionRef = useRef<HTMLDivElement>(null);
  const recipeSectionRef = useRef<HTMLDivElement>(null);

  const allStores = db.getGroceryStores();
  const allProducts = db.getGroceryProducts();

  const handleOpenPriceTrend = (productId: string) => {
    setSelectedTrendProductId(productId);
    setIsTrendSectionVisible(true);
    // Smooth scroll to price trends section
    if (trendSectionRef.current) {
      trendSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter products
  const filteredProducts = allProducts.filter(p => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (selectedStoreId !== 'all' && p.storeId !== selectedStoreId) return false;
    if (organicOnly && !p.isOrganic) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchCategory) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      
      {/* Grocery Marketplace Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-10 mb-10 shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Farm Fresh &amp; Dark Store Fast Delivery</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            {BRAND_CONFIG.groceryHero}
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/80 mt-2 max-w-lg leading-relaxed">
            Handpicked organic greens, cold-pressed oils, plant milks &amp; daily pantry essentials straight from trusted local supermarkets.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-emerald-200">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" /> 15–20 Min Delivery
            </span>
            <span>·</span>
            <span>Zero Quality Compromise</span>
            <span>·</span>
            <span>Transparent Live Stock</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={() => {
                setIsTrendSectionVisible(true);
                if (trendSectionRef.current) {
                  trendSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition-all shadow-md active:scale-95"
            >
              <LineChart className="w-4 h-4 text-slate-950" />
              <span>Staple Price Forecast Engine · 30-Day Outlook</span>
            </button>
            <button
              onClick={() => {
                if (recipeSectionRef.current) {
                  recipeSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all active:scale-95"
            >
              <ChefHat className="w-4 h-4 text-emerald-300" />
              <span>Smart Recipe Suggestions</span>
            </button>
            <button
              onClick={() => setSelectedCategory('Staples')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-emerald-100 font-medium text-xs border border-white/10 transition-colors"
            >
              <span>Explore All Staples</span>
            </button>
          </div>
        </div>

        {/* Decorative graphic */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-25 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-400/50 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Staple Price Trends & Fluctuation Predictive Section */}
      <div ref={trendSectionRef} id="staple-price-trends" className="mb-12 scroll-mt-20">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <LineChart className="w-4 h-4 text-emerald-600" />
              <span>Kirana Mandi Price Intelligence &amp; Prediction</span>
            </h3>
            <p className="text-xs text-slate-500">
              Econometric price fluctuation models based on APMC wholesale mandi volumes, rainfall patterns, and festive demand
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTrendSectionVisible(!isTrendSectionVisible)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs"
            >
              <span>{isTrendSectionVisible ? 'Minimize Section' : 'Expand Prediction Suite'}</span>
              {isTrendSectionVisible ? (
                <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              )}
            </button>
          </div>
        </div>

        {isTrendSectionVisible && (
          <PriceTrendPredictor
            key={selectedTrendProductId}
            initialProductId={selectedTrendProductId}
          />
        )}
      </div>

      {/* Featured Grocery Stores Carousel */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Store className="w-4 h-4 text-emerald-600" />
              <span>Partner Supermarkets in Your Vicinity</span>
            </h3>
            <p className="text-xs text-slate-500">Pick products directly or browse by dedicated store</p>
          </div>
          <span className="text-xs font-semibold text-emerald-600">
            {allStores.length} stores active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allStores.map(store => (
            <div
              key={store.id}
              onClick={() => setSelectedStoreId(selectedStoreId === store.id ? 'all' : store.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                selectedStoreId === store.id
                  ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-500/20 shadow-xs'
                  : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <img
                src={store.image}
                alt={store.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{store.name}</h4>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    ★ {store.rating}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">{store.tagline}</p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1.5 font-medium">
                  <span className="flex items-center gap-0.5">
                    <Clock className="w-3 h-3 text-slate-400" /> {store.deliveryTimeMin}-{store.deliveryTimeMax}m
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" /> {store.area}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Recipe Suggestions Section */}
      <div ref={recipeSectionRef} id="smart-recipes" className="mb-12 scroll-mt-20">
        <SmartRecipeSuggestions />
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4 mb-8">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {GROCERY_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sub-bar with search & organic toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search in essentials (e.g. Oat Milk, Atta, Bananas)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Organic filter */}
            <button
              onClick={() => setOrganicOnly(!organicOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                organicOnly
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>Certified Organic Only</span>
            </button>

            {selectedStoreId !== 'all' && (
              <button
                onClick={() => setSelectedStoreId('all')}
                className="text-xs text-rose-600 hover:underline font-semibold"
              >
                Clear Store Filter
              </button>
            )}

            <span className="text-xs text-slate-400">
              {filteredProducts.length} items
            </span>
          </div>
        </div>
      </div>

      {/* Grocery Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map(product => (
            <GroceryProductCard
              key={product.id}
              product={product}
              onOpenPriceTrend={handleOpenPriceTrend}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
          <ShoppingBasket className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-800">No grocery products found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try choosing a different category or clearing search filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedStoreId('all');
              setOrganicOnly(false);
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
