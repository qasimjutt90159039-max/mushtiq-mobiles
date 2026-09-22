import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPKR, siteConfig } from '../config/siteConfig';

interface CartDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  onNavigate: (page: string, param?: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
  onNavigate
}) => {
  const {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQuantity,
    removeItem,
    subtotal,
    freeShippingRemaining,
    addToCart
  } = useCart();

  const open = propIsOpen !== undefined ? propIsOpen : isDrawerOpen;
  const handleClose = () => {
    if (propOnClose) propOnClose();
    setIsDrawerOpen(false);
  };

  if (!open) return null;

  const threshold = siteConfig.freeShippingThreshold;
  const progressPercent = Math.min(100, Math.round((subtotal / threshold) * 100));

  // Quick upsell accessory items
  const upsellItems = [
    {
      productId: 'prod-21',
      variantId: 'v21-s24u',
      title: '9D Tempered Glass Screen Protector',
      price: 850,
      colorName: 'Clear Glass',
      storage: 'Standard',
      brand: 'Al-Mushtaq',
      ptaStatus: 'PTA Approved' as const,
      image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=300&auto=format&fit=crop',
      slug: 'premium-9d-tempered-glass',
      maxStock: 50
    },
    {
      productId: 'prod-22',
      variantId: 'v22-blk',
      title: 'Liquid Silicone Soft Shockproof Case',
      price: 1200,
      colorName: 'Midnight Black',
      storage: 'Custom Fit',
      brand: 'Al-Mushtaq',
      ptaStatus: 'PTA Approved' as const,
      image: 'https://images.unsplash.com/photo-1601593346740-925612772716?q=80&w=300&auto=format&fit=crop',
      slug: 'luxury-liquid-silicone-case',
      maxStock: 25
    },
    {
      productId: 'prod-19',
      variantId: 'v19-blk',
      title: 'Baseus 100W Type-C Braided Cable 2M',
      price: 1699,
      colorName: 'Black Braided',
      storage: '2M',
      brand: 'Baseus',
      ptaStatus: 'PTA Approved' as const,
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=300&auto=format&fit=crop',
      slug: 'baseus-100w-usbc-cable-2m',
      maxStock: 40
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden no-print">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-graphite/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-sage-200 flex items-center justify-between bg-sage-50">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-graphite" />
              <h3 className="font-heading font-bold text-base text-graphite">
                Your Cart ({items.reduce((s, i) => s + i.quantity, 0)})
              </h3>
            </div>
            <button
              id="cart-drawer-close"
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 rounded-lg text-sage-500 hover:text-graphite hover:bg-sage-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="p-4 bg-orange-50/60 border-b border-orange-100 text-xs">
            <div className="flex items-center justify-between font-semibold text-graphite mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-accent" />
                {freeShippingRemaining > 0 ? (
                  <span>Add <strong className="text-accent">{formatPKR(freeShippingRemaining)}</strong> more for Free Delivery</span>
                ) : (
                  <span className="text-green-700 font-bold">🎉 You have unlocked Free Nationwide Delivery!</span>
                )}
              </span>
              <span className="text-sage-500">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-orange-200/60 overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-sage-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-sage-500 space-y-3">
                <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center text-sage-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-heading font-bold text-graphite text-base">Your cart is empty</h4>
                <p className="text-xs text-sage-500 max-w-xs">
                  Browse our genuine smartphones, authentic chargers, and audio accessories.
                </p>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onNavigate('shop');
                  }}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-graphite text-white text-xs font-semibold hover:bg-accent transition-colors cursor-pointer"
                >
                  Explore Mobiles
                </button>
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="py-3.5 flex gap-3.5 first:pt-0 last:pb-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain rounded-xl bg-sage-50 p-1.5 border border-sage-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-graphite line-clamp-1">{item.title}</h4>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-sage-600">
                      <span>{item.colorName}</span>
                      <span>•</span>
                      <span>{item.storage}</span>
                      <span className="px-1.5 py-0.2 rounded bg-sage-100 text-[10px] text-sage-700 font-medium ml-auto">
                        {item.ptaStatus}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-sage-200 rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-sage-100 text-sage-700 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-graphite min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-sage-100 text-sage-700 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono text-graphite">
                          {formatPKR(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sage-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Quick Upsell Section */}
            {items.length > 0 && (
              <div className="pt-5 mt-4">
                <div className="flex items-center gap-1 text-xs font-bold text-graphite mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span>Frequently Added in Multan:</span>
                </div>
                <div className="space-y-2">
                  {upsellItems.map(up => (
                    <div key={up.variantId} className="p-2.5 rounded-xl border border-sage-200 bg-sage-50/60 flex items-center justify-between gap-2">
                      <img src={up.image} alt={up.title} className="w-10 h-10 object-contain rounded-lg bg-white p-1 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-[11px] font-medium text-graphite truncate">{up.title}</h5>
                        <span className="text-xs font-bold text-accent">{formatPKR(up.price)}</span>
                      </div>
                      <button
                        onClick={() => addToCart(up, 1)}
                        className="px-2.5 py-1 rounded-lg bg-white border border-sage-300 text-graphite text-[11px] font-semibold hover:bg-accent hover:text-white hover:border-accent transition-all shrink-0 cursor-pointer"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout Actions */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-sage-200 bg-sage-50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-sage-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-graphite font-mono">{formatPKR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sage-600">
                  <span>Estimated Shipping</span>
                  <span className="text-accent font-medium">
                    {freeShippingRemaining === 0 ? 'FREE' : 'Calculated at checkout'}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-sage-200 flex justify-between items-center text-sm font-bold text-graphite">
                <span>Total</span>
                <span className="font-mono text-base text-accent">{formatPKR(subtotal)}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  id="cart-drawer-view-cart"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onNavigate('cart');
                  }}
                  className="w-full py-2.5 rounded-xl border border-sage-300 bg-white text-graphite text-xs font-bold hover:bg-sage-100 transition-colors cursor-pointer text-center"
                >
                  View Full Cart
                </button>

                <button
                  id="cart-drawer-checkout-btn"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onNavigate('checkout');
                  }}
                  className="w-full py-2.5 rounded-xl bg-graphite hover:bg-accent text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-sage-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                <span>Cash on Delivery & Physical Multan Shop Pickup Available</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
