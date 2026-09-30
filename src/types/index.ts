export type UserRole = 'customer' | 'admin' | 'restaurant_owner' | 'grocery_owner' | 'delivery_partner';

export type ServiceType = 'food' | 'grocery' | 'all';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  restaurantId?: string;
  groceryStoreId?: string;
  deliveryPartnerId?: string;
  addresses?: Address[];
  createdAt: string;
  status: 'active' | 'blocked';
  // Analytics fields
  totalOrders?: number;
  totalSpent?: number;
  clv?: number;
  segment?: 'new' | 'regular' | 'high_value' | 'vip' | 'at_risk' | 'inactive';
  lastOrderDate?: string;
}

export interface Address {
  id: string;
  userId: string;
  type: 'home' | 'work' | 'other';
  street: string;
  landmark?: string;
  area: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  image: string;
  logo: string;
  rating: number;
  reviewCount: number;
  cuisines: string[];
  deliveryTimeMin: number;
  deliveryTimeMax: number;
  distanceKm: number;
  priceForTwo: number;
  deliveryFee: number;
  offers: string[];
  isPureVeg: boolean;
  isOpen: boolean;
  openingHours: string;
  about: string;
  area: string;
  city: string;
  featured?: boolean;
}

export interface CustomizationGroup {
  id: string;
  title: string;
  required: boolean;
  type: 'single' | 'multiple';
  options: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface FoodMenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  category: string; // e.g. "Starters", "Main Course", "Biryani", "Pizza", "Beverages"
  image: string;
  isVeg: boolean;
  isBestseller?: boolean;
  rating: number;
  customizationGroups?: CustomizationGroup[];
  isAvailable: boolean;
}

export interface GroceryStore {
  id: string;
  name: string;
  tagline: string;
  image: string;
  logo: string;
  rating: number;
  reviewCount: number;
  deliveryTimeMin: number;
  deliveryTimeMax: number;
  distanceKm: number;
  minOrder: number;
  deliveryFee: number;
  offers: string[];
  isOpen: boolean;
  openingHours: string;
  area: string;
  city: string;
}

export type InventoryStatus = 'HEALTHY' | 'LOW_STOCK' | 'CRITICAL' | 'OUT_OF_STOCK';

export interface GroceryProduct {
  id: string;
  storeId: string;
  brand: string;
  name: string;
  weight: string;
  mrp: number;
  sellingPrice: number;
  discountPercentage: number;
  category: string;
  image: string;
  description: string;
  // Inventory fields
  stock: number;
  reorderLevel: number;
  maxStock: number;
  supplier: string;
  restockDate: string;
  expiryDate?: string;
  inventoryStatus: InventoryStatus;
  isOrganic?: boolean;
  unitsSold?: number;
}

export interface SelectedCustomization {
  groupId: string;
  groupTitle: string;
  optionId: string;
  optionName: string;
  price: number;
}

export interface CartItem {
  id: string; // unique cart item id
  itemId: string; // food or grocery product id
  serviceType: 'food' | 'grocery';
  sellerId: string; // restaurantId or storeId
  sellerName: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  weightOrSize?: string;
  isVeg?: boolean;
  selectedCustomizations?: SelectedCustomization[];
  specialInstructions?: string;
}

export type OrderStage = 
  | 'placed' 
  | 'accepted' 
  | 'preparing' // or 'packing' for grocery
  | 'rider_assigned' 
  | 'picked_up' 
  | 'out_for_delivery' 
  | 'delivered'
  | 'cancelled';

