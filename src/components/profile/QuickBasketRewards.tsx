import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { db } from '../../services/dbService';
import { Order } from '../../types';
import confetti from 'canvas-confetti';
import {
  Crown,
  Sparkles,
  Gift,
  CheckCircle2,
  Lock,
  ArrowRight,
  ChevronRight,
  Zap,
  ShieldCheck,
  Award,
  Coins,
  Copy,
  Check
} from 'lucide-react';

export interface RewardTier {
  id: 'silver' | 'gold' | 'platinum' | 'diamond';
  name: string;
  badge: string;
  minSpend: number;
  maxSpend: number;
  pointsMultiplier: number;
  gradient: string;
  accentBg: string;
  badgeBg: string;
  textColor: string;
  perks: string[];
}

export const REWARD_TIERS: RewardTier[] = [
  {
    id: 'silver',
    name: 'Silver',
    badge: 'Silver Member',
    minSpend: 0,
    maxSpend: 1999,
    pointsMultiplier: 1.0,
    gradient: 'from-slate-700 via-slate-800 to-slate-950',
    accentBg: 'bg-slate-100 text-slate-800 border-slate-300',
    badgeBg: 'bg-slate-500/20 text-slate-300 border-slate-400/30',
    textColor: 'text-slate-400',
    perks: [
      'Standard 15–20 min priority delivery',
      '1x QuickPoints earned on every ₹1 spent',
      'Unified food & grocery smart basket delivery',
      'Access to weekly promotional coupon drops'
    ]
  },
  {
    id: 'gold',
    name: 'Gold',
    badge: 'Gold Elite',
    minSpend: 2000,
    maxSpend: 4999,
    pointsMultiplier: 1.5,
    gradient: 'from-amber-600 via-amber-700 to-slate-950',
    accentBg: 'bg-amber-100 text-amber-900 border-amber-300',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    textColor: 'text-amber-400',
    perks: [
      '1.5x QuickPoints on all restaurant & dark store orders',
      'Free priority chilled thermal packaging on perishables',
      '₹50 birthday dining wallet credit',
      'Reduced free delivery threshold (₹299 instead of ₹399)',
      'Early access to seasonal farmer mandi harvest batches'
    ]
  },
  {
    id: 'platinum',
    name: 'Platinum',
    badge: 'Platinum VIP',
    minSpend: 5000,
    maxSpend: 9999,
    pointsMultiplier: 2.0,
    gradient: 'from-indigo-600 via-purple-800 to-slate-950',
    accentBg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40',
    textColor: 'text-indigo-400',
    perks: [
      '2.0x QuickPoints multiplier on every order',
      'Zero delivery fee on all smart baskets above ₹199',
      'Instant no-questions-asked refund guarantee on fresh greens',
      'Direct line to Priority VIP Concierge support desk',
      'Free surprise dessert or sample chef tasting dish on carts > ₹599'
    ]
  },
  {
    id: 'diamond',
    name: 'Diamond Club',
    badge: 'Diamond Legend',
    minSpend: 10000,
    maxSpend: Infinity,
    pointsMultiplier: 3.0,
    gradient: 'from-emerald-600 via-teal-800 to-slate-950',
    accentBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    textColor: 'text-emerald-400',
    perks: [
      '3.0x QuickPoints on every single rupee spent',
      '100% Free Delivery on ALL orders with zero minimum cart limit',
      'Dedicated personal concierge desk with WhatsApp live order tracking',
      'Quarterly ₹500 gourmet dining & dark store voucher',
      'Exclusive invite-only chef table tastings at top partner restaurants'
    ]
  }
];

interface QuickBasketRewardsProps {
  orders: Order[];
  compact?: boolean;
}

