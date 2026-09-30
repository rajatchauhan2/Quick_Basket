export const BRAND_CONFIG = {
  name: 'QuickBasket',
  shortName: 'QB',
  tagline: 'Everything you need, delivered.',
  subheading: 'From your favourite meals to everyday essentials.',
  groceryHero: 'Fresh essentials. One basket away.',
  foodHero: 'Hot meals & legendary flavours, dispatched fast.',
  foodServiceCard: {
    title: 'FOOD',
    subtitle: 'Meals, snacks & drinks',
    description: 'Top-rated restaurants, cloud kitchens & local favourites',
    badge: 'Average 28 mins',
  },
  groceryServiceCard: {
    title: 'GROCERY',
    subtitle: 'Daily essentials delivered',
    description: 'Farm-fresh veggies, dairy alternatives, staples & daily needs',
    badge: 'Direct to doorstep',
  },
  currency: '₹',
  platformFee: 5,
  freeDeliveryThreshold: 499,
  defaultDeliveryFee: 35,
  taxRate: 0.05, // 5% GST
  supportPhone: '+91 8000 247 247',
  supportEmail: 'care@quickbasket.in',
  availableCities: [
    'Bengaluru',
    'Delhi NCR',
    'Mumbai',
    'Hyderabad',
    'Pune',
    'Chennai'
  ],
  popularAreas: {
    'Bengaluru': ['Indiranagar', 'Koramangala', 'HSR Layout', 'Whitefield', 'JP Nagar', 'Bellandur'],
    'Delhi NCR': ['Cyber Hub', 'Connaught Place', 'Sector 62 Noida', 'Saket', 'Indirapuram'],
    'Mumbai': ['Bandra West', 'Andheri East', 'Powai', 'Lower Parel', 'Juhu'],
    'Hyderabad': ['Hitec City', 'Gachibowli', 'Jubilee Hills', 'Banjara Hills'],
    'Pune': ['Koregaon Park', 'Kothrud', 'Viman Nagar', 'Baner'],
    'Chennai': ['Adyar', 'T. Nagar', 'Anna Nagar', 'Velachery']
  },
  theme: {
    primaryCharcoal: '#0f172a',
    accentLime: '#10b981', // electric emerald/lime
    highlightYellow: '#f59e0b',
    neutralBg: '#f8fafc',
    surfaceWhite: '#ffffff',
  }
};
