import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  ServiceType,
  CartItem,
  Address,
  Coupon,
  Order,
  FulfillmentGroup
} from '../types';
import { BRAND_CONFIG } from '../config/brandConfig';
import { api } from '../services/api';
import { db } from '../services/dbService';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

export type AppView = 
  | 'home'
  | 'food_market'
  | 'grocery_market'
  | 'restaurant_detail'
  | 'store_detail'
  | 'checkout'
  | 'order_confirmation'
  | 'order_tracking'
  | 'profile'
  | 'orders_history'
  | 'favorites'
  | 'offers'
  | 'admin'
  | 'restaurant_portal'
  | 'grocery_portal'
  | 'delivery_portal';

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  activeRole: UserRole;
  switchRole: (role: UserRole) => void;
  activeService: ServiceType;
  setActiveService: (service: ServiceType) => void;
  currentCity: string;
  currentArea: string;
  setLocation: (city: string, area: string) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;

  // View navigation
  currentView: AppView;
  navigateTo: (view: AppView, params?: Record<string, string>) => void;
  viewParams: Record<string, string>;

  // Smart Basket / Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  updateItemInstruction: (cartItemId: string, instruction: string) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  
  // Cart Financials & Groups
  cartSubtotal: number;
  cartFoodSubtotal: number;
  cartGrocerySubtotal: number;
  cartDiscount: number;
  appliedCoupon: Coupon | null;
  applyCouponCode: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  cartDeliveryFee: number;
  cartPlatformFee: number;
  cartTaxes: number;
  cartTotal: number;
  freeDeliveryRemaining: number;
  fulfillmentGroups: FulfillmentGroup[];

  // Favorites
  favorites: {
    restaurants: string[];
    stores: string[];
    products: string[];
  };
  toggleFavorite: (type: 'restaurants' | 'stores' | 'products', id: string) => void;
  isFavorite: (type: 'restaurants' | 'stores' | 'products', id: string) => boolean;

  // Global Search Modal
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;

  // Notifications & Toasts
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // Active / Last placed order
  activeOrderId: string | null;
  setActiveOrderId: (id: string | null) => void;

  // Reset database helper
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user default (Customer)
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const users = db.getUsers();
    return users[0];
  });
  const [activeRole, setActiveRole] = useState<UserRole>('customer');
  const [activeService, setActiveService] = useState<ServiceType>('all');
  
  // Location
  const [currentCity, setCurrentCity] = useState<string>('Bengaluru');
  const [currentArea, setCurrentArea] = useState<string>('Indiranagar');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);

  // Navigation
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [viewParams, setViewParams] = useState<Record<string, string>>({});

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('qb_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Favorites
  const [favorites, setFavorites] = useState<{ restaurants: string[]; stores: string[]; products: string[] }>(() => {
    try {
      const saved = localStorage.getItem('qb_favorites');
      return saved ? JSON.parse(saved) : { restaurants: ['rest_1', 'rest_3'], stores: ['store_1'], products: ['groc_1'] };
    } catch {
      return { restaurants: ['rest_1', 'rest_3'], stores: ['store_1'], products: ['groc_1'] };
    }
  });

  // Search
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Active Order for tracking
  const [activeOrderId, setActiveOrderId] = useState<string | null>('ord_101');

  // Sync cart to storage
  useEffect(() => {
    try {
      localStorage.setItem('qb_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Sync favorites
  useEffect(() => {
    try {
      localStorage.setItem('qb_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const switchRole = async (role: UserRole) => {
    setActiveRole(role);
    const user = await api.auth.switchRoleUser(role);
    setCurrentUser(user);
    if (role === 'admin') {
      setCurrentView('admin');
    } else if (role === 'restaurant_owner') {
      setCurrentView('restaurant_portal');
    } else if (role === 'grocery_owner') {
      setCurrentView('grocery_portal');
    } else if (role === 'delivery_partner') {
      setCurrentView('delivery_portal');
    } else {
      setCurrentView('home');
    }
    showToast({
      type: 'info',
      title: `Switched to ${role.replace('_', ' ').toUpperCase()} mode`,
      message: `Signed in as ${user.name}`
    });
  };

  const setLocation = (city: string, area: string) => {
    setCurrentCity(city);
    setCurrentArea(area);
    setIsLocationModalOpen(false);
    showToast({
      type: 'success',
      title: 'Delivery Location Updated',
      message: `${area}, ${city}`
    });
  };

  const navigateTo = (view: AppView, params: Record<string, string> = {}) => {
    setCurrentView(view);
    setViewParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (item: Omit<CartItem, 'id'>) => {
    setCart(prev => {
      // Check if identical item (same itemId and same customizations) exists
      const existingIdx = prev.findIndex(ci => {
        if (ci.itemId !== item.itemId) return false;
        const c1 = JSON.stringify(ci.selectedCustomizations || []);
        const c2 = JSON.stringify(item.selectedCustomizations || []);
        return c1 === c2;
      });

      if (existingIdx !== -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += item.quantity || 1;
        return updated;
      }

      const newId = `ci_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
      return [...prev, { ...item, id: newId }];
    });

    showToast({
      type: 'success',
      title: 'Added to Smart Basket',
      message: `${item.name} · ${item.serviceType.toUpperCase()}`
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(ci => ci.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => {
      return prev.map(ci => {
        if (ci.id === cartItemId) {
          const newQty = ci.quantity + delta;
          return newQty > 0 ? { ...ci, quantity: newQty } : null;
        }
        return ci;
      }).filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const updateItemInstruction = (cartItemId: string, instruction: string) => {
    setCart(prev => prev.map(ci => ci.id === cartItemId ? { ...ci, specialInstructions: instruction } : ci));
  };

  // Group cart items into separate fulfillment groups
  const fulfillmentGroups: FulfillmentGroup[] = React.useMemo(() => {
    const groupMap: { [sellerKey: string]: FulfillmentGroup } = {};

    cart.forEach(item => {
      const key = `${item.serviceType}_${item.sellerId}`;
      if (!groupMap[key]) {
        groupMap[key] = {
          id: `fg_${key}`,
          serviceType: item.serviceType,
          sellerId: item.sellerId,
          sellerName: item.sellerName,
          sellerImage: item.image,
          sellerAddress: `${currentArea}, ${currentCity}`,
          items: [],
          subtotal: 0,
          stage: 'placed',
          estimatedDeliveryTime: item.serviceType === 'food' ? '25-30 mins' : '15-20 mins'
        };
      }
      groupMap[key].items.push(item);
      groupMap[key].subtotal += item.price * item.quantity;
    });

    return Object.values(groupMap);
  }, [cart, currentArea, currentCity]);

  // Financial calculations
  const cartFoodSubtotal = cart
    .filter(c => c.serviceType === 'food')
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const cartGrocerySubtotal = cart
    .filter(c => c.serviceType === 'grocery')
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const cartSubtotal = cartFoodSubtotal + cartGrocerySubtotal;

  const freeDeliveryRemaining = Math.max(0, BRAND_CONFIG.freeDeliveryThreshold - cartSubtotal);

  const cartDeliveryFee = cartSubtotal === 0 ? 0 : cartSubtotal >= BRAND_CONFIG.freeDeliveryThreshold ? 0 : BRAND_CONFIG.defaultDeliveryFee;

  const cartPlatformFee = cartSubtotal > 0 ? BRAND_CONFIG.platformFee : 0;

  let cartDiscount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrder) {
    if (appliedCoupon.discountType === 'flat') {
      cartDiscount = appliedCoupon.discountValue;
    } else {
      cartDiscount = Math.round((cartSubtotal * appliedCoupon.discountValue) / 100);
      if (appliedCoupon.maxDiscount) {
        cartDiscount = Math.min(cartDiscount, appliedCoupon.maxDiscount);
      }
    }
  }

  const taxableAmount = Math.max(0, cartSubtotal - cartDiscount);
  const cartTaxes = cartSubtotal > 0 ? Math.round(taxableAmount * BRAND_CONFIG.taxRate) : 0;

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartDeliveryFee + cartPlatformFee + cartTaxes);

  const applyCouponCode = async (code: string) => {
    const service = cartFoodSubtotal > 0 && cartGrocerySubtotal > 0 ? 'mixed' : (cartFoodSubtotal > 0 ? 'food' : 'grocery');
    const res = await api.coupons.apply(code, cartSubtotal, service);
    if (res.valid && res.coupon) {
      setAppliedCoupon(res.coupon);
      showToast({
        type: 'success',
        title: 'Coupon Applied!',
        message: `Saved ₹${res.discount} on your basket`
      });
      return { success: true, message: res.message };
    } else {
      showToast({
        type: 'error',
        title: 'Coupon Failed',
        message: res.message
      });
      return { success: false, message: res.message };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast({
      type: 'info',
      title: 'Coupon Removed'
    });
  };

  // Favorites
  const toggleFavorite = (type: 'restaurants' | 'stores' | 'products', id: string) => {
    setFavorites(prev => {
      const list = prev[type];
      const exists = list.includes(id);
      const updated = exists ? list.filter(item => item !== id) : [...list, id];
      showToast({
        type: 'info',
        title: exists ? 'Removed from favorites' : 'Saved to favorites'
      });
      return { ...prev, [type]: updated };
    });
  };

  const isFavorite = (type: 'restaurants' | 'stores' | 'products', id: string) => {
    return favorites[type].includes(id);
  };

  const resetDemoData = () => {
    db.resetToDefaultSeed();
    setCart([]);
    setAppliedCoupon(null);
    showToast({
      type: 'success',
      title: 'Demo Data Reset',
      message: 'Restored original seed database'
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        activeRole,
        switchRole,
        activeService,
        setActiveService,
        currentCity,
        currentArea,
        setLocation,
        isLocationModalOpen,
        setIsLocationModalOpen,
        currentView,
        navigateTo,
        viewParams,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        updateItemInstruction,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
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
        favorites,
        toggleFavorite,
        isFavorite,
        isSearchModalOpen,
        setIsSearchModalOpen,
        toasts,
        showToast,
        removeToast,
        activeOrderId,
        setActiveOrderId,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
