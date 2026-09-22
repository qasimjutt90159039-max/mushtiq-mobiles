import React from 'react';
import { initialBrands } from '../data/seedData';

interface BrandMarqueeProps {
  onSelectBrand: (brandSlug: string) => void;
}

export const BrandMarquee: React.FC<BrandMarqueeProps> = ({ onSelectBrand }) => {
  return (
    <div className="border-y border-sage-200 bg-sage-50/70 py-6 my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-sage-600">
            Authorized Brands Available at Katchehry Chowk Multan
          </h3>
          <span className="text-[11px] text-sage-500 font-medium">
            100% Original Pakistani Stock
          </span>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
          {initialBrands.map(brand => (
            <button
              key={brand.id}
              onClick={() => onSelectBrand(brand.name)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-sage-200 hover:border-accent hover:shadow-xs transition-all shrink-0 cursor-pointer group"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-5 h-5 object-contain grayscale group-hover:grayscale-0 transition-all"
              />
              <span className="text-xs font-bold text-graphite group-hover:text-accent">
                {brand.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
