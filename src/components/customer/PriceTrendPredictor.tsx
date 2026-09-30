import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { StaplePriceTrend, PriceDataPoint } from '../../types';
import { STAPLE_PRICE_TRENDS, ForecastScenario, getScenarioAdjustedTrend } from '../../data/priceTrendsData';
import { useApp } from '../../context/AppContext';
import { db } from '../../services/dbService';
import {
  TrendingDown,
  TrendingUp,
  Minus,
  Sparkles,
  Bell,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  Plus,
  RefreshCw,
  SlidersHorizontal,
  Info
} from 'lucide-react';

interface PriceTrendPredictorProps {
  initialProductId?: string;
  onClose?: () => void;
  isModal?: boolean;
}

export const PriceTrendPredictor: React.FC<PriceTrendPredictorProps> = ({
  initialProductId,
  onClose,
  isModal = false
}) => {
  const { addToCart, showToast } = useApp();

  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialProductId || STAPLE_PRICE_TRENDS[0].productId
  );
  const [activeScenario, setActiveScenario] = useState<ForecastScenario>('baseline');
  const [timeRange, setTimeRange] = useState<'all' | 'recent' | 'forecast'>('all');
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const [targetAlertPrice, setTargetAlertPrice] = useState<string>('');
  const [alertSubmitted, setAlertSubmitted] = useState<boolean>(false);

  // Find base trend and apply scenario model
  const baseTrend =
    STAPLE_PRICE_TRENDS.find(t => t.productId === selectedProductId) || STAPLE_PRICE_TRENDS[0];
  const activeTrend = getScenarioAdjustedTrend(baseTrend, activeScenario);

  // Filter history based on timeRange
  const filteredHistory = React.useMemo(() => {
    const list = activeTrend.priceHistory;
    if (timeRange === 'forecast') {
      return list.filter(p => p.isForecast || p.displayDate === 'Today');
    }
    if (timeRange === 'recent') {
      // Last 4 historical + all forecast
      const historical = list.filter(p => !p.isForecast);
      const recentHistorical = historical.slice(-5);
      const forecast = list.filter(p => p.isForecast);
      return [...recentHistorical, ...forecast];
    }
    return list;
  }, [activeTrend, timeRange]);

  // Handle adding current staple to cart
  const handleAddToCart = () => {
    const store = db.getGroceryStoreById(activeTrend.storeId) || db.getGroceryStores()[0];
    addToCart({
      itemId: activeTrend.productId,
      serviceType: 'grocery',
      sellerId: store.id,
      sellerName: store.name,
      name: activeTrend.productName,
      image: activeTrend.image,
      price: activeTrend.currentPrice,
      quantity: 1,
      weightOrSize: activeTrend.unit
    });
    showToast({
      type: 'success',
      title: 'Added to Smart Basket',
      message: `${activeTrend.productName} (${activeTrend.unit}) added at ₹${activeTrend.currentPrice}.`
    });
  };

  // Handle setting a price drop alert
  const handleSaveAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(targetAlertPrice);
    if (!priceNum || priceNum <= 0) return;

    db.savePriceAlert(activeTrend.productId, priceNum);
    setAlertSubmitted(true);
    showToast({
      type: 'success',
      title: 'Price Alert Activated',
      message: `We'll notify you when ${activeTrend.brand} ${activeTrend.productName} touches ₹${priceNum}.`
    });
    setTimeout(() => {
      setIsAlertModalOpen(false);
      setAlertSubmitted(false);
    }, 1400);
  };

  // Custom Chart Tooltip
  const renderCustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data: PriceDataPoint = payload[0].payload;
      return (
        <div className="bg-slate-900/95 text-white p-3 rounded-xl border border-slate-700 shadow-xl backdrop-blur-md max-w-xs text-xs">
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-1.5 mb-2">
            <span className="font-semibold text-slate-300">{data.date}</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
              data.isForecast ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}>
              {data.isForecast ? 'AI Forecast' : 'Mandi Historical'}
            </span>
          </div>

          <div className="space-y-1 font-mono tabular-nums">
            {data.actualPrice !== undefined && (
              <div className="flex justify-between items-center text-slate-200">
                <span className="text-slate-400">Retail Rate:</span>
                <span className="font-bold text-emerald-400">₹{data.actualPrice}</span>
              </div>
            )}
            {data.predictedPrice !== undefined && (
              <div className="flex justify-between items-center text-slate-200">
                <span className="text-amber-400">Predicted Rate:</span>
                <span className="font-bold text-amber-300">₹{data.predictedPrice}</span>
              </div>
            )}
            {data.predictedLower !== undefined && data.predictedUpper !== undefined && (
              <div className="flex justify-between items-center text-[11px] text-slate-400">
                <span>90% CI Range:</span>
                <span>₹{data.predictedLower} – ₹{data.predictedUpper}</span>
              </div>
            )}
            {data.mandiPrice !== undefined && (
              <div className="flex justify-between items-center text-slate-400 pt-1 border-t border-slate-800 text-[11px]">
                <span>APMC Wholesale:</span>
                <span>₹{data.mandiPrice}</span>
              </div>
            )}
          </div>

          {data.eventNote && (
            <div className="mt-2 pt-1.5 border-t border-slate-800 text-[11px] text-amber-200/90 leading-tight">
              <span className="font-semibold text-amber-400">Signal: </span>
              {data.eventNote}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden ${isModal ? 'max-h-[90vh] overflow-y-auto' : ''}`}>
      
      {/* Top Banner Header */}
      <div className="p-5 sm:p-7 border-b border-slate-100 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Kirana Mandi Intelligence</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-slate-300">30-Day Predictive Price Fluctuation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Staple Price Trend &amp; Forecasting Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              Historical APMC mandi wholesale benchmarks paired with seasonal econometric models to forecast price swings on Indian pantry essentials.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-[11px] text-slate-400">Model Accuracy</div>
              <div className="text-sm font-bold text-emerald-400 font-mono tabular-nums">92.4% Avg. Fit</div>
            </div>
            {isModal && onClose && (
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
              >
                Close
              </button>
            )}
          </div>
        </div>

        {/* Staple Horizontal Quick Picker */}
        <div className="mt-6 flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {STAPLE_PRICE_TRENDS.map(trend => {
            const isSelected = trend.productId === selectedProductId;
            const isRising = trend.predictedChangePercent > 1;
            const isFalling = trend.predictedChangePercent < -1;
            return (
              <button
                key={trend.productId}
                onClick={() => setSelectedProductId(trend.productId)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-2xl transition-all whitespace-nowrap text-left shrink-0 ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 shadow-md ring-2 ring-emerald-300'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60'
                }`}
              >
                <img
                  src={trend.image}
                  alt={trend.productName}
                  className="w-8 h-8 rounded-lg object-cover bg-white shrink-0"
                />
                <div>
                  <div className="text-[11px] font-bold truncate max-w-[130px] leading-tight">
                    {trend.productName}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono tabular-nums mt-0.5">
                    <span className={isSelected ? 'text-slate-900 font-semibold' : 'text-slate-400'}>
                      ₹{trend.currentPrice}
                    </span>
                    <span
                      className={`font-bold flex items-center ${
                        isSelected
                          ? isRising
                            ? 'text-rose-950'
                            : 'text-emerald-950'
                          : isRising
                          ? 'text-rose-400'
                          : isFalling
                          ? 'text-emerald-400'
                          : 'text-slate-300'
                      }`}
                    >
                      {isRising ? '↑' : isFalling ? '↓' : '→'}{' '}
                      {Math.abs(trend.predictedChangePercent)}%
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="p-5 sm:p-7 space-y-7">
        
        {/* Active Staple Summary Card */}
        <div className="bg-slate-50/80 rounded-2xl border border-slate-200/80 p-5 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left: Product & Recommendation Details */}
            <div className="flex items-start gap-4">
              <img
                src={activeTrend.image}
                alt={activeTrend.productName}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-contain bg-white p-2 border border-slate-200 shrink-0 shadow-xs"
              />
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="font-semibold uppercase tracking-wider text-slate-600">
                    {activeTrend.brand}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activeTrend.unit}</span>
                  <span aria-hidden="true">·</span>
                  <span>Sold by {activeTrend.storeName}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  {activeTrend.productName}
                </h3>

                {/* Recommendation Callout */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold ${
                      activeTrend.recommendation === 'BUY_NOW'
                        ? 'bg-rose-50 border border-rose-200 text-rose-800'
                        : activeTrend.recommendation === 'WAIT_AND_SAVE'
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                        : 'bg-blue-50 border border-blue-200 text-blue-800'
                    }`}
                  >
                    {activeTrend.recommendation === 'BUY_NOW' ? (
                      <TrendingUp className="w-3.5 h-3.5 text-rose-600" />
                    ) : activeTrend.recommendation === 'WAIT_AND_SAVE' ? (
                      <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Minus className="w-3.5 h-3.5 text-blue-600" />
                    )}
                    <span>{activeTrend.recommendationTitle}</span>
                  </div>

                  <span className="text-xs text-slate-500 font-medium">
                    {activeTrend.confidenceScore}% Model Confidence · {activeTrend.volatilityIndex} Volatility
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-2 max-w-xl leading-relaxed">
                  {activeTrend.recommendationReason}
                </p>
              </div>
            </div>

            {/* Right: Key Pricing Metrics & Commerce Action */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-200">
              <div className="flex items-baseline gap-3 text-right">
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Today's Price</div>
                  <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">
                    ₹{activeTrend.currentPrice}
                  </div>
                  {activeTrend.mrp > activeTrend.currentPrice && (
                    <div className="text-[11px] text-slate-400 line-through font-mono">
                      MRP ₹{activeTrend.mrp}
                    </div>
                  )}
                </div>

                <div className="text-center px-3 py-1.5 rounded-xl bg-white border border-slate-200">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">30-Day Forecast</div>
                  <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                    ₹{activeTrend.predictedPrice30d}
                  </div>
                  <div
                    className={`text-[11px] font-bold font-mono ${
                      activeTrend.predictedChangePercent > 0
                        ? 'text-rose-600'
                        : activeTrend.predictedChangePercent < 0
                        ? 'text-emerald-600'
                        : 'text-slate-500'
                    }`}
                  >
                    {activeTrend.predictedChangePercent > 0 ? '+' : ''}
                    {activeTrend.predictedChangePercent}%
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setTargetAlertPrice(String(activeTrend.predictedPrice30d));
                    setIsAlertModalOpen(true);
                  }}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-700 text-xs font-semibold transition-colors"
                >
                  <Bell className="w-3.5 h-3.5 text-slate-500" />
                  <span>Set Price Alert</span>
                </button>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Lock Price · Add to Basket</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Controls Toolbar: Time Range & Predictive Scenarios */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
          {/* Time range selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setTimeRange('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                timeRange === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Full Cycle (6 Mo + Forecast)
            </button>
            <button
              onClick={() => setTimeRange('recent')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                timeRange === 'recent'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Recent 8 Weeks + Forecast
            </button>
            <button
              onClick={() => setTimeRange('forecast')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                timeRange === 'forecast'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              30-Day Forecast Only
            </button>
          </div>

          {/* Scenario simulator selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>Simulate Market Conditions:</span>
            </span>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveScenario('baseline')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                  activeScenario === 'baseline'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Baseline Model
              </button>
              <button
                onClick={() => setActiveScenario('festive_surge')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                  activeScenario === 'festive_surge'
                    ? 'bg-rose-50 text-rose-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Festive Demand (+25%)
              </button>
              <button
                onClick={() => setActiveScenario('bumper_harvest')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                  activeScenario === 'bumper_harvest'
                    ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bumper Mandi Flush
              </button>
            </div>
          </div>
        </div>

        {/* Chart Viewport */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span>Historical Retail Price vs. Predictive Forecast Curve</span>
              </h4>
              <p className="text-xs text-slate-500">
                Solid line denotes actual consumer price; dashed line reflects AI-projected trajectory with 90% confidence ribbon.
              </p>
            </div>

            {/* Custom chart legend */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-emerald-600 rounded-full inline-block" />
                <span className="text-slate-600 font-medium">Actual Retail (₹)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 border-t-2 border-dashed border-amber-500 inline-block" />
                <span className="text-slate-600 font-medium">Projected Rate (₹)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-slate-300 inline-block" />
                <span className="text-slate-400 font-medium">APMC Wholesale (₹)</span>
              </div>
            </div>
          </div>

          <div className="h-72 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={filteredHistory}
                margin={{ top: 10, right: 15, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="retailGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                
                <XAxis
                  dataKey="displayDate"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                
                <YAxis
                  domain={['dataMin - 10', 'dataMax + 10']}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickFormatter={val => `₹${val}`}
                />

                <Tooltip content={renderCustomTooltip} />

                {/* Wholesale Mandi Benchmark Area */}
                <Line
                  type="monotone"
                  dataKey="mandiPrice"
                  stroke="#cbd5e1"
                  strokeWidth={1.5}
                  dot={false}
                  name="Mandi Wholesale"
                />

                {/* Actual Historical Retail Price */}
                <Area
                  type="monotone"
                  dataKey="actualPrice"
                  stroke="#059669"
                  strokeWidth={2.5}
                  fill="url(#retailGradient)"
                  dot={{ r: 3, fill: '#059669', strokeWidth: 1, stroke: '#fff' }}
                  name="Actual Price"
                />

                {/* Forecast Predicted Price Curve */}
                <Line
                  type="monotone"
                  dataKey="predictedPrice"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  strokeDasharray="5 5"
                  dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }}
                  name="Predicted Price"
                />

                {/* Confidence intervals */}
                <Area
                  type="monotone"
                  dataKey="predictedUpper"
                  stroke="none"
                  fill="url(#forecastGradient)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
            <span className="flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>Data source: Kalasipalya, Kolar, and National APMC Mandi feeds combined with QuickBasket order archives.</span>
            </span>
            <div className="flex items-center gap-3 font-mono tabular-nums">
              <span>6-Month Low: <strong className="text-slate-800">₹{activeTrend.lowestPrice6m}</strong></span>
              <span>·</span>
              <span>6-Month High: <strong className="text-slate-800">₹{activeTrend.highestPrice6m}</strong></span>
              <span>·</span>
              <span>6-Month Avg: <strong className="text-slate-800">₹{activeTrend.averagePrice6m}</strong></span>
            </div>
          </div>
        </div>

        {/* Market Signals & Economic Drivers Section */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Underlying Market Drivers for {activeTrend.productName}</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeTrend.marketDrivers.map((driver, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {driver.factor}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      driver.impact === 'positive'
                        ? 'bg-emerald-100 text-emerald-800'
                        : driver.impact === 'negative'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {driver.impact === 'positive'
                      ? 'Consumer Favourable'
                      : driver.impact === 'negative'
                      ? 'Cost Inflation Driver'
                      : 'Neutral Baseline'}
                  </span>
                </div>
                <h5 className="text-xs font-bold text-slate-900">{driver.title}</h5>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {driver.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* All Staples Comprehensive Overview Table */}
        <div className="mt-8 pt-6 border-t border-slate-200/80">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Pantry Staples 30-Day Outlook Index
              </h4>
              <p className="text-xs text-slate-500">
                Quick comparison across all monitored staples in Bengaluru &amp; South urban clusters
              </p>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {STAPLE_PRICE_TRENDS.length} staples indexed
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Staple Product</th>
                  <th className="py-3 px-3 text-right">Current Price</th>
                  <th className="py-3 px-3 text-right">30-Day Forecast</th>
                  <th className="py-3 px-3 text-center">Trend (% Shift)</th>
                  <th className="py-3 px-3">Recommendation</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {STAPLE_PRICE_TRENDS.map(item => {
                  const isCurrent = item.productId === selectedProductId;
                  const isRising = item.predictedChangePercent > 1;
                  const isFalling = item.predictedChangePercent < -1;
                  return (
                    <tr
                      key={item.productId}
                      onClick={() => setSelectedProductId(item.productId)}
                      className={`cursor-pointer transition-colors ${
                        isCurrent ? 'bg-emerald-50/50' : 'hover:bg-slate-50/80'
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-9 h-9 rounded-lg object-contain bg-slate-50 p-0.5 border border-slate-200 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-slate-900">{item.productName}</div>
                            <div className="text-[11px] text-slate-400 font-normal">
                              {item.brand} · {item.unit}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right font-mono tabular-nums font-bold text-slate-900">
                        ₹{item.currentPrice}
                      </td>
                      <td className="py-3 px-3 text-right font-mono tabular-nums font-bold text-slate-700">
                        ₹{item.predictedPrice30d}
                      </td>
                      <td className="py-3 px-3 text-center font-mono tabular-nums font-bold">
                        <span
                          className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[11px] ${
                            isRising
                              ? 'bg-rose-50 text-rose-700'
                              : isFalling
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {isRising ? <TrendingUp className="w-3 h-3" /> : isFalling ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                          <span>{item.predictedChangePercent > 0 ? '+' : ''}{item.predictedChangePercent}%</span>
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`text-[11px] font-bold ${
                            item.recommendation === 'BUY_NOW'
                              ? 'text-rose-700'
                              : item.recommendation === 'WAIT_AND_SAVE'
                              ? 'text-emerald-700'
                              : 'text-slate-600'
                          }`}
                        >
                          {item.recommendation === 'BUY_NOW' ? 'Stock Up Now' : item.recommendation === 'WAIT_AND_SAVE' ? 'Price Softening' : 'Stable Band'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setSelectedProductId(item.productId);
                            const store = db.getGroceryStoreById(item.storeId) || db.getGroceryStores()[0];
                            addToCart({
                              itemId: item.productId,
                              serviceType: 'grocery',
                              sellerId: store.id,
                              sellerName: store.name,
                              name: item.productName,
                              image: item.image,
                              price: item.currentPrice,
                              quantity: 1,
                              weightOrSize: item.unit
                            });
                            showToast({
                              type: 'success',
                              title: 'Added to Smart Basket',
                              message: `${item.productName} added at ₹${item.currentPrice}.`
                            });
                          }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 text-[11px] font-bold transition-colors"
                        >
                          + Add
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Price Drop Alert Modal */}
      {isAlertModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Set Price Drop Alert</h3>
                  <p className="text-xs text-slate-500">Get notified when rates decline</p>
                </div>
              </div>
              <button
                onClick={() => setIsAlertModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold px-2 py-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAlert} className="mt-4 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <img
                  src={activeTrend.image}
                  alt={activeTrend.productName}
                  className="w-12 h-12 rounded-xl object-contain bg-white p-1 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {activeTrend.productName}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Current price: <span className="font-bold text-slate-800">₹{activeTrend.currentPrice}</span> · 30d forecast: <span className="font-bold text-emerald-600">₹{activeTrend.predictedPrice30d}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Notify me when price drops to or below (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={targetAlertPrice}
                    onChange={e => setTargetAlertPrice(e.target.value)}
                    placeholder="Enter target price"
                    required
                    min={1}
                    max={activeTrend.currentPrice}
                    className="w-full pl-8 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Recommended target: ₹{activeTrend.predictedPrice30d} (based on our 30-day forecast).
                </p>
              </div>

              {alertSubmitted ? (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Alert active! We've saved this preference.</span>
                </div>
              ) : (
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAlertModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    Activate Alert
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
