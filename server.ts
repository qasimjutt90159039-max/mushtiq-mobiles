import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { initialProducts, initialCategories, initialBrands, sampleReviews, sampleQuestions, sampleCoupons, sampleBlogPosts, sampleWarrantyRecords } from './src/data/seedData';
import { siteConfig } from './src/config/siteConfig';
import { Product, Order, RepairTicket, TradeInRequest, InstallmentRequest, WarrantyRecord, Review, Question, Coupon, ContactMessage, BlogPost, SiteSettings, User } from './src/types';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// In-Memory & File-backed DB state
interface DBState {
  products: Product[];
  categories: typeof initialCategories;
  brands: typeof initialBrands;
  orders: Order[];
  repairs: RepairTicket[];
  tradeIns: TradeInRequest[];
  installments: InstallmentRequest[];
  warrantyRecords: WarrantyRecord[];
  reviews: Review[];
  questions: Question[];
  coupons: Coupon[];
  messages: ContactMessage[];
  blogs: BlogPost[];
  settings: SiteSettings;
  users: User[];
  counters: {
    orderNumber: number;
    repairTicket: number;
    tradeIn: number;
    installment: number;
  };
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

const defaultState: DBState = {
  products: initialProducts,
  categories: initialCategories,
  brands: initialBrands,
  orders: [
    {
      id: 'ord-1',
      orderNumber: 'AMM-2026-000101',
      createdAt: '2026-08-20T11:30:00Z',
      status: 'Delivered',
      items: [
        {
          id: 'cart-1',
          productId: 'prod-1',
          title: 'Apple iPhone 15 Pro Max 256GB - PTA Approved',
          slug: 'apple-iphone-15-pro-max',
          brand: 'Apple',
          image: initialProducts[0].thumbnail,
          variantId: 'v1-nat-256',
          colorName: 'Natural Titanium',
          storage: '256GB',
          price: 445000,
          quantity: 1,
          maxStock: 5,
          ptaStatus: 'PTA Approved'
        }
      ],
      customer: {
        fullName: 'Muhammad Arslan',
        phone: '0301-7654321',
        email: 'arslan.multan@gmail.com',
        address: 'House 42, Street 3, Gulgasht Colony',
        city: 'Multan',
        province: 'Punjab',
        postalCode: '60000',
        orderNotes: 'Please call before arriving'
      },
      deliveryMethod: 'multan_shop_pickup',
      paymentMethod: 'pay_at_shop',
      subtotal: 445000,
      discount: 0,
      shippingFee: 0,
      total: 445000,
      paymentStatus: 'paid',
      assignedImei: { 'v1-nat-256': '352981098234123' },
      notes: 'Customer collected from Shop 6 Katchehry Chowk'
    }
  ],
  repairs: [
    {
      id: 'rep-1',
      ticketNumber: 'REP-2026-000045',
      createdAt: '2026-08-22T14:10:00Z',
      customerName: 'Kashif Mehmood',
      phone: '0302-9988771',
      city: 'Multan',
      deviceBrand: 'Samsung',
      deviceModel: 'Galaxy S22 Ultra',
      issueType: 'Broken Screen (Glass Only)',
      issueDescription: 'Dropped phone on road. Touch is working, only outer glass is cracked.',
      estimatedCost: 14000,
      preferredDate: '2026-08-23',
      status: 'Repairing',
      technicianNotes: 'Original OCA glass lamination in progress in dust-free chamber.'
    }
  ],
  tradeIns: [
    {
      id: 'tin-1',
      requestNumber: 'TIN-2026-000012',
      createdAt: '2026-08-21T16:00:00Z',
      customerName: 'Ahsan Raza',
      phone: '0305-1234567',
      city: 'Multan',
      brand: 'Apple',
      model: 'iPhone 13',
      storage: '128GB',
      condition: 'Like New',
      ptaApproved: true,
      boxAndAccessories: true,
      batteryHealth: '88%',
      estimatedValue: 140000,
      offeredPrice: 142000,
      status: 'Offer Made',
      notes: 'Clean phone, original charger included.'
    }
  ],
  installments: [
    {
      id: 'ins-1',
      requestNumber: 'INS-2026-000008',
      createdAt: '2026-08-22T09:15:00Z',
      productId: 'prod-4',
      productTitle: 'Infinix Note 40 Pro (12GB/256GB)',
      variantInfo: 'Vintage Green - 256GB',
      productPrice: 69999,
      downPayment: 25000,
      tenureMonths: 6,
      monthlyInstallment: 8400,
      applicantName: 'Tariq Munir',
      phone: '0308-4455667',
      city: 'Multan',
      monthlyIncome: 75000,
      occupation: 'Government Teacher',
      status: 'Verification Call'
    }
  ],
  warrantyRecords: sampleWarrantyRecords,
  reviews: sampleReviews,
  questions: sampleQuestions,
  coupons: sampleCoupons,
  messages: [
    {
      id: 'msg-1',
      createdAt: '2026-08-21T10:00:00Z',
      name: 'Noman Bashir',
      phone: '0300-1122334',
      email: 'noman@gmail.com',
      subject: 'Inquiry regarding wholesale prices for shop in Vehari',
      message: 'Assalam-o-Alaikum, I have a mobile accessories retail shop in Vehari. Do you offer wholesale carton pricing for Anker chargers and Baseus cables?',
      read: false
    }
  ],
  blogs: sampleBlogPosts,
  settings: siteConfig,
  users: [
    {
      id: 'usr-admin',
      name: 'Al-Mushtaq Admin',
      email: 'admin@almushtaqmobiles.pk',
      phone: '0300-0600956',
      role: 'admin'
    },
    {
      id: 'usr-cust-1',
      name: 'Muhammad Arslan',
      email: 'customer@gmail.com',
      phone: '0301-7654321',
      role: 'customer'
    }
  ],
  counters: {
    orderNumber: 102,
    repairTicket: 46,
    tradeIn: 13,
    installment: 9
  }
};

// Persistence helper
let db: DBState = { ...defaultState };

function loadDB(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      db = { ...defaultState, ...parsed };
      // Ensure seed products are always rich & up to date
      if (!db.products || db.products.length < initialProducts.length) {
        db.products = initialProducts;
      }
    } else {
      saveDB();
    }
  } catch (err) {
    console.error('Error loading db file, using in-memory defaults:', err);
    db = { ...defaultState };
  }
}

