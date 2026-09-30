import React from 'react';
import { Restaurant } from '../../types';
import { useApp } from '../../context/AppContext';
import { Star, Clock, MapPin, Heart, Tag } from 'lucide-react';
import { VegIndicator } from '../common/VegIndicator';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const { navigateTo, isFavorite, toggleFavorite } = useApp();
  const isFav = isFavorite('restaurants', restaurant.id);

  return (
    <div
      onClick={() => navigateTo('restaurant_detail', { id: restaurant.id })}
      className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
    >
      {/* Top Image Container */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

        {/* Favorite Heart Button */}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleFavorite('restaurants', restaurant.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-600 hover:text-rose-600 hover:bg-white shadow-xs transition-colors"
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Pure Veg or Status Badge */}
        {restaurant.isPureVeg && (
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-xs shadow-xs flex items-center gap-1.5">
            <VegIndicator isVeg={true} size="sm" />
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Pure Veg</span>
          </div>
        )}

        {/* Bottom image stats (delivery time & distance) */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
          <span className="flex items-center gap-1 bg-slate-950/60 backdrop-blur-xs px-2 py-0.5 rounded-md">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            {restaurant.deliveryTimeMin}–{restaurant.deliveryTimeMax} mins
          </span>
          <span className="flex items-center gap-1 bg-slate-950/60 backdrop-blur-xs px-2 py-0.5 rounded-md">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            {restaurant.distanceKm} km
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header & Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 font-bold text-xs px-2 py-0.5 rounded-md shrink-0">
              <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
              <span>{restaurant.rating}</span>
            </div>
          </div>

          {/* Cuisines */}
          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
            {restaurant.cuisines.join(' · ')}
          </p>

          {/* Pricing & Area info */}
          <div className="flex items-center gap-2 text-xs text-slate-600 mt-2 font-medium">
            <span>₹{restaurant.priceForTwo} for two</span>
            <span className="text-slate-300">·</span>
            <span>{restaurant.area}</span>
          </div>
        </div>

        {/* Offers Footer */}
        {restaurant.offers && restaurant.offers.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 truncate">
            <Tag className="w-3 h-3 shrink-0 text-emerald-600" />
            <span className="truncate">{restaurant.offers[0]}</span>
          </div>
        )}
      </div>
    </div>
  );
};
