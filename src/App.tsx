import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { CompareProvider } from './context/CompareContext';

// Layout & Global Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { FloatingActions } from './components/FloatingActions';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ComparePage } from './pages/ComparePage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { RepairBookingPage } from './pages/RepairBookingPage';
import { SellTradeInPage } from './pages/SellTradeInPage';
import { InstallmentPage } from './pages/InstallmentPage';
import { WarrantyCheckPage } from './pages/WarrantyCheckPage';
import { AboutContactPage } from './pages/AboutContactPage';
import { BlogFaqPage } from './pages/BlogFaqPage';
import { AccountPage } from './pages/AccountPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

import { Product } from './types';
import { initialProducts } from './data/seedData';

export default function App() {
  const parseHash = () => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash) return { page: 'home', param: undefined };
    const parts = hash.split('/');
    return { page: parts[0] || 'home', param: parts.slice(1).join('/') || undefined };
  };

  const initial = parseHash();
  const [currentPage, setCurrentPage] = useState<string>(initial.page);
  const [pageParam, setPageParam] = useState<string | undefined>(initial.param);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync with browser history and URL hash
  useEffect(() => {
    const onLocationChange = () => {
      const { page, param } = parseHash();
      setCurrentPage(page);
      setPageParam(param);
    };

    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onLocationChange);
    };
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, pageParam]);

  const handleNavigate = (page: string, param?: string) => {
    setCurrentPage(page);
    setPageParam(param);
    const newHash = param ? `#${page}/${param}` : (page === 'home' ? '#' : `#${page}`);
    if (window.location.hash !== newHash) {
      window.history.pushState(null, '', newHash);
    }
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <CompareProvider>
            <div className="min-h-screen flex flex-col bg-cream text-graphite selection:bg-accent selection:text-white">
              {/* Main Top Header */}
              <Header
                activePage={currentPage}
                onNavigate={handleNavigate}
                onOpenCart={() => setIsCartOpen(true)}
                onOpenSearch={() => handleNavigate('shop')}
              />

              {/* Page Viewport Content */}
              <main className="flex-1 pb-16 md:pb-0">
                {currentPage === 'home' && (
                  <HomePage
                    onNavigate={handleNavigate}
                    onQuickView={handleQuickView}
                  />
                )}

                {currentPage === 'shop' && (
                  <ShopPage
                    onNavigate={handleNavigate}
                    onQuickView={handleQuickView}
                    initialCategory={pageParam}
                  />
                )}

                {currentPage === 'product-detail' && (
                  <ProductDetailPage
                    slug={pageParam || initialProducts[0]?.slug}
                    onNavigate={handleNavigate}
                  />
                )}

                {currentPage === 'compare' && (
                  <ComparePage onNavigate={handleNavigate} />
                )}

                {currentPage === 'cart' && (
                  <CartPage onNavigate={handleNavigate} />
                )}

                {currentPage === 'checkout' && (
                  <CheckoutPage onNavigate={handleNavigate} />
                )}

                {currentPage === 'order-confirmation' && (
                  <OrderConfirmationPage
                    orderNumber={pageParam || 'ORD-88219'}
                    onNavigate={handleNavigate}
                  />
                )}

                {currentPage === 'track-order' && (
                  <OrderTrackingPage
                    initialOrderNumber={pageParam}
                    onNavigate={handleNavigate}
                  />
                )}

                {currentPage === 'repair' && (
                  <RepairBookingPage onNavigate={handleNavigate} />
                )}

                {currentPage === 'sell-trade-in' && (
                  <SellTradeInPage onNavigate={handleNavigate} />
                )}

                {currentPage === 'installments' && (
                  <InstallmentPage onNavigate={handleNavigate} />
                )}

                {currentPage === 'warranty-check' && (
                  <WarrantyCheckPage onNavigate={handleNavigate} />
                )}

                {currentPage === 'about-contact' && (
                  <AboutContactPage onNavigate={handleNavigate} />
                )}

                {currentPage === 'blog-faq' && (
                  <BlogFaqPage onNavigate={handleNavigate} />
                )}

                {currentPage === 'account' && (
                  <AccountPage onNavigate={handleNavigate} />
                )}

                {currentPage === 'admin' && (
                  <AdminDashboardPage onNavigate={handleNavigate} />
                )}
              </main>

              {/* Global Footer */}
              <Footer onNavigate={handleNavigate} />

              {/* Floating Speed Actions (WhatsApp, Call, Top) */}
              <FloatingActions />

              {/* Mobile Bottom Navigation Bar (Hidden on desktop) */}
              <MobileBottomNav
                activePage={currentPage}
                onNavigate={handleNavigate}
                onOpenCart={() => setIsCartOpen(true)}
              />

              {/* Slide-out Cart Drawer */}
              <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onNavigate={handleNavigate}
              />

              {/* Quick View Product Modal */}
              <QuickViewModal
                isOpen={!!quickViewProduct}
                product={quickViewProduct}
                onClose={() => setQuickViewProduct(null)}
                onNavigate={handleNavigate}
              />
            </div>
          </CompareProvider>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
