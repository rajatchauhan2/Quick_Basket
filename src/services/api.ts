import { db } from './dbService';
import {
  User,
  Restaurant,
  FoodMenuItem,
  GroceryStore,
  GroceryProduct,
  Order,
  Coupon,
  DeliveryPartner,
  Review,
  AnalyticsFilter,
  OrderStage
} from '../types';

// Simulated delay helper for realistic feel
const simulateLatency = (ms: number = 80) => new Promise(res => setTimeout(res, ms));

export const api = {
  auth: {
    login: async (email: string): Promise<User> => {
      await simulateLatency();
      const users = db.getUsers();
      const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (found) return found;
      // Default fallback
      return users[0];
    },
    switchRoleUser: async (role: string): Promise<User> => {
      await simulateLatency();
      const users = db.getUsers();
      const user = users.find(u => u.role === role) || users[0];
      return user;
    }
  },

  users: {
    getProfile: async (id: string): Promise<User | undefined> => {
      await simulateLatency();
      return db.getUserById(id);
    },
    updateProfile: async (user: User): Promise<User> => {
      await simulateLatency();
      return db.updateUser(user);
    },
    getAll: async (): Promise<User[]> => {
      await simulateLatency();
      return db.getUsers();
    },
    toggleBlock: async (id: string): Promise<User | undefined> => {
      await simulateLatency();
      return db.toggleBlockUser(id);
    }
  },

  restaurants: {
    getAll: async (): Promise<Restaurant[]> => {
      await simulateLatency();
      return db.getRestaurants();
    },
    getById: async (id: string): Promise<Restaurant | undefined> => {
      await simulateLatency();
      return db.getRestaurantById(id);
    },
    save: async (restaurant: Restaurant): Promise<Restaurant> => {
      await simulateLatency();
      return db.saveRestaurant(restaurant);
    },
    delete: async (id: string): Promise<boolean> => {
      await simulateLatency();
      return db.deleteRestaurant(id);
    },
    getMenu: async (restaurantId: string): Promise<FoodMenuItem[]> => {
      await simulateLatency();
      return db.getFoodItems(restaurantId);
    },
    toggleItemAvailable: async (itemId: string): Promise<boolean> => {
      await simulateLatency();
      return db.toggleFoodItemAvailability(itemId);
    }
  },

  grocery: {
    getStores: async (): Promise<GroceryStore[]> => {
      await simulateLatency();
      return db.getGroceryStores();
    },
    getStoreById: async (id: string): Promise<GroceryStore | undefined> => {
      await simulateLatency();
      return db.getGroceryStoreById(id);
    },
    getProducts: async (storeId?: string): Promise<GroceryProduct[]> => {
      await simulateLatency();
      return db.getGroceryProducts(storeId);
    },
    getProductById: async (id: string): Promise<GroceryProduct | undefined> => {
      await simulateLatency();
      return db.getGroceryProductById(id);
    },
    saveProduct: async (product: GroceryProduct): Promise<GroceryProduct> => {
      await simulateLatency();
      return db.saveGroceryProduct(product);
    },
    restock: async (id: string, units: number): Promise<GroceryProduct | undefined> => {
      await simulateLatency();
      return db.restockProduct(id, units);
    },
    getStaplePriceTrends: async (scenario?: 'baseline' | 'festive_surge' | 'bumper_harvest') => {
      await simulateLatency();
      return db.getStaplePriceTrends(scenario);
    },
    getStaplePriceTrendByProductId: async (productId: string, scenario?: 'baseline' | 'festive_surge' | 'bumper_harvest') => {
      await simulateLatency();
      return db.getStaplePriceTrendByProductId(productId, scenario);
    },
    savePriceAlert: async (productId: string, targetPrice: number, userEmail?: string) => {
      await simulateLatency();
      return db.savePriceAlert(productId, targetPrice, userEmail);
    }
  },

  orders: {
    getAll: async (filters?: { customerId?: string; status?: OrderStage; serviceType?: string }): Promise<Order[]> => {
      await simulateLatency();
      return db.getOrders(filters);
    },
    getById: async (id: string): Promise<Order | undefined> => {
      await simulateLatency();
      return db.getOrderById(id);
    },
    create: async (order: Order): Promise<Order> => {
      await simulateLatency(120);
      return db.createOrder(order);
    },
    updateStatus: async (orderId: string, stage: OrderStage): Promise<Order | undefined> => {
      await simulateLatency();
      return db.updateOrderStatus(orderId, stage);
    }
  },

  coupons: {
    getAll: async (): Promise<Coupon[]> => {
      await simulateLatency();
      return db.getCoupons();
    },
    apply: async (code: string, subtotal: number, service: 'food' | 'grocery' | 'mixed') => {
      await simulateLatency();
      return db.applyCoupon(code, subtotal, service);
    }
  },

  delivery: {
    getPartners: async (): Promise<DeliveryPartner[]> => {
      await simulateLatency();
      return db.getDeliveryPartners();
    },
    getPartnerById: async (id: string): Promise<DeliveryPartner | undefined> => {
      await simulateLatency();
      return db.getDeliveryPartnerById(id);
    }
  },

  reviews: {
    getByTarget: async (targetId: string): Promise<Review[]> => {
      await simulateLatency();
      return db.getReviews(targetId);
    },
    add: async (review: Review): Promise<Review> => {
      await simulateLatency();
      return db.addReview(review);
    }
  },

  analytics: {
    getOverview: async (filters: AnalyticsFilter) => {
      await simulateLatency(100);
      return db.getAnalyticsOverview(filters);
    },
    getCustomers: async (filters: AnalyticsFilter) => {
      await simulateLatency(100);
      return db.getCustomerAnalytics(filters);
    },
    getProducts: async (filters: AnalyticsFilter) => {
      await simulateLatency(100);
      return db.getTopProducts(filters);
    },
    getRestaurants: async (filters: AnalyticsFilter) => {
      await simulateLatency(100);
      return db.getRestaurantPerformance(filters);
    },
    getPeakHours: async (filters: AnalyticsFilter) => {
      await simulateLatency(80);
      return db.getPeakHoursData(filters);
    },
    getCancellations: async (filters: AnalyticsFilter) => {
      await simulateLatency(80);
      return db.getCancellationAnalytics(filters);
    }
  }
};
