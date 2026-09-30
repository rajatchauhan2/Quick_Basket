import { StaplePriceTrend } from '../types';

export type ForecastScenario = 'baseline' | 'festive_surge' | 'bumper_harvest';

export const STAPLE_PRICE_TRENDS: StaplePriceTrend[] = [
  // 1. Aashirvaad Shudh Chakki Atta (5 kg)
  {
    productId: 'groc_12',
    productName: 'Shudh Chakki Atta 100% Whole Wheat',
    brand: 'Aashirvaad',
    category: 'Staples',
    unit: '5 kg',
    currentPrice: 228,
    mrp: 265,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80',
    storeId: 'store_3',
    storeName: 'Reliance Smart Point',
    predictedPrice30d: 218,
    predictedChangePercent: -4.4,
    trendDirection: 'falling',
    recommendation: 'WAIT_AND_SAVE',
    recommendationTitle: 'Price Softening Expected · Buy 1 Pack Only',
    recommendationReason: 'FCI Open Market Sale Scheme (OMSS) release of 1.5M tonnes wheat is easing wholesale flour mill rates. Expect ~₹10/pack further savings within 14–21 days.',
    confidenceScore: 93,
    volatilityIndex: 'Low',
    lowestPrice6m: 225,
    highestPrice6m: 248,
    averagePrice6m: 236,
    marketDrivers: [
      {
        title: 'FCI Buffer Stock Release',
        factor: 'Govt Intervention',
        impact: 'positive',
        description: 'Food Corporation of India allocated additional 15 lakh tonnes of grain to stabilize retail flour mills.'
      },
      {
        title: 'Favourable Soil Moisture',
        factor: 'Rabi Sowing Outlook',
        impact: 'positive',
        description: 'Post-monsoon water reserves in Punjab, Haryana, and MP ensure brisk early sowing for the new winter wheat season.'
      },
      {
        title: 'Stable Logistics Corridor',
        factor: 'Freight & Diesel',
        impact: 'neutral',
        description: 'Interstate transport freight rates along Northern agricultural freight routes remain steady.'
      }
    ],
    priceHistory: [
      // 18 Historical Weekly points (Apr 2026 - Sep 2026)
      { date: '2026-05-04', displayDate: '04 May', timestamp: 1777939200000, actualPrice: 242, mandiPrice: 210, eventNote: 'Rabi harvest arrivals begin' },
      { date: '2026-05-18', displayDate: '18 May', timestamp: 1779148800000, actualPrice: 240, mandiPrice: 208 },
      { date: '2026-06-01', displayDate: '01 Jun', timestamp: 1780358400000, actualPrice: 244, mandiPrice: 212 },
      { date: '2026-06-15', displayDate: '15 Jun', timestamp: 1781568000000, actualPrice: 248, mandiPrice: 216, eventNote: 'Monsoon transport freight markup' },
      { date: '2026-06-29', displayDate: '29 Jun', timestamp: 1782777600000, actualPrice: 246, mandiPrice: 214 },
      { date: '2026-07-13', displayDate: '13 Jul', timestamp: 1783987200000, actualPrice: 242, mandiPrice: 210 },
      { date: '2026-07-27', displayDate: '27 Jul', timestamp: 1785196800000, actualPrice: 238, mandiPrice: 206, eventNote: 'FCI announces OMSS wheat quota' },
      { date: '2026-08-10', displayDate: '10 Aug', timestamp: 1786406400000, actualPrice: 235, mandiPrice: 204 },
      { date: '2026-08-24', displayDate: '24 Aug', timestamp: 1787616000000, actualPrice: 232, mandiPrice: 200 },
      { date: '2026-09-07', displayDate: '07 Sep', timestamp: 1788825600000, actualPrice: 230, mandiPrice: 198 },
      { date: '2026-09-21', displayDate: '21 Sep', timestamp: 1790035200000, actualPrice: 228, mandiPrice: 195, eventNote: 'Wholesale mandi discount passed to retail' },
      // Today connector
      { date: '2026-09-30', displayDate: 'Today', timestamp: 1790812800000, actualPrice: 228, mandiPrice: 195, predictedPrice: 228, predictedLower: 226, predictedUpper: 230 },
      // Forecast points (Next 4 weeks)
      { date: '2026-10-07', displayDate: '+1 Wk', timestamp: 1791417600000, isForecast: true, predictedPrice: 225, predictedLower: 222, predictedUpper: 228, mandiPrice: 192 },
      { date: '2026-10-14', displayDate: '+2 Wks', timestamp: 1792022400000, isForecast: true, predictedPrice: 221, predictedLower: 218, predictedUpper: 225, mandiPrice: 189, eventNote: 'FCI second tranche auction clears' },
      { date: '2026-10-21', displayDate: '+3 Wks', timestamp: 1792627200000, isForecast: true, predictedPrice: 219, predictedLower: 214, predictedUpper: 223, mandiPrice: 187 },
      { date: '2026-10-28', displayDate: '+4 Wks', timestamp: 1793232000000, isForecast: true, predictedPrice: 218, predictedLower: 212, predictedUpper: 224, mandiPrice: 185, eventNote: 'Projected monthly low of ₹218' }
    ]
  },

  // 2. Tata Sampann Unpolished Toor Dal (1 kg)
  {
    productId: 'groc_13',
    productName: 'Unpolished Toor Dal (Arhar Dal)',
    brand: 'Tata Sampann',
    category: 'Staples',
    unit: '1 kg',
    currentPrice: 158,
    mrp: 185,
    image: 'https://images.unsplash.com/photo-1585994192701-f1a505c817ee?w=500&auto=format&fit=crop&q=80',
    storeId: 'store_3',
    storeName: 'Reliance Smart Point',
    predictedPrice30d: 172,
    predictedChangePercent: 8.9,
    trendDirection: 'rising',
    recommendation: 'BUY_NOW',
    recommendationTitle: 'Buy Now & Stock Up · +8.9% Spike Ahead',
    recommendationReason: 'Upcoming festival season (Navratri & Diwali feast demand) combines with a lean arrival window before the new Kharif crop in late December. Secure your supply today.',
    confidenceScore: 91,
    volatilityIndex: 'Moderate',
    lowestPrice6m: 142,
    highestPrice6m: 168,
    averagePrice6m: 154,
    marketDrivers: [
      {
        title: 'Festive Confectionery & Feast Run',
        factor: 'Domestic Demand',
        impact: 'negative',
        description: 'Institutional catering and household demand surges 28% across October festive milestones.'
      },
      {
        title: 'Delayed Gulbarga Mandi Inflows',
        factor: 'Kharif Harvest Calendar',
        impact: 'negative',
        description: 'New pigeon pea harvest arrivals from North Karnataka and Vidarbha are timed for mid-December, creating an interim stock squeeze.'
      },
      {
        title: 'Import Port Transit Clearance',
        factor: 'Duty & Logistics',
        impact: 'neutral',
        description: 'Imported African pulses shipments at JNPT port are progressing steadily without tariff changes.'
      }
    ],
    priceHistory: [
      { date: '2026-05-04', displayDate: '04 May', timestamp: 1777939200000, actualPrice: 144, mandiPrice: 124 },
      { date: '2026-05-18', displayDate: '18 May', timestamp: 1779148800000, actualPrice: 148, mandiPrice: 128 },
      { date: '2026-06-01', displayDate: '01 Jun', timestamp: 1780358400000, actualPrice: 152, mandiPrice: 131, eventNote: 'MSP revision announcement' },
      { date: '2026-06-15', displayDate: '15 Jun', timestamp: 1781568000000, actualPrice: 158, mandiPrice: 136 },
      { date: '2026-06-29', displayDate: '29 Jun', timestamp: 1782777600000, actualPrice: 165, mandiPrice: 143, eventNote: 'Mid-monsoon pulse supply low' },
      { date: '2026-07-13', displayDate: '13 Jul', timestamp: 1783987200000, actualPrice: 168, mandiPrice: 146 },
      { date: '2026-07-27', displayDate: '27 Jul', timestamp: 1785196800000, actualPrice: 164, mandiPrice: 141 },
      { date: '2026-08-10', displayDate: '10 Aug', timestamp: 1786406400000, actualPrice: 162, mandiPrice: 139 },
      { date: '2026-08-24', displayDate: '24 Aug', timestamp: 1787616000000, actualPrice: 160, mandiPrice: 137 },
      { date: '2026-09-07', displayDate: '07 Sep', timestamp: 1788825600000, actualPrice: 159, mandiPrice: 136 },
      { date: '2026-09-21', displayDate: '21 Sep', timestamp: 1790035200000, actualPrice: 158, mandiPrice: 135 },
      // Today
      { date: '2026-09-30', displayDate: 'Today', timestamp: 1790812800000, actualPrice: 158, mandiPrice: 135, predictedPrice: 158, predictedLower: 156, predictedUpper: 160 },
      // Forecast
      { date: '2026-10-07', displayDate: '+1 Wk', timestamp: 1791417600000, isForecast: true, predictedPrice: 162, predictedLower: 159, predictedUpper: 165, mandiPrice: 139, eventNote: 'Navratri procurement starts' },
      { date: '2026-10-14', displayDate: '+2 Wks', timestamp: 1792022400000, isForecast: true, predictedPrice: 166, predictedLower: 162, predictedUpper: 170, mandiPrice: 143 },
      { date: '2026-10-21', displayDate: '+3 Wks', timestamp: 1792627200000, isForecast: true, predictedPrice: 170, predictedLower: 165, predictedUpper: 175, mandiPrice: 147, eventNote: 'Pre-Diwali peak wholesale rate' },
      { date: '2026-10-28', displayDate: '+4 Wks', timestamp: 1793232000000, isForecast: true, predictedPrice: 172, predictedLower: 167, predictedUpper: 178, mandiPrice: 149 }
    ]
  },

  // 3. Farm Fresh Hybrid Tomatoes (1 kg)
  {
    productId: 'groc_3',
    productName: 'Farm Fresh Hybrid Tomatoes',
    brand: 'Kisan Fresh',
    category: 'Vegetables',
    unit: '1 kg',
    currentPrice: 32,
    mrp: 45,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80',
    storeId: 'store_1',
    storeName: 'FreshMart Supermarket',
    predictedPrice30d: 27,
    predictedChangePercent: -15.6,
    trendDirection: 'falling',
    recommendation: 'BUY_NOW',
    recommendationTitle: 'Prime Fresh Value Window · Near Seasonal Lows',
    recommendationReason: 'Bumper regional crop arrivals from Kolar and Madanapalle mandis have saturated the supply chain. Price is near the lowest point of the year with peak freshness.',
    confidenceScore: 95,
    volatilityIndex: 'High',
    lowestPrice6m: 28,
    highestPrice6m: 84,
    averagePrice6m: 46,
    marketDrivers: [
      {
        title: 'Mandi Inflow Surge (+44% WoW)',
        factor: 'Local Mandi Supply',
        impact: 'positive',
        description: 'Daily tomato arrivals in Kalasipalya and Kolar mandis breached 8,500 quintals per day.'
      },
      {
        title: 'Favourable Transit Weather',
        factor: 'Farm-to-Store Logistics',
        impact: 'positive',
        description: 'Dry autumn road conditions eliminated truck transit damage and rotting loss.'
      },
      {
        title: 'No Supply Choke Points',
        factor: 'Perishable Produce Yield',
        impact: 'positive',
        description: 'Simultaneous ripening in southern green belts keeps wholesale pricing competitive.'
      }
    ],
    priceHistory: [
      { date: '2026-05-04', displayDate: '04 May', timestamp: 1777939200000, actualPrice: 38, mandiPrice: 28 },
      { date: '2026-05-18', displayDate: '18 May', timestamp: 1779148800000, actualPrice: 42, mandiPrice: 32 },
      { date: '2026-06-01', displayDate: '01 Jun', timestamp: 1780358400000, actualPrice: 55, mandiPrice: 44, eventNote: 'Initial monsoon rains disrupt harvesting' },
      { date: '2026-06-15', displayDate: '15 Jun', timestamp: 1781568000000, actualPrice: 72, mandiPrice: 59 },
      { date: '2026-06-29', displayDate: '29 Jun', timestamp: 1782777600000, actualPrice: 84, mandiPrice: 70, eventNote: 'Peak monsoon tomato price spike' },
      { date: '2026-07-13', displayDate: '13 Jul', timestamp: 1783987200000, actualPrice: 76, mandiPrice: 62 },
      { date: '2026-07-27', displayDate: '27 Jul', timestamp: 1785196800000, actualPrice: 62, mandiPrice: 49 },
      { date: '2026-08-10', displayDate: '10 Aug', timestamp: 1786406400000, actualPrice: 50, mandiPrice: 38, eventNote: 'Fresh harvest begins arriving' },
      { date: '2026-08-24', displayDate: '24 Aug', timestamp: 1787616000000, actualPrice: 42, mandiPrice: 32 },
      { date: '2026-09-07', displayDate: '07 Sep', timestamp: 1788825600000, actualPrice: 36, mandiPrice: 26 },
      { date: '2026-09-21', displayDate: '21 Sep', timestamp: 1790035200000, actualPrice: 33, mandiPrice: 24 },
      // Today
      { date: '2026-09-30', displayDate: 'Today', timestamp: 1790812800000, actualPrice: 32, mandiPrice: 23, predictedPrice: 32, predictedLower: 30, predictedUpper: 34 },
      // Forecast
      { date: '2026-10-07', displayDate: '+1 Wk', timestamp: 1791417600000, isForecast: true, predictedPrice: 30, predictedLower: 27, predictedUpper: 33, mandiPrice: 21 },
      { date: '2026-10-14', displayDate: '+2 Wks', timestamp: 1792022400000, isForecast: true, predictedPrice: 28, predictedLower: 25, predictedUpper: 31, mandiPrice: 19, eventNote: 'Peak flush arrivals' },
      { date: '2026-10-21', displayDate: '+3 Wks', timestamp: 1792627200000, isForecast: true, predictedPrice: 27, predictedLower: 24, predictedUpper: 30, mandiPrice: 18 },
      { date: '2026-10-28', displayDate: '+4 Wks', timestamp: 1793232000000, isForecast: true, predictedPrice: 27, predictedLower: 23, predictedUpper: 31, mandiPrice: 18 }
    ]
  },

  // 4. Fortune Sunlite Refined Sunflower Oil Pouch (1 L)
  {
    productId: 'groc_6',
    productName: 'Sunlite Refined Sunflower Oil Pouch',
    brand: 'Fortune',
    category: 'Staples',
    unit: '1 L',
    currentPrice: 122,
    mrp: 145,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80',
    storeId: 'store_1',
    storeName: 'FreshMart Supermarket',
    predictedPrice30d: 130,
    predictedChangePercent: 6.6,
    trendDirection: 'rising',
    recommendation: 'BUY_NOW',
    recommendationTitle: 'Lock In Current Price · Moderate Rise Expected',
    recommendationReason: 'International CIF import parity contracts for edible crude sunflower oil rose 4.8% at Kandla and Chennai ports. Buying 2-3 packs hedges against upcoming retail revisions.',
    confidenceScore: 88,
    volatilityIndex: 'Moderate',
    lowestPrice6m: 108,
    highestPrice6m: 126,
    averagePrice6m: 118,
    marketDrivers: [
      {
        title: 'Global Edible Oil Futures',
        factor: 'Import Parity Rate',
        impact: 'negative',
        description: 'Black Sea region harvest freights and foreign currency exchange adjustments added landing cost pressure.'
      },
      {
        title: 'Festive Confectionery Production',
        factor: 'Institutional Demand',
        impact: 'negative',
        description: 'Commercial bakeries and sweet manufacturers are ramping up deep-fry oil bulk stocking.'
      },
      {
        title: 'Domestic Mustard Substitution',
        factor: 'Alternative Oils Cushion',
        impact: 'positive',
        description: 'Strong domestic mustard seed harvest is capping extreme runaway escalation in refined seed oils.'
      }
    ],
    priceHistory: [
      { date: '2026-05-04', displayDate: '04 May', timestamp: 1777939200000, actualPrice: 110, mandiPrice: 94 },
      { date: '2026-05-18', displayDate: '18 May', timestamp: 1779148800000, actualPrice: 112, mandiPrice: 96 },
      { date: '2026-06-01', displayDate: '01 Jun', timestamp: 1780358400000, actualPrice: 115, mandiPrice: 98 },
      { date: '2026-06-15', displayDate: '15 Jun', timestamp: 1781568000000, actualPrice: 116, mandiPrice: 99 },
      { date: '2026-06-29', displayDate: '29 Jun', timestamp: 1782777600000, actualPrice: 118, mandiPrice: 101 },
      { date: '2026-07-13', displayDate: '13 Jul', timestamp: 1783987200000, actualPrice: 119, mandiPrice: 102 },
      { date: '2026-07-27', displayDate: '27 Jul', timestamp: 1785196800000, actualPrice: 120, mandiPrice: 103 },
      { date: '2026-08-10', displayDate: '10 Aug', timestamp: 1786406400000, actualPrice: 121, mandiPrice: 104 },
      { date: '2026-08-24', displayDate: '24 Aug', timestamp: 1787616000000, actualPrice: 121, mandiPrice: 104 },
      { date: '2026-09-07', displayDate: '07 Sep', timestamp: 1788825600000, actualPrice: 122, mandiPrice: 105 },
      { date: '2026-09-21', displayDate: '21 Sep', timestamp: 1790035200000, actualPrice: 122, mandiPrice: 105 },
      // Today
      { date: '2026-09-30', displayDate: 'Today', timestamp: 1790812800000, actualPrice: 122, mandiPrice: 105, predictedPrice: 122, predictedLower: 120, predictedUpper: 124 },
      // Forecast
      { date: '2026-10-07', displayDate: '+1 Wk', timestamp: 1791417600000, isForecast: true, predictedPrice: 124, predictedLower: 122, predictedUpper: 127, mandiPrice: 107 },
      { date: '2026-10-14', displayDate: '+2 Wks', timestamp: 1792022400000, isForecast: true, predictedPrice: 126, predictedLower: 123, predictedUpper: 129, mandiPrice: 109, eventNote: 'New import consignments landing' },
      { date: '2026-10-21', displayDate: '+3 Wks', timestamp: 1792627200000, isForecast: true, predictedPrice: 128, predictedLower: 125, predictedUpper: 132, mandiPrice: 111 },
      { date: '2026-10-28', displayDate: '+4 Wks', timestamp: 1793232000000, isForecast: true, predictedPrice: 130, predictedLower: 126, predictedUpper: 134, mandiPrice: 112 }
    ]
  },

  // 5. Conscious Food Cold Pressed Virgin Mustard Oil (1 L)
  {
    productId: 'groc_16',
    productName: 'Cold Pressed Virgin Mustard Oil',
    brand: 'Conscious Food',
    category: 'Staples',
    unit: '1 L Glass Bottle',
    currentPrice: 275,
    mrp: 320,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80',
    storeId: 'store_4',
    storeName: 'Organic India & Herbal Haven',
    predictedPrice30d: 274,
    predictedChangePercent: -0.4,
    trendDirection: 'stable',
    recommendation: 'STABLE_BUY',
    recommendationTitle: 'Price Equilibrium · Normal Buying Recommended',
    recommendationReason: 'Historic record mustard seed crop harvest has created a massive buffer stock in Rajasthan and UP crushers, maintaining exceptionally balanced consumer prices.',
    confidenceScore: 96,
    volatilityIndex: 'Low',
    lowestPrice6m: 265,
    highestPrice6m: 278,
    averagePrice6m: 271,
    marketDrivers: [
      {
        title: 'Record Domestic Mustard Seed Output',
        factor: 'Agricultural Yield',
        impact: 'positive',
        description: 'National mustard production surpassed 13.2 million metric tonnes, creating strong inventory cover.'
      },
      {
        title: 'Stable Organic Processing Margins',
        factor: 'Cold-Press Bottling',
        impact: 'neutral',
        description: 'Certified organic seed extraction supply chain has no backlog or transit delays.'
      }
    ],
    priceHistory: [
      { date: '2026-05-04', displayDate: '04 May', timestamp: 1777939200000, actualPrice: 266, mandiPrice: 228 },
      { date: '2026-05-18', displayDate: '18 May', timestamp: 1779148800000, actualPrice: 268, mandiPrice: 230 },
      { date: '2026-06-01', displayDate: '01 Jun', timestamp: 1780358400000, actualPrice: 270, mandiPrice: 232 },
      { date: '2026-06-15', displayDate: '15 Jun', timestamp: 1781568000000, actualPrice: 272, mandiPrice: 234 },
      { date: '2026-06-29', displayDate: '29 Jun', timestamp: 1782777600000, actualPrice: 274, mandiPrice: 235 },
      { date: '2026-07-13', displayDate: '13 Jul', timestamp: 1783987200000, actualPrice: 274, mandiPrice: 235 },
      { date: '2026-07-27', displayDate: '27 Jul', timestamp: 1785196800000, actualPrice: 275, mandiPrice: 236 },
      { date: '2026-08-10', displayDate: '10 Aug', timestamp: 1786406400000, actualPrice: 275, mandiPrice: 236 },
      { date: '2026-08-24', displayDate: '24 Aug', timestamp: 1787616000000, actualPrice: 275, mandiPrice: 236 },
      { date: '2026-09-07', displayDate: '07 Sep', timestamp: 1788825600000, actualPrice: 275, mandiPrice: 236 },
      { date: '2026-09-21', displayDate: '21 Sep', timestamp: 1790035200000, actualPrice: 275, mandiPrice: 236 },
      // Today
      { date: '2026-09-30', displayDate: 'Today', timestamp: 1790812800000, actualPrice: 275, mandiPrice: 236, predictedPrice: 275, predictedLower: 273, predictedUpper: 277 },
      // Forecast
      { date: '2026-10-07', displayDate: '+1 Wk', timestamp: 1791417600000, isForecast: true, predictedPrice: 275, predictedLower: 272, predictedUpper: 278, mandiPrice: 236 },
      { date: '2026-10-14', displayDate: '+2 Wks', timestamp: 1792022400000, isForecast: true, predictedPrice: 274, predictedLower: 271, predictedUpper: 277, mandiPrice: 235 },
      { date: '2026-10-21', displayDate: '+3 Wks', timestamp: 1792627200000, isForecast: true, predictedPrice: 274, predictedLower: 270, predictedUpper: 278, mandiPrice: 235 },
      { date: '2026-10-28', displayDate: '+4 Wks', timestamp: 1793232000000, isForecast: true, predictedPrice: 274, predictedLower: 269, predictedUpper: 279, mandiPrice: 235 }
    ]
  },

  // 6. True Elements Rolled Oats (1 kg)
  {
    productId: 'groc_4',
    productName: 'Rolled Oats Whole Grain (Gluten Free)',
    brand: 'True Elements',
    category: 'Staples',
    unit: '1 kg',
    currentPrice: 289,
    mrp: 350,
    image: 'https://images.unsplash.com/photo-1614961908595-5dbbe8645719?w=500&auto=format&fit=crop&q=80',
    storeId: 'store_1',
    storeName: 'FreshMart Supermarket',
    predictedPrice30d: 282,
    predictedChangePercent: -2.4,
    trendDirection: 'falling',
    recommendation: 'STABLE_BUY',
    recommendationTitle: 'Mild Softening · Great Breakfast Restock Time',
    recommendationReason: 'Australian whole grain import consignments cleared with low tariff overhead, translating to slight promotional discount buffers on retail packs.',
    confidenceScore: 92,
    volatilityIndex: 'Low',
    lowestPrice6m: 285,
    highestPrice6m: 305,
    averagePrice6m: 294,
    marketDrivers: [
      {
        title: 'Raw Grain Shipments Landed',
        factor: 'Import Shipments',
        impact: 'positive',
        description: 'New grain batches arrived at western ports with zero demurrage delays.'
      },
      {
        title: 'High Breakfast Category Competition',
        factor: 'Brand Competitiveness',
        impact: 'positive',
        description: 'Competitive pricing against rolled barley and millets keeps price increases in check.'
      }
    ],
    priceHistory: [
      { date: '2026-05-04', displayDate: '04 May', timestamp: 1777939200000, actualPrice: 298, mandiPrice: 250 },
      { date: '2026-05-18', displayDate: '18 May', timestamp: 1779148800000, actualPrice: 298, mandiPrice: 250 },
      { date: '2026-06-01', displayDate: '01 Jun', timestamp: 1780358400000, actualPrice: 295, mandiPrice: 248 },
      { date: '2026-06-15', displayDate: '15 Jun', timestamp: 1781568000000, actualPrice: 295, mandiPrice: 248 },
      { date: '2026-06-29', displayDate: '29 Jun', timestamp: 1782777600000, actualPrice: 292, mandiPrice: 245 },
      { date: '2026-07-13', displayDate: '13 Jul', timestamp: 1783987200000, actualPrice: 292, mandiPrice: 245 },
      { date: '2026-07-27', displayDate: '27 Jul', timestamp: 1785196800000, actualPrice: 290, mandiPrice: 243 },
      { date: '2026-08-10', displayDate: '10 Aug', timestamp: 1786406400000, actualPrice: 289, mandiPrice: 242 },
      { date: '2026-08-24', displayDate: '24 Aug', timestamp: 1787616000000, actualPrice: 289, mandiPrice: 242 },
      { date: '2026-09-07', displayDate: '07 Sep', timestamp: 1788825600000, actualPrice: 289, mandiPrice: 242 },
      { date: '2026-09-21', displayDate: '21 Sep', timestamp: 1790035200000, actualPrice: 289, mandiPrice: 242 },
      // Today
      { date: '2026-09-30', displayDate: 'Today', timestamp: 1790812800000, actualPrice: 289, mandiPrice: 242, predictedPrice: 289, predictedLower: 287, predictedUpper: 291 },
      // Forecast
      { date: '2026-10-07', displayDate: '+1 Wk', timestamp: 1791417600000, isForecast: true, predictedPrice: 287, predictedLower: 284, predictedUpper: 290, mandiPrice: 240 },
      { date: '2026-10-14', displayDate: '+2 Wks', timestamp: 1792022400000, isForecast: true, predictedPrice: 285, predictedLower: 282, predictedUpper: 288, mandiPrice: 238 },
      { date: '2026-10-21', displayDate: '+3 Wks', timestamp: 1792627200000, isForecast: true, predictedPrice: 283, predictedLower: 280, predictedUpper: 287, mandiPrice: 236 },
      { date: '2026-10-28', displayDate: '+4 Wks', timestamp: 1793232000000, isForecast: true, predictedPrice: 282, predictedLower: 278, predictedUpper: 286, mandiPrice: 235 }
    ]
  },

  // 7. Green Farms Fresh Palak / Spinach (250 g)
  {
    productId: 'groc_8',
    productName: 'Fresh Spinach / Palak Leaves (Clean Bunch)',
    brand: 'Green Farms',
    category: 'Vegetables',
    unit: '250 g',
    currentPrice: 22,
    mrp: 30,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=80',
    storeId: 'store_1',
    storeName: 'FreshMart Supermarket',
    predictedPrice30d: 20,
    predictedChangePercent: -9.1,
    trendDirection: 'falling',
    recommendation: 'BUY_NOW',
    recommendationTitle: 'Seasonal Quality Peak · Best Freshness Value',
    recommendationReason: 'Post-monsoon winter vegetable cycle creates quick harvest turnarounds for local green belts around Hosakote and Malur.',
    confidenceScore: 94,
    volatilityIndex: 'Moderate',
    lowestPrice6m: 18,
    highestPrice6m: 36,
    averagePrice6m: 26,
    marketDrivers: [
      {
        title: 'Rapid Crop Harvest Cycles',
        factor: 'Leafy Greens Yield',
        impact: 'positive',
        description: 'Dry pleasant mornings accelerate germination and daily harvest of fresh greens.'
      },
      {
        title: 'Zero Transit Rain Damage',
        factor: 'Shelf Life & Spoilage',
        impact: 'positive',
        description: 'Lack of excessive moisture prevents leaf decay during early morning transportation.'
      }
    ],
    priceHistory: [
      { date: '2026-05-04', displayDate: '04 May', timestamp: 1777939200000, actualPrice: 24, mandiPrice: 17 },
      { date: '2026-05-18', displayDate: '18 May', timestamp: 1779148800000, actualPrice: 25, mandiPrice: 18 },
      { date: '2026-06-01', displayDate: '01 Jun', timestamp: 1780358400000, actualPrice: 28, mandiPrice: 20 },
      { date: '2026-06-15', displayDate: '15 Jun', timestamp: 1781568000000, actualPrice: 32, mandiPrice: 24, eventNote: 'Monsoon rot damage' },
      { date: '2026-06-29', displayDate: '29 Jun', timestamp: 1782777600000, actualPrice: 35, mandiPrice: 27 },
      { date: '2026-07-13', displayDate: '13 Jul', timestamp: 1783987200000, actualPrice: 34, mandiPrice: 26 },
      { date: '2026-07-27', displayDate: '27 Jul', timestamp: 1785196800000, actualPrice: 30, mandiPrice: 22 },
      { date: '2026-08-10', displayDate: '10 Aug', timestamp: 1786406400000, actualPrice: 28, mandiPrice: 20 },
      { date: '2026-08-24', displayDate: '24 Aug', timestamp: 1787616000000, actualPrice: 25, mandiPrice: 18 },
      { date: '2026-09-07', displayDate: '07 Sep', timestamp: 1788825600000, actualPrice: 24, mandiPrice: 17 },
      { date: '2026-09-21', displayDate: '21 Sep', timestamp: 1790035200000, actualPrice: 23, mandiPrice: 16 },
      // Today
      { date: '2026-09-30', displayDate: 'Today', timestamp: 1790812800000, actualPrice: 22, mandiPrice: 15, predictedPrice: 22, predictedLower: 20, predictedUpper: 23 },
      // Forecast
      { date: '2026-10-07', displayDate: '+1 Wk', timestamp: 1791417600000, isForecast: true, predictedPrice: 21, predictedLower: 19, predictedUpper: 23, mandiPrice: 14 },
      { date: '2026-10-14', displayDate: '+2 Wks', timestamp: 1792022400000, isForecast: true, predictedPrice: 20, predictedLower: 18, predictedUpper: 22, mandiPrice: 13 },
      { date: '2026-10-21', displayDate: '+3 Wks', timestamp: 1792627200000, isForecast: true, predictedPrice: 20, predictedLower: 18, predictedUpper: 22, mandiPrice: 13 },
      { date: '2026-10-28', displayDate: '+4 Wks', timestamp: 1793232000000, isForecast: true, predictedPrice: 20, predictedLower: 17, predictedUpper: 22, mandiPrice: 13 }
    ]
  },

  // 8. Farm Fresh Robusta Bananas (1 kg)
  {
    productId: 'groc_2',
    productName: 'Robusta Bananas (Chikmagalur)',
    brand: 'Farm Fresh',
    category: 'Fruits',
    unit: '1 kg (5-6 pcs)',
    currentPrice: 48,
    mrp: 65,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=80',
    storeId: 'store_1',
    storeName: 'FreshMart Supermarket',
    predictedPrice30d: 45,
    predictedChangePercent: -6.2,
    trendDirection: 'falling',
    recommendation: 'BUY_NOW',
    recommendationTitle: 'Abundant Supply · Competitive Daily Fruit Rate',
    recommendationReason: 'Southern plantations in Chikmagalur and Salem report heavy cutting cycles, ensuring daily arrivals remain high and affordable.',
    confidenceScore: 90,
    volatilityIndex: 'Low',
    lowestPrice6m: 44,
    highestPrice6m: 56,
    averagePrice6m: 49,
    marketDrivers: [
      {
        title: 'South India Plantation Flush',
        factor: 'Harvest Inflows',
        impact: 'positive',
        description: 'Bumper bunch yields reaching wholesale fruit markets without transport friction.'
      }
    ],
    priceHistory: [
      { date: '2026-05-04', displayDate: '04 May', timestamp: 1777939200000, actualPrice: 52, mandiPrice: 38 },
      { date: '2026-05-18', displayDate: '18 May', timestamp: 1779148800000, actualPrice: 52, mandiPrice: 38 },
      { date: '2026-06-01', displayDate: '01 Jun', timestamp: 1780358400000, actualPrice: 54, mandiPrice: 40 },
      { date: '2026-06-15', displayDate: '15 Jun', timestamp: 1781568000000, actualPrice: 55, mandiPrice: 41 },
      { date: '2026-06-29', displayDate: '29 Jun', timestamp: 1782777600000, actualPrice: 53, mandiPrice: 39 },
      { date: '2026-07-13', displayDate: '13 Jul', timestamp: 1783987200000, actualPrice: 51, mandiPrice: 37 },
      { date: '2026-07-27', displayDate: '27 Jul', timestamp: 1785196800000, actualPrice: 50, mandiPrice: 36 },
      { date: '2026-08-10', displayDate: '10 Aug', timestamp: 1786406400000, actualPrice: 50, mandiPrice: 36 },
      { date: '2026-08-24', displayDate: '24 Aug', timestamp: 1787616000000, actualPrice: 49, mandiPrice: 35 },
      { date: '2026-09-07', displayDate: '07 Sep', timestamp: 1788825600000, actualPrice: 48, mandiPrice: 34 },
      { date: '2026-09-21', displayDate: '21 Sep', timestamp: 1790035200000, actualPrice: 48, mandiPrice: 34 },
      // Today
      { date: '2026-09-30', displayDate: 'Today', timestamp: 1790812800000, actualPrice: 48, mandiPrice: 34, predictedPrice: 48, predictedLower: 46, predictedUpper: 50 },
      // Forecast
      { date: '2026-10-07', displayDate: '+1 Wk', timestamp: 1791417600000, isForecast: true, predictedPrice: 47, predictedLower: 45, predictedUpper: 49, mandiPrice: 33 },
      { date: '2026-10-14', displayDate: '+2 Wks', timestamp: 1792022400000, isForecast: true, predictedPrice: 46, predictedLower: 44, predictedUpper: 48, mandiPrice: 32 },
      { date: '2026-10-21', displayDate: '+3 Wks', timestamp: 1792627200000, isForecast: true, predictedPrice: 45, predictedLower: 43, predictedUpper: 47, mandiPrice: 31 },
      { date: '2026-10-28', displayDate: '+4 Wks', timestamp: 1793232000000, isForecast: true, predictedPrice: 45, predictedLower: 42, predictedUpper: 48, mandiPrice: 31 }
    ]
  }
];

