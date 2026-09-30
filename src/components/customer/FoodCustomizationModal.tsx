import React, { useState } from 'react';
import { FoodMenuItem, Restaurant, SelectedCustomization } from '../../types';
import { useApp } from '../../context/AppContext';
import { VegIndicator } from '../common/VegIndicator';
import { X, Plus, Check } from 'lucide-react';

interface FoodCustomizationModalProps {
  item: FoodMenuItem;
  restaurant: Restaurant;
  onClose: () => void;
}

export const FoodCustomizationModal: React.FC<FoodCustomizationModalProps> = ({ item, restaurant, onClose }) => {
  const { addToCart } = useApp();

  // Selected options state
  const [selectedOptions, setSelectedOptions] = useState<{ [groupId: string]: string[] }>(() => {
    const initial: { [groupId: string]: string[] } = {};
    item.customizationGroups?.forEach(group => {
      if (group.type === 'single' && group.options.length > 0) {
        initial[group.id] = [group.options[0].id];
      } else {
        initial[group.id] = [];
      }
    });
    return initial;
  });

  const [specialInstructions, setSpecialInstructions] = useState('');

  // Calculate dynamic price live
  let dynamicPrice = item.price;
  const chosenCustomizations: SelectedCustomization[] = [];

  item.customizationGroups?.forEach(group => {
    const selectedOptionIds = selectedOptions[group.id] || [];
    selectedOptionIds.forEach(optId => {
      const opt = group.options.find(o => o.id === optId);
      if (opt) {
        dynamicPrice += opt.price;
        chosenCustomizations.push({
          groupId: group.id,
          groupTitle: group.title,
          optionId: opt.id,
          optionName: opt.name,
          price: opt.price
        });
      }
    });
  });

  const handleSingleSelect = (groupId: string, optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [groupId]: [optionId]
    }));
  };

  const handleMultipleToggle = (groupId: string, optionId: string) => {
    setSelectedOptions(prev => {
      const current = prev[groupId] || [];
      const updated = current.includes(optionId)
        ? current.filter(id => id !== optionId)
        : [...current, optionId];
      return {
        ...prev,
        [groupId]: updated
      };
    });
  };

  const handleAddCustomizedItem = () => {
    addToCart({
      itemId: item.id,
      serviceType: 'food',
      sellerId: restaurant.id,
      sellerName: restaurant.name,
      name: item.name,
      image: item.image,
      price: dynamicPrice,
      quantity: 1,
      isVeg: item.isVeg,
      selectedCustomizations: chosenCustomizations,
      specialInstructions: specialInstructions.trim() || undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        
        {/* Header with image */}
        <div className="relative h-44 w-full bg-slate-100 overflow-hidden shrink-0">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-slate-700 flex items-center justify-center hover:bg-white shadow-xs"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <VegIndicator isVeg={item.isVeg} size="sm" />
              <span className="text-xs text-white/80">{restaurant.name}</span>
            </div>
            <h3 className="text-lg font-bold leading-tight">{item.name}</h3>
          </div>
        </div>

        {/* Scrollable Customization Groups */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {item.customizationGroups?.map(group => {
            const isSingle = group.type === 'single';
            const currentSelected = selectedOptions[group.id] || [];

            return (
              <div key={group.id} className="border-b border-slate-100 pb-5 last:border-b-0">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-slate-900">{group.title}</h4>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {group.required ? 'Required (Choose 1)' : 'Optional (Multiple)'}
                  </span>
                </div>

                <div className="space-y-2">
                  {group.options.map(opt => {
                    const isChecked = currentSelected.includes(opt.id);

                    return (
                      <div
                        key={opt.id}
                        onClick={() =>
                          isSingle ? handleSingleSelect(group.id, opt.id) : handleMultipleToggle(group.id, opt.id)
                        }
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-50/60 border-emerald-500/60 text-emerald-950 font-semibold shadow-xs'
                            : 'bg-slate-50/50 border-slate-200/80 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-${isSingle ? 'full' : 'md'} border flex items-center justify-center ${
                              isChecked
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <span className="text-xs">{opt.name}</span>
                        </div>
                        <span className="text-xs font-semibold text-slate-900">
                          {opt.price === 0 ? 'Free' : `+₹${opt.price}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Cooking Instructions */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Special Cooking Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., Less spicy, extra crisp crust, no onions..."
              value={specialInstructions}
              onChange={e => setSpecialInstructions(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Footer with Dynamic Total & Add Button */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Item Price</p>
            <p className="text-lg font-black text-slate-900">₹{dynamicPrice}</p>
          </div>
          <button
            onClick={handleAddCustomizedItem}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all hover:scale-102"
          >
            <Plus className="w-4 h-4" />
            <span>Add to Smart Basket</span>
          </button>
        </div>

      </div>
    </div>
  );
};
