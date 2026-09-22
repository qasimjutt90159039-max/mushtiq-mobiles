import React, { useState, useEffect } from 'react';
import { Search, Package, CheckCircle2, Clock, Truck, ShieldCheck, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import { Order } from '../types';
import { formatPKR, siteConfig, getWhatsAppLink } from '../config/siteConfig';

interface OrderTrackingPageProps {
  initialOrderNumber?: string;
  onNavigate: (page: string, param?: string) => void;
}

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({ initialOrderNumber, onNavigate }) => {
  const [orderNumberInput, setOrderNumberInput] = useState(initialOrderNumber || '');
  const [phoneInput, setPhoneInput] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTrack = async (numToSearch?: string) => {
    const target = (numToSearch || orderNumberInput).trim();
    if (!target) {
      setErrorMsg('Please enter your order reference number.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch(`/api/orders/${target}`);
      const data = await res.json();
      if (data.success && data.order) {
        setOrder(data.order);
      } else {
        setErrorMsg('No order found with reference: ' + target);
        setOrder(null);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Could not connect to tracking server. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrderNumber) {
      handleTrack(initialOrderNumber);
    }
  }, [initialOrderNumber]);

  const steps = [
    { key: 'pending', label: 'Order Received', desc: 'Received at Katchehry Chowk system' },
    { key: 'confirmed', label: 'Confirmed', desc: 'Verified by shop sales executive' },
    { key: 'processing', label: 'Quality Check & Packing', desc: 'Seal check & IMEI logged' },
    { key: 'shipped', label: 'Out for Delivery / Shipped', desc: 'Dispatched with store rider / TCS' },
    { key: 'delivered', label: 'Delivered', desc: 'Handed over to customer' },
  ];

  const getStepStatus = (stepKey: string, currentStatus: string) => {
    const orderIndex = steps.findIndex(s => s.key === currentStatus);
    const thisIndex = steps.findIndex(s => s.key === stepKey);

    if (currentStatus === 'cancelled') return 'cancelled';
    if (thisIndex < orderIndex) return 'completed';
    if (thisIndex === orderIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-graphite tracking-tight">
          Track Your Order
        </h1>
        <p className="text-xs sm:text-sm text-sage-500 max-w-md mx-auto">
          Enter your Al-Mushtaq order number (e.g. AMM-2026-000101) to check live packaging, dispatch, and delivery status.
        </p>
      </div>

      {/* Tracking Search Input Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sage-200 shadow-xs max-w-xl mx-auto">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleTrack();
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-xs font-bold text-graphite block mb-1">
              Order Reference Number *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={orderNumberInput}
                onChange={e => setOrderNumberInput(e.target.value.toUpperCase())}
                placeholder="e.g. AMM-2026-000101"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-sage-50 border border-sage-200 text-xs font-mono font-bold text-graphite focus:border-accent"
              />
              <Search className="w-4 h-4 text-sage-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-graphite hover:bg-accent text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md disabled:bg-sage-400"
          >
            {loading ? (
              <span>Locating Dispatch Records...</span>
            ) : (
              <>
                <Truck className="w-4 h-4" />
                <span>Track Order Live</span>
              </>
            )}
          </button>
        </form>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Order Status Result */}
      {order && (
        <div className="bg-white rounded-3xl border border-sage-200 p-6 sm:p-8 space-y-8 shadow-xs">
          {/* Order Summary Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-sage-200">
            <div>
              <span className="text-[10px] text-sage-400 font-bold uppercase tracking-wider block">
                Order Tracking
              </span>
              <h3 className="font-heading font-extrabold text-xl text-graphite font-mono">
                {order.orderNumber}
              </h3>
              <p className="text-xs text-sage-500 mt-0.5">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            <div className="sm:text-right">
              <span className="text-xs text-sage-500 block">Current Status:</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase inline-block mt-0.5 bg-accent text-white">
                {order.status}
              </span>
            </div>
          </div>

          {/* Stepper Visuals */}
          <div className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {steps.map((st, idx) => {
                const status = getStepStatus(st.key, order.status);
                return (
                  <div key={st.key} className="flex md:flex-col items-center gap-3 text-left md:text-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                        status === 'completed'
                          ? 'bg-green-600 text-white shadow-sm'
                          : status === 'current'
                          ? 'bg-accent text-white ring-4 ring-orange-200'
                          : 'bg-sage-100 text-sage-400'
                      }`}
                    >
                      {status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                    </div>

                    <div className="min-w-0">
                      <div
                        className={`text-xs font-bold ${
                          status === 'current' ? 'text-accent' : status === 'completed' ? 'text-graphite' : 'text-sage-400'
                        }`}
                      >
                        {st.label}
                      </div>
                      <div className="text-[10px] text-sage-500 hidden sm:block mt-0.5">{st.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Courier & Assigned IMEI Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-sage-50 p-4 rounded-2xl border border-sage-200">
            <div>
              <span className="font-bold text-graphite block mb-1">Dispatch & Courier Details:</span>
              <div className="text-sage-700">
                Method: <strong>{order.deliveryMethod.replace(/_/g, ' ')}</strong>
              </div>
              {order.trackingNumber ? (
                <div className="mt-1">
                  Courier: <strong>{order.courierPartner || 'TCS Express'}</strong> | Tracking #{' '}
                  <span className="font-mono font-bold text-accent">{order.trackingNumber}</span>
                </div>
              ) : (
                <div className="text-sage-500 mt-1 italic">
                  Tracking details will appear as soon as the rider/courier is assigned.
                </div>
              )}
            </div>

            <div>
              <span className="font-bold text-graphite block mb-1">Recipient Info:</span>
              <div className="text-sage-700 font-semibold">{order.customer.fullName}</div>
              <div className="text-sage-600 font-mono">{order.customer.phone}</div>
              <div className="text-sage-600">{order.customer.address}, {order.customer.city}</div>
            </div>
          </div>

          {/* Items in this order */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-graphite mb-3">
              Items in this Shipment
            </h4>
            <div className="divide-y divide-sage-100 border border-sage-200 rounded-2xl overflow-hidden">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3 bg-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={item.image} alt="" className="w-10 h-10 object-contain rounded-lg bg-sage-50 p-1 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-bold text-graphite truncate">{item.title}</div>
                      <div className="text-[10px] text-sage-400">
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
          </div>

          {/* Need help footer */}
          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-sage-700">
              Have questions regarding your delivery in Multan or nationwide?
            </div>
            <a
              href={getWhatsAppLink(`Assalam-o-Alaikum! Please check status of Order #${order.orderNumber}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#25D366] text-white font-bold flex items-center gap-2 hover:bg-[#1ebd59] transition-colors shrink-0"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask Shop on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