function saveDB(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving db file:', err);
  }
}

loadDB();

// ---------------- REST API ROUTES ----------------

// Products
app.get('/api/products', (req: Request, res: Response) => {
  let result = [...db.products];
  const { category, brand, condition, ptaStatus, search, minPrice, maxPrice, sort, featured, dealOfTheDay } = req.query;

  if (category && category !== 'all') {
    result = result.filter(p => p.category.toLowerCase() === String(category).toLowerCase());
  }

  if (brand && brand !== 'all') {
    result = result.filter(p => p.brand.toLowerCase() === String(brand).toLowerCase());
  }

  if (condition && condition !== 'all') {
    result = result.filter(p => p.condition.toLowerCase() === String(condition).toLowerCase());
  }

  if (ptaStatus && ptaStatus !== 'all') {
    result = result.filter(p => p.ptaStatus.toLowerCase() === String(ptaStatus).toLowerCase());
  }

  if (search) {
    const q = String(search).toLowerCase().trim();
    result = result.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (minPrice) {
    result = result.filter(p => p.basePrice >= Number(minPrice));
  }

  if (maxPrice) {
    result = result.filter(p => p.basePrice <= Number(maxPrice));
  }

  if (featured === 'true') {
    result = result.filter(p => p.featured);
  }

  if (dealOfTheDay === 'true') {
    result = result.filter(p => p.dealOfTheDay);
  }

  // Sorting
  if (sort === 'price_asc') {
    result.sort((a, b) => a.basePrice - b.basePrice);
  } else if (sort === 'price_desc') {
    result.sort((a, b) => b.basePrice - a.basePrice);
  } else if (sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'discount') {
    result.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
  } else {
    // Newest / default
    result.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
  }

  res.json({
    success: true,
    total: result.length,
    products: result
  });
});

app.get('/api/products/:slugOrId', (req: Request, res: Response) => {
  const { slugOrId } = req.params;
  const product = db.products.find(p => p.slug === slugOrId || p.id === slugOrId);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, product });
});

