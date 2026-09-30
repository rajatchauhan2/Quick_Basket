import React, { useState } from 'react';
import { db } from '../../services/dbService';
import { RestaurantCard } from './RestaurantCard';
import { VegIndicator } from '../common/VegIndicator';
import { Filter, ArrowUpDown, Search, Utensils } from 'lucide-react';

const CUISINE_CATEGORIES = [
  'All',
  'North Indian',
  'Biryani',
  'South Indian',
  'Pizza',
  'Burgers',
  'Chinese',
  'Momos',
  'Desserts',
  'Beverages'
];

export const FoodMarketplace: React.FC = () => {
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'rating' | 'time' | 'price'>('rating');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const allRestaurants = db.getRestaurants();

  // Filter restaurants
  let filtered = allRestaurants.filter(r => {
    if (vegOnly && !r.isPureVeg) return false;
    if (selectedCuisine !== 'All' && !r.cuisines.some(c => c.toLowerCase().includes(selectedCuisine.toLowerCase()))) {
      return false;
    }
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      const matchName = r.name.toLowerCase().includes(q);
      const matchCuisine = r.cuisines.some(c => c.toLowerCase().includes(q));
      if (!matchName && !matchCuisine) return false;
    }
    return true;
  });

  // Sort restaurants
  filtered = filtered.sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'time') return a.deliveryTimeMin - b.deliveryTimeMin;
    if (sortBy === 'price') return a.priceForTwo - b.priceForTwo;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      
      {/* Marketplace Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
            <Utensils className="w-3.5 h-3.5" />
            <span>Food Marketplace</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Restaurants Delivering to You
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Hand-tossed pizzas, rich dum biryanis, crispy dosas &amp; slow-cooked curries
          </p>
        </div>

        {/* Search input in marketplace */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Filter by cuisine or dish..."
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Cuisine Filter Pills Carousel / Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none">
        {CUISINE_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCuisine(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCuisine === cat
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Control Bar: Veg Toggle & Sort Options */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-4 my-2 border-y border-slate-100">
        <div className="flex items-center gap-3">
          {/* Pure Veg Switch */}
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              vegOnly
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <VegIndicator isVeg={true} size="sm" />
            <span>Pure Veg Only</span>
          </button>

          <span className="text-xs text-slate-400">
            {filtered.length} {filtered.length === 1 ? 'restaurant' : 'restaurants'} found
          </span>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <ArrowUpDown className="w-3 h-3" /> Sort by:
          </span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'rating' | 'time' | 'price')}
            className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="rating">Top Rated (★)</option>
            <option value="time">Fastest Delivery</option>
            <option value="price">Cost: Low to High</option>
          </select>
        </div>
      </div>

      {/* Restaurants Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filtered.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
          <Utensils className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-800">No restaurants match your filters</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try turning off Pure Veg filter or switching cuisine to "All".
          </p>
          <button
            onClick={() => {
              setSelectedCuisine('All');
              setVegOnly(false);
              setSearchFilter('');
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
