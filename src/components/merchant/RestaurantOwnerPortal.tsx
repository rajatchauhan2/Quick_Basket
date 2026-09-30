import React, { useState } from 'react';
import { db } from '../../services/dbService';
import { api } from '../../services/api';
import { useApp } from '../../context/AppContext';
import { VegIndicator } from '../common/VegIndicator';
import { Utensils, CheckCircle2, Clock, ArrowLeft, RefreshCw, ChefHat } from 'lucide-react';

export const RestaurantOwnerPortal: React.FC = () => {
  const { switchRole, showToast } = useApp();
  const restaurant = db.getRestaurantById('rest_1') || db.getRestaurants()[0];
  const [menuItems, setMenuItems] = useState(() => db.getFoodItems(restaurant.id));
  const orders = db.getOrders({ serviceType: 'food' }).filter(o =>
    o.fulfillmentGroups.some(fg => fg.sellerId === restaurant.id)
  );

  const handleToggleItem = async (itemId: string) => {
    const isAvailable = await api.restaurants.toggleItemAvailable(itemId);
    setMenuItems(prev => prev.map(i => (i.id === itemId ? { ...i, isAvailable } : i)));
    showToast({
      type: 'info',
      title: isAvailable ? 'Item Enabled' : 'Item Marked Sold Out'
    });
  };

  const todayRevenue = orders
    .filter(o => o.orderStatus === 'delivered')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-xl shadow-xs">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900">{restaurant.name} Kitchen Console</h1>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                  Merchant Mode
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{restaurant.area}, {restaurant.city} · Fast KDS Dispatch</p>
            </div>
          </div>

          <button
            onClick={() => switchRole('customer')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Switch to Customer</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Today's Kitchen Orders</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{orders.length}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Kitchen Gross Sales</span>
            <p className="text-2xl font-black text-emerald-700 mt-1">₹{todayRevenue}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Average Kitchen Prep</span>
            <p className="text-2xl font-black text-slate-900 mt-1">11.4 mins</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Customer Rating</span>
            <p className="text-2xl font-black text-amber-600 mt-1">★ {restaurant.rating}</p>
          </div>
        </div>

        {/* Menu Availability Management */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Live Dish Availability Toggle</h2>
          
          <div className="divide-y divide-slate-100">
            {menuItems.map(item => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <VegIndicator isVeg={item.isVeg} size="sm" />
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                    <p className="text-[11px] text-slate-400">₹{item.price}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleItem(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    item.isAvailable
                      ? 'bg-emerald-50 text-emerald-800 hover:bg-rose-50 hover:text-rose-800'
                      : 'bg-rose-50 text-rose-800 hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
                >
                  {item.isAvailable ? '✓ In Kitchen (Click to Stop)' : '✗ Sold Out (Click to Enable)'}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