// Admin Product Create
app.post('/api/products', (req: Request, res: Response) => {
  const newProduct: Product = {
    id: `prod-${Date.now()}`,
    slug: req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    rating: 5.0,
    reviewsCount: 0,
    inStock: true,
    ...req.body
  };

  db.products.unshift(newProduct);
  saveDB();
  res.status(201).json({ success: true, product: newProduct });
});

// Admin Product Update
app.put('/api/products/:id', (req: Request, res: Response) => {
  const index = db.products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  db.products[index] = { ...db.products[index], ...req.body };
  saveDB();
  res.json({ success: true, product: db.products[index] });
});

// Admin Product Delete
app.delete('/api/products/:id', (req: Request, res: Response) => {
  db.products = db.products.filter(p => p.id !== req.params.id);
  saveDB();
  res.json({ success: true, message: 'Product deleted' });
});

// Categories & Brands
app.get('/api/categories', (_req: Request, res: Response) => {
  res.json({ success: true, categories: db.categories });
});

app.get('/api/brands', (_req: Request, res: Response) => {
  res.json({ success: true, brands: db.brands });
});

// Orders
app.post('/api/orders', (req: Request, res: Response) => {
  const count = db.counters.orderNumber++;
  const orderNumber = `AMM-2026-${String(count).padStart(6, '0')}`;

  const orderData: Order = {
    id: `ord-${Date.now()}`,
    orderNumber,
    createdAt: new Date().toISOString(),
    status: 'Pending',
    paymentStatus: req.body.paymentMethod === 'cod' ? 'pending' : (req.body.paymentProofUrl ? 'verified' : 'pending'),
    ...req.body
  };

  // Inventory auto-decrement
  for (const item of orderData.items) {
    const prod = db.products.find(p => p.id === item.productId);
    if (prod && prod.variants) {
      const variant = prod.variants.find(v => v.id === item.variantId);
      if (variant && variant.stock > 0) {
        variant.stock = Math.max(0, variant.stock - item.quantity);
      }
    }
  }

  db.orders.unshift(orderData);
  saveDB();

  res.status(201).json({ success: true, order: orderData });
});

app.get('/api/orders', (_req: Request, res: Response) => {
  res.json({ success: true, orders: db.orders });
});

