import { SmartRecipe } from '../types';

export const SMART_RECIPES: SmartRecipe[] = [
  {
    id: 'recipe_1',
    title: 'Homestyle Dal Tadka & Soft Phulkas',
    subtitle: 'Classic comforting yellow lentils with garlic cumin tadka & fluffy rotis',
    cuisine: 'North Indian',
    prepTimeMin: 10,
    cookTimeMin: 20,
    servings: 3,
    caloriesPerServing: 340,
    difficulty: 'Easy',
    dietType: 'Vegetarian',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    description: 'Golden simmered toor dal tempered with sizzling cumin, fresh tomatoes, and garlic cloves in hot sunflower oil, accompanied by warm, ballooning whole wheat rotis.',
    tags: ['High Protein', 'Comfort Dinner', 'Under 30 Mins'],
    chefTip: 'For the smokiest dhaba aroma, add crushed garlic to hot oil just until light golden, then stir in chopped tomatoes with a pinch of salt.',
    nutritionInfo: {
      protein: '16g',
      carbs: '54g',
      fat: '7g',
      fiber: '11g'
    },
    ingredients: [
      {
        productId: 'groc_13',
        name: 'Unpolished Toor Dal (Arhar Dal)',
        brand: 'Tata Sampann',
        quantityNeeded: '1 cup (200g)',
        price: 158,
        weight: '1 kg',
        image: 'https://images.unsplash.com/photo-1585994192701-f1a505c817ee?w=500&auto=format&fit=crop&q=80'
      },
      {
        productId: 'groc_12',
        name: 'Shudh Chakki Atta 100% Whole Wheat',
        brand: 'Aashirvaad',
        quantityNeeded: '2 cups (250g)',
        price: 228,
        weight: '5 kg',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80'
      },
      {
        productId: 'groc_3',
        name: 'Farm Fresh Hybrid Tomatoes',
        brand: 'Kisan Fresh',
        quantityNeeded: '2 ripe medium tomatoes',
        price: 32,
        weight: '1 kg',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80'
      },
      {
        productId: 'groc_6',
        name: 'Sunlite Refined Sunflower Oil Pouch',
        brand: 'Fortune',
        quantityNeeded: '2 tbsp for tempering',
        price: 122,
        weight: '1 L',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80'
      }
    ],
    instructions: [
      'Rinse toor dal thoroughly until water runs clear. Pressure cook with 2.5 cups of water and turmeric for 3 whistles until soft and mushy.',
      'In a wide pan, heat 2 tbsp Fortune Sunflower Oil. Splutter cumin seeds and add minced garlic and green chillies.',
      'Add finely diced Kisan Fresh tomatoes and sauté on medium heat until oil separates from the edges.',
      'Pour the boiled dal into the pan, season with salt, and simmer on gentle heat for 5 minutes until creamy.',
      'Knead Aashirvaad Chakki Atta with warm water into a supple dough. Roll into thin discs and roast on high flame until puffed.',
      'Garnish hot Dal with fresh coriander leaves and serve alongside warm phulkas.'
    ]
  },
  {
    id: 'recipe_2',
    title: 'Dhaba Style Lasooni Palak Dal',
    subtitle: 'Iron-rich spinach wilted into rustic garlic-tempered toor dal',
    cuisine: 'North Indian',
    prepTimeMin: 12,
    cookTimeMin: 18,
    servings: 2,
    caloriesPerServing: 285,
    difficulty: 'Easy',
    dietType: 'High-Protein',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=80',
    description: 'Cleaned tender baby spinach chopped and folded into earthy pigeon pea dal, energized with the bold punch of pungent cold-pressed mustard oil and browned garlic flakes.',
    tags: ['Iron Boost', 'High Protein', 'Wholesome Green'],
    chefTip: 'Do not overcook the spinach leaves; blanching or stirring them in at the end preserves their vibrant emerald green color and crisp micronutrients.',
    nutritionInfo: {
      protein: '18g',
      carbs: '38g',
      fat: '8g',
      fiber: '12g'
    },
    ingredients: [
      {
        productId: 'groc_8',
        name: 'Fresh Spinach / Palak Leaves (Clean Bunch)',
        brand: 'Green Farms',
        quantityNeeded: '1 clean bunch (250g)',
        price: 22,
        weight: '250 g',
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=80'
      },
      {
        productId: 'groc_13',
        name: 'Unpolished Toor Dal (Arhar Dal)',
        brand: 'Tata Sampann',
        quantityNeeded: '1 cup (200g)',
        price: 158,
        weight: '1 kg',
        image: 'https://images.unsplash.com/photo-1585994192701-f1a505c817ee?w=500&auto=format&fit=crop&q=80'
      },
      {
        productId: 'groc_3',
        name: 'Farm Fresh Hybrid Tomatoes',
        brand: 'Kisan Fresh',
        quantityNeeded: '1 large diced tomato',
        price: 32,
        weight: '1 kg',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80'
      },
      {
        productId: 'groc_16',
        name: 'Cold Pressed Virgin Mustard Oil',
        brand: 'Conscious Food',
        quantityNeeded: '1.5 tbsp authentic kachi ghani oil',
        price: 275,
        weight: '1 L Glass Bottle',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80'
      }
    ],
    instructions: [
      'Boil toor dal with salt, turmeric, and diced tomato in 2.5 cups water until creamy and smooth.',
      'Wash Green Farms spinach thoroughly, shake dry, and finely shred the leaves.',
      'In a tadka kadai, heat Conscious Food Mustard Oil to smoking point, then cool slightly to unlock authentic aroma.',
      'Fry thinly sliced garlic cloves till golden brown, then toss in dried red chillies and the shredded spinach.',
      'Stir-fry spinach for 90 seconds until wilted, then pour the sizzling tadka directly over the bubbling dal.',
      'Cover with a lid for 2 minutes to let the mustard garlic essence infuse deeply before serving.'
    ]
  },
  {
    id: 'recipe_3',
    title: 'Superfood Overnight Oats & Berry Bowl',
    subtitle: 'Creamy plant-based chilled oats with sliced bananas & wild blueberries',
    cuisine: 'Continental / Healthy',
    prepTimeMin: 5,
    cookTimeMin: 0,
    servings: 1,
    caloriesPerServing: 310,
    difficulty: 'Easy',
    dietType: 'Vegan',
    image: 'https://images.unsplash.com/photo-1614961908595-5dbbe8645719?w=600&auto=format&fit=crop&q=80',
    description: '100% whole grain jumbo rolled oats steeped in unsweetened almond milk with chia, topped with sweet Chikmagalur bananas and juicy antioxidant-rich blueberries.',
    tags: ['Zero Cooking', 'Heart Healthy', 'Grab & Go Breakfast'],
    chefTip: 'Add a tiny pinch of sea salt and cinnamon powder before refrigerating overnight to naturally sweeten the oats without added refined sugar.',
    nutritionInfo: {
      protein: '11g',
      carbs: '58g',
      fat: '6g',
      fiber: '10g'
    },
    ingredients: [
      {
        productId: 'groc_4',
        name: 'Rolled Oats Whole Grain (Gluten Free)',
        brand: 'True Elements',
        quantityNeeded: '1/2 cup (50g)',
        price: 289,
        weight: '1 kg',
        image: 'https://images.unsplash.com/photo-1614961908595-5dbbe8645719?w=500&auto=format&fit=crop&q=80'
      },
      {
        productId: 'groc_1',
        name: 'Almond Milk Unsweetened (Plant-Based)',
        brand: 'Raw Pressery',
        quantityNeeded: '3/4 cup (180ml)',
        price: 149,
        weight: '1 L',
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80'
      },
      {
        productId: 'groc_2',
        name: 'Robusta Bananas (Chikmagalur)',
        brand: 'Farm Fresh',
        quantityNeeded: '1 ripe banana sliced',
        price: 48,
        weight: '1 kg (5-6 pcs)',
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=80'
      },
      {
        productId: 'groc_11',
        name: 'Fresh Imported Blueberries (Peruvian)',
        brand: 'Berries & Co',
        quantityNeeded: 'Handful (30g)',
        price: 220,
        weight: '125 g Pack',
        image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=500&auto=format&fit=crop&q=80'
      }
    ],
    instructions: [
      'In a wide glass jar or bowl, combine True Elements Rolled Oats with Raw Pressery Almond Milk.',
      'Stir well with a spoon ensuring all oats are submerged in the plant milk.',
      'Seal the jar and place in the refrigerator for at least 4 hours or overnight.',
      'In the morning, top with freshly sliced Farm Fresh bananas and plump chilled blueberries.',
      'Enjoy chilled as a filling, high-fiber breakfast powerhouse.'
    ]
  },
  {
    id: 'recipe_4',
    title: 'Kolkata Sweet-Tangy Tomato Chutney & Crispy Parathas',
    subtitle: 'Slow-simmered spiced tomato relish with flaky layered whole wheat parathas',
    cuisine: 'Bengali / Regional',
    prepTimeMin: 8,
    cookTimeMin: 18,
    servings: 3,
    caloriesPerServing: 360,
    difficulty: 'Easy',
    dietType: 'Vegetarian',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    description: 'Juicy chopped farm tomatoes cooked in pungent virgin mustard oil with panch phoron spice blend, sweetened gently and paired with golden, crispy triangle parathas.',
    tags: ['Regional Special', 'Quick Brunch', 'Sweet & Savoury'],
    chefTip: 'Cooking tomatoes in cold-pressed mustard oil creates the signature nostalgic eastern-Indian aroma that cannot be replicated with neutral oils.',
    nutritionInfo: {
      protein: '9g',
      carbs: '62g',
      fat: '9g',
      fiber: '7g'
    },
    ingredients: [
      {
        productId: 'groc_3',
        name: 'Farm Fresh Hybrid Tomatoes',
        brand: 'Kisan Fresh',
        quantityNeeded: '500g ripe tomatoes',
        price: 32,
        weight: '1 kg',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80'
      },
      {
        productId: 'groc_16',
        name: 'Cold Pressed Virgin Mustard Oil',
        brand: 'Conscious Food',
        quantityNeeded: '2 tbsp',
        price: 275,
        weight: '1 L Glass Bottle',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80'
      },
      {
        productId: 'groc_12',
        name: 'Shudh Chakki Atta 100% Whole Wheat',
        brand: 'Aashirvaad',
        quantityNeeded: '2.5 cups (300g)',
        price: 228,
        weight: '5 kg',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80'
      }
    ],
    instructions: [
      'Chop Kisan Fresh tomatoes into bite-sized chunks.',
      'Heat Conscious Food Mustard oil in a wok. Add a pinch of mustard, fennel, and nigella seeds with a dry red chilli.',
      'Add chopped tomatoes, a pinch of turmeric, and salt. Cook covered on low flame for 10 minutes until juicy and crushed.',
      'Add 2 tbsp jaggery or sugar, simmer for 4 minutes until thick, glossy, and jammy.',
      'Knead Aashirvaad Atta into triangular folded parathas, brush with light oil and shallow fry until crispy with golden blister spots.',
      'Serve hot parathas dipped in the warm, sweet-tangy chutney.'
    ]
  },
  {
    id: 'recipe_5',
    title: 'High-Protein Mango Greek Yogurt Parfait',
    subtitle: 'Thick Alphonso mango yogurt layered with crisp toasted oats & berries',
    cuisine: 'Healthy / Breakfast',
    prepTimeMin: 6,
    cookTimeMin: 2,
    servings: 2,
    caloriesPerServing: 240,
    difficulty: 'Easy',
    dietType: 'High-Protein',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80',
    description: 'Strained probiotic Greek yogurt blended with real mango, layered with crunchy dry-toasted rolled oats, fresh blueberries, and sliced sweet bananas.',
    tags: ['High Protein', 'Post-Workout', 'Dessert Alternative'],
    chefTip: 'Toast True Elements rolled oats dry in a pan on medium flame for 2 minutes with a sprinkle of cinnamon for an irresistible golden granola crunch.',
    nutritionInfo: {
      protein: '14g',
      carbs: '38g',
      fat: '4.5g',
      fiber: '6g'
    },
    ingredients: [
      {
        productId: 'groc_5',
        name: 'Greek Yogurt Alphonso Mango (High Protein)',
        brand: 'Epigamia',
        quantityNeeded: '2 cups (240g)',
        price: 42,
        weight: '120 g',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=80'
      },
      {
        productId: 'groc_4',
        name: 'Rolled Oats Whole Grain (Gluten Free)',
        brand: 'True Elements',
        quantityNeeded: '4 tbsp toasted',
        price: 289,
        weight: '1 kg',
        image: 'https://images.unsplash.com/photo-1614961908595-5dbbe8645719?w=500&auto=format&fit=crop&q=80'
      },
      {
        productId: 'groc_11',
        name: 'Fresh Imported Blueberries (Peruvian)',
        brand: 'Berries & Co',
        quantityNeeded: 'Handful fresh berries',
        price: 220,
        weight: '125 g Pack',
        image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=500&auto=format&fit=crop&q=80'
      },
      {
        productId: 'groc_2',
        name: 'Robusta Bananas (Chikmagalur)',
        brand: 'Farm Fresh',
        quantityNeeded: '1 banana sliced',
        price: 48,
        weight: '1 kg (5-6 pcs)',
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=80'
      }
    ],
    instructions: [
      'In a small dry pan, toss 4 tbsp True Elements rolled oats for 2-3 minutes until golden and nutty.',
      'Spoon a generous base layer of chilled Epigamia Alphonso Mango Greek Yogurt into glass tumblers.',
      'Layer sliced sweet bananas and sprinkle half of the toasted oats.',
      'Add another dollop of mango Greek yogurt, and crown with fresh Berries & Co blueberries and remaining crunchy oats.',
      'Serve immediately or chill for 15 minutes before serving.'
    ]
  },
  {
    id: 'recipe_6',
    title: 'Iron-Rich Spiced Palak Parathas with Stewed Tomatoes',
    subtitle: 'Emerald spinach pureed into chakki atta with ajwain & warm tomato relish',
    cuisine: 'North Indian',
    prepTimeMin: 15,
    cookTimeMin: 15,
    servings: 3,
    caloriesPerServing: 310,
    difficulty: 'Easy',
    dietType: 'Vegetarian',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    description: 'Blanched tender baby spinach leaves puréed with green chillies and kneaded directly into Aashirvaad whole wheat flour, griddled crisp with sunflower oil.',
    tags: ['Kids Lunchbox Favorite', '100% Whole Grain', 'Under 30 Mins'],
    chefTip: 'Knead the dough exclusively with the warm spinach purée without adding extra water for vibrant emerald green color and soft texture.',
    nutritionInfo: {
      protein: '11g',
      carbs: '49g',
      fat: '8g',
      fiber: '9g'
    },
    ingredients: [
      {
        productId: 'groc_8',
        name: 'Fresh Spinach / Palak Leaves (Clean Bunch)',
        brand: 'Green Farms',
        quantityNeeded: '1 fresh bunch (250g)',
        price: 22,
        weight: '250 g',
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=80'
      },
      {
        productId: 'groc_12',
        name: 'Shudh Chakki Atta 100% Whole Wheat',
        brand: 'Aashirvaad',
        quantityNeeded: '2.5 cups (300g)',
        price: 228,
        weight: '5 kg',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80'
      },
      {
        productId: 'groc_3',
        name: 'Farm Fresh Hybrid Tomatoes',
        brand: 'Kisan Fresh',
        quantityNeeded: '3 ripe tomatoes for side dip',
        price: 32,
        weight: '1 kg',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80'
      },
      {
        productId: 'groc_6',
        name: 'Sunlite Refined Sunflower Oil Pouch',
        brand: 'Fortune',
        quantityNeeded: '2 tbsp for shallow frying',
        price: 122,
        weight: '1 L',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80'
      }
    ],
    instructions: [
      'Blanch Green Farms palak in boiling water for 1 minute, drain, and blend into a smooth puree with 1 green chilli and cumin.',
      'In a mixing bowl, mix Aashirvaad Chakki Atta with salt and ajwain (carom seeds).',
      'Pour the spinach puree into the flour and knead into a soft, non-sticky dough. Rest for 10 minutes.',
      'Roll into medium round parathas and cook on a hot tawa with a drizzle of Fortune Sunflower Oil until golden spots appear.',
      'Sauté diced tomatoes with salt and mustard seeds for 5 minutes into a quick chunky relish.',
      'Serve warm palak parathas with the fresh tomato relish and curd.'
    ]
  }
];

export const getRecipeById = (id: string): SmartRecipe | undefined => {
  return SMART_RECIPES.find(r => r.id === id);
};
