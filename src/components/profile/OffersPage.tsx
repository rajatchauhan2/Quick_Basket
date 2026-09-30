import React from 'react';
import { useApp } from '../../context/AppContext';
import { db } from '../../services/dbService';
import { Tag, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';

export const OffersPage: React.FC = () => {
  const { applyCouponCode, navigateTo, showToast } = useApp();
  const coupons = db.getCoupons();

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast({
      type: 'success',
      title: 'Coupon Code Copied',
      message: `Code ${code} copied to clipboard`
    });
  };

  const handleApply = async (code: string) => {
    await applyCouponCode(code);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Exclusive Savings &amp; Free Delivery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Coupons &amp; Promotional Offers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Apply coupons directly to your Smart Basket to unlock instant checkout discounts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {coupons.map(coupon => (
            <div
              key={coupon.code}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-black uppercase tracking-wider px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {coupon.code}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Valid on {coupon.serviceType}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 mt-2">{coupon.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{coupon.description}</p>
                <p className="text-[11px] text-slate-400 mt-2">
                  Min order: ₹{coupon.minOrder} · Valid until {coupon.validUntil}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleCopyCode(coupon.code)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Code</span>
                </button>

                <button
                  onClick={() => handleApply(coupon.code)}
                  className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
