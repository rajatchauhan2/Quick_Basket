import {
  User,
  Restaurant,
  FoodMenuItem,
  GroceryStore,
  GroceryProduct,
  Order,
  Coupon,
  DeliveryPartner,
  Review
} from '../types';

export const SEED_USERS: User[] = [
  {
    id: 'user_cust_1',
    name: 'Rajat Chauhan',
    email: 'rajat@example.com',
    phone: '+91 98765 43210',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    createdAt: '2026-01-15T10:00:00.000Z',
    status: 'active',
    totalOrders: 14,
    totalSpent: 8450,
    clv: 18500,
    segment: 'vip',
    lastOrderDate: '2026-09-28T19:30:00.000Z',
    addresses: [
      {
        id: 'addr_1',
        userId: 'user_cust_1',
        type: 'home',
        street: 'Flat 402, Oakwood Heights, 12th Main',
        area: 'Indiranagar',
        city: 'Bengaluru',
        pincode: '560038',
        landmark: 'Near 100 Feet Road Metro',
        isDefault: true
      },
      {
        id: 'addr_2',
        userId: 'user_cust_1',
        type: 'work',
        street: 'Tech Park Tower B, 4th Floor',
        area: 'Whitefield',
        city: 'Bengaluru',
        pincode: '560066',
        landmark: 'Near EPIP Zone',
        isDefault: false
      }
    ]
  },
  {
    id: 'user_admin',
    name: 'Ananya Sharma (Admin)',
    email: 'admin@quickbasket.in',
    phone: '+91 98111 00000',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    createdAt: '2025-11-01T08:00:00.000Z',
    status: 'active'
  },
  {
    id: 'user_rest_owner_1',
    name: 'Vikram Malhotra',
    email: 'vikram@urbantadka.com',
    phone: '+91 99201 11223',
    role: 'restaurant_owner',
    restaurantId: 'rest_1',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    createdAt: '2025-12-01T08:00:00.000Z',
    status: 'active'
  },
  {
    id: 'user_groc_owner_1',
    name: 'Suresh Patel',
    email: 'suresh@freshmart.com',
    phone: '+91 98334 55667',
    role: 'grocery_owner',
    groceryStoreId: 'store_1',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    createdAt: '2025-12-05T08:00:00.000Z',
    status: 'active'
  },
  {
    id: 'user_rider_1',
    name: 'Karthik Raja',
    email: 'karthik.rider@quickbasket.in',
    phone: '+91 97412 88990',
    role: 'delivery_partner',
    deliveryPartnerId: 'dp_1',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    createdAt: '2026-01-02T08:00:00.000Z',
    status: 'active'
  },
  {
    id: 'user_cust_2',
    name: 'Priya Sundaram',
    email: 'priya.s@example.com',
    phone: '+91 98451 22334',
    role: 'customer',
    createdAt: '2026-02-10T11:00:00.000Z',
    status: 'active',
    totalOrders: 11,
    totalSpent: 6240,
    clv: 14200,
    segment: 'high_value',
    lastOrderDate: '2026-09-27T14:15:00.000Z'
  },
  {
    id: 'user_cust_3',
    name: 'Arjun Nambiar',
    email: 'arjun.n@example.com',
    phone: '+91 99001 44556',
    role: 'customer',
    createdAt: '2026-03-01T14:00:00.000Z',
    status: 'active',
    totalOrders: 6,
    totalSpent: 2890,
    clv: 7800,
    segment: 'regular',
    lastOrderDate: '2026-09-26T20:45:00.000Z'
  },
  {
    id: 'user_cust_4',
    name: 'Sneha Kulkarni',
    email: 'sneha.k@example.com',
    phone: '+91 97665 11223',
    role: 'customer',
    createdAt: '2026-09-15T09:30:00.000Z',
    status: 'active',
    totalOrders: 2,
    totalSpent: 980,
    clv: 3500,
    segment: 'new',
    lastOrderDate: '2026-09-25T12:30:00.000Z'
  },
  {
    id: 'user_cust_5',
    name: 'Rohan Mehra',
    email: 'rohan.m@example.com',
    phone: '+91 98199 88776',
    role: 'customer',
    createdAt: '2026-01-20T10:00:00.000Z',
    status: 'active',
    totalOrders: 4,
    totalSpent: 1650,
    clv: 4200,
    segment: 'at_risk',
    lastOrderDate: '2026-07-14T21:00:00.000Z'
  },
  {
    id: 'user_cust_6',
    name: 'Devika Pillai',
    email: 'devika.p@example.com',
    phone: '+91 94471 33445',
    role: 'customer',
    createdAt: '2026-01-05T08:00:00.000Z',
    status: 'active',
    totalOrders: 1,
    totalSpent: 420,
    clv: 1200,
    segment: 'inactive',
    lastOrderDate: '2026-04-10T19:00:00.000Z'
  }
];

