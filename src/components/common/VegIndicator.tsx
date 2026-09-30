import React from 'react';

interface VegIndicatorProps {
  isVeg: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const VegIndicator: React.FC<VegIndicatorProps> = ({ isVeg, size = 'md', showLabel = false }) => {
  const boxSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : size === 'lg' ? 'w-2.5 h-2.5' : 'w-2 h-2';

  if (isVeg) {
    return (
      <div className="inline-flex items-center gap-1.5" title="Vegetarian">
        <span
          className={`${boxSize} border border-emerald-600 rounded-[3px] flex items-center justify-center bg-white shrink-0`}
        >
          <span className={`${dotSize} rounded-full bg-emerald-600`} />
        </span>
        {showLabel && <span className="text-xs font-medium text-emerald-700">Veg</span>}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5" title="Non-Vegetarian">
      <span
        className={`${boxSize} border border-rose-700 rounded-[3px] flex items-center justify-center bg-white shrink-0`}
      >
        <span
          className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-rose-700"
        />
      </span>
      {showLabel && <span className="text-xs font-medium text-rose-700">Non-Veg</span>}
    </div>
  );
};
