import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { db } from '../../services/dbService';
import { api } from '../../services/api';
import { OrderStage, Order } from '../../types';
import {
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  ShieldCheck,
  Bike,
  MapPin,
  Store,
  UtensilsCrossed,
  Play,
  RotateCcw,
  Sparkles,
  Send,
  X
} from 'lucide-react';

const FOOD_STAGES: { stage: OrderStage; label: string; desc: string }[] = [
  { stage: 'placed', label: 'Order Placed', desc: 'Received & routed to merchant' },
  { stage: 'accepted', label: 'Restaurant Accepted', desc: 'Kitchen acknowledged order' },
  { stage: 'preparing', label: 'Food Being Prepared', desc: 'Fresh ingredients being cooked' },
  { stage: 'rider_assigned', label: 'Rider Assigned', desc: 'Partner en route to kitchen' },
  { stage: 'picked_up', label: 'Picked Up', desc: 'Order placed in insulated bag' },
  { stage: 'out_for_delivery', label: 'Out for Delivery', desc: 'Heading towards your doorstep' },
  { stage: 'delivered', label: 'Delivered', desc: 'Enjoy your fresh meal!' }
];

const GROCERY_STAGES: { stage: OrderStage; label: string; desc: string }[] = [
  { stage: 'placed', label: 'Order Placed', desc: 'Order sent to dark store' },
  { stage: 'accepted', label: 'Store Confirmed', desc: 'Inventory verified' },
  { stage: 'preparing', label: 'Items Being Packed', desc: 'Handpicked fresh items' },
  { stage: 'rider_assigned', label: 'Rider Assigned', desc: 'Rider reaching supermarket' },
  { stage: 'out_for_delivery', label: 'Out for Delivery', desc: 'Direct express dispatch' },
  { stage: 'delivered', label: 'Delivered', desc: 'Essentials received at door' }
];

