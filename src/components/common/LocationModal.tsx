import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { MapPin, X, Check, Search, Navigation } from 'lucide-react';

export const LocationModal: React.FC = () => {
  const { isLocationModalOpen, setIsLocationModalOpen, currentCity, currentArea, setLocation } = useApp();
  const [selectedCity, setSelectedCity] = useState<string>(currentCity);
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isLocationModalOpen) return null;

  const areas = BRAND_CONFIG.popularAreas[selectedCity as keyof typeof BRAND_CONFIG.popularAreas] || [];
  const filteredAreas = areas.filter(a => a.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSelectArea = (area: string) => {
    setLocation(selectedCity, area);
  };

  const handleUseCurrentLocation = () => {
    setLocation('Bengaluru', 'Indiranagar');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">Choose Delivery Location</h3>
              <p className="text-xs text-slate-500">Fast delivery from nearest kitchens & dark stores</p>
            </div>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Detect Location Button */}
          <button
            onClick={handleUseCurrentLocation}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-emerald-50/60 hover:border-emerald-300 text-slate-800 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <Navigation className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-900">Use Current GPS Location</p>
                <p className="text-xs text-slate-500">Indiranagar, Bengaluru (Detected)</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-600">Auto-detect</span>
          </button>

          {/* City selector pills */}
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-slate-400 mb-2">
              Select City
            </label>
            <div className="flex flex-wrap gap-1.5">
              {BRAND_CONFIG.availableCities.map(city => (
                <button
                  key={city}
                  onClick={() => {
                    setSelectedCity(city);
                    setSearchQuery('');
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    selectedCity === city
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Search Area */}
          <div>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={`Search areas in ${selectedCity}...`}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Popular Areas list */}
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-slate-400 mb-2">
              Popular Localities in {selectedCity}
            </label>
            <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
              {filteredAreas.length > 0 ? (
                filteredAreas.map(area => {
                  const isSelected = selectedCity === currentCity && area === currentArea;
                  return (
                    <button
                      key={area}
                      onClick={() => handleSelectArea(area)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm text-left transition-colors ${
                        isSelected
                          ? 'bg-emerald-50 text-emerald-900 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                        <span>{area}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-6 text-xs text-slate-400">
                  No areas found. Try a different search.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