export const QuickBasketRewards: React.FC<QuickBasketRewardsProps> = ({ orders, compact = false }) => {
  const { currentUser, showToast } = useApp();
  const [selectedTierPreview, setSelectedTierPreview] = useState<RewardTier['id']>('platinum');
  const [redeemedCode, setRedeemedCode] = useState<string | null>(null);

  // Calculate past order spend dynamically
  const ordersSpend = orders
    .filter(o => o.orderStatus !== 'cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const totalPastOrderSpend = Math.max(ordersSpend, currentUser.totalSpent || 0);

  // Identify current tier
  const currentTier =
    REWARD_TIERS.find(
      t => totalPastOrderSpend >= t.minSpend && (t.maxSpend === Infinity || totalPastOrderSpend <= t.maxSpend)
    ) || REWARD_TIERS[0];

  const currentTierIdx = REWARD_TIERS.findIndex(t => t.id === currentTier.id);
  const nextTier = currentTierIdx < REWARD_TIERS.length - 1 ? REWARD_TIERS[currentTierIdx + 1] : null;

  // Calculate progress bar toward next tier
  let progressPercent = 100;
  let remainingSpend = 0;

  if (nextTier) {
    const tierSpan = nextTier.minSpend - currentTier.minSpend;
    const currentProgress = totalPastOrderSpend - currentTier.minSpend;
    progressPercent = Math.min(100, Math.max(0, Math.round((currentProgress / tierSpan) * 100)));
    remainingSpend = Math.max(0, nextTier.minSpend - totalPastOrderSpend);
  }

  // Accumulated QuickPoints calculation
  const totalPoints = Math.round(totalPastOrderSpend * currentTier.pointsMultiplier);

  // Handle reward points redemption
  const handleRedeemReward = (code: string, pointsNeeded: number, perkName: string) => {
    if (totalPoints < pointsNeeded) {
      showToast({
        type: 'error',
        title: 'Insufficient Points',
        message: `You need ${pointsNeeded.toLocaleString()} QuickPoints to unlock this reward.`
      });
      return;
    }

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 }
      });
    } catch {
      // Confetti fallback
    }

    setRedeemedCode(code);
    showToast({
      type: 'success',
      title: 'Reward Redeemed!',
      message: `Coupon ${code} for ${perkName} has been generated and ready for your next checkout!`
    });
  };

  const previewTier = REWARD_TIERS.find(t => t.id === selectedTierPreview) || currentTier;

  return (
    <div className="space-y-6">
      
      {/* Primary Loyalty Card & Progress Hero */}
      <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${currentTier.gradient} text-white p-6 sm:p-8 shadow-lg border border-white/10`}>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left: User Tier Status */}
          <div className="max-w-xl">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-xs ${currentTier.badgeBg}`}>
                <Crown className="w-3.5 h-3.5" />
                <span>{currentTier.badge}</span>
              </span>
              <span className="text-xs text-slate-300 font-mono">
                {currentTier.pointsMultiplier}x Points Multiplier
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-3">
              QuickBasket Rewards Club
            </h2>

            <p className="text-xs sm:text-sm text-slate-200/90 mt-1 leading-relaxed">
              Earn elevated points on every culinary order and kirana run. Your past order value automatically qualifies you for elite delivery and culinary perks.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-5 text-xs text-slate-300 font-mono tabular-nums">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Total Past Spend</span>
                <span className="text-base sm:text-lg font-black text-white">₹{totalPastOrderSpend.toLocaleString()}</span>
              </div>
              <span className="text-slate-600">|</span>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Available QuickPoints</span>
                <span className="text-base sm:text-lg font-black text-emerald-300 flex items-center gap-1">
                  <Coins className="w-4 h-4 text-amber-400 inline" />
                  {totalPoints.toLocaleString()} pts
                </span>
              </div>
              <span className="text-slate-600">|</span>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Orders Completed</span>
                <span className="text-base sm:text-lg font-black text-white">{orders.length}</span>
              </div>
            </div>
          </div>

          {/* Right: Next Level Progress Box */}
          <div className="w-full lg:w-80 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15">
            <div className="flex items-center justify-between text-xs mb-1.5 font-semibold">
              <span className="text-slate-200">
                {nextTier ? `Progress to ${nextTier.name}` : 'Highest Tier Achieved'}
              </span>
              <span className="text-emerald-300 font-mono font-bold">{progressPercent}%</span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-3 bg-black/40 rounded-full p-0.5 overflow-hidden border border-white/10 mb-2.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 transition-all duration-500 shadow-sm"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {nextTier ? (
              <div className="text-xs text-slate-300 leading-relaxed font-mono tabular-nums">
                Spend <strong className="text-white font-bold">₹{remainingSpend.toLocaleString()}</strong> more to unlock{' '}
                <span className="text-amber-300 font-bold">{nextTier.name} Status</span> &amp; {nextTier.pointsMultiplier}x points.
              </div>
            ) : (
              <div className="text-xs text-emerald-200 font-medium flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>You hold our highest Legend status with unrestricted zero-fee deliveries!</span>
              </div>
            )}

            {/* Milestones Road */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-300">
              <span className={currentTier.id === 'silver' ? 'font-bold text-white' : ''}>Silver (₹0)</span>
              <span>·</span>
              <span className={currentTier.id === 'gold' ? 'font-bold text-amber-300' : ''}>Gold (₹2k)</span>
              <span>·</span>
              <span className={currentTier.id === 'platinum' ? 'font-bold text-indigo-300' : ''}>Plat (₹5k)</span>
              <span>·</span>
              <span className={currentTier.id === 'diamond' ? 'font-bold text-emerald-300' : ''}>Diamond (₹10k)</span>
            </div>
          </div>

        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Rewards Redemption & QuickPoints Store */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Gift className="w-4 h-4 text-emerald-600" />
              <span>Redeem Your QuickPoints</span>
            </h3>
            <p className="text-xs text-slate-500">
              Exchange your loyalty balance for instant discounts and zero-fee checkout passes
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-xl">
            Balance: <span className="text-emerald-700">{totalPoints.toLocaleString()} pts</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              code: 'REWARD50',
              title: 'Flat ₹50 OFF Order',
              points: 500,
              desc: 'Applicable on any food or grocery order above ₹299.',
              tag: 'Popular'
            },
            {
              code: 'REWARD100',
              title: 'Flat ₹100 OFF Order',
              points: 1000,
              desc: 'Save ₹100 on your overall basket above ₹499.',
              tag: 'Best Value'
            },
            {
              code: 'ZEROFEELOYAL',
              title: 'Free Delivery Pass',
              points: 800,
              desc: '100% waiver on all restaurant and grocery delivery fees.',
              tag: 'Zero Fees'
            }
          ].map(reward => {
            const canAfford = totalPoints >= reward.points;
            const isRedeemed = redeemedCode === reward.code;

            return (
              <div
                key={reward.code}
                className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      {reward.tag}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-700 flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5 text-amber-500" />
                      {reward.points} pts
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{reward.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {reward.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-bold text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded-lg">
                    {reward.code}
                  </span>

                  {isRedeemed ? (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Active!</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={!canAfford}
                      onClick={() => handleRedeemReward(reward.code, reward.points, reward.title)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        canAfford
                          ? 'bg-slate-900 hover:bg-emerald-600 text-white shadow-2xs'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? 'Redeem' : 'Need more pts'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tier Comparison & Privilege Ladder */}
      {!compact && (
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
          <div className="mb-6">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Loyalty Tier Matrix &amp; Privileges</span>
            </h3>
            <p className="text-xs text-slate-500">
              Discover the perks unlocked at each milestone of your QuickBasket culinary and grocery journey
            </p>
          </div>

          {/* Tier Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {REWARD_TIERS.map(t => {
              const isSelected = selectedTierPreview === t.id;
              const isUserCurrent = currentTier.id === t.id;

              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTierPreview(t.id)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{t.name}</span>
                    {isUserCurrent && (
                      <span className="text-[10px] font-bold bg-emerald-500 text-white px-1.5 py-0.2 rounded">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] font-mono mt-1 opacity-80">
                    {t.maxSpend === Infinity ? '₹10k+ spend' : `₹${t.minSpend.toLocaleString()} – ₹${t.maxSpend.toLocaleString()}`}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Tier Perks Display */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>{previewTier.badge} Benefits</span>
                  <span className="text-xs text-slate-500 font-mono">
                    ({previewTier.pointsMultiplier}x Points Multiplier)
                  </span>
                </h4>
                <p className="text-xs text-slate-500">
                  {previewTier.id === currentTier.id
                    ? 'These privileges are currently active on your account.'
                    : previewTier.minSpend > totalPastOrderSpend
                    ? `Unlock by spending ₹${(previewTier.minSpend - totalPastOrderSpend).toLocaleString()} more.`
                    : 'Unlocked milestone tier.'}
                </p>
              </div>

              {previewTier.id === currentTier.id && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Your Active Tier</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {previewTier.perks.map((perk, pIdx) => {
                const isUnlocked = totalPastOrderSpend >= previewTier.minSpend;

                return (
                  <div
                    key={pIdx}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs leading-relaxed ${
                      isUnlocked
                        ? 'bg-white border-slate-200 text-slate-800'
                        : 'bg-slate-100/60 border-slate-200/70 text-slate-400'
                    }`}
                  >
                    {isUnlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <span>{perk}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
