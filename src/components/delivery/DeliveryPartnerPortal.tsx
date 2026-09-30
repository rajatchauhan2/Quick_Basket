import React, { useState } from 'react';
import { db } from '../../services/dbService';
import { api } from '../../services/api';
import { useApp } from '../../context/AppContext';
import { Order, OrderStage } from '../../types';
import {
  Bike,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  Navigation,
  ArrowLeft,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Play,
  Store
} from 'lucide-react';

export const DeliveryPartnerPortal: React.FC = () => {
  const { switchRole, showToast } = useApp();
  const rider = db.getDeliveryPartners()[0];
  const [activeOrder, setActiveOrder] = useState<Order>(() => {
    const list = db.getOrders();
    return list.find(o => o.orderStatus !== 'delivered' && o.orderStatus !== 'cancelled') || list[0];
  });

  const handleAdvanceDelivery = async () => {
    let nextStage: OrderStage = 'accepted';
    if (activeOrder.orderStatus === 'placed') nextStage = 'accepted';
    else if (activeOrder.orderStatus === 'accepted') nextStage = 'preparing';
    else if (activeOrder.orderStatus === 'preparing') nextStage = 'picked_up';
    else if (activeOrder.orderStatus === 'picked_up') nextStage = 'out_for_delivery';
    else if (activeOrder.orderStatus === 'out_for_delivery') nextStage = 'delivered';

    const updated = await api.orders.updateStatus(activeOrder.id, nextStage);
    if (updated) {
      setActiveOrder({ ...updated });
      showToast({
        type: 'success',
        title: `Trip Status: ${nextStage.replace('_', ' ').toUpperCase()}`,
        message: 'Telemetry updated for customer and merchant'
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={rider.avatar}
              alt={rider.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900">{rider.name}</h1>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  Active On-Duty
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {rider.vehicleType} ({rider.vehicleNumber}) · Rating: ★ {rider.rating}
              </p>
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

        {/* Rider Earnings Card (Section 34) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Today's Payout</span>
            <p className="text-2xl font-black text-emerald-700 mt-1">₹{rider.todayEarnings}</p>
            <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">+₹150 peak incentive</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Week Earnings</span>
            <p className="text-2xl font-black text-slate-900 mt-1">₹{rider.weekEarnings}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Completed Deliveries</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{rider.totalDeliveries}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase">On-Time Success</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{rider.onTimeRate}%</p>
          </div>
        </div>

        {/* Assigned Order Trip Card (Section 33) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Assigned Order Dispatch
              </span>
              <h2 className="text-lg font-black text-slate-900">{activeOrder.orderNumber}</h2>
            </div>

            <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-900">
              {activeOrder.orderStatus.replace('_', ' ')}
            </span>
          </div>

          {/* Pickup and Drop Locations */}
          <div className="space-y-4">
            {/* Merchant Pickup */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Store className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Pickup Merchant</span>
                <p className="text-xs font-bold text-slate-900 mt-0.5">
                  {activeOrder.fulfillmentGroups[0]?.sellerName || 'Urban Tadka'}
                </p>
                <p className="text-[11px] text-slate-500">100 Feet Road, Indiranagar</p>
              </div>
            </div>

            {/* Customer Drop */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Customer Delivery</span>
                <p className="text-xs font-bold text-slate-900 mt-0.5">
                  {activeOrder.customerName} ({activeOrder.customerPhone})
                </p>
                <p className="text-[11px] text-slate-600">{activeOrder.deliveryAddress.street}</p>
                {activeOrder.deliveryInstructions && (
                  <p className="text-[11px] text-emerald-900 font-semibold mt-1">
                    Instruction: "{activeOrder.deliveryInstructions}"
                  </p>
                )}
              </div>
              <a
                href={`tel:${activeOrder.customerPhone}`}
                className="p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Advance Step Action Button */}
          {activeOrder.orderStatus !== 'delivered' && (
            <button
              onClick={handleAdvanceDelivery}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-md transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Advance Status: Mark {activeOrder.orderStatus === 'out_for_delivery' ? 'Delivered' : 'Next Stage'}</span>
            </button>
          )}

          {activeOrder.orderStatus === 'delivered' && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-xs font-bold text-emerald-900">
              ✓ Order Delivered Successfully! Earnings credited to wallet.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