export const SEED_RESTAURANTS: Restaurant[] = [
  {
    id: 'rest_1',
    name: 'Urban Tadka',
    tagline: 'Authentic North Indian curries & tandoor delights',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=120&auto=format&fit=crop&q=80',
    rating: 4.6,
    reviewCount: 1420,
    cuisines: ['North Indian', 'Mughlai', 'Tandoor'],
    deliveryTimeMin: 25,
    deliveryTimeMax: 30,
    distanceKm: 2.1,
    priceForTwo: 450,
    deliveryFee: 30,
    offers: ['20% OFF up to ₹100', 'Free Gulab Jamun on orders > ₹599'],
    isPureVeg: false,
    isOpen: true,
    openingHours: '11:00 AM – 11:30 PM',
    about: 'Urban Tadka brings the slow-cooked perfection of royal dhaba flavours straight to modern dining. Handcrafted gravies and smoky charcoal tandoor.',
    area: 'Indiranagar',
    city: 'Bengaluru',
    featured: true
  },
  {
    id: 'rest_2',
    name: 'Biryani By Kilo',
    tagline: 'Fresh dum biryani cooked in authentic earthen handis',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=120&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewCount: 2890,
    cuisines: ['Biryani', 'Hyderabadi', 'Kebabs'],
    deliveryTimeMin: 35,
    deliveryTimeMax: 42,
    distanceKm: 3.4,
    priceForTwo: 600,
    deliveryFee: 40,
    offers: ['Flat ₹125 OFF with code DUM125'],
    isPureVeg: false,
    isOpen: true,
    openingHours: '11:30 AM – 12:00 AM',
    about: 'Each Biryani is freshly prepared upon receiving the order and delivered in the very earthen pot (Handi) it is cooked in.',
    area: 'Koramangala',
    city: 'Bengaluru',
    featured: true
  },
  {
    id: 'rest_3',
    name: 'Dosa Plaza & Tiffin Co.',
    tagline: 'Crisp ghee roasts, fluffy idlis & artisanal filter kaapi',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=120&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 3100,
    cuisines: ['South Indian', 'Breakfast', 'Healthy'],
    deliveryTimeMin: 18,
    deliveryTimeMax: 24,
    distanceKm: 1.5,
    priceForTwo: 250,
    deliveryFee: 20,
    offers: ['Complimentary Vada on Breakfast combos'],
    isPureVeg: true,
    isOpen: true,
    openingHours: '06:30 AM – 10:30 PM',
    about: 'Steeped in Karnataka and Tamil culinary traditions, grinding batter daily using stone mills and pure cow ghee.',
    area: 'Indiranagar',
    city: 'Bengaluru',
    featured: true
  },
  {
    id: 'rest_4',
    name: 'Wok Republic',
    tagline: 'Sizzling fiery woks, dim sums & pan-Asian bowls',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=800&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=120&auto=format&fit=crop&q=80',
    rating: 4.4,
    reviewCount: 880,
    cuisines: ['Chinese', 'Pan-Asian', 'Noodles'],
    deliveryTimeMin: 22,
    deliveryTimeMax: 28,
    distanceKm: 2.8,
    priceForTwo: 500,
    deliveryFee: 30,
    offers: ['Buy 1 Get 1 on Signature Dimsums'],
    isPureVeg: false,
    isOpen: true,
    openingHours: '12:00 PM – 11:00 PM',
    about: 'High-heat wok tossed noodles, authentic momos, and hearty Cantonese gravies crafted with fresh greens.',
    area: 'HSR Layout',
    city: 'Bengaluru'
  },
  {
    id: 'rest_5',
    name: 'Artisan Crust Pizza Co.',
    tagline: '48-hour fermented sourdough & san marzano sauce',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=120&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewCount: 1650,
    cuisines: ['Pizza', 'Italian', 'Pasta'],
    deliveryTimeMin: 25,
    deliveryTimeMax: 32,
    distanceKm: 3.1,
    priceForTwo: 650,
    deliveryFee: 35,
    offers: ['Flat ₹150 OFF on orders above ₹700'],
    isPureVeg: false,
    isOpen: true,
    openingHours: '12:00 PM – 11:30 PM',
    about: 'Neapolitan style wood-fired pizzas with artisanal cheeses, fresh basil, and hand-stretched sourdough crusts.',
    area: 'Indiranagar',
    city: 'Bengaluru',
    featured: true
  },
  {
    id: 'rest_6',
    name: 'Burger Singh & Sliders',
    tagline: 'Bold Indian spiced gourmet smash burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=120&auto=format&fit=crop&q=80',
    rating: 4.3,
    reviewCount: 970,
    cuisines: ['Burgers', 'Fast Food', 'Snacks'],
    deliveryTimeMin: 20,
    deliveryTimeMax: 26,
    distanceKm: 2.4,
    priceForTwo: 350,
    deliveryFee: 25,
    offers: ['Free Masala Fries on cart > ₹349'],
    isPureVeg: false,
    isOpen: true,
    openingHours: '11:00 AM – 02:00 AM',
    about: 'Juicy smashed patties seasoned with signature Indian spices, toasted brioche buns, and house secret sauces.',
    area: 'Koramangala',
    city: 'Bengaluru'
  },
  {
    id: 'rest_7',
    name: 'Tibetan Momos & Bowls',
    tagline: 'Steamed Himalayan momos & comforting Thukpa',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=120&auto=format&fit=crop&q=80',
    rating: 4.5,
    reviewCount: 740,
    cuisines: ['Momos', 'Tibetan', 'Fast Food'],
    deliveryTimeMin: 18,
    deliveryTimeMax: 25,
    distanceKm: 1.8,
    priceForTwo: 280,
    deliveryFee: 25,
    offers: ['10% OFF on any 2 momo platters'],
    isPureVeg: false,
    isOpen: true,
    openingHours: '12:00 PM – 10:30 PM',
    about: 'Authentic Darjeeling and Tibetan recipes featuring handcrafted thin-skin momos and fiery red chilli chutney.',
    area: 'Indiranagar',
    city: 'Bengaluru'
  },
  {
    id: 'rest_8',
    name: 'Haldiram\'s Sweets & Chaat',
    tagline: 'Legendary Indian mithai, crunchy chaats & thalis',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=120&auto=format&fit=crop&q=80',
    rating: 4.6,
    reviewCount: 2200,
    cuisines: ['Chaat', 'Desserts', 'North Indian'],
    deliveryTimeMin: 22,
    deliveryTimeMax: 30,
    distanceKm: 2.5,
    priceForTwo: 300,
    deliveryFee: 25,
    offers: ['Special Festival Gift Packs available'],
    isPureVeg: true,
    isOpen: true,
    openingHours: '09:00 AM – 10:30 PM',
    about: 'India’s most celebrated sweet and snack heritage. Raj Kachoris, Chole Bhature, and festive Rasgullas.',
    area: 'Whitefield',
    city: 'Bengaluru'
  },
  {
    id: 'rest_9',
    name: 'The Belgian Waffle & Shakes',
    tagline: 'Warm crispy wafflewiches & thick premium shakes',
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=120&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewCount: 1940,
    cuisines: ['Desserts', 'Waffles', 'Beverages'],
    deliveryTimeMin: 15,
    deliveryTimeMax: 22,
    distanceKm: 1.4,
    priceForTwo: 320,
    deliveryFee: 20,
    offers: ['Free Dark Chocolate Dip on ₹300+'],
    isPureVeg: true,
    isOpen: true,
    openingHours: '10:00 AM – 01:00 AM',
    about: 'Freshly baked Belgian waffles stuffed with melted Belgian chocolate, biscoff butter, and nutella.',
    area: 'Indiranagar',
    city: 'Bengaluru'
  },
  {
    id: 'rest_10',
    name: 'Chaayos & Street Bites',
    tagline: 'Freshly brewed Meri Wali Chai & desi snacks',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=120&auto=format&fit=crop&q=80',
    rating: 4.5,
    reviewCount: 1310,
    cuisines: ['Beverages', 'Chai', 'Snacks'],
    deliveryTimeMin: 15,
    deliveryTimeMax: 22,
    distanceKm: 1.6,
    priceForTwo: 220,
    deliveryFee: 20,
    offers: ['Flat 15% OFF on Bun Maska + Chai combo'],
    isPureVeg: true,
    isOpen: true,
    openingHours: '07:00 AM – 11:00 PM',
    about: 'Customizable artisanal chai blended with handpicked herbs, paired with Bun Maska, Vada Pav, and Samosas.',
    area: 'Koramangala',
    city: 'Bengaluru'
  }
];