export interface FulfillmentGroup {
  id: string;
  serviceType: 'food' | 'grocery';
  sellerId: string;
  sellerName: string;
  sellerImage: string;
  sellerAddress: string;
  items: CartItem[];
  subtotal: number;
  stage: OrderStage;
  estimatedDeliveryTime: string;
  deliveryPartnerId?: string;
  deliveryPartnerName?: string;
  deliveryPartnerPhone?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  serviceType: 'food' | 'grocery' | 'mixed';
  fulfillmentGroups: FulfillmentGroup[];
  itemsCount: number;
  subtotal: number;
  discount: number;
  couponCode?: string;
  deliveryFee: number;
  platformFee: number;
  taxes: number;
  totalAmount: number;
  deliveryAddress: Address;
  deliveryInstructions?: string;
  paymentMethod: 'UPI' | 'CARD' | 'NET_BANKING' | 'WALLET' | 'COD';
  paymentStatus: 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  orderStatus: OrderStage;
  cancellationReason?: string;
  deliveryPartnerId?: string;
  deliveryPartnerName?: string;
  deliveryPartnerPhone?: string;
  createdAt: string;
  acceptedAt?: string;
  preparedAt?: string;
  pickedUpAt?: string;
  outForDeliveryAt?: string;
  deliveredAt?: string;
  city: string;
  area: string;
}

export interface Coupon {
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrder: number;
  maxDiscount?: number;
  serviceType: 'all' | 'food' | 'grocery';
  validUntil: string;
}

export interface DeliveryPartner {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  vehicleType: string;
  vehicleNumber: string;
  rating: number;
  totalDeliveries: number;
  status: 'available' | 'on_delivery' | 'offline';
  todayEarnings: number;
  weekEarnings: number;
  averageDeliveryTimeMin: number;
  onTimeRate: number;
}

export interface Review {
  id: string;
  targetId: string; // restaurantId, storeId, foodId, or productId
  targetType: 'restaurant' | 'store' | 'food' | 'grocery';
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AnalyticsFilter {
  dateRange: 'today' | 'yesterday' | 'last_7_days' | 'last_30_days' | 'this_month' | 'last_month' | 'this_year';
  service: 'all' | 'food' | 'grocery';
  restaurantId?: string;
  storeId?: string;
  city?: string;
  paymentMethod?: string;
}

export interface PriceDataPoint {
  date: string;
  displayDate: string;
  timestamp: number;
  actualPrice?: number;
  mandiPrice?: number;
  predictedPrice?: number;
  predictedLower?: number;
  predictedUpper?: number;
  isForecast?: boolean;
  eventNote?: string;
}

export interface MarketSignalDriver {
  title: string;
  impact: 'positive' | 'negative' | 'neutral';
  factor: string;
  description: string;
}

export interface StaplePriceTrend {
  productId: string;
  productName: string;
  brand: string;
  category: string;
  unit: string;
  currentPrice: number;
  mrp: number;
  image: string;
  storeId: string;
  storeName: string;
  predictedPrice30d: number;
  predictedChangePercent: number;
  trendDirection: 'falling' | 'rising' | 'stable';
  recommendation: 'BUY_NOW' | 'WAIT_AND_SAVE' | 'STABLE_BUY';
  recommendationTitle: string;
  recommendationReason: string;
  confidenceScore: number;
  volatilityIndex: 'Low' | 'Moderate' | 'High';
  lowestPrice6m: number;
  highestPrice6m: number;
  averagePrice6m: number;
  marketDrivers: MarketSignalDriver[];
  priceHistory: PriceDataPoint[];
}

export interface RecipeIngredient {
  productId: string;
  name: string;
  brand: string;
  quantityNeeded: string;
  price: number;
  weight: string;
  image: string;
  isPantryStaple?: boolean;
}

export interface SmartRecipe {
  id: string;
  title: string;
  subtitle: string;
  cuisine: string;
  prepTimeMin: number;
  cookTimeMin: number;
  servings: number;
  caloriesPerServing: number;
  difficulty: 'Easy' | 'Medium' | 'Intermediate';
  dietType: 'Vegetarian' | 'Vegan' | 'Gluten-Free' | 'High-Protein';
  image: string;
  description: string;
  tags: string[];
  ingredients: RecipeIngredient[];
  instructions: string[];
  chefTip?: string;
  nutritionInfo?: {
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
  };
}
