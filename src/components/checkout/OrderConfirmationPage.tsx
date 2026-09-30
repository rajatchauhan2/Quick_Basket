import React from 'react';
import { useApp } from '../../context/AppContext';
import { db } from '../../services/dbService';
import { BRAND_CONFIG } from '../../config/brandConfig';
import {
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Bike,
  UtensilsCrossed,
  Store
} from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { viewParams, activeOrderId, navigateTo } = useApp();
  const orderId = viewParams.orderId || activeOrderId || 'ord_101';
  const order = db.getOrderById(orderId) || db.getOrders()[0];

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-900">Order not found</h2>
        <button
          onClick={() => navigateTo('home')}
          className="mt-4 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Success Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md text-center">
          
          {/* Animated Success Icon */}
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            Payment Confirmed · Order Dispatched
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
            Thank you, {order.customerName.split(' ')[0]}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Order ID: <strong className="text-slate-900 font-mono">{order.orderNumber}</strong>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <button
              onClick={() => navigateTo('order_tracking', { orderId: order.id })}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
            >
              <Bike className="w-4 h-4" />
              <span>Track Live Delivery Status</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigateTo('home')}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              Continue Shopping
            </button>
          </div>

          {/* Fulfillment Groups Split Details */}
          <div className="mt-10 pt-8 border-t border-slate-100 text-left space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Order Fulfillment Breakdown ({order.fulfillmentGroups.length} independent routing groups)
            </h3>

            <div className="space-y-3">
              {order.fulfillmentGroups.map((group, idx) => (
                <div key={group.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {group.serviceType === 'food' ? (
                        <UtensilsCrossed className="w-4 h-4 text-amber-600" />
                      ) : (
                        <Store className="w-4 h-4 text-emerald-600" />
                      )}
                      <span className="font-bold text-slate-900">{group.sellerName}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-600" /> ETA: {group.estimatedDeliveryTime}
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 text-[11px] text-slate-600">
                    {group.items.map(item => (
                      <div key={item.id} className="py-1 flex items-center justify-between">
                        <span>{item.name} × {item.quantity}</span>
                        <span className="font-semibold text-slate-900">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Address & Payment Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                <span className="text-slate-400 uppercase tracking-wider font-bold text-[10px] block mb-1">
                  Delivery Destination
                </span>
                <p className="font-bold text-slate-900">{order.deliveryAddress.street}</p>
                <p className="text-slate-500 mt-0.5">
                  {order.deliveryAddress.area}, {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                <span className="text-slate-400 uppercase tracking-wider font-bold text-[10px] block mb-1">
                  Payment Summary
                </span>
                <p className="font-bold text-slate-900">Paid via {order.paymentMethod} · ₹{order.totalAmount}</p>
                <p className="text-emerald-700 font-semibold mt-0.5">Transaction ID: TXN-{order.id.slice(-6).toUpperCase()}</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