export const getStapleTrendByProductId = (productId: string): StaplePriceTrend | undefined => {
  return STAPLE_PRICE_TRENDS.find(t => t.productId === productId);
};

export const getScenarioAdjustedTrend = (
  baseTrend: StaplePriceTrend,
  scenario: ForecastScenario
): StaplePriceTrend => {
  if (scenario === 'baseline') return baseTrend;

  // Clone trend and adjust forecast
  const multiplier = scenario === 'festive_surge' ? 1.07 : 0.94;
  const changeBonus = scenario === 'festive_surge' ? +7 : -6;

  const adjustedHistory = baseTrend.priceHistory.map(pt => {
    if (!pt.isForecast) return pt;
    const baseP = pt.predictedPrice || baseTrend.currentPrice;
    const newP = Math.round(baseP * multiplier);
    return {
      ...pt,
      predictedPrice: newP,
      predictedLower: Math.round(newP * 0.96),
      predictedUpper: Math.round(newP * 1.04)
    };
  });

  const lastForecast = adjustedHistory[adjustedHistory.length - 1];
  const new30d = lastForecast.predictedPrice || baseTrend.predictedPrice30d;
  const newChangePercent = Number((((new30d - baseTrend.currentPrice) / baseTrend.currentPrice) * 100).toFixed(1));

  let newRecommendation: StaplePriceTrend['recommendation'] = baseTrend.recommendation;
  let newTitle = baseTrend.recommendationTitle;

  if (scenario === 'festive_surge') {
    newRecommendation = 'BUY_NOW';
    newTitle = `Festive Surge Model: Expected ${newChangePercent > 0 ? '+' : ''}${newChangePercent}% Price Rise`;
  } else if (scenario === 'bumper_harvest') {
    newRecommendation = 'WAIT_AND_SAVE';
    newTitle = `Bumper Harvest Model: Anticipated ${newChangePercent}% Price Drop`;
  }

  return {
    ...baseTrend,
    predictedPrice30d: new30d,
    predictedChangePercent: newChangePercent,
    trendDirection: newChangePercent > 1 ? 'rising' : newChangePercent < -1 ? 'falling' : 'stable',
    recommendation: newRecommendation,
    recommendationTitle: newTitle,
    priceHistory: adjustedHistory
  };
};
