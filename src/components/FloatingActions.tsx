import React, { useState } from 'react';
import { Phone, MessageSquare, X } from 'lucide-react';
import { getWhatsAppLink, getCallLink, siteConfig } from '../config/siteConfig';

export const FloatingActions: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-6 z-40 flex flex-col items-end gap-3 no-print">
      {/* WhatsApp Help Bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-graphite px-3.5 py-2 rounded-2xl shadow-xl border border-sage-200 text-xs font-medium animate-bounce">
          <span>Need help choosing a phone? Ask us on WhatsApp!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-sage-400 hover:text-graphite cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Click-to-Call */}
      <a
        id="floating-call-btn"
        href={getCallLink()}
        className="w-12 h-12 rounded-full bg-graphite text-white flex items-center justify-center shadow-lg hover:scale-105 hover:bg-black transition-all group"
        title={`Call Shop: ${siteConfig.phoneRaw}`}
      >
        <Phone className="w-5 h-5 group-hover:animate-pulse" />
      </a>

      {/* Floating WhatsApp */}
      <a
        id="floating-whatsapp-btn"
        href={getWhatsAppLink('Assalam-o-Alaikum Al-Mushtaq Mobiles! I am browsing your website and need information about a product.')}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-105 hover:bg-[#1ebd59] transition-all relative"
        title="Chat with Al-Mushtaq Mobiles on WhatsApp"
      >
        <MessageSquare className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold">
          1
        </span>
      </a>
    </div>
  );
};
