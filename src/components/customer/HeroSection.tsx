import React from 'react';
import { useApp } from '../../context/AppContext';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { Utensils, ShoppingBasket, ArrowRight, Sparkles, Clock, ShieldCheck, Zap } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActiveService, navigateTo } = useApp();

  const handleSelectService = (service: 'food' | 'grocery') => {
    setActiveService(service);
    navigateTo(service === 'food' ? 'food_market' : 'grocery_market');
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-slate-100/80 via-slate-50 to-white">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-teal-500/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Unified Indian Commerce · Smart Basket Technology</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            {BRAND_CONFIG.tagline}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            {BRAND_CONFIG.subheading}
          </p>

          {/* Quick value proposition text */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <Zap className="w-4 h-4 text-emerald-600" /> Single Unified Checkout
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <Clock className="w-4 h-4 text-amber-600" /> Under 30-min Deliveries
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <ShieldCheck className="w-4 h-4 text-sky-600" /> Live Multi-Stop Route Tracking
            </span>
          </div>
        </div>

        {/* The Two Major Service Cards (Food & Grocery) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          {/* FOOD SERVICE CARD */}
          <div
            onClick={() => handleSelectService('food')}
            className="group relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-amber-500/10 via-amber-50/60 to-white border border-amber-200/80 shadow-md hover:shadow-xl hover:border-amber-400 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            {/* Background image overlay */}
            <div className="absolute -right-6 -bottom-6 w-44 h-44 rounded-full bg-amber-500/10 group-hover:scale-125 transition-transform duration-500 blur-xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Utensils className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-100/90 px-2.5 py-1 rounded-full">
                  {BRAND_CONFIG.foodServiceCard.badge}
                </span>
              </div>

              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {BRAND_CONFIG.foodServiceCard.title}
              </h2>
              <p className="text-sm font-semibold text-amber-900/80 mt-1">
                {BRAND_CONFIG.foodServiceCard.subtitle}
              </p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-xs">
                {BRAND_CONFIG.foodServiceCard.description}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between pt-4 border-t border-amber-200/60">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 group-hover:text-amber-700">
                <span>Explore Restaurants</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=80&auto=format&fit=crop&q=80"
                  alt="Biryani"
                  className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs"
                />
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=80&auto=format&fit=crop&q=80"
                  alt="Pizza"
                  className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs"
                />
                <img
                  src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=80&auto=format&fit=crop&q=80"
                  alt="Idli"
                  className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* GROCERY SERVICE CARD */}
          <div
            onClick={() => handleSelectService('grocery')}
            className="group relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-emerald-500/10 via-emerald-50/60 to-white border border-emerald-200/80 shadow-md hover:shadow-xl hover:border-emerald-400 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            {/* Background image overlay */}
            <div className="absolute -right-6 -bottom-6 w-44 h-44 rounded-full bg-emerald-500/10 group-hover:scale-125 transition-transform duration-500 blur-xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <ShoppingBasket className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-1 rounded-full">
                  {BRAND_CONFIG.groceryServiceCard.badge}
                </span>
              </div>

              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {BRAND_CONFIG.groceryServiceCard.title}
              </h2>
              <p className="text-sm font-semibold text-emerald-900/80 mt-1">
                {BRAND_CONFIG.groceryServiceCard.subtitle}
              </p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-xs">
                {BRAND_CONFIG.groceryServiceCard.description}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between pt-4 border-t border-emerald-200/60">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 group-hover:text-emerald-700">
                <span>Browse Supermarkets</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=80&auto=format&fit=crop&q=80"
                  alt="Almond Milk"
                  className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs"
                />
                <img
                  src="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=80&auto=format&fit=crop&q=80"
                  alt="Bananas"
                  className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs"
                />
                <img
                  src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=80&auto=format&fit=crop&q=80"
                  alt="Tomatoes"
                  className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
