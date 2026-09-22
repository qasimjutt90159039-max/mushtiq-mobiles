import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Coupon } from '../types';
import { siteConfig } from '../config/siteConfig';

export type CartItemInput = Omit<CartItem, 'id' | 'quantity'> & { quantity?: number };

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItemInput, qty?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  isMultanDelivery: boolean;
  setIsMultanDelivery: (val: boolean) => void;
  freeShippingRemaining: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('amm_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem('amm_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMultanDelivery, setIsMultanDelivery] = useState(true);

  useEffect(() => {
    try {
      localStorage.setItem('amm_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem('amm_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('amm_coupon');
      }
    } catch (e) {
      console.error(e);
    }
  }, [appliedCoupon]);

  const addToCart = (newItem: CartItemInput, qty = 1) => {
    const rowId = `${newItem.productId}-${newItem.variantId}`;
    setItems(prev => {
      const existing = prev.find(item => item.id === rowId);
      if (existing) {
        const nextQty = Math.min(existing.quantity + qty, existing.maxStock || 99);
        return prev.map(item => (item.id === rowId ? { ...item, quantity: nextQty } : item));
      }
      return [...prev, { ...newItem, id: rowId, quantity: newItem.quantity || qty }];
    });
    setIsDrawerOpen(true);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const max = item.maxStock || 99;
          return { ...item, quantity: Math.min(quantity, max) };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Free shipping check
  const threshold = siteConfig.freeShippingThreshold;
  const isFreeShipping = subtotal >= threshold;
  const freeShippingRemaining = Math.max(0, threshold - subtotal);

  const shippingFee = subtotal === 0 ? 0 : isFreeShipping ? 0 : isMultanDelivery ? siteConfig.shippingMultan : siteConfig.shippingNationwide;

  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderAmount) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
        discount = appliedCoupon.maxDiscount;
      }
    } else {
      discount = appliedCoupon.discountValue;
    }
  }

  const total = Math.max(0, subtotal - discount + shippingFee);

  const applyCoupon = async (code: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal }),
      });
      const data = await res.json();
      if (data.success && data.coupon) {
        setAppliedCoupon(data.coupon);
        return { success: true, message: `Coupon ${data.coupon.code} applied! Saved Rs. ${data.discount.toLocaleString('en-PK')}` };
      }
      return { success: false, message: data.message || 'Invalid coupon' };
    } catch {
      // Local fallback
      if (code.toUpperCase() === 'WELCOME10' && subtotal >= 2000) {
        const c: Coupon = { id: 'c-1', code: 'WELCOME10', discountType: 'percentage', discountValue: 10, minOrderAmount: 2000, isActive: true };
        setAppliedCoupon(c);
        return { success: true, message: 'Coupon WELCOME10 applied! (10% off)' };
      }
      return { success: false, message: 'Failed to apply coupon' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        itemCount,
        subtotal,
        shippingFee,
        discount,
        total,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isDrawerOpen,
        setIsDrawerOpen,
        isMultanDelivery,
        setIsMultanDelivery,
        freeShippingRemaining,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