export const SEED_FOOD_ITEMS: FoodMenuItem[] = [
  // Urban Tadka
  {
    id: 'food_1',
    restaurantId: 'rest_1',
    name: 'Paneer Tikka Charcoal Grilled',
    description: 'Soft cottage cheese marinated in aromatic Punjabi spices and char-grilled with capsicum and onions.',
    price: 269,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=500&auto=format&fit=crop&q=80',
    isVeg: true,
    isBestseller: true,
    rating: 4.8,
    isAvailable: true,
    customizationGroups: [
      {
        id: 'portion',
        title: 'Portion Size',
        required: true,
        type: 'single',
        options: [
          { id: 'regular', name: 'Regular (6 pcs)', price: 0 },
          { id: 'large', name: 'Large Platter (10 pcs)', price: 120 }
        ]
      },
      {
        id: 'extras',
        title: 'Accompaniments',
        required: false,
        type: 'multiple',
        options: [
          { id: 'mint_chutney', name: 'Extra Mint Chutney & Laccha Onion', price: 25 },
          { id: 'rumali', name: 'Add Rumali Roti (1 pc)', price: 35 }
        ]
      }
    ]
  },
  {
    id: 'food_2',
    restaurantId: 'rest_1',
    name: 'Murgh Makhani (Butter Chicken)',
    description: 'Tender tandoori chicken cooked in a rich, buttery tomato gravy with fragrant kasoori methi.',
    price: 369,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500&auto=format&fit=crop&q=80',
    isVeg: false,
    isBestseller: true,
    rating: 4.9,
    isAvailable: true,
    customizationGroups: [
      {
        id: 'boneless',
        title: 'Preparation Style',
        required: true,
        type: 'single',
        options: [
          { id: 'bone', name: 'Classic Bone-in', price: 0 },
          { id: 'boneless', name: 'Pure Boneless Breast Pieces', price: 50 }
        ]
      }
    ]
  },
  {
    id: 'food_3',
    restaurantId: 'rest_1',
    name: 'Dal Makhani Bukhara Style',
    description: 'Whole black lentils slow cooked overnight on charcoal with churned butter and fresh cream.',
    price: 249,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=80',
    isVeg: true,
    isBestseller: true,
    rating: 4.7,
    isAvailable: true
  },
  {
    id: 'food_4',
    restaurantId: 'rest_1',
    name: 'Butter Garlic Naan',
    description: 'Clay oven baked flatbread brushed with crushed garlic and melted butter.',
    price: 65,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80',
    isVeg: true,
    rating: 4.6,
    isAvailable: true
  },
  {
    id: 'food_5',
    restaurantId: 'rest_1',
    name: 'Tandoori Soya Chaap',
    description: 'Juicy soya chaap marinated with Greek yogurt and roasted spices.',
    price: 239,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&auto=format&fit=crop&q=80',
    isVeg: true,
    rating: 4.5,
    isAvailable: true
  },
  {
    id: 'food_6',
    restaurantId: 'rest_1',
    name: 'Gulab Jamun (2 pcs)',
    description: 'Hot milk solid dumplings soaked in saffron-rose flavoured sugar syrup.',
    price: 89,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1605197154349-923f6629ec23?w=500&auto=format&fit=crop&q=80',
    isVeg: true,
    rating: 4.8,
    isAvailable: true
  },

  // Biryani By Kilo
  {
    id: 'food_7',
    restaurantId: 'rest_2',
    name: 'Hyderabadi Chicken Dum Biryani Handi',
    description: 'Aromatic long grain basmati layered with marinated chicken, fried onions, and saffron sealed with dough.',
    price: 395,
    category: 'Biryani',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80',
    isVeg: false,
    isBestseller: true,
    rating: 4.8,
    isAvailable: true,
    customizationGroups: [
      {
        id: 'size',
        title: 'Handi Size',
        required: true,
        type: 'single',
        options: [
          { id: 'half_kg', name: 'Regular (serves 1-2)', price: 0 },
          { id: 'one_kg', name: 'Large Handi 1kg (serves 3-4)', price: 290 }
        ]
      },
      {
        id: 'salan',
        title: 'Accompaniment',
        required: false,
        type: 'single',
        options: [
          { id: 'mirchi_ka_salan', name: 'Mirchi Ka Salan (Extra)', price: 40 },
          { id: 'burani_raita', name: 'Garlic Burani Raita', price: 45 }
        ]
      }
    ]
  },
  {
    id: 'food_8',
    restaurantId: 'rest_2',
    name: 'Lucknowi Paneer Dum Biryani Handi',
    description: 'Subtle Awadhi spiced fragrant rice infused with kewra, saffron and marinated paneer cubes.',
    price: 345,
    category: 'Biryani',
    image: 'https://images.unsplash.com/photo-1642821373181-696a54913e9a?w=500&auto=format&fit=crop&q=80',
    isVeg: true,
    rating: 4.6,
    isAvailable: true
  },
  {
    id: 'food_9',
    restaurantId: 'rest_2',
    name: 'Galouti Kebab Platter',
    description: 'Melt-in-mouth smoked minced kebabs infused with 160 secret Nawabi spices.',
    price: 389,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80',
    isVeg: false,
    rating: 4.7,
    isAvailable: true
  },

  // Dosa Plaza
  {
    id: 'food_10',
    restaurantId: 'rest_3',
    name: 'Ghee Podi Masala Dosa',
    description: 'Golden crisp fermented crepe generously smeared with aromatic Gunpowder spice and pure ghee, stuffed with spiced potato masala.',
    price: 159,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=80',
    isVeg: true,
    isBestseller: true,
    rating: 4.9,
    isAvailable: true
  },
  {
    id: 'food_11',
    restaurantId: 'rest_3',
    name: 'Steamed Button Idli with Ghee Sambar',
    description: '12 melt-in-mouth mini idlis submerged in piping hot vegetable sambar with dollops of cow ghee.',
    price: 129,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80',
    isVeg: true,
    rating: 4.7,
    isAvailable: true
  },
  {
    id: 'food_12',
    restaurantId: 'rest_3',
    name: 'Artisanal Filter Kaapi (Degree Coffee)',
    description: 'Authentic South Indian chicory-blend decoction frothed with boiling thick whole milk.',
    price: 69,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80',
    isVeg: true,
    rating: 4.9,
    isAvailable: true
  },

  // Artisan Crust Pizza Co.
  {
    id: 'food_13',
    restaurantId: 'rest_5',
    name: 'Truffle & Wild Mushroom Sourdough Pizza',
    description: 'Hand-stretched sourdough crust, fior di latte mozzarella, roasted cremini mushrooms, truffle oil, and fresh rocket.',
    price: 499,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80',
    isVeg: true,
    isBestseller: true,
    rating: 4.8,
    isAvailable: true,
    customizationGroups: [
      {
        id: 'size',
        title: 'Choose Size',
        required: true,
        type: 'single',
        options: [
          { id: '10_inch', name: '10 inch Medium (6 slices)', price: 0 },
          { id: '12_inch', name: '12 inch Large (8 slices)', price: 150 }
        ]
      },
      {
        id: 'crust',
        title: 'Crust Style',
        required: true,
        type: 'single',
        options: [
          { id: 'sourdough', name: 'Classic Neapolitan Sourdough', price: 0 },
          { id: 'cheese_burst', name: 'Mozzarella Stuffed Crust', price: 89 }
        ]
      },
      {
        id: 'toppings',
        title: 'Extra Gourmet Toppings',
        required: false,
        type: 'multiple',
        options: [
          { id: 'extra_cheese', name: 'Extra Buffalo Mozzarella', price: 65 },
          { id: 'jalapenos', name: 'Pickled Jalapenos', price: 35 },
          { id: 'black_olives', name: 'Kalamata Olives', price: 40 }
        ]
      }
    ]
  },
  {
    id: 'food_14',
    restaurantId: 'rest_5',
    name: 'Peri-Peri Smoked Chicken Pizza',
    description: 'Tangy tomato sauce, smoked paprika chicken chunks, grilled bell peppers, and melted cheddar-mozzarella.',
    price: 529,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=80',
    isVeg: false,
    rating: 4.7,
    isAvailable: true
  },

  // Burger Singh
  {
    id: 'food_15',
    restaurantId: 'rest_6',
    name: 'Amritsari Murgh Makhani Burger',
    description: 'Double crunchy spiced chicken patty drenched in liquid makhani gravy inside toasted sesame brioche.',
    price: 219,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
    isVeg: false,
    isBestseller: true,
    rating: 4.6,
    isAvailable: true
  },
  {
    id: 'food_16',
    restaurantId: 'rest_6',
    name: 'Dilli 6 Crispy Aloo Tikki Burger',
    description: 'Golden spiced potato patty topped with mint mayo, crisp onions, and crunchy iceberg.',
    price: 139,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=80',
    isVeg: true,
    rating: 4.4,
    isAvailable: true
  },

  // Wok Republic
  {
    id: 'food_17',
    restaurantId: 'rest_4',
    name: 'Hakka Chilli Chicken Dry',
    description: 'Crispy diced chicken tossed with fiery green chillies, garlic flakes, and dark soya.',
    price: 289,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=80',
    isVeg: false,
    rating: 4.6,
    isAvailable: true
  },
  {
    id: 'food_18',
    restaurantId: 'rest_4',
    name: 'Schezwan Egg Fried Rice & Wok Greens',
    description: 'Wok tossed aromatic rice in house-ground Sichuan pepper paste with farm eggs and scallions.',
    price: 249,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&auto=format&fit=crop&q=80',
    isVeg: false,
    rating: 4.5,
    isAvailable: true
  },

  // Tibetan Momos
  {
    id: 'food_19',
    restaurantId: 'rest_7',
    name: 'Steamed Chicken Cheese Momos (8 pcs)',
    description: 'Juicy hand-folded dumplings packed with seasoned minced chicken and gooey cheese, served with red chilli dip.',
    price: 199,
    category: 'Momos',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&auto=format&fit=crop&q=80',
    isVeg: false,
    rating: 4.7,
    isAvailable: true
  },
  {
    id: 'food_20',
    restaurantId: 'rest_7',
    name: 'Pan-Fried Veg Corn & Cheese Kurkure Momos',
    description: 'Super crunchy coated momos fried to golden perfection with tangy mayonnaise.',
    price: 179,
    category: 'Momos',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=500&auto=format&fit=crop&q=80',
    isVeg: true,
    rating: 4.6,
    isAvailable: true
  },

  // The Belgian Waffle
  {
    id: 'food_21',
    restaurantId: 'rest_9',
    name: 'Naked Nutella Belgian Waffle',
    description: 'Warm freshly ironed crispy waffle topped with warm authentic Nutella spread.',
    price: 175,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=500&auto=format&fit=crop&q=80',
    isVeg: true,
    rating: 4.9,
    isAvailable: true
  },
  {
    id: 'food_22',
    restaurantId: 'rest_9',
    name: 'Biscoff Lotus Thick Shake',
    description: 'Crushed caramelised Lotus Biscoff biscuits churned with velvety vanilla ice cream.',
    price: 189,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=80',
    isVeg: true,
    rating: 4.8,
    isAvailable: true
  }
];

