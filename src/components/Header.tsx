import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, Heart, GitCompare, Phone, MapPin, Clock, User, Facebook, Globe, Menu, X, ArrowRight, ShieldCheck, Wrench, Smartphone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useCompare } from '../context/CompareContext';
import { siteConfig, getCallLink, formatPKR } from '../config/siteConfig';
import { Product } from '../types';

interface HeaderProps {
  onNavigate: (page: string, param?: string) => void;
  currentPage?: string;
  activePage?: string;
  onOpenCart?: () => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  currentPage: propCurrentPage,
  activePage,
  onOpenCart,
  onOpenSearch
}) => {
  const currentPage = activePage || propCurrentPage || 'home';
  const { isUrdu, toggleLanguage } = useLanguage();
  const { itemCount, subtotal, setIsDrawerOpen } = useCart();
  const { user, isAdmin, wishlist } = useAuth();
  const { compareList } = useCompare();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // Autocomplete search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(searchQuery.trim())}`);
        const data = await res.json();
        if (data.success && data.products) {
          setSearchResults(data.products.slice(0, 6));
          setShowResults(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside search
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowResults(false);
      onNavigate('shop', `search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-sage-200 shadow-xs">
      {/* Top Utility Announcement Bar */}
      <div className="bg-graphite text-sage-200 text-xs py-2 px-4 sm:px-8 border-b border-sage-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Shop Hours & Address */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-sage-300">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span className="truncate max-w-[280px] sm:max-w-none">Shop No. 6, Rehma Commercial Centre, Katchehry Chowk, Multan</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-sage-400">
              <Clock className="w-3.5 h-3.5 text-sage-400" />
              <span>Mon-Sat: 10:30 AM – 10:30 PM</span>
            </span>
          </div>

          {/* Social, Call & Utilities */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Direct Phone */}
            <a
              id="header-call-btn"
              href={getCallLink()}
              className="flex items-center gap-1.5 text-white hover:text-accent font-medium transition-colors"
              title="Click to Call Shop"
            >
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span>{siteConfig.phoneRaw}</span>
            </a>

            <span className="hidden sm:inline text-sage-600">|</span>

            {/* Official Facebook Link */}
            <a
              id="header-facebook-link"
              href={siteConfig.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
              title="Visit our Facebook Page"
            >
              <Facebook className="w-3.5 h-3.5 text-[#1877F2]" />
              <span className="hidden sm:inline">Facebook</span>
            </a>

            <span className="hidden sm:inline text-sage-600">|</span>

            {/* Track Order */}
            <button
              id="header-track-order-btn"
              onClick={() => onNavigate('track-order')}
              className="hover:text-accent text-sage-300 transition-colors cursor-pointer"
            >
              {isUrdu ? 'آرڈر ٹریک کریں' : 'Track Order'}
            </button>

            <span className="text-sage-600">|</span>

            {/* Language Switcher */}
            <button
              id="header-lang-toggle"
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-sage-800 hover:bg-sage-700 text-white font-medium cursor-pointer transition-colors"
              title="Toggle English / Urdu"
            >
              <Globe className="w-3 h-3 text-accent" />
              <span>{isUrdu ? 'English' : 'اردو'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div
            id="brand-logo-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-graphite flex items-center justify-center text-white font-black text-xl shadow-md border border-sage-700 group-hover:border-accent transition-colors">
              <span className="text-accent font-mono font-bold">M</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-xl tracking-tight text-graphite group-hover:text-accent transition-colors">
                  Al-Mushtaq
                </span>
                <span className="text-xs uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-sage-100 text-sage-700 border border-sage-200">
                  Mobiles
                </span>
              </div>
              <p className="text-[10px] text-sage-500 font-medium tracking-wide">
                Katchehry Chowk, Multan • Genuine & PTA Approved
              </p>
            </div>
          </div>

          {/* Search Bar with Live Autocomplete */}
          <div ref={searchRef} className="hidden lg:block flex-1 max-w-lg mx-6 relative">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                id="main-search-input"
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim() && setShowResults(true)}
                placeholder={isUrdu ? 'فونز، چارجرز، ایئربڈز تلاش کریں...' : 'Search iPhone, Samsung, Xiaomi, accessories, repairs...'}
                className="w-full pl-11 pr-24 py-2.5 rounded-full bg-sage-50 border border-sage-200 focus:border-accent focus:bg-white focus:outline-none text-sm transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-sage-500 absolute left-4 top-3.5" />
              <button
                id="main-search-submit"
                type="submit"
                className="absolute right-1.5 top-1 px-4 py-1.5 rounded-full bg-graphite text-white text-xs font-semibold hover:bg-accent transition-colors cursor-pointer"
              >
                {isUrdu ? 'تلاش' : 'Search'}
              </button>
            </form>

            {/* Autocomplete Dropdown Preview */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-sage-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                <div className="p-2 border-b border-sage-100 bg-sage-50 flex items-center justify-between text-xs text-sage-600 font-medium">
                  <span>Matching products ({searchResults.length})</span>
                  <span className="text-[10px] text-sage-400">Press Enter for full search</span>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-sage-100">
                  {searchResults.map(prod => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        setShowResults(false);
                        setSearchQuery('');
                        onNavigate('product-detail', prod.slug);
                      }}
                      className="p-3 flex items-center gap-3 hover:bg-sage-50 cursor-pointer transition-colors"
                    >
                      <img src={prod.thumbnail} alt={prod.title} className="w-12 h-12 object-contain rounded-lg border border-sage-100 bg-white p-1" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-graphite truncate">{prod.title}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-accent">{formatPKR(prod.basePrice)}</span>
                          {prod.originalPrice && (
                            <span className="text-[10px] line-through text-sage-400">{formatPKR(prod.originalPrice)}</span>
                          )}
                          <span className="text-[9px] px-1.5 py-0.2 bg-sage-100 text-sage-700 rounded font-medium">
                            {prod.ptaStatus}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-sage-400 shrink-0" />
                    </div>
                  ))}
                </div>
                <div
                  onClick={handleSearchSubmit}
                  className="p-2.5 text-center text-xs font-semibold text-accent bg-accent-light hover:bg-orange-100 cursor-pointer transition-colors"
                >
                  View all results for "{searchQuery}"
                </div>
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Compare */}
            <button
              id="header-compare-btn"
              onClick={() => onNavigate('compare')}
              className="relative p-2 rounded-xl text-sage-700 hover:text-graphite hover:bg-sage-100 transition-colors cursor-pointer"
              title="Compare Devices"
            >
              <GitCompare className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-graphite text-white text-[10px] font-bold flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <button
              id="header-wishlist-btn"
              onClick={() => onNavigate('wishlist')}
              className="relative p-2 rounded-xl text-sage-700 hover:text-graphite hover:bg-sage-100 transition-colors cursor-pointer"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account / Admin Button */}
            <button
              id="header-account-btn"
              onClick={() => (isAdmin ? onNavigate('admin') : onNavigate('account'))}
              className="flex items-center gap-1.5 p-2 rounded-xl text-sage-700 hover:text-graphite hover:bg-sage-100 transition-colors cursor-pointer"
              title={user ? (isAdmin ? 'Admin Portal' : user.name) : 'Sign In'}
            >
              <User className="w-5 h-5" />
              <span className="hidden md:inline text-xs font-semibold">
                {user ? (isAdmin ? 'Admin Portal' : user.name.split(' ')[0]) : 'Login'}
              </span>
            </button>

            {/* Cart Trigger */}
            <button
              id="header-cart-btn"
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-graphite text-white hover:bg-accent transition-colors shadow-sm cursor-pointer"
              title="Open Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-accent text-white text-[9px] font-bold flex items-center justify-center border-2 border-graphite">
                    {itemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-none">
                <span className="text-[10px] text-sage-300 font-medium">Cart</span>
                <span className="text-xs font-bold font-mono">{formatPKR(subtotal)}</span>
              </div>
            </button>

            {/* Mobile menu toggle */}
            <button
              id="header-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-graphite hover:bg-sage-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 lg:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search mobiles, specs, accessories..."
              className="w-full pl-10 pr-20 py-2 rounded-xl bg-sage-50 border border-sage-200 focus:border-accent text-sm"
            />
            <Search className="w-4 h-4 text-sage-500 absolute left-3.5 top-3" />
            <button
              type="submit"
              className="absolute right-1.5 top-1 px-3 py-1 rounded-lg bg-graphite text-white text-xs font-medium"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Primary Category & Service Bar */}
      <nav className="bg-sage-50 border-t border-sage-200 hidden lg:block">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between text-xs font-semibold text-sage-700">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3.5 py-2.5 rounded-md hover:text-graphite hover:bg-sage-100 transition-colors cursor-pointer ${
                currentPage === 'home' ? 'text-accent font-bold border-b-2 border-accent' : ''
              }`}
            >
              {isUrdu ? 'ہوم' : 'Home'}
            </button>

            <button
              onClick={() => onNavigate('shop')}
              className={`px-3.5 py-2.5 rounded-md hover:text-graphite hover:bg-sage-100 transition-colors cursor-pointer ${
                currentPage === 'shop' ? 'text-accent font-bold border-b-2 border-accent' : ''
              }`}
            >
              {isUrdu ? 'تمام موبائلز' : 'All Mobiles & Accessories'}
            </button>

            <button
              onClick={() => onNavigate('shop', 'category=smartphones')}
              className="px-3 py-2.5 rounded-md hover:text-graphite hover:bg-sage-100 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Smartphone className="w-3.5 h-3.5 text-sage-500" />
              <span>Smartphones</span>
            </button>

            <button
              onClick={() => onNavigate('shop', 'category=used-refurbished')}
              className="px-3 py-2.5 rounded-md hover:text-graphite hover:bg-sage-100 transition-colors cursor-pointer"
            >
              Used / Certified
            </button>

            <button
              onClick={() => onNavigate('shop', 'category=accessories')}
              className="px-3 py-2.5 rounded-md hover:text-graphite hover:bg-sage-100 transition-colors cursor-pointer"
            >
              Chargers & Accessories
            </button>

            <button
              onClick={() => onNavigate('repair-booking')}
              className={`px-3.5 py-2.5 rounded-md hover:text-graphite hover:bg-sage-100 transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'repair-booking' ? 'text-accent font-bold' : ''
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-accent" />
              <span>{isUrdu ? 'موبائل ریپئر سروس' : 'Repair Booking'}</span>
            </button>

            <button
              onClick={() => onNavigate('trade-in')}
              className="px-3 py-2.5 rounded-md hover:text-graphite hover:bg-sage-100 transition-colors cursor-pointer"
            >
              Sell / Trade-In
            </button>

            <button
              onClick={() => onNavigate('installments')}
              className="px-3 py-2.5 rounded-md hover:text-graphite hover:bg-sage-100 transition-colors cursor-pointer"
            >
              Installment Plans
            </button>

            <button
              onClick={() => onNavigate('warranty-lookup')}
              className="px-3 py-2.5 rounded-md hover:text-graphite hover:bg-sage-100 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-sage-600" />
              <span>Warranty & PTA</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigate('blog')}
              className="px-3 py-2.5 rounded-md hover:text-graphite transition-colors cursor-pointer"
            >
              Buying Guides
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="px-3 py-2.5 rounded-md hover:text-graphite transition-colors cursor-pointer"
            >
              About Shop
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-3 py-2.5 rounded-md hover:text-graphite transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-sage-200 px-4 py-4 space-y-2 shadow-lg">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('home');
            }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-sage-100 text-sm font-semibold"
          >
            Home
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('shop');
            }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-sage-100 text-sm font-semibold"
          >
            All Mobiles & Accessories
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('shop', 'category=smartphones');
            }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-sage-100 text-sm font-semibold"
          >
            Smartphones (PTA Approved)
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('shop', 'category=used-refurbished');
            }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-sage-100 text-sm font-semibold"
          >
            Used / Refurbished Phones
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('repair-booking');
            }}
            className="w-full text-left py-2 px-3 rounded-lg bg-orange-50 text-accent font-semibold text-sm flex items-center justify-between"
          >
            <span>Mobile Repair Booking</span>
            <Wrench className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('trade-in');
            }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-sage-100 text-sm font-semibold"
          >
            Sell / Trade-In Phone
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('installments');
            }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-sage-100 text-sm font-semibold"
          >
            Installment Plan Request
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('warranty-lookup');
            }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-sage-100 text-sm font-semibold"
          >
            Warranty & PTA IMEI Lookup
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('track-order');
            }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-sage-100 text-sm font-semibold"
          >
            Track Order
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('about');
            }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-sage-100 text-sm font-semibold"
          >
            About Us (Multan Shop)
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('contact');
            }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-sage-100 text-sm font-semibold"
          >
            Contact & Location Map
          </button>

          {isAdmin && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('admin');
              }}
              className="w-full text-left py-2 px-3 rounded-lg bg-graphite text-white text-sm font-bold mt-2"
            >
              Admin Dashboard
            </button>
          )}
        </div>
      )}
    </header>
  );
};
