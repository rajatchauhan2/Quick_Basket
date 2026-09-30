import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { db } from '../../services/dbService';
import { FoodMenuItem } from '../../types';
import { VegIndicator } from '../common/VegIndicator';
import { FoodCustomizationModal } from './FoodCustomizationModal';
import {
  Star,
  Clock,
  MapPin,
  Tag,
  ArrowLeft,
  Heart,
  Plus,
  Minus,
  Sparkles,
  Info
} from 'lucide-react';

export const RestaurantDetailPage: React.FC = () => {
  const {
    viewParams,
    navigateTo,
    addToCart,
    cart,
    updateQuantity,
    isFavorite,
    toggleFavorite
  } = useApp();

  const restaurantId = viewParams.id || 'rest_1';
  const restaurant = db.getRestaurantById(restaurantId) || db.getRestaurants()[0];
  const menuItems = db.getFoodItems(restaurant.id);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [customizingItem, setCustomizingItem] = useState<FoodMenuItem | null>(null);

  const isFav = isFavorite('restaurants', restaurant.id);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(menuItems.map(i => i.category)))];

  // Filter items
  const filteredItems = menuItems.filter(item => {
    if (vegOnly && !item.isVeg) return false;
    if (activeCategory !== 'All' && item.category !== activeCategory) return false;
    return true;
  });

  // Check how many of each item are in cart
  const getItemCartQuantity = (itemId: string) => {
    const matched = cart.filter(ci => ci.itemId === itemId);
    return matched.reduce((sum, i) => sum + i.quantity, 0);
  };

  const handleAddItem = (item: FoodMenuItem) => {
    if (item.customizationGroups && item.customizationGroups.length > 0) {
      setCustomizingItem(item);
    } else {
      addToCart({
        itemId: item.id,
        serviceType: 'food',
        sellerId: restaurant.id,
        sellerName: restaurant.name,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: 1,
        isVeg: item.isVeg
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Top Banner & Info */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          
          {/* Back navigation */}
          <button
            onClick={() => navigateTo('food_market')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Restaurants</span>
          </button>

          {/* Restaurant Header Card */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 bg-white shadow-sm">
            {/* Cover photo */}
            <div className="relative h-48 sm:h-64 w-full bg-slate-900">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
              
              {/* Floating Favorite button */}
              <button
                onClick={() => toggleFavorite('restaurants', restaurant.id)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 hover:text-rose-600 shadow-sm transition-colors"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            {/* Restaurant Details bar */}
            <div className="p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    {restaurant.isPureVeg && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        100% PURE VEGETARIAN
                      </span>
                    )}
                    <span className="text-xs text-slate-500">{restaurant.openingHours}</span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    {restaurant.name}
                  </h1>
                  
                  <p className="text-sm font-medium text-slate-600 mt-1">
                    {restaurant.tagline}
                  </p>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 mt-3 font-medium">
                    <span>{restaurant.cuisines.join(' · ')}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {restaurant.area}, {restaurant.city}
                    </span>
                    <span>·</span>
                    <span>₹{restaurant.priceForTwo} for two</span>
                  </div>
                </div>

                {/* Rating & Speed Box */}
                <div className="flex md:flex-col items-center md:items-end justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 shrink-0">
                  <div className="flex items-center gap-1.5 bg-emerald-600 text-white font-bold text-sm px-3 py-1 rounded-xl shadow-xs">
                    <Star className="w-4 h-4 fill-white text-white" />
                    <span>{restaurant.rating}</span>
                    <span className="text-xs text-emerald-100 font-normal">({restaurant.reviewCount}+)</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-800 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      {restaurant.deliveryTimeMin}–{restaurant.deliveryTimeMax} mins
                    </p>
                    <p className="text-[11px] text-slate-400">Delivery Fee ₹{restaurant.deliveryFee}</p>
                  </div>
                </div>
              </div>

              {/* Special offers banner */}
              {restaurant.offers && restaurant.offers.length > 0 && (
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" /> Offers:
                  </span>
                  {restaurant.offers.map((offer, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-xs font-semibold"
                    >
                      {offer}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Sticky Menu Filters */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Categories Tab pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Veg Only Toggle */}
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              vegOnly
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <VegIndicator isVeg={true} size="sm" />
            <span>Veg Only</span>
          </button>
        </div>
      </div>

      {/* Menu Catalog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            {activeCategory === 'All' ? 'Full Menu' : activeCategory} ({filteredItems.length})
          </h2>
          <span className="text-xs text-slate-400">Freshly prepared to order</span>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map(item => {
              const cartQty = getItemCartQuantity(item.id);
              const hasCustomizations = item.customizationGroups && item.customizationGroups.length > 0;

              return (
                <div
                  key={item.id}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex gap-4 justify-between"
                >
                  {/* Left details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <VegIndicator isVeg={item.isVeg} size="sm" />
                        {item.isBestseller && (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1 border border-amber-200">
                            <Sparkles className="w-2.5 h-2.5 text-amber-500" /> Bestseller
                          </span>
                        )}
                        <span className="text-xs text-slate-400">★ {item.rating}</span>
                      </div>

                      <h3 className="font-bold text-base text-slate-900">{item.name}</h3>
                      <p className="text-sm font-black text-slate-900 mt-1">₹{item.price}</p>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {hasCustomizations && (
                      <p className="text-[11px] font-semibold text-emerald-600 mt-2">
                        Customisable options available
                      </p>
                    )}
                  </div>

                  {/* Right: Dish Photo & Add / Quantity Stepper */}
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 shrink-0 rounded-xl overflow-hidden bg-slate-100 flex flex-col justify-end">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Button over photo */}
                    <div className="relative z-10 p-2 flex justify-center">
                      {cartQty > 0 ? (
                        <div className="flex items-center gap-2 bg-slate-900 text-white font-bold text-xs px-2.5 py-1.5 rounded-xl shadow-lg border border-slate-800">
                          <button
                            onClick={() => {
                              const cartItem = cart.find(ci => ci.itemId === item.id);
                              if (cartItem) updateQuantity(cartItem.id, -1);
                            }}
                            className="p-0.5 hover:text-emerald-400"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-1 text-emerald-400">{cartQty}</span>
                          <button
                            onClick={() => handleAddItem(item)}
                            className="p-0.5 hover:text-emerald-400"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddItem(item)}
                          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white text-emerald-700 font-extrabold text-xs shadow-md border border-emerald-100 hover:bg-emerald-50 transition-colors uppercase tracking-wider"
                        >
                          <span>Add</span>
                          <Plus className="w-3 h-3 text-emerald-600" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
            <Info className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-800">No items match the selected filter</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setVegOnly(false);
              }}
              className="mt-3 text-xs font-semibold text-emerald-600 underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Customization Modal */}
      {customizingItem && (
        <FoodCustomizationModal
          item={customizingItem}
          restaurant={restaurant}
          onClose={() => setCustomizingItem(null)}
        />
      )}

    </div>
  );
};
