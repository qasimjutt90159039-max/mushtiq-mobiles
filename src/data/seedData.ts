import { Brand, Category, Product, Review, Question, Coupon, BlogPost, WarrantyRecord, FAQ } from '../types';

export const initialCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Smartphones',
    nameUrdu: 'اسمارٹ فونز',
    slug: 'smartphones',
    iconName: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=800&auto=format&fit=crop',
    itemCount: 28,
    description: 'Latest 4G and 5G smartphones from top global brands, 100% genuine and PTA approved.',
  },
  {
    id: 'cat-2',
    name: 'Used / Refurbished Phones',
    nameUrdu: 'استعمال شدہ فونز',
    slug: 'used-refurbished',
    iconName: 'RotateCcw',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
    itemCount: 8,
    description: 'Thoroughly tested and certified pre-owned phones with 7-day shop checking warranty.',
  },
  {
    id: 'cat-3',
    name: 'Feature Phones',
    nameUrdu: 'کی پیڈ موبائل',
    slug: 'feature-phones',
    iconName: 'PhoneCall',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=800&auto=format&fit=crop',
    itemCount: 6,
    description: 'Durable keypad phones with long battery life, loud speakers, and dual SIM support.',
  },
  {
    id: 'cat-4',
    name: 'Tablets',
    nameUrdu: 'ٹیبلیٹس',
    slug: 'tablets',
    iconName: 'Tablet',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop',
    itemCount: 4,
    description: 'High performance tablets for students, digital art, gaming, and business.',
  },
  {
    id: 'cat-5',
    name: 'Smart Watches',
    nameUrdu: 'اسمارٹ واچز',
    slug: 'smart-watches',
    iconName: 'Watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
    itemCount: 6,
    description: 'Bluetooth calling, fitness tracking, AMOLED displays, and long battery life.',
  },
  {
    id: 'cat-6',
    name: 'Earbuds & Headphones',
    nameUrdu: 'ایئربڈز اور ہیڈ فونز',
    slug: 'earbuds-headphones',
    iconName: 'Headphones',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop',
    itemCount: 8,
    description: 'Active noise cancelling wireless earbuds, gaming headsets, and neckbands.',
  },
  {
    id: 'cat-7',
    name: 'Chargers & Cables',
    nameUrdu: 'چارجرز اور کیبلز',
    slug: 'chargers-cables',
    iconName: 'Zap',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800&auto=format&fit=crop',
    itemCount: 7,
    description: 'Fast GaN chargers, PD adapters, Type-C, Lightning, and rugged braided cables.',
  },
  {
    id: 'cat-8',
    name: 'Power Banks',
    nameUrdu: 'پاور بینکس',
    slug: 'power-banks',
    iconName: 'BatteryCharging',
    image: 'https://images.unsplash.com/photo-1609592806969-fa36384f7b60?q=80&w=800&auto=format&fit=crop',
    itemCount: 5,
    description: 'High capacity 10000mAh to 30000mAh fast-charging portable power banks.',
  },
  {
    id: 'cat-9',
    name: 'Phone Cases & Covers',
    nameUrdu: 'کورز اور کیسز',
    slug: 'cases-covers',
    iconName: 'Shield',
    image: 'https://images.unsplash.com/photo-1601593346740-925612772716?q=80&w=800&auto=format&fit=crop',
    itemCount: 6,
    description: 'Shockproof armor cases, luxury silicone covers, and transparent bumper cases.',
  },
  {
    id: 'cat-10',
    name: 'Screen Protectors',
    nameUrdu: 'اسکرین پروٹیکٹرز',
    slug: 'screen-protectors',
    iconName: 'Maximize2',
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=800&auto=format&fit=crop',
    itemCount: 4,
    description: '9D tempered glass, privacy filters, matte gaming glass, and UV glue curved protectors.',
  },
  {
    id: 'cat-11',
    name: 'Bluetooth Speakers',
    nameUrdu: 'اسپیکرز',
    slug: 'bluetooth-speakers',
    iconName: 'Volume2',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop',
    itemCount: 4,
    description: 'Portable waterproof speakers with deep bass for indoor and outdoor entertainment.',
  },
  {
    id: 'cat-12',
    name: 'Memory Cards & Storage',
    nameUrdu: 'میموری کارڈز',
    slug: 'memory-storage',
    iconName: 'HardDrive',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=800&auto=format&fit=crop',
    itemCount: 3,
    description: 'High-speed Class 10 MicroSD cards and dual OTG flash drives.',
  },
  {
    id: 'cat-13',
    name: 'Mobile Accessories',
    nameUrdu: 'موبائل لوازمات',
    slug: 'accessories',
    iconName: 'Layers',
    image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=800&auto=format&fit=crop',
    itemCount: 5,
    description: 'Car phone mounts, ring lights, tripods, gaming triggers, and cleaning kits.',
  },
];

