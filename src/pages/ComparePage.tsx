import React from 'react';
import { Trash2, ShoppingBag, Plus, ArrowRight, Check, X, ShieldCheck } from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../config/siteConfig';

interface ComparePageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const ComparePage: React.FC<ComparePageProps> = ({ onNavigate }) => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();

  if (compareList.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4 px-4">
        <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center text-sage-400 mx-auto">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-graphite">No Devices to Compare</h2>
        <p className="text-xs text-sage-500">
          Add up to 3 smartphones or accessories to compare technical specifications side-by-side.
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-3 rounded-xl bg-graphite text-white font-bold text-xs hover:bg-accent transition-colors cursor-pointer"
        >
          Explore Mobiles
        </button>
      </div>
    );
  }

  const specKeys = [
    { label: 'Brand', key: 'brand' },
    { label: 'Base Price', key: 'basePrice', format: (v: number) => formatPKR(v) },
    { label: 'PTA Status', key: 'ptaStatus' },
    { label: 'Condition', key: 'condition' },
    { label: 'Display', key: 'display', spec: true },
    { label: 'Processor', key: 'processor', spec: true },
    { label: 'RAM', key: 'ram', spec: true },
    { label: 'Storage', key: 'storage', spec: true },
    { label: 'Main Camera', key: 'mainCamera', spec: true },
    { label: 'Front Camera', key: 'frontCamera', spec: true },
    { label: 'Battery', key: 'battery', spec: true },
    { label: 'Charging', key: 'charging', spec: true },
    { label: 'Network', key: 'network', spec: true },
    { label: 'Operating System', key: 'os', spec: true },
    { label: 'Warranty', key: 'warrantyText' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-sage-200">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-graphite tracking-tight">
            Device Comparison
          </h1>
          <p className="text-xs text-sage-500 mt-1">
            Comparing {compareList.length} of 3 devices available at Al-Mushtaq Mobiles
          </p>
        </div>
        <div className="flex items-center gap-3">
          {compareList.length < 3 && (
            <button
              onClick={() => onNavigate('shop')}
              className="px-4 py-2 rounded-xl bg-sage-100 hover:bg-sage-200 text-graphite text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Another Phone</span>
            </button>
          )}
          <button
            onClick={clearCompare}
            className="text-xs font-bold text-red-500 hover:underline cursor-pointer"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto bg-white rounded-3xl border border-sage-200 shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-sage-200 bg-sage-50/50">
              <th className="p-4 sm:p-6 w-48 text-xs font-bold text-sage-400 uppercase tracking-wider">
                Phone
              </th>
              {compareList.map(prod => (
                <th key={prod.id} className="p-4 sm:p-6 min-w-[240px] align-top">
                  <div className="space-y-3">
                    <div className="relative pt-[70%] bg-sage-50 rounded-2xl p-4 flex items-center justify-center">
                      <img
                        src={prod.thumbnail}
                        alt={prod.title}
                        className="absolute inset-0 w-full h-full object-contain p-2"
                      />
                      <button
                        onClick={() => removeFromCompare(prod.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-sage-400 hover:text-red-500 shadow-xs transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                        {prod.brand}
                      </span>
                      <h4
                        onClick={() => onNavigate('product-detail', prod.slug)}
                        className="font-heading font-bold text-sm text-graphite hover:text-accent cursor-pointer line-clamp-2"
                      >
                        {prod.title}
                      </h4>
                      <div className="text-base font-black font-mono text-graphite mt-1">
                        {formatPKR(prod.basePrice)}
                      </div>
                    </div>

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
                      className="w-full py-2.5 rounded-xl bg-graphite hover:bg-accent text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </th>
              ))}
              {compareList.length < 3 && (
                <th className="p-6 min-w-[200px] border-l border-sage-100 align-middle text-center">
                  <div
                    onClick={() => onNavigate('shop')}
                    className="p-8 border-2 border-dashed border-sage-200 rounded-3xl hover:border-accent hover:bg-orange-50/30 transition-all cursor-pointer flex flex-col items-center justify-center space-y-2 text-sage-400 hover:text-accent"
                  >
                    <Plus className="w-8 h-8" />
                    <span className="text-xs font-bold text-graphite">Add Device</span>
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-100 text-xs">
            {specKeys.map(row => (
              <tr key={row.label} className="hover:bg-sage-50/40 transition-colors">
                <td className="p-4 font-bold text-sage-600 bg-sage-50/30">
                  {row.label}
                </td>
                {compareList.map(prod => {
                  let value: any = '';
                  if (row.spec && prod.specs) {
                    value = (prod.specs as any)[row.key];
                  } else {
                    value = (prod as any)[row.key];
                  }

                  if (row.format && value !== undefined) {
                    value = row.format(value);
                  }

                  return (
                    <td key={prod.id} className="p-4 text-graphite font-medium">
                      {value || '—'}
                    </td>
                  );
                })}
                {compareList.length < 3 && <td className="p-4 border-l border-sage-100" />}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
