import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { db } from '../../services/dbService';
import { SMART_RECIPES } from '../../data/recipesData';
import { SmartRecipe, RecipeIngredient } from '../../types';
import {
  UtensilsCrossed,
  Sparkles,
  Clock,
  Flame,
  CheckCircle2,
  Plus,
  ArrowRight,
  ChevronRight,
  ShoppingBag,
  Info,
  X,
  ChefHat,
  Filter,
  Check,
  AlertCircle
} from 'lucide-react';

interface SmartRecipeSuggestionsProps {
  compact?: boolean;
  onOpenCheckout?: () => void;
}

export const SmartRecipeSuggestions: React.FC<SmartRecipeSuggestionsProps> = ({
  compact = false,
  onOpenCheckout
}) => {
  const { cart, addToCart, showToast } = useApp();
  const [selectedRecipe, setSelectedRecipe] = useState<SmartRecipe | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Extract grocery item IDs in customer's current basket
  const groceryCart = useMemo(() => {
    return cart.filter(item => item.serviceType === 'grocery');
  }, [cart]);

  const basketItemIds = useMemo(() => {
    return new Set(groceryCart.map(item => item.itemId));
  }, [groceryCart]);

  // Analyze each recipe against current basket
  const analyzedRecipes = useMemo(() => {
    return SMART_RECIPES.map(recipe => {
      const totalCount = recipe.ingredients.length;
      const matchedIngredients = recipe.ingredients.filter(ing => basketItemIds.has(ing.productId));
      const missingIngredients = recipe.ingredients.filter(ing => !basketItemIds.has(ing.productId));
      const matchCount = matchedIngredients.length;
      const matchPercent = Math.round((matchCount / totalCount) * 100);
      const missingCost = missingIngredients.reduce((sum, ing) => sum + ing.price, 0);
      const isComplete = missingIngredients.length === 0;

      return {
        ...recipe,
        matchedIngredients,
        missingIngredients,
        matchCount,
        totalCount,
        matchPercent,
        missingCost,
        isComplete
      };
    }).sort((a, b) => {
      // Prioritize recipes that have matches in basket
      if (b.matchPercent !== a.matchPercent) {
        return b.matchPercent - a.matchPercent;
      }
      return a.title.localeCompare(b.title);
    });
  }, [basketItemIds]);

  // Filter recipes by tag / category
  const filteredRecipes = useMemo(() => {
    if (activeFilter === 'All') return analyzedRecipes;
    if (activeFilter === 'Matched') {
      return analyzedRecipes.filter(r => r.matchCount > 0);
    }
    if (activeFilter === 'Quick') {
      return analyzedRecipes.filter(r => (r.prepTimeMin + r.cookTimeMin) <= 20);
    }
    if (activeFilter === 'High Protein') {
      return analyzedRecipes.filter(r => r.dietType === 'High-Protein' || r.tags.includes('High Protein'));
    }
    if (activeFilter === 'Breakfast') {
      return analyzedRecipes.filter(r => r.tags.some(t => t.toLowerCase().includes('breakfast') || t.toLowerCase().includes('smoothie') || t.toLowerCase().includes('brunch')));
    }
    return analyzedRecipes;
  }, [analyzedRecipes, activeFilter]);

  // Add all missing ingredients of a recipe to the cart
  const handleAddMissingIngredients = (recipe: typeof analyzedRecipes[0], e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const missing = recipe.missingIngredients;
    if (missing.length === 0) {
      showToast({
        type: 'info',
        title: 'All Ingredients In Basket',
        message: `You already have all ${recipe.totalCount} items needed to cook ${recipe.title}!`
      });
      return;
    }

    let addedCount = 0;
    let addedCost = 0;

    missing.forEach(ingredient => {
      const product = db.getGroceryProductById(ingredient.productId);
      const store = product ? db.getGroceryStoreById(product.storeId) : undefined;
      const fallbackStore = db.getGroceryStores()[0];

      addToCart({
        itemId: ingredient.productId,
        serviceType: 'grocery',
        sellerId: store?.id || fallbackStore.id,
        sellerName: store?.name || fallbackStore.name,
        name: ingredient.name,
        image: ingredient.image,
        price: ingredient.price,
        quantity: 1,
        weightOrSize: ingredient.weight
      });

      addedCount++;
      addedCost += ingredient.price;
    });

    showToast({
      type: 'success',
      title: 'Missing Ingredients Added',
      message: `Added ${addedCount} missing ${addedCount === 1 ? 'item' : 'items'} for ${recipe.title} (₹${addedCost}) to your Smart Basket.`
    });
  };

  // Add an individual ingredient to the cart
  const handleAddSingleIngredient = (ingredient: RecipeIngredient, recipeTitle: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const product = db.getGroceryProductById(ingredient.productId);
    const store = product ? db.getGroceryStoreById(product.storeId) : undefined;
    const fallbackStore = db.getGroceryStores()[0];

    addToCart({
      itemId: ingredient.productId,
      serviceType: 'grocery',
      sellerId: store?.id || fallbackStore.id,
      sellerName: store?.name || fallbackStore.name,
      name: ingredient.name,
      image: ingredient.image,
      price: ingredient.price,
      quantity: 1,
      weightOrSize: ingredient.weight
    });

    showToast({
      type: 'success',
      title: 'Ingredient Added',
      message: `${ingredient.name} added to your Smart Basket.`
    });
  };

  // Selected recipe with fresh analysis
  const currentModalRecipe = useMemo(() => {
    if (!selectedRecipe) return null;
    return analyzedRecipes.find(r => r.id === selectedRecipe.id) || null;
  }, [selectedRecipe, analyzedRecipes]);

  return (
    <div className={`bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden ${compact ? 'p-4' : 'p-5 sm:p-7'}`}>
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
            <ChefHat className="w-4 h-4 text-emerald-600" />
            <span>Smart Recipe Intelligence</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span className="text-slate-500">Live Basket Ingredient Matching</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            What Can You Cook Today?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            We scan your grocery items and identify mouthwatering home-cooked meals, with one-tap addition of any missing spices, flours, or fresh greens.
          </p>
        </div>

        {/* Live Basket Status Indicator */}
        <div className="flex items-center gap-3 bg-slate-50 p-2.5 sm:p-3 rounded-2xl border border-slate-200 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span>{groceryCart.length} Grocery {groceryCart.length === 1 ? 'Item' : 'Items'}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="text-[11px] text-slate-500">
              {analyzedRecipes.filter(r => r.matchCount > 0).length} recipes partially in basket
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {[
          { id: 'All', label: 'All Recipes' },
          { id: 'Matched', label: 'Matches in Basket' },
          { id: 'Quick', label: 'Under 20 Mins' },
          { id: 'High Protein', label: 'High Protein' },
          { id: 'Breakfast', label: 'Breakfast & Bowls' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeFilter === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Empty Grocery Basket Guidance Notice */}
      {groceryCart.length === 0 && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <div className="text-xs text-amber-900">
            <span className="font-bold">Your grocery basket is currently empty.</span> Browse the chef-curated Indian recipes below and tap <strong>"Add missing ingredients to cart"</strong> to bundle everything needed for that meal in a single click!
          </div>
        </div>
      )}

      {/* Recipe Cards Grid */}
      <div className={`grid gap-5 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
        {filteredRecipes.map(recipe => {
          const hasMissing = recipe.missingIngredients.length > 0;
          return (
            <div
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              {/* Recipe Image & Match Badge */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                
                {/* Match Status Strip */}
                <div className="absolute top-2.5 left-2.5">
                  {recipe.isComplete ? (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600/95 text-white text-[11px] font-bold shadow-md backdrop-blur-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Ready to Cook (100%)</span>
                    </div>
                  ) : recipe.matchCount > 0 ? (
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/90 text-white text-[11px] font-bold shadow-md backdrop-blur-xs">
                      <span className="text-emerald-400 font-mono">{recipe.matchCount}/{recipe.totalCount}</span>
                      <span>in basket ({recipe.matchPercent}%)</span>
                    </div>
                  ) : (
                    <div className="px-2.5 py-1 rounded-lg bg-slate-900/75 text-white text-[11px] font-medium backdrop-blur-xs">
                      {recipe.totalCount} ingredients
                    </div>
                  )}
                </div>

                {/* Timing Badge */}
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-white/90 text-slate-900 text-[10px] font-bold shadow-xs backdrop-blur-xs flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{recipe.prepTimeMin + recipe.cookTimeMin}m</span>
                </div>
              </div>

              {/* Recipe Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-1">
                    <span>{recipe.cuisine}</span>
                    <span aria-hidden="true">·</span>
                    <span>{recipe.dietType}</span>
                    <span aria-hidden="true">·</span>
                    <span>{recipe.servings} Servings</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {recipe.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {recipe.subtitle}
                  </p>
                </div>

                {/* Ingredient Quick Summary */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-500 font-medium">Ingredients breakdown:</span>
                    <span className="font-mono font-bold text-slate-700">
                      {recipe.matchedIngredients.length} in basket · {recipe.missingIngredients.length} missing
                    </span>
                  </div>

                  {/* Missing Ingredient Mini Avatars */}
                  <div className="flex items-center gap-1.5 mb-3 overflow-hidden">
                    {recipe.ingredients.map(ing => {
                      const inBasket = basketItemIds.has(ing.productId);
                      return (
                        <div
                          key={ing.productId}
                          title={`${ing.name} (${inBasket ? 'In basket' : 'Missing'})`}
                          className={`relative w-8 h-8 rounded-lg p-0.5 border flex items-center justify-center bg-white ${
                            inBasket ? 'border-emerald-500 ring-1 ring-emerald-400' : 'border-slate-200 opacity-60'
                          }`}
                        >
                          <img src={ing.image} alt={ing.name} className="w-full h-full object-contain" />
                          {inBasket && (
                            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-600 rounded-full text-white flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Primary CTA: Add missing ingredients to cart */}
                  {hasMissing ? (
                    <button
                      type="button"
                      onClick={(e) => handleAddMissingIngredients(recipe, e)}
                      className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>
                        Add {recipe.missingIngredients.length} missing {recipe.missingIngredients.length === 1 ? 'ingredient' : 'ingredients'}
                      </span>
                      <span className="font-mono text-emerald-200">
                        (₹{recipe.missingCost})
                      </span>
                    </button>
                  ) : (
                    <div className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>All ingredients in Smart Basket!</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRecipe(recipe);
                    }}
                    className="w-full text-center text-xs font-semibold text-slate-500 hover:text-slate-800 mt-2 py-1 transition-colors flex items-center justify-center gap-1"
                  >
                    <span>View recipe &amp; step-by-step method</span>
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Recipe Modal */}
      {currentModalRecipe && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
          <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col justify-between">
            
            {/* Modal Header Cover */}
            <div className="relative h-56 sm:h-64 w-full bg-slate-900">
              <img
                src={currentModalRecipe.image}
                alt={currentModalRecipe.title}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
                  <span>{currentModalRecipe.cuisine}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentModalRecipe.dietType}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentModalRecipe.caloriesPerServing} kcal</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black leading-tight text-white">
                  {currentModalRecipe.title}
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  {currentModalRecipe.subtitle}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-7 space-y-6">
              
              {/* Meta stats bar */}
              <div className="grid grid-cols-4 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Prep</div>
                  <div className="font-bold text-slate-800 font-mono">{currentModalRecipe.prepTimeMin}m</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Cook</div>
                  <div className="font-bold text-slate-800 font-mono">{currentModalRecipe.cookTimeMin}m</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Yield</div>
                  <div className="font-bold text-slate-800">{currentModalRecipe.servings} Servings</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Difficulty</div>
                  <div className="font-bold text-slate-800">{currentModalRecipe.difficulty}</div>
                </div>
              </div>

              {/* Basket Ingredients Comparison Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <UtensilsCrossed className="w-4 h-4 text-emerald-600" />
                    <span>Ingredients Checklist ({currentModalRecipe.matchedIngredients.length}/{currentModalRecipe.totalCount} in Basket)</span>
                  </h4>
                  {currentModalRecipe.missingIngredients.length > 0 && (
                    <span className="text-xs font-mono font-bold text-emerald-700">
                      Missing: ₹{currentModalRecipe.missingCost}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {currentModalRecipe.ingredients.map(ing => {
                    const inBasket = basketItemIds.has(ing.productId);
                    return (
                      <div
                        key={ing.productId}
                        className={`flex items-center justify-between p-3 rounded-2xl border transition-colors ${
                          inBasket
                            ? 'bg-emerald-50/60 border-emerald-200'
                            : 'bg-white border-slate-200/90 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={ing.image}
                            alt={ing.name}
                            className="w-10 h-10 rounded-xl object-contain bg-slate-50 p-1 border border-slate-200 shrink-0"
                          />
                          <div>
                            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{ing.name}</span>
                              {inBasket && (
                                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                                  In Basket
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {ing.quantityNeeded} · Pack size: {ing.weight}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 font-mono">
                          <span className="text-xs font-bold text-slate-900">₹{ing.price}</span>
                          {!inBasket ? (
                            <button
                              type="button"
                              onClick={() => handleAddSingleIngredient(ing, currentModalRecipe.title)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 border border-emerald-200 font-bold text-[11px] transition-colors"
                            >
                              + Add
                            </button>
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add missing ingredients CTA button inside modal */}
                {currentModalRecipe.missingIngredients.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => handleAddMissingIngredients(currentModalRecipe)}
                    className="mt-3 w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add all {currentModalRecipe.missingIngredients.length} missing ingredients to cart</span>
                    <span className="font-mono text-emerald-200">(₹{currentModalRecipe.missingCost})</span>
                  </button>
                ) : (
                  <div className="mt-3 p-3 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>All ingredients are in your basket! Ready for checkout.</span>
                  </div>
                )}
              </div>

              {/* Cooking Instructions */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                  <span>Step-by-Step Cooking Method</span>
                </h4>
                <div className="space-y-2.5">
                  {currentModalRecipe.instructions.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs leading-relaxed text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chef tip & Nutrition */}
              {currentModalRecipe.chefTip && (
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Chef's Secret Tip: </span>
                    <span>{currentModalRecipe.chefTip}</span>
                  </div>
                </div>
              )}

              {currentModalRecipe.nutritionInfo && (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono tabular-nums">
                  <span>Protein: <strong className="text-slate-800">{currentModalRecipe.nutritionInfo.protein}</strong></span>
                  <span>·</span>
                  <span>Carbs: <strong className="text-slate-800">{currentModalRecipe.nutritionInfo.carbs}</strong></span>
                  <span>·</span>
                  <span>Fat: <strong className="text-slate-800">{currentModalRecipe.nutritionInfo.fat}</strong></span>
                  <span>·</span>
                  <span>Dietary Fiber: <strong className="text-slate-800">{currentModalRecipe.nutritionInfo.fiber}</strong></span>
                </div>
              )}

            </div>

            {/* Modal Bottom Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between rounded-b-3xl">
              <button
                type="button"
                onClick={() => setSelectedRecipe(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close Recipe
              </button>

              <div className="flex items-center gap-2">
                {currentModalRecipe.missingIngredients.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => handleAddMissingIngredients(currentModalRecipe)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Missing (₹{currentModalRecipe.missingCost})</span>
                  </button>
                ) : onOpenCheckout ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRecipe(null);
                      onOpenCheckout();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>Proceed with Basket</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : null}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
