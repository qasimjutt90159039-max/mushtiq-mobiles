import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Phone, Wrench, Star, CheckCircle, Smartphone, BatteryCharging, Headphones, Shield, HelpCircle, Facebook, MessageSquare } from 'lucide-react';
import { BentoHero } from '../components/BentoHero';
import { ShopByBudget } from '../components/ShopByBudget';
import { BrandMarquee } from '../components/BrandMarquee';
import { ProductCard } from '../components/ProductCard';
import { initialProducts, initialCategories, sampleReviews } from '../data/seedData';
import { siteConfig, getCallLink, getWhatsAppLink } from '../config/siteConfig';
import { Product } from '../types';

interface HomePageProps {
  onNavigate: (page: string, param?: string) => void;
  onQuickView: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onQuickView }) => {
  const featuredProducts = initialProducts.filter(p => p.featured).slice(0, 8);
  const bestSellers = initialProducts.filter(p => p.bestSeller).slice(0, 8);
  const usedPhones = initialProducts.filter(p => p.condition === 'Used').slice(0, 4);

  return (
    <div className="space-y-4">
      {/* 1. Bento Hero Section */}
      <BentoHero onNavigate={onNavigate} />

      {/* 2. Value Propositions Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-sage-200 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-accent flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-graphite text-sm">100% PTA Approved</h4>
              <p className="text-sage-500">Official customs tax verified invoice</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sage-100 text-graphite flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-graphite text-sm">Same-Day Multan Delivery</h4>
              <p className="text-sage-500">Fast 2-hour hand delivery or shop pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-accent flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-graphite text-sm">7-Day Checking Warranty</h4>
              <p className="text-sage-500">Physical shop replacement guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sage-100 text-graphite flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-graphite text-sm">Expert Consultation</h4>
              <p className="text-sage-500">Direct call & WhatsApp support</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Shop by Category Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-accent">Browse Categories</span>
            <h2 className="font-heading font-extrabold text-2xl text-graphite mt-1">Explore Products</h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-bold text-graphite hover:text-accent flex items-center gap-1 cursor-pointer"
          >
            <span>All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {initialCategories.slice(0, 6).map(cat => (
            <div
              key={cat.id}
              onClick={() => onNavigate('shop', `category=${cat.slug}`)}
              className="p-4 rounded-2xl bg-white border border-sage-200 hover:border-accent hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-sage-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <img src={cat.image} alt={cat.name} className="w-10 h-10 object-contain" />
              </div>
              <h4 className="font-heading font-bold text-xs text-graphite group-hover:text-accent transition-colors">
                {cat.name}
              </h4>
              <span className="text-[10px] text-sage-400 mt-0.5">{cat.productCount ?? cat.itemCount} models</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Featured Smartphones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-accent">Handpicked Flagships</span>
            <h2 className="font-heading font-extrabold text-2xl text-graphite mt-1">Featured Smartphones</h2>
          </div>
          <button
            onClick={() => onNavigate('shop', 'featured=true')}
            className="text-xs font-bold text-graphite hover:text-accent flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>

      {/* 5. Brand Marquee */}
      <BrandMarquee onSelectBrand={brand => onNavigate('shop', `brand=${encodeURIComponent(brand)}`)} />

      {/* 6. Shop By Budget */}
      <ShopByBudget
        onSelectBudget={(min, max) =>
          onNavigate('shop', `minPrice=${min}${max ? `&maxPrice=${max}` : ''}`)
        }
      />

      {/* 7. Best Sellers in Multan */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-accent">Top Rated & Trending</span>
            <h2 className="font-heading font-extrabold text-2xl text-graphite mt-1">Best Sellers in Multan</h2>
          </div>
          <button
            onClick={() => onNavigate('shop', 'bestSeller=true')}
            className="text-xs font-bold text-graphite hover:text-accent flex items-center gap-1 cursor-pointer"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {bestSellers.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>

      {/* 8. Certified Used / Refurbished Spotlight */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <div className="bg-sage-50 rounded-3xl p-6 sm:p-8 border border-sage-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
                Pre-Owned Guarantee
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-graphite mt-2">
                Certified Used Smartphones
              </h2>
              <p className="text-xs text-sage-600 mt-1 max-w-xl">
                Every pre-owned phone undergoes 35-point hardware inspection at our Multan repair lab. Backed by 7-day shop checking warranty & guaranteed PTA customs status.
              </p>
            </div>
            <button
              onClick={() => onNavigate('shop', 'category=used-refurbished')}
              className="px-4 py-2.5 rounded-xl bg-graphite text-white hover:bg-accent text-xs font-bold transition-colors cursor-pointer shrink-0"
            >
              Browse Used Mobiles
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {usedPhones.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={onNavigate}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 9. Dual Banner: Mobile Repair Lab & Trade-In Upgrade */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Repair Lab Banner */}
          <div className="bg-graphite text-white rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between border border-sage-800">
            <div className="relative z-10 max-w-sm space-y-3">
              <span className="px-3 py-1 rounded-full bg-accent text-white text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                <span>Multan Repair Lab</span>
              </span>
              <h3 className="font-heading font-extrabold text-2xl tracking-tight">
                Broken Screen? Dying Battery? Dead Motherboard?
              </h3>
              <p className="text-xs text-sage-300 leading-relaxed">
                Trust Al-Mushtaq's certified technicians at Katchehry Chowk. We use genuine OCA glass laminations, original battery cells, and provide up to 90 days repair warranty.
              </p>
            </div>

            <div className="relative z-10 pt-6 flex items-center gap-3">
              <button
                onClick={() => onNavigate('repair-booking')}
                className="px-5 py-2.5 rounded-xl bg-accent hover:bg-orange-600 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Book Repair Appointment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Trade-In Banner */}
          <div className="bg-orange-50 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between border border-orange-200">
            <div className="relative z-10 max-w-sm space-y-3">
              <span className="px-3 py-1 rounded-full bg-accent/15 text-accent text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Trade-In Program</span>
              </span>
              <h3 className="font-heading font-extrabold text-2xl tracking-tight text-graphite">
                Sell Your Old Phone or Upgrade Instantly
              </h3>
              <p className="text-xs text-sage-600 leading-relaxed">
                Get an instant quote online and visit Shop No. 6 at Katchehry Chowk for same-day cash payout or seamless credit toward your new iPhone, Samsung, or Xiaomi.
              </p>
            </div>

            <div className="relative z-10 pt-6 flex items-center gap-3">
              <button
                onClick={() => onNavigate('trade-in')}
                className="px-5 py-2.5 rounded-xl bg-graphite hover:bg-accent text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Calculate Trade-In Value</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 10. Verified Customer Reviews */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs uppercase font-bold tracking-wider text-accent">Customer Testimonials</span>
          <h2 className="font-heading font-extrabold text-2xl text-graphite mt-1">
            Trusted by Thousands Across Multan & Pakistan
          </h2>
          <p className="text-xs text-sage-500 mt-1">
            Real feedback from verified customers who bought in-store or online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sampleReviews.map(rev => (
            <div key={rev.id} className="p-5 rounded-2xl border border-sage-200 bg-white shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-500' : 'text-sage-300'}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-graphite leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-sage-100 flex items-center justify-between text-xs">
                <div>
                  <h5 className="font-bold text-graphite">{rev.author}</h5>
                  <span className="text-[10px] text-sage-400">{rev.city}, Pakistan</span>
                </div>
                <span className="flex items-center gap-1 text-[10px] text-green-700 font-semibold bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified Buyer</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 11. Multan Showroom Visit & Direct Contact Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 mb-8">
        <div className="bg-gradient-to-r from-graphite to-sage-900 text-white rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 border border-sage-800">
          <div className="space-y-3 max-w-lg">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">
              Visit our Flagship Store
            </span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight">
              Experience the Latest Mobiles in Hands Before You Buy
            </h3>
            <p className="text-xs sm:text-sm text-sage-300 leading-relaxed">
              Shop No. 6, Al-Mushtaq Mobiles, Rehma Commercial Centre, Katchehry Road, Katchehry Chowk, Multan. Open Monday to Saturday, 10:30 AM to 10:30 PM.
            </p>
            <div className="pt-2 flex items-center gap-4 flex-wrap text-xs">
              <a
                href={getCallLink()}
                className="px-4 py-2.5 rounded-xl bg-accent hover:bg-orange-600 text-white font-bold flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {siteConfig.phoneRaw}</span>
              </a>

              <a
                href={getWhatsAppLink('Assalam-o-Alaikum! Please share exact location pin of Al-Mushtaq Mobiles Katchehry Chowk.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Get Location on WhatsApp</span>
              </a>

              <button
                onClick={() => onNavigate('contact')}
                className="px-4 py-2.5 rounded-xl bg-sage-800 hover:bg-sage-700 text-white font-semibold transition-colors cursor-pointer"
              >
                View Directions Map
              </button>
            </div>
          </div>

          <div className="w-full lg:w-96 rounded-2xl overflow-hidden border border-sage-700 bg-sage-800/80 p-4 text-xs space-y-2.5">
            <h4 className="font-bold text-white text-sm border-b border-sage-700 pb-2">
              Showroom Services Available:
            </h4>
            <div className="flex items-center gap-2 text-sage-200">
              <CheckCircle className="w-4 h-4 text-accent shrink-0" />
              <span>Free hands-on demo of latest iPhone & Samsung models</span>
            </div>
            <div className="flex items-center gap-2 text-sage-200">
              <CheckCircle className="w-4 h-4 text-accent shrink-0" />
              <span>Instant PTA verification & data transfer from old phone</span>
            </div>
            <div className="flex items-center gap-2 text-sage-200">
              <CheckCircle className="w-4 h-4 text-accent shrink-0" />
              <span>Cash, JazzCash, Meezan Bank, and card payments accepted</span>
            </div>
            <div className="flex items-center gap-2 text-sage-200">
              <CheckCircle className="w-4 h-4 text-accent shrink-0" />
              <span>On-spot mobile glass & battery replacement in 45 mins</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