export const SEED_GROCERY_STORES: GroceryStore[] = [
  {
    id: 'store_1',
    name: 'FreshMart Supermarket',
    tagline: 'Farm-direct vegetables, dairy alternatives & pantry staples',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=120&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewCount: 3820,
    deliveryTimeMin: 15,
    deliveryTimeMax: 20,
    distanceKm: 1.2,
    minOrder: 150,
    deliveryFee: 25,
    offers: ['Free coriander & chillies on veggies > ₹199', 'Instant ₹50 off on dairy alternatives'],
    isOpen: true,
    openingHours: '06:00 AM – 11:00 PM',
    area: 'Indiranagar',
    city: 'Bengaluru'
  },
  {
    id: 'store_2',
    name: 'Nature\'s Basket Gourmet',
    tagline: 'Imported artisanal cheeses, hydroponic greens & organic berries',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=120&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 2450,
    deliveryTimeMin: 20,
    deliveryTimeMax: 28,
    distanceKm: 2.3,
    minOrder: 300,
    deliveryFee: 35,
    offers: ['15% OFF on Gluten-Free & Keto items'],
    isOpen: true,
    openingHours: '08:00 AM – 10:30 PM',
    area: 'Koramangala',
    city: 'Bengaluru'
  },
  {
    id: 'store_3',
    name: 'Reliance Smart Point',
    tagline: 'Everyday lowest prices on pulses, oils, flour & cleaning essentials',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=120&auto=format&fit=crop&q=80',
    rating: 4.4,
    reviewCount: 4120,
    deliveryTimeMin: 25,
    deliveryTimeMax: 35,
    distanceKm: 3.0,
    minOrder: 200,
    deliveryFee: 20,
    offers: ['Flat 5% below MRP on all branded staples'],
    isOpen: true,
    openingHours: '07:00 AM – 10:00 PM',
    area: 'HSR Layout',
    city: 'Bengaluru'
  },
  {
    id: 'store_4',
    name: 'Organic India & Herbal Haven',
    tagline: 'Certified chemical-free millets, cold-pressed oils & herbal teas',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 1180,
    deliveryTimeMin: 18,
    deliveryTimeMax: 26,
    distanceKm: 1.9,
    minOrder: 250,
    deliveryFee: 30,
    offers: ['Free Tulsi Green Tea sample with every order'],
    isOpen: true,
    openingHours: '08:30 AM – 09:30 PM',
    area: 'Indiranagar',
    city: 'Bengaluru'
  },
  {
    id: 'store_5',
    name: '24 Seven Quick Essentials',
    tagline: 'Midnight munchies, ice creams, beverages & personal care',
    image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=120&auto=format&fit=crop&q=80',
    rating: 4.3,
    reviewCount: 1830,
    deliveryTimeMin: 12,
    deliveryTimeMax: 18,
    distanceKm: 1.0,
    minOrder: 99,
    deliveryFee: 25,
    offers: ['24x7 Express Delivery in under 18 minutes'],
    isOpen: true,
    openingHours: '24 Hours Open',
    area: 'Indiranagar',
    city: 'Bengaluru'
  }
];

