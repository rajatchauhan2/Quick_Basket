import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BIDashboard } from '../analytics/BIDashboard';
import { AdminOrdersView } from './AdminOrdersView';
import { AdminInventoryView } from './AdminInventoryView';
import { AdminCustomersView } from './AdminCustomersView';
import { AdminRestaurantsView } from './AdminRestaurantsView';
import {
  BarChart3,
  Package,
  Boxes,
  Users,
  UtensilsCrossed,
  ShieldCheck,
  ArrowLeft,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { switchRole, navigateTo, resetDemoData } = useApp();
  const [activeAdminTab, setActiveAdminTab] = useState<'analytics' | 'orders' | 'inventory' | 'customers' | 'restaurants'>('analytics');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white shrink-0 p-5 flex flex-col justify-between border-r border-slate-800">
        <div>
          {/* Header */}
          <div className="flex items-center gap-2.5 pb-6 border-b border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-lg">
              QB
            </div>
            <div>
              <h2 className="text-sm font-black tracking-tight text-white">QuickBasket BI</h2>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                Enterprise Admin
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1 mt-6">
            {[
              { id: 'analytics' as const, label: 'Business Intelligence', icon: BarChart3 },
              { id: 'orders' as const, label: 'Order Management', icon: Package },
              { id: 'inventory' as const, label: 'Dark Store Inventory', icon: Boxes },
              { id: 'customers' as const, label: 'Customer Directory', icon: Users },
              { id: 'restaurants' as const, label: 'Restaurant Catalogs', icon: UtensilsCrossed }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeAdminTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <tab.icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-slate-800 space-y-2 mt-6">
          <button
            onClick={() => switchRole('customer')}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:bg-slate-800 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Customer View</span>
          </button>

          <button
            onClick={resetDemoData}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo DB</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl">
        {activeAdminTab === 'analytics' && <BIDashboard />}
        {activeAdminTab === 'orders' && <AdminOrdersView />}
        {activeAdminTab === 'inventory' && <AdminInventoryView />}
        {activeAdminTab === 'customers' && <AdminCustomersView />}
        {activeAdminTab === 'restaurants' && <AdminRestaurantsView />}
      </main>

    </div>
  );
};
