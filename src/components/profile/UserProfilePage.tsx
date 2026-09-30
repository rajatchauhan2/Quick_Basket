import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { db } from '../../services/dbService';
import { Order, Restaurant, GroceryProduct } from '../../types';
import { VegIndicator } from '../common/VegIndicator';
import { QuickBasketRewards, REWARD_TIERS } from './QuickBasketRewards';
import {
  User as UserIcon,
  Package,
  MapPin,
  Heart,
  Tag,
  Clock,
  RotateCcw,
  ChevronRight,
  ShieldCheck,
  Phone,
  Mail,
  Plus,
  Crown,
  Coins
} from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const {
    currentUser,
    viewParams,
    navigateTo,
    addToCart,
    isFavorite,
    toggleFavorite,
    showToast,
    favorites
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'rewards' | 'addresses' | 'favorites' | 'profile'>(
    (viewParams.tab as 'orders' | 'rewards' | 'addresses' | 'favorites' | 'profile') || 'orders'
  );

  const orders = db.getOrders({ customerId: currentUser.id });
  const allRestaurants = db.getRestaurants();
  const allProducts = db.getGroceryProducts();

  // Loyalty calculations based on past order value
  const ordersSpend = orders
    .filter(o => o.orderStatus !== 'cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const totalPastOrderSpend = Math.max(ordersSpend, currentUser.totalSpent || 0);

  const currentTier =
    REWARD_TIERS.find(
      t => totalPastOrderSpend >= t.minSpend && (t.maxSpend === Infinity || totalPastOrderSpend <= t.maxSpend)
    ) || REWARD_TIERS[0];

  const currentTierIdx = REWARD_TIERS.findIndex(t => t.id === currentTier.id);
  const nextTier = currentTierIdx < REWARD_TIERS.length - 1 ? REWARD_TIERS[currentTierIdx + 1] : null;

  let progressPercent = 100;
  let remainingSpend = 0;

  if (nextTier) {
    const tierSpan = nextTier.minSpend - currentTier.minSpend;
    const currentProgress = totalPastOrderSpend - currentTier.minSpend;
    progressPercent = Math.min(100, Math.max(0, Math.round((currentProgress / tierSpan) * 100)));
    remainingSpend = Math.max(0, nextTier.minSpend - totalPastOrderSpend);
  }

  const totalPoints = Math.round(totalPastOrderSpend * currentTier.pointsMultiplier);

  const favRestaurants = allRestaurants.filter(r => favorites.restaurants.includes(r.id));
  const favProducts = allProducts.filter(p => favorites.products.includes(p.id));

  const handleReorder = (order: Order) => {
    let count = 0;
    order.fulfillmentGroups.forEach(fg => {
      fg.items.forEach(item => {
        addToCart({
          itemId: item.itemId,
          serviceType: item.serviceType,
          sellerId: item.sellerId,
          sellerName: item.sellerName,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          isVeg: item.isVeg,
          weightOrSize: item.weightOrSize
        });
        count += item.quantity;
      });
    });

    showToast({
      type: 'success',
      title: 'Reordered Items Added',
      message: `${count} items added to your Smart Basket`
    });
    navigateTo('checkout');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Profile Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}
                alt={currentUser.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-xs"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900">{currentUser.name}</h1>
                  <button
                    type="button"
                    onClick={() => setActiveTab('rewards')}
                    className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-300 transition-colors shadow-2xs"
                  >
                    <Crown className="w-3 h-3 text-emerald-700" />
                    <span>{currentTier.badge}</span>
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-slate-400" /> {currentUser.email}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-slate-400" /> {currentUser.phone}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Past Order Spend</p>
                <p className="text-base sm:text-lg font-black text-slate-900 mt-0.5 font-mono tabular-nums">
                  ₹{totalPastOrderSpend.toLocaleString()}
                </p>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">QuickPoints</p>
                <p className="text-base sm:text-lg font-black text-emerald-600 mt-0.5 font-mono tabular-nums flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-amber-500 inline" />
                  {totalPoints.toLocaleString()}
                </p>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Total Orders</p>
                <p className="text-base sm:text-lg font-black text-slate-900 mt-0.5 font-mono">{orders.length}</p>
              </div>
            </div>
          </div>

          {/* QuickBasket Rewards Progress Bar Highlight */}
          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0">
                  <Crown className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <span>QuickBasket Rewards: <strong className="text-emerald-300">{currentTier.name} Member</strong></span>
                    <span className="text-[10px] text-emerald-200 font-mono bg-white/10 px-1.5 py-0.2 rounded">
                      {currentTier.pointsMultiplier}x Points Multiplier
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    {nextTier
                      ? `Spend ₹${remainingSpend.toLocaleString()} more to unlock ${nextTier.name} Privileges`
                      : 'Highest Legend Tier reached with zero delivery fees on all orders!'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('rewards')}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 hover:text-white transition-colors underline shrink-0"
              >
                <span>View All Perks &amp; Redeem</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Visual Progress Bar toward Next Loyalty Level */}
            <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden p-0.5 border border-white/10 mt-1">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 transition-all duration-500 shadow-sm"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 mt-2">
              <span>₹{totalPastOrderSpend.toLocaleString()} past spend</span>
              <span className="text-emerald-300 font-bold">{progressPercent}% towards {nextTier ? nextTier.name : 'Diamond Club'}</span>
              {nextTier && <span>Target: ₹{nextTier.minSpend.toLocaleString()}</span>}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-100 overflow-x-auto scrollbar-none">
            {[
              { id: 'orders' as const, label: 'My Orders', icon: Package },
              { id: 'rewards' as const, label: 'QuickBasket Rewards', icon: Crown },
              { id: 'favorites' as const, label: 'Saved Favorites', icon: Heart },
              { id: 'addresses' as const, label: 'Delivery Addresses', icon: MapPin },
              { id: 'profile' as const, label: 'Account Details', icon: UserIcon }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Orders History */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900">Past Orders &amp; Smart Reorders</h2>
            
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map(order => {
                  const isDelivered = order.orderStatus === 'delivered';
                  const isCancelled = order.orderStatus === 'cancelled';

                  return (
                    <div
                      key={order.id}
                      className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs font-bold text-slate-900">
                            {order.orderNumber}
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                              isDelivered
                                ? 'bg-emerald-50 text-emerald-800'
                                : isCancelled
                                ? 'bg-rose-50 text-rose-800'
                                : 'bg-amber-50 text-amber-800'
                            }`}
                          >
                            {order.orderStatus.replace('_', ' ')}
                          </span>
                          <span className="text-xs text-slate-400">
                            {new Date(order.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>

                        <div className="text-xs text-slate-600 space-y-0.5">
                          {order.fulfillmentGroups.map((fg, i) => (
                            <p key={i} className="font-semibold text-slate-800">
                              {fg.sellerName} · {fg.items.length} items
                            </p>
                          ))}
                          <p className="text-slate-400 text-[11px]">
                            Paid via {order.paymentMethod} · Total: <strong className="text-slate-900">₹{order.totalAmount}</strong>
                          </p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigateTo('order_tracking', { orderId: order.id })}
                          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                        >
                          Track Status
                        </button>
                        <button
                          onClick={() => handleReorder(order)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reorder All</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
                <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-800">No orders placed yet</p>
                <button
                  onClick={() => navigateTo('home')}
                  className="mt-4 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold"
                >
                  Explore Restaurants &amp; Groceries
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: QuickBasket Rewards */}
        {activeTab === 'rewards' && (
          <QuickBasketRewards orders={orders} />
        )}

        {/* Tab 3: Favorites */}
        {activeTab === 'favorites' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-3">Saved Restaurants ({favRestaurants.length})</h2>
              {favRestaurants.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favRestaurants.map(r => (
                    <div
                      key={r.id}
                      onClick={() => navigateTo('restaurant_detail', { id: r.id })}
                      className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 cursor-pointer flex items-center gap-3"
                    >
                      <img src={r.image} alt={r.name} className="w-14 h-14 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">{r.name}</p>
                        <p className="text-xs text-slate-500 truncate">{r.cuisines.join(', ')}</p>
                        <p className="text-[11px] text-emerald-600 font-semibold mt-1">★ {r.rating} · ₹{r.priceForTwo} for two</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">No saved restaurants yet.</p>
              )}
            </div>

            <div className="pt-4 border-t border-slate-200">
              <h2 className="text-base font-bold text-slate-900 mb-3">Saved Grocery Essentials ({favProducts.length})</h2>
              {favProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favProducts.map(p => (
                    <div
                      key={p.id}
                      className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-contain mix-blend-multiply" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{p.name}</p>
                          <p className="text-[11px] text-slate-500">{p.weight} · ₹{p.sellingPrice}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart({
                          itemId: p.id,
                          serviceType: 'grocery',
                          sellerId: p.storeId,
                          sellerName: 'FreshMart Supermarket',
                          name: p.name,
                          image: p.image,
                          price: p.sellingPrice,
                          quantity: 1,
                          weightOrSize: p.weight
                        })}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">No saved grocery products yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900">Saved Addresses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentUser.addresses?.map(addr => (
                <div key={addr.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {addr.type}
                    </span>
                    {addr.isDefault && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-slate-900">{addr.street}</p>
                  <p className="text-xs text-slate-500">{addr.area}, {addr.city} - {addr.pincode}</p>
                  {addr.landmark && <p className="text-[11px] text-slate-400">Landmark: {addr.landmark}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Profile Details */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4 max-w-lg">
            <h2 className="text-base font-bold text-slate-900">Customer Account Info</h2>
            <div>
              <label className="block text-xs font-semibold text-slate-400">Full Name</label>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{currentUser.name}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400">Email Address</label>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{currentUser.email}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400">Mobile Phone</label>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{currentUser.phone}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
