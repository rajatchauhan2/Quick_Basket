import React from 'react';
import { useApp } from '../../context/AppContext';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { ShieldCheck, Zap, HeartHandshake, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, switchRole } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-slate-800 text-left">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Split Fulfillment Engine</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Order restaurant dishes and grocery essentials together in one smart basket with independent delivery routing.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Hygiene &amp; Temperature Control</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Insulated rider carry-bags ensure piping hot dum biryanis and chilled plant milks arrive at optimal temperature.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-sky-400 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Fair Merchant Partnerships</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Empowering independent cloud kitchens, regional dhabas, and neighborhood kiranas with real-time business intelligence.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-lg">
                QB
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                {BRAND_CONFIG.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              India's unified commerce platform delivering authentic meals and farm-fresh grocery essentials in under 30 minutes.
            </p>
            <div className="space-y-1.5 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> {BRAND_CONFIG.supportPhone}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" /> {BRAND_CONFIG.supportEmail}
              </p>
            </div>
          </div>

          {/* Food Discovery */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Food Delivery</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => navigateTo('food_market')} className="hover:text-emerald-400">North Indian Curries</button></li>
              <li><button onClick={() => navigateTo('food_market')} className="hover:text-emerald-400">Hyderabadi Dum Biryani</button></li>
              <li><button onClick={() => navigateTo('food_market')} className="hover:text-emerald-400">Sourdough Pizzas</button></li>
              <li><button onClick={() => navigateTo('food_market')} className="hover:text-emerald-400">South Indian Tiffins</button></li>
              <li><button onClick={() => navigateTo('food_market')} className="hover:text-emerald-400">Artisanal Desserts</button></li>
            </ul>
          </div>

          {/* Grocery Marketplace */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Daily Grocery</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => navigateTo('grocery_market')} className="hover:text-emerald-400">Farm Fresh Veggies</button></li>
              <li><button onClick={() => navigateTo('grocery_market')} className="hover:text-emerald-400">Plant Dairy &amp; Milks</button></li>
              <li><button onClick={() => navigateTo('grocery_market')} className="hover:text-emerald-400">Organic Staples &amp; Atta</button></li>
              <li><button onClick={() => navigateTo('grocery_market')} className="hover:text-emerald-400">Cold Pressed Oils</button></li>
              <li><button onClick={() => navigateTo('grocery_market')} className="hover:text-emerald-400">Gourmet Snacks</button></li>
            </ul>
          </div>

          {/* Enterprise & Portals */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Business Portals</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => switchRole('admin')} className="hover:text-emerald-400">Admin BI Dashboard</button></li>
              <li><button onClick={() => switchRole('restaurant_owner')} className="hover:text-emerald-400">Restaurant Kitchen Portal</button></li>
              <li><button onClick={() => switchRole('grocery_owner')} className="hover:text-emerald-400">Store Inventory Portal</button></li>
              <li><button onClick={() => switchRole('delivery_partner')} className="hover:text-emerald-400">Rider Partner App</button></li>
              <li><button onClick={() => navigateTo('offers')} className="hover:text-emerald-400">Coupons &amp; Deals</button></li>
            </ul>
          </div>
        </div>

        {/* Operating Cities */}
        <div className="py-6 border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Active Service Cities:
            </span>
            {BRAND_CONFIG.availableCities.map((city, idx) => (
              <span key={city} className="hover:text-white transition-colors">
                {city}
                {idx < BRAND_CONFIG.availableCities.length - 1 && <span className="ml-6 text-slate-700">·</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {BRAND_CONFIG.name} Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security &amp; Encryption</span>
            <span>Merchant Guidelines</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
