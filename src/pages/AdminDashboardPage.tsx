import React, { useState, useEffect } from 'react';
import { LayoutDashboard, ShoppingCart, Package, Wrench, RefreshCw, FileText, Settings, Plus, Edit2, Trash2, CheckCircle2, Clock, Phone, MapPin, DollarSign, Search, Eye, AlertCircle } from 'lucide-react';
import { formatPKR, siteConfig } from '../config/siteConfig';
import { Order, Product, RepairBooking, TradeInRequest, InstallmentRequest } from '../types';

interface AdminDashboardPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'repairs' | 'tradeins' | 'installments' | 'settings'>('overview');

  // Data states
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [repairs, setRepairs] = useState<RepairBooking[]>([]);
  const [tradeIns, setTradeIns] = useState<TradeInRequest[]>([]);
  const [installments, setInstallments] = useState<InstallmentRequest[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Modals & form states
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [orderDetailModal, setOrderDetailModal] = useState<Order | null>(null);
  const [settingsSaveMsg, setSettingsSaveMsg] = useState('');

  // Fetch all admin data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordRes, prodRes, repRes, tradeRes, instRes, setRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/products?limit=100'),
        fetch('/api/repairs'),
        fetch('/api/trade-ins'),
        fetch('/api/installments'),
        fetch('/api/settings')
      ]);

      const ordData = await ordRes.json();
      if (ordData.success) setOrders(ordData.orders);

      const prodData = await prodRes.json();
      if (prodData.success) setProducts(prodData.products);

      const repData = await repRes.json();
      if (repData.success) setRepairs(repData.repairs);

      const tradeData = await tradeRes.json();
      if (tradeData.success) setTradeIns(tradeData.tradeIns);

      const instData = await instRes.json();
      if (instData.success) setInstallments(instData.installments);

      const setData = await setRes.json();
      if (setData.success) setSettings(setData.settings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update order status
  const handleUpdateOrderStatus = async (orderId: string, status: string, trackingNumber?: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, trackingNumber })
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrders(prev => prev.map(o => o.id === orderId ? data.order : o));
        if (orderDetailModal && orderDetailModal.id === orderId) {
          setOrderDetailModal(data.order);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this mobile device from the store catalog?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save product (create or edit)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.title || !editingProduct?.basePrice) return;

    try {
      if (editingProduct.id) {
        // Update
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingProduct)
        });
        const data = await res.json();
        if (data.success && data.product) {
          setProducts(prev => prev.map(p => p.id === editingProduct.id ? data.product : p));
          setEditingProduct(null);
          setIsNewProductModalOpen(false);
        }
      } else {
        // Create new
        const newProd = {
          ...editingProduct,
          slug: editingProduct.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          rating: 5.0,
          reviewsCount: 1,
          inStock: true,
          variants: [
            {
              id: `v-${Date.now()}`,
              colorName: 'Standard',
              colorHex: '#1C1F1D',
              storage: '128GB',
              price: Number(editingProduct.basePrice),
              stock: Number(editingProduct.variants?.[0]?.stock || 5),
              images: [editingProduct.thumbnail || 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=400&auto=format&fit=crop']
            }
          ]
        };

        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProd)
        });
        const data = await res.json();
        if (data.success && data.product) {
          setProducts(prev => [data.product, ...prev]);
          setEditingProduct(null);
          setIsNewProductModalOpen(false);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (data.success) {
        setSettingsSaveMsg('Store settings saved successfully!');
        setTimeout(() => setSettingsSaveMsg(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'pending');
  const pendingRepairs = repairs.filter(r => r.status === 'pending');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-sage-200">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-accent">
            Store Management Portal
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-graphite">
            Al-Mushtaq Mobiles Admin
          </h1>
          <p className="text-xs text-sage-500">
            Katchehry Chowk Multan • Real-Time Order & Inventory Sync
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-2 rounded-xl border border-sage-200 bg-white text-xs font-bold text-graphite hover:bg-sage-50 cursor-pointer"
          >
            Visit Live Store
          </button>
          <button
            onClick={fetchData}
            className="px-4 py-2 rounded-xl bg-graphite text-white text-xs font-bold hover:bg-accent transition-colors cursor-pointer"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex border-b border-sage-200 overflow-x-auto space-x-6 text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 flex items-center gap-2 cursor-pointer shrink-0 ${
            activeTab === 'overview' ? 'border-b-2 border-accent text-graphite' : 'text-sage-400 hover:text-graphite'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 flex items-center gap-2 cursor-pointer shrink-0 ${
            activeTab === 'orders' ? 'border-b-2 border-accent text-graphite' : 'text-sage-400 hover:text-graphite'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 flex items-center gap-2 cursor-pointer shrink-0 ${
            activeTab === 'products' ? 'border-b-2 border-accent text-graphite' : 'text-sage-400 hover:text-graphite'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Catalog ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('repairs')}
          className={`pb-3 flex items-center gap-2 cursor-pointer shrink-0 ${
            activeTab === 'repairs' ? 'border-b-2 border-accent text-graphite' : 'text-sage-400 hover:text-graphite'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Repairs ({repairs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('tradeins')}
          className={`pb-3 flex items-center gap-2 cursor-pointer shrink-0 ${
            activeTab === 'tradeins' ? 'border-b-2 border-accent text-graphite' : 'text-sage-400 hover:text-graphite'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Trade-Ins ({tradeIns.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('installments')}
          className={`pb-3 flex items-center gap-2 cursor-pointer shrink-0 ${
            activeTab === 'installments' ? 'border-b-2 border-accent text-graphite' : 'text-sage-400 hover:text-graphite'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Installments ({installments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 flex items-center gap-2 cursor-pointer shrink-0 ${
            activeTab === 'settings' ? 'border-b-2 border-accent text-graphite' : 'text-sage-400 hover:text-graphite'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Shop Settings</span>
        </button>
      </div>

      {/* ================= TAB 1: OVERVIEW ================= */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-sage-200 shadow-xs space-y-1">
              <span className="text-xs text-sage-400 font-bold uppercase">Total Order Value</span>
              <div className="font-heading font-black text-2xl text-graphite font-mono">
                {formatPKR(totalRevenue)}
              </div>
              <span className="text-[11px] text-green-700 font-semibold">{orders.length} orders recorded</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-sage-200 shadow-xs space-y-1">
              <span className="text-xs text-sage-400 font-bold uppercase">Pending Dispatches</span>
              <div className="font-heading font-black text-2xl text-accent font-mono">
                {pendingOrders.length}
              </div>
              <span className="text-[11px] text-sage-500">Requires rider/courier booking</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-sage-200 shadow-xs space-y-1">
              <span className="text-xs text-sage-400 font-bold uppercase">Active Products</span>
              <div className="font-heading font-black text-2xl text-graphite font-mono">
                {products.length}
              </div>
              <span className="text-[11px] text-sage-500">All brands in Multan stock</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-sage-200 shadow-xs space-y-1">
              <span className="text-xs text-sage-400 font-bold uppercase">Pending Repair Tickets</span>
              <div className="font-heading font-black text-2xl text-graphite font-mono">
                {pendingRepairs.length}
              </div>
              <span className="text-[11px] text-sage-500">Technician lab queue</span>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="bg-white p-6 rounded-3xl border border-sage-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-graphite">Recent Customer Orders</h3>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs font-bold text-accent hover:underline cursor-pointer"
              >
                View All Orders →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-sage-50 text-sage-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Order #</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Method</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage-100">
                  {orders.slice(0, 5).map(o => (
                    <tr key={o.id} className="hover:bg-sage-50/50">
                      <td className="p-3 font-mono font-bold text-graphite">{o.orderNumber}</td>
                      <td className="p-3">
                        <div className="font-bold text-graphite">{o.customer.fullName}</div>
                        <div className="text-[10px] text-sage-400 font-mono">{o.customer.phone}</div>
                      </td>
                      <td className="p-3 capitalize">{o.paymentMethod.replace(/_/g, ' ')}</td>
                      <td className="p-3 font-mono font-bold text-graphite">{formatPKR(o.total)}</td>
                      <td className="p-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                          {o.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setOrderDetailModal(o)}
                          className="px-3 py-1 rounded-lg border border-sage-200 hover:border-accent text-xs font-bold text-graphite"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: ORDERS MANAGEMENT ================= */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-sage-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-sage-200 flex justify-between items-center">
            <h3 className="font-heading font-extrabold text-lg text-graphite">
              All Orders ({orders.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sage-50 text-sage-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Reference</th>
                  <th className="p-4">Customer & City</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Delivery Option</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-100">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-sage-50/50">
                    <td className="p-4 font-mono font-bold text-graphite">
                      {o.orderNumber}
                      <span className="text-[10px] text-sage-400 block font-normal">
                        {new Date(o.createdAt).toLocaleDateString('en-PK')}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-graphite">{o.customer.fullName}</div>
                      <div className="font-mono text-sage-500 text-[11px]">{o.customer.phone}</div>
                      <div className="text-[11px] text-sage-400">{o.customer.city}</div>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-graphite">{o.items.length} items</span>
                      <span className="text-[10px] text-sage-500 block truncate max-w-xs">
                        {o.items.map(i => i.title).join(', ')}
                      </span>
                    </td>
                    <td className="p-4 capitalize text-[11px] text-sage-600">
                      {o.deliveryMethod.replace(/_/g, ' ')}
                    </td>
                    <td className="p-4 capitalize font-semibold text-graphite">
                      {o.paymentMethod.replace(/_/g, ' ')}
                      {o.paymentProofUrl && (
                        <span className="block text-[10px] text-green-700 font-bold">Proof Attached</span>
                      )}
                    </td>
                    <td className="p-4 font-mono font-bold text-graphite">{formatPKR(o.total)}</td>
                    <td className="p-4">
                      <select
                        value={o.status}
                        onChange={e => handleUpdateOrderStatus(o.id, e.target.value)}
                        className="p-1 rounded-lg border border-sage-200 text-xs font-semibold bg-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setOrderDetailModal(o)}
                        className="px-3 py-1.5 rounded-xl bg-sage-100 hover:bg-graphite hover:text-white font-bold text-xs transition-colors"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 3: PRODUCTS MANAGEMENT ================= */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-heading font-extrabold text-lg text-graphite">
              Smartphone & Accessories Inventory
            </h3>
            <button
              onClick={() => {
                setEditingProduct({
                  title: '',
                  brand: 'Apple',
                  category: 'smartphones',
                  basePrice: 50000,
                  originalPrice: 55000,
                  ptaStatus: 'PTA Approved',
                  condition: 'New',
                  warrantyText: '1-Year Official Brand Warranty',
                  inStock: true,
                  thumbnail: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=400&auto=format&fit=crop'
                });
                setIsNewProductModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-graphite hover:bg-accent text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Smartphone</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-sage-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-sage-50 text-sage-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Device</th>
                    <th className="p-4">Brand</th>
                    <th className="p-4">PTA & Condition</th>
                    <th className="p-4">Price (PKR)</th>
                    <th className="p-4">Stock Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage-100">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-sage-50/50">
                      <td className="p-4 flex items-center gap-3">
                        <img src={p.thumbnail} alt="" className="w-10 h-10 object-contain rounded-lg bg-sage-50 p-1 shrink-0" />
                        <div>
                          <div className="font-bold text-graphite">{p.title}</div>
                          <div className="text-[10px] text-sage-400 capitalize">{p.category}</div>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-graphite">{p.brand}</td>
                      <td className="p-4">
                        <span className="font-semibold text-graphite block">{p.ptaStatus}</span>
                        <span className="text-[10px] text-sage-400">{p.condition}</span>
                      </td>
                      <td className="p-4 font-mono font-bold text-graphite">
                        {formatPKR(p.basePrice)}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {p.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setIsNewProductModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg border border-sage-200 text-sage-600 hover:text-accent cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 rounded-lg border border-sage-200 text-sage-400 hover:text-red-500 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: REPAIRS MANAGEMENT ================= */}
      {activeTab === 'repairs' && (
        <div className="bg-white rounded-3xl border border-sage-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-sage-200">
            <h3 className="font-heading font-extrabold text-lg text-graphite">
              Repair Lab Queue ({repairs.length} tickets)
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sage-50 text-sage-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Ticket</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Device</th>
                  <th className="p-4">Issue Description</th>
                  <th className="p-4">Est. Cost</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-100">
                {repairs.map(r => (
                  <tr key={r.id} className="hover:bg-sage-50/50">
                    <td className="p-4 font-mono font-bold text-accent">{r.ticketCode}</td>
                    <td className="p-4">
                      <div className="font-bold text-graphite">{r.fullName}</div>
                      <div className="font-mono text-sage-500 text-[11px]">{r.phone}</div>
                    </td>
                    <td className="p-4 font-semibold text-graphite">{r.deviceBrand} {r.deviceModel}</td>
                    <td className="p-4 text-sage-600">
                      <div>{r.issueType}</div>
                      {r.additionalNotes && <div className="text-[10px] text-sage-400 italic">"{r.additionalNotes}"</div>}
                    </td>
                    <td className="p-4 font-mono font-bold text-graphite">{formatPKR(r.estimatedCost)}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 5: TRADE-INS MANAGEMENT ================= */}
      {activeTab === 'tradeins' && (
        <div className="bg-white rounded-3xl border border-sage-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-sage-200">
            <h3 className="font-heading font-extrabold text-lg text-graphite">
              Trade-In & Sell Valuation Requests ({tradeIns.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sage-50 text-sage-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Code</th>
                  <th className="p-4">Seller Contact</th>
                  <th className="p-4">Offered Device</th>
                  <th className="p-4">Condition & PTA</th>
                  <th className="p-4">Estimated Quote</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-100">
                {tradeIns.map(t => (
                  <tr key={t.id} className="hover:bg-sage-50/50">
                    <td className="p-4 font-mono font-bold text-accent">{t.ticketCode}</td>
                    <td className="p-4">
                      <div className="font-bold text-graphite">{t.fullName}</div>
                      <div className="font-mono text-sage-500">{t.phone} ({t.city})</div>
                    </td>
                    <td className="p-4 font-semibold text-graphite">{t.brand} {t.model} ({t.storage})</td>
                    <td className="p-4 text-sage-600">
                      <div>{t.condition}</div>
                      <div className="text-[10px] text-sage-400">{t.ptaStatus}</div>
                    </td>
                    <td className="p-4 font-mono font-bold text-graphite">{formatPKR(t.estimatedValue)}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-100 text-blue-800">
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 6: INSTALLMENTS MANAGEMENT ================= */}
      {activeTab === 'installments' && (
        <div className="bg-white rounded-3xl border border-sage-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-sage-200">
            <h3 className="font-heading font-extrabold text-lg text-graphite">
              Installment Financing Applications ({installments.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sage-50 text-sage-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">App ID</th>
                  <th className="p-4">Applicant</th>
                  <th className="p-4">Phone Model</th>
                  <th className="p-4">Plan Details</th>
                  <th className="p-4">Employment / Income</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-100">
                {installments.map(i => (
                  <tr key={i.id} className="hover:bg-sage-50/50">
                    <td className="p-4 font-mono font-bold text-accent">{i.applicationId}</td>
                    <td className="p-4">
                      <div className="font-bold text-graphite">{i.fullName}</div>
                      <div className="text-[10px] font-mono text-sage-500">CNIC: {i.cnic}</div>
                      <div className="text-[10px] text-sage-400">{i.phone}</div>
                    </td>
                    <td className="p-4 font-semibold text-graphite">{i.phoneModel}</td>
                    <td className="p-4">
                      <div>Down: <strong>{formatPKR(i.downPayment)}</strong></div>
                      <div className="text-sage-500">{formatPKR(i.monthlyInstallment)}/mo ({i.durationMonths}m)</div>
                    </td>
                    <td className="p-4 text-sage-600">
                      <div>{i.employmentType}</div>
                      <div className="text-[10px] text-sage-400">{i.monthlyIncome}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                        {i.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 7: STORE SETTINGS ================= */}
      {activeTab === 'settings' && settings && (
        <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl border border-sage-200 p-6 sm:p-8 space-y-6 shadow-xs max-w-3xl">
          <div className="flex justify-between items-center pb-3 border-b border-sage-100">
            <div>
              <h3 className="font-heading font-extrabold text-lg text-graphite">
                Store Settings & Contact Coordinates
              </h3>
              <p className="text-xs text-sage-500">
                Changes made here immediately update the website header, footer, WhatsApp links, and invoices.
              </p>
            </div>
            {settingsSaveMsg && (
              <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                {settingsSaveMsg}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-graphite block mb-1">Store Name</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={e => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200 font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-graphite block mb-1">
                Official Phone (Used for Click-to-Call & WhatsApp) *
              </label>
              <input
                type="text"
                value={settings.phoneRaw}
                onChange={e => setSettings({ ...settings, phoneRaw: e.target.value })}
                placeholder="00300 0600956"
                className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200 font-mono font-bold text-accent"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-graphite block mb-1">Full Physical Store Address</label>
              <textarea
                rows={2}
                value={settings.address}
                onChange={e => setSettings({ ...settings, address: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200"
              />
            </div>

            <div>
              <label className="font-bold text-graphite block mb-1">Facebook Page URL</label>
              <input
                type="text"
                value={settings.facebookUrl}
                onChange={e => setSettings({ ...settings, facebookUrl: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200"
              />
            </div>

            <div>
              <label className="font-bold text-graphite block mb-1">Top Announcement Banner Text</label>
              <input
                type="text"
                value={settings.announcementText}
                onChange={e => setSettings({ ...settings, announcementText: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200"
              />
            </div>

            <div>
              <label className="font-bold text-graphite block mb-1">Multan Local Delivery Fee (PKR)</label>
              <input
                type="number"
                value={settings.shippingMultan}
                onChange={e => setSettings({ ...settings, shippingMultan: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200 font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-graphite block mb-1">Nationwide Courier Fee (PKR)</label>
              <input
                type="number"
                value={settings.shippingNationwide}
                onChange={e => setSettings({ ...settings, shippingNationwide: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200 font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-graphite block mb-1">Free Shipping Threshold (PKR)</label>
              <input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={e => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200 font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-graphite hover:bg-accent text-white font-bold text-xs transition-colors cursor-pointer shadow-md"
          >
            Save All Settings
          </button>
        </form>
      )}

      {/* ================= ORDER DETAILS MODAL ================= */}
      {orderDetailModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-graphite/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 border border-sage-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-sage-100">
              <div>
                <h3 className="font-heading font-extrabold text-base text-graphite">
                  Order Management: {orderDetailModal.orderNumber}
                </h3>
                <span className="text-[11px] text-sage-400">
                  {new Date(orderDetailModal.createdAt).toLocaleString('en-PK')}
                </span>
              </div>
              <button
                onClick={() => setOrderDetailModal(null)}
                className="p-1 rounded-lg text-sage-400 hover:text-graphite font-bold"
              >
                ✕
              </button>
            </div>

            {/* Quick Status updater */}
            <div className="p-4 rounded-2xl bg-sage-50 space-y-2 text-xs">
              <label className="font-bold text-graphite block">Change Order Status</label>
              <div className="flex gap-2">
                <select
                  value={orderDetailModal.status}
                  onChange={e => handleUpdateOrderStatus(orderDetailModal.id, e.target.value)}
                  className="flex-1 p-2 rounded-xl bg-white border border-sage-200 text-xs font-bold"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing & Quality Inspection</option>
                  <option value="shipped">Out for Delivery / Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Courier tracking updater */}
              <div className="pt-2">
                <label className="font-bold text-graphite block mb-1">Assign Courier / Rider Tracking Number</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    defaultValue={orderDetailModal.trackingNumber || ''}
                    placeholder="e.g. TCS-74892019"
                    onBlur={e => {
                      if (e.target.value !== orderDetailModal.trackingNumber) {
                        handleUpdateOrderStatus(orderDetailModal.id, orderDetailModal.status, e.target.value);
                      }
                    }}
                    className="flex-1 p-2 rounded-xl bg-white border border-sage-200 text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="text-xs space-y-1">
              <div className="font-bold text-graphite">Customer: {orderDetailModal.customer.fullName}</div>
              <div className="font-mono text-sage-600">Phone: {orderDetailModal.customer.phone}</div>
              <div className="text-sage-600">Address: {orderDetailModal.customer.address}, {orderDetailModal.customer.city}</div>
              {orderDetailModal.customer.orderNotes && (
                <div className="text-sage-500 italic">Notes: "{orderDetailModal.customer.orderNotes}"</div>
              )}
            </div>

            {/* Items */}
            <div className="space-y-2 border-t border-sage-100 pt-3">
              <span className="font-bold text-xs text-graphite block">Purchased Products:</span>
              {orderDetailModal.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-xs py-1 border-b border-sage-50">
                  <span>{it.title} ({it.colorName}, {it.storage}) x{it.quantity}</span>
                  <span className="font-mono font-bold">{formatPKR(it.price * it.quantity)}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm font-extrabold text-graphite pt-1">
                <span>Grand Total:</span>
                <span className="font-mono text-accent">{formatPKR(orderDetailModal.total)}</span>
              </div>
            </div>

            {/* Payment proof image if exists */}
            {orderDetailModal.paymentProofUrl && (
              <div className="border-t border-sage-100 pt-3 space-y-1">
                <span className="font-bold text-xs text-graphite block">Customer Payment Proof / Slip:</span>
                <img
                  src={orderDetailModal.paymentProofUrl}
                  alt="Payment Receipt"
                  className="max-h-40 rounded-xl border border-sage-200 object-contain bg-sage-50 p-1"
                />
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setOrderDetailModal(null)}
                className="px-5 py-2.5 rounded-xl bg-graphite text-white font-bold text-xs"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PRODUCT EDIT / CREATE MODAL ================= */}
      {isNewProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-graphite/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveProduct}
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-4 border border-sage-200 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-2 border-b border-sage-100">
              <h3 className="font-heading font-extrabold text-base text-graphite">
                {editingProduct.id ? 'Edit Smartphone' : 'Add New Smartphone'}
              </h3>
              <button
                type="button"
                onClick={() => setIsNewProductModalOpen(false)}
                className="p-1 rounded-lg text-sage-400 hover:text-graphite font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-graphite block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={editingProduct.title || ''}
                  onChange={e => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  placeholder="e.g. Apple iPhone 15 Pro Max"
                  className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-graphite block mb-1">Brand *</label>
                  <select
                    value={editingProduct.brand || 'Apple'}
                    onChange={e => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200"
                  >
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Xiaomi">Xiaomi</option>
                    <option value="Infinix">Infinix</option>
                    <option value="Tecno">Tecno</option>
                    <option value="Vivo">Vivo</option>
                    <option value="Google">Google</option>
                    <option value="Anker">Anker</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-graphite block mb-1">Category</label>
                  <select
                    value={editingProduct.category || 'smartphones'}
                    onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200"
                  >
                    <option value="smartphones">Smartphones</option>
                    <option value="used-flagships">Pre-Owned Flagships</option>
                    <option value="tablets">Tablets</option>
                    <option value="accessories">Fast Chargers & Accessories</option>
                    <option value="audio">AirPods & Audio</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-graphite block mb-1">Base Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.basePrice || 0}
                    onChange={e => setEditingProduct({ ...editingProduct, basePrice: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-graphite block mb-1">Original Price (Before Discount)</label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice || 0}
                    onChange={e => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-graphite block mb-1">PTA Status</label>
                  <select
                    value={editingProduct.ptaStatus || 'PTA Approved'}
                    onChange={e => setEditingProduct({ ...editingProduct, ptaStatus: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200"
                  >
                    <option value="PTA Approved">PTA Approved</option>
                    <option value="Non-PTA">Non-PTA / JV</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-graphite block mb-1">Condition</label>
                  <select
                    value={editingProduct.condition || 'New'}
                    onChange={e => setEditingProduct({ ...editingProduct, condition: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200"
                  >
                    <option value="New">Brand New / Pin Pack</option>
                    <option value="Used">Pre-Owned / 35-Pt Tested</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-graphite block mb-1">Thumbnail Image URL</label>
                <input
                  type="url"
                  value={editingProduct.thumbnail || ''}
                  onChange={e => setEditingProduct({ ...editingProduct, thumbnail: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="prod-in-stock"
                  checked={editingProduct.inStock ?? true}
                  onChange={e => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                  className="accent-accent w-4 h-4"
                />
                <label htmlFor="prod-in-stock" className="font-bold text-graphite cursor-pointer">
                  Available in Multan Shop Stock
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-sage-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsNewProductModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-sage-200 text-xs font-bold text-graphite"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-graphite hover:bg-accent text-white font-bold text-xs transition-colors"
              >
                Save Smartphone
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
