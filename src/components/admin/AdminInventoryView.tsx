import React, { useState } from 'react';
import { db } from '../../services/dbService';
import { api } from '../../services/api';
import { GroceryProduct } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  Boxes,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plus,
  RefreshCw,
  Search,
  Filter
} from 'lucide-react';

export const AdminInventoryView: React.FC = () => {
  const { showToast } = useApp();
  const [products, setProducts] = useState<GroceryProduct[]>(() => db.getGroceryProducts());
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const refreshList = () => {
    setProducts(db.getGroceryProducts());
  };

  const filtered = products.filter(p => {
    if (statusFilter !== 'all' && p.inventoryStatus !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      if (!matchName && !matchBrand) return false;
    }
    return true;
  });

  const handleQuickRestock = async (productId: string, units: number = 25) => {
    const updated = await api.grocery.restock(productId, units);
    if (updated) {
      refreshList();
      showToast({
        type: 'success',
        title: 'Inventory Restocked',
        message: `Added ${units} units of ${updated.name}`
      });
    }
  };

  const healthyCount = products.filter(p => p.inventoryStatus === 'HEALTHY').length;
  const lowCount = products.filter(p => p.inventoryStatus === 'LOW_STOCK').length;
  const critCount = products.filter(p => p.inventoryStatus === 'CRITICAL').length;
  const outCount = products.filter(p => p.inventoryStatus === 'OUT_OF_STOCK').length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Dark Store &amp; Supermarket Inventory
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor real-time warehouse stock thresholds, automated reorder triggers, and expiry warnings.
          </p>
        </div>

        <button
          onClick={refreshList}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Stock</span>
        </button>
      </div>

      {/* Stock Health Overview Cards (Section 15) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        {/* GREEN Healthy */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">GREEN · Healthy</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{healthyCount}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Sufficient buffer units</p>
        </div>

        {/* YELLOW Low */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">YELLOW · Low Stock</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{lowCount}</p>
          <p className="text-[11px] text-amber-600 font-semibold mt-0.5">Below reorder trigger</p>
        </div>

        {/* RED Critical */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider">RED · Critical</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{critCount}</p>
          <p className="text-[11px] text-rose-600 font-semibold mt-0.5">&le; 4 units left</p>
        </div>

        {/* BLACK Out of Stock */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">BLACK · Out of Stock</span>
            <XCircle className="w-4 h-4 text-slate-900" />
          </div>
          <p className="text-2xl font-black text-slate-900">{outCount}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Ordering blocked</p>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search SKU or Brand..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5"
          >
            <option value="all">All Inventory Statuses</option>
            <option value="HEALTHY">Healthy Stock Only</option>
            <option value="LOW_STOCK">Low Stock Only</option>
            <option value="CRITICAL">Critical Stock Only</option>
            <option value="OUT_OF_STOCK">Out of Stock Only</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-400 uppercase text-[10px] font-bold">
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Current Stock</th>
                <th className="py-3 px-4 text-right">Reorder Level</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Supplier</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map(product => {
                const isOut = product.inventoryStatus === 'OUT_OF_STOCK';
                const isCrit = product.inventoryStatus === 'CRITICAL';
                const isLow = product.inventoryStatus === 'LOW_STOCK';

                return (
                  <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{product.name}</p>
                      <p className="text-[10px] text-slate-400">{product.brand} · {product.weight}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{product.category}</td>
                    <td className="py-3 px-4 text-right font-black text-slate-900">
                      {product.stock} units
                    </td>
                    <td className="py-3 px-4 text-right text-slate-500">
                      {product.reorderLevel} units
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                          isOut
                            ? 'bg-slate-950 text-white'
                            : isCrit
                            ? 'bg-rose-100 text-rose-900'
                            : isLow
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-emerald-100 text-emerald-900'
                        }`}
                      >
                        {product.inventoryStatus.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-[11px] truncate max-w-[140px]">
                      {product.supplier}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleQuickRestock(product.id, 25)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] shadow-2xs transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Restock +25</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
