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
  OrderStage,
  StaplePriceTrend
} from '../types';
import {
  STAPLE_PRICE_TRENDS,
  getStapleTrendByProductId,
  getScenarioAdjustedTrend,
  ForecastScenario
} from '../data/priceTrendsData';
import {
  SEED_USERS,
  SEED_RESTAURANTS,
  SEED_FOOD_ITEMS,
  SEED_GROCERY_STORES,
  SEED_GROCERY_PRODUCTS,
  SEED_ORDERS,
  SEED_COUPONS,
  SEED_DELIVERY_PARTNERS,
  SEED_REVIEWS
} from '../data/seedData';

const STORAGE_KEYS = {
  USERS: 'qb_users',
  RESTAURANTS: 'qb_restaurants',
  FOOD_ITEMS: 'qb_food_items',
  GROCERY_STORES: 'qb_grocery_stores',
  GROCERY_PRODUCTS: 'qb_grocery_products',
  ORDERS: 'qb_orders',
  COUPONS: 'qb_coupons',
  DELIVERY_PARTNERS: 'qb_delivery_partners',
  REVIEWS: 'qb_reviews'
};

class DatabaseService {
  private users: User[] = [];
  private restaurants: Restaurant[] = [];
  private foodItems: FoodMenuItem[] = [];
  private groceryStores: GroceryStore[] = [];
  private groceryProducts: GroceryProduct[] = [];
  private orders: Order[] = [];
  private coupons: Coupon[] = [];
  private deliveryPartners: DeliveryPartner[] = [];
  private reviews: Review[] = [];

  constructor() {
    this.initDatabase();
  }

  private initDatabase() {
    try {
      this.users = this.loadOrSeed(STORAGE_KEYS.USERS, SEED_USERS);
      this.restaurants = this.loadOrSeed(STORAGE_KEYS.RESTAURANTS, SEED_RESTAURANTS);
      this.foodItems = this.loadOrSeed(STORAGE_KEYS.FOOD_ITEMS, SEED_FOOD_ITEMS);
      this.groceryStores = this.loadOrSeed(STORAGE_KEYS.GROCERY_STORES, SEED_GROCERY_STORES);
      this.groceryProducts = this.loadOrSeed(STORAGE_KEYS.GROCERY_PRODUCTS, SEED_GROCERY_PRODUCTS);
      this.orders = this.loadOrSeed(STORAGE_KEYS.ORDERS, SEED_ORDERS);
      this.coupons = this.loadOrSeed(STORAGE_KEYS.COUPONS, SEED_COUPONS);
      this.deliveryPartners = this.loadOrSeed(STORAGE_KEYS.DELIVERY_PARTNERS, SEED_DELIVERY_PARTNERS);
      this.reviews = this.loadOrSeed(STORAGE_KEYS.REVIEWS, SEED_REVIEWS);
    } catch {
      this.users = [...SEED_USERS];
      this.restaurants = [...SEED_RESTAURANTS];
      this.foodItems = [...SEED_FOOD_ITEMS];
      this.groceryStores = [...SEED_GROCERY_STORES];
      this.groceryProducts = [...SEED_GROCERY_PRODUCTS];
      this.orders = [...SEED_ORDERS];
      this.coupons = [...SEED_COUPONS];
      this.deliveryPartners = [...SEED_DELIVERY_PARTNERS];
      this.reviews = [...SEED_REVIEWS];
    }
  }

