import React, { useState, useMemo } from 'react';
import { Smartphone, RefreshCw, CheckCircle2, DollarSign, ShieldCheck, ArrowRight, AlertCircle, Phone, MessageSquare } from 'lucide-react';
import { formatPKR, siteConfig, getWhatsAppLink } from '../config/siteConfig';
import { TradeInRequest } from '../types';

interface SellTradeInPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const SellTradeInPage: React.FC<SellTradeInPageProps> = ({ onNavigate }) => {
  const [brand, setBrand] = useState('Apple');
  const [model, setModel] = useState('iPhone 13');
  const [storage, setStorage] = useState('128GB');
  const [ptaStatus, setPtaStatus] = useState<'PTA Approved' | 'Non-PTA'>('PTA Approved');
  const [condition, setCondition] = useState<'flawless' | 'good' | 'average' | 'damaged'>('good');
  const [hasOriginalBox, setHasOriginalBox] = useState(true);
  const [hasOriginalCharger, setHasOriginalCharger] = useState(true);

  // Customer info
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Multan');
  const [exchangeInterest, setExchangeInterest] = useState('Instant Cash');

  const [submittedTrade, setSubmittedTrade] = useState<TradeInRequest | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Dynamic Valuation algorithm
  const estimatedValue = useMemo(() => {
    let base = 65000;
    const lower = model.toLowerCase();

    if (lower.includes('15 pro max')) base = 320000;
    else if (lower.includes('15 pro')) base = 280000;
    else if (lower.includes('15')) base = 210000;
    else if (lower.includes('14 pro max')) base = 240000;
    else if (lower.includes('14 pro')) base = 210000;
    else if (lower.includes('14')) base = 160000;
    else if (lower.includes('13 pro max')) base = 180000;
    else if (lower.includes('13 pro')) base = 155000;
    else if (lower.includes('13')) base = 125000;
    else if (lower.includes('12 pro max')) base = 140000;
    else if (lower.includes('12')) base = 95000;
    else if (lower.includes('11 pro max')) base = 105000;
    else if (lower.includes('11')) base = 75000;
    else if (lower.includes('s24 ultra')) base = 310000;
    else if (lower.includes('s23 ultra')) base = 220000;
    else if (lower.includes('s22 ultra')) base = 150000;
    else if (lower.includes('note 20 ultra')) base = 95000;
    else if (lower.includes('pixel 8 pro')) base = 175000;
    else if (lower.includes('pixel 7 pro')) base = 120000;
    else if (lower.includes('redmi note 13')) base = 45000;
    else if (lower.includes('camon 30')) base = 48000;
    else if (lower.includes('zero 40')) base = 55000;

    // Adjust for storage
    if (storage === '256GB') base += 12000;
    if (storage === '512GB') base += 25000;
    if (storage === '1TB') base += 40000;

    // Adjust for PTA
    if (ptaStatus === 'Non-PTA') {
      base = base * 0.65;
    }

    // Condition multiplier
    let mult = 1.0;
    if (condition === 'flawless') mult = 1.05;
    else if (condition === 'good') mult = 0.95;
    else if (condition === 'average') mult = 0.80;
    else if (condition === 'damaged') mult = 0.55;

    // Box & charger bonus
    let accessoriesBonus = 0;
    if (hasOriginalBox) accessoriesBonus += 2500;
    if (hasOriginalCharger) accessoriesBonus += 2000;

    return Math.round((base * mult + accessoriesBonus) / 500) * 500;
  }, [model, storage, ptaStatus, condition, hasOriginalBox, hasOriginalCharger]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!model.trim() || !fullName.trim() || !phone.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/trade-ins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand,
          model,
          storage,
          condition,
          ptaStatus,
          estimatedValue,
          fullName,
          phone,
          city,
          notes: `Accessories: ${hasOriginalBox ? 'Box' : 'No Box'}, ${hasOriginalCharger ? 'Original Charger' : 'No Charger'}. Goal: ${exchangeInterest}`
        })
      });

      const data = await res.json();
      if (data.success && data.tradeIn) {
        setSubmittedTrade(data.tradeIn);
      } else {
        setErrorMsg(data.message || 'Error submitting trade-in. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error. Please call our shop at 00300 0600956.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-graphite text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="max-w-xl space-y-3">
          <span className="px-3 py-1 rounded-full bg-accent text-white font-bold text-xs inline-block">
            Sell or Trade-In Your Old Phone • Instant Cash
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl tracking-tight leading-tight">
            Get the Highest Cash Quote in Multan
          </h1>
          <p className="text-xs sm:text-sm text-sage-300">
            Sell your used iPhone, Samsung, Xiaomi, or Vivo in 10 minutes at Katchehry Chowk or upgrade to any new model with exclusive trade-in discount.
          </p>
        </div>
      </div>

      {submittedTrade ? (
        <div className="bg-white rounded-3xl border border-sage-200 p-8 sm:p-10 text-center space-y-5 shadow-sm max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="font-heading font-extrabold text-2xl text-graphite">
            Trade-In Quote Generated!
          </h2>

          <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200 inline-block font-mono">
            <span className="text-xs text-sage-500 block">Your Trade-In Reference:</span>
            <span className="font-heading font-black text-xl text-accent">{submittedTrade.ticketCode}</span>
          </div>

          <div className="p-6 rounded-2xl bg-orange-50 border border-orange-200 max-w-md mx-auto space-y-2">
            <span className="text-xs text-sage-500 block">Estimated Cash Payout:</span>
            <span className="font-heading font-black text-3xl text-graphite font-mono">
              {formatPKR(submittedTrade.estimatedValue)}
            </span>
            <p className="text-[11px] text-sage-600">
              Bring your device to Shop No. 6, Katchehry Chowk Multan for a 5-minute physical inspection and immediate cash or bank transfer payout.
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <a
              href={getWhatsAppLink(`Assalam-o-Alaikum! I have Trade-In Ticket #${submittedTrade.ticketCode} for ${submittedTrade.brand} ${submittedTrade.model} with quote ${formatPKR(submittedTrade.estimatedValue)}. Please confirm inspection timing!`)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold"
            >
              Confirm on WhatsApp
            </a>
            <button
              onClick={() => onNavigate('shop')}
              className="px-5 py-2.5 rounded-xl bg-graphite text-white text-xs font-bold"
            >
              Browse New Phones
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Interactive Evaluation Form (Cols 1-7) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-sage-200 shadow-xs space-y-6">
            <h2 className="font-heading font-extrabold text-lg text-graphite pb-3 border-b border-sage-100 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-accent" />
              <span>Step 1: Tell Us About Your Device</span>
            </h2>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-graphite block mb-1">Brand *</label>
                  <select
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs"
                  >
                    <option value="Apple">Apple iPhone</option>
                    <option value="Samsung">Samsung Galaxy</option>
                    <option value="Xiaomi">Xiaomi / Redmi</option>
                    <option value="Infinix">Infinix</option>
                    <option value="Tecno">Tecno</option>
                    <option value="Vivo">Vivo</option>
                    <option value="Google">Google Pixel</option>
                    <option value="OnePlus">OnePlus</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-graphite block mb-1">Model Name *</label>
                  <input
                    type="text"
                    required
                    value={model}
                    onChange={e => setModel(e.target.value)}
                    placeholder="e.g. iPhone 13 or S23 Ultra"
                    className="w-full px-3 py-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs"
                  />
                </div>
              </div>

              {/* Storage */}
              <div>
                <label className="text-xs font-bold text-graphite block mb-2">Storage Capacity</label>
                <div className="flex flex-wrap gap-2">
                  {['64GB', '128GB', '256GB', '512GB', '1TB'].map(s => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setStorage(s)}
                      className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold cursor-pointer ${
                        storage === s
                          ? 'border-accent bg-orange-50 text-accent ring-1 ring-accent'
                          : 'border-sage-200 text-sage-700 hover:border-sage-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* PTA Status */}
              <div>
                <label className="text-xs font-bold text-graphite block mb-2">PTA Registration Status</label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <label
                    className={`p-3 rounded-2xl border flex items-center gap-2 cursor-pointer ${
                      ptaStatus === 'PTA Approved' ? 'border-accent bg-orange-50/50 font-bold' : 'border-sage-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="pta"
                      checked={ptaStatus === 'PTA Approved'}
                      onChange={() => setPtaStatus('PTA Approved')}
                      className="accent-accent"
                    />
                    <span>PTA Approved (Official)</span>
                  </label>

                  <label
                    className={`p-3 rounded-2xl border flex items-center gap-2 cursor-pointer ${
                      ptaStatus === 'Non-PTA' ? 'border-accent bg-orange-50/50 font-bold' : 'border-sage-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="pta"
                      checked={ptaStatus === 'Non-PTA'}
                      onChange={() => setPtaStatus('Non-PTA')}
                      className="accent-accent"
                    />
                    <span>Non-PTA / JV / Carrier</span>
                  </label>
                </div>
              </div>

              {/* Condition */}
              <div>
                <label className="text-xs font-bold text-graphite block mb-2">Physical Condition</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'flawless', label: 'Flawless 10/10', desc: 'No marks, like new' },
                    { id: 'good', label: 'Good 9/10', desc: 'Minor micro scuffs' },
                    { id: 'average', label: 'Average 8/10', desc: 'Noticeable scratches' },
                    { id: 'damaged', label: 'Broken / Flawed', desc: 'Cracked glass / lines' },
                  ].map(c => (
                    <div
                      key={c.id}
                      onClick={() => setCondition(c.id as any)}
                      className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                        condition === c.id
                          ? 'border-accent bg-orange-50/60 ring-1 ring-accent text-accent font-bold'
                          : 'border-sage-200 text-sage-600 hover:border-sage-300'
                      }`}
                    >
                      <div className="text-xs">{c.label}</div>
                      <div className="text-[10px] text-sage-400 mt-0.5">{c.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accessories Checkboxes */}
              <div className="flex gap-4 text-xs font-semibold text-graphite pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasOriginalBox}
                    onChange={e => setHasOriginalBox(e.target.checked)}
                    className="accent-accent w-4 h-4"
                  />
                  <span>Original Box Included (+Rs. 2,500)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasOriginalCharger}
                    onChange={e => setHasOriginalCharger(e.target.checked)}
                    className="accent-accent w-4 h-4"
                  />
                  <span>Original Fast Charger (+Rs. 2,000)</span>
                </label>
              </div>

              <div className="border-t border-sage-100 pt-4 space-y-4">
                <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-graphite">
                  Step 2: Customer Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-graphite block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="e.g. Tariq Mehmood"
                      className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-graphite block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="0300-1234567"
                      className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-graphite block mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="Multan"
                      className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-graphite block mb-1">Trade Preference</label>
                    <select
                      value={exchangeInterest}
                      onChange={e => setExchangeInterest(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs"
                    >
                      <option value="Instant Cash">Instant Cash Payout</option>
                      <option value="Bank Transfer">Direct Bank Transfer</option>
                      <option value="Upgrade Exchange">Exchange with New Phone (+5% Bonus)</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-accent hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:bg-sage-400"
              >
                <DollarSign className="w-4 h-4" />
                <span>{isSubmitting ? 'Locking In Quote...' : 'Lock In Cash Quote & Book Inspection'}</span>
              </button>
            </form>
          </div>

          {/* Right: Live Quote Card & Store Guarantee (Cols 8-12) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-accent shadow-lg text-center space-y-4 sticky top-24">
              <span className="text-xs font-bold uppercase tracking-wider text-sage-400 block">
                Estimated Live Valuation
              </span>

              <div className="text-4xl sm:text-5xl font-black font-mono text-graphite">
                {formatPKR(estimatedValue)}
              </div>

              <div className="text-xs text-sage-600">
                For <strong>{brand} {model}</strong> ({storage}, {ptaStatus})
              </div>

              {exchangeInterest === 'Upgrade Exchange' && (
                <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs font-semibold">
                  🎁 +5% Upgrade Bonus applied: You get <strong>{formatPKR(Math.round(estimatedValue * 1.05))}</strong> store credit!
                </div>
              )}

              <div className="pt-4 border-t border-sage-100 text-left space-y-3 text-xs text-sage-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Physical inspection at Katchehry Chowk takes only 5 mins</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                  <span>Instant payment in cash, Meezan bank, or JazzCash</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-accent shrink-0" />
                  <span>Data wipe certified before handoff</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={getWhatsAppLink(`Assalam-o-Alaikum! I want to sell my ${brand} ${model} (${storage}, ${ptaStatus}). Valuation shown is ${formatPKR(estimatedValue)}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Direct Quote on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