app.get('/api/orders/:id', (req: Request, res: Response) => {
  const order = db.orders.find(o => o.id === req.params.id || o.orderNumber === req.params.id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  res.json({ success: true, order });
});

app.get('/api/orders/track/:orderNumber', (req: Request, res: Response) => {
  const { orderNumber } = req.params;
  const { phone } = req.query;

  const order = db.orders.find(o =>
    o.orderNumber.toLowerCase() === orderNumber.toLowerCase() &&
    (!phone || o.customer.phone.replace(/[^0-9]/g, '').includes(String(phone).replace(/[^0-9]/g, '')))
  );

  if (!order) {
    return res.status(404).json({ success: false, message: 'No matching order found. Please verify your order number and phone.' });
  }

  res.json({ success: true, order });
});

app.put('/api/orders/:id/status', (req: Request, res: Response) => {
  const order = db.orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

  const oldStatus = order.status;
  if (req.body.status) order.status = req.body.status;
  if (req.body.trackingNumber) order.trackingNumber = req.body.trackingNumber;
  if (req.body.courierName) order.courierName = req.body.courierName;
  if (req.body.assignedImei) order.assignedImei = req.body.assignedImei;
  if (req.body.paymentStatus) order.paymentStatus = req.body.paymentStatus;
  if (req.body.notes) order.notes = req.body.notes;

  // Restore inventory if cancelled or returned
  if ((req.body.status === 'Cancelled' || req.body.status === 'Returned') && oldStatus !== 'Cancelled' && oldStatus !== 'Returned') {
    for (const item of order.items) {
      const prod = db.products.find(p => p.id === item.productId);
      if (prod && prod.variants) {
        const variant = prod.variants.find(v => v.id === item.variantId);
        if (variant) {
          variant.stock += item.quantity;
        }
      }
    }
  }

  saveDB();
  res.json({ success: true, order });
});

// Repairs
app.post('/api/repairs', (req: Request, res: Response) => {
  const count = db.counters.repairTicket++;
  const ticketNumber = `REP-2026-${String(count).padStart(6, '0')}`;

  const repair: RepairTicket = {
    id: `rep-${Date.now()}`,
    ticketNumber,
    createdAt: new Date().toISOString(),
    status: 'Received',
    ...req.body
  };

  db.repairs.unshift(repair);
  saveDB();
  res.status(201).json({ success: true, repair });
});

app.get('/api/repairs', (_req: Request, res: Response) => {
  res.json({ success: true, repairs: db.repairs });
});

app.get('/api/repairs/track/:ticketNumber', (req: Request, res: Response) => {
  const { ticketNumber } = req.params;
  const repair = db.repairs.find(r => r.ticketNumber.toLowerCase() === ticketNumber.toLowerCase());
  if (!repair) return res.status(404).json({ success: false, message: 'Repair ticket not found' });
  res.json({ success: true, repair });
});

app.put('/api/repairs/:id/status', (req: Request, res: Response) => {
  const repair = db.repairs.find(r => r.id === req.params.id);
  if (!repair) return res.status(404).json({ success: false, message: 'Ticket not found' });

  if (req.body.status) repair.status = req.body.status;
  if (req.body.technicianNotes) repair.technicianNotes = req.body.technicianNotes;
  if (req.body.estimatedCost !== undefined) repair.estimatedCost = req.body.estimatedCost;

  saveDB();
  res.json({ success: true, repair });
});

// Trade-In / Sell Phone
app.post('/api/trade-in', (req: Request, res: Response) => {
  const count = db.counters.tradeIn++;
  const requestNumber = `TIN-2026-${String(count).padStart(6, '0')}`;

  const tradeIn: TradeInRequest = {
    id: `tin-${Date.now()}`,
    requestNumber,
    createdAt: new Date().toISOString(),
    status: 'Submitted',
    ...req.body
  };

  db.tradeIns.unshift(tradeIn);
  saveDB();
  res.status(201).json({ success: true, tradeIn });
});

app.get('/api/trade-in', (_req: Request, res: Response) => {
  res.json({ success: true, tradeIns: db.tradeIns });
});

app.put('/api/trade-in/:id', (req: Request, res: Response) => {
  const item = db.tradeIns.find(t => t.id === req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Trade-in request not found' });

  if (req.body.status) item.status = req.body.status;
  if (req.body.offeredPrice !== undefined) item.offeredPrice = req.body.offeredPrice;
  if (req.body.notes) item.notes = req.body.notes;

  saveDB();
  res.json({ success: true, tradeIn: item });
});

// Installments
app.post('/api/installments', (req: Request, res: Response) => {
  const count = db.counters.installment++;
  const requestNumber = `INS-2026-${String(count).padStart(6, '0')}`;

  const installment: InstallmentRequest = {
    id: `ins-${Date.now()}`,
    requestNumber,
    createdAt: new Date().toISOString(),
    status: 'Pending',
    ...req.body
  };

  db.installments.unshift(installment);
  saveDB();
  res.status(201).json({ success: true, installment });
});

app.get('/api/installments', (_req: Request, res: Response) => {
  res.json({ success: true, installments: db.installments });
});

app.put('/api/installments/:id', (req: Request, res: Response) => {
  const item = db.installments.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Installment request not found' });

  if (req.body.status) item.status = req.body.status;
  saveDB();
  res.json({ success: true, installment: item });
});

// Warranty & IMEI Check
app.get('/api/warranty/check/:query', (req: Request, res: Response) => {
  const { query } = req.params;
  const cleanQ = query.trim().toLowerCase();

  const record = db.warrantyRecords.find(w =>
    w.imei.toLowerCase() === cleanQ ||
    w.orderNumber.toLowerCase() === cleanQ
  );

  if (!record) {
    return res.status(404).json({
      success: false,
      message: 'No official Al-Mushtaq Mobiles warranty record found for this IMEI / Order Number. If purchased recently, please contact our Katchehry Chowk branch.'
    });
  }

  res.json({ success: true, warranty: record });
});

// Coupons
app.get('/api/coupons', (_req: Request, res: Response) => {
  res.json({ success: true, coupons: db.coupons });
});

app.post('/api/coupons/validate', (req: Request, res: Response) => {
  const { code, subtotal } = req.body;
  if (!code) return res.status(400).json({ success: false, message: 'Please provide a coupon code' });

  const coupon = db.coupons.find(c => c.code.toUpperCase() === String(code).trim().toUpperCase() && c.isActive);
  if (!coupon) {
    return res.status(400).json({ success: false, message: 'Invalid or expired coupon code' });
  }

  if (subtotal < coupon.minOrderAmount) {
    return res.status(400).json({
      success: false,
      message: `This coupon requires a minimum cart total of Rs. ${coupon.minOrderAmount.toLocaleString('en-PK')}`
    });
  }

  let discount = 0;
  if (coupon.discountType === 'percentage') {
    discount = Math.round((subtotal * coupon.discountValue) / 100);
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
    }
  } else {
    discount = coupon.discountValue;
  }

  res.json({ success: true, coupon, discount });
});

app.post('/api/coupons', (req: Request, res: Response) => {
  const newCoupon: Coupon = {
    id: `coup-${Date.now()}`,
    code: req.body.code.toUpperCase().trim(),
    discountType: req.body.discountType || 'percentage',
    discountValue: Number(req.body.discountValue),
    minOrderAmount: Number(req.body.minOrderAmount || 0),
    maxDiscount: req.body.maxDiscount ? Number(req.body.maxDiscount) : undefined,
    isActive: true
  };
  db.coupons.push(newCoupon);
  saveDB();
  res.status(201).json({ success: true, coupon: newCoupon });
});

app.delete('/api/coupons/:id', (req: Request, res: Response) => {
  db.coupons = db.coupons.filter(c => c.id !== req.params.id);
  saveDB();
  res.json({ success: true, message: 'Coupon deleted' });
});

// Reviews & Q&A
app.get('/api/reviews/:productId', (req: Request, res: Response) => {
  const reviews = db.reviews.filter(r => r.productId === req.params.productId);
  res.json({ success: true, reviews });
});

app.post('/api/reviews', (req: Request, res: Response) => {
  const newRev: Review = {
    id: `rev-${Date.now()}`,
    productId: req.body.productId,
    author: req.body.author,
    city: req.body.city || 'Multan',
    rating: Number(req.body.rating) || 5,
    comment: req.body.comment,
    createdAt: new Date().toISOString(),
    verifiedPurchase: true
  };

  db.reviews.unshift(newRev);

  // Update product review count & average rating
  const prod = db.products.find(p => p.id === req.body.productId);
  if (prod) {
    const productReviews = db.reviews.filter(r => r.productId === prod.id);
    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    prod.reviewsCount = productReviews.length;
    prod.rating = Number((sum / productReviews.length).toFixed(1));
  }

  saveDB();
  res.status(201).json({ success: true, review: newRev });
});

app.get('/api/questions/:productId', (req: Request, res: Response) => {
  const questions = db.questions.filter(q => q.productId === req.params.productId);
  res.json({ success: true, questions });
});

app.post('/api/questions', (req: Request, res: Response) => {
  const newQ: Question = {
    id: `q-${Date.now()}`,
    productId: req.body.productId,
    question: req.body.question,
    askedBy: req.body.askedBy,
    askedAt: new Date().toISOString()
  };

  db.questions.unshift(newQ);
  saveDB();
  res.status(201).json({ success: true, question: newQ });
});

app.put('/api/questions/:id/answer', (req: Request, res: Response) => {
  const q = db.questions.find(item => item.id === req.params.id);
  if (!q) return res.status(404).json({ success: false, message: 'Question not found' });

  q.answer = req.body.answer;
  q.answeredAt = new Date().toISOString();
  saveDB();
  res.json({ success: true, question: q });
});

// Contact Messages
app.post('/api/contact', (req: Request, res: Response) => {
  const msg: ContactMessage = {
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString(),
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
    read: false
  };

  db.messages.unshift(msg);
  saveDB();
  res.status(201).json({ success: true, message: 'Thank you! Your message has been received by Al-Mushtaq Mobiles.' });
});

app.get('/api/contact', (_req: Request, res: Response) => {
  res.json({ success: true, messages: db.messages });
});

// Blog
app.get('/api/blog', (_req: Request, res: Response) => {
  res.json({ success: true, blogs: db.blogs });
});

app.get('/api/blog/:slug', (req: Request, res: Response) => {
  const blog = db.blogs.find(b => b.slug === req.params.slug);
  if (!blog) return res.status(404).json({ success: false, message: 'Blog post not found' });
  res.json({ success: true, blog });
});

app.post('/api/blog', (req: Request, res: Response) => {
  const newBlog: BlogPost = {
    id: `blog-${Date.now()}`,
    slug: req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    publishedAt: new Date().toISOString().split('T')[0],
    ...req.body
  };
  db.blogs.unshift(newBlog);
  saveDB();
  res.status(201).json({ success: true, blog: newBlog });
});

// Settings
app.get('/api/settings', (_req: Request, res: Response) => {
  res.json({ success: true, settings: db.settings });
});

app.put('/api/settings', (req: Request, res: Response) => {
  db.settings = { ...db.settings, ...req.body };
  saveDB();
  res.json({ success: true, settings: db.settings });
});

// Admin Stats
app.get('/api/admin/stats', (_req: Request, res: Response) => {
  const totalRevenue = db.orders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = db.orders.filter(o => o.status === 'Pending').length;
  const activeRepairs = db.repairs.filter(r => r.status !== 'Delivered' && r.status !== 'Cancelled').length;
  const pendingTradeIns = db.tradeIns.filter(t => t.status === 'Submitted').length;
  const pendingInstallments = db.installments.filter(i => i.status === 'Pending').length;

  // Low stock products (stock <= 3)
  const lowStockItems: { product: string; variant: string; stock: number }[] = [];
  for (const p of db.products) {
    if (p.variants) {
      for (const v of p.variants) {
        if (v.stock <= 3) {
          lowStockItems.push({
            product: p.title,
            variant: `${v.colorName} - ${v.storage}`,
            stock: v.stock
          });
        }
      }
    }
  }

  res.json({
    success: true,
    stats: {
      totalRevenue,
      totalOrders: db.orders.length,
      pendingOrders,
      activeRepairs,
      pendingTradeIns,
      pendingInstallments,
      totalProducts: db.products.length,
      lowStockItems: lowStockItems.slice(0, 10),
      recentOrders: db.orders.slice(0, 8),
      recentRepairs: db.repairs.slice(0, 5)
    }
  });
});

// Auth endpoints
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Admin login check
  if (email === 'admin@almushtaqmobiles.pk' || email === 'admin' || (password === 'admin123' && (email.includes('admin') || email.includes('mushtaq')))) {
    return res.json({
      success: true,
      token: 'admin-jwt-token-' + Date.now(),
      user: {
        id: 'usr-admin',
        name: 'Al-Mushtaq Admin',
        email: 'admin@almushtaqmobiles.pk',
        phone: siteConfig.phoneRaw,
        role: 'admin'
      }
    });
  }

  // Customer match or mock login
  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.json({
      success: true,
      token: 'customer-jwt-token-' + Date.now(),
      user: existing
    });
  }

  // Quick auto-registration for demonstration ease
  const newUser: User = {
    id: `usr-${Date.now()}`,
    name: email.split('@')[0],
    email,
    phone: '0300-0000000',
    role: 'customer'
  };
  db.users.push(newUser);
  saveDB();

  res.json({
    success: true,
    token: 'customer-jwt-token-' + Date.now(),
    user: newUser
  });
});

app.post('/api/auth/register', (req: Request, res: Response) => {
  const { name, email, phone } = req.body;
  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }

  const newUser: User = {
    id: `usr-${Date.now()}`,
    name,
    email,
    phone: phone || '',
    role: 'customer'
  };

  db.users.push(newUser);
  saveDB();

  res.status(201).json({
    success: true,
    token: 'customer-jwt-token-' + Date.now(),
    user: newUser
  });
});

// ---------------- Vite Middleware or Static Fallback ----------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: { port: 24679 }
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Al-Mushtaq Mobiles full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();
