import React, { useState, useEffect } from 'react';
import { User, Package, Heart, LogOut, Phone, MapPin, Mail, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../config/siteConfig';
import { initialProducts } from '../data/seedData';
import { Order, Product } from '../types';

interface AccountPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ onNavigate }) => {
  const { user, login, logout, wishlist, removeFromWishlist } = useAuth();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist'>('profile');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loginPhone, setLoginPhone] = useState('0300-1234567');
  const [loginName, setLoginName] = useState('Asad Multan');

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.success && data.orders) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  const wishlistedProducts = initialProducts.filter(p => wishlist.includes(p.id));

  // If not logged in, show simple clean login card
  if (!user) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-sage-200 shadow-xs text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-sage-100 text-graphite flex items-center justify-center mx-auto">
            <User className="w-8 h-8" />
          </div>

          <h1 className="font-heading font-extrabold text-2xl text-graphite">
            Sign In to Al-Mushtaq Account
          </h1>

          <p className="text-xs text-sage-500">
            Track past phone orders, save wishlist models, and access quick checkout.
          </p>

          <form
            onSubmit={e => {
              e.preventDefault();
              login(loginPhone, loginName);
            }}
            className="space-y-3 text-left pt-2"
          >
            <div>
              <label className="text-xs font-bold text-graphite block mb-1">Your Name</label>
              <input
                type="text"
                required
                value={loginName}
                onChange={e => setLoginName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs text-graphite"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-graphite block mb-1">Phone Number</label>
              <input
                type="tel"
                required
                value={loginPhone}
                onChange={e => setLoginPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs font-mono text-graphite"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-graphite hover:bg-accent text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Sign In / Continue
            </button>
          </form>

          <div className="pt-2 text-[11px] text-sage-400">
            Are you a store manager?{' '}
            <button
              onClick={() => onNavigate('admin')}
              className="text-accent font-bold hover:underline"
            >
              Go to Admin Panel →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* User Header */}
      <div className="bg-white rounded-3xl border border-sage-200 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-orange-100 text-accent font-heading font-black text-xl flex items-center justify-center shrink-0">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-xl text-graphite">{user.name}</h1>
            <div className="text-xs text-sage-500 font-mono mt-0.5">{user.phone}</div>
            <div className="text-[11px] text-sage-400">{user.city || 'Multan, Pakistan'}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('admin')}
            className="px-4 py-2 rounded-xl border border-sage-200 hover:border-accent text-xs font-bold text-graphite transition-colors cursor-pointer"
          >
            Admin Panel
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-sage-100 hover:bg-red-50 hover:text-red-600 text-xs font-bold text-sage-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-sage-200 space-x-6 text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeTab === 'profile' ? 'border-b-2 border-accent text-graphite' : 'text-sage-400 hover:text-graphite'
          }`}
        >
          My Profile
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeTab === 'orders' ? 'border-b-2 border-accent text-graphite' : 'text-sage-400 hover:text-graphite'
          }`}
        >
          Order History ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeTab === 'wishlist' ? 'border-b-2 border-accent text-graphite' : 'text-sage-400 hover:text-graphite'
          }`}
        >
          Saved Wishlist ({wishlist.length})
        </button>
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-sage-200 p-6 sm:p-8 space-y-6 shadow-xs max-w-xl">
          <h2 className="font-heading font-bold text-base text-graphite pb-3 border-b border-sage-100">
            Saved Delivery Coordinates
          </h2>
          <div className="space-y-4 text-xs">
            <div>
              <label className="text-sage-400 block mb-1">Full Name</label>
              <div className="font-bold text-graphite text-sm">{user.name}</div>
            </div>
            <div>
              <label className="text-sage-400 block mb-1">Registered Phone</label>
              <div className="font-bold font-mono text-graphite text-sm">{user.phone}</div>
            </div>
            <div>
              <label className="text-sage-400 block mb-1">Primary City</label>
              <div className="font-bold text-graphite text-sm">{user.city || 'Multan'}</div>
            </div>
            <div>
              <label className="text-sage-400 block mb-1">Default Shipping Address</label>
              <div className="font-semibold text-sage-700 leading-relaxed">
                {user.address || 'Gulgasht Colony, Multan, Punjab, Pakistan'}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-sage-200 text-center space-y-3">
              <Package className="w-12 h-12 text-sage-300 mx-auto" />
              <h3 className="font-heading font-bold text-base text-graphite">No Orders Yet</h3>
              <p className="text-xs text-sage-500">
                You haven't placed any orders yet with this account.
              </p>
              <button
                onClick={() => onNavigate('shop')}
                className="mt-2 px-5 py-2.5 rounded-xl bg-graphite text-white text-xs font-bold"
              >
                Browse Mobiles
              </button>
            </div>
          ) : (
            orders.map(order => (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-sage-200 p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-sage-100">
                  <div>
                    <span className="font-heading font-bold text-sm text-graphite font-mono">
                      {order.orderNumber}
                    </span>
                    <span className="text-xs text-sage-400 ml-2">
                      {new Date(order.createdAt).toLocaleDateString('en-PK')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-100 text-amber-800">
                      {order.status}
                    </span>
                    <span className="font-mono font-bold text-sm text-graphite">
                      {formatPKR(order.total)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {order.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img src={it.image} alt="" className="w-8 h-8 object-contain rounded bg-sage-50 p-1" />
                        <span className="font-semibold text-graphite">{it.title}</span>
                        <span className="text-sage-400">({it.colorName}, {it.storage}) x{it.quantity}</span>
                      </div>
                      <span className="font-mono text-sage-600">{formatPKR(it.price * it.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2 border-t border-sage-100 justify-end">
                  <button
                    onClick={() => onNavigate('order-confirmation', order.orderNumber)}
                    className="px-4 py-2 rounded-xl border border-sage-200 text-xs font-bold text-graphite hover:bg-sage-50 cursor-pointer"
                  >
                    View Invoice
                  </button>
                  <button
                    onClick={() => onNavigate('track-order', order.orderNumber)}
                    className="px-4 py-2 rounded-xl bg-graphite text-white text-xs font-bold hover:bg-accent transition-colors cursor-pointer"
                  >
                    Track Dispatch
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-sage-200 text-center space-y-3">
              <Heart className="w-12 h-12 text-sage-300 mx-auto" />
              <h3 className="font-heading font-bold text-base text-graphite">Your Wishlist is Empty</h3>
              <p className="text-xs text-sage-500">
                Click the heart icon on any smartphone to save it for later.
              </p>
              <button
                onClick={() => onNavigate('shop')}
                className="mt-2 px-5 py-2.5 rounded-xl bg-graphite text-white text-xs font-bold"
              >
                Find Smartphones
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlistedProducts.map(prod => (
                <div
                  key={prod.id}
                  className="bg-white p-4 rounded-2xl border border-sage-200 space-y-3 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img src={prod.thumbnail} alt="" className="w-16 h-16 object-contain rounded-xl bg-sage-50 p-1 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase text-accent">{prod.brand}</span>
                      <h4
                        onClick={() => onNavigate('product-detail', prod.slug)}
                        className="font-heading font-bold text-xs text-graphite truncate hover:text-accent cursor-pointer"
                      >
                        {prod.title}
                      </h4>
                      <div className="font-mono font-bold text-graphite text-sm mt-0.5">
                        {formatPKR(prod.basePrice)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-sage-100">
                    <button
                      onClick={() =>
                        addToCart({
                          productId: prod.id,
                          variantId: prod.variants?.[0]?.id || `v-${prod.id}`,
                          title: prod.title,
                          slug: prod.slug,
                          brand: prod.brand,
                          image: prod.thumbnail,
                          colorName: prod.variants?.[0]?.colorName || 'Standard',
                          storage: prod.specs?.storage || '128GB',
                          price: prod.basePrice,
                          quantity: 1,
                          maxStock: 5,
                          ptaStatus: prod.ptaStatus,
                        })
                      }
                      className="flex-1 py-2 rounded-xl bg-graphite hover:bg-accent text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                    <button
                      onClick={() => removeFromWishlist(prod.id)}
                      className="p-2 rounded-xl border border-sage-200 text-sage-400 hover:text-red-500 hover:border-red-200 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
