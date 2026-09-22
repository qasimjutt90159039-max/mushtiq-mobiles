import React, { useState, useMemo } from 'react';
import { Calculator, CheckCircle2, ShieldCheck, FileText, Phone, MessageSquare, AlertCircle, ArrowRight } from 'lucide-react';
import { formatPKR, siteConfig, getWhatsAppLink } from '../config/siteConfig';
import { initialProducts } from '../data/seedData';
import { InstallmentRequest } from '../types';

interface InstallmentPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const InstallmentPage: React.FC<InstallmentPageProps> = ({ onNavigate }) => {
  const [selectedPhoneModel, setSelectedPhoneModel] = useState<string>(initialProducts[0]?.title || 'Apple iPhone 15 Pro Max');
  const [customPrice, setCustomPrice] = useState<number>(initialProducts[0]?.basePrice || 485000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [durationMonths, setDurationMonths] = useState<3 | 6 | 12>(6);

  // Application details
  const [fullName, setFullName] = useState('');
  const [cnic, setCnic] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Multan');
  const [employmentType, setEmploymentType] = useState('Salaried');
  const [monthlyIncome, setMonthlyIncome] = useState('80,000 - 150,000');

  const [submittedApp, setSubmittedApp] = useState<InstallmentRequest | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle phone dropdown change
  const handlePhoneSelect = (modelName: string) => {
    setSelectedPhoneModel(modelName);
    const found = initialProducts.find(p => p.title === modelName);
    if (found) {
      setCustomPrice(found.basePrice);
    }
  };

  // Calculation logic
  const calculations = useMemo(() => {
    const downPayment = Math.round((customPrice * downPaymentPercent) / 100);
    const financedAmount = customPrice - downPayment;

    // Markup: 3 months = 0%, 6 months = 10%, 12 months = 20%
    let markupRate = 0;
    if (durationMonths === 6) markupRate = 0.10;
    if (durationMonths === 12) markupRate = 0.20;

    const totalWithMarkup = downPayment + financedAmount * (1 + markupRate);
    const monthlyPayment = Math.round((financedAmount * (1 + markupRate)) / durationMonths);

    return {
      downPayment,
      financedAmount,
      markupRate,
      monthlyPayment,
      totalWithMarkup
    };
  }, [customPrice, downPaymentPercent, durationMonths]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !cnic.trim() || !phone.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/installments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneModel: selectedPhoneModel,
          totalPrice: customPrice,
          downPayment: calculations.downPayment,
          durationMonths,
          monthlyInstallment: calculations.monthlyPayment,
          fullName,
          cnic,
          phone,
          city,
          employmentType,
          monthlyIncome
        })
      });

      const data = await res.json();
      if (data.success && data.installment) {
        setSubmittedApp(data.installment);
      } else {
        setErrorMsg(data.message || 'Error processing installment plan.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error. Please call our shop directly at 00300 0600956.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-graphite text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="max-w-xl space-y-3">
          <span className="px-3 py-1 rounded-full bg-accent text-white font-bold text-xs inline-block">
            Easy Installment Plans • 0% Markup Available
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl tracking-tight leading-tight">
            Buy Any Smartphone on Monthly Installments
          </h1>
          <p className="text-xs sm:text-sm text-sage-300">
            Get your dream iPhone, Samsung, or Xiaomi phone today with simple verification, 24-hour approval, and flexible 3 to 12-month tenure in Multan.
          </p>
        </div>
      </div>

      {submittedApp ? (
        <div className="bg-white rounded-3xl border border-sage-200 p-8 sm:p-10 text-center space-y-5 shadow-sm max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="font-heading font-extrabold text-2xl text-graphite">
            Installment Application Submitted!
          </h2>

          <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200 inline-block font-mono">
            <span className="text-xs text-sage-500 block">Application Reference:</span>
            <span className="font-heading font-black text-xl text-accent">{submittedApp.applicationId}</span>
          </div>

          <div className="p-5 rounded-2xl bg-orange-50 border border-orange-200 max-w-md mx-auto text-left text-xs space-y-2">
            <div><strong>Device:</strong> {submittedApp.phoneModel}</div>
            <div><strong>Down Payment:</strong> {formatPKR(submittedApp.downPayment)}</div>
            <div><strong>Monthly Payment:</strong> {formatPKR(submittedApp.monthlyInstallment)} / month ({submittedApp.durationMonths} months)</div>
            <div><strong>Applicant:</strong> {submittedApp.fullName} (CNIC: {submittedApp.cnic})</div>
          </div>

          <p className="text-xs text-sage-600 max-w-md mx-auto">
            Our finance desk will call you within 4 hours to verify your details. Bring your original CNIC and utility bill to Shop No. 6, Katchehry Chowk Multan for immediate handset collection.
          </p>

          <div className="flex justify-center gap-3 pt-2">
            <a
              href={getWhatsAppLink(`Assalam-o-Alaikum! Inquiring about Installment Application #${submittedApp.applicationId} for ${submittedApp.phoneModel}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold"
            >
              Verify on WhatsApp
            </a>
            <button
              onClick={() => onNavigate('home')}
              className="px-5 py-2.5 rounded-xl bg-graphite text-white text-xs font-bold"
            >
              Return Home
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Interactive Calculator (Cols 1-7) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-sage-200 shadow-xs space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-sage-100 font-heading font-bold text-base text-graphite">
              <Calculator className="w-5 h-5 text-accent" />
              <span>Step 1: Calculate Your Monthly Plan</span>
            </div>

            <div className="space-y-4">
              {/* Select device */}
              <div>
                <label className="text-xs font-bold text-graphite block mb-1">
                  Choose Smartphone Model
                </label>
                <select
                  value={selectedPhoneModel}
                  onChange={e => handlePhoneSelect(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs font-semibold text-graphite focus:border-accent"
                >
                  {initialProducts.map(p => (
                    <option key={p.id} value={p.title}>
                      {p.title} ({formatPKR(p.basePrice)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Price input */}
              <div>
                <label className="text-xs font-bold text-graphite block mb-1">
                  Device Cash Price (PKR)
                </label>
                <input
                  type="number"
                  value={customPrice}
                  onChange={e => setCustomPrice(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs font-mono font-bold text-graphite focus:border-accent"
                />
              </div>

              {/* Down Payment % */}
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-bold">
                  <span className="text-graphite">Advance Down Payment: {downPaymentPercent}%</span>
                  <span className="font-mono text-accent">{formatPKR(calculations.downPayment)}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[20, 30, 40, 50].map(pct => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setDownPaymentPercent(pct)}
                      className={`py-2 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                        downPaymentPercent === pct
                          ? 'border-accent bg-orange-50 text-accent ring-1 ring-accent'
                          : 'border-sage-200 text-sage-700 hover:border-sage-300'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration tenure */}
              <div>
                <label className="text-xs font-bold text-graphite block mb-1.5">
                  Plan Duration
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { months: 3, label: '3 Months', badge: '0% Markup!' },
                    { months: 6, label: '6 Months', badge: 'Popular' },
                    { months: 12, label: '12 Months', badge: 'Low Monthly' }
                  ].map(plan => (
                    <button
                      key={plan.months}
                      type="button"
                      onClick={() => setDurationMonths(plan.months as any)}
                      className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                        durationMonths === plan.months
                          ? 'border-graphite bg-graphite text-white shadow-md'
                          : 'border-sage-200 bg-white text-graphite hover:border-sage-300'
                      }`}
                    >
                      <div className="font-bold text-xs">{plan.label}</div>
                      <div className={`text-[10px] mt-0.5 ${durationMonths === plan.months ? 'text-accent' : 'text-sage-400'}`}>
                        {plan.badge}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Application form */}
            <div className="pt-4 border-t border-sage-100 space-y-4">
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-graphite">
                Step 2: Instant Pre-Approval Application
              </h3>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-graphite block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="e.g. Asad Ullah"
                      className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-graphite block mb-1">CNIC Number *</label>
                    <input
                      type="text"
                      required
                      value={cnic}
                      onChange={e => setCnic(e.target.value)}
                      placeholder="36302-XXXXXXX-X"
                      className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs font-mono"
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
                    <label className="text-xs font-bold text-graphite block mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="Multan"
                      className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-graphite block mb-1">Employment</label>
                    <select
                      value={employmentType}
                      onChange={e => setEmploymentType(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs"
                    >
                      <option value="Salaried">Salaried Employee</option>
                      <option value="Business Owner">Business Owner / Trader</option>
                      <option value="Freelancer">Freelancer / Remote</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-graphite block mb-1">Monthly Income (PKR)</label>
                    <select
                      value={monthlyIncome}
                      onChange={e => setMonthlyIncome(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs"
                    >
                      <option value="50,000 - 80,000">Rs. 50,000 - 80,000</option>
                      <option value="80,000 - 150,000">Rs. 80,000 - 150,000</option>
                      <option value="150,000+">Rs. 150,000+</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-4 rounded-xl bg-accent hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:bg-sage-400"
                >
                  <FileText className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Application...' : 'Submit Installment Application'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Summary & Eligibility (Cols 8-12) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-accent shadow-md text-center space-y-4 sticky top-24">
              <span className="text-xs font-bold uppercase tracking-wider text-sage-400 block">
                Calculated Monthly Installment
              </span>

              <div className="text-4xl sm:text-5xl font-black font-mono text-graphite">
                {formatPKR(calculations.monthlyPayment)}
                <span className="text-xs font-normal text-sage-400 block mt-1">/ month for {durationMonths} months</span>
              </div>

              {durationMonths === 3 && (
                <div className="p-2.5 rounded-xl bg-green-100 text-green-800 text-xs font-bold">
                  ✨ 0% Markup Special Promotion!
                </div>
              )}

              <div className="p-4 rounded-2xl bg-sage-50 text-xs text-left space-y-2 border border-sage-200">
                <div className="flex justify-between">
                  <span className="text-sage-600">Total Phone Price:</span>
                  <span className="font-mono font-bold text-graphite">{formatPKR(customPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sage-600">Down Payment ({downPaymentPercent}%):</span>
                  <span className="font-mono font-bold text-accent">{formatPKR(calculations.downPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sage-600">Markup Rate:</span>
                  <span className="font-mono font-bold text-graphite">{(calculations.markupRate * 100)}%</span>
                </div>
                <div className="flex justify-between border-t border-sage-200 pt-1.5 font-bold">
                  <span className="text-graphite">Total Repayment:</span>
                  <span className="font-mono text-graphite">{formatPKR(calculations.totalWithMarkup)}</span>
                </div>
              </div>

              {/* Required Documents */}
              <div className="text-left space-y-2 text-xs border-t border-sage-100 pt-4">
                <h4 className="font-bold text-graphite">Requirements to Collect Device:</h4>
                <ul className="space-y-1.5 text-sage-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                    <span>Original CNIC + 1 Photocopy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                    <span>Latest Electricity or Gas Utility Bill</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                    <span>2 Personal References (Friends/Relatives in Multan)</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <a
                  href={getWhatsAppLink(`Assalam-o-Alaikum! Inquiring about buying ${selectedPhoneModel} on ${durationMonths} months installment plan.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Ask Finance Desk on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
