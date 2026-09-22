import React, { useState } from 'react';
import { X, Star, Check, ShieldCheck, Truck, ShoppingBag, MessageSquare, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { formatPKR, getWhatsAppLink } from '../config/siteConfig';
import { useCart } from '../context/CartContext';

interface QuickViewModalProps {
  isOpen?: boolean;
  product: Product | null;
  onClose: () => void;
  onNavigate: (page: string, param?: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ isOpen, product, onClose, onNavigate }) => {
  const { addToCart } = useCart();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState<string>('');

  if (isOpen === false || !product) return null;

  const variants = product.variants || [];
  const currentVariant = variants[selectedVariantIndex] || {
    id: `v-${product.id}`,
    colorName: 'Standard',
    colorHex: '#1C1F1D',
    storage: product.specs?.storage || '128GB',
    price: product.basePrice,
    stock: 5,
    image: product.thumbnail,
    images: product.images
  };

  const activePrice = currentVariant.price || product.basePrice;
  const inStock = currentVariant.stock > 0;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      variantId: currentVariant.id,
      title: product.title,
      slug: product.slug,
      brand: product.brand,
      image: currentVariant.images?.[0] || currentVariant.image || product.thumbnail,
      colorName: currentVariant.colorName,
      storage: currentVariant.storage,
      price: activePrice,
      quantity: 1,
      maxStock: currentVariant.stock,
      ptaStatus: product.ptaStatus
    }, 1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto no-print">
      <div className="min-h-screen px-4 text-center flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-graphite/70 backdrop-blur-xs transition-opacity animate-in fade-in"
          onClick={onClose}
        />

        <div className="inline-block w-full max-w-3xl my-8 p-6 text-left align-middle bg-white rounded-3xl shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full text-sage-500 hover:text-graphite hover:bg-sage-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="flex flex-col items-center justify-center bg-sage-50 rounded-2xl p-6 border border-sage-200 relative">
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-graphite text-white">
                {product.ptaStatus}
              </span>
              <img
                src={currentVariant.images?.[0] || currentVariant.image || product.thumbnail}
                alt={product.title}
                className="w-64 h-64 object-contain transition-transform duration-300 hover:scale-105"
              />
              <span className="mt-3 text-xs text-sage-500 font-medium">
                {product.warrantyText || product.specs?.warranty || `${product.warrantyMonths} Months Warranty`}
              </span>
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-accent">{product.brand}</span>
                <h3 className="font-heading font-extrabold text-xl text-graphite mt-1 leading-snug">
                  {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span className="ml-1 text-xs font-bold text-graphite">{product.rating}</span>
                  </div>
                  <span className="text-xs text-sage-400">({product.reviewsCount} reviews)</span>
                  <span className="text-sage-300">•</span>
                  <span className="text-xs font-semibold text-green-700">
                    {inStock ? `${currentVariant.stock} in stock at Multan shop` : 'Out of Stock'}
                  </span>
                </div>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-2xl font-black font-mono text-graphite">{formatPKR(activePrice)}</span>
                  {product.originalPrice && (
                    <span className="text-sm line-through text-sage-400 font-mono">
                      {formatPKR(product.originalPrice)}
                    </span>
                  )}
                  {product.discountPercentage && (
                    <span className="px-2 py-0.5 rounded bg-accent/10 text-accent font-bold text-xs">
                      Save {product.discountPercentage}%
                    </span>
                  )}
                </div>

                {/* Color Variants */}
                {variants.length > 0 && (
                  <div className="mt-5">
                    <label className="text-xs font-bold text-graphite block mb-2">
                      Color: <span className="font-normal text-sage-600">{currentVariant.colorName}</span>
                    </label>
                    <div className="flex items-center gap-2 flex-wrap">
                      {variants.map((v, idx) => (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariantIndex(idx)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                            selectedVariantIndex === idx
                              ? 'border-accent bg-orange-50/50 text-accent font-bold ring-1 ring-accent'
                              : 'border-sage-200 text-graphite hover:border-sage-300'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: v.colorHex }}
                          />
                          <span>{v.colorName}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features highlight */}
                <div className="mt-5 space-y-1.5 text-xs text-sage-600 bg-sage-50 p-3 rounded-xl border border-sage-200">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                    <span>Official PTA Approved with IMEI customs tax paid</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-accent shrink-0" />
                    <span>Same-day hand delivery in Multan | 24-48h nationwide via TCS</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-sage-200 space-y-2.5">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!inStock}
                    className="w-full py-3 rounded-xl bg-graphite hover:bg-accent text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:bg-sage-300"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                  </button>

                  <a
                    href={getWhatsAppLink(`Assalam-o-Alaikum! I want to confirm price & stock for: ${product.title} (${currentVariant.colorName})`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors text-center"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onNavigate('product-detail', product.slug);
                  }}
                  className="w-full text-center text-xs font-bold text-accent hover:underline flex items-center justify-center gap-1 cursor-pointer pt-1"
                >
                  <span>View Full Product Specifications & Customer Reviews</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
