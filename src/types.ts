export type Condition = 'New' | 'Used' | 'Open Box';
export type PTAStatus = 'PTA Approved' | 'Non-PTA / JV';
export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Ready for Pickup' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Returned' | 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type RepairStatus = 'Received' | 'Diagnosing' | 'Waiting for Parts' | 'Repairing' | 'Ready' | 'Delivered' | 'Cancelled' | 'pending' | 'completed';
export type TradeInStatus = 'Submitted' | 'Under Review' | 'Offer Made' | 'Accepted' | 'Rejected' | 'Completed' | 'pending';
export type InstallmentStatus = 'Pending' | 'Approved' | 'Verification Call' | 'Active' | 'Rejected' | 'pending';

export interface ProductVariant {
  id: string;
  colorName: string;
  colorHex: string;
  storage: string; // e.g. "128GB", "256GB"
  ram?: string; // e.g. "8GB"
  price: number; // in PKR
  originalPrice?: number; // for discount strike-through
  sku: string;
  stock: number;
  image?: string;
  images?: string[];
}

export interface ProductSpecs {
  display: string;
  chipset: string;
  ram: string;
  storage: string;
  camera: string;
  battery: string;
  charging?: string;
  os: string;
  network: string; // "4G LTE" or "5G"
  sim: string; // "Dual SIM (Nano)"
  ptaStatus: PTAStatus;
  warranty: string; // e.g. "1 Year Official Brand Warranty" or "7 Days Shop Checking"
  weight?: string;
  dimensions?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  brand: string;
  category: string;
  condition: Condition;
  ptaStatus: PTAStatus;
  basePrice: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  dealOfTheDay?: boolean;
  dealEndsAt?: string; // ISO date string
  images: string[];
  thumbnail: string;
  description: string;
  keyFeatures: string[];
  specs: ProductSpecs;
  variants: ProductVariant[];
  warrantyMonths: number;
  warrantyText?: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  nameUrdu: string;
  slug: string;
  iconName: string;
  image: string;
  itemCount: number;
  productCount?: number;
  description?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  featured: boolean;
  deviceCount: number;
}

export interface CartItem {
  id: string; // unique cart row id (product.id + variant.id)
  productId: string;
  title: string;
  slug: string;
  brand: string;
  image: string;
  variantId: string;
  colorName: string;
  storage: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  maxStock: number;
  ptaStatus: PTAStatus;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postalCode?: string;
  orderNotes?: string;
}

export type DeliveryMethod = 'home_delivery' | 'multan_shop_pickup' | 'multan_express' | 'tcs_nationwide';
export type PaymentMethod = 'cod' | 'jazzcash' | 'easypaisa' | 'bank_transfer' | 'pay_at_shop';

export interface Order {
  id: string;
  orderNumber: string; // format: AMM-2026-000123
  createdAt: string;
  status: OrderStatus;
  items: CartItem[];
  customer: ShippingAddress;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  total: number;
  paymentProofUrl?: string;
  paymentStatus: 'pending' | 'verified' | 'paid' | 'failed';
  trackingNumber?: string;
  courierName?: string;
  courierPartner?: string;
  assignedImei?: Record<string, string>; // variant/item to IMEI mapping
  notes?: string;
}

export interface RepairTicket {
  id: string;
  ticketNumber: string; // format: REP-2026-000045
  createdAt: string;
  customerName: string;
  phone: string;
  city: string;
  deviceBrand: string;
  deviceModel: string;
  issueType: string;
  issueDescription: string;
  estimatedCost: number;
  preferredDate?: string;
  photos?: string[];
  status: RepairStatus;
  technicianNotes?: string;
}

export interface RepairBooking {
  id: string;
  ticketCode: string;
  createdAt: string;
  fullName: string;
  phone: string;
  city: string;
  deviceBrand: string;
  deviceModel: string;
  issueType: string;
  issueDescription?: string;
  serviceMode?: string;
  additionalNotes?: string;
  estimatedCost: number;
  preferredDate?: string;
  photos?: string[];
  status: string;
  technicianNotes?: string;
}

export interface TradeInRequest {
  id: string;
  requestNumber?: string;
  ticketCode?: string;
  createdAt: string;
  customerName?: string;
  fullName?: string;
  phone: string;
  city: string;
  brand: string;
  model: string;
  storage: string;
  condition: 'Like New' | 'Good' | 'Fair' | 'Cracked / Faulty' | string;
  ptaApproved?: boolean;
  ptaStatus?: string;
  boxAndAccessories?: boolean;
  batteryHealth?: string;
  photos?: string[];
  estimatedValue: number;
  offeredPrice?: number;
  status: TradeInStatus | string;
  notes?: string;
}

export interface InstallmentRequest {
  id: string;
  requestNumber?: string;
  applicationId?: string;
  createdAt: string;
  productId?: string;
  productTitle?: string;
  phoneModel?: string;
  variantInfo?: string;
  productPrice?: number;
  totalPrice?: number;
  downPayment: number;
  tenureMonths?: 3 | 6 | 9 | 12;
  durationMonths?: number;
  monthlyInstallment: number;
  applicantName?: string;
  fullName?: string;
  cnic?: string;
  phone: string;
  city: string;
  monthlyIncome?: number | string;
  occupation?: string;
  employmentType?: string;
  status: InstallmentStatus | string;
}

export interface WarrantyRecord {
  id: string;
  orderNumber: string;
  imei: string;
  productName: string;
  purchaseDate: string;
  expiryDate: string;
  customerName: string;
  customerPhone: string;
  status: 'Active' | 'Expired' | 'Claimed';
  ptaStatus: 'PTA Approved' | 'Non-PTA';
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  city: string;
  rating: number;
  comment: string;
  createdAt: string;
  verifiedPurchase: boolean;
}

export interface Question {
  id: string;
  productId: string;
  question: string;
  askedBy: string;
  askedAt: string;
  answer?: string;
  answeredAt?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  maxDiscount?: number;
  isActive: boolean;
  expiryDate?: string;
}

export interface ContactMessage {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  read: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt?: string;
  date?: string;
  readTime: string;
  coverImage: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface SiteSettings {
  businessName: string;
  phoneRaw: string; // "00300 0600956"
  phoneCall: string; // "+923000600956"
  whatsappPhone: string; // "923000600956"
  facebookUrl: string;
  address: string;
  shopCity: string;
  freeShippingThreshold: number;
  shippingMultan: number;
  shippingNationwide: number;
  announcementText: string;
  bankDetails: {
    bankName: string;
    accountTitle: string;
    accountNumber: string;
    iban: string;
    branch?: string;
  };
  jazzCashDetails: {
    accountTitle: string;
    accountNumber: string;
  };
  easypaisaDetails: {
    accountTitle: string;
    accountNumber: string;
  };
  socialLinks?: {
    facebook: string;
    instagram?: string;
    youtube?: string;
  };
  openingHours?: {
    weekdays: string;
    sunday: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  city?: string;
  address?: string;
  savedAddresses?: ShippingAddress[];
}
