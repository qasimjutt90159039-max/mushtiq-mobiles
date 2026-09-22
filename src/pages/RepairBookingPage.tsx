import React, { useState } from 'react';
import { Wrench, Clock, ShieldCheck, CheckCircle2, Phone, MapPin, AlertCircle, ArrowRight } from 'lucide-react';
import { formatPKR, siteConfig, getCallLink, getWhatsAppLink } from '../config/siteConfig';
import { RepairBooking } from '../types';

interface RepairBookingPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const RepairBookingPage: React.FC<RepairBookingPageProps> = ({ onNavigate }) => {
  const [deviceBrand, setDeviceBrand] = useState('Apple iPhone');
  const [deviceModel, setDeviceModel] = useState('');
  const [issueType, setIssueType] = useState('screen_replacement');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceMode, setServiceMode] = useState<'shop_walkin' | 'multan_pickup'>('shop_walkin');
  const [preferredDate, setPreferredDate] = useState('');
  const [submittedBooking, setSubmittedBooking] = useState<RepairBooking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const issueOptions = [
    { id: 'screen_replacement', label: 'Screen / OLED Display Replacement', basePrice: 4500, time: '30-45 Mins' },
    { id: 'battery_replacement', label: 'Original Battery Replacement (100% Health)', basePrice: 2800, time: '20-30 Mins' },
    { id: 'charging_port', label: 'Charging Port & IC Repair', basePrice: 1500, time: '30 Mins' },
    { id: 'water_damage', label: 'Liquid / Water Damage Ultrasonic Cleaning', basePrice: 2200, time: '2-4 Hours' },
    { id: 'camera_repair', label: 'Front / Rear Camera Lens & Sensor Repair', basePrice: 3500, time: '45 Mins' },
    { id: 'motherboard_ic', label: 'Motherboard / CPU / FaceID Re-balling', basePrice: 5500, time: 'Same-Day' },
    { id: 'speaker_mic', label: 'Speaker, Earpiece & Microphone Repair', basePrice: 1200, time: '20 Mins' },
  ];

  const selectedIssueObj = issueOptions.find(i => i.id === issueType) || issueOptions[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deviceModel.trim() || !fullName.trim() || !phone.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/repairs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceBrand,
          deviceModel,
          issueType: selectedIssueObj.label,
          additionalNotes,
          fullName,
          phone,
          serviceMode,
          preferredDate: preferredDate || new Date().toISOString().split('T')[0],
          estimatedCost: selectedIssueObj.basePrice
        })
      });

      const data = await res.json();
      if (data.success && data.repair) {
        setSubmittedBooking(data.repair);
      } else {
        setErrorMsg(data.message || 'Error booking repair. Please call our shop directly.');
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
      {/* Hero Banner */}
      <div className="bg-graphite text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-xl space-y-3">
          <span className="px-3 py-1 rounded-full bg-accent text-white font-bold text-xs inline-block">
            Professional Mobile Repair Lab • Multan
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl tracking-tight leading-tight">
            Fast Smartphone Repair with 90-Day Warranty
          </h1>
          <p className="text-xs sm:text-sm text-sage-300">
            Certified technicians, original OEM parts, and transparent pricing at Katchehry Chowk Multan. 45-minute express turnaround on screens and batteries.
          </p>
        </div>
      </div>

      {submittedBooking ? (
        <div className="bg-white rounded-3xl border border-sage-200 p-8 sm:p-10 text-center space-y-5 shadow-sm max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="font-heading font-extrabold text-2xl text-graphite">
            Repair Appointment Booked!
          </h2>

          <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200 inline-block font-mono">
            <span className="text-xs text-sage-500 block">Your Repair Ticket ID:</span>
            <span className="font-heading font-black text-xl text-accent">{submittedBooking.ticketCode}</span>
          </div>

          <p className="text-xs text-sage-600 max-w-md mx-auto leading-relaxed">
            Please bring your <strong>{submittedBooking.deviceBrand} {submittedBooking.deviceModel}</strong> to <strong>Shop No. 6, Rehma Commercial Centre, Katchehry Chowk, Multan</strong>.
          </p>

          <div className="p-4 rounded-2xl bg-orange-50 text-xs text-left max-w-md mx-auto space-y-1">
            <div><strong>Issue:</strong> {submittedBooking.issueType}</div>
            <div><strong>Est. Cost:</strong> Starting from {formatPKR(submittedBooking.estimatedCost)}</div>
            <div><strong>Service:</strong> {submittedBooking.serviceMode === 'shop_walkin' ? 'Walk-in to Katchehry Chowk Showroom' : 'Doorstep Pickup in Multan'}</div>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <a
              href={getWhatsAppLink(`Assalam-o-Alaikum! Inquiring about Repair Ticket #${submittedBooking.ticketCode} for ${submittedBooking.deviceModel}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold"
            >
              Chat on WhatsApp
            </a>
            <button
              onClick={() => setSubmittedBooking(null)}
              className="px-5 py-2.5 rounded-xl bg-graphite text-white text-xs font-bold"
            >
              Book Another Repair
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Booking Form (Cols 1-8) */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-sage-200 shadow-xs space-y-6">
            <h2 className="font-heading font-extrabold text-lg text-graphite pb-3 border-b border-sage-100">
              Schedule Your Device Repair
            </h2>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Device selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-graphite block mb-1">
                    Phone Brand *
                  </label>
                  <select
                    value={deviceBrand}
                    onChange={e => setDeviceBrand(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs text-graphite focus:border-accent"
                  >
                    <option value="Apple iPhone">Apple iPhone</option>
                    <option value="Samsung Galaxy">Samsung Galaxy</option>
                    <option value="Xiaomi / Redmi / POCO">Xiaomi / Redmi / POCO</option>
                    <option value="Infinix">Infinix</option>
                    <option value="Tecno">Tecno</option>
                    <option value="Vivo">Vivo</option>
                    <option value="Oppo">Oppo</option>
                    <option value="Google Pixel">Google Pixel</option>
                    <option value="OnePlus">OnePlus</option>
                    <option value="Realme">Realme</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-graphite block mb-1">
                    Exact Model Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={deviceModel}
                    onChange={e => setDeviceModel(e.target.value)}
                    placeholder="e.g. iPhone 13 Pro Max or Galaxy S23"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs text-graphite focus:border-accent"
                  />
                </div>
              </div>

              {/* Issue selection */}
              <div>
                <label className="text-xs font-bold text-graphite block mb-2">
                  Select Problem / Service Required *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {issueOptions.map(opt => (
                    <div
                      key={opt.id}
                      onClick={() => setIssueType(opt.id)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                        issueType === opt.id
                          ? 'border-accent bg-orange-50/60 ring-1 ring-accent text-graphite'
                          : 'border-sage-200 hover:border-sage-300 text-sage-700 bg-white'
                      }`}
                    >
                      <div className="font-bold text-xs">{opt.label}</div>
                      <div className="flex items-center justify-between text-[11px] text-sage-500 mt-1">
                        <span>Est: <strong className="text-accent">{formatPKR(opt.basePrice)}</strong></span>
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" />
                          {opt.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-bold text-graphite block mb-1">
                  Describe Problem in Detail (Optional)
                </label>
                <textarea
                  rows={2}
                  value={additionalNotes}
                  onChange={e => setAdditionalNotes(e.target.value)}
                  placeholder="e.g. Screen touch not responding on top right corner, dropped in water yesterday"
                  className="w-full px-3.5 py-2 rounded-xl bg-sage-50 border border-sage-200 text-xs text-graphite focus:border-accent"
                />
              </div>

              {/* Service mode */}
              <div>
                <label className="text-xs font-bold text-graphite block mb-2">
                  How would you like to receive service?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer ${
                      serviceMode === 'shop_walkin' ? 'border-accent bg-orange-50/50' : 'border-sage-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="serviceMode"
                      checked={serviceMode === 'shop_walkin'}
                      onChange={() => setServiceMode('shop_walkin')}
                      className="accent-accent"
                    />
                    <div className="text-xs">
                      <span className="font-bold block text-graphite">Walk-in at Shop No. 6</span>
                      <span className="text-[10px] text-sage-500">Rehma Centre, Katchehry Chowk Multan</span>
                    </div>
                  </label>

                  <label
                    className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer ${
                      serviceMode === 'multan_pickup' ? 'border-accent bg-orange-50/50' : 'border-sage-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="serviceMode"
                      checked={serviceMode === 'multan_pickup'}
                      onChange={() => setServiceMode('multan_pickup')}
                      className="accent-accent"
                    />
                    <div className="text-xs">
                      <span className="font-bold block text-graphite">Doorstep Pickup in Multan</span>
                      <span className="text-[10px] text-sage-500">Rider collects device from your home</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Customer info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-graphite block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Asad Raza"
                    className="w-full px-3 py-2 rounded-xl bg-sage-50 border border-sage-200 text-xs"
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
                    className="w-full px-3 py-2 rounded-xl bg-sage-50 border border-sage-200 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-graphite block mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={e => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-sage-50 border border-sage-200 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-graphite hover:bg-accent text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md disabled:bg-sage-400"
              >
                <Wrench className="w-4 h-4" />
                <span>{isSubmitting ? 'Booking Repair Ticket...' : 'Confirm Repair Appointment'}</span>
              </button>
            </form>
          </div>

          {/* Right Highlights & Lab Features (Cols 9-12) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white p-6 rounded-3xl border border-sage-200 space-y-4 shadow-xs">
              <h3 className="font-heading font-bold text-sm text-graphite pb-2 border-b border-sage-100">
                Why Repair at Al-Mushtaq?
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-graphite">90-Day Parts Warranty:</strong> Any defect in replaced glass or battery is replaced free of cost.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-graphite">Express 45-Min Service:</strong> Watch your phone get repaired live on our front service counter.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-graphite">Central Multan Location:</strong> Shop No. 6, Rehma Centre, Katchehry Chowk. Easy parking.
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-sage-100 text-center space-y-2">
                <span className="text-[11px] text-sage-400 block">Direct Emergency Technician Hotline:</span>
                <a
                  href={getCallLink()}
                  className="font-mono font-bold text-sm text-accent hover:underline block"
                >
                  {siteConfig.phoneRaw}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