export const OrderTrackingPage: React.FC = () => {
  const { viewParams, activeOrderId, showToast } = useApp();
  const orderId = viewParams.orderId || activeOrderId || 'ord_101';
  
  const [order, setOrder] = useState<Order | null>(() => {
    return db.getOrderById(orderId) || db.getOrders()[0];
  });

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: 'rider' | 'customer'; text: string; time: string }[]>([
    { sender: 'rider', text: 'Namaste! I have picked up your order and am using the GPS route.', time: 'Just now' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isAutoSimulating, setIsAutoSimulating] = useState(false);

  // Sync order if changed
  useEffect(() => {
    const o = db.getOrderById(orderId) || db.getOrders()[0];
    setOrder(o);
  }, [orderId]);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-900">No active order to track</h2>
      </div>
    );
  }

  const isFood = order.serviceType === 'food' || order.serviceType === 'mixed';
  const stageList = isFood ? FOOD_STAGES : GROCERY_STAGES;

  const currentStageIndex = stageList.findIndex(s => s.stage === order.orderStatus);
  const activeIdx = currentStageIndex === -1 ? 0 : currentStageIndex;

  const handleAdvanceStatus = async () => {
    if (activeIdx < stageList.length - 1) {
      const nextStage = stageList[activeIdx + 1].stage;
      const updated = await api.orders.updateStatus(order.id, nextStage);
      if (updated) {
        setOrder({ ...updated });
        showToast({
          type: 'info',
          title: `Status: ${stageList[activeIdx + 1].label}`,
          message: stageList[activeIdx + 1].desc
        });
      }
    }
  };

  const handleResetStatus = async () => {
    const updated = await api.orders.updateStatus(order.id, 'placed');
    if (updated) {
      setOrder({ ...updated });
      showToast({
        type: 'info',
        title: 'Status Reset to Order Placed'
      });
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => [
      ...prev,
      { sender: 'customer', text: newMessage.trim(), time }
    ]);
    setNewMessage('');

    // Simulated quick rider reply
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'rider',
          text: 'Got it! Reaching your location shortly.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  // Delivery rider data
  const rider = db.getDeliveryPartners()[0];

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Live Tracking Active
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-mono text-slate-500 font-semibold">{order.orderNumber}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Estimated Arrival: <span className="text-emerald-700">12–15 mins</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Fulfilling from {order.fulfillmentGroups.map(g => g.sellerName).join(' & ')}
            </p>
          </div>

          {/* DEMO CONTROLS TO ADVANCE STAGES */}
          <div className="flex items-center gap-2 p-2 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
              Demo Controls:
            </span>
            <button
              onClick={handleAdvanceStatus}
              disabled={activeIdx >= stageList.length - 1}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-bold transition-all shadow-xs"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>Next Stage</span>
            </button>
            <button
              onClick={handleResetStatus}
              className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              title="Reset status to Placed"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2-Column Live Map & Stepper Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          
          {/* Left Column: Visual Route Map & Rider Info */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Animated Route Visualization Card */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md h-72 sm:h-80 flex flex-col justify-between p-6">
              
              {/* Map grid lines background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 pointer-events-none" />

              {/* Top map chips */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs font-semibold text-white">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>GPS Telemetry Locked</span>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs text-slate-300 font-mono">
                  ETA: 13m 42s
                </div>
              </div>

              {/* Route Path SVG with animated Scooter */}
              <div className="relative z-10 my-auto flex items-center justify-between px-6 sm:px-12">
                {/* Store Pin */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg">
                    <Store className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-300 mt-2">Merchant Kitchen</span>
                </div>

                {/* Animated Vehicle in Transit */}
                <div className="flex-1 mx-4 relative flex items-center">
                  <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-700"
                      style={{ width: `${Math.min(100, ((activeIdx + 1) / stageList.length) * 100)}%` }}
                    />
                  </div>

                  {/* Rider vehicle marker */}
                  <div
                    className="absolute -top-4 w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/40 transition-all duration-700"
                    style={{ left: `calc(${Math.min(90, ((activeIdx + 1) / stageList.length) * 100)}% - 18px)` }}
                  >
                    <Bike className="w-4 h-4 animate-pulse" />
                  </div>
                </div>

                {/* Customer Pin */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-300 mt-2">Your Doorstep</span>
                </div>
              </div>

              {/* Bottom Street Indicator */}
              <div className="relative z-10 px-4 py-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <span>Rider on: 100 Feet Road, Indiranagar</span>
                <span className="text-emerald-400 font-semibold">Speed: 28 km/h</span>
              </div>
            </div>

            {/* Delivery Partner Profile Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <img
                    src={rider.avatar}
                    alt={rider.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{rider.name}</h3>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        ★ {rider.rating}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{rider.vehicleType} · {rider.vehicleNumber}</p>
                    <p className="text-[11px] text-emerald-600 font-medium">Temperature Insulated Bag ✓</p>
                  </div>
                </div>

                {/* Call & Chat Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat</span>
                  </button>
                  <a
                    href={`tel:${rider.phone}`}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                </div>
              </div>

              {/* Chat Drawer if opened */}
              {isChatOpen && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                    {chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex flex-col ${msg.sender === 'customer' ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-xs px-3 py-2 rounded-2xl text-xs ${
                            msg.sender === 'customer'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 text-slate-900'
                          }`}
                        >
                          <p>{msg.text}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 mt-0.5 px-1">{msg.time}</span>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Message your delivery partner..."
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="submit"
                      className="p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Multi-Stage Stepper Timeline */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center justify-between">
                <span>Multi-Stage Fulfillment</span>
                <span className="text-xs font-semibold text-emerald-600">Step {activeIdx + 1} of {stageList.length}</span>
              </h3>

              {/* Stepper Timeline */}
              <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                {stageList.map((stageItem, idx) => {
                  const isPast = idx < activeIdx;
                  const isCurrent = idx === activeIdx;
                  const isFuture = idx > activeIdx;

                  return (
                    <div key={stageItem.stage} className="relative flex items-start gap-4">
                      {/* Step Indicator Dot */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 font-bold text-xs transition-all ${
                          isPast
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-slate-900 text-white ring-4 ring-emerald-100'
                            : 'bg-white border-2 border-slate-200 text-slate-300'
                        }`}
                      >
                        {isPast ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>

                      {/* Step Text Info */}
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-center justify-between">
                          <h4
                            className={`text-xs font-bold leading-tight ${
                              isCurrent
                                ? 'text-slate-900 text-sm'
                                : isPast
                                ? 'text-slate-800'
                                : 'text-slate-400'
                            }`}
                          >
                            {stageItem.label}
                          </h4>
                          {isCurrent && (
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{stageItem.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Items Summary */}
              <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Basket Items in Delivery
                </h4>
                {order.fulfillmentGroups.map(fg => (
                  <div key={fg.id} className="text-xs space-y-1">
                    <p className="font-bold text-slate-700">{fg.sellerName}:</p>
                    {fg.items.map(item => (
                      <p key={item.id} className="text-slate-500 pl-2">
                        · {item.name} × {item.quantity}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
