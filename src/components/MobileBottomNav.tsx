import React from 'react';
import { Home, Grid, Wrench, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface MobileBottomNavProps {
  currentPage?: string;
  activePage?: string;
  onNavigate: (page: string, param?: string) => void;
  onOpenCart?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage: propCurrentPage,
  activePage,
  onNavigate,
  onOpenCart
}) => {
  const currentPage = activePage || propCurrentPage || 'home';
  const { itemCount, setIsDrawerOpen } = useCart();
  const { wishlist } = useAuth();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-sage-200 px-2 py-1.5 flex items-center justify-around shadow-lg no-print">
      <button
        id="mobile-nav-home"
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center py-1 px-2 text-[10px] font-semibold transition-colors ${
          currentPage === 'home' ? 'text-accent' : 'text-sage-600'
        }`}
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span>Home</span>
      </button>

      <button
        id="mobile-nav-shop"
        onClick={() => onNavigate('shop')}
        className={`flex flex-col items-center py-1 px-2 text-[10px] font-semibold transition-colors ${
          currentPage === 'shop' ? 'text-accent' : 'text-sage-600'
        }`}
      >
        <Grid className="w-5 h-5 mb-0.5" />
        <span>Shop</span>
      </button>

      <button
        id="mobile-nav-repairs"
        onClick={() => onNavigate('repair-booking')}
        className={`flex flex-col items-center py-1 px-2 text-[10px] font-semibold transition-colors ${
          currentPage === 'repair-booking' ? 'text-accent' : 'text-sage-600'
        }`}
      >
        <div className="relative">
          <Wrench className="w-5 h-5 mb-0.5" />
          <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-accent text-white text-[8px] font-bold rounded-full">
            Lab
          </span>
        </div>
        <span>Repairs</span>
      </button>

      <button
        id="mobile-nav-wishlist"
        onClick={() => onNavigate('wishlist')}
        className={`flex flex-col items-center py-1 px-2 text-[10px] font-semibold transition-colors ${
          currentPage === 'wishlist' ? 'text-accent' : 'text-sage-600'
        }`}
      >
        <div className="relative">
          <Heart className="w-5 h-5 mb-0.5" />
          {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-accent text-white text-[8px] font-bold rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </div>
        <span>Wishlist</span>
      </button>

      <button
        id="mobile-nav-cart"
        onClick={() => setIsDrawerOpen(true)}
        className="flex flex-col items-center py-1 px-2 text-[10px] font-semibold text-graphite relative"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 mb-0.5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-2 w-4 h-4 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </div>
        <span>Cart</span>
      </button>
    </div>
  );
};
