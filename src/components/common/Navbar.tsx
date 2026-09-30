import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { UserRole, ServiceType } from '../../types';
import {
  MapPin,
  Search,
  ShoppingBag,
  User as UserIcon,
  ChevronDown,
  Sparkles,
  Heart,
  History,
  ShieldCheck,
  Store,
  Bike,
  RotateCcw,
  Menu,
  X,
  Tag
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentCity,
    currentArea,
    setIsLocationModalOpen,
    activeService,
    setActiveService,
    setIsSearchModalOpen,
    cart,
    cartTotal,
    setIsCartDrawerOpen,
    currentUser,
    activeRole,
    switchRole,
    navigateTo,
    currentView,
    resetDemoData
  } = useApp();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleServiceChange = (service: ServiceType) => {
    setActiveService(service);
    if (service === 'food') {
      navigateTo('food_market');
    } else if (service === 'grocery') {
      navigateTo('grocery_market');
    } else {
      navigateTo('home');
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    switchRole(role);
    setIsProfileMenuOpen(false);
    setIsMobileNavOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Left: Brand & Location */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {/* Logo */}
            <div
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xl tracking-tight shadow-sm group-hover:bg-emerald-600 transition-colors">
                <span className="text-emerald-400 group-hover:text-white transition-colors">Q</span>B
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-slate-900">
                    {BRAND_CONFIG.name}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    India
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">Food + Grocery Unified</p>
              </div>
            </div>

            {/* Location selector */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl hover:bg-slate-100 text-left transition-colors group"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 transition-colors shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="max-w-[130px] sm:max-w-[170px] truncate">
                <p className="text-xs font-bold text-slate-900 truncate flex items-center gap-0.5">
                  {currentArea}
                  <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-700 transition-transform" />
                </p>
                <p className="text-[10px] text-slate-500 truncate">{currentCity}</p>
              </div>
            </button>
          </div>

          {/* Center: FOOD / GROCERY Segmented Switcher & Search (Desktop) */}
          <div className="hidden lg:flex items-center gap-4 flex-1 max-w-lg justify-center">
            {/* Service segmented buttons */}
            <div className="flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/60 shadow-xs">
              {(['all', 'food', 'grocery'] as ServiceType[]).map(s => (
                <button
                  key={s}
                  onClick={() => handleServiceChange(s)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                    activeService === s
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {s === 'all' ? 'All Services' : s}
                </button>
              ))}
            </div>

            {/* Search Button trigger */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-100 text-slate-400 text-xs w-48 text-left transition-all"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">Search meals or essentials...</span>
            </button>
          </div>

          {/* Right: Actions, Smart Basket & Profile / Role Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2 sm:hidden rounded-xl text-slate-600 hover:bg-slate-100"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Offers Link */}
            <button
              onClick={() => navigateTo('offers')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                currentView === 'offers' ? 'bg-amber-50 text-amber-900 font-semibold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Tag className="w-3.5 h-3.5 text-amber-500" />
              <span>Offers</span>
            </button>

            {/* Favorites Link */}
            <button
              onClick={() => navigateTo('favorites')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                currentView === 'favorites' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Saved</span>
            </button>

            {/* Smart Basket Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center border border-emerald-600">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold">Smart Basket</span>
              {totalCartCount > 0 && (
                <span className="bg-emerald-700/80 px-1.5 py-0.5 rounded text-xs font-bold text-white">
                  ₹{cartTotal}
                </span>
              )}
            </button>

            {/* Role & Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1.5 sm:py-1.5 sm:px-3 rounded-xl border border-slate-200/90 hover:border-slate-300 bg-white transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs uppercase overflow-hidden">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                  ) : (
                    currentUser.name.charAt(0)
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[100px]">
                    {currentUser.name.split(' ')[0]}
                  </p>
                  <p className="text-[10px] text-emerald-600 font-semibold uppercase tracking-wider">
                    {activeRole.replace('_', ' ')}
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {/* User brief */}
                  <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Signed In As</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">{currentUser.name}</p>
                    <p className="text-xs text-slate-500">{currentUser.email}</p>
                  </div>

                  {/* Customer Quick Links */}
                  <div className="py-1 space-y-0.5">
                    <button
                      onClick={() => {
                        navigateTo('profile');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg text-left transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      <span>My Profile &amp; Addresses</span>
                    </button>
                    <button
                      onClick={() => {
                        navigateTo('orders_history');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg text-left transition-colors"
                    >
                      <History className="w-4 h-4 text-slate-400" />
                      <span>Order History &amp; Reorder</span>
                    </button>
                  </div>

                  {/* ROLE SWITCHER DEMO SECTION */}
                  <div className="pt-2 border-t border-slate-100 mt-1">
                    <div className="px-3 py-1 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Switch Demo Role
                      </span>
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
                        Live 5 Roles
                      </span>
                    </div>

                    <div className="space-y-0.5 mt-1">
                      {[
                        { role: 'customer' as const, label: 'Customer', icon: UserIcon, desc: 'Shop food & grocery' },
                        { role: 'admin' as const, label: 'Admin (Full Platform & BI)', icon: ShieldCheck, desc: 'Manage all & BI analytics' },
                        { role: 'restaurant_owner' as const, label: 'Restaurant Owner', icon: Store, desc: 'Urban Tadka kitchen' },
                        { role: 'grocery_owner' as const, label: 'Grocery Store Owner', icon: Store, desc: 'FreshMart inventory' },
                        { role: 'delivery_partner' as const, label: 'Delivery Partner', icon: Bike, desc: 'Rider trip & earnings' }
                      ].map(item => (
                        <button
                          key={item.role}
                          onClick={() => handleRoleSelect(item.role)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                            activeRole === item.role
                              ? 'bg-emerald-50 text-emerald-950 font-semibold border border-emerald-200'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <item.icon className={`w-3.5 h-3.5 ${activeRole === item.role ? 'text-emerald-600' : 'text-slate-400'}`} />
                            <div>
                              <p className="text-xs font-medium">{item.label}</p>
                              <p className="text-[10px] text-slate-400">{item.desc}</p>
                            </div>
                          </div>
                          {activeRole === item.role && (
                            <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reset Seed Data */}
                  <div className="pt-2 border-t border-slate-100 mt-2">
                    <button
                      onClick={() => {
                        resetDemoData();
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg text-left transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Demo Database</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Expanded Menu */}
        {isMobileNavOpen && (
          <div className="lg:hidden py-3 border-t border-slate-100 space-y-3 animate-in slide-in-from-top-2 duration-150">
            {/* Service Switcher pills for mobile */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl">
              {(['all', 'food', 'grocery'] as ServiceType[]).map(s => (
                <button
                  key={s}
                  onClick={() => {
                    handleServiceChange(s);
                    setIsMobileNavOpen(false);
                  }}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                    activeService === s
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600'
                  }`}
                >
                  {s === 'all' ? 'All' : s}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <button
                onClick={() => {
                  navigateTo('offers');
                  setIsMobileNavOpen(false);
                }}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 text-slate-800"
              >
                <Tag className="w-4 h-4 text-amber-500" />
                <span>Offers &amp; Coupons</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('favorites');
                  setIsMobileNavOpen(false);
                }}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 text-slate-800"
              >
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Saved Items</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('orders_history');
                  setIsMobileNavOpen(false);
                }}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 text-slate-800"
              >
                <History className="w-4 h-4 text-indigo-500" />
                <span>Order History</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('profile');
                  setIsMobileNavOpen(false);
                }}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 text-slate-800"
              >
                <UserIcon className="w-4 h-4 text-slate-500" />
                <span>My Profile</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