export const SEED_GROCERY_PRODUCTS: GroceryProduct[] = [
  // Store 1: FreshMart
  {
    id: 'groc_1',
    storeId: 'store_1',
    brand: 'Raw Pressery',
    name: 'Almond Milk Unsweetened (Plant-Based)',
    weight: '1 L',
    mrp: 190,
    sellingPrice: 149,
    discountPercentage: 22,
    category: 'Dairy Alternatives',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80',
    description: 'Lactose-free, non-GMO almond milk with zero added sugar and calcium fortification.',
    stock: 7,
    reorderLevel: 10,
    maxStock: 50,
    supplier: 'Raw Pressery Beverages Pvt Ltd',
    restockDate: '2026-09-24',
    expiryDate: '2026-12-15',
    inventoryStatus: 'LOW_STOCK',
    isOrganic: true,
    unitsSold: 142
  },
  {
    id: 'groc_2',
    storeId: 'store_1',
    brand: 'Farm Fresh',
    name: 'Robusta Bananas (Chikmagalur)',
    weight: '1 kg (5-6 pcs)',
    mrp: 65,
    sellingPrice: 48,
    discountPercentage: 26,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=80',
    description: 'Naturally ripened sweet bananas packed with potassium, harvested directly from Karnataka farms.',
    stock: 28,
    reorderLevel: 15,
    maxStock: 100,
    supplier: 'Sahyadri Farmers Producer Co.',
    restockDate: '2026-09-29',
    inventoryStatus: 'HEALTHY',
    unitsSold: 320
  },
  {
    id: 'groc_3',
    storeId: 'store_1',
    brand: 'Kisan Fresh',
    name: 'Farm Fresh Hybrid Tomatoes',
    weight: '1 kg',
    mrp: 45,
    sellingPrice: 32,
    discountPercentage: 28,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80',
    description: 'Firm and juicy red hybrid tomatoes ideal for daily curries, salads, and gravies.',
    stock: 45,
    reorderLevel: 20,
    maxStock: 120,
    supplier: 'Karnataka Mandi Direct',
    restockDate: '2026-09-29',
    inventoryStatus: 'HEALTHY',
    unitsSold: 410
  },
  {
    id: 'groc_4',
    storeId: 'store_1',
    brand: 'True Elements',
    name: 'Rolled Oats Whole Grain (Gluten Free)',
    weight: '1 kg',
    mrp: 350,
    sellingPrice: 289,
    discountPercentage: 17,
    category: 'Staples',
    image: 'https://images.unsplash.com/photo-1614961908595-5dbbe8645719?w=500&auto=format&fit=crop&q=80',
    description: '100% whole grain jumbo rolled oats high in dietary fibre beta-glucan to support healthy heart and cholesterol.',
    stock: 18,
    reorderLevel: 8,
    maxStock: 40,
    supplier: 'HW Wellness Solutions',
    restockDate: '2026-09-20',
    inventoryStatus: 'HEALTHY',
    unitsSold: 98
  },
  {
    id: 'groc_5',
    storeId: 'store_1',
    brand: 'Epigamia',
    name: 'Greek Yogurt Alphonso Mango (High Protein)',
    weight: '120 g',
    mrp: 50,
    sellingPrice: 42,
    discountPercentage: 16,
    category: 'Dairy Alternatives',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=80',
    description: 'Thick strained Greek yogurt blended with real Ratnagiri Alphonso mango pulp with 6g protein.',
    stock: 3,
    reorderLevel: 10,
    maxStock: 60,
    supplier: 'Drums Food International',
    restockDate: '2026-09-22',
    expiryDate: '2026-10-05',
    inventoryStatus: 'CRITICAL',
    unitsSold: 215
  },
  {
    id: 'groc_6',
    storeId: 'store_1',
    brand: 'Fortune',
    name: 'Sunlite Refined Sunflower Oil Pouch',
    weight: '1 L',
    mrp: 145,
    sellingPrice: 122,
    discountPercentage: 15,
    category: 'Staples',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80',
    description: 'Light, clear, and fortified with Vitamins A & D for daily wholesome Indian cooking.',
    stock: 0,
    reorderLevel: 12,
    maxStock: 80,
    supplier: 'Adani Wilmar Ltd',
    restockDate: '2026-09-18',
    inventoryStatus: 'OUT_OF_STOCK',
    unitsSold: 180
  },
  {
    id: 'groc_7',
    storeId: 'store_1',
    brand: 'Paper Boat',
    name: 'Aamras Mango Juice (Zero Preservatives)',
    weight: '1 L Tetra',
    mrp: 125,
    sellingPrice: 99,
    discountPercentage: 20,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=500&auto=format&fit=crop&q=80',
    description: 'Made with authentic mango pulp and Indian nostalgia. No artificial colors or preservatives.',
    stock: 22,
    reorderLevel: 8,
    maxStock: 50,
    supplier: 'Hector Beverages',
    restockDate: '2026-09-25',
    inventoryStatus: 'HEALTHY',
    unitsSold: 165
  },
  {
    id: 'groc_8',
    storeId: 'store_1',
    brand: 'Green Farms',
    name: 'Fresh Spinach / Palak Leaves (Clean Bunch)',
    weight: '250 g',
    mrp: 30,
    sellingPrice: 22,
    discountPercentage: 26,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=80',
    description: 'Crisp green baby spinach leaves washed and tied, rich in natural dietary iron and vitamins.',
    stock: 14,
    reorderLevel: 10,
    maxStock: 40,
    supplier: 'Kolar Organic Farms',
    restockDate: '2026-09-29',
    inventoryStatus: 'HEALTHY',
    unitsSold: 280
  },

  // Store 2: Nature's Basket
  {
    id: 'groc_9',
    storeId: 'store_2',
    brand: 'Oatly',
    name: 'Barista Edition Oat Milk',
    weight: '1 L',
    mrp: 380,
    sellingPrice: 320,
    discountPercentage: 15,
    category: 'Dairy Alternatives',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80',
    description: 'World-renowned foamable plant milk engineered specifically for specialty coffee and lattes.',
    stock: 8,
    reorderLevel: 6,
    maxStock: 30,
    supplier: 'Global Gourmet Imports',
    restockDate: '2026-09-21',
    inventoryStatus: 'HEALTHY',
    unitsSold: 74
  },
  {
    id: 'groc_10',
    storeId: 'store_2',
    brand: 'Lindt Excellence',
    name: '85% Cocoa Extra Dark Chocolate Bar',
    weight: '100 g',
    mrp: 295,
    sellingPrice: 249,
    discountPercentage: 15,
    category: 'Chocolates',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&auto=format&fit=crop&q=80',
    description: 'Master Swiss chocolatier crafted full-bodied rich dark chocolate with deep roasted aromas.',
    stock: 15,
    reorderLevel: 8,
    maxStock: 40,
    supplier: 'Lindt & Sprüngli India',
    restockDate: '2026-09-15',
    inventoryStatus: 'HEALTHY',
    unitsSold: 110
  },
  {
    id: 'groc_11',
    storeId: 'store_2',
    brand: 'Berries & Co',
    name: 'Fresh Imported Blueberries (Peruvian)',
    weight: '125 g Pack',
    mrp: 280,
    sellingPrice: 220,
    discountPercentage: 21,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=500&auto=format&fit=crop&q=80',
    description: 'Sweet, plump, antioxidant rich superfood berries directly imported from Peru.',
    stock: 5,
    reorderLevel: 6,
    maxStock: 25,
    supplier: 'Fresh Tropics Imports',
    restockDate: '2026-09-28',
    inventoryStatus: 'LOW_STOCK',
    unitsSold: 88
  },

  // Store 3: Reliance Smart Point
  {
    id: 'groc_12',
    storeId: 'store_3',
    brand: 'Aashirvaad',
    name: 'Shudh Chakki Atta 100% Whole Wheat',
    weight: '5 kg',
    mrp: 265,
    sellingPrice: 228,
    discountPercentage: 14,
    category: 'Staples',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80',
    description: '4-step mechanised chakki ground wheat grain flour ensuring soft and fluffy rotis.',
    stock: 35,
    reorderLevel: 15,
    maxStock: 100,
    supplier: 'ITC Limited',
    restockDate: '2026-09-25',
    inventoryStatus: 'HEALTHY',
    unitsSold: 340
  },
  {
    id: 'groc_13',
    storeId: 'store_3',
    brand: 'Tata Sampann',
    name: 'Unpolished Toor Dal (Arhar Dal)',
    weight: '1 kg',
    mrp: 185,
    sellingPrice: 158,
    discountPercentage: 14,
    category: 'Staples',
    image: 'https://images.unsplash.com/photo-1585994192701-f1a505c817ee?w=500&auto=format&fit=crop&q=80',
    description: 'High protein unpolished pulses processed naturally without artificial water, leather, or oil polish.',
    stock: 24,
    reorderLevel: 10,
    maxStock: 60,
    supplier: 'Tata Consumer Products',
    restockDate: '2026-09-24',
    inventoryStatus: 'HEALTHY',
    unitsSold: 195
  },
  {
    id: 'groc_14',
    storeId: 'store_3',
    brand: 'Surf Excel',
    name: 'Matic Liquid Detergent Front Load',
    weight: '2 L',
    mrp: 450,
    sellingPrice: 380,
    discountPercentage: 15,
    category: 'Household',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=500&auto=format&fit=crop&q=80',
    description: 'Fast-dissolving concentrated formula offering deep stain removal in 1 wash without leaving residue.',
    stock: 12,
    reorderLevel: 6,
    maxStock: 35,
    supplier: 'Hindustan Unilever Ltd',
    restockDate: '2026-09-18',
    inventoryStatus: 'HEALTHY',
    unitsSold: 84
  },

  // Store 4: Organic India
  {
    id: 'groc_15',
    storeId: 'store_4',
    brand: 'Organic India',
    name: 'Tulsi Green Tea Ashwagandha Tin',
    weight: '100 g',
    mrp: 290,
    sellingPrice: 245,
    discountPercentage: 15,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80',
    description: 'Certified organic blend of Krishna, Rama, and Vana Tulsi with powerful adaptogen Ashwagandha.',
    stock: 19,
    reorderLevel: 8,
    maxStock: 40,
    supplier: 'Organic India Pvt Ltd',
    restockDate: '2026-09-20',
    inventoryStatus: 'HEALTHY',
    isOrganic: true,
    unitsSold: 130
  },
  {
    id: 'groc_16',
    storeId: 'store_4',
    brand: 'Conscious Food',
    name: 'Cold Pressed Virgin Mustard Oil',
    weight: '1 L Glass Bottle',
    mrp: 320,
    sellingPrice: 275,
    discountPercentage: 14,
    category: 'Staples',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80',
    description: 'Kachi Ghani traditional wooden cold-pressed pungent mustard oil for authentic cooking and pickles.',
    stock: 9,
    reorderLevel: 6,
    maxStock: 30,
    supplier: 'Conscious Food India',
    restockDate: '2026-09-19',
    inventoryStatus: 'HEALTHY',
    isOrganic: true,
    unitsSold: 67
  }
];

export const SEED_COUPONS: Coupon[] = [
  {
    code: 'QUICK150',
    title: 'Flat ₹150 OFF',
    description: 'Save ₹150 on your overall cart when you spend ₹600 or more across food or grocery.',
    discountType: 'flat',
    discountValue: 150,
    minOrder: 600,
    serviceType: 'all',
    validUntil: '2026-12-31'
  },
  {
    code: 'FREEDEL',
    title: 'Free Delivery',
    description: 'Get 100% waiver on delivery fees for smart baskets above ₹399.',
    discountType: 'flat',
    discountValue: 45,
    minOrder: 399,
    serviceType: 'all',
    validUntil: '2026-12-31'
  },
  {
    code: 'FRESH20',
    title: '20% OFF Essentials',
    description: 'Unlock 20% discount up to ₹120 on fresh vegetables, fruits, and dairy alternatives.',
    discountType: 'percentage',
    discountValue: 20,
    minOrder: 400,
    maxDiscount: 120,
    serviceType: 'grocery',
    validUntil: '2026-11-30'
  },
  {
    code: 'TASTY50',
    title: 'Flat ₹50 OFF Meals',
    description: 'Enjoy ₹50 off on mouthwatering food orders above ₹299.',
    discountType: 'flat',
    discountValue: 50,
    minOrder: 299,
    serviceType: 'food',
    validUntil: '2026-12-31'
  },
  {
    code: 'GROCERY100',
    title: '₹100 OFF on Grocery',
    description: 'Special weekend grocery savings on baskets above ₹750.',
    discountType: 'flat',
    discountValue: 100,
    minOrder: 750,
    serviceType: 'grocery',
    validUntil: '2026-10-31'
  }
];

export const SEED_DELIVERY_PARTNERS: DeliveryPartner[] = [
  {
    id: 'dp_1',
    name: 'Karthik Raja',
    phone: '+91 97412 88990',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    vehicleType: 'EV Scooter (Ather 450X)',
    vehicleNumber: 'KA 03 EN 4412',
    rating: 4.88,
    totalDeliveries: 420,
    status: 'on_delivery',
    todayEarnings: 820,
    weekEarnings: 5640,
    averageDeliveryTimeMin: 22,
    onTimeRate: 96.4
  },
  {
    id: 'dp_2',
    name: 'Manish Rawat',
    phone: '+91 98114 33221',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    vehicleType: 'TVS Apache 160',
    vehicleNumber: 'KA 05 MN 9182',
    rating: 4.75,
    totalDeliveries: 310,
    status: 'available',
    todayEarnings: 640,
    weekEarnings: 4890,
    averageDeliveryTimeMin: 24,
    onTimeRate: 94.2
  },
  {
    id: 'dp_3',
    name: 'Santhosh Kumar',
    phone: '+91 99012 77443',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80',
    vehicleType: 'Ola S1 Pro EV',
    vehicleNumber: 'KA 01 EV 1099',
    rating: 4.92,
    totalDeliveries: 580,
    status: 'available',
    todayEarnings: 950,
    weekEarnings: 6800,
    averageDeliveryTimeMin: 20,
    onTimeRate: 98.1
  }
];

