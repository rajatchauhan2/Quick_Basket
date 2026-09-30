import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { VegIndicator } from '../common/VegIndicator';
import { SmartRecipeSuggestions } from './SmartRecipeSuggestions';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  Clock,
  Sparkles,
  Info,
  CheckCircle2,
  UtensilsCrossed,
  Store,
  ChefHat,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const SmartBasketDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartFoodSubtotal,
    cartGrocerySubtotal,
    cartDiscount,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    cartDeliveryFee,
    cartPlatformFee,
    cartTaxes,
    cartTotal,
    freeDeliveryRemaining,
    fulfillmentGroups,
    navigateTo
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [activeInstructionItemId, setActiveInstructionItemId] = useState<string | null>(null);
  const [instructionText, setInstructionText] = useState('');
  const [showRecipeAssistant, setShowRecipeAssistant] = useState(false);

  if (!isCartDrawerOpen) return null;

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    await applyCouponCode(couponInput.trim());
    setCouponLoading(false);
    setCouponInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900">Smart Basket</h3>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Unified
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'} · {fulfillmentGroups.length} fulfillment {fulfillmentGroups.length === 1 ? 'group' : 'groups'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-slate-400 hover:text-rose-600 font-semibold px-2 py-1 rounded"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Delivery Threshold Bar */}
        {cart.length > 0 && (
          <div className="px-5 py-2.5 bg-emerald-50/80 border-b border-emerald-100">
            {freeDeliveryRemaining > 0 ? (
              <div>
                <p className="text-xs font-semibold text-emerald-900 flex items-center justify-between mb-1.5">
                  <span>Add ₹{freeDeliveryRemaining} more to unlock <strong>FREE Delivery</strong></span>
                  <span className="text-[11px] font-bold text-emerald-700">₹{cartSubtotal} / ₹{BRAND_CONFIG.freeDeliveryThreshold}</span>
                </p>
                <div className="w-full h-1.5 bg-emerald-200/80 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (cartSubtotal / BRAND_CONFIG.freeDeliveryThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Congratulations! You have unlocked <strong>FREE Delivery</strong> on this smart basket.</span>
              </div>
            )}
          </div>
        )}

        {/* Scrollable Cart Items Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-800">Your Smart Basket is empty</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                Add your favorite meals from restaurants or daily essentials from supermarkets. They'll be unified right here!
              </p>
              <div className="flex gap-2 justify-center mt-6">
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigateTo('food_market');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-xs"
                >
                  Order Food
                </button>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigateTo('grocery_market');
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold shadow-xs"
                >
                  Buy Grocery
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Split Fulfillment Groups */}
              <div className="space-y-5">
                {fulfillmentGroups.map((group, gIdx) => {
                  const isFood = group.serviceType === 'food';

                  return (
                    <div
                      key={group.id}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs"
                    >
                      {/* Group Header */}
                      <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                              isFood ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {isFood ? <UtensilsCrossed className="w-3.5 h-3.5" /> : <Store className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                                Order Group {gIdx + 1} · {isFood ? 'Restaurant Meal' : 'Grocery Store'}
                              </span>
                            </div>
                            <h4 className="text-xs font-bold text-slate-900">{group.sellerName}</h4>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {group.estimatedDeliveryTime}
                          </span>
                        </div>
                      </div>

                      {/* Items in this group */}
                      <div className="divide-y divide-slate-100">
                        {group.items.map(item => (
                          <div key={item.id} className="p-3.5 space-y-2">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-2.5 flex-1 min-w-0">
                                {item.serviceType === 'food' && (
                                  <div className="shrink-0 mt-0.5">
                                    <VegIndicator isVeg={!!item.isVeg} size="sm" />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <h5 className="text-xs font-bold text-slate-900 leading-snug">
                                    {item.name}
                                  </h5>
                                  
                                  {/* Customizations tags */}
                                  {item.selectedCustomizations && item.selectedCustomizations.length > 0 && (
                                    <p className="text-[11px] text-slate-500 mt-0.5">
                                      {item.selectedCustomizations.map(c => c.optionName).join(', ')}
                                    </p>
                                  )}

                                  {item.weightOrSize && (
                                    <span className="text-[10px] text-slate-400 font-medium">
                                      {item.weightOrSize}
                                    </span>
                                  )}

                                  <p className="text-xs font-black text-slate-900 mt-1">
                                    ₹{item.price * item.quantity}
                                  </p>
                                </div>
                              </div>

                              {/* Quantity Stepper */}
                              <div className="flex items-center gap-2 bg-slate-100 text-slate-800 font-bold text-xs px-2 py-1 rounded-lg shrink-0">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="p-0.5 hover:text-rose-600 transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-1 text-slate-900 text-xs">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="p-0.5 hover:text-emerald-600 transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>

                            {/* Special Instructions Note */}
                            {item.specialInstructions && (
                              <p className="text-[11px] text-amber-800 bg-amber-50 px-2 py-1 rounded italic">
                                Note: "{item.specialInstructions}"
                              </p>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Group subtotal footer */}
                      <div className="px-4 py-2 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                        <span>Group Subtotal ({group.items.length} items)</span>
                        <span className="text-slate-900 font-bold">₹{group.subtotal}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Smart Recipe Assistant Box */}
              <div className="rounded-2xl border border-emerald-200/90 bg-gradient-to-r from-emerald-50/70 via-teal-50/50 to-slate-50/80 p-3.5 shadow-2xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <ChefHat className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 leading-tight truncate">
                        What can you cook with this basket?
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">
                        Smart recipes with 1-click missing ingredient additions
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowRecipeAssistant(!showRecipeAssistant)}
                    className="text-xs font-bold text-emerald-800 bg-white hover:bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-300 transition-colors shrink-0 flex items-center gap-1 shadow-2xs"
                  >
                    <span>{showRecipeAssistant ? 'Hide' : 'Explore'}</span>
                    {showRecipeAssistant ? (
                      <ChevronUp className="w-3.5 h-3.5 text-emerald-700" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-emerald-700" />
                    )}
                  </button>
                </div>

                {showRecipeAssistant && (
                  <div className="mt-3 pt-3 border-t border-emerald-200/60 max-h-96 overflow-y-auto pr-1">
                    <SmartRecipeSuggestions compact onOpenCheckout={handleProceedToCheckout} />
                  </div>
                )}
              </div>

              {/* Coupon Section */}
              <div className="rounded-2xl border border-slate-200/90 p-4 bg-slate-50/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" /> Apply Coupon
                  </span>
                  {appliedCoupon && (
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 font-semibold hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider">{appliedCoupon.code}</p>
                      <p className="text-[11px] text-emerald-700">{appliedCoupon.title} applied</p>
                    </div>
                    <span className="text-xs font-black text-emerald-700">-₹{cartDiscount}</span>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. QUICK150 or FREEDEL"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 uppercase tracking-wider font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="submit"
                      disabled={couponLoading || !couponInput.trim()}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {/* Popular coupon suggestions */}
                {!appliedCoupon && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {['QUICK150', 'FREEDEL', 'TASTY50'].map(code => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => applyCouponCode(code)}
                        className="px-2 py-0.5 rounded text-[10px] font-bold bg-white border border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-emerald-700 transition-colors"
                      >
                        +{code}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Bill Details Breakdown */}
              <div className="rounded-2xl border border-slate-200/90 p-4 bg-white space-y-2.5 text-xs">
                <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2">
                  Bill Summary
                </h4>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Item Subtotal</span>
                  <span className="font-semibold text-slate-900">₹{cartSubtotal}</span>
                </div>

                {cartFoodSubtotal > 0 && cartGrocerySubtotal > 0 && (
                  <div className="pl-2 space-y-1 text-[11px] text-slate-400 border-l border-slate-100">
                    <div className="flex items-center justify-between">
                      <span>Food items subtotal</span>
                      <span>₹{cartFoodSubtotal}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Grocery items subtotal</span>
                      <span>₹{cartGrocerySubtotal}</span>
                    </div>
                  </div>
                )}

                {cartDiscount > 0 && (
                  <div className="flex items-center justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{cartDiscount}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    Delivery Partner Fee
                    {cartDeliveryFee === 0 && (
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                        FREE
                      </span>
                    )}
                  </span>
                  <span className="font-semibold text-slate-900">
                    {cartDeliveryFee === 0 ? '₹0' : `₹${cartDeliveryFee}`}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Platform Processing Fee</span>
                  <span className="font-semibold text-slate-900">₹{cartPlatformFee}</span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Government Taxes &amp; GST (5%)</span>
                  <span className="font-semibold text-slate-900">₹{cartTaxes}</span>
                </div>

                <div className="border-t border-slate-100 pt-2.5 flex items-center justify-between text-sm font-black text-slate-900">
                  <span>To Pay</span>
                  <span className="text-base font-black text-emerald-700">₹{cartTotal}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Sticky Checkout Action */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-slate-100 shrink-0">
            <button
              onClick={handleProceedToCheckout}
              className="w-full flex items-center justify-between px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <div className="text-left">
                <p className="text-[11px] text-emerald-100 uppercase tracking-wider font-semibold">
                  {totalCartCount} items · Total
                </p>
                <p className="text-base font-black">₹{cartTotal}</p>
              </div>

              <div className="flex items-center gap-1 text-sm font-bold">
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
