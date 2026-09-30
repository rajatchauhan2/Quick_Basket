import React, { useState } from 'react';
import { db } from '../../services/dbService';
import { api } from '../../services/api';
import { useApp } from '../../context/AppContext';
import { Store, Boxes, Plus, ArrowLeft, RefreshCw, AlertTriangle } from 'lucide-react';

export const GroceryOwnerPortal: React.FC = () => {
  const { switchRole, showToast } = useApp();
  const store = db.getGroceryStores()[0];
  const [products, setProducts] = useState(() => db.getGroceryProducts(store.id));

  const handleRestock = async (productId: string) => {
    const updated = await api.grocery.restock(productId, 30);
    if (updated) {
      setProducts(db.getGroceryProducts(store.id));
      showToast({
        type: 'success',
        title: 'Inventory Restocked',
        message: `Added 30 units of ${updated.name}`
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-xs">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900">{store.name} Dark Store Console</h1>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  Merchant Mode
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{store.area}, {store.city} · 15-min SLA Packing Hub</p>
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

        {/* Store SKUs and Stock Management */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Current SKU Inventory &amp; Stock Refill</h2>
          
          <div className="divide-y divide-slate-100">
            {products.map(p => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-contain mix-blend-multiply" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{p.name}</h4>
                    <p className="text-[11px] text-slate-400">
                      {p.weight} · ₹{p.sellingPrice} (Stock: <strong className="text-slate-900">{p.stock}</strong>)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                      p.inventoryStatus === 'OUT_OF_STOCK'
                        ? 'bg-slate-950 text-white'
                        : p.inventoryStatus === 'CRITICAL'
                        ? 'bg-rose-100 text-rose-900'
                        : p.inventoryStatus === 'LOW_STOCK'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}
                  >
                    {p.inventoryStatus.replace('_', ' ')}
                  </span>

                  <button
                    onClick={() => handleRestock(p.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Restock +30</span>
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
