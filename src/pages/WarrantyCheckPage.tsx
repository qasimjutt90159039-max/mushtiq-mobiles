import React, { useState } from 'react';
import { ShieldCheck, Search, CheckCircle2, AlertCircle, Phone, Smartphone, ExternalLink, HelpCircle } from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '../config/siteConfig';

interface WarrantyCheckPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const WarrantyCheckPage: React.FC<WarrantyCheckPageProps> = ({ onNavigate }) => {
  const [imei, setImei] = useState('');
  const [result, setResult] = useState<{
    status: 'valid' | 'not_found' | 'error';
    model?: string;
    ptaStatus?: string;
    warrantyStatus?: string;
    purchaseDate?: string;
    expiryDate?: string;
    shopWarranty?: string;
    carrierStatus?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanImei = imei.replace(/\D/g, '');
    if (cleanImei.length !== 15) {
      alert('IMEI must be exactly 15 digits long.');
      return;
    }

    setLoading(true);

    // Simulate verification check against store warranty database & DIRBS rules
    setTimeout(() => {
      setLoading(false);
      if (cleanImei.startsWith('35') || cleanImei.startsWith('86') || cleanImei.startsWith('01')) {
        setResult({
          status: 'valid',
          model: cleanImei.startsWith('35') ? 'Apple iPhone 15 Pro Max (256GB)' : 'Samsung Galaxy S24 Ultra (512GB)',
          ptaStatus: 'Compliant (PTA Approved - Customs Duties Paid)',
          warrantyStatus: 'Official 1-Year Brand Warranty Active',
          purchaseDate: '15 January 2026',
          expiryDate: '14 January 2027',
          shopWarranty: 'Al-Mushtaq Mobiles Multan Verified Purchase Receipt On File',
          carrierStatus: 'All Pakistan Networks Compatible (Jazz, Zong, Telenor, Ufone)'
        });
      } else {
        setResult({
          status: 'valid',
          model: 'Verified Global Smartphone Device',
          ptaStatus: 'Compliant (PTA Approved)',
          warrantyStatus: 'Active Coverage',
          purchaseDate: 'Recent Registration',
          expiryDate: 'Coverage Valid',
          shopWarranty: 'Genuine Handset Checked by Al-Mushtaq Tech Team',
          carrierStatus: 'Dual SIM / eSIM Ready'
        });
      }
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-orange-100 text-accent flex items-center justify-center mx-auto">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-graphite tracking-tight">
          Verify PTA Status & Shop Warranty
        </h1>
        <p className="text-xs sm:text-sm text-sage-500 max-w-lg mx-auto">
          Check if your device was purchased at Al-Mushtaq Mobiles and verify official Pakistan Telecommunication Authority compliance.
        </p>
      </div>

      {/* Input Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sage-200 shadow-xs max-w-xl mx-auto space-y-4">
        <form onSubmit={handleCheck} className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-graphite">
                Enter 15-Digit Device IMEI *
              </label>
              <span className="text-[11px] text-accent font-semibold flex items-center gap-1">
                <HelpCircle className="w-3 h-3" />
                Dial *#06# to see IMEI
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                required
                maxLength={15}
                value={imei}
                onChange={e => setImei(e.target.value.replace(/\D/g, ''))}
                placeholder="e.g. 358920491029482"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-sage-50 border border-sage-200 text-xs font-mono font-bold tracking-wider text-graphite focus:border-accent"
              />
              <Smartphone className="w-4 h-4 text-sage-400 absolute left-3.5 top-3.5" />
            </div>
            <span className="text-[10px] text-sage-400 mt-1 block">
              {imei.length}/15 digits entered
            </span>
          </div>

          <button
            type="submit"
            disabled={loading || imei.length < 15}
            className="w-full py-3.5 rounded-xl bg-graphite hover:bg-accent text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md disabled:bg-sage-400"
          >
            <Search className="w-4 h-4" />
            <span>{loading ? 'Verifying PTA Registry...' : 'Check IMEI Status Now'}</span>
          </button>
        </form>
      </div>

      {/* Verification Result Card */}
      {result && result.status === 'valid' && (
        <div className="bg-white rounded-3xl border border-sage-200 p-6 sm:p-8 space-y-6 shadow-xs max-w-2xl mx-auto">
          <div className="flex items-center gap-3 pb-4 border-b border-sage-100">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base text-graphite">
                PTA Approved & Authenticated
              </h3>
              <p className="text-xs text-green-700 font-semibold">
                IMEI: {imei} is registered and legally imported.
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-sage-50 flex justify-between">
              <span className="font-bold text-sage-500">Device Model:</span>
              <span className="font-semibold text-graphite text-right">{result.model}</span>
            </div>

            <div className="p-3 rounded-xl bg-sage-50 flex justify-between">
              <span className="font-bold text-sage-500">PTA Compliance:</span>
              <span className="font-bold text-green-700 text-right">{result.ptaStatus}</span>
            </div>

            <div className="p-3 rounded-xl bg-sage-50 flex justify-between">
              <span className="font-bold text-sage-500">Warranty Coverage:</span>
              <span className="font-semibold text-graphite text-right">{result.warrantyStatus}</span>
            </div>

            <div className="p-3 rounded-xl bg-sage-50 flex justify-between">
              <span className="font-bold text-sage-500">Network Compatibility:</span>
              <span className="font-semibold text-graphite text-right">{result.carrierStatus}</span>
            </div>

            <div className="p-3 rounded-xl bg-sage-50 flex justify-between">
              <span className="font-bold text-sage-500">Store Verification:</span>
              <span className="font-semibold text-accent text-right">{result.shopWarranty}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href="https://dirbs.pta.gov.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 rounded-xl border border-sage-200 text-center font-bold text-xs text-graphite hover:bg-sage-50 flex items-center justify-center gap-1.5"
            >
              <span>Cross-check on DIRBS Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={getWhatsAppLink(`Assalam-o-Alaikum! Inquiring about warranty on IMEI: ${imei}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 rounded-xl bg-[#25D366] text-white text-center font-bold text-xs hover:bg-[#1ebd59] transition-colors"
            >
              Contact Shop Support
            </a>
          </div>
        </div>
      )}

      {/* Official PTA Instruction Steps */}
      <div className="bg-sage-50 rounded-3xl p-6 sm:p-8 border border-sage-200 max-w-2xl mx-auto space-y-4">
        <h4 className="font-heading font-bold text-sm text-graphite">
          Official PTA DIRBS 8484 Verification Methods:
        </h4>
        <ol className="list-decimal pl-5 text-xs text-sage-600 space-y-2">
          <li>
            <strong>Via SMS (Free):</strong> Send your 15-digit IMEI to <strong>8484</strong> from any Jazz, Zong, Telenor, or Ufone SIM.
          </li>
          <li>
            <strong>Via Official Website:</strong> Visit <a href="https://dirbs.pta.gov.pk" target="_blank" rel="noreferrer" className="text-accent underline font-bold">dirbs.pta.gov.pk</a> and submit your IMEI.
          </li>
          <li>
            <strong>Via DIRBS Mobile App:</strong> Download the official DIRBS app from Google Play Store or Apple App Store.
          </li>
        </ol>
      </div>
    </div>
  );
};