// Helper to generate dynamic past dates for analytics
const getPastDateIso = (daysAgo: number, hour: number = 13, min: number = 30) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hour, min, 0, 0);
  return d.toISOString();
};

export const SEED_ORDERS: Order[] = [
  // 1. Live Active Mixed Smart Basket Order
  {
    id: 'ord_101',
    orderNumber: 'QB-2026-9041',
    customerId: 'user_cust_1',
    customerName: 'Rajat Chauhan',
    customerPhone: '+91 98765 43210',
    serviceType: 'mixed',
    itemsCount: 4,
    subtotal: 735,
    discount: 50,
    couponCode: 'TASTY50',
    deliveryFee: 35,
    platformFee: 5,
    taxes: 36,
    totalAmount: 761,
    paymentMethod: 'UPI',
    paymentStatus: 'SUCCESS',
    orderStatus: 'out_for_delivery',
    deliveryPartnerId: 'dp_1',
    deliveryPartnerName: 'Karthik Raja',
    deliveryPartnerPhone: '+91 97412 88990',
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    acceptedAt: new Date(Date.now() - 22 * 60 * 1000).toISOString(),
    preparedAt: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
    pickedUpAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    outForDeliveryAt: new Date(Date.now() - 6 * 60 * 1000).toISOString(),
    city: 'Bengaluru',
    area: 'Indiranagar',
    deliveryAddress: {
      id: 'addr_1',
      userId: 'user_cust_1',
      type: 'home',
      street: 'Flat 402, Oakwood Heights, 12th Main',
      area: 'Indiranagar',
      city: 'Bengaluru',
      pincode: '560038',
      landmark: 'Near 100 Feet Road Metro',
      isDefault: true
    },
    deliveryInstructions: 'Leave at door and ring the bell once.',
    fulfillmentGroups: [
      {
        id: 'fg_1',
        serviceType: 'food',
        sellerId: 'rest_1',
        sellerName: 'Urban Tadka',
        sellerImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&auto=format&fit=crop&q=80',
        sellerAddress: '100ft Road, Indiranagar',
        stage: 'out_for_delivery',
        estimatedDeliveryTime: '12-15 mins',
        deliveryPartnerName: 'Karthik Raja',
        deliveryPartnerPhone: '+91 97412 88990',
        subtotal: 538,
        items: [
          {
            id: 'ci_1',
            itemId: 'food_1',
            serviceType: 'food',
            sellerId: 'rest_1',
            sellerName: 'Urban Tadka',
            name: 'Paneer Tikka Charcoal Grilled',
            image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=200&auto=format&fit=crop&q=80',
            price: 269,
            quantity: 2,
            isVeg: true,
            specialInstructions: 'Make it extra spicy with laccha onion.'
          }
        ]
      },
      {
        id: 'fg_2',
        serviceType: 'grocery',
        sellerId: 'store_1',
        sellerName: 'FreshMart Supermarket',
        sellerImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&auto=format&fit=crop&q=80',
        sellerAddress: 'CMH Road, Indiranagar',
        stage: 'out_for_delivery',
        estimatedDeliveryTime: '15-20 mins',
        subtotal: 197,
        items: [
          {
            id: 'ci_2',
            itemId: 'groc_1',
            serviceType: 'grocery',
            sellerId: 'store_1',
            sellerName: 'FreshMart Supermarket',
            name: 'Almond Milk Unsweetened (Plant-Based)',
            image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&auto=format&fit=crop&q=80',
            price: 149,
            quantity: 1,
            weightOrSize: '1 L'
          },
          {
            id: 'ci_3',
            itemId: 'groc_2',
            serviceType: 'grocery',
            sellerId: 'store_1',
            sellerName: 'FreshMart Supermarket',
            name: 'Robusta Bananas (Chikmagalur)',
            image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&auto=format&fit=crop&q=80',
            price: 48,
            quantity: 1,
            weightOrSize: '1 kg'
          }
        ]
      }
    ]
  },

  // 2. Completed Food Order Yesterday
  {
    id: 'ord_102',
    orderNumber: 'QB-2026-9022',
    customerId: 'user_cust_2',
    customerName: 'Priya Sundaram',
    customerPhone: '+91 98451 22334',
    serviceType: 'food',
    itemsCount: 2,
    subtotal: 685,
    discount: 100,
    couponCode: 'QUICK150',
    deliveryFee: 0,
    platformFee: 5,
    taxes: 29,
    totalAmount: 619,
    paymentMethod: 'CARD',
    paymentStatus: 'SUCCESS',
    orderStatus: 'delivered',
    createdAt: getPastDateIso(1, 20, 15),
    acceptedAt: getPastDateIso(1, 20, 18),
    preparedAt: getPastDateIso(1, 20, 32),
    pickedUpAt: getPastDateIso(1, 20, 36),
    outForDeliveryAt: getPastDateIso(1, 20, 38),
    deliveredAt: getPastDateIso(1, 20, 52),
    city: 'Bengaluru',
    area: 'Koramangala',
    deliveryAddress: {
      id: 'addr_priya',
      userId: 'user_cust_2',
      type: 'home',
      street: '7th Block, Koramangala',
      area: 'Koramangala',
      city: 'Bengaluru',
      pincode: '560095',
      isDefault: true
    },
    fulfillmentGroups: [
      {
        id: 'fg_3',
        serviceType: 'food',
        sellerId: 'rest_2',
        sellerName: 'Biryani By Kilo',
        sellerImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&auto=format&fit=crop&q=80',
        sellerAddress: 'Koramangala 5th Block',
        stage: 'delivered',
        estimatedDeliveryTime: 'Delivered',
        subtotal: 685,
        items: [
          {
            id: 'ci_4',
            itemId: 'food_7',
            serviceType: 'food',
            sellerId: 'rest_2',
            sellerName: 'Biryani By Kilo',
            name: 'Hyderabadi Chicken Dum Biryani Handi',
            image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&auto=format&fit=crop&q=80',
            price: 395,
            quantity: 1,
            isVeg: false
          },
          {
            id: 'ci_5',
            itemId: 'food_9',
            serviceType: 'food',
            sellerId: 'rest_2',
            sellerName: 'Biryani By Kilo',
            name: 'Galouti Kebab Platter',
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=200&auto=format&fit=crop&q=80',
            price: 290,
            quantity: 1,
            isVeg: false
          }
        ]
      }
    ]
  },

  // 3. Completed Grocery Order 2 days ago
  {
    id: 'ord_103',
    orderNumber: 'QB-2026-8991',
    customerId: 'user_cust_1',
    customerName: 'Rajat Chauhan',
    customerPhone: '+91 98765 43210',
    serviceType: 'grocery',
    itemsCount: 3,
    subtotal: 517,
    discount: 50,
    deliveryFee: 25,
    platformFee: 5,
    taxes: 25,
    totalAmount: 522,
    paymentMethod: 'UPI',
    paymentStatus: 'SUCCESS',
    orderStatus: 'delivered',
    createdAt: getPastDateIso(2, 10, 0),
    acceptedAt: getPastDateIso(2, 10, 3),
    preparedAt: getPastDateIso(2, 10, 12),
    pickedUpAt: getPastDateIso(2, 10, 15),
    outForDeliveryAt: getPastDateIso(2, 10, 17),
    deliveredAt: getPastDateIso(2, 10, 29),
    city: 'Bengaluru',
    area: 'Indiranagar',
    deliveryAddress: {
      id: 'addr_1',
      userId: 'user_cust_1',
      type: 'home',
      street: 'Flat 402, Oakwood Heights, 12th Main',
      area: 'Indiranagar',
      city: 'Bengaluru',
      pincode: '560038',
      isDefault: true
    },
    fulfillmentGroups: [
      {
        id: 'fg_4',
        serviceType: 'grocery',
        sellerId: 'store_1',
        sellerName: 'FreshMart Supermarket',
        sellerImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&auto=format&fit=crop&q=80',
        sellerAddress: 'CMH Road, Indiranagar',
        stage: 'delivered',
        estimatedDeliveryTime: 'Delivered',
        subtotal: 517,
        items: [
          {
            id: 'ci_6',
            itemId: 'groc_4',
            serviceType: 'grocery',
            sellerId: 'store_1',
            sellerName: 'FreshMart Supermarket',
            name: 'Rolled Oats Whole Grain (Gluten Free)',
            image: 'https://images.unsplash.com/photo-1614961908595-5dbbe8645719?w=200&auto=format&fit=crop&q=80',
            price: 289,
            quantity: 1,
            weightOrSize: '1 kg'
          },
          {
            id: 'ci_7',
            itemId: 'groc_3',
            serviceType: 'grocery',
            sellerId: 'store_1',
            sellerName: 'FreshMart Supermarket',
            name: 'Farm Fresh Hybrid Tomatoes',
            image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&auto=format&fit=crop&q=80',
            price: 32,
            quantity: 1,
            weightOrSize: '1 kg'
          },
          {
            id: 'ci_8',
            itemId: 'groc_1',
            serviceType: 'grocery',
            sellerId: 'store_1',
            sellerName: 'FreshMart Supermarket',
            name: 'Almond Milk Unsweetened (Plant-Based)',
            image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&auto=format&fit=crop&q=80',
            price: 149,
            quantity: 1,
            weightOrSize: '1 L'
          }
        ]
      }
    ]
  },

  // 4. Cancelled Order (for cancellation analytics)
  {
    id: 'ord_104',
    orderNumber: 'QB-2026-8840',
    customerId: 'user_cust_5',
    customerName: 'Rohan Mehra',
    customerPhone: '+91 98199 88776',
    serviceType: 'food',
    itemsCount: 1,
    subtotal: 499,
    discount: 0,
    deliveryFee: 35,
    platformFee: 5,
    taxes: 25,
    totalAmount: 564,
    paymentMethod: 'UPI',
    paymentStatus: 'REFUNDED',
    orderStatus: 'cancelled',
    cancellationReason: 'Restaurant kitchen overload',
    createdAt: getPastDateIso(3, 21, 10),
    city: 'Bengaluru',
    area: 'Indiranagar',
    deliveryAddress: {
      id: 'addr_rohan',
      userId: 'user_cust_5',
      type: 'home',
      street: '10th Cross, Indiranagar',
      area: 'Indiranagar',
      city: 'Bengaluru',
      pincode: '560038',
      isDefault: true
    },
    fulfillmentGroups: [
      {
        id: 'fg_5',
        serviceType: 'food',
        sellerId: 'rest_5',
        sellerName: 'Artisan Crust Pizza Co.',
        sellerImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=80',
        sellerAddress: '100ft Road, Indiranagar',
        stage: 'cancelled',
        estimatedDeliveryTime: 'Cancelled',
        subtotal: 499,
        items: [
          {
            id: 'ci_9',
            itemId: 'food_13',
            serviceType: 'food',
            sellerId: 'rest_5',
            sellerName: 'Artisan Crust Pizza Co.',
            name: 'Truffle & Wild Mushroom Sourdough Pizza',
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=80',
            price: 499,
            quantity: 1,
            isVeg: true
          }
        ]
      }
    ]
  },

  // 5. Historical food order 4 days ago
  {
    id: 'ord_105',
    orderNumber: 'QB-2026-8715',
    customerId: 'user_cust_3',
    customerName: 'Arjun Nambiar',
    customerPhone: '+91 99012 77443',
    serviceType: 'food',
    itemsCount: 3,
    subtotal: 357,
    discount: 0,
    deliveryFee: 20,
    platformFee: 5,
    taxes: 18,
    totalAmount: 400,
    paymentMethod: 'COD',
    paymentStatus: 'SUCCESS',
    orderStatus: 'delivered',
    createdAt: getPastDateIso(4, 8, 30),
    acceptedAt: getPastDateIso(4, 8, 33),
    preparedAt: getPastDateIso(4, 8, 42),
    pickedUpAt: getPastDateIso(4, 8, 45),
    outForDeliveryAt: getPastDateIso(4, 8, 47),
    deliveredAt: getPastDateIso(4, 8, 59),
    city: 'Bengaluru',
    area: 'Indiranagar',
    deliveryAddress: {
      id: 'addr_arjun',
      userId: 'user_cust_3',
      type: 'home',
      street: 'Double Road, Indiranagar',
      area: 'Indiranagar',
      city: 'Bengaluru',
      pincode: '560038',
      isDefault: true
    },
    fulfillmentGroups: [
      {
        id: 'fg_6',
        serviceType: 'food',
        sellerId: 'rest_3',
        sellerName: 'Dosa Plaza & Tiffin Co.',
        sellerImage: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=200&auto=format&fit=crop&q=80',
        sellerAddress: '12th Main, Indiranagar',
        stage: 'delivered',
        estimatedDeliveryTime: 'Delivered',
        subtotal: 357,
        items: [
          {
            id: 'ci_10',
            itemId: 'food_10',
            serviceType: 'food',
            sellerId: 'rest_3',
            sellerName: 'Dosa Plaza & Tiffin Co.',
            name: 'Ghee Podi Masala Dosa',
            image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=200&auto=format&fit=crop&q=80',
            price: 159,
            quantity: 1,
            isVeg: true
          },
          {
            id: 'ci_11',
            itemId: 'food_11',
            serviceType: 'food',
            sellerId: 'rest_3',
            sellerName: 'Dosa Plaza & Tiffin Co.',
            name: 'Steamed Button Idli with Ghee Sambar',
            image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200&auto=format&fit=crop&q=80',
            price: 129,
            quantity: 1,
            isVeg: true
          },
          {
            id: 'ci_12',
            itemId: 'food_12',
            serviceType: 'food',
            sellerId: 'rest_3',
            sellerName: 'Dosa Plaza & Tiffin Co.',
            name: 'Artisanal Filter Kaapi (Degree Coffee)',
            image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&auto=format&fit=crop&q=80',
            price: 69,
            quantity: 1,
            isVeg: true
          }
        ]
      }
    ]
  },

  // 6. Large Gourmet Grocery Order 6 days ago
  {
    id: 'ord_106',
    orderNumber: 'QB-2026-8550',
    customerId: 'user_cust_2',
    customerName: 'Priya Sundaram',
    customerPhone: '+91 98451 22334',
    serviceType: 'grocery',
    itemsCount: 3,
    subtotal: 789,
    discount: 100,
    couponCode: 'FRESH20',
    deliveryFee: 0,
    platformFee: 5,
    taxes: 39,
    totalAmount: 733,
    paymentMethod: 'UPI',
    paymentStatus: 'SUCCESS',
    orderStatus: 'delivered',
    createdAt: getPastDateIso(6, 17, 20),
    acceptedAt: getPastDateIso(6, 17, 24),
    preparedAt: getPastDateIso(6, 17, 34),
    pickedUpAt: getPastDateIso(6, 17, 38),
    outForDeliveryAt: getPastDateIso(6, 17, 40),
    deliveredAt: getPastDateIso(6, 17, 56),
    city: 'Bengaluru',
    area: 'Koramangala',
    deliveryAddress: {
      id: 'addr_priya',
      userId: 'user_cust_2',
      type: 'home',
      street: '7th Block, Koramangala',
      area: 'Koramangala',
      city: 'Bengaluru',
      pincode: '560095',
      isDefault: true
    },
    fulfillmentGroups: [
      {
        id: 'fg_7',
        serviceType: 'grocery',
        sellerId: 'store_2',
        sellerName: 'Nature\'s Basket Gourmet',
        sellerImage: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200&auto=format&fit=crop&q=80',
        sellerAddress: 'Koramangala 4th Block',
        stage: 'delivered',
        estimatedDeliveryTime: 'Delivered',
        subtotal: 789,
        items: [
          {
            id: 'ci_13',
            itemId: 'groc_9',
            serviceType: 'grocery',
            sellerId: 'store_2',
            sellerName: 'Nature\'s Basket Gourmet',
            name: 'Barista Edition Oat Milk',
            image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&auto=format&fit=crop&q=80',
            price: 320,
            quantity: 1,
            weightOrSize: '1 L'
          },
          {
            id: 'ci_14',
            itemId: 'groc_10',
            serviceType: 'grocery',
            sellerId: 'store_2',
            sellerName: 'Nature\'s Basket Gourmet',
            name: '85% Cocoa Extra Dark Chocolate Bar',
            image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=200&auto=format&fit=crop&q=80',
            price: 249,
            quantity: 1,
            weightOrSize: '100 g'
          },
          {
            id: 'ci_15',
            itemId: 'groc_11',
            serviceType: 'grocery',
            sellerId: 'store_2',
            sellerName: 'Nature\'s Basket Gourmet',
            name: 'Fresh Imported Blueberries (Peruvian)',
            image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=200&auto=format&fit=crop&q=80',
            price: 220,
            quantity: 1,
            weightOrSize: '125 g'
          }
        ]
      }
    ]
  },

  // 7. Orders across last 7 to 28 days for full BI trends
  ...Array.from({ length: 44 }).map((_, idx) => {
    const daysAgo = (idx % 28) + 1;
    const isFood = idx % 2 === 0;
    const isMixed = idx % 5 === 0;
    const isCancelled = idx % 9 === 0;
    const baseHour = [8, 11, 13, 14, 19, 20, 21, 22][idx % 8];
    const customer = SEED_USERS[idx % 6];
    const rest = SEED_RESTAURANTS[idx % SEED_RESTAURANTS.length];
    const store = SEED_GROCERY_STORES[idx % SEED_GROCERY_STORES.length];
    const orderNum = `QB-2026-${7000 + idx}`;
    const subtotal = 250 + (idx * 27) % 650;
    const discount = idx % 3 === 0 ? 50 : 0;
    const deliveryFee = subtotal > 500 ? 0 : 35;
    const platformFee = 5;
    const taxes = Math.round(subtotal * 0.05);
    const totalAmount = subtotal - discount + deliveryFee + platformFee + taxes;
    const paymentMethods: ('UPI' | 'CARD' | 'NET_BANKING' | 'WALLET' | 'COD')[] = ['UPI', 'CARD', 'UPI', 'WALLET', 'COD', 'UPI'];
    const pMethod = paymentMethods[idx % paymentMethods.length];
    
    return {
      id: `ord_gen_${idx}`,
      orderNumber: orderNum,
      customerId: customer.id,
      customerName: customer.name,
      customerPhone: customer.phone,
      serviceType: isMixed ? ('mixed' as const) : (isFood ? ('food' as const) : ('grocery' as const)),
      itemsCount: 2 + (idx % 3),
      subtotal,
      discount,
      couponCode: discount > 0 ? 'QUICK150' : undefined,
      deliveryFee,
      platformFee,
      taxes,
      totalAmount,
      paymentMethod: pMethod,
      paymentStatus: isCancelled ? ('REFUNDED' as const) : ('SUCCESS' as const),
      orderStatus: isCancelled ? ('cancelled' as const) : ('delivered' as const),
      cancellationReason: isCancelled ? ['Customer changed mind', 'Delivery partner delay', 'Restaurant unavailable', 'Item out of stock'][idx % 4] : undefined,
      createdAt: getPastDateIso(daysAgo, baseHour, (idx * 7) % 60),
      acceptedAt: getPastDateIso(daysAgo, baseHour, ((idx * 7) + 3) % 60),
      preparedAt: getPastDateIso(daysAgo, baseHour, ((idx * 7) + 15) % 60),
      pickedUpAt: getPastDateIso(daysAgo, baseHour, ((idx * 7) + 19) % 60),
      outForDeliveryAt: getPastDateIso(daysAgo, baseHour, ((idx * 7) + 21) % 60),
      deliveredAt: isCancelled ? undefined : getPastDateIso(daysAgo, baseHour, ((idx * 7) + 36) % 60),
      city: 'Bengaluru',
      area: rest.area,
      deliveryAddress: {
        id: `addr_gen_${idx}`,
        userId: customer.id,
        type: 'home' as const,
        street: 'Main Road Residence',
        area: rest.area,
        city: 'Bengaluru',
        pincode: '560001',
        isDefault: true
      },
      fulfillmentGroups: isFood ? [
        {
          id: `fg_gen_${idx}`,
          serviceType: 'food' as const,
          sellerId: rest.id,
          sellerName: rest.name,
          sellerImage: rest.image,
          sellerAddress: `${rest.area}, Bengaluru`,
          stage: isCancelled ? ('cancelled' as const) : ('delivered' as const),
          estimatedDeliveryTime: 'Delivered',
          subtotal,
          items: [
            {
              id: `ci_gen_${idx}_1`,
              itemId: SEED_FOOD_ITEMS[idx % SEED_FOOD_ITEMS.length].id,
              serviceType: 'food' as const,
              sellerId: rest.id,
              sellerName: rest.name,
              name: SEED_FOOD_ITEMS[idx % SEED_FOOD_ITEMS.length].name,
              image: SEED_FOOD_ITEMS[idx % SEED_FOOD_ITEMS.length].image,
              price: SEED_FOOD_ITEMS[idx % SEED_FOOD_ITEMS.length].price,
              quantity: 1,
              isVeg: SEED_FOOD_ITEMS[idx % SEED_FOOD_ITEMS.length].isVeg
            }
          ]
        }
      ] : [
        {
          id: `fg_gen_${idx}`,
          serviceType: 'grocery' as const,
          sellerId: store.id,
          sellerName: store.name,
          sellerImage: store.image,
          sellerAddress: `${store.area}, Bengaluru`,
          stage: isCancelled ? ('cancelled' as const) : ('delivered' as const),
          estimatedDeliveryTime: 'Delivered',
          subtotal,
          items: [
            {
              id: `ci_gen_${idx}_1`,
              itemId: SEED_GROCERY_PRODUCTS[idx % SEED_GROCERY_PRODUCTS.length].id,
              serviceType: 'grocery' as const,
              sellerId: store.id,
              sellerName: store.name,
              name: SEED_GROCERY_PRODUCTS[idx % SEED_GROCERY_PRODUCTS.length].name,
              image: SEED_GROCERY_PRODUCTS[idx % SEED_GROCERY_PRODUCTS.length].image,
              price: SEED_GROCERY_PRODUCTS[idx % SEED_GROCERY_PRODUCTS.length].sellingPrice,
              quantity: 1,
              weightOrSize: SEED_GROCERY_PRODUCTS[idx % SEED_GROCERY_PRODUCTS.length].weight
            }
          ]
        }
      ]
    };
  })
];

