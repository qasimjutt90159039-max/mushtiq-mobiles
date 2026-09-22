import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag, Truck, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPKR, siteConfig } from '../config/siteConfig';

interface CartPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    shippingFee,
    discount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    isMultanDelivery,
    setIsMultanDelivery,
    freeShippingRemaining
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; success: boolean } | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setIsApplying(true);
    const result = await applyCoupon(couponInput.trim());
    setCouponMsg({ text: result.message, success: result.success });
    if (result.success) setCouponInput('');
    setIsApplying(false);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-sage-100 flex items-center justify-center text-sage-400 mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-graphite">Your Cart is Empty</h2>
        <p className="text-xs text-sage-500">
          Looks like you haven't added any smartphones, fast chargers, or audio gear to your cart yet.
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="mt-2 px-6 py-3 rounded-xl bg-graphite hover:bg-accent text-white font-bold text-xs transition-colors cursor-pointer"
        >
          Explore All Mobiles
        </button>
      </div>
    );
  }

  const threshold = siteConfig.freeShippingThreshold;
  const progressPercent = Math.min(100, Math.round((subtotal / threshold) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Title */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-graphite tracking-tight">
          Shopping Cart ({items.reduce((s, i) => s + i.quantity, 0)} items)
        </h1>
        <p className="text-xs text-sage-500 mt-1">
          Review your items and proceed to secure checkout with Cash on Delivery or Shop Pickup.
        </p>
      </div>

      {/* Free Shipping Progress */}
      <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200">
        <div className="flex items-center justify-between text-xs font-semibold text-graphite mb-2">
          <span className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-accent" />
            {freeShippingRemaining > 0 ? (
              <span>Add <strong className="text-accent">{formatPKR(freeShippingRemaining)}</strong> more for Free Delivery</span>
            ) : (
              <span className="text-green-700 font-bold">🎉 Free Nationwide Delivery Unlocked!</span>
            )}
          </span>
          <span className="text-sage-500">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-orange-200/50 overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Items Table (Cols 1-8) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl border border-sage-200 overflow-hidden shadow-xs">
            <div className="p-4 sm:p-6 divide-y divide-sage-100">
              {items.map(item => (
                <div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 first:pt-0 last:pb-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-contain rounded-2xl bg-sage-50 p-2 border border-sage-200 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-accent tracking-wider">
                      {item.brand} • {item.ptaStatus}
                    </span>
                    <h3
                      onClick={() => onNavigate('product-detail', item.slug)}
                      className="font-heading font-bold text-sm text-graphite hover:text-accent transition-colors cursor-pointer truncate"
                    >
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-sage-500 mt-1">
                      <span>Color: <strong>{item.colorName}</strong></span>
                      <span>•</span>
                      <span>Storage: <strong>{item.storage}</strong></span>
                    </div>
                    <div className="text-xs font-bold text-graphite font-mono mt-1 sm:hidden">
                      {formatPKR(item.price)} each
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-sage-200 rounded-xl overflow-hidden bg-white shrink-0">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-sage-100 text-sage-700 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-graphite font-mono">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-sage-100 text-sage-700 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Total & Remove */}
                  <div className="text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-2 sm:mt-0">
                    <span className="text-sm font-black font-mono text-graphite">
                      {formatPKR(item.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sage-400 hover:text-red-500 p-1.5 transition-colors cursor-pointer text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="sm:hidden">Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-sage-50/70 border-t border-sage-200 flex items-center justify-between">
              <button
                onClick={() => onNavigate('shop')}
                className="text-xs font-bold text-graphite hover:text-accent cursor-pointer"
              >
                ← Continue Shopping
              </button>
              <button
                onClick={clearCart}
                className="text-xs font-semibold text-red-500 hover:underline cursor-pointer"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary & Coupon (Cols 9-12) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Coupon Code Box */}
          <div className="bg-white p-5 rounded-3xl border border-sage-200 space-y-3 shadow-xs">
            <label className="font-heading font-bold text-xs uppercase tracking-wider text-graphite flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-accent" />
              <span>Discount Coupon</span>
            </label>

            {appliedCoupon ? (
              <div className="p-3 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-xs text-green-800">{appliedCoupon.code}</span>
                  <span className="text-[11px] text-green-700 block">Applied: {appliedCoupon.discountValue}% off</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-red-600 font-bold hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={e => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="e.g. WELCOME10"
                  className="flex-1 px-3 py-2 rounded-xl bg-sage-50 border border-sage-200 text-xs font-mono uppercase focus:border-accent"
                />
                <button
                  type="submit"
                  disabled={isApplying}
                  className="px-4 py-2 rounded-xl bg-graphite hover:bg-accent text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>
            )}

            {couponMsg && (
              <p className={`text-[11px] font-semibold ${couponMsg.success ? 'text-green-700' : 'text-red-500'}`}>
                {couponMsg.text}
              </p>
            )}
            <p className="text-[10px] text-sage-400">
              Try coupon <strong className="text-graphite font-mono">WELCOME10</strong> for 10% off on orders above Rs. 2,000.
            </p>
          </div>

          {/* Destination Selector for Accurate Shipping */}
          <div className="bg-white p-5 rounded-3xl border border-sage-200 space-y-3 shadow-xs">
            <label className="font-heading font-bold text-xs uppercase tracking-wider text-graphite block">
              Delivery Destination:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setIsMultanDelivery(true)}
                className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                  isMultanDelivery
                    ? 'border-accent bg-orange-50/50 text-accent font-bold ring-1 ring-accent'
                    : 'border-sage-200 text-sage-700 hover:border-sage-300'
                }`}
              >
                <div className="font-bold">Multan Local</div>
                <div className="text-[10px] text-sage-500">Same-Day / Rs. 150</div>
              </button>

              <button
                type="button"
                onClick={() => setIsMultanDelivery(false)}
                className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                  !isMultanDelivery
                    ? 'border-accent bg-orange-50/50 text-accent font-bold ring-1 ring-accent'
                    : 'border-sage-200 text-sage-700 hover:border-sage-300'
                }`}
              >
                <div className="font-bold">Other Cities</div>
                <div className="text-[10px] text-sage-500">TCS Express / Rs. 350</div>
              </button>
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-white p-6 rounded-3xl border border-sage-200 space-y-4 shadow-xs">
            <h3 className="font-heading font-bold text-base text-graphite border-b border-sage-100 pb-3">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-sage-600">
                <span>Subtotal</span>
                <span className="font-mono font-bold text-graphite">{formatPKR(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-700 font-semibold">
                  <span>Coupon Discount</span>
                  <span className="font-mono">- {formatPKR(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-sage-600">
                <span>Estimated Shipping</span>
                <span className="font-mono font-bold text-graphite">
                  {shippingFee === 0 ? 'FREE' : formatPKR(shippingFee)}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-sage-200 flex justify-between items-baseline">
              <span className="font-heading font-extrabold text-base text-graphite">Total Amount</span>
              <span className="font-mono font-black text-xl text-accent">{formatPKR(total)}</span>
            </div>

            <button
              id="cart-page-checkout-btn"
              onClick={() => onNavigate('checkout')}
              className="w-full py-3.5 rounded-2xl bg-graphite hover:bg-accent text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="space-y-2 pt-2 text-[11px] text-sage-500 border-t border-sage-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                <span>100% Original PTA-approved phones with invoice</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-accent shrink-0" />
                <span>7-Day checking warranty at Katchehry Chowk shop</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
