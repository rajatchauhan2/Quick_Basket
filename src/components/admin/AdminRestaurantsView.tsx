import React, { useState } from 'react';
import { db } from '../../services/dbService';
import { api } from '../../services/api';
import { Restaurant, FoodMenuItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { VegIndicator } from '../common/VegIndicator';
import { Store, UtensilsCrossed, CheckCircle2, XCircle, Star, Plus } from 'lucide-react';

export const AdminRestaurantsView: React.FC = () => {
  const { showToast } = useApp();
  const [restaurants, setRestaurants] = useState<Restaurant[]>(() => db.getRestaurants());
  const [selectedRestId, setSelectedRestId] = useState<string>(restaurants[0]?.id || 'rest_1');
  const [menuItems, setMenuItems] = useState<FoodMenuItem[]>(() => db.getFoodItems(selectedRestId));

  const handleSelectRestaurant = (id: string) => {
    setSelectedRestId(id);
    setMenuItems(db.getFoodItems(id));
  };

  const handleToggleItemAvailability = async (itemId: string) => {
    const isNowAvailable = await api.restaurants.toggleItemAvailable(itemId);
    setMenuItems(prev =>
      prev.map(i => (i.id === itemId ? { ...i, isAvailable: isNowAvailable } : i))
    );
    showToast({
      type: 'info',
      title: isNowAvailable ? 'Item Marked Available' : 'Item Marked Sold Out'
    });
  };

  const currentRest = restaurants.find(r => r.id === selectedRestId) || restaurants[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Restaurant &amp; Menu Catalog Governance
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage partner cloud kitchens, menu pricing, availability toggles, and service hours.
          </p>
        </div>

        <span className="text-xs font-bold text-slate-500">{restaurants.length} active restaurant partners</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Restaurants List */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Select Partner Restaurant
          </span>

          {restaurants.map(r => {
            const isSelected = r.id === selectedRestId;

            return (
              <div
                key={r.id}
                onClick={() => handleSelectRestaurant(r.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <img src={r.image} alt={r.name} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold truncate">{r.name}</h4>
                  <p className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {r.cuisines.join(', ')}
                  </p>
                  <p className={`text-[10px] mt-1 ${isSelected ? 'text-emerald-400 font-semibold' : 'text-emerald-700'}`}>
                    ★ {r.rating} · {r.area}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Menu Items for Selected Restaurant */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-slate-900">{currentRest.name} Menu</h3>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {menuItems.length} dishes
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Toggle live kitchen availability with 1 click</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {menuItems.map(item => (
              <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <VegIndicator isVeg={item.isVeg} size="sm" />
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{item.name}</h5>
                    <p className="text-[11px] text-slate-500">
                      {item.category} · <strong className="text-slate-900">₹{item.price}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      item.isAvailable ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                    }`}
                  >
                    {item.isAvailable ? 'In Stock' : 'Sold Out'}
                  </span>
                  
                  <button
                    onClick={() => handleToggleItemAvailability(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      item.isAvailable
                        ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {item.isAvailable ? 'Mark Sold Out' : 'Enable Item'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
