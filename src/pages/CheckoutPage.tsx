import React, { useState } from 'react';
import { ShieldCheck, Truck, MapPin, Building, CreditCard, CheckCircle2, ArrowRight, Upload, Phone, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPKR, siteConfig } from '../config/siteConfig';
import { Order } from '../types';

interface CheckoutPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { items, subtotal, shippingFee, discount, total, appliedCoupon, clearCart, isMultanDelivery, setIsMultanDelivery } = useCart();

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Multan');
  const [province, setProvince] = useState('Punjab');
  const [postalCode, setPostalCode] = useState('60000');
  const [orderNotes, setOrderNotes] = useState('');

  // Delivery & Payment methods
  const [deliveryMethod, setDeliveryMethod] = useState<'multan_express' | 'multan_shop_pickup' | 'tcs_nationwide'>('multan_express');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer' | 'jazzcash' | 'easypaisa' | 'pay_at_shop'>('cod');
  const [paymentProofUrl, setPaymentProofUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center space-y-4">
        <h2 className="font-heading font-extrabold text-2xl text-graphite">Your Cart is Empty</h2>
        <p className="text-xs text-sage-500">Please add items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-3 rounded-xl bg-graphite text-white font-bold text-xs"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  // Adjust delivery method based on city
  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    if (newCity.toLowerCase().includes('multan')) {
      setIsMultanDelivery(true);
      if (deliveryMethod === 'tcs_nationwide') setDeliveryMethod('multan_express');
    } else {
      setIsMultanDelivery(false);
      setDeliveryMethod('tcs_nationwide');
      if (paymentMethod === 'pay_at_shop') setPaymentMethod('cod');
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      setErrorMessage('Please complete all required shipping fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload: Partial<Order> = {
        items: [...items],
        customer: {
          fullName,
          phone,
          email,
          address,
          city,
          province,
          postalCode,
          orderNotes
        },
        deliveryMethod,
        paymentMethod,
        subtotal,
        discount,
        shippingFee,
        total,
        paymentProofUrl: paymentProofUrl || undefined,
        couponCode: appliedCoupon?.code
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const data = await res.json();
      if (data.success && data.order) {
        clearCart();
        onNavigate('order-confirmation', data.order.orderNumber);
      } else {
        setErrorMessage(data.message || 'Failed to place order. Please try again or call our shop.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Server connection error. Please call our shop directly at 00300 0600956.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock receipt upload
  const handleSimulateProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPaymentProofUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-graphite tracking-tight">
          Secure Checkout
        </h1>
        <p className="text-xs text-sage-500 mt-1">
          Complete your delivery details. Cash on delivery & physical shop pickup available.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Customer Details, Delivery, Payment (Cols 1-8) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section 1: Customer Details */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sage-200 space-y-5 shadow-xs">
            <div className="flex items-center gap-2.5 pb-3 border-b border-sage-100 font-heading font-bold text-base text-graphite">
              <span className="w-6 h-6 rounded-full bg-graphite text-white text-xs flex items-center justify-center font-mono">1</span>
              <span>Customer & Shipping Details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-graphite block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="e.g. Muhammad Kashif"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs text-graphite focus:border-accent"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-graphite block mb-1">
                  Phone Number (For Delivery Confirmation) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="e.g. 0300-1234567"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs text-graphite focus:border-accent font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-graphite block mb-1">
                  Email Address (For Invoice Copy)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. kashif@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs text-graphite focus:border-accent"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-graphite block mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={e => handleCityChange(e.target.value)}
                  placeholder="e.g. Multan, Lahore, Islamabad"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs text-graphite focus:border-accent"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-graphite block mb-1">
                  Street Address & House / Shop Number *
                </label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="e.g. House No. 12, Street 4, Gulgasht Colony, Multan"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs text-graphite focus:border-accent"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-graphite block mb-1">Province</label>
                <select
                  value={province}
                  onChange={e => setProvince(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs text-graphite focus:border-accent"
                >
                  <option value="Punjab">Punjab</option>
                  <option value="Sindh">Sindh</option>
                  <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                  <option value="Balochistan">Balochistan</option>
                  <option value="Islamabad Capital">Islamabad Capital Territory</option>
                  <option value="Azad Kashmir">Azad Kashmir</option>
                  <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-graphite block mb-1">Postal Code</label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={e => setPostalCode(e.target.value)}
                  placeholder="60000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs text-graphite focus:border-accent font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-graphite block mb-1">Order Notes (Optional)</label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={e => setOrderNotes(e.target.value)}
                  placeholder="e.g. Deliver after 3 PM, or call before arrival"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs text-graphite focus:border-accent"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Option */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sage-200 space-y-4 shadow-xs">
            <div className="flex items-center gap-2.5 pb-3 border-b border-sage-100 font-heading font-bold text-base text-graphite">
              <span className="w-6 h-6 rounded-full bg-graphite text-white text-xs flex items-center justify-center font-mono">2</span>
              <span>Select Delivery Method</span>
            </div>

            <div className="space-y-3">
              {/* Option A: Multan Express Hand Delivery */}
              <label
                className={`p-4 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                  deliveryMethod === 'multan_express'
                    ? 'border-accent bg-orange-50/50 ring-1 ring-accent'
                    : 'border-sage-200 hover:border-sage-300'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryMethod"
                  checked={deliveryMethod === 'multan_express'}
                  onChange={() => {
                    setDeliveryMethod('multan_express');
                    setIsMultanDelivery(true);
                  }}
                  className="accent-accent mt-1"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between font-bold text-graphite">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-accent" />
                      <span>Multan Express Hand Delivery (Same-Day / 2 Hours)</span>
                    </span>
                    <span className="font-mono text-accent">
                      {subtotal >= siteConfig.freeShippingThreshold ? 'FREE' : formatPKR(siteConfig.shippingMultan)}
                    </span>
                  </div>
                  <p className="text-sage-500 mt-1">
                    Delivered directly to your doorstep in Multan by our store rider with verified open-box checking.
                  </p>
                </div>
              </label>

              {/* Option B: Pick up from Katchehry Chowk Shop */}
              <label
                className={`p-4 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                  deliveryMethod === 'multan_shop_pickup'
                    ? 'border-accent bg-orange-50/50 ring-1 ring-accent'
                    : 'border-sage-200 hover:border-sage-300'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryMethod"
                  checked={deliveryMethod === 'multan_shop_pickup'}
                  onChange={() => {
                    setDeliveryMethod('multan_shop_pickup');
                    setIsMultanDelivery(true);
                  }}
                  className="accent-accent mt-1"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between font-bold text-graphite">
                    <span className="flex items-center gap-1.5">
                      <Building className="w-4 h-4 text-accent" />
                      <span>Self-Pickup at Al-Mushtaq Mobiles Showroom</span>
                    </span>
                    <span className="font-mono text-green-700 font-bold">FREE</span>
                  </div>
                  <p className="text-sage-500 mt-1">
                    Shop No. 6, Rehma Commercial Centre, Katchehry Chowk, Multan. Ready for pickup within 30 minutes!
                  </p>
                </div>
              </label>

              {/* Option C: TCS / Leopards Express Nationwide Courier */}
              <label
                className={`p-4 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                  deliveryMethod === 'tcs_nationwide'
                    ? 'border-accent bg-orange-50/50 ring-1 ring-accent'
                    : 'border-sage-200 hover:border-sage-300'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryMethod"
                  checked={deliveryMethod === 'tcs_nationwide'}
                  onChange={() => {
                    setDeliveryMethod('tcs_nationwide');
                    setIsMultanDelivery(false);
                  }}
                  className="accent-accent mt-1"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between font-bold text-graphite">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-accent" />
                      <span>TCS / Leopards Courier (Nationwide 24-48 Hours)</span>
                    </span>
                    <span className="font-mono text-graphite font-bold">
                      {subtotal >= siteConfig.freeShippingThreshold ? 'FREE' : formatPKR(siteConfig.shippingNationwide)}
                    </span>
                  </div>
                  <p className="text-sage-500 mt-1">
                    Insured shipment with online tracking number SMS to your phone.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sage-200 space-y-4 shadow-xs">
            <div className="flex items-center gap-2.5 pb-3 border-b border-sage-100 font-heading font-bold text-base text-graphite">
              <span className="w-6 h-6 rounded-full bg-graphite text-white text-xs flex items-center justify-center font-mono">3</span>
              <span>Select Payment Method</span>
            </div>

            <div className="space-y-3">
              {/* Option 1: Cash on Delivery (COD) */}
              <label
                className={`p-4 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-accent bg-orange-50/50 ring-1 ring-accent'
                    : 'border-sage-200 hover:border-sage-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="accent-accent mt-1"
                />
                <div className="flex-1 text-xs">
                  <div className="font-bold text-graphite">Cash on Delivery (COD)</div>
                  <p className="text-sage-500 mt-1">
                    Pay in cash to the rider upon delivery of your phone or accessories.
                  </p>
                </div>
              </label>

              {/* Option 2: Bank Transfer (Meezan Bank) */}
              <label
                className={`p-4 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-accent bg-orange-50/50 ring-1 ring-accent'
                    : 'border-sage-200 hover:border-sage-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={() => setPaymentMethod('bank_transfer')}
                  className="accent-accent mt-1"
                />
                <div className="flex-1 text-xs space-y-2">
                  <div className="font-bold text-graphite">Direct Bank Transfer (Meezan Bank)</div>
                  <p className="text-sage-500">
                    Transfer directly to our registered Al-Mushtaq Mobiles account:
                  </p>
                  {paymentMethod === 'bank_transfer' && (
                    <div className="p-3.5 rounded-xl bg-sage-50 border border-sage-200 font-mono text-xs space-y-1 text-graphite">
                      <div><strong>Bank:</strong> {siteConfig.bankDetails.bankName}</div>
                      <div><strong>Account Title:</strong> {siteConfig.bankDetails.accountTitle}</div>
                      <div><strong>Account No:</strong> {siteConfig.bankDetails.accountNumber}</div>
                      <div><strong>IBAN:</strong> {siteConfig.bankDetails.iban}</div>
                      <div><strong>Branch:</strong> {siteConfig.bankDetails.branch}</div>
                    </div>
                  )}
                </div>
              </label>

              {/* Option 3: JazzCash / Easypaisa */}
              <label
                className={`p-4 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                  paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa'
                    ? 'border-accent bg-orange-50/50 ring-1 ring-accent'
                    : 'border-sage-200 hover:border-sage-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa'}
                  onChange={() => setPaymentMethod('jazzcash')}
                  className="accent-accent mt-1"
                />
                <div className="flex-1 text-xs space-y-2">
                  <div className="font-bold text-graphite">JazzCash / Easypaisa</div>
                  <p className="text-sage-500">
                    Send funds instantly to our merchant mobile wallet:
                  </p>
                  {(paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && (
                    <div className="p-3.5 rounded-xl bg-sage-50 border border-sage-200 space-y-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('jazzcash')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                            paymentMethod === 'jazzcash' ? 'bg-[#ff0000] text-white' : 'bg-white border text-graphite'
                          }`}
                        >
                          JazzCash: 0300-0600956
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('easypaisa')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                            paymentMethod === 'easypaisa' ? 'bg-[#00c853] text-white' : 'bg-white border text-graphite'
                          }`}
                        >
                          Easypaisa: 0300-0600956
                        </button>
                      </div>
                      <p className="text-[11px] text-sage-600">
                        Account Title: <strong>Al-Mushtaq Mobiles (Muhammad Mushtaq)</strong>
                      </p>

                      {/* Proof slip upload */}
                      <div className="pt-2">
                        <label className="text-[11px] font-bold text-graphite block mb-1">
                          Upload Screenshot or Slip of Transaction (Optional)
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleSimulateProofUpload}
                          className="text-xs text-sage-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-graphite file:text-white cursor-pointer"
                        />
                        {paymentProofUrl && (
                          <div className="mt-2 text-green-700 text-[11px] font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Payment proof attached!</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </label>

              {/* Option 4: Pay at Shop */}
              {deliveryMethod === 'multan_shop_pickup' && (
                <label
                  className={`p-4 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                    paymentMethod === 'pay_at_shop'
                      ? 'border-accent bg-orange-50/50 ring-1 ring-accent'
                      : 'border-sage-200 hover:border-sage-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'pay_at_shop'}
                    onChange={() => setPaymentMethod('pay_at_shop')}
                    className="accent-accent mt-1"
                  />
                  <div className="flex-1 text-xs">
                    <div className="font-bold text-graphite">Pay at Multan Shop Counter</div>
                    <p className="text-sage-500 mt-1">
                      Pay via Cash, Debit/Credit Card, or mobile wallet at our Katchehry Chowk counter during pickup.
                    </p>
                  </div>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Order Summary & Place Order CTA (Cols 9-12) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white p-6 rounded-3xl border border-sage-200 space-y-4 shadow-xs sticky top-24">
            <h3 className="font-heading font-bold text-base text-graphite border-b border-sage-100 pb-3">
              Order Review ({items.length} items)
            </h3>

            {/* Compact items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-sage-100 text-xs">
              {items.map(item => (
                <div key={item.id} className="pt-2.5 first:pt-0 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={item.image} alt="" className="w-10 h-10 object-contain rounded-lg bg-sage-50 p-1 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-bold text-graphite truncate">{item.title}</div>
                      <div className="text-[10px] text-sage-500">
                        Qty: {item.quantity} • {item.colorName} • {item.storage}
                      </div>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-graphite shrink-0">
                    {formatPKR(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-sage-200 space-y-2 text-xs">
              <div className="flex justify-between text-sage-600">
                <span>Subtotal</span>
                <span className="font-mono font-bold text-graphite">{formatPKR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-700 font-semibold">
                  <span>Coupon ({appliedCoupon?.code})</span>
                  <span className="font-mono">- {formatPKR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sage-600">
                <span>Shipping Fee</span>
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
              id="checkout-submit-order-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-accent hover:bg-orange-600 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer disabled:bg-sage-400"
            >
              <span>{isSubmitting ? 'Placing Order...' : 'Confirm & Place Order'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-3 border-t border-sage-100 text-[11px] text-sage-500 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                <span>PTA customs tax paid guarantee with receipt</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>Shop Phone: {siteConfig.phoneRaw}</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
