import { SiteSettings } from '../types';

export const RAW_PHONE = '00300 0600956';
export const CLEAN_INTL_PHONE = '+923000600956';
export const WHATSAPP_NUMBER = '923000600956';

export const siteConfig: SiteSettings = {
  businessName: 'Al-Mushtaq Mobiles',
  phoneRaw: RAW_PHONE,
  phoneCall: CLEAN_INTL_PHONE,
  whatsappPhone: WHATSAPP_NUMBER,
  facebookUrl: 'https://www.facebook.com/Almushtaqmobiles/',
  address: 'Shop No. 6, Al-Mushtaq Mobiles, Rehma Commercial Centre, Katchehry Road, Katchehry Chowk, Qadirabad, Mohalla Qadirabad, Multan, Punjab 60000, Pakistan',
  shopCity: 'Multan',
  freeShippingThreshold: 5000,
  shippingMultan: 150,
  shippingNationwide: 350,
  announcementText: '⚡ Special Offers: Genuine PTA Approved Phones, 7-Day Checking Warranty & Same-Day Multan Delivery!',
  bankDetails: {
    bankName: 'Meezan Bank Limited',
    accountTitle: 'Al-Mushtaq Mobiles',
    accountNumber: '0281-0104882910',
    iban: 'PK14MEZN0002810104882910',
    branch: 'Katchehry Road Branch, Multan'
  },
  jazzCashDetails: {
    accountTitle: 'Muhammad Mushtaq (Al-Mushtaq Mobiles)',
    accountNumber: '0300-0600956',
  },
  easypaisaDetails: {
    accountTitle: 'Al-Mushtaq Mobiles Shop',
    accountNumber: '0300-0600956',
  },
  socialLinks: {
    facebook: 'https://www.facebook.com/Almushtaqmobiles/',
    instagram: 'https://www.instagram.com/almushtaqmobiles',
    youtube: 'https://www.youtube.com/@almushtaqmobiles'
  },
  openingHours: {
    weekdays: '10:30 AM – 10:30 PM',
    sunday: '12:00 PM – 09:30 PM'
  }
};

export const getWhatsAppLink = (message?: string): string => {
  const text = message ? encodeURIComponent(message) : encodeURIComponent('Assalam-o-Alaikum Al-Mushtaq Mobiles! I am contacting you from your website regarding an inquiry.');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
};

export const getCallLink = (): string => {
  return `tel:${CLEAN_INTL_PHONE}`;
};

export const formatPKR = (amount: number): string => {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
};
