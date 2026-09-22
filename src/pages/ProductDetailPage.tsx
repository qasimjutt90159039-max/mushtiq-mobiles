import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, Truck, RefreshCw, ShoppingBag, Zap, Heart, GitCompare, Phone, MessageSquare, Check, ArrowRight, Share2, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Product, Review, Question } from '../types';
import { formatPKR, siteConfig, getCallLink, getWhatsAppLink } from '../config/siteConfig';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useCompare } from '../context/CompareContext';
import { initialProducts } from '../data/seedData';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  productSlug?: string;
  slug?: string;
  onNavigate: (page: string, param?: string) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productSlug, slug, onNavigate, onQuickView }) => {
  const currentSlug = slug || productSlug || '';
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useAuth();
  const { toggleCompare, isInCompare } = useCompare();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'pta' | 'reviews' | 'qa'>('specs');
  const [copiedLink, setCopiedLink] = useState(false);

  // Reviews & QA
  const [reviews, setReviews] = useState<Review[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionAuthor, setNewQuestionAuthor] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [questionSubmitted, setQuestionSubmitted] = useState(false);

  // Frequently bought together bundle selection
  const [bundleIncludeGlass, setBundleIncludeGlass] = useState(true);
  const [bundleIncludeCharger, setBundleIncludeCharger] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${currentSlug}`);
        const data = await res.json();
        if (data.success && data.product) {
          setProduct(data.product);
          // fetch reviews & questions
          const revRes = await fetch(`/api/reviews/${data.product.id}`);
          const revData = await revRes.json();
          if (revData.success) setReviews(revData.reviews);

          const qRes = await fetch(`/api/questions/${data.product.id}`);
          const qData = await qRes.json();
          if (qData.success) setQuestions(qData.questions);
        } else {
          // fallback to seed
          const found = initialProducts.find(p => p.slug === currentSlug || p.id === currentSlug);
          if (found) setProduct(found);
        }
      } catch (err) {
        console.error(err);
        const found = initialProducts.find(p => p.slug === currentSlug || p.id === currentSlug);
        if (found) setProduct(found);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [currentSlug]);

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-sage-200 border-t-accent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-sage-500 font-medium">Loading smartphone details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto py-24 text-center space-y-4">
        <h2 className="font-heading font-bold text-xl text-graphite">Product Not Found</h2>
        <p className="text-xs text-sage-500">
          The requested phone model might have been updated or moved.
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="px-5 py-2.5 rounded-xl bg-graphite text-white text-xs font-semibold hover:bg-accent"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const variants = product.variants || [];
  const currentVariant = variants[selectedVariantIndex] || {
    id: `v-${product.id}`,
    colorName: 'Standard',
    colorHex: '#1C1F1D',
    storage: product.specs?.storage || '128GB',
    price: product.basePrice,
    stock: 5,
    images: product.images
  };

  const images = (currentVariant.images && currentVariant.images.length > 0)
    ? currentVariant.images
    : (currentVariant.image ? [currentVariant.image, ...product.images] : product.images);
  const activeImage = images[activeImageIndex] || product.thumbnail;
  const activePrice = currentVariant.price || product.basePrice;
  const inStock = currentVariant.stock > 0;
  const isWishlisted = wishlist.includes(product.id);
  const isCompared = isInCompare(product.id);

  // Bundle calculations
  const glassPrice = 850;
  const chargerPrice = 3200;
  const bundleSavings = 550;
  const bundleTotal = activePrice + (bundleIncludeGlass ? glassPrice : 0) + (bundleIncludeCharger ? chargerPrice : 0) - (bundleIncludeGlass && bundleIncludeCharger ? bundleSavings : 0);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      variantId: currentVariant.id,
      title: product.title,
      slug: product.slug,
      brand: product.brand,
      image: activeImage,
      colorName: currentVariant.colorName,
      storage: currentVariant.storage,
      price: activePrice,
      quantity,
      maxStock: currentVariant.stock,
      ptaStatus: product.ptaStatus
    }, quantity);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    onNavigate('checkout');
  };

  const handleAddBundle = () => {
    handleAddToCart();
    if (bundleIncludeGlass) {
      addToCart({
        productId: 'prod-21',
        variantId: 'v21-s24u',
        title: '9D Tempered Glass Screen Protector',
        slug: 'premium-9d-tempered-glass',
        brand: 'Al-Mushtaq',
        image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=300&auto=format&fit=crop',
        colorName: 'Clear Glass',
        storage: 'Standard',
        price: glassPrice,
        quantity: 1,
        maxStock: 50,
        ptaStatus: 'PTA Approved'
      }, 1);
    }
    if (bundleIncludeCharger) {
      addToCart({
        productId: 'prod-18',
        variantId: 'v18-wht',
        title: 'Anker 65W GaN Fast Charger Prime',
        slug: 'anker-65w-gan-fast-charger',
        brand: 'Anker',
        image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=300&auto=format&fit=crop',
        colorName: 'White',
        storage: '65W GaN',
        price: chargerPrice,
        quantity: 1,
        maxStock: 20,
        ptaStatus: 'PTA Approved'
      }, 1);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          author: newReviewAuthor,
          comment: newReviewComment,
          rating: newReviewRating,
          city: 'Multan'
        })
      });
      const data = await res.json();
      if (data.success && data.review) {
        setReviews(prev => [data.review, ...prev]);
        setNewReviewAuthor('');
        setNewReviewComment('');
        setReviewSubmitted(true);
        setTimeout(() => setReviewSubmitted(false), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim() || !newQuestionAuthor.trim()) return;

    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          question: newQuestionText,
          askedBy: newQuestionAuthor
        })
      });
      const data = await res.json();
      if (data.success && data.question) {
        setQuestions(prev => [data.question, ...prev]);
        setNewQuestionText('');
        setNewQuestionAuthor('');
        setQuestionSubmitted(true);
        setTimeout(() => setQuestionSubmitted(false), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const relatedProducts = initialProducts
    .filter(p => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-sage-500 flex-wrap">
        <button onClick={() => onNavigate('home')} className="hover:text-graphite cursor-pointer">
          Home
        </button>
        <span>/</span>
        <button onClick={() => onNavigate('shop')} className="hover:text-graphite cursor-pointer">
          Shop
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigate('shop', `category=${product.category}`)}
          className="hover:text-graphite capitalize cursor-pointer"
        >
          {product.category}
        </button>
        <span>/</span>
        <span className="text-graphite font-semibold truncate max-w-xs">{product.title}</span>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Gallery (Cols 1-6) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative bg-sage-50 rounded-3xl border border-sage-200 p-8 flex items-center justify-center min-h-[380px] sm:min-h-[460px] overflow-hidden group">
            {/* PTA Status Overlay */}
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-graphite text-white shadow-xs">
              {product.ptaStatus}
            </span>

            {/* Condition */}
            {product.condition === 'Used' && (
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-xs">
                Pre-Owned (35-Pt Tested)
              </span>
            )}

            <img
              src={activeImage}
              alt={product.title}
              className="w-full max-h-[360px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Thumbnails Carousel */}
          {images && images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-18 h-18 rounded-2xl bg-sage-50 border p-2 shrink-0 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-accent ring-2 ring-accent/30 bg-white'
                      : 'border-sage-200 hover:border-sage-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Pricing, Variant Selector, Buy CTAs (Cols 7-12) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                {product.brand} Official
              </span>
              <button
                onClick={handleShare}
                className="text-xs text-sage-500 hover:text-graphite flex items-center gap-1 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-graphite tracking-tight mt-1 leading-snug">
              {product.title}
            </h1>

            {/* Ratings & Stock */}
            <div className="flex items-center gap-3 mt-2 flex-wrap text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-500" />
                <span>{product.rating}</span>
                <span className="text-sage-400 font-normal">({reviews.length || product.reviewsCount} reviews)</span>
              </div>
              <span className="text-sage-300">•</span>
              <span className="font-semibold text-green-700">
                {inStock ? `In Stock (${currentVariant.stock} units at Katchehry Chowk)` : 'Out of Stock'}
              </span>
              <span className="text-sage-300">•</span>
              <span className="text-sage-500 font-mono">SKU: {currentVariant.id}</span>
            </div>
          </div>

          {/* Price Box */}
          <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200 flex items-baseline justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black font-mono text-graphite">
                  {formatPKR(activePrice)}
                </span>
                {product.originalPrice && product.originalPrice > activePrice && (
                  <span className="text-base line-through text-sage-400 font-mono">
                    {formatPKR(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-sage-500 mt-1">
                Inclusive of all official PTA taxes & duties. Official receipt provided.
              </p>
            </div>

            {product.discountPercentage && (
              <span className="px-3 py-1 rounded-xl bg-accent text-white font-bold text-xs shrink-0">
                Save {product.discountPercentage}%
              </span>
            )}
          </div>

          {/* Color Selection */}
          {variants.length > 0 && (
            <div>
              <label className="text-xs font-bold text-graphite block mb-2">
                Color: <span className="font-semibold text-accent">{currentVariant.colorName}</span>
              </label>
              <div className="flex items-center gap-2.5 flex-wrap">
                {variants.map((v, idx) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedVariantIndex(idx);
                      setActiveImageIndex(0);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      selectedVariantIndex === idx
                        ? 'border-accent bg-orange-50 text-accent ring-2 ring-accent/20'
                        : 'border-sage-200 text-graphite hover:border-sage-300 bg-white'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/15 shrink-0"
                      style={{ backgroundColor: v.colorHex }}
                    />
                    <span>{v.colorName}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Storage Variant Buttons */}
          {variants.length > 1 && (
            <div>
              <label className="text-xs font-bold text-graphite block mb-2">
                Storage: <span className="font-semibold text-graphite">{currentVariant.storage}</span>
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {Array.from(new Set(variants.map(v => v.storage))).map(st => {
                  const matchingIndex = variants.findIndex(v => v.storage === st);
                  const isSelected = currentVariant.storage === st;
                  return (
                    <button
                      key={st}
                      onClick={() => {
                        if (matchingIndex !== -1) {
                          setSelectedVariantIndex(matchingIndex);
                          setActiveImageIndex(0);
                        }
                      }}
                      className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'border-graphite bg-graphite text-white'
                          : 'border-sage-200 bg-white text-graphite hover:border-sage-300'
                      }`}
                    >
                      {st}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Multan Delivery & Pickup Estimator */}
          <div className="p-4 rounded-2xl bg-white border border-sage-200 space-y-2.5 text-xs text-sage-600">
            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div>
                <strong className="text-graphite">Multan Express Delivery:</strong> Same-day hand delivery within 2 hours or direct pickup at Shop No. 6, Rehma Commercial Centre, Katchehry Chowk.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div>
                <strong className="text-graphite">Warranty Coverage:</strong> {product.warrantyText || product.specs?.warranty || `${product.warrantyMonths} Months Warranty`}
              </div>
            </div>
          </div>

          {/* Monthly Installment Teaser */}
          <div
            onClick={() => onNavigate('installments')}
            className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200 flex items-center justify-between text-xs cursor-pointer hover:bg-orange-100/70 transition-colors"
          >
            <div>
              <span className="font-bold text-graphite block">
                Pay in 3 or 6 Monthly Installments
              </span>
              <span className="text-sage-600">
                Starting from Rs. {Math.round(activePrice / 6).toLocaleString('en-PK')}/month with 0% markup
              </span>
            </div>
            <span className="text-accent font-bold">Apply Plan →</span>
          </div>

          {/* Actions: Quantity + Add to Cart + Buy Now */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-sage-200 rounded-xl bg-white p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-sage-600 hover:text-graphite font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-graphite font-mono">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(currentVariant.stock, quantity + 1))}
                  className="px-3 py-1.5 text-sage-600 hover:text-graphite font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                id="pdp-add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={!inStock}
                className="flex-1 py-3 rounded-xl bg-graphite hover:bg-accent text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm disabled:bg-sage-300"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>

              {/* Buy Now */}
              <button
                id="pdp-buy-now-btn"
                onClick={handleBuyNow}
                disabled={!inStock}
                className="flex-1 py-3 rounded-xl bg-accent hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md disabled:bg-sage-300"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Utility buttons: Wishlist, Compare, WhatsApp, Call */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isWishlisted ? 'border-accent text-accent bg-orange-50' : 'border-sage-200 text-sage-700 hover:border-sage-300'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-accent' : ''}`} />
                <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
              </button>

              <button
                onClick={() => toggleCompare(product)}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isCompared ? 'border-graphite bg-graphite text-white' : 'border-sage-200 text-sage-700 hover:border-sage-300'
                }`}
              >
                <GitCompare className="w-3.5 h-3.5" />
                <span>{isCompared ? 'Compared' : 'Compare'}</span>
              </button>

              <a
                href={getWhatsAppLink(`Assalam-o-Alaikum! Inquiring about ${product.title} (${currentVariant.colorName}, ${currentVariant.storage}) priced at ${formatPKR(activePrice)}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors text-center"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href={getCallLink()}
                className="py-2 px-3 rounded-xl bg-sage-800 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors text-center"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Shop</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Bought Together Bundle */}
      <div className="bg-sage-50 rounded-3xl p-6 sm:p-8 border border-sage-200">
        <h3 className="font-heading font-extrabold text-lg text-graphite mb-1">
          Frequently Bought Together in Multan
        </h3>
        <p className="text-xs text-sage-500 mb-6">
          Add official protection & original charger to save an extra Rs. 550 on this order.
        </p>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            {/* Phone item */}
            <div className="p-3 bg-white rounded-2xl border border-sage-200 flex items-center gap-3 w-64">
              <img src={activeImage} alt="" className="w-12 h-12 object-contain" />
              <div className="min-w-0">
                <h5 className="text-xs font-bold text-graphite truncate">{product.title}</h5>
                <span className="text-xs font-bold text-accent font-mono">{formatPKR(activePrice)}</span>
              </div>
            </div>

            <span className="text-lg font-bold text-sage-400">+</span>

            {/* 9D Glass */}
            <div className={`p-3 rounded-2xl border flex items-center gap-3 w-64 transition-all ${
              bundleIncludeGlass ? 'bg-white border-accent' : 'bg-sage-100 border-sage-200 opacity-60'
            }`}>
              <input
                type="checkbox"
                checked={bundleIncludeGlass}
                onChange={e => setBundleIncludeGlass(e.target.checked)}
                className="accent-accent w-4 h-4 cursor-pointer"
              />
              <div className="min-w-0">
                <h5 className="text-xs font-bold text-graphite truncate">9D Tempered Glass</h5>
                <span className="text-xs font-bold text-accent font-mono">{formatPKR(glassPrice)}</span>
              </div>
            </div>

            <span className="text-lg font-bold text-sage-400">+</span>

            {/* 65W GaN Charger */}
            <div className={`p-3 rounded-2xl border flex items-center gap-3 w-64 transition-all ${
              bundleIncludeCharger ? 'bg-white border-accent' : 'bg-sage-100 border-sage-200 opacity-60'
            }`}>
              <input
                type="checkbox"
                checked={bundleIncludeCharger}
                onChange={e => setBundleIncludeCharger(e.target.checked)}
                className="accent-accent w-4 h-4 cursor-pointer"
              />
              <div className="min-w-0">
                <h5 className="text-xs font-bold text-graphite truncate">Anker 65W GaN Charger</h5>
                <span className="text-xs font-bold text-accent font-mono">{formatPKR(chargerPrice)}</span>
              </div>
            </div>
          </div>

          {/* Bundle Total & Buy Button */}
          <div className="text-right lg:border-l lg:border-sage-200 lg:pl-6 space-y-2 shrink-0">
            <div className="text-xs text-sage-500">Bundle Price:</div>
            <div className="text-2xl font-black font-mono text-graphite">
              {formatPKR(bundleTotal)}
            </div>
            {bundleIncludeGlass && bundleIncludeCharger && (
              <span className="text-[11px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full inline-block">
                Includes Rs. 550 Bundle Discount
              </span>
            )}
            <button
              onClick={handleAddBundle}
              className="w-full mt-2 px-5 py-2.5 rounded-xl bg-graphite hover:bg-accent text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Add All 3 to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section: Specs, PTA, Reviews, Q&A */}
      <div className="bg-white rounded-3xl border border-sage-200 overflow-hidden shadow-xs">
        {/* Tab Headers */}
        <div className="flex border-b border-sage-200 overflow-x-auto bg-sage-50">
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-6 py-4 text-xs font-bold tracking-wider uppercase transition-colors shrink-0 cursor-pointer ${
              activeTab === 'specs'
                ? 'bg-white text-graphite border-b-2 border-accent'
                : 'text-sage-500 hover:text-graphite'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('pta')}
            className={`px-6 py-4 text-xs font-bold tracking-wider uppercase transition-colors shrink-0 cursor-pointer ${
              activeTab === 'pta'
                ? 'bg-white text-graphite border-b-2 border-accent'
                : 'text-sage-500 hover:text-graphite'
            }`}
          >
            PTA & Warranty Verification
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-4 text-xs font-bold tracking-wider uppercase transition-colors shrink-0 cursor-pointer ${
              activeTab === 'reviews'
                ? 'bg-white text-graphite border-b-2 border-accent'
                : 'text-sage-500 hover:text-graphite'
            }`}
          >
            Customer Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setActiveTab('qa')}
            className={`px-6 py-4 text-xs font-bold tracking-wider uppercase transition-colors shrink-0 cursor-pointer ${
              activeTab === 'qa'
                ? 'bg-white text-graphite border-b-2 border-accent'
                : 'text-sage-500 hover:text-graphite'
            }`}
          >
            Q&A ({questions.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          {/* TAB 1: Specs */}
          {activeTab === 'specs' && product.specs && (
            <div className="space-y-6">
              <h4 className="font-heading font-bold text-base text-graphite">
                Complete Device Specs for {product.title}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="p-3 rounded-xl bg-sage-50 border border-sage-200 flex justify-between gap-4">
                    <span className="font-bold text-sage-600 uppercase tracking-wider text-[11px]">{key}</span>
                    <span className="font-semibold text-graphite text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PTA & Warranty Verification */}
          {activeTab === 'pta' && (
            <div className="space-y-6 max-w-3xl">
              <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 space-y-2">
                <h4 className="font-heading font-bold text-sm text-graphite flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                  <span>Official PTA Customs Clearance Guaranteed</span>
                </h4>
                <p className="text-xs text-sage-700 leading-relaxed">
                  Every brand-new smartphone purchased from Al-Mushtaq Mobiles is registered with Pakistan Telecommunication Authority (PTA). All customs taxes are settled and documented with an official tax invoice.
                </p>
              </div>

              <div className="space-y-4 text-xs text-sage-700">
                <h5 className="font-bold text-graphite text-sm">How to verify your device IMEI on PTA:</h5>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Dial <strong className="font-mono text-graphite">*#06#</strong> on the dialpad to reveal the 15-digit IMEI.</li>
                  <li>Send the 15 digits via SMS to <strong className="font-mono text-accent">8484</strong> (standard SMS rates apply).</li>
                  <li>Alternatively, download the official <strong>DIRBS App</strong> or visit <a href="https://dirbs.pta.gov.pk" target="_blank" rel="noreferrer" className="text-accent underline font-bold">dirbs.pta.gov.pk</a>.</li>
                  <li>The reply will state: <em>"IMEI is Compliant (PTA Approved)"</em>.</li>
                </ol>
              </div>

              <div className="pt-4 border-t border-sage-200">
                <h5 className="font-bold text-graphite text-sm mb-2">Physical Shop Warranty at Multan:</h5>
                <p className="text-xs text-sage-600 leading-relaxed">
                  In case of any manufacturing flaw, bring your device along with the purchase receipt to Shop No. 6, Rehma Commercial Centre, Katchehry Chowk, Multan within 7 days for immediate replacement or official service center liaison.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Review Form */}
              <form onSubmit={handleSubmitReview} className="p-5 rounded-2xl bg-sage-50 border border-sage-200 max-w-xl space-y-3">
                <h5 className="font-heading font-bold text-sm text-graphite">Write a Review</h5>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-sage-600">Your Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReviewRating(star)}
                        className="text-amber-500 cursor-pointer"
                      >
                        <Star className={`w-4 h-4 ${star <= newReviewRating ? 'fill-amber-500' : 'text-sage-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={newReviewAuthor}
                    onChange={e => setNewReviewAuthor(e.target.value)}
                    placeholder="Your Name (e.g. Asad Multan)"
                    className="p-2.5 rounded-xl bg-white border border-sage-200 text-xs"
                  />
                </div>

                <textarea
                  required
                  rows={3}
                  value={newReviewComment}
                  onChange={e => setNewReviewComment(e.target.value)}
                  placeholder="Share your experience with this phone, battery life, camera quality..."
                  className="w-full p-2.5 rounded-xl bg-white border border-sage-200 text-xs"
                />

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-graphite hover:bg-accent text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Submit Review
                </button>

                {reviewSubmitted && (
                  <p className="text-xs text-green-700 font-semibold">
                    Thank you! Your verified review has been posted.
                  </p>
                )}
              </form>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-xs text-sage-500">No reviews yet. Be the first to review this phone!</p>
                ) : (
                  reviews.map(rev => (
                    <div key={rev.id} className="p-4 rounded-2xl border border-sage-200 bg-white space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-graphite">{rev.author}</span>
                          <span className="text-[10px] text-sage-400">({rev.city || 'Multan'})</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] text-green-700 bg-green-50 px-2 py-0.2 rounded font-semibold border border-green-200">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-500' : 'text-sage-200'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-sage-700 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: Q&A */}
          {activeTab === 'qa' && (
            <div className="space-y-8">
              <form onSubmit={handleSubmitQuestion} className="p-5 rounded-2xl bg-sage-50 border border-sage-200 max-w-xl space-y-3">
                <h5 className="font-heading font-bold text-sm text-graphite">Ask Al-Mushtaq Shop a Question</h5>
                <input
                  type="text"
                  required
                  value={newQuestionAuthor}
                  onChange={e => setNewQuestionAuthor(e.target.value)}
                  placeholder="Your Name"
                  className="w-full p-2.5 rounded-xl bg-white border border-sage-200 text-xs"
                />
                <textarea
                  required
                  rows={2}
                  value={newQuestionText}
                  onChange={e => setNewQuestionText(e.target.value)}
                  placeholder="Ask about warranty, color availability at Katchehry Chowk, pin-pack seal, etc."
                  className="w-full p-2.5 rounded-xl bg-white border border-sage-200 text-xs"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-graphite hover:bg-accent text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Post Question
                </button>
                {questionSubmitted && (
                  <p className="text-xs text-green-700 font-semibold">
                    Question received! Our shop staff will respond shortly.
                  </p>
                )}
              </form>

              <div className="space-y-4">
                {questions.length === 0 ? (
                  <p className="text-xs text-sage-500">No questions yet for this model.</p>
                ) : (
                  questions.map(q => (
                    <div key={q.id} className="p-4 rounded-2xl border border-sage-200 bg-white space-y-2">
                      <div className="text-xs font-bold text-graphite">
                        Q: {q.question} <span className="text-[10px] font-normal text-sage-400">by {q.askedBy}</span>
                      </div>
                      {q.answer ? (
                        <div className="text-xs text-sage-700 bg-sage-50 p-3 rounded-xl border border-sage-200">
                          <strong className="text-accent">Al-Mushtaq Mobiles:</strong> {q.answer}
                        </div>
                      ) : (
                        <div className="text-[11px] text-sage-400 italic">Pending staff response...</div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-extrabold text-xl text-graphite">
              Similar Phones in Multan
            </h3>
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs font-bold text-accent hover:underline cursor-pointer"
            >
              View More Phones →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onNavigate={onNavigate}
                onQuickView={onQuickView || (() => {})}
              />
            ))}
          </div>
        </div>
      )}

      {/* Sticky Mobile Bottom CTA Bar */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-sage-200 p-3 flex items-center justify-between gap-3 shadow-lg no-print">
        <div>
          <span className="text-[10px] text-sage-400 block leading-none">Price:</span>
          <span className="text-sm font-black font-mono text-graphite">{formatPKR(activePrice)}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2.5 rounded-xl bg-graphite text-white text-xs font-bold flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="px-4 py-2.5 rounded-xl bg-accent text-white text-xs font-bold flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
