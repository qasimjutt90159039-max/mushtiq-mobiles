import React, { useState } from 'react';
import { Phone, MapPin, Clock, Facebook, MessageSquare, ShieldCheck, Truck, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import { siteConfig, getCallLink, getWhatsAppLink } from '../config/siteConfig';

interface FooterProps {
  onNavigate: (page: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-graphite text-sage-300 pt-16 pb-8 border-t border-sage-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Trust Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-sage-800 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sage-800 flex items-center justify-center shrink-0 text-accent">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-white font-bold text-sm">100% Genuine & PTA Approved</h5>
              <p className="text-sage-400 mt-0.5">Customs tax verified with invoice</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sage-800 flex items-center justify-center shrink-0 text-accent">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-white font-bold text-sm">Same-Day Multan Delivery</h5>
              <p className="text-sage-400 mt-0.5">Express delivery within 2 hours</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sage-800 flex items-center justify-center shrink-0 text-accent">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-white font-bold text-sm">7-Day Checking Warranty</h5>
              <p className="text-sage-400 mt-0.5">Physical shop replacement guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sage-800 flex items-center justify-center shrink-0 text-accent">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-white font-bold text-sm">Direct Phone & WhatsApp Support</h5>
              <p className="text-sage-400 mt-0.5">Instant assistance from shop owners</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-sage-800">
          {/* Shop Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white font-mono font-black text-xl">
                M
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-xl text-white tracking-tight">
                  Al-Mushtaq Mobiles
                </h4>
                <p className="text-xs text-sage-400">Mobile Phone Store & Certified Repair Lab</p>
              </div>
            </div>

            <p className="text-sm text-sage-400 leading-relaxed max-w-sm">
              Multan's leading mobile technology boutique located at Katchehry Chowk. Providing authentic smartphones, original accessories, expert hardware repairs, and trade-in solutions with guaranteed PTA compliance.
            </p>

            <div className="space-y-2.5 text-xs text-sage-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="leading-tight">{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-accent shrink-0" />
                <span>Monday – Saturday: 10:30 AM – 10:30 PM (Sunday Closed)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href={getCallLink()} className="text-white hover:text-accent font-semibold transition-colors">
                  {siteConfig.phoneRaw}
                </a>
              </div>
            </div>

            {/* Social & Messenger CTA */}
            <div className="flex items-center gap-3 pt-2">
              <a
                id="footer-facebook-btn"
                href={siteConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sage-800 hover:bg-[#1877F2] text-white text-xs font-semibold transition-colors"
              >
                <Facebook className="w-4 h-4" />
                <span>Visit Facebook Page</span>
              </a>

              <a
                id="footer-whatsapp-btn"
                href={getWhatsAppLink('Assalam-o-Alaikum! I have a question regarding a mobile phone.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1ebd59] text-white text-xs font-semibold transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h5 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">
              Categories
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('shop', 'category=smartphones')} className="hover:text-white transition-colors cursor-pointer">
                  Smartphones
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'category=used-refurbished')} className="hover:text-white transition-colors cursor-pointer">
                  Used / Certified Phones
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'category=feature-phones')} className="hover:text-white transition-colors cursor-pointer">
                  Keypad & Feature Phones
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'category=tablets')} className="hover:text-white transition-colors cursor-pointer">
                  Tablets & iPads
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'category=smart-watches')} className="hover:text-white transition-colors cursor-pointer">
                  Smart Watches
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'category=earbuds-headphones')} className="hover:text-white transition-colors cursor-pointer">
                  AirPods & Earbuds
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'category=chargers-cables')} className="hover:text-white transition-colors cursor-pointer">
                  Fast Chargers & Cables
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'category=power-banks')} className="hover:text-white transition-colors cursor-pointer">
                  Power Banks (20,000mAh)
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Services */}
          <div>
            <h5 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">
              Shop Services
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('repair-booking')} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-accent font-semibold">
                  <span>Mobile Repair Booking</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trade-in')} className="hover:text-white transition-colors cursor-pointer">
                  Sell / Trade-In Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('installments')} className="hover:text-white transition-colors cursor-pointer">
                  Installment Plans
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('warranty-lookup')} className="hover:text-white transition-colors cursor-pointer">
                  Warranty & IMEI Check
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('track-order')} className="hover:text-white transition-colors cursor-pointer">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors cursor-pointer">
                  PTA Verification Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Multan Showroom
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact & Shop Map
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter & PTA advisory */}
          <div className="space-y-4">
            <h5 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              VIP Deals Club
            </h5>
            <p className="text-xs text-sage-400">
              Get secret discounts on newly launched smartphones & flash clearance alerts for Multan residents.
            </p>

            <form onSubmit={handleSubscribe} className="relative">
              <input
                id="footer-newsletter-input"
                type="email"
                required
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-3 pr-10 py-2.5 rounded-lg bg-sage-800 border border-sage-700 text-white text-xs focus:border-accent focus:outline-none placeholder:text-sage-500"
              />
              <button
                id="footer-newsletter-submit"
                type="submit"
                className="absolute right-1 top-1 p-1.5 rounded-md bg-accent text-white hover:bg-orange-600 transition-colors cursor-pointer"
                title="Subscribe"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {subscribed && (
              <div className="flex items-center gap-1.5 text-xs text-green-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Thank you for subscribing to Al-Mushtaq Mobiles!</span>
              </div>
            )}

            {/* Official PTA DIRBS Notice */}
            <div className="p-3 rounded-lg bg-sage-800/60 border border-sage-700/80 text-[11px] leading-relaxed">
              <span className="font-bold text-white block mb-0.5">🇵🇰 Official PTA Advisory:</span>
              Always verify device IMEI by sending 15 digits to <span className="text-accent font-mono font-bold">8484</span> or via DIRBS portal. We sell only genuine, tax-cleared devices.
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Payment Methods, Policies */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-sage-400">
          <div>
            © {new Date().getFullYear()} <span className="text-white font-semibold">Al-Mushtaq Mobiles</span>. All rights reserved. Registered Mobile Phone Store, Multan, Pakistan.
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button onClick={() => onNavigate('policies', 'warranty')} className="hover:text-white transition-colors cursor-pointer">
              Warranty Policy
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('policies', 'shipping')} className="hover:text-white transition-colors cursor-pointer">
              Shipping & Delivery
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('policies', 'return')} className="hover:text-white transition-colors cursor-pointer">
              7-Day Checking
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('policies', 'privacy')} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('policies', 'terms')} className="hover:text-white transition-colors cursor-pointer">
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