  private loadOrSeed<T>(key: string, seed: T[]): T[] {
    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(key, JSON.stringify(seed));
      return seed;
    }
    try {
      return JSON.parse(data) as T[];
    } catch {
      return seed;
    }
  }

  private persist(key: string, data: unknown) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // Storage quota or iframe restricted
    }
  }

  public resetToDefaultSeed() {
    this.users = [...SEED_USERS];
    this.restaurants = [...SEED_RESTAURANTS];
    this.foodItems = [...SEED_FOOD_ITEMS];
    this.groceryStores = [...SEED_GROCERY_STORES];
    this.groceryProducts = [...SEED_GROCERY_PRODUCTS];
    this.orders = [...SEED_ORDERS];
    this.coupons = [...SEED_COUPONS];
    this.deliveryPartners = [...SEED_DELIVERY_PARTNERS];
    this.reviews = [...SEED_REVIEWS];

    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    this.initDatabase();
  }

  // --- Users ---
  public getUsers(): User[] {
    return [...this.users];
  }

  public getUserById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }

  public updateUser(user: User): User {
    const idx = this.users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      this.users[idx] = user;
      this.persist(STORAGE_KEYS.USERS, this.users);
    }
    return user;
  }

  public toggleBlockUser(id: string): User | undefined {
    const user = this.getUserById(id);
    if (user) {
      user.status = user.status === 'active' ? 'blocked' : 'active';
      this.updateUser(user);
    }
    return user;
  }

  // --- Restaurants ---
  public getRestaurants(): Restaurant[] {
    return [...this.restaurants];
  }

  public getRestaurantById(id: string): Restaurant | undefined {
    return this.restaurants.find(r => r.id === id);
  }

  public saveRestaurant(restaurant: Restaurant): Restaurant {
    const idx = this.restaurants.findIndex(r => r.id === restaurant.id);
    if (idx !== -1) {
      this.restaurants[idx] = restaurant;
    } else {
      this.restaurants.push(restaurant);
    }
    this.persist(STORAGE_KEYS.RESTAURANTS, this.restaurants);
    return restaurant;
  }

  public deleteRestaurant(id: string): boolean {
    this.restaurants = this.restaurants.filter(r => r.id !== id);
    this.persist(STORAGE_KEYS.RESTAURANTS, this.restaurants);
    return true;
  }

  // --- Food Items ---
  public getFoodItems(restaurantId?: string): FoodMenuItem[] {
    if (restaurantId) {
      return this.foodItems.filter(f => f.restaurantId === restaurantId);
    }
    return [...this.foodItems];
  }

  public getFoodItemById(id: string): FoodMenuItem | undefined {
    return this.foodItems.find(f => f.id === id);
  }

  public saveFoodItem(item: FoodMenuItem): FoodMenuItem {
    const idx = this.foodItems.findIndex(f => f.id === item.id);
    if (idx !== -1) {
      this.foodItems[idx] = item;
    } else {
      this.foodItems.push(item);
    }
    this.persist(STORAGE_KEYS.FOOD_ITEMS, this.foodItems);
    return item;
  }

  public toggleFoodItemAvailability(id: string): boolean {
    const item = this.getFoodItemById(id);
    if (item) {
      item.isAvailable = !item.isAvailable;
      this.saveFoodItem(item);
      return item.isAvailable;
    }
    return false;
  }

  // --- Grocery Stores ---
  public getGroceryStores(): GroceryStore[] {
    return [...this.groceryStores];
  }

  public getGroceryStoreById(id: string): GroceryStore | undefined {
    return this.groceryStores.find(s => s.id === id);
  }

  public saveGroceryStore(store: GroceryStore): GroceryStore {
    const idx = this.groceryStores.findIndex(s => s.id === store.id);
    if (idx !== -1) {
      this.groceryStores[idx] = store;
    } else {
      this.groceryStores.push(store);
    }
    this.persist(STORAGE_KEYS.GROCERY_STORES, this.groceryStores);
    return store;
  }

  // --- Grocery Products & Inventory ---
  public getGroceryProducts(storeId?: string): GroceryProduct[] {
    if (storeId) {
      return this.groceryProducts.filter(p => p.storeId === storeId);
    }
    return [...this.groceryProducts];
  }

  public getGroceryProductById(id: string): GroceryProduct | undefined {
    return this.groceryProducts.find(p => p.id === id);
  }

  public saveGroceryProduct(product: GroceryProduct): GroceryProduct {
    // update status based on stock
    if (product.stock <= 0) {
      product.inventoryStatus = 'OUT_OF_STOCK';
    } else if (product.stock <= 4) {
      product.inventoryStatus = 'CRITICAL';
    } else if (product.stock <= product.reorderLevel) {
      product.inventoryStatus = 'LOW_STOCK';
    } else {
      product.inventoryStatus = 'HEALTHY';
    }

    const idx = this.groceryProducts.findIndex(p => p.id === product.id);
    if (idx !== -1) {
      this.groceryProducts[idx] = product;
    } else {
      this.groceryProducts.push(product);
    }
    this.persist(STORAGE_KEYS.GROCERY_PRODUCTS, this.groceryProducts);
    return product;
  }

  public restockProduct(id: string, additionalUnits: number): GroceryProduct | undefined {
    const product = this.getGroceryProductById(id);
    if (product) {
      product.stock += additionalUnits;
      product.restockDate = new Date().toISOString().split('T')[0];
      return this.saveGroceryProduct(product);
    }
    return undefined;
  }

  // --- Orders ---
  public getOrders(filters?: { customerId?: string; status?: OrderStage; serviceType?: string }): Order[] {
    let result = [...this.orders];
    if (filters?.customerId) {
      result = result.filter(o => o.customerId === filters.customerId);
    }
    if (filters?.status) {
      result = result.filter(o => o.orderStatus === filters.status);
    }
    if (filters?.serviceType && filters.serviceType !== 'all') {
      result = result.filter(o => o.serviceType === filters.serviceType || o.serviceType === 'mixed');
    }
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getOrderById(id: string): Order | undefined {
    return this.orders.find(o => o.id === id);
  }

  public createOrder(order: Order): Order {
    // Decrement inventory for grocery items
    order.fulfillmentGroups.forEach(fg => {
      if (fg.serviceType === 'grocery') {
        fg.items.forEach(ci => {
          const product = this.getGroceryProductById(ci.itemId);
          if (product) {
            product.stock = Math.max(0, product.stock - ci.quantity);
            product.unitsSold = (product.unitsSold || 0) + ci.quantity;
            this.saveGroceryProduct(product);
          }
        });
      }
    });

    this.orders.unshift(order);
    this.persist(STORAGE_KEYS.ORDERS, this.orders);

    // Update customer stats
    const customer = this.getUserById(order.customerId);
    if (customer) {
      customer.totalOrders = (customer.totalOrders || 0) + 1;
      customer.totalSpent = (customer.totalSpent || 0) + order.totalAmount;
      customer.lastOrderDate = order.createdAt;
      this.updateUser(customer);
    }

    return order;
  }

  public updateOrderStatus(orderId: string, stage: OrderStage): Order | undefined {
    const order = this.getOrderById(orderId);
    if (!order) return undefined;

    order.orderStatus = stage;
    const now = new Date().toISOString();

    if (stage === 'accepted' && !order.acceptedAt) order.acceptedAt = now;
    if (stage === 'preparing' && !order.preparedAt) order.preparedAt = now;
    if (stage === 'picked_up' && !order.pickedUpAt) order.pickedUpAt = now;
    if (stage === 'out_for_delivery' && !order.outForDeliveryAt) order.outForDeliveryAt = now;
    if (stage === 'delivered' && !order.deliveredAt) {
      order.deliveredAt = now;
      order.paymentStatus = 'SUCCESS';
    }
    if (stage === 'cancelled') {
      order.paymentStatus = 'REFUNDED';
      if (!order.cancellationReason) {
        order.cancellationReason = 'Cancelled by user request';
      }
    }

    // Update all fulfillment groups
    order.fulfillmentGroups.forEach(fg => {
      fg.stage = stage;
    });

    this.persist(STORAGE_KEYS.ORDERS, this.orders);
    return order;
  }

  // --- Delivery Partners ---
  public getDeliveryPartners(): DeliveryPartner[] {
    return [...this.deliveryPartners];
  }

  public getDeliveryPartnerById(id: string): DeliveryPartner | undefined {
    return this.deliveryPartners.find(dp => dp.id === id);
  }

  // --- Coupons ---
  public getCoupons(): Coupon[] {
    return [...this.coupons];
  }

  public applyCoupon(code: string, subtotal: number, service: 'food' | 'grocery' | 'mixed'): { valid: boolean; discount: number; message: string; coupon?: Coupon } {
    const coupon = this.coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!coupon) {
      return { valid: false, discount: 0, message: 'Invalid coupon code' };
    }

    if (subtotal < coupon.minOrder) {
      return { valid: false, discount: 0, message: `Minimum basket value must be ₹${coupon.minOrder}` };
    }

    if (coupon.serviceType !== 'all' && service !== 'mixed' && coupon.serviceType !== service) {
      return { valid: false, discount: 0, message: `This coupon is only valid on ${coupon.serviceType} items` };
    }

    let discount = 0;
    if (coupon.discountType === 'flat') {
      discount = coupon.discountValue;
    } else {
      discount = (subtotal * coupon.discountValue) / 100;
      if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount);
      }
    }

    discount = Math.min(discount, subtotal);
    return { valid: true, discount: Math.round(discount), message: `Coupon ${coupon.code} applied successfully!`, coupon };
  }

  // --- Reviews ---
  public getReviews(targetId?: string): Review[] {
    if (targetId) {
      return this.reviews.filter(r => r.targetId === targetId);
    }
    return [...this.reviews];
  }

  public addReview(review: Review): Review {
    this.reviews.unshift(review);
    this.persist(STORAGE_KEYS.REVIEWS, this.reviews);
    return review;
  }

  // =========================================================================
  // MONGODB-LIKE AGGREGATION ENGINE FOR BUSINESS INTELLIGENCE
  // =========================================================================

  private filterOrders(filters: AnalyticsFilter): Order[] {
    let list = [...this.orders];

    // 1. Date Range Filter
    const now = new Date();
    let startDate: Date | null = null;

    switch (filters.dateRange) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'yesterday':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        break;
      case 'last_7_days':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'last_30_days':
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'this_month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'last_month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        break;
      case 'this_year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
    }

    if (startDate) {
      list = list.filter(o => new Date(o.createdAt) >= startDate);
    }

    // 2. Service Filter
    if (filters.service && filters.service !== 'all') {
      list = list.filter(o => o.serviceType === filters.service || o.serviceType === 'mixed');
    }

    // 3. Restaurant Filter
    if (filters.restaurantId) {
      list = list.filter(o => o.fulfillmentGroups.some(fg => fg.sellerId === filters.restaurantId));
    }

    // 4. Store Filter
    if (filters.storeId) {
      list = list.filter(o => o.fulfillmentGroups.some(fg => fg.sellerId === filters.storeId));
    }

    // 5. City Filter
    if (filters.city) {
      list = list.filter(o => o.city === filters.city);
    }

    // 6. Payment Method Filter
    if (filters.paymentMethod) {
      list = list.filter(o => o.paymentMethod === filters.paymentMethod);
    }

    return list;
  }

  public getAnalyticsOverview(filters: AnalyticsFilter) {
    const orders = this.filterOrders(filters);
    const completedOrders = orders.filter(o => o.orderStatus === 'delivered');
    const cancelledOrders = orders.filter(o => o.orderStatus === 'cancelled');

    // Total Revenue (from completed orders)
    const totalRevenue = completedOrders.reduce((acc, o) => acc + o.totalAmount, 0);

    // Total Orders
    const totalOrders = orders.length;

    // AOV = Total Revenue / Completed Orders
    const aov = completedOrders.length > 0 ? Math.round(totalRevenue / completedOrders.length) : 0;

    // Cancellation Rate = Cancelled / Total * 100
    const cancellationRate = totalOrders > 0 ? Number(((cancelledOrders.length / totalOrders) * 100).toFixed(1)) : 0;

    // Retention Rate: customers with > 1 order / total customers * 100
    const customerOrderCounts: { [custId: string]: number } = {};
    orders.forEach(o => {
      customerOrderCounts[o.customerId] = (customerOrderCounts[o.customerId] || 0) + 1;
    });
    const uniqueCustomerCount = Object.keys(customerOrderCounts).length;
    const repeatCustomerCount = Object.values(customerOrderCounts).filter(c => c > 1).length;
    const retentionRate = uniqueCustomerCount > 0 ? Number(((repeatCustomerCount / uniqueCustomerCount) * 100).toFixed(1)) : 0;

    // CLV: Historical customer spend average
    const clv = uniqueCustomerCount > 0 ? Math.round(totalRevenue / uniqueCustomerCount) : 0;

    // Average Delivery Time
    let totalDeliveryMins = 0;
    let deliveredWithTimestamps = 0;
    completedOrders.forEach(o => {
      if (o.deliveredAt && o.createdAt) {
        const diffMs = new Date(o.deliveredAt).getTime() - new Date(o.createdAt).getTime();
        const mins = Math.round(diffMs / (60 * 1000));
        if (mins > 5 && mins < 120) {
          totalDeliveryMins += mins;
          deliveredWithTimestamps++;
        }
      }
    });
    const avgDeliveryTimeMin = deliveredWithTimestamps > 0 ? Math.round(totalDeliveryMins / deliveredWithTimestamps) : 26;

    // Grocery inventory alerts
    const lowStockCount = this.groceryProducts.filter(p => p.inventoryStatus === 'LOW_STOCK' || p.inventoryStatus === 'CRITICAL').length;
    const outOfStockCount = this.groceryProducts.filter(p => p.inventoryStatus === 'OUT_OF_STOCK').length;

    // Food vs Grocery revenue
    let foodRevenue = 0;
    let groceryRevenue = 0;
    completedOrders.forEach(o => {
      o.fulfillmentGroups.forEach(fg => {
        if (fg.serviceType === 'food') foodRevenue += fg.subtotal;
        if (fg.serviceType === 'grocery') groceryRevenue += fg.subtotal;
      });
    });
    const totalSplit = foodRevenue + groceryRevenue || 1;
    const foodRevenuePercent = Math.round((foodRevenue / totalSplit) * 100);
    const groceryRevenuePercent = 100 - foodRevenuePercent;

    // Sales Trend by day (grouping by date)
    const salesMap: { [dateStr: string]: { date: string; revenue: number; orders: number; completed: number; cancelled: number } } = {};
    orders.forEach(o => {
      const d = o.createdAt.split('T')[0];
      if (!salesMap[d]) {
        salesMap[d] = { date: d.slice(5), revenue: 0, orders: 0, completed: 0, cancelled: 0 };
      }
      salesMap[d].orders += 1;
      if (o.orderStatus === 'delivered') {
        salesMap[d].revenue += o.totalAmount;
        salesMap[d].completed += 1;
      }
      if (o.orderStatus === 'cancelled') {
        salesMap[d].cancelled += 1;
      }
    });
    const salesTrend = Object.values(salesMap).sort((a, b) => a.date.localeCompare(b.date));

    // Revenue by payment method
    const paymentMap: { [method: string]: number } = {};
    completedOrders.forEach(o => {
      paymentMap[o.paymentMethod] = (paymentMap[o.paymentMethod] || 0) + o.totalAmount;
    });
    const paymentBreakdown = Object.entries(paymentMap).map(([method, amount]) => ({
      name: method,
      value: amount
    }));

    return {
      totalRevenue,
      totalOrders,
      aov,
      cancellationRate,
      retentionRate,
      clv,
      avgDeliveryTimeMin,
      inventoryAlerts: lowStockCount + outOfStockCount,
      lowStockCount,
      outOfStockCount,
      foodRevenue,
      groceryRevenue,
      foodRevenuePercent,
      groceryRevenuePercent,
      salesTrend,
      paymentBreakdown,
      customersCount: uniqueCustomerCount
    };
  }

  public getCustomerAnalytics(filters: AnalyticsFilter) {
    const orders = this.filterOrders(filters);
    const completedOrders = orders.filter(o => o.orderStatus === 'delivered');

    // Aggregate spend and order count per user
    const userMetrics: { [userId: string]: { name: string; email: string; orders: number; totalSpent: number; lastOrder: string } } = {};
    
    completedOrders.forEach(o => {
      if (!userMetrics[o.customerId]) {
        userMetrics[o.customerId] = {
          name: o.customerName,
          email: `${o.customerName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
          orders: 0,
          totalSpent: 0,
          lastOrder: o.createdAt
        };
      }
      userMetrics[o.customerId].orders += 1;
      userMetrics[o.customerId].totalSpent += o.totalAmount;
      if (new Date(o.createdAt) > new Date(userMetrics[o.customerId].lastOrder)) {
        userMetrics[o.customerId].lastOrder = o.createdAt;
      }
    });

    const customerList = Object.entries(userMetrics).map(([id, data]) => {
      const aov = data.orders > 0 ? Math.round(data.totalSpent / data.orders) : 0;
      let segment: 'vip' | 'high_value' | 'regular' | 'new' | 'at_risk' = 'regular';
      if (data.totalSpent > 5000 || data.orders >= 8) segment = 'vip';
      else if (data.totalSpent > 2500 || data.orders >= 4) segment = 'high_value';
      else if (data.orders <= 1) segment = 'new';

      return {
        id,
        name: data.name,
        email: data.email,
        orders: data.orders,
        revenue: data.totalSpent,
        aov,
        clv: Math.round(data.totalSpent * 1.8),
        lastOrder: data.lastOrder,
        segment
      };
    }).sort((a, b) => b.revenue - a.revenue);

    // Segment counts
    const segmentCounts = {
      vip: customerList.filter(c => c.segment === 'vip').length,
      high_value: customerList.filter(c => c.segment === 'high_value').length,
      regular: customerList.filter(c => c.segment === 'regular').length,
      new: customerList.filter(c => c.segment === 'new').length,
      at_risk: 1
    };

    // Cohort retention rates (simulation grounded in realistic commerce patterns)
    const cohortData = [
      { cohort: 'May 2026', size: 120, m0: 100, m1: 42, m2: 36, m3: 31, m4: 28 },
      { cohort: 'Jun 2026', size: 145, m0: 100, m1: 45, m2: 39, m3: 34, m4: 31 },
      { cohort: 'Jul 2026', size: 180, m0: 100, m1: 48, m2: 41, m3: 38, m4: null },
      { cohort: 'Aug 2026', size: 210, m0: 100, m1: 52, m2: 44, m3: null, m4: null },
      { cohort: 'Sep 2026', size: 260, m0: 100, m1: 54, m2: null, m3: null, m4: null }
    ];

    return {
      customerList,
      segmentCounts,
      cohortData
    };
  }

  public getTopProducts(filters: AnalyticsFilter) {
    const orders = this.filterOrders(filters);
    const completedOrders = orders.filter(o => o.orderStatus === 'delivered');

    const productMap: {
      [id: string]: {
        id: string;
        name: string;
        category: string;
        serviceType: 'food' | 'grocery';
        unitsSold: number;
        revenue: number;
        ordersCount: number;
      };
    } = {};

    completedOrders.forEach(o => {
      o.fulfillmentGroups.forEach(fg => {
        fg.items.forEach(ci => {
          if (!productMap[ci.itemId]) {
            productMap[ci.itemId] = {
              id: ci.itemId,
              name: ci.name,
              category: ci.serviceType === 'food' ? 'Meals' : 'Essentials',
              serviceType: ci.serviceType,
              unitsSold: 0,
              revenue: 0,
              ordersCount: 0
            };
          }
          productMap[ci.itemId].unitsSold += ci.quantity;
          productMap[ci.itemId].revenue += ci.price * ci.quantity;
          productMap[ci.itemId].ordersCount += 1;
        });
      });
    });

    const list = Object.values(productMap).sort((a, b) => b.unitsSold - a.unitsSold);
    return list;
  }

  public getRestaurantPerformance(filters: AnalyticsFilter) {
    const orders = this.filterOrders(filters);

    return this.restaurants.map(rest => {
      const restOrders = orders.filter(o => o.fulfillmentGroups.some(fg => fg.sellerId === rest.id));
      const completed = restOrders.filter(o => o.orderStatus === 'delivered');
      const cancelled = restOrders.filter(o => o.orderStatus === 'cancelled');

      let revenue = 0;
      completed.forEach(o => {
        const fg = o.fulfillmentGroups.find(g => g.sellerId === rest.id);
        if (fg) revenue += fg.subtotal;
      });

      const aov = completed.length > 0 ? Math.round(revenue / completed.length) : 0;
      const cancellationRate = restOrders.length > 0 ? Number(((cancelled.length / restOrders.length) * 100).toFixed(1)) : 0;

      return {
        id: rest.id,
        name: rest.name,
        cuisines: rest.cuisines.join(', '),
        orders: restOrders.length,
        completedOrders: completed.length,
        revenue,
        aov,
        rating: rest.rating,
        avgDeliveryTime: rest.deliveryTimeMin + 4,
        cancellationRate
      };
    }).sort((a, b) => b.revenue - a.revenue);
  }

  public getPeakHoursData(filters: AnalyticsFilter) {
    const orders = this.filterOrders(filters);
    const hourSlots = [
      { hour: '8 AM', count: 0, revenue: 0 },
      { hour: '10 AM', count: 0, revenue: 0 },
      { hour: '12 PM', count: 0, revenue: 0 },
      { hour: '2 PM', count: 0, revenue: 0 },
      { hour: '4 PM', count: 0, revenue: 0 },
      { hour: '6 PM', count: 0, revenue: 0 },
      { hour: '8 PM', count: 0, revenue: 0 },
      { hour: '10 PM', count: 0, revenue: 0 }
    ];

    orders.forEach(o => {
      const d = new Date(o.createdAt);
      const h = d.getHours();
      let slotIdx = 3; // default
      if (h <= 9) slotIdx = 0;
      else if (h <= 11) slotIdx = 1;
      else if (h <= 13) slotIdx = 2;
      else if (h <= 15) slotIdx = 3;
      else if (h <= 17) slotIdx = 4;
      else if (h <= 19) slotIdx = 5;
      else if (h <= 21) slotIdx = 6;
      else slotIdx = 7;

      hourSlots[slotIdx].count += 1;
      hourSlots[slotIdx].revenue += o.totalAmount;
    });

    return hourSlots;
  }

  public getCancellationAnalytics(filters: AnalyticsFilter) {
    const orders = this.filterOrders(filters);
    const cancelled = orders.filter(o => o.orderStatus === 'cancelled');

    const reasonsMap: { [reason: string]: number } = {};
    cancelled.forEach(o => {
      const r = o.cancellationReason || 'Other reasons';
      reasonsMap[r] = (reasonsMap[r] || 0) + 1;
    });

    const reasonsBreakdown = Object.entries(reasonsMap).map(([reason, count]) => ({
      name: reason,
      count,
      percentage: Math.round((count / (cancelled.length || 1)) * 100)
    }));

    return {
      totalOrders: orders.length,
      cancelledCount: cancelled.length,
      cancellationRate: orders.length > 0 ? Number(((cancelled.length / orders.length) * 100).toFixed(1)) : 0,
      reasonsBreakdown
    };
  }

  // --- Staple Price Trends & Fluctuation Predictive Engine ---
  public getStaplePriceTrends(scenario: ForecastScenario = 'baseline'): StaplePriceTrend[] {
    return STAPLE_PRICE_TRENDS.map(trend => getScenarioAdjustedTrend(trend, scenario));
  }

  public getStaplePriceTrendByProductId(productId: string, scenario: ForecastScenario = 'baseline'): StaplePriceTrend | undefined {
    const found = getStapleTrendByProductId(productId);
    if (!found) return undefined;
    return getScenarioAdjustedTrend(found, scenario);
  }

  public savePriceAlert(productId: string, targetPrice: number, userEmail?: string): { id: string; productId: string; targetPrice: number; createdAt: string } {
    const alertsKey = 'qb_price_alerts';
    const existing = (() => {
      try {
        const raw = localStorage.getItem(alertsKey);
        return raw ? JSON.parse(raw) : [];
      } catch {
        return [];
      }
    })();

    const newAlert = {
      id: `alert_${Date.now()}`,
      productId,
      targetPrice,
      userEmail: userEmail || 'user@example.com',
      createdAt: new Date().toISOString()
    };

    existing.push(newAlert);
    this.persist(alertsKey, existing);
    return newAlert;
  }

  public getPriceAlerts(): { id: string; productId: string; targetPrice: number; createdAt: string }[] {
    try {
      const raw = localStorage.getItem('qb_price_alerts');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}

export const db = new DatabaseService();