export const SEED_REVIEWS: Review[] = [
  {
    id: 'rev_1',
    targetId: 'rest_1',
    targetType: 'restaurant',
    userId: 'user_cust_1',
    userName: 'Rajat Chauhan',
    rating: 5,
    comment: 'The Paneer Tikka was sensational! Fresh, smoky, and delivered super hot in 20 minutes.',
    createdAt: '2026-09-28T18:00:00.000Z'
  },
  {
    id: 'rev_2',
    targetId: 'rest_2',
    targetType: 'restaurant',
    userId: 'user_cust_2',
    userName: 'Priya Sundaram',
    rating: 5,
    comment: 'The authentic earthen handi seal keeps all the aroma locked inside. Top tier biryani!',
    createdAt: '2026-09-27T19:30:00.000Z'
  },
  {
    id: 'rev_3',
    targetId: 'store_1',
    targetType: 'store',
    userId: 'user_cust_3',
    userName: 'Arjun Nambiar',
    rating: 5,
    comment: 'Delivered farm bananas and almond milk in 15 minutes flat. Packaging was pristine.',
    createdAt: '2026-09-26T11:00:00.000Z'
  },
  {
    id: 'rev_4',
    targetId: 'food_1',
    targetType: 'food',
    userId: 'user_cust_4',
    userName: 'Sneha Kulkarni',
    rating: 5,
    comment: 'So soft and the marinade is top notch!',
    createdAt: '2026-09-25T14:00:00.000Z'
  }
];