export const initialBrands: Brand[] = [
  { id: 'b-apple', name: 'Apple', slug: 'apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', featured: true, deviceCount: 8 },
  { id: 'b-samsung', name: 'Samsung', slug: 'samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg', featured: true, deviceCount: 12 },
  { id: 'b-xiaomi', name: 'Xiaomi', slug: 'xiaomi', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg', featured: true, deviceCount: 9 },
  { id: 'b-infinix', name: 'Infinix', slug: 'infinix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Infinix_logo.png', featured: true, deviceCount: 6 },
  { id: 'b-tecno', name: 'Tecno', slug: 'tecno', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Tecno_Mobile_logo.png', featured: true, deviceCount: 5 },
  { id: 'b-oppo', name: 'Oppo', slug: 'oppo', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/OPPO_Logo.svg', featured: true, deviceCount: 6 },
  { id: 'b-vivo', name: 'Vivo', slug: 'vivo', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Vivo_mobile_logo.png', featured: true, deviceCount: 6 },
  { id: 'b-realme', name: 'Realme', slug: 'realme', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Realme_logo.svg', featured: true, deviceCount: 5 },
  { id: 'b-huawei', name: 'Huawei', slug: 'huawei', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Huawei_Logo.svg', featured: false, deviceCount: 3 },
  { id: 'b-nokia', name: 'Nokia', slug: 'nokia', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Nokia_wordmark.svg', featured: false, deviceCount: 4 },
  { id: 'b-itel', name: 'Itel', slug: 'itel', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Itel_Mobile_logo.png', featured: false, deviceCount: 3 },
  { id: 'b-anker', name: 'Anker', slug: 'anker', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Anker_logo.svg', featured: true, deviceCount: 6 },
  { id: 'b-oraimo', name: 'Oraimo', slug: 'oraimo', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Oraimo_Logo.png', featured: true, deviceCount: 6 },
  { id: 'b-baseus', name: 'Baseus', slug: 'baseus', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Baseus_logo.svg', featured: true, deviceCount: 5 },
];

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    title: 'Apple iPhone 15 Pro Max 256GB - PTA Approved',
    slug: 'apple-iphone-15-pro-max',
    brand: 'Apple',
    category: 'smartphones',
    condition: 'New',
    ptaStatus: 'PTA Approved',
    basePrice: 445000,
    originalPrice: 475000,
    discountPercentage: 6,
    rating: 4.9,
    reviewsCount: 34,
    inStock: true,
    featured: true,
    bestSeller: true,
    dealOfTheDay: true,
    dealEndsAt: new Date(Date.now() + 86400000 * 2).toISOString(),
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1695048133036-9b59b37a5be5?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop',
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.',
    keyFeatures: [
      'Aerospace-Grade Natural & Blue Titanium Design',
      'A17 Pro 3nm Processor with Pro-Class GPU',
      '48MP Main Camera + 5x Telephoto Optical Zoom',
      '6.7-inch Super Retina XDR OLED with ProMotion 120Hz',
      'Official PTA Approved by Customs and Ministry of IT'
    ],
    specs: {
      display: '6.7-inch Super Retina XDR OLED, 120Hz ProMotion, 2000 nits peak',
      chipset: 'Apple A17 Pro (3 nm)',
      ram: '8GB',
      storage: '256GB / 512GB NVMe',
      camera: 'Triple: 48MP Main + 12MP 5x Telephoto + 12MP Ultra-wide, 12MP Selfie',
      battery: '4422 mAh, 50% in 30 mins fast charge, MagSafe 15W',
      os: 'iOS 17 (Upgradable to iOS 18)',
      network: '5G Sub-6GHz and mmWave',
      sim: 'Nano-SIM and eSIM',
      ptaStatus: 'PTA Approved',
      warranty: '1 Year Apple Official International + 7 Days Shop Replacement',
      weight: '221 g',
      dimensions: '159.9 x 76.7 x 8.25 mm'
    },
    variants: [
      { id: 'v1-nat-256', colorName: 'Natural Titanium', colorHex: '#9E978E', storage: '256GB', ram: '8GB', price: 445000, originalPrice: 475000, sku: 'APL-15PM-NAT-256', stock: 5 },
      { id: 'v1-blu-256', colorName: 'Blue Titanium', colorHex: '#2E3842', storage: '256GB', ram: '8GB', price: 445000, originalPrice: 475000, sku: 'APL-15PM-BLU-256', stock: 3 },
      { id: 'v1-blk-512', colorName: 'Black Titanium', colorHex: '#1F2022', storage: '512GB', ram: '8GB', price: 498000, originalPrice: 525000, sku: 'APL-15PM-BLK-512', stock: 2 }
    ],
    warrantyMonths: 12,
    tags: ['apple', 'iphone', 'flagship', '5g', 'titanium', 'deal']
  },
  {
    id: 'prod-2',
    title: 'Samsung Galaxy S24 Ultra 5G (12GB/256GB) - PTA Approved',
    slug: 'samsung-galaxy-s24-ultra',
    brand: 'Samsung',
    category: 'smartphones',
    condition: 'New',
    ptaStatus: 'PTA Approved',
    basePrice: 395000,
    originalPrice: 420000,
    discountPercentage: 6,
    rating: 4.8,
    reviewsCount: 29,
    inStock: true,
    featured: true,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000&auto=format&fit=crop',
    description: 'Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity and productivity with built-in S Pen.',
    keyFeatures: [
      'Galaxy AI: Circle to Search, Live Call Translation, Note Assist',
      'Titanium Frame with Corning Gorilla Armor Anti-Reflective Glass',
      '200MP Quad Tele System with 5x & 10x Optical Quality Zoom',
      'Snapdragon 8 Gen 3 for Galaxy Processor',
      'Integrated S Pen Stylus'
    ],
    specs: {
      display: '6.8-inch Dynamic LTPO AMOLED 2X, 120Hz, HDR10+, 2600 nits',
      chipset: 'Qualcomm Snapdragon 8 Gen 3 (4 nm)',
      ram: '12GB',
      storage: '256GB / 512GB UFS 4.0',
      camera: '200MP Main + 50MP 5x Periscope + 10MP 3x Telephoto + 12MP Ultrawide',
      battery: '5000 mAh, 45W wired, 15W wireless',
      os: 'Android 14 with One UI 6.1 (7 Years OS Updates)',
      network: '5G Dual SIM',
      sim: 'Dual Nano-SIM + eSIM',
      ptaStatus: 'PTA Approved',
      warranty: '1 Year Samsung Pakistan Official Warranty',
      weight: '232 g'
    },
    variants: [
      { id: 'v2-gry-256', colorName: 'Titanium Gray', colorHex: '#727476', storage: '256GB', ram: '12GB', price: 395000, originalPrice: 420000, sku: 'SAM-S24U-GRY-256', stock: 6 },
      { id: 'v2-blk-256', colorName: 'Titanium Black', colorHex: '#252627', storage: '256GB', ram: '12GB', price: 395000, originalPrice: 420000, sku: 'SAM-S24U-BLK-256', stock: 4 },
      { id: 'v2-ylw-512', colorName: 'Titanium Yellow', colorHex: '#DDD5B5', storage: '512GB', ram: '12GB', price: 445000, sku: 'SAM-S24U-YLW-512', stock: 2 }
    ],
    warrantyMonths: 12,
    tags: ['samsung', 'galaxy', 'spen', 'flagship', 'ai', '5g']
  },
  {
    id: 'prod-3',
    title: 'Xiaomi Redmi Note 13 Pro+ 5G (12GB/512GB)',
    slug: 'xiaomi-redmi-note-13-pro-plus',
    brand: 'Xiaomi',
    category: 'smartphones',
    condition: 'New',
    ptaStatus: 'PTA Approved',
    basePrice: 134999,
    originalPrice: 144999,
    discountPercentage: 7,
    rating: 4.7,
    reviewsCount: 42,
    inStock: true,
    featured: true,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop',
    description: 'Iconic curved AMOLED screen, groundbreaking 200MP camera with OIS, and blindingly fast 120W HyperCharge that hits 100% in just 19 minutes.',
    keyFeatures: [
      '200MP Ultra-Clear Camera with OIS & 4X In-Sensor Zoom',
      '120W HyperCharge - 100% Charge in 19 mins',
      '1.5K 120Hz Curved CrystalRes AMOLED Display',
      'MediaTek Dimensity 7200-Ultra 4nm Processor',
      'IP68 Water & Dust Resistance'
    ],
    specs: {
      display: '6.67-inch Curved 1.5K AMOLED, 120Hz, Dolby Vision, 1800 nits',
      chipset: 'MediaTek Dimensity 7200-Ultra (4 nm)',
      ram: '12GB LPDDR5',
      storage: '512GB UFS 3.1',
      camera: '200MP Main OIS + 8MP Ultrawide + 2MP Macro, 16MP Front',
      battery: '5000 mAh, 120W Wired Charger included in box',
      os: 'MIUI 14 based on Android 13 (HyperOS Ready)',
      network: '5G Dual SIM',
      sim: 'Dual Nano-SIM',
      ptaStatus: 'PTA Approved',
      warranty: '1 Year Xiaomi Pakistan Warranty',
      weight: '204 g'
    },
    variants: [
      { id: 'v3-blk-512', colorName: 'Midnight Black', colorHex: '#1B1C1E', storage: '512GB', ram: '12GB', price: 134999, originalPrice: 144999, sku: 'XIA-RN13P-BLK-512', stock: 8 },
      { id: 'v3-prp-512', colorName: 'Aurora Purple', colorHex: '#B2A4D4', storage: '512GB', ram: '12GB', price: 134999, originalPrice: 144999, sku: 'XIA-RN13P-PRP-512', stock: 5 }
    ],
    warrantyMonths: 12,
    tags: ['xiaomi', 'redmi', '200mp', '120w', 'curved', '5g']
  },
  {
    id: 'prod-4',
    title: 'Infinix Note 40 Pro (12GB/256GB) - 70W FastCharge',
    slug: 'infinix-note-40-pro',
    brand: 'Infinix',
    category: 'smartphones',
    condition: 'New',
    ptaStatus: 'PTA Approved',
    basePrice: 69999,
    originalPrice: 74999,
    discountPercentage: 7,
    rating: 4.6,
    reviewsCount: 51,
    inStock: true,
    featured: true,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop',
    description: 'Featuring 70W All-Round FastCharge 2.0 with 20W Wireless MagCharge, 3D curved 120Hz AMOLED display, and 108MP Super-Zoom Camera.',
    keyFeatures: [
      '70W All-Round FastCharge 2.0 + 20W Wireless MagCharge',
      '3D-Curved 120Hz AMOLED with Corning Gorilla Glass',
      '108MP OIS Super-Zoom Camera System',
      'Active Halo AI Lighting Notification System',
      'JBL Dual Speakers for Immersive Audio'
    ],
    specs: {
      display: '6.78-inch 3D Curved AMOLED, 120Hz, 1300 nits peak',
      chipset: 'MediaTek Helio G99 Ultimate (6nm)',
      ram: '12GB + 12GB Extended RAM',
      storage: '256GB UFS 2.2',
      camera: '108MP Main OIS + 2MP Macro + 2MP Depth, 32MP Selfie',
      battery: '5000 mAh with 70W wired & 20W magnetic wireless',
      os: 'XOS 14 based on Android 14',
      network: '4G LTE Dual SIM',
      sim: 'Dual Nano-SIM',
      ptaStatus: 'PTA Approved',
      warranty: '1 Year Carlcare Official Brand Warranty',
      weight: '190 g'
    },
    variants: [
      { id: 'v4-grn-256', colorName: 'Vintage Green', colorHex: '#4E6B56', storage: '256GB', ram: '12GB', price: 69999, originalPrice: 74999, sku: 'INF-N40P-GRN-256', stock: 12 },
      { id: 'v4-gld-256', colorName: 'Titan Gold', colorHex: '#D8B87C', storage: '256GB', ram: '12GB', price: 69999, originalPrice: 74999, sku: 'INF-N40P-GLD-256', stock: 7 }
    ],
    warrantyMonths: 12,
    tags: ['infinix', 'note40', 'wireless-charge', 'jbl', 'curved', '4g']
  },
  {
    id: 'prod-5',
    title: 'Samsung Galaxy A15 (6GB/128GB) - Super AMOLED 90Hz',
    slug: 'samsung-galaxy-a15',
    brand: 'Samsung',
    category: 'smartphones',
    condition: 'New',
    ptaStatus: 'PTA Approved',
    basePrice: 47999,
    originalPrice: 51999,
    discountPercentage: 8,
    rating: 4.5,
    reviewsCount: 68,
    inStock: true,
    featured: false,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1567581935884-3349723552ca?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?q=80&w=1000&auto=format&fit=crop',
    description: 'Vibrant 6.5-inch Super AMOLED screen with Vision Booster, 50MP triple camera, and dependable 5000mAh battery with 4 OS upgrades guaranteed.',
    keyFeatures: [
      '6.5-inch FHD+ Super AMOLED 90Hz Display',
      '50MP Main Camera with Ultra-Wide and Macro Lenses',
      'MediaTek Helio G99 Octa-core Processor',
      '5000mAh Battery with 25W Fast Charging',
      '4 Years of Android OS Upgrades Guaranteed'
    ],
    specs: {
      display: '6.5-inch Super AMOLED, 90Hz, 800 nits (HBM)',
      chipset: 'MediaTek Helio G99 (6 nm)',
      ram: '6GB',
      storage: '128GB (expandable via MicroSD up to 1TB)',
      camera: '50MP Main + 5MP Ultra-wide + 2MP Macro, 13MP Front',
      battery: '5000 mAh with 25W Fast Charge support',
      os: 'Android 14 with One UI 6.0',
      network: '4G LTE Dual SIM',
      sim: 'Hybrid Dual SIM',
      ptaStatus: 'PTA Approved',
      warranty: '1 Year Official Samsung Pakistan Warranty',
      weight: '200 g'
    },
    variants: [
      { id: 'v5-blu-128', colorName: 'Blue Black', colorHex: '#1B2430', storage: '128GB', ram: '6GB', price: 47999, originalPrice: 51999, sku: 'SAM-A15-BLU-128', stock: 15 },
      { id: 'v5-lgt-128', colorName: 'Light Blue', colorHex: '#A2C4D9', storage: '128GB', ram: '6GB', price: 47999, originalPrice: 51999, sku: 'SAM-A15-LGT-128', stock: 9 }
    ],
    warrantyMonths: 12,
    tags: ['samsung', 'budget', 'amoled', '4g', 'long-battery']
  },
  {
    id: 'prod-6',
    title: 'Xiaomi Redmi 13C (6GB/128GB) - 50MP AI Camera',
    slug: 'xiaomi-redmi-13c',
    brand: 'Xiaomi',
    category: 'smartphones',
    condition: 'New',
    ptaStatus: 'PTA Approved',
    basePrice: 29999,
    originalPrice: 32999,
    discountPercentage: 9,
    rating: 4.4,
    reviewsCount: 82,
    inStock: true,
    featured: false,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1000&auto=format&fit=crop',
    description: 'Smooth 6.74-inch 90Hz display with Corning Gorilla Glass, 50MP ultra-clear triple camera, and sleek flat-frame design.',
    keyFeatures: [
      '6.74-inch Immersive 90Hz Display',
      '50MP Ultra-clear AI Triple Camera',
      'MediaTek Helio G85 Octa-Core Processor',
      'Massive 5000mAh Battery with 18W Type-C Fast Charging',
      'Side Fingerprint Sensor'
    ],
    specs: {
      display: '6.74-inch Dot Drop display, 90Hz, 600 nits peak',
      chipset: 'MediaTek Helio G85 (12nm)',
      ram: '6GB + 6GB Virtual RAM',
      storage: '128GB (Expandable up to 1TB)',
      camera: '50MP Primary + 2MP Macro + Auxiliary lens, 8MP Front',
      battery: '5000 mAh with Type-C charging',
      os: 'MIUI 14 for POCO / Redmi based on Android 13',
      network: '4G LTE Dual SIM',
      sim: 'Triple slot (Dual SIM + MicroSD)',
      ptaStatus: 'PTA Approved',
      warranty: '1 Year Xiaomi Pakistan Warranty',
      weight: '192 g'
    },
    variants: [
      { id: 'v6-blk-128', colorName: 'Midnight Black', colorHex: '#1F2022', storage: '128GB', ram: '6GB', price: 29999, originalPrice: 32999, sku: 'XIA-R13C-BLK-128', stock: 18 },
      { id: 'v6-grn-128', colorName: 'Clover Green', colorHex: '#7C9A86', storage: '128GB', ram: '6GB', price: 29999, originalPrice: 32999, sku: 'XIA-R13C-GRN-128', stock: 10 }
    ],
    warrantyMonths: 12,
    tags: ['xiaomi', 'budget', 'under-30k', '4g', '50mp']
  },
  {
    id: 'prod-7',
    title: 'Tecno Spark 20 (8GB/256GB) - Dual DTS Stereo Speakers',
    slug: 'tecno-spark-20',
    brand: 'Tecno',
    category: 'smartphones',
    condition: 'New',
    ptaStatus: 'PTA Approved',
    basePrice: 32999,
    originalPrice: 35999,
    discountPercentage: 8,
    rating: 4.5,
    reviewsCount: 39,
    inStock: true,
    featured: false,
    bestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1000&auto=format&fit=crop',
    description: 'Massive 256GB storage, 32MP glowing selfie camera with dual flash, and stereo dual speakers with DTS sound.',
    keyFeatures: [
      'Huge 256GB ROM + 16GB RAM (8GB+8GB Extended)',
      '32MP Glowing Selfie with Micro-slit Dual Flash',
      'Dual DTS Stereo Speakers with 400% Volume Boost',
      'Dynamic Port Interactive Notification Island',
      'IP53 Dust & Water Resistance'
    ],
    specs: {
      display: '6.56-inch 90Hz Hole-Screen Display',
      chipset: 'MediaTek Helio G85 Gaming Processor',
      ram: '8GB',
      storage: '256GB',
      camera: '50MP Ultra Clear + AI Lens, 32MP Front Camera',
      battery: '5000 mAh with 18W Fast Charging',
      os: 'HiOS based on Android 13',
      network: '4G LTE Dual SIM',
      sim: 'Dual Nano-SIM',
      ptaStatus: 'PTA Approved',
      warranty: '13 Months Official Carlcare Warranty',
      weight: '190 g'
    },
    variants: [
      { id: 'v7-blk-256', colorName: 'Gravity Black', colorHex: '#1B1C1D', storage: '256GB', ram: '8GB', price: 32999, originalPrice: 35999, sku: 'TEC-SP20-BLK-256', stock: 14 },
      { id: 'v7-wht-256', colorName: 'Cyber White', colorHex: '#EAEAEA', storage: '256GB', ram: '8GB', price: 32999, originalPrice: 35999, sku: 'TEC-SP20-WHT-256', stock: 8 }
    ],
    warrantyMonths: 13,
    tags: ['tecno', 'spark', '256gb', 'budget', '4g']
  },
  {
    id: 'prod-8',
    title: 'Vivo V30 5G (12GB/256GB) - Aura Light Portrait',
    slug: 'vivo-v30-5g',
    brand: 'Vivo',
    category: 'smartphones',
    condition: 'New',
    ptaStatus: 'PTA Approved',
    basePrice: 139999,
    originalPrice: 149999,
    discountPercentage: 7,
    rating: 4.8,
    reviewsCount: 31,
    inStock: true,
    featured: true,
    bestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop',
    description: 'Studio-level portrait photography with intelligent Aura Light 2.0, 3D curved 1.5K 120Hz display, and ultra-slim 7.45mm body.',
    keyFeatures: [
      'Smart Color Temperature Aura Light Portrait System',
      '50MP VCS True Color Main OIS + 50MP AF Ultra-Wide',
      '50MP Group Selfie Camera with Eye Autofocus',
      'Qualcomm Snapdragon 7 Gen 3 (4nm)',
      '5000mAh Battery with 80W FlashCharge in 7.45mm Thin Body'
    ],
    specs: {
      display: '6.78-inch 3D Curved 1.5K AMOLED, 120Hz, 2800 nits peak',
      chipset: 'Qualcomm Snapdragon 7 Gen 3 (4 nm)',
      ram: '12GB LPDDR4X',
      storage: '256GB UFS 2.2',
      camera: '50MP OIS Main + 50MP Ultra-Wide, 50MP AF Selfie',
      battery: '5000 mAh with 80W FlashCharge (0-100% in 48 mins)',
      os: 'Funtouch OS 14 based on Android 14',
      network: '5G Dual SIM',
      sim: 'Dual Nano-SIM',
      ptaStatus: 'PTA Approved',
      warranty: '1 Year Official Vivo Pakistan Warranty',
      weight: '186 g'
    },
    variants: [
      { id: 'v8-wht-256', colorName: 'Waving Aqua', colorHex: '#7BBFC4', storage: '256GB', ram: '12GB', price: 139999, originalPrice: 149999, sku: 'VIV-V30-AQU-256', stock: 6 },
      { id: 'v8-blk-256', colorName: 'Noble Black', colorHex: '#222325', storage: '256GB', ram: '12GB', price: 139999, originalPrice: 149999, sku: 'VIV-V30-BLK-256', stock: 5 }
    ],
    warrantyMonths: 12,
    tags: ['vivo', 'aura-light', '5g', 'slim', 'portrait', 'camera']
  },
  {
    id: 'prod-9',
    title: 'Apple iPhone 12 Pro Max 128GB (Used - Like New, 92% Battery)',
    slug: 'apple-iphone-12-pro-max-used',
    brand: 'Apple',
    category: 'used-refurbished',
    condition: 'Used',
    ptaStatus: 'PTA Approved',
    basePrice: 158000,
    originalPrice: 170000,
    discountPercentage: 7,
    rating: 4.8,
    reviewsCount: 19,
    inStock: true,
    featured: true,
    bestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=1000&auto=format&fit=crop',
    description: 'Certified pre-owned iPhone 12 Pro Max in pristine condition. Official PTA tax paid with customs slip. 92% original battery health, tested across 32 hardware points.',
    keyFeatures: [
      'Official PTA Approved (Documented & Verified on 8484)',
      '92% Genuine Apple Battery Health',
      'No Scratch or Dent on Frame or Screen',
      '7-Day Return / Replacement Checking Warranty from Multan Shop',
      'Comes with High Quality Charging Cable'
    ],
    specs: {
      display: '6.7-inch Super Retina XDR OLED, HDR10, Ceramic Shield',
      chipset: 'Apple A14 Bionic (5 nm)',
      ram: '6GB',
      storage: '128GB',
      camera: 'Triple 12MP (Wide + Telephoto + Ultrawide) + LiDAR scanner',
      battery: '3687 mAh, 92% Health remaining',
      os: 'iOS 17.5 compatible',
      network: '5G Single Physical SIM + eSIM',
      sim: 'Nano-SIM + eSIM',
      ptaStatus: 'PTA Approved',
      warranty: '7 Days Al-Mushtaq Shop Checking Warranty'
    },
    variants: [
      { id: 'v9-blu-128', colorName: 'Pacific Blue', colorHex: '#2A4456', storage: '128GB', ram: '6GB', price: 158000, originalPrice: 170000, sku: 'APL-12PM-USE-128', stock: 2 }
    ],
    warrantyMonths: 1,
    tags: ['apple', 'used', 'refurbished', 'pta-approved', 'pro-max']
  },
  {
    id: 'prod-10',
    title: 'Samsung Galaxy S22 Ultra 5G 256GB (Used - Flawless Condition)',
    slug: 'samsung-galaxy-s22-ultra-used',
    brand: 'Samsung',
    category: 'used-refurbished',
    condition: 'Used',
    ptaStatus: 'PTA Approved',
    basePrice: 165000,
    originalPrice: 180000,
    discountPercentage: 8,
    rating: 4.7,
    reviewsCount: 14,
    inStock: true,
    featured: false,
    bestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000&auto=format&fit=crop',
    description: 'Pre-owned Samsung Galaxy S22 Ultra with intact S Pen, original display, 108MP camera, official PTA approval and zero burn-in.',
    keyFeatures: [
      'Official PTA Approved Dual SIM',
      'Built-in S Pen Stylus Included',
      '108MP Quad Camera with 100x Space Zoom',
      '12GB RAM / 256GB Storage',
      '7 Days Shop Replacement Warranty'
    ],
    specs: {
      display: '6.8-inch Dynamic AMOLED 2X, 120Hz, 1750 nits',
      chipset: 'Snapdragon 8 Gen 1 (4 nm)',
      ram: '12GB',
      storage: '256GB',
      camera: '108MP + 10MP 10x Periscope + 10MP 3x + 12MP Ultra-wide, 40MP Selfie',
      battery: '5000 mAh with 45W Fast Charging support',
      os: 'Android 14 with One UI 6.1 (Galaxy AI enabled)',
      network: '5G Dual SIM',
      sim: 'Dual Nano-SIM',
      ptaStatus: 'PTA Approved',
      warranty: '7 Days Al-Mushtaq Shop Checking Warranty'
    },
    variants: [
      { id: 'v10-bur-256', colorName: 'Burgundy', colorHex: '#4E212D', storage: '256GB', ram: '12GB', price: 165000, sku: 'SAM-S22U-USE-256', stock: 2 }
    ],
    warrantyMonths: 1,
    tags: ['samsung', 's22-ultra', 'used', 'pta-approved']
  },
  {
    id: 'prod-11',
    title: 'Nokia 105 4G Dual SIM (Feature Phone) - Wireless FM & Torch',
    slug: 'nokia-105-4g',
    brand: 'Nokia',
    category: 'feature-phones',
    condition: 'New',
    ptaStatus: 'PTA Approved',
    basePrice: 4899,
    originalPrice: 5499,
    discountPercentage: 11,
    rating: 4.6,
    reviewsCount: 114,
    inStock: true,
    featured: false,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop',
    description: 'Clear HD voice calling with 4G VoLTE, long-lasting battery, built-in wireless FM radio, and bright LED torchlight.',
    keyFeatures: [
      '4G VoLTE High Definition Voice Calling',
      'Wireless FM Radio with no headset required',
      'Built-in Powerful LED Flashlight Torch',
      '1450mAh Battery with Days of Standby',
      'Official PTA Approved Dual SIM'
    ],
    specs: {
      display: '1.8-inch QQVGA Color Display',
      chipset: 'Unisoc T107',
      ram: '48MB',
      storage: '128MB (Store up to 2000 contacts & 500 SMS)',
      camera: 'No camera (Office / Security Compliant)',
      battery: '1450 mAh Removable Li-Ion',
      os: 'Series 30+',
      network: '4G VoLTE Dual SIM',
      sim: 'Dual Mini-SIM',
      ptaStatus: 'PTA Approved',
      warranty: '1 Year Advance Telecom Official Warranty'
    },
    variants: [
      { id: 'v11-blu', colorName: 'Ocean Blue', colorHex: '#1E4369', storage: '128MB', price: 4899, originalPrice: 5499, sku: 'NOK-105-4G-BLU', stock: 35 },
      { id: 'v11-blk', colorName: 'Charcoal Black', colorHex: '#252627', storage: '128MB', price: 4899, originalPrice: 5499, sku: 'NOK-105-4G-BLK', stock: 28 }
    ],
    warrantyMonths: 12,
    tags: ['nokia', 'keypad', '4g', 'feature-phone', 'under-5k']
  },
  {
    id: 'prod-12',
    title: 'Itel Magic 2 4G Keypad Phone (Wi-Fi Hotspot & Big Battery)',
    slug: 'itel-magic-2-4g',
    brand: 'Itel',
    category: 'feature-phones',
    condition: 'New',
    ptaStatus: 'PTA Approved',
    basePrice: 3999,
    originalPrice: 4499,
    discountPercentage: 11,
    rating: 4.4,
    reviewsCount: 78,
    inStock: true,
    featured: false,
    bestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop',
    description: 'Share your 4G internet as a Wi-Fi Hotspot with up to 8 devices. Comes with loud King Voice speaker and Auto Call Recording.',
    keyFeatures: [
      '4G Wi-Fi Hotspot Sharing for up to 8 devices',
      'King Voice Assistant that speaks out caller names',
      '1900mAh Battery with Super Battery Saver Mode',
      'Auto Call Recorder with Memory Card slot',
      'PTA Approved Dual SIM'
    ],
    specs: {
      display: '2.4-inch QVGA Curved Display',
      chipset: 'Unisoc 4G Processor',
      ram: '64MB',
      storage: '128MB (MicroSD up to 64GB supported)',
      camera: 'VGA with Flashlight',
      battery: '1900 mAh Removable Battery',
      os: 'Mocor OS',
      network: '4G LTE Dual SIM',
      sim: 'Dual Standard SIM',
      ptaStatus: 'PTA Approved',
      warranty: '100 Days Replacement + 1 Year Carlcare Warranty'
    },
    variants: [
      { id: 'v12-blk', colorName: 'Black', colorHex: '#1A1A1A', storage: '128MB', price: 3999, sku: 'ITL-M2-BLK', stock: 20 },
      { id: 'v12-blu', colorName: 'Navy Blue', colorHex: '#1D2E49', storage: '128MB', price: 3999, sku: 'ITL-M2-BLU', stock: 15 }
    ],
    warrantyMonths: 12,
    tags: ['itel', 'keypad', 'hotspot', '4g', 'cheap']
  },
  {
    id: 'prod-13',
    title: 'Samsung Galaxy Tab A9+ 11-inch (8GB/128GB) 5G',
    slug: 'samsung-galaxy-tab-a9-plus',
    brand: 'Samsung',
    category: 'tablets',
    condition: 'New',
    ptaStatus: 'PTA Approved',
    basePrice: 69999,
    originalPrice: 76999,
    discountPercentage: 9,
    rating: 4.7,
    reviewsCount: 22,
    inStock: true,
    featured: true,
    bestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop',
    description: 'Immersive 11-inch 90Hz display, Quad Speakers powered by Dolby Atmos, Samsung DeX for PC-like multitasking, and SIM card 5G calling.',
    keyFeatures: [
      '11-inch 90Hz High Refresh Rate Screen',
      'Quad Speakers with Dolby Atmos 3D Surround',
      'Samsung DeX multi-window multitasking',
      'Qualcomm Snapdragon 695 5G Processor',
      'PTA Approved with SIM calling'
    ],
    specs: {
      display: '11.0-inch TFT LCD, 90Hz, 1920 x 1200 pixels',
      chipset: 'Qualcomm Snapdragon 695 5G (6 nm)',
      ram: '8GB',
      storage: '128GB (MicroSD slot up to 1TB)',
      camera: '8MP Rear Camera with AF, 5MP Front Camera',
      battery: '7040 mAh with 15W Fast Charge',
      os: 'Android 14 with One UI 6.0',
      network: '5G LTE with SIM Slot',
      sim: 'Nano-SIM',
      ptaStatus: 'PTA Approved',
      warranty: '1 Year Samsung Pakistan Warranty',
      weight: '480 g'
    },
    variants: [
      { id: 'v13-slv', colorName: 'Silver', colorHex: '#D6D8DC', storage: '128GB', ram: '8GB', price: 69999, originalPrice: 76999, sku: 'SAM-TA9P-SLV', stock: 5 },
      { id: 'v13-gry', colorName: 'Graphite', colorHex: '#393C41', storage: '128GB', ram: '8GB', price: 69999, originalPrice: 76999, sku: 'SAM-TA9P-GRY', stock: 4 }
    ],
    warrantyMonths: 12,
    tags: ['samsung', 'tablet', 'dex', '5g', 'study']
  },
  {
    id: 'prod-14',
    title: 'Oraimo Watch 4 Plus (1.96-inch HD, BT Calling, 100+ Sports)',
    slug: 'oraimo-watch-4-plus',
    brand: 'Oraimo',
    category: 'smartwatches',
    condition: 'New',
    ptaStatus: 'PTA Approved',
    basePrice: 8499,
    originalPrice: 9999,
    discountPercentage: 15,
    rating: 4.6,
    reviewsCount: 47,
    inStock: true,
    featured: false,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
    description: '1.96-inch vivid color screen, Bluetooth calling with high definition microphone and speaker, 7-day battery life, and IP68 waterproof rating.',
    keyFeatures: [
      '1.96-inch HD Big Screen with 500 nits brightness',
      'Wireless Bluetooth Calling with Quick Dial Pad',
      '24/7 Heart Rate, SpO2 & Sleep Tracking',
      '100+ Sports Modes with Automatic Detection',
      'IP68 Dust and Water Resistance'
    ],
    specs: {
      display: '1.96-inch TFT HD (320 x 386 pixels)',
      chipset: 'Realtek BLE 5.2',
      ram: 'Embedded',
      storage: 'Watchfaces storage',
      camera: 'Remote camera shutter trigger',
      battery: '300 mAh (up to 7 days normal usage)',
      os: 'Proprietary OS (Android / iOS app compatible)',
      network: 'Bluetooth 5.2',
      sim: 'No SIM (Tethered Bluetooth Calling)',
      ptaStatus: 'PTA Approved',
      warranty: '1 Year Oraimo Official Warranty'
    },
    variants: [
      { id: 'v14-blk', colorName: 'Obsidian Black', colorHex: '#1B1B1B', storage: 'Std', price: 8499, originalPrice: 9999, sku: 'ORA-W4P-BLK', stock: 18 },
      { id: 'v14-slv', colorName: 'Silver Metal', colorHex: '#C5C6C8', storage: 'Std', price: 8499, originalPrice: 9999, sku: 'ORA-W4P-SLV', stock: 11 }
    ],
    warrantyMonths: 12,
    tags: ['oraimo', 'smartwatch', 'bluetooth-calling', 'fitness']
  },
  {
    id: 'prod-15',
    title: 'Apple AirPods Pro 2 (USB-C MagSafe Case) - 2x Active Noise Cancelling',
    slug: 'apple-airpods-pro-2-usb-c',
    brand: 'Apple',
    category: 'earbuds-headphones',
    condition: 'New',
    ptaStatus: 'PTA Approved',
    basePrice: 64999,
    originalPrice: 72000,
    discountPercentage: 10,
    rating: 4.9,
    reviewsCount: 38,
    inStock: true,
    featured: true,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop',
    description: 'Up to 2x more Active Noise Cancellation, Adaptive Audio that tailors noise control to your environment, and USB-C MagSafe charging case.',
    keyFeatures: [
      'Apple H2 Headphone Processor Chip',
      'Adaptive Audio, Active Noise Cancellation & Transparency Mode',
      'Personalized Spatial Audio with Dynamic Head Tracking',
      'USB-C MagSafe Charging Case with Speaker & Lanyard Loop',
      'IP54 Dust, Sweat, and Water Resistance'
    ],
    specs: {
      display: 'LED Battery Indicator on Case',
      chipset: 'Apple H2 chip, Apple U1 chip in case',
      ram: 'Embedded',
      storage: 'Firmware cache',
      camera: 'N/A',
      battery: 'Up to 6 hours listening with ANC (30 hours with case)',
      os: 'iOS, iPadOS, macOS, Android compatible',
      network: 'Bluetooth 5.3',
      sim: 'None',
      ptaStatus: 'PTA Approved',
      warranty: '1 Year Apple Official International Warranty'
    },
    variants: [
      { id: 'v15-wht', colorName: 'White', colorHex: '#FFFFFF', storage: 'Std', price: 64999, originalPrice: 72000, sku: 'APL-APP2-USBC', stock: 7 }
    ],
    warrantyMonths: 12,
    tags: ['apple', 'airpods', 'anc', 'usbc', 'audio']
  },
  {
    id: 'prod-16',
    title: 'Oraimo FreePods 4 (Active Noise Cancellation, 35.5h Playtime)',
    slug: 'oraimo-freepods-4',
    brand: 'Oraimo',
    category: 'earbuds-headphones',
    condition: 'New',
    ptaStatus: 'PTA Approved',
    basePrice: 7499,
    originalPrice: 8999,
    discountPercentage: 17,
    rating: 4.7,
    reviewsCount: 94,
    inStock: true,
    featured: false,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1000&auto=format&fit=crop',
    description: 'Active Noise Cancellation up to 30dB, 4-mic call noise reduction with HavyBass technology, and custom EQ via Oraimo Sound App.',
    keyFeatures: [
      'Active Noise Cancellation up to 30dB reduction',
      '4-Mic Beamforming Noise Cancellation for Crystal Calls',
      '35.5 Hours Total Playtime with Fast Charge',
      'Low-latency Game Mode (Real-time Audio Sync)',
      'Oraimo Sound App with 5 Preset EQs and Custom Modes'
    ],
    specs: {
      display: 'Case Battery LED Indicator',
      chipset: 'Bespoke High-Fidelity Audio DAC',
      ram: 'N/A',
      storage: 'N/A',
      camera: 'N/A',
      battery: 'Earbud 45mAh, Case 500mAh (35.5 hours total)',
      os: 'Android / iOS App',
      network: 'Bluetooth 5.2',
      sim: 'None',
      ptaStatus: 'PTA Approved',
      warranty: '1 Year Oraimo Official Warranty'
    },
    variants: [
      { id: 'v16-blk', colorName: 'Black', colorHex: '#1E1E1E', storage: 'Std', price: 7499, originalPrice: 8999, sku: 'ORA-FP4-BLK', stock: 24 },
      { id: 'v16-wht', colorName: 'White', colorHex: '#F6F6F6', storage: 'Std', price: 7499, originalPrice: 8999, sku: 'ORA-FP4-WHT', stock: 16 }
    ],
    warrantyMonths: 12,
    tags: ['oraimo', 'freepods', 'anc', 'wireless-earbuds', 'budget']
  },
  {
    id: 'prod-17',
    title: 'Anker 735 Charger (GaNPrime 65W) 3-Port Fast Wall Adapter',
    slug: 'anker-735-ganprime-65w-charger',
    brand: 'Anker',
    category: 'chargers-cables',
    condition: 'New',
    ptaStatus: 'PTA Approved',
    basePrice: 11999,
    originalPrice: 13999,
    discountPercentage: 14,
    rating: 4.9,
    reviewsCount: 45,
    inStock: true,
    featured: true,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=1000&auto=format&fit=crop',
    description: 'Power 3 devices simultaneously with 2 USB-C ports and 1 USB-A port. Fast-charge a phone, smartwatch, and MacBook all at once with GaNPrime.',
    keyFeatures: [
      '65W High-Speed GaNPrime Charging Architecture',
      'Powers 3 Devices Simultaneously (2x Type-C, 1x USB-A)',
      'ActiveShield 2.0 Temperature Monitoring (3M times a day)',
      '53% Smaller than standard original 67W MacBook charger',
      'Compatible with iPhone 15/14/13, Samsung Galaxy S24/S23, Laptops'
    ],
    specs: {
      display: 'None',
      chipset: 'Anker GaNPrime Power Controller',
      ram: 'N/A',
      storage: 'N/A',
      camera: 'N/A',
      battery: 'Wall AC 100-240V Input',
      os: 'Universal Multi-Protocol (PD 3.0, QC 4.0, PPS)',
      network: 'N/A',
      sim: 'None',
      ptaStatus: 'PTA Approved',
      warranty: '18 Months Anker Official Warranty'
    },
    variants: [
      { id: 'v17-blk', colorName: 'Dark Gray', colorHex: '#383B3E', storage: '65W', price: 11999, originalPrice: 13999, sku: 'ANK-735-65W', stock: 12 }
    ],
    warrantyMonths: 18,
    tags: ['anker', 'gan', 'charger', '65w', 'fast-charging']
  },
  {
    id: 'prod-18',
    title: 'Anker 325 Power Bank 20,000mAh (PowerIQ Dual Output)',
    slug: 'anker-325-power-bank-20000mah',
    brand: 'Anker',
    category: 'power-banks',
    condition: 'New',
    ptaStatus: 'PTA Approved',
    basePrice: 8999,
    originalPrice: 10499,
    discountPercentage: 14,
    rating: 4.8,
    reviewsCount: 62,
    inStock: true,
    featured: false,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1609592806969-fa36384f7b60?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1609592806969-fa36384f7b60?q=80&w=1000&auto=format&fit=crop',
    description: 'Enormous 20,000mAh battery capacity delivers more than 4.5 charges for an iPhone 14, or 4 charges for a Samsung Galaxy S23. MultiProtect safety system.',
    keyFeatures: [
      'Massive 20,000mAh Capacity for days of mobile power',
      'Dual USB Output with PowerIQ smart fast device detection',
      'Trickle-Charging Mode for Bluetooth earphones & fitness bands',
      'Anker MultiProtect 11-point safety system against overheating',
      'Sleek matte exterior with cool-blue LED battery level wheel'
    ],
    specs: {
      display: '4-LED Blue Indicator Wheel',
      chipset: 'Anker PowerIQ Intelligent IC',
      ram: 'N/A',
      storage: 'N/A',
      camera: 'N/A',
      battery: '20,000 mAh Li-Polymer Cells',
      os: 'Universal USB / Type-C compatible',
      network: 'N/A',
      sim: 'None',
      ptaStatus: 'PTA Approved',
      warranty: '18 Months Anker Official Warranty'
    },
    variants: [
      { id: 'v18-blk', colorName: 'Matte Black', colorHex: '#1F1F1F', storage: '20000mAh', price: 8999, originalPrice: 10499, sku: 'ANK-325-20K-BLK', stock: 15 },
      { id: 'v18-wht', colorName: 'Pure White', colorHex: '#F2F2F2', storage: '20000mAh', price: 8999, originalPrice: 10499, sku: 'ANK-325-20K-WHT', stock: 9 }
    ],
    warrantyMonths: 18,
    tags: ['anker', 'powerbank', '20000mah', 'portable-charger']
  },
  {
    id: 'prod-19',
    title: 'Baseus 100W USB-C to USB-C Braided Fast Cable 2M (E-Marker Chip)',
    slug: 'baseus-100w-usbc-cable-2m',
    brand: 'Baseus',
    category: 'chargers-cables',
    condition: 'New',
    ptaStatus: 'PTA Approved',
    basePrice: 1699,
    originalPrice: 2199,
    discountPercentage: 23,
    rating: 4.8,
    reviewsCount: 88,
    inStock: true,
    featured: false,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=1000&auto=format&fit=crop',
    description: 'High-density nylon braided cable with zinc alloy connectors and smart E-Marker chip that safely supports 100W (20V/5A) Power Delivery.',
    keyFeatures: [
      '100W Power Delivery (5A High Current)',
      'Integrated E-Marker Smart Chip for device safety',
      'Ultra-Durable High-Density Nylon Braiding (Tested 10,000+ bends)',
      '480Mbps Fast Data Transmission Speed',
      'Generous 2-Meter (6.6ft) Extended Length'
    ],
    specs: {
      display: 'None',
      chipset: 'Certified E-Marker PD 3.0 Chip',
      ram: 'N/A',
      storage: 'N/A',
      camera: 'N/A',
      battery: 'N/A',
      os: 'Universal Type-C devices (iPhone 15, Android, MacBooks)',
      network: 'N/A',
      sim: 'None',
      ptaStatus: 'PTA Approved',
      warranty: '6 Months Brand Warranty'
    },
    variants: [
      { id: 'v19-blk', colorName: 'Braided Black', colorHex: '#222222', storage: '2M', price: 1699, originalPrice: 2199, sku: 'BAS-100W-2M-BLK', stock: 40 }
    ],
    warrantyMonths: 6,
    tags: ['baseus', 'cable', '100w', 'type-c', 'accessories']
  },
  {
    id: 'prod-20',
    title: 'Anker Soundcore Motion+ Bluetooth Speaker (30W Hi-Res Audio, IPX7)',
    slug: 'anker-soundcore-motion-plus',
    brand: 'Anker',
    category: 'bluetooth-speakers',
    condition: 'New',
    ptaStatus: 'PTA Approved',
    basePrice: 24999,
    originalPrice: 28999,
    discountPercentage: 14,
    rating: 4.9,
    reviewsCount: 35,
    inStock: true,
    featured: true,
    bestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1000&auto=format&fit=crop',
    description: 'Breathtaking 30W stereo sound loaded with two ultra-high frequency tweeters, neodymium woofers, and passive radiators with Qualcomm aptX audio.',
    keyFeatures: [
      'Hi-Res Audio Certified with Qualcomm aptX',
      'Huge 30W Sound with BassUp Bass Boost Technology',
      'Ultra-wide frequency range from 50 Hz to 40 kHz',
      'IPX7 Waterproof Casing against spills and rain',
      '12 Hours Non-Stop Music Playtime with 6700mAh battery'
    ],
    specs: {
      display: 'LED Power & Bluetooth Status',
      chipset: 'Qualcomm aptX Bluetooth Audio DSP',
      ram: 'N/A',
      storage: 'N/A',
      camera: 'N/A',
      battery: '6700 mAh (12 Hours continuous playback)',
      os: 'Soundcore App for custom equalizer tuning',
      network: 'Bluetooth 5.0 + 3.5mm AUX input',
      sim: 'None',
      ptaStatus: 'PTA Approved',
      warranty: '18 Months Anker Official Warranty'
    },
    variants: [
      { id: 'v20-blk', colorName: 'Stealth Black', colorHex: '#1B1B1B', storage: '30W', price: 24999, originalPrice: 28999, sku: 'ANK-MOT-PLUS', stock: 6 }
    ],
    warrantyMonths: 18,
    tags: ['anker', 'soundcore', 'speaker', 'hi-res', 'waterproof']
  },
  {
    id: 'prod-21',
    title: 'Premium 9D Tempered Glass Screen Protector (iPhone / Samsung / Redmi)',
    slug: 'premium-9d-tempered-glass',
    brand: 'Al-Mushtaq Mobiles',
    category: 'screen-protectors',
    condition: 'New',
    ptaStatus: 'PTA Approved',
    basePrice: 850,
    originalPrice: 1200,
    discountPercentage: 29,
    rating: 4.8,
    reviewsCount: 140,
    inStock: true,
    featured: false,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=1000&auto=format&fit=crop',
    description: 'Edge-to-edge full glue 9H hardness tempered glass with oleophobic anti-fingerprint nano coating. Free application at our Katchehry Chowk shop!',
    keyFeatures: [
      '9H Surface Hardness Scratch Resistance',
      'True HD 99.9% Optical Transparency',
      'Smooth Oleophobic Nano-Coating repels oil & sweat',
      'Full Adhesive Glue for zero touch delay',
      'Free professional dust-free fitting at Multan shop'
    ],
    specs: {
      display: '0.33mm Japanese Asahi Tempered Glass',
      chipset: 'N/A',
      ram: 'N/A',
      storage: 'N/A',
      camera: 'Clear camera cut-out',
      battery: 'N/A',
      os: 'Universal Models',
      network: 'N/A',
      sim: 'None',
      ptaStatus: 'PTA Approved',
      warranty: 'Fitment Checking Guarantee'
    },
    variants: [
      { id: 'v21-ip15pm', colorName: 'iPhone 15 Pro Max', colorHex: '#333333', storage: 'Standard', price: 850, originalPrice: 1200, sku: 'TG-IP15PM', stock: 50 },
      { id: 'v21-s24u', colorName: 'Galaxy S24 Ultra', colorHex: '#333333', storage: 'Standard', price: 850, originalPrice: 1200, sku: 'TG-S24U', stock: 45 },
      { id: 'v21-a15', colorName: 'Galaxy A15 / A25', colorHex: '#333333', storage: 'Standard', price: 850, originalPrice: 1200, sku: 'TG-A15', stock: 60 }
    ],
    warrantyMonths: 1,
    tags: ['protector', 'tempered-glass', 'accessories', 'screen-shield']
  },
  {
    id: 'prod-22',
    title: 'Luxury Liquid Silicone Soft Case with Microfiber Lining',
    slug: 'luxury-liquid-silicone-case',
    brand: 'Al-Mushtaq Mobiles',
    category: 'cases-covers',
    condition: 'New',
    ptaStatus: 'PTA Approved',
    basePrice: 1200,
    originalPrice: 1600,
    discountPercentage: 25,
    rating: 4.7,
    reviewsCount: 89,
    inStock: true,
    featured: false,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1601593346740-925612772716?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1601593346740-925612772716?q=80&w=1000&auto=format&fit=crop',
    description: 'Baby-skin soft touch premium liquid silicone case featuring an inner soft microfiber cushion that prevents scratches to the phone back.',
    keyFeatures: [
      'Silky Smooth Liquid Silicone Exterior',
      'Inner Soft Velvet Microfiber Anti-Scratch Lining',
      'Raised 1.2mm Lip for Camera & Screen Protection',
      'Easy to wipe clean from dust, ink and dirt',
      'Precise cutouts for speakers, buttons and ports'
    ],
    specs: {
      display: 'N/A',
      chipset: 'N/A',
      ram: 'N/A',
      storage: 'N/A',
      camera: 'Protective Raised Bezel',
      battery: 'Wireless Charging Compatible',
      os: 'Compatible with all devices',
      network: 'N/A',
      sim: 'None',
      ptaStatus: 'PTA Approved',
      warranty: 'Fit Guarantee'
    },
    variants: [
      { id: 'v22-blk', colorName: 'Midnight Black', colorHex: '#1D1E20', storage: 'iPhone 15 Pro Max', price: 1200, originalPrice: 1600, sku: 'CS-SIL-BLK', stock: 25 },
      { id: 'v22-sge', colorName: 'Sage Grey (Brand Special)', colorHex: '#878E88', storage: 'iPhone 15 Pro Max', price: 1200, originalPrice: 1600, sku: 'CS-SIL-SGE', stock: 30 },
      { id: 'v22-blu', colorName: 'Deep Navy', colorHex: '#1B2C42', storage: 'Galaxy S24 Ultra', price: 1200, originalPrice: 1600, sku: 'CS-SIL-NAV', stock: 20 }
    ],
    warrantyMonths: 1,
    tags: ['case', 'silicone', 'cover', 'accessories']
  },
  {
    id: 'prod-23',
    title: 'SanDisk Ultra 128GB MicroSDXC Class 10 (Up to 140MB/s)',
    slug: 'sandisk-ultra-128gb-microsd',
    brand: 'Al-Mushtaq Mobiles',
    category: 'memory-storage',
    condition: 'New',
    ptaStatus: 'PTA Approved',
    basePrice: 2899,
    originalPrice: 3499,
    discountPercentage: 17,
    rating: 4.9,
    reviewsCount: 56,
    inStock: true,
    featured: false,
    bestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop',
    description: 'Original SanDisk Ultra A1 rated microSD card for fast app performance, Full HD video recording, and reliable mobile storage expansion.',
    keyFeatures: [
      'Fast transfer speeds up to 140MB/s',
      'A1-rated performance for faster app launches',
      'Class 10 for smooth Full HD video recording & playback',
      'Waterproof, temperature proof, X-ray proof, and shockproof',
      '100% Original with Verification Hologram'
    ],
    specs: {
      display: 'N/A',
      chipset: 'SanDisk NAND Controller',
      ram: 'N/A',
      storage: '128GB',
      camera: 'Full HD Video Speed',
      battery: 'N/A',
      os: 'Android, Tablets, Security Cameras, Drones',
      network: 'N/A',
      sim: 'None',
      ptaStatus: 'PTA Approved',
      warranty: '5 Years Official Distributor Warranty'
    },
    variants: [
      { id: 'v23-128', colorName: 'Red/Grey', colorHex: '#D12828', storage: '128GB', price: 2899, originalPrice: 3499, sku: 'SD-128GB-ULT', stock: 25 }
    ],
    warrantyMonths: 60,
    tags: ['sandisk', 'memory-card', 'storage', 'microsd']
  },
  {
    id: 'prod-24',
    title: 'Baseus Metal Gravity Car Phone Mount Holder (Air Vent)',
    slug: 'baseus-metal-gravity-car-phone-holder',
    brand: 'Baseus',
    category: 'accessories',
    condition: 'New',
    ptaStatus: 'PTA Approved',
    basePrice: 2650,
    originalPrice: 3200,
    discountPercentage: 17,
    rating: 4.8,
    reviewsCount: 41,
    inStock: true,
    featured: false,
    bestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=1000&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=1000&auto=format&fit=crop',
    description: 'Auto-clamping gravity mechanical linkage crafted from aviation aluminum alloy. Firmly grips your phone on rough roads and speed bumps.',
    keyFeatures: [
      'Auto-Lock Gravity Linkage for quick one-handed operation',
      'Aviation Grade CNC Aluminum Alloy Frame',
      'Upgraded Silicone Chuck protects AC air vents from scratches',
      'Reserved Charging Port cutout for in-car cable connection',
      '360-degree swivel universal ball head'
    ],
    specs: {
      display: 'N/A',
      chipset: 'Mechanical Gravity Gears',
      ram: 'N/A',
      storage: 'N/A',
      camera: 'N/A',
      battery: 'N/A',
      os: 'Fits 4.7-inch to 6.9-inch smartphones',
      network: 'N/A',
      sim: 'None',
      ptaStatus: 'PTA Approved',
      warranty: '6 Months Brand Warranty'
    },
    variants: [
      { id: 'v24-drk', colorName: 'Space Grey', colorHex: '#424548', storage: 'Universal', price: 2650, originalPrice: 3200, sku: 'BAS-GRAV-GRY', stock: 15 }
    ],
    warrantyMonths: 6,
    tags: ['baseus', 'car-mount', 'accessories', 'travel']
  }
];

export const sampleReviews: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    author: 'Malik Zeeshan Tariq',
    city: 'Multan (Gulgasht Colony)',
    rating: 5,
    comment: 'Alhamdulillah received my iPhone 15 Pro Max Natural Titanium directly from their shop at Katchehry Chowk. The phone was 100% genuine sealed pack, verified on PTA DIRBS website. Best price in Multan!',
    createdAt: '2026-08-15T14:22:00Z',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    author: 'Chaudhry Farhan',
    city: 'Khanewal',
    rating: 5,
    comment: 'Ordered online with TCS delivery to Khanewal. Reached within 24 hours in secure bubble-wrapped packaging with original receipt. Very satisfied.',
    createdAt: '2026-08-18T10:15:00Z',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    productId: 'prod-2',
    author: 'Dr. Hamza Bilal',
    city: 'Multan (Nishtar Hospital)',
    rating: 5,
    comment: 'Galaxy S24 Ultra is a beast. Mushtaq Bhai personally guided me through the data transfer and applied the 9D screen protector for free at the shop. Highly recommended!',
    createdAt: '2026-08-20T18:40:00Z',
    verifiedPurchase: true
  },
  {
    id: 'rev-4',
    productId: 'prod-4',
    author: 'Usman Ghani',
    city: 'Bahawalpur',
    rating: 5,
    comment: 'The 70W fast charging on this Infinix Note 40 Pro is unreal! Plus the magnetic wireless charger was included in the box. Excellent service by Al-Mushtaq team.',
    createdAt: '2026-08-22T09:30:00Z',
    verifiedPurchase: true
  }
];

export const sampleQuestions: Question[] = [
  {
    id: 'q-1',
    productId: 'prod-1',
    question: 'Is this physical dual SIM or eSIM version, and is it 100% PTA approved?',
    askedBy: 'Kamran Ali, Multan',
    askedAt: '2026-08-10T12:00:00Z',
    answer: 'Assalam-o-Alaikum Kamran bhai. Yes, this is 100% official PTA approved with Customs tax fully cleared. It supports 1 Physical Nano-SIM + 1 eSIM. You can verify the IMEI on 8484 SMS right inside our shop before buying.',
    answeredAt: '2026-08-10T13:10:00Z'
  },
  {
    id: 'q-2',
    productId: 'prod-2',
    question: 'Do you offer installment plans without bank credit card in Multan?',
    askedBy: 'Saad Rafique',
    askedAt: '2026-08-12T15:20:00Z',
    answer: 'Yes! We have an easy in-house installment plan for Multan residents for 3 to 12 months with basic verification. You can fill out the Installment Request form right on our website.',
    answeredAt: '2026-08-12T16:00:00Z'
  }
];

export const sampleCoupons: Coupon[] = [
  {
    id: 'c-1',
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 2000,
    maxDiscount: 2500,
    isActive: true
  },
  {
    id: 'c-2',
    code: 'MULTANFREE',
    discountType: 'fixed',
    discountValue: 350,
    minOrderAmount: 1500,
    isActive: true
  },
  {
    id: 'c-3',
    code: 'ALMUSHTAQ500',
    discountType: 'fixed',
    discountValue: 500,
    minOrderAmount: 10000,
    isActive: true
  }
];

export const sampleBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'how-to-verify-pta-approved-mobile-phone-dirbs',
    title: 'How to Check if a Mobile Phone is PTA Approved in Pakistan (2026 Guide)',
    excerpt: 'Avoid buying blocked or patched phones. Step-by-step instructions to verify IMEI via SMS 8484 and official PTA DIRBS system before purchasing in Multan.',
    category: 'PTA & Legal',
    author: 'Al-Mushtaq Tech Team',
    publishedAt: '2026-08-01',
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop',
    content: `Buying a smartphone in Pakistan requires verifying its PTA (Pakistan Telecommunication Authority) approval status. Never purchase a phone without checking its IMEI through official channels.

### Step 1: Find the 15-Digit IMEI
Dial **\*#06#** on the phone's keypad. The 15-digit IMEI number will appear instantly on the screen. Always compare this with the IMEI printed on the retail box.

### Step 2: Send SMS to 8484
Open your SMS app and send the 15-digit IMEI to **8484**. Within seconds, PTA will respond with one of four statuses:
- **PTA Approved / Compliant**: The device is fully legal and approved.
- **Valid (Pay Tax to register)**: Device is recognized by GSMA but customs tax has not yet been paid.
- **Non-Compliant**: Device is blocked or fake.
- **Blocked**: Device has been reported stolen or blocked due to non-payment of taxes.

### Step 3: Check via PTA DIRBS Official Website
You can also visit https://dirbs.pta.gov.pk/ and enter the IMEI into the verification search bar for a detailed certificate.

At **Al-Mushtaq Mobiles**, every single new and certified used phone sold comes with guaranteed PTA approval and an official invoice.`
  },
  {
    id: 'blog-2',
    slug: 'best-smartphones-under-50000-pkr-pakistan-2026',
    title: 'Best Smartphones Under Rs. 50,000 in Pakistan (2026 Edition)',
    excerpt: 'Looking for the best value for money? We compare display quality, camera performance, gaming chipset, and battery life under 50k PKR.',
    category: 'Buying Guides',
    author: 'Muhammad Mushtaq',
    publishedAt: '2026-08-10',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop',
    content: `The sub-Rs. 50,000 smartphone segment in Pakistan is hotter than ever. From AMOLED high refresh rate panels to 108MP cameras, here are our top recommendations available at our Multan showroom:

### 1. Samsung Galaxy A15 (Best Overall Brand & Display)
- **Key Specs**: 6.5-inch Super AMOLED 90Hz, Helio G99, 50MP Camera, 4 OS Upgrades.
- **Why Buy**: Unmatched display clarity under sunlight, guaranteed Samsung security updates, and smooth everyday performance.

### 2. Infinix Hot 40 Pro (Best Gaming & Charging)
- **Key Specs**: Helio G99, 108MP Camera, 33W Fast Charging, 256GB Storage.
- **Why Buy**: Incredible internal storage capacity and balanced stereo speakers for mobile gaming.

### 3. Xiaomi Redmi Note 13 4G (Best Camera & Design)
- **Key Specs**: 120Hz Ultra-thin bezel AMOLED, 108MP 3x in-sensor zoom, 33W Fast Charge.
- **Why Buy**: Looks and feels like a flagship phone with minimal bezels.

Visit our shop at Katchehry Chowk Multan to test all these models live in hand!`
  },
  {
    id: 'blog-3',
    slug: 'phone-battery-care-tips-summer-pakistan',
    title: 'How to Prevent Mobile Battery Degradation in Extreme Multan Summers',
    excerpt: 'High temperatures in South Punjab can destroy lithium battery health. Expert tips from our mobile repair technicians on keeping battery health above 90%.',
    category: 'Maintenance & Repairs',
    author: 'Lead Technician, Al-Mushtaq Repairs',
    publishedAt: '2026-08-20',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=1000&auto=format&fit=crop',
    content: `Multan summers regularly exceed 45°C. Excessive ambient heat combined with rapid charging is the number one cause of premature battery degradation and swollen batteries.

### 1. Never Leave Your Phone in a Parked Car
Interior temperatures of a car parked under the direct Multan sun can exceed 60°C within 15 minutes, which can cause permanent battery capacity loss or swelling.

### 2. Remove Thick Cases While Fast Charging
Cases act as thermal insulators. When using 67W, 70W, or 120W chargers, take off heavy armor cases to allow heat dissipation.

### 3. Avoid Intensive Gaming While Charging
"Bypass charging" features (such as in Infinix Note 40 Pro) route power directly to the motherboard without going through the battery, preventing overheating during long gaming sessions.

Need a battery replacement? Our repair lab at Katchehry Chowk uses genuine OEM grade batteries with a 6-month replacement warranty.`
  }
];

export const sampleWarrantyRecords: WarrantyRecord[] = [
  {
    id: 'w-1',
    orderNumber: 'AMM-2026-000101',
    imei: '352981098234123',
    productName: 'Apple iPhone 15 Pro Max 256GB',
    purchaseDate: '2026-07-10',
    expiryDate: '2027-07-09',
    customerName: 'Muhammad Arslan',
    customerPhone: '0301-7654321',
    status: 'Active',
    ptaStatus: 'PTA Approved'
  },
  {
    id: 'w-2',
    orderNumber: 'AMM-2026-000102',
    imei: '356789012345678',
    productName: 'Samsung Galaxy S24 Ultra 256GB',
    purchaseDate: '2026-06-01',
    expiryDate: '2027-05-31',
    customerName: 'Khurram Shehzad',
    customerPhone: '0300-8889991',
    status: 'Active',
    ptaStatus: 'PTA Approved'
  }
];

export const blogPosts: BlogPost[] = sampleBlogPosts.map(b => ({
  ...b,
  date: b.publishedAt
}));

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    category: 'delivery',
    question: 'How fast is delivery within Multan and to other cities in Pakistan?',
    answer: 'Same-day express delivery is available within Multan city (Gulgasht, Bosan Road, Cantt, Shah Rukn-e-Alam, Model Town, etc.) in 2 to 4 hours via our own shop riders. For nationwide orders (Lahore, Karachi, Islamabad, Faisalabad, etc.), we ship via insured TCS and Leopards Courier with 24-48 hour delivery and live tracking code.'
  },
  {
    id: 'faq-2',
    category: 'pta',
    question: 'Are all smartphones sold at Al-Mushtaq Mobiles officially PTA approved?',
    answer: 'Yes! All new boxed phones are 100% officially PTA approved with all customs duties paid to the Government of Pakistan. We issue an official invoice, and you can dial *#06# to verify the 15-digit IMEI directly on PTA 8484 SMS or dirbs.pta.gov.pk before payment.'
  },
  {
    id: 'faq-3',
    category: 'warranty',
    question: 'What warranty is provided with new and used mobile phones?',
    answer: 'All brand new phones come with their official 1-Year Official Brand Warranty (Apple, Samsung, Carlcare for Infinix/Tecno, Xiaomi Pakistan). All certified used phones undergo our 35-point technician inspection and come with a 7-Day Al-Mushtaq Shop Checking & Replacement Warranty.'
  },
  {
    id: 'faq-4',
    category: 'payments',
    question: 'What payment methods do you accept?',
    answer: 'We accept Cash on Delivery (COD) for orders across Pakistan, Direct Bank Transfer (Meezan Bank), JazzCash, Easypaisa, and in-person Cash or Credit/Debit Card payments at our Katchehry Chowk Multan showroom.'
  },
  {
    id: 'faq-5',
    category: 'warranty',
    question: 'How does the Mobile Hardware Repair Service work?',
    answer: 'You can book a repair online to get an estimated cost and ticket code. Bring or send your device to Shop No. 6, Katchehry Chowk Multan. Our technicians use genuine OEM screens, batteries, and charging ports, and provide a 90-day repair service warranty.'
  },
  {
    id: 'faq-6',
    category: 'payments',
    question: 'Can I purchase any phone on monthly installments in Multan?',
    answer: 'Yes! We offer flexible 3-month (0% markup!), 6-month, and 12-month installment plans for Multan residents. Approval requires basic verification (CNIC copy, utility bill, and local references). Submit your application online through our Installment page.'
  }
];

