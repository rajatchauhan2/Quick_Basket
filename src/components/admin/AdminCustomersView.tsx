import React, { useState } from 'react';
import { db } from '../../services/dbService';
import { api } from '../../services/api';
import { User } from '../../types';
import { useApp } from '../../context/AppContext';
import { Users, Search, ShieldAlert, ShieldCheck, Mail, Phone } from 'lucide-react';

export const AdminCustomersView: React.FC = () => {
  const { showToast } = useApp();
  const [users, setUsers] = useState<User[]>(() => db.getUsers());
  const [searchQuery, setSearchQuery] = useState('');

  const refreshUsers = () => {
    setUsers(db.getUsers());
  };

  const filtered = users.filter(u => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = u.name.toLowerCase().includes(q);
      const matchEmail = u.email.toLowerCase().includes(q);
      if (!matchName && !matchEmail) return false;
    }
    return true;
  });

  const handleToggleBlock = async (id: string) => {
    const updated = await api.users.toggleBlock(id);
    if (updated) {
      refreshUsers();
      showToast({
        type: 'info',
        title: updated.status === 'blocked' ? 'User Blocked' : 'User Activated',
        message: `${updated.name} status updated`
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Customer Account &amp; RFM Segment Directory
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor customer spend, CLV calculations, order counts, and access controls.
          </p>
        </div>

        <span className="text-xs font-bold text-slate-500">{filtered.length} registered accounts</span>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Customer Name or Email..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-400 uppercase text-[10px] font-bold">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4 text-right">Orders</th>
                <th className="py-3 px-4 text-right">Total Spent</th>
                <th className="py-3 px-4 text-right">Estimated CLV</th>
                <th className="py-3 px-4">Segment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Access Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map(user => {
                const isBlocked = user.status === 'blocked';

                return (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{user.name}</p>
                      <p className="text-[10px] text-slate-400">{user.email} · {user.phone}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {user.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-slate-800">
                      {user.totalOrders || 0}
                    </td>
                    <td className="py-3 px-4 text-right font-black text-slate-900">
                      ₹{user.totalSpent || 0}
                    </td>
                    <td className="py-3 px-4 text-right font-black text-emerald-700">
                      ₹{user.clv || Math.round((user.totalSpent || 400) * 1.8)}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                        {user.segment || 'Regular'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          isBlocked ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleToggleBlock(user.id)}
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                          isBlocked
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-rose-50 hover:bg-rose-100 text-rose-700'
                        }`}
                      >
                        {isBlocked ? 'Unblock User' : 'Block User'}
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
