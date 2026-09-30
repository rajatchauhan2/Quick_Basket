import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { db } from '../../services/dbService';
import { VegIndicator } from './VegIndicator';
import { BRAND_CONFIG } from '../../config/brandConfig';
import {
  Search,
  X,
  Clock,
  Sparkles,
  ArrowRight,
  Store,
  UtensilsCrossed,
  ShoppingBag,
  Star
} from 'lucide-react';

const POPULAR_SEARCHES = {
  all: ['Biryani', 'Almond Milk', 'Pizza', 'Tomatoes', 'Dosa', 'Cold Pressed Oil', 'Momos', 'Oats'],
  food: ['Hyderabadi Biryani', 'Paneer Tikka', 'Sourdough Pizza', 'Butter Chicken', 'Masala Dosa', 'Momos', 'Burgers'],
  grocery: ['Almond Milk', 'Bananas', 'Rolled Oats', 'Atta', 'Greek Yogurt', 'Dark Chocolate', 'Mustard Oil']
};

export const SearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    activeService,
    navigateTo,
    addToCart
  } = useApp();

  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(['Biryani Handi', 'Almond Milk', 'Sourdough Pizza']);

  useEffect(() => {
    if (isSearchModalOpen) {
      setQuery('');
    }
  }, [isSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  // Real-time search query matching across all seed entities
  const trimmed = query.trim().toLowerCase();
  const allRestaurants = db.getRestaurants();
  const allStores = db.getGroceryStores();
  const allFood = db.getFoodItems();
  const allGrocery = db.getGroceryProducts();

  const matchedRestaurants = trimmed
    ? allRestaurants.filter(r => r.name.toLowerCase().includes(trimmed) || r.cuisines.some(c => c.toLowerCase().includes(trimmed)))
    : [];

  const matchedStores = trimmed
    ? allStores.filter(s => s.name.toLowerCase().includes(trimmed) || s.tagline.toLowerCase().includes(trimmed))
    : [];

  const matchedFood = trimmed
    ? allFood.filter(f => f.name.toLowerCase().includes(trimmed) || f.category.toLowerCase().includes(trimmed) || f.description.toLowerCase().includes(trimmed))
    : [];

  const matchedGrocery = trimmed
    ? allGrocery.filter(g => g.name.toLowerCase().includes(trimmed) || g.brand.toLowerCase().includes(trimmed) || g.category.toLowerCase().includes(trimmed))
    : [];

  const hasResults = matchedRestaurants.length > 0 || matchedStores.length > 0 || matchedFood.length > 0 || matchedGrocery.length > 0;

  const handleSelectQuery = (q: string) => {
    setQuery(q);
    if (!recentSearches.includes(q)) {
      setRecentSearches(prev => [q, ...prev.slice(0, 4)]);
    }
  };

  const handleOpenRestaurant = (id: string) => {
    setIsSearchModalOpen(false);
    navigateTo('restaurant_detail', { id });
  };

  const handleOpenStore = (id: string) => {
    setIsSearchModalOpen(false);
    navigateTo('store_detail', { id });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for restaurants, biryani, almond milk, groceries, pizza..."
            className="w-full bg-transparent text-base sm:text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-slate-400 bg-slate-100 border border-slate-200 rounded-md">
              ESC
            </kbd>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Body */}
        <div className="overflow-y-auto flex-1 p-5 space-y-6">
          {!trimmed && (
            <>
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Recent Searches
                    </span>
                    <button
                      onClick={() => setRecentSearches([])}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map(item => (
                      <button
                        key={item}
                        onClick={() => handleSelectQuery(item)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-xs font-medium text-slate-700 transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase flex items-center gap-1.5 mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {(POPULAR_SEARCHES[activeService] || POPULAR_SEARCHES.all).map(term => (
                    <button
                      key={term}
                      onClick={() => handleSelectQuery(term)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200/80 hover:border-emerald-400 hover:bg-emerald-50/50 text-xs font-medium text-slate-700 transition-all flex items-center gap-1.5 group"
                    >
                      <span>{term}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Category shortcuts */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase block mb-3">
                  Browse Fast Categories
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { name: 'Biryani & Kebabs', service: 'food', icon: UtensilsCrossed },
                    { name: 'Artisan Pizzas', service: 'food', icon: UtensilsCrossed },
                    { name: 'Fresh Vegetables', service: 'grocery', icon: ShoppingBag },
                    { name: 'Dairy Alternatives', service: 'grocery', icon: ShoppingBag }
                  ].map((cat, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectQuery(cat.name.split(' ')[0])}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-left border border-slate-100 transition-colors"
                    >
                      <cat.icon className="w-4 h-4 text-emerald-600 mb-1.5" />
                      <p className="text-xs font-semibold text-slate-900">{cat.name}</p>
                      <p className="text-[10px] text-slate-500 capitalize">{cat.service}</p>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Active Search Results */}
          {trimmed && hasResults && (
            <div className="space-y-6">
              {/* Restaurants Results */}
              {matchedRestaurants.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5 text-emerald-600" /> Restaurants ({matchedRestaurants.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {matchedRestaurants.map(r => (
                      <div
                        key={r.id}
                        onClick={() => handleOpenRestaurant(r.id)}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 hover:border-emerald-300 hover:bg-slate-50/60 transition-all cursor-pointer group"
                      >
                        <img
                          src={r.image}
                          alt={r.name}
                          className="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate">{r.name}</p>
                          <p className="text-xs text-slate-500 truncate">{r.cuisines.join(', ')}</p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-600 mt-0.5">
                            <span className="flex items-center gap-0.5 font-semibold text-amber-600">
                              <Star className="w-3 h-3 fill-amber-500" /> {r.rating}
                            </span>
                            <span>·</span>
                            <span>{r.deliveryTimeMin}-{r.deliveryTimeMax}m</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Grocery Stores Results */}
              {matchedStores.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5 text-emerald-600" /> Grocery Stores ({matchedStores.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {matchedStores.map(s => (
                      <div
                        key={s.id}
                        onClick={() => handleOpenStore(s.id)}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 hover:border-emerald-300 hover:bg-slate-50/60 transition-all cursor-pointer group"
                      >
                        <img
                          src={s.image}
                          alt={s.name}
                          className="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate">{s.name}</p>
                          <p className="text-xs text-slate-500 truncate">{s.tagline}</p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-600 mt-0.5">
                            <span className="font-semibold text-emerald-600">★ {s.rating}</span>
                            <span>·</span>
                            <span>{s.deliveryTimeMin}-{s.deliveryTimeMax}m delivery</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Food Items Results */}
              {matchedFood.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <UtensilsCrossed className="w-3.5 h-3.5 text-amber-600" /> Food Items ({matchedFood.length})
                  </h4>
                  <div className="space-y-2">
                    {matchedFood.map(item => {
                      const restaurant = allRestaurants.find(r => r.id === item.restaurantId);
                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50/80 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <VegIndicator isVeg={item.isVeg} size="sm" />
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover shrink-0"
                            />
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                              <p className="text-xs text-slate-500">
                                {restaurant?.name || 'Restaurant'} · ₹{item.price}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              addToCart({
                                itemId: item.id,
                                serviceType: 'food',
                                sellerId: item.restaurantId,
                                sellerName: restaurant?.name || 'Restaurant',
                                name: item.name,
                                image: item.image,
                                price: item.price,
                                quantity: 1,
                                isVeg: item.isVeg
                              });
                            }}
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
                          >
                            Add
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Grocery Products Results */}
              {matchedGrocery.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" /> Groceries & Essentials ({matchedGrocery.length})
                  </h4>
                  <div className="space-y-2">
                    {matchedGrocery.map(prod => {
                      const store = allStores.find(s => s.id === prod.storeId);
                      return (
                        <div
                          key={prod.id}
                          className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50/80 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-12 h-12 rounded-lg object-cover shrink-0"
                            />
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{prod.name}</p>
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <span>{prod.brand}</span>
                                <span>·</span>
                                <span>{prod.weight}</span>
                                <span>·</span>
                                <span className="font-semibold text-slate-900">₹{prod.sellingPrice}</span>
                                {prod.discountPercentage > 0 && (
                                  <span className="text-[10px] text-emerald-600 font-bold">
                                    {prod.discountPercentage}% OFF
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              addToCart({
                                itemId: prod.id,
                                serviceType: 'grocery',
                                sellerId: prod.storeId,
                                sellerName: store?.name || 'FreshMart',
                                name: prod.name,
                                image: prod.image,
                                price: prod.sellingPrice,
                                quantity: 1,
                                weightOrSize: prod.weight
                              });
                            }}
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
                          >
                            Add
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* No Results */}
          {trimmed && !hasResults && (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold text-slate-800">No matching items found for "{query}"</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try searching for something like "Biryani", "Pizza", "Almond Milk", or "Oats".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
