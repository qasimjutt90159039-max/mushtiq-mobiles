import React, { useState } from 'react';
import { Heart, GitCompare, Eye, ShoppingBag, Star, ShieldCheck, Check } from 'lucide-react';
import { Product } from '../types';
import { formatPKR } from '../config/siteConfig';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useCompare } from '../context/CompareContext';

interface ProductCardProps {
  product: Product;
  onNavigate: (page: string, param?: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate, onQuickView }) => {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useAuth();
  const { toggleCompare, isInCompare } = useCompare();

  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const variants = product.variants || [];
  const currentVariant = variants[activeVariantIndex] || {
    id: `v-${product.id}`,
    colorName: 'Standard',
    colorHex: '#1C1F1D',
    storage: product.specs?.storage || '128GB',
    price: product.basePrice,
    stock: 5,
    images: product.images
  };

  const activePrice = currentVariant.price || product.basePrice;
  const isWishlisted = wishlist.includes(product.id);
  const isCompared = isInCompare(product.id);

  const displayImage = isHovered && product.images && product.images.length > 1
    ? product.images[1]
    : currentVariant.images?.[0] || currentVariant.image || product.thumbnail;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
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

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <div
      onClick={() => onNavigate('product-detail', product.slug)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl border border-sage-200 overflow-hidden hover:shadow-xl hover:border-sage-300 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Badges */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
        {product.discountPercentage && product.discountPercentage > 0 && (
          <span className="px-2 py-0.5 rounded-full bg-accent text-white text-[10px] font-bold tracking-tight shadow-xs">
            -{product.discountPercentage}%
          </span>
        )}
        <span className="px-2 py-0.5 rounded-full bg-graphite/90 backdrop-blur-xs text-white text-[9px] font-bold tracking-tight">
          {product.ptaStatus}
        </span>
        {product.condition === 'Used' && (
          <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[9px] font-bold">
            Certified Used
          </span>
        )}
      </div>

      {/* Floating Action Icons */}
      <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`p-2 rounded-full backdrop-blur-md shadow-sm border transition-transform hover:scale-110 cursor-pointer ${
            isWishlisted
              ? 'bg-accent text-white border-accent'
              : 'bg-white/90 text-sage-600 hover:text-accent border-sage-200'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleCompare(product);
          }}
          className={`p-2 rounded-full backdrop-blur-md shadow-sm border transition-transform hover:scale-110 cursor-pointer ${
            isCompared
              ? 'bg-graphite text-white border-graphite'
              : 'bg-white/90 text-sage-600 hover:text-graphite border-sage-200'
          }`}
          title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
        >
          <GitCompare className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="p-2 rounded-full bg-white/90 backdrop-blur-md text-sage-600 hover:text-graphite border border-sage-200 shadow-sm transition-transform hover:scale-110 cursor-pointer"
          title="Quick View"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Image Canvas */}
      <div className="relative pt-[85%] bg-sage-50/60 overflow-hidden flex items-center justify-center p-4">
        <img
          src={displayImage}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-108"
          loading="lazy"
        />
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-[11px] text-sage-500 mb-1">
            <span className="font-bold uppercase tracking-wider text-sage-600">{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3 h-3 fill-amber-500" />
              <span>{product.rating}</span>
              <span className="text-sage-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-heading font-bold text-sm text-graphite line-clamp-2 group-hover:text-accent transition-colors leading-snug">
            {product.title}
          </h3>

          {/* Color Swatch Dots */}
          {variants.length > 1 && (
            <div className="flex items-center gap-1.5 mt-2.5">
              {variants.slice(0, 5).map((v, i) => (
                <button
                  key={v.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveVariantIndex(i);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border transition-transform cursor-pointer ${
                    activeVariantIndex === i
                      ? 'ring-2 ring-accent scale-110 border-white'
                      : 'border-black/15 hover:scale-105'
                  }`}
                  style={{ backgroundColor: v.colorHex }}
                  title={`${v.colorName} - ${v.storage}`}
                />
              ))}
              {variants.length > 5 && (
                <span className="text-[10px] text-sage-400 font-medium">+{variants.length - 5}</span>
              )}
            </div>
          )}

          {/* Key Specs tags */}
          {product.specs && (
            <div className="flex items-center gap-1.5 mt-2 text-[10px] text-sage-500 flex-wrap">
              {product.specs.ram && <span className="px-1.5 py-0.5 rounded bg-sage-100 font-medium">{product.specs.ram}</span>}
              {product.specs.storage && <span className="px-1.5 py-0.5 rounded bg-sage-100 font-medium">{product.specs.storage}</span>}
              {product.specs.battery && <span className="px-1.5 py-0.5 rounded bg-sage-100 font-medium">{product.specs.battery}</span>}
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="pt-2 border-t border-sage-100">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-base font-black font-mono text-graphite">
              {formatPKR(activePrice)}
            </span>
            {product.originalPrice && product.originalPrice > activePrice && (
              <span className="text-xs line-through text-sage-400 font-mono">
                {formatPKR(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickAdd}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                isAdded
                  ? 'bg-green-600 text-white'
                  : 'bg-graphite text-white hover:bg-accent'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
