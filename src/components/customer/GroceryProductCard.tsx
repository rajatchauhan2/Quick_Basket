import React from 'react';
import { GroceryProduct, GroceryStore } from '../../types';
import { useApp } from '../../context/AppContext';
import { db } from '../../services/dbService';
import { getStapleTrendByProductId } from '../../data/priceTrendsData';
import { Plus, Minus, Heart, AlertTriangle, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

interface GroceryProductCardProps {
  product: GroceryProduct;
  store?: GroceryStore;
  onOpenPriceTrend?: (productId: string) => void;
}

export const GroceryProductCard: React.FC<GroceryProductCardProps> = ({ product, store, onOpenPriceTrend }) => {
  const { cart, addToCart, updateQuantity, isFavorite, toggleFavorite } = useApp();

  const isFav = isFavorite('products', product.id);
  const sellerStore = store || db.getGroceryStoreById(product.storeId) || db.getGroceryStores()[0];
  const stapleTrend = getStapleTrendByProductId(product.id);

  // Find quantity in cart
  const cartItem = cart.find(ci => ci.itemId === product.id);
  const cartQty = cartItem ? cartItem.quantity : 0;

  const isOutOfStock = product.stock <= 0 || product.inventoryStatus === 'OUT_OF_STOCK';
  const isCriticalStock = product.stock > 0 && (product.stock <= 4 || product.inventoryStatus === 'CRITICAL');
  const isLowStock = product.stock > 4 && (product.stock <= product.reorderLevel || product.inventoryStatus === 'LOW_STOCK');

  const handleAdd = () => {
    if (isOutOfStock) return;
    addToCart({
      itemId: product.id,
      serviceType: 'grocery',
      sellerId: sellerStore.id,
      sellerName: sellerStore.name,
      name: product.name,
      image: product.image,
      price: product.sellingPrice,
      quantity: 1,
      weightOrSize: product.weight
    });
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-col justify-between">
      
      {/* Top Image Box */}
      <div className="relative h-44 sm:h-48 w-full bg-slate-50 flex items-center justify-center p-4 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={`h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300 ${
            isOutOfStock ? 'opacity-40 grayscale' : ''
          }`}
          loading="lazy"
        />

        {/* Discount Badge */}
        {product.discountPercentage > 0 && !isOutOfStock && (
          <div className="absolute top-2.5 left-2.5 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
            {product.discountPercentage}% OFF
          </div>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleFavorite('products', product.id);
          }}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-500 hover:text-rose-500 shadow-xs transition-colors"
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Inventory Stock Warning Pills */}
        {isOutOfStock ? (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-md uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        ) : isCriticalStock ? (
          <div className="absolute bottom-2 left-2 right-2 bg-rose-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded text-center flex items-center justify-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Only {product.stock} left in stock
          </div>
        ) : isLowStock ? (
          <div className="absolute bottom-2 left-2 right-2 bg-amber-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded text-center">
            Low Stock ({product.stock} available)
          </div>
        ) : null}
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Weight */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1">
            <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">
              {product.brand}
            </span>
            <span className="text-slate-600 font-bold bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">
              {product.weight}
            </span>
          </div>

          {/* Name */}
          <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors">
            {product.name}
          </h3>

          <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
            Sold by {sellerStore.name}
          </p>

          {/* Staple Price Fluctuation Forecast Indicator */}
          {stapleTrend && (
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                if (onOpenPriceTrend) {
                  onOpenPriceTrend(product.id);
                }
              }}
              className="mt-2.5 w-full flex items-center justify-between text-[11px] px-2.5 py-1.5 rounded-xl bg-amber-50/90 hover:bg-amber-100 text-amber-950 border border-amber-200/80 transition-colors text-left"
              title="Click to view historical mandi data and 30-day forecast"
            >
              <div className="flex items-center gap-1 font-semibold truncate font-mono tabular-nums">
                {stapleTrend.predictedChangePercent > 1 ? (
                  <TrendingUp className="w-3 h-3 text-rose-600 shrink-0" />
                ) : stapleTrend.predictedChangePercent < -1 ? (
                  <TrendingDown className="w-3 h-3 text-emerald-600 shrink-0" />
                ) : (
                  <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
                )}
                <span className="truncate">
                  {stapleTrend.predictedChangePercent > 0
                    ? `+${stapleTrend.predictedChangePercent}% in 30d`
                    : stapleTrend.predictedChangePercent < 0
                    ? `${stapleTrend.predictedChangePercent}% in 30d`
                    : 'Stable Rate'}
                </span>
              </div>
              <span className="text-[10px] text-amber-800 font-bold shrink-0 underline ml-1">
                Forecast →
              </span>
            </button>
          )}
        </div>

        {/* Price & Add Action */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-slate-900">₹{product.sellingPrice}</span>
              {product.mrp > product.sellingPrice && (
                <span className="text-xs text-slate-400 line-through">₹{product.mrp}</span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Taxes incl.</p>
          </div>

          {/* Add / Stepper Button */}
          {isOutOfStock ? (
            <button
              disabled
              className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-400 text-xs font-semibold cursor-not-allowed"
            >
              Sold Out
            </button>
          ) : cartQty > 0 ? (
            <div className="flex items-center gap-2 bg-slate-900 text-white font-bold text-xs px-2.5 py-1.5 rounded-xl shadow-xs">
              <button
                onClick={() => updateQuantity(cartItem!.id, -1)}
                className="p-0.5 hover:text-emerald-400"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-1 text-emerald-400">{cartQty}</span>
              <button
                onClick={() => {
                  if (cartQty < product.stock) {
                    updateQuantity(cartItem!.id, 1);
                  }
                }}
                className="p-0.5 hover:text-emerald-400"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 hover:border-emerald-600 font-bold text-xs shadow-2xs transition-all uppercase tracking-wider"
            >
              <span>Add</span>
              <Plus className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
