import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LocationModal } from './components/common/LocationModal';
import { SearchModal } from './components/common/SearchModal';
import { ToastContainer } from './components/common/ToastContainer';
import { SmartBasketDrawer } from './components/customer/SmartBasketDrawer';
import { HeroSection } from './components/customer/HeroSection';
import { FoodMarketplace } from './components/customer/FoodMarketplace';
import { GroceryMarketplace } from './components/customer/GroceryMarketplace';
import { RestaurantDetailPage } from './components/customer/RestaurantDetailPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderConfirmationPage } from './components/checkout/OrderConfirmationPage';
import { OrderTrackingPage } from './components/tracking/OrderTrackingPage';
import { UserProfilePage } from './components/profile/UserProfilePage';
import { OffersPage } from './components/profile/OffersPage';
import { AdminLayout } from './components/admin/AdminLayout';
import { RestaurantOwnerPortal } from './components/merchant/RestaurantOwnerPortal';
import { GroceryOwnerPortal } from './components/merchant/GroceryOwnerPortal';
import { DeliveryPartnerPortal } from './components/delivery/DeliveryPartnerPortal';

const AppContent: React.FC = () => {
  const { activeRole, currentView, activeService } = useApp();

  // If in enterprise/partner roles, render dedicated full-screen dashboards
  if (activeRole === 'admin') {
    return (
      <>
        <AdminLayout />
        <ToastContainer />
      </>
    );
  }

  if (activeRole === 'restaurant_owner') {
    return (
      <>
        <RestaurantOwnerPortal />
        <ToastContainer />
      </>
    );
  }

  if (activeRole === 'grocery_owner') {
    return (
      <>
        <GroceryOwnerPortal />
        <ToastContainer />
      </>
    );
  }

  if (activeRole === 'delivery_partner') {
    return (
      <>
        <DeliveryPartnerPortal />
        <ToastContainer />
      </>
    );
  }

  // Customer Marketplace Shell
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Universal Top Navigation */}
      <Navbar />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroSection />
            {activeService === 'food' && <FoodMarketplace />}
            {activeService === 'grocery' && <GroceryMarketplace />}
            {activeService === 'all' && (
              <>
                <FoodMarketplace />
                <div className="w-full border-t border-slate-200 my-4" />
                <GroceryMarketplace />
              </>
            )}
          </>
        )}

        {currentView === 'food_market' && <FoodMarketplace />}
        {currentView === 'grocery_market' && <GroceryMarketplace />}
        {currentView === 'restaurant_detail' && <RestaurantDetailPage />}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'order_confirmation' && <OrderConfirmationPage />}
        {currentView === 'order_tracking' && <OrderTrackingPage />}
        {currentView === 'profile' && <UserProfilePage />}
        {currentView === 'orders_history' && <UserProfilePage />}
        {currentView === 'favorites' && <UserProfilePage />}
        {currentView === 'offers' && <OffersPage />}
      </main>

      {/* Universal Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <SmartBasketDrawer />
      <SearchModal />
      <LocationModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
