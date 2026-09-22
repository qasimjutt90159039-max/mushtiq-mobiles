import React, { useEffect, useState } from 'react';
import { CheckCircle2, Printer, MessageSquare, Truck, ArrowRight, ShieldCheck, MapPin, Building, Phone } from 'lucide-react';
import { Order } from '../types';
import { formatPKR, siteConfig, getWhatsAppLink } from '../config/siteConfig';

interface OrderConfirmationPageProps {
  orderNumber: string;
  onNavigate: (page: string, param?: string) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ orderNumber, onNavigate }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${orderNumber}`);
        const data = await res.json();
        if (data.success && data.order) {
          setOrder(data.order);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-sage-200 border-t-accent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-sage-500 font-medium">Generating your invoice...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto py-24 text-center space-y-4">
        <h2 className="font-heading font-extrabold text-xl text-graphite">Order Not Found</h2>
        <p className="text-xs text-sage-500">
          We could not locate order <strong>{orderNumber}</strong>. Please check your order reference.
        </p>
        <button
          onClick={() => onNavigate('home')}
          className="px-5 py-2.5 rounded-xl bg-graphite text-white text-xs font-semibold"
        >
          Return Home
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = `Assalam-o-Alaikum Al-Mushtaq Mobiles! I just placed Order #${order.orderNumber} for total ${formatPKR(order.total)}. Name: ${order.customer.fullName}, Phone: ${order.customer.phone}. Please confirm dispatch!`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Thank you Banner */}
      <div className="bg-white rounded-3xl border border-sage-200 p-8 sm:p-10 text-center space-y-4 shadow-sm no-print">
        <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-graphite tracking-tight">
          Thank You! Your Order has been Placed
        </h1>

        <p className="text-xs sm:text-sm text-sage-600 max-w-lg mx-auto">
          We have received your order. Our team at Katchehry Chowk Multan is preparing your device. An SMS confirmation will be sent to <strong className="text-graphite font-mono">{order.customer.phone}</strong>.
        </p>

        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-sage-50 border border-sage-200">
          <span className="text-xs text-sage-500">Order Reference:</span>
          <span className="font-heading font-bold text-sm text-accent font-mono">{order.orderNumber}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl border border-sage-200 bg-white hover:bg-sage-100 text-graphite font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Invoice</span>
          </button>

          <a
            href={getWhatsAppLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Confirmation</span>
          </a>

          <button
            onClick={() => onNavigate('track-order', order.orderNumber)}
            className="px-4 py-2.5 rounded-xl bg-graphite hover:bg-accent text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Track Order</span>
          </button>
        </div>
      </div>

      {/* Itemized Printable Invoice */}
      <div className="bg-white rounded-3xl border border-sage-200 p-6 sm:p-10 space-y-8 shadow-xs invoice-print-area">
        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-sage-200">
          <div>
            <div className="font-heading font-black text-xl text-graphite tracking-tight">
              AL-MUSHTAQ MOBILES
            </div>
            <div className="text-xs text-sage-500 mt-0.5">
              Multan's Most Trusted Mobile Phone & Accessories Hub
            </div>
            <div className="text-[11px] text-sage-400 mt-2 space-y-0.5">
              <div>Shop No. 6, Rehma Commercial Centre, Katchehry Chowk, Multan</div>
              <div>Phone: {siteConfig.phoneRaw} • WhatsApp: +92 300 0600956</div>
              <div>NTN / Tax Reg: 4829104-7</div>
            </div>
          </div>

          <div className="sm:text-right space-y-1">
            <div className="text-xs text-sage-400 uppercase tracking-wider font-bold">Tax Invoice</div>
            <div className="font-heading font-extrabold text-base text-graphite font-mono">{order.orderNumber}</div>
            <div className="text-xs text-sage-500">
              Date: {new Date(order.createdAt).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 uppercase mt-1">
              Status: {order.status}
            </div>
          </div>
        </div>

        {/* Customer & Shipping Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div>
            <span className="font-bold text-sage-400 uppercase tracking-wider block mb-1">
              Billed & Shipped To:
            </span>
            <div className="font-bold text-graphite text-sm">{order.customer.fullName}</div>
            <div className="text-sage-600 mt-1">{order.customer.address}</div>
            <div className="text-sage-600">{order.customer.city}, {order.customer.province} {order.customer.postalCode}</div>
            <div className="text-sage-600 font-mono mt-1">Phone: {order.customer.phone}</div>
            {order.customer.email && <div className="text-sage-600">Email: {order.customer.email}</div>}
          </div>

          <div>
            <span className="font-bold text-sage-400 uppercase tracking-wider block mb-1">
              Delivery & Payment:
            </span>
            <div className="text-sage-700">
              <strong>Delivery Method:</strong>{' '}
              {order.deliveryMethod === 'multan_express'
                ? 'Multan Express Hand Delivery (Same-Day / 2 Hours)'
                : order.deliveryMethod === 'multan_shop_pickup'
                ? 'Self-Pickup at Shop No. 6 Katchehry Chowk'
                : 'TCS / Leopards Courier (Nationwide)'}
            </div>
            <div className="text-sage-700 mt-1 capitalize">
              <strong>Payment Method:</strong> {order.paymentMethod.replace(/_/g, ' ')}
            </div>
            {order.customer.orderNotes && (
              <div className="text-sage-600 mt-2 bg-sage-50 p-2 rounded-lg italic">
                Notes: "{order.customer.orderNotes}"
              </div>
            )}
          </div>
        </div>

        {/* Products Table */}
        <div className="border border-sage-200 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-sage-50 border-b border-sage-200 text-sage-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3">Item Description</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-right">Unit Price</th>
                <th className="p-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sage-100">
              {order.items.map((item, idx) => (
                <tr key={idx} className="hover:bg-sage-50/50">
                  <td className="p-3">
                    <div className="font-bold text-graphite">{item.title}</div>
                    <div className="text-[10px] text-sage-500">
                      Brand: {item.brand} • Color: {item.colorName} • Storage: {item.storage} • {item.ptaStatus}
                    </div>
                  </td>
                  <td className="p-3 text-center font-mono">{item.quantity}</td>
                  <td className="p-3 text-right font-mono">{formatPKR(item.price)}</td>
                  <td className="p-3 text-right font-mono font-bold text-graphite">
                    {formatPKR(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-2">
          <div className="text-xs text-sage-500 max-w-sm space-y-1">
            <div className="font-bold text-graphite flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>Official Warranty & PTA Guarantee:</span>
            </div>
            <p className="text-[11px]">
              This original electronic invoice serves as your proof of purchase for manufacturer warranty claims across Pakistan and 7-day checking warranty at our Multan branch.
            </p>
          </div>

          <div className="w-full sm:w-64 space-y-2 text-xs">
            <div className="flex justify-between text-sage-600">
              <span>Subtotal:</span>
              <span className="font-mono font-bold text-graphite">{formatPKR(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-green-700 font-semibold">
                <span>Discount:</span>
                <span className="font-mono">- {formatPKR(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-sage-600">
              <span>Delivery Fee:</span>
              <span className="font-mono font-bold text-graphite">
                {order.shippingFee === 0 ? 'FREE' : formatPKR(order.shippingFee)}
              </span>
            </div>
            <div className="flex justify-between font-heading font-extrabold text-sm text-graphite border-t border-sage-200 pt-2">
              <span>Grand Total:</span>
              <span className="font-mono text-accent text-base">{formatPKR(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="border-t border-sage-200 pt-4 text-center text-[10px] text-sage-400">
          Al-Mushtaq Mobiles • Shop No. 6, Rehma Commercial Centre, Katchehry Chowk, Multan • Helpline: 00300 0600956
        </div>
      </div>

      <div className="text-center no-print pb-6">
        <button
          onClick={() => onNavigate('home')}
          className="text-xs font-bold text-accent hover:underline cursor-pointer"
        >
          ← Continue Browsing More Mobiles
        </button>
      </div>
    </div>
  );
};
