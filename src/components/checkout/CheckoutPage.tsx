import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Address, Order, OrderStage } from '../../types';
import { api } from '../../services/api';
import { BRAND_CONFIG } from '../../config/brandConfig';
import confetti from 'canvas-confetti';
import {
  MapPin,
  Plus,
  ShieldCheck,
  CreditCard,
  QrCode,
  Smartphone,
  Wallet,
  Banknote,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  UtensilsCrossed,
  Store,
  Check,
  Lock
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    currentUser,
    cart,
    cartSubtotal,
    cartDiscount,
    appliedCoupon,
    cartDeliveryFee,
    cartPlatformFee,
    cartTaxes,
    cartTotal,
    fulfillmentGroups,
    currentCity,
    currentArea,
    clearCart,
    setActiveOrderId,
    navigateTo,
    showToast
  } = useApp();

  // User addresses list
  const [addresses, setAddresses] = useState<Address[]>(() => {
    return currentUser.addresses || [
      {
        id: 'addr_default',
        userId: currentUser.id,
        type: 'home',
        street: 'Flat 402, Oakwood Heights, 12th Main',
        area: currentArea,
        city: currentCity,
        pincode: '560038',
        landmark: 'Near Metro Station',
        isDefault: true
      }
    ];
  });

  const [selectedAddressId, setSelectedAddressId] = useState<string>(addresses[0]?.id || 'addr_default');
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddrType, setNewAddrType] = useState<'home' | 'work' | 'other'>('home');
  const [newStreet, setNewStreet] = useState('');
  const [newLandmark, setNewLandmark] = useState('');
  const [newPincode, setNewPincode] = useState('560038');

  // Delivery instructions
  const [selectedInstruction, setSelectedInstruction] = useState<string>('Leave at door and ring bell');
  const [customInstruction, setCustomInstruction] = useState<string>('');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NET_BANKING' | 'WALLET' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('rajat@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet.trim()) return;

    const newAddr: Address = {
      id: `addr_${Date.now()}`,
      userId: currentUser.id,
      type: newAddrType,
      street: newStreet.trim(),
      landmark: newLandmark.trim(),
      area: currentArea,
      city: currentCity,
      pincode: newPincode.trim() || '560001',
      isDefault: false
    };

    setAddresses(prev => [...prev, newAddr]);
    setSelectedAddressId(newAddr.id);
    setIsAddingAddress(false);
    setNewStreet('');
    setNewLandmark('');
    showToast({
      type: 'success',
      title: 'Address Added'
    });
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;

    setIsProcessing(true);

    try {
      const orderNum = `QB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrderId = `ord_${Date.now()}`;
      const nowIso = new Date().toISOString();

      const newOrder: Order = {
        id: newOrderId,
        orderNumber: orderNum,
        customerId: currentUser.id,
        customerName: currentUser.name,
        customerPhone: currentUser.phone,
        serviceType:
          fulfillmentGroups.some(g => g.serviceType === 'food') && fulfillmentGroups.some(g => g.serviceType === 'grocery')
            ? 'mixed'
            : fulfillmentGroups[0]?.serviceType || 'food',
        itemsCount: cart.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: cartSubtotal,
        discount: cartDiscount,
        couponCode: appliedCoupon?.code,
        deliveryFee: cartDeliveryFee,
        platformFee: cartPlatformFee,
        taxes: cartTaxes,
        totalAmount: cartTotal,
        deliveryAddress: selectedAddress,
        deliveryInstructions: customInstruction.trim() || selectedInstruction,
        paymentMethod,
        paymentStatus: 'SUCCESS',
        orderStatus: 'placed',
        deliveryPartnerName: 'Assigned automatically',
        createdAt: nowIso,
        acceptedAt: nowIso,
        city: currentCity,
        area: currentArea,
        fulfillmentGroups: fulfillmentGroups.map(fg => ({
          ...fg,
          stage: 'placed',
          items: fg.items.map(ci => ({ ...ci }))
        }))
      };

      await api.orders.create(newOrder);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      clearCart();
      setActiveOrderId(newOrderId);
      setIsProcessing(false);
      navigateTo('order_confirmation', { orderId: newOrderId });

      showToast({
        type: 'success',
        title: 'Order Placed Successfully!',
        message: `Order #${orderNum} confirmed`
      });
    } catch {
      setIsProcessing(false);
      showToast({
        type: 'error',
        title: 'Payment Failed',
        message: 'Could not complete transaction. Please retry.'
      });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-900">Your basket is empty</h2>
        <p className="text-xs text-slate-500 mt-2">Add items to proceed to checkout.</p>
        <button
          onClick={() => navigateTo('home')}
          className="mt-6 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Header */}
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>

        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Unified Checkout
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Review delivery address, instructions &amp; complete payment
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit Encrypted</span>
          </div>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          
          {/* Left Column: Steps 1, 2, 3 */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* STEP 1: DELIVERY ADDRESS */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Delivery Address</h3>
                    <p className="text-xs text-slate-500">Where should we deliver?</p>
                  </div>
                </div>

                {!isAddingAddress && (
                  <button
                    onClick={() => setIsAddingAddress(true)}
                    className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New</span>
                  </button>
                )}
              </div>

              {/* Address List */}
              {!isAddingAddress ? (
                <div className="space-y-3">
                  {addresses.map(addr => {
                    const isSelected = selectedAddressId === addr.id;

                    return (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                          isSelected
                            ? 'bg-emerald-50/60 border-emerald-500 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 ${
                              isSelected
                                ? 'border-emerald-600 bg-emerald-600 text-white'
                                : 'border-slate-300'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                              {addr.type}
                            </span>
                            <p className="text-xs font-bold text-slate-900 mt-1.5 leading-snug">
                              {addr.street}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {addr.area}, {addr.city} - {addr.pincode}
                              {addr.landmark && ` · Near ${addr.landmark}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Add New Address Form */
                <form onSubmit={handleSaveNewAddress} className="space-y-3 pt-2">
                  <div className="flex gap-2 mb-2">
                    {(['home', 'work', 'other'] as const).map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setNewAddrType(type)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize ${
                          newAddrType === type
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="House / Flat No., Building Name, Street Address *"
                    value={newStreet}
                    onChange={e => setNewStreet(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Landmark (Optional)"
                      value={newLandmark}
                      onChange={e => setNewLandmark(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      type="text"
                      placeholder="Pincode"
                      value={newPincode}
                      onChange={e => setNewPincode(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* STEP 2: DELIVERY INSTRUCTIONS */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Delivery Instructions</h3>
                  <p className="text-xs text-slate-500">Help the rider reach you seamlessly</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  'Leave at door and ring bell',
                  'Call on arrival',
                  'Do not ring bell / Pet inside'
                ].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedInstruction(opt)}
                    className={`p-3 rounded-xl border text-xs text-left font-medium transition-all ${
                      selectedInstruction === opt
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Custom instruction for rider (e.g. gate code, leave with guard)..."
                value={customInstruction}
                onChange={e => setCustomInstruction(e.target.value)}
                className="w-full mt-3 px-3.5 py-2 text-xs rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* STEP 3: PAYMENT METHOD */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Payment Option</h3>
                  <p className="text-xs text-slate-500">Secure Indian payment gateway simulation</p>
                </div>
              </div>

              <div className="space-y-3">
                {/* UPI Option */}
                <div
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'UPI'
                      ? 'bg-emerald-50/60 border-emerald-500 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                        <QrCode className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">UPI Instant (GPay / PhonePe / Paytm)</p>
                        <p className="text-[11px] text-slate-500">Zero surcharge · Instant authorization</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Fastest
                    </span>
                  </div>

                  {paymentMethod === 'UPI' && (
                    <div className="mt-3 pt-3 border-t border-emerald-200/60 flex items-center gap-2">
                      <input
                        type="text"
                        value={upiId}
                        onChange={e => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-emerald-300 bg-white text-slate-900 focus:outline-none"
                      />
                      <span className="text-xs font-bold text-emerald-700">Verified ✓</span>
                    </div>
                  )}
                </div>

                {/* Card Option */}
                <div
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'CARD'
                      ? 'bg-emerald-50/60 border-emerald-500 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Credit / Debit Card</p>
                      <p className="text-[11px] text-slate-500">Visa, Mastercard, RuPay, Amex</p>
                    </div>
                  </div>
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'COD'
                      ? 'bg-emerald-50/60 border-emerald-500 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                      <Banknote className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Cash on Delivery (Pay upon arrival)</p>
                      <p className="text-[11px] text-slate-500">Pay via cash or UPI scan to rider</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Split Fulfillment Review & Place Order Button */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Fulfillment Groups Overview */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
                <span>Split Fulfillment Plan ({fulfillmentGroups.length})</span>
                <span className="text-[11px] font-bold text-emerald-600">Smart Basket</span>
              </h3>

              <div className="space-y-3">
                {fulfillmentGroups.map((group, idx) => {
                  const isFood = group.serviceType === 'food';

                  return (
                    <div key={group.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {isFood ? (
                            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-600" />
                          ) : (
                            <Store className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                          <span className="font-bold text-slate-900">{group.sellerName}</span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" /> {group.estimatedDeliveryTime}
                        </span>
                      </div>

                      <div className="divide-y divide-slate-100 text-[11px]">
                        {group.items.map(item => (
                          <div key={item.id} className="py-1.5 flex items-center justify-between text-slate-600">
                            <span className="truncate max-w-[200px]">
                              {item.name} × {item.quantity}
                            </span>
                            <span className="font-semibold text-slate-900">
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bill Details */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">₹{cartSubtotal}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex items-center justify-between text-emerald-600 font-semibold">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-₹{cartDiscount}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-slate-600">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-slate-900">
                    {cartDeliveryFee === 0 ? 'FREE' : `₹${cartDeliveryFee}`}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Platform Processing</span>
                  <span className="font-semibold text-slate-900">₹{cartPlatformFee}</span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Taxes (5% GST)</span>
                  <span className="font-semibold text-slate-900">₹{cartTaxes}</span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-sm font-black text-slate-900">
                  <span>Grand Total</span>
                  <span className="text-lg font-black text-emerald-700">₹{cartTotal}</span>
                </div>
              </div>

              {/* PLACE ORDER BUTTON */}
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full mt-4 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-extrabold text-sm shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                {isProcessing ? (
                  <span>Authorizing Payment...</span>
                ) : (
                  <>
                    <span>Place Order · Pay ₹{cartTotal}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-slate-400">
                By placing this order you agree to {BRAND_CONFIG.name}'s terms of service.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
