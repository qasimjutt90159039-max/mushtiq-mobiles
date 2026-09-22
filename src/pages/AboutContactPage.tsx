import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Mail, Clock, Facebook, Send, CheckCircle2, ShieldCheck, Award, Users } from 'lucide-react';
import { siteConfig, getCallLink, getWhatsAppLink } from '../config/siteConfig';

interface AboutContactPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const AboutContactPage: React.FC<AboutContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, subject, message })
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      {/* Hero Section */}
      <div className="bg-graphite text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="px-3.5 py-1 rounded-full bg-accent text-white font-bold text-xs inline-block">
            Est. 2012 • Katchehry Chowk Multan
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight">
            About Al-Mushtaq Mobiles
          </h1>
          <p className="text-sm sm:text-base text-sage-300 leading-relaxed">
            Welcome to Multan's premier mobile destination. For over a decade, Al-Mushtaq Mobiles has stood as the gold standard for authentic smartphones, transparent PTA customs compliance, high-grade hardware repair, and instant trade-ins.
          </p>
        </div>
      </div>

      {/* Trust Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-sage-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-accent flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-base text-graphite">100% PTA Approved</h3>
          <p className="text-xs text-sage-600 leading-relaxed">
            Every boxed unit is legally cleared through Pakistan customs. We issue official tax invoices for peace of mind.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-sage-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-accent flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-base text-graphite">Official Brand Partners</h3>
          <p className="text-xs text-sage-600 leading-relaxed">
            Authorized retailer for Apple, Samsung, Xiaomi, Infinix, Tecno, Vivo, and leading accessories brands like Anker & Baseus.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-sage-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-accent flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-base text-graphite">50,000+ Happy Multanis</h3>
          <p className="text-xs text-sage-600 leading-relaxed">
            Proudly serving families, students, and businesses across Multan, Khanewal, Lodhran, and Muzaffargarh.
          </p>
        </div>
      </div>

      {/* Contact & Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Information & Store Hours (Cols 1-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sage-200 shadow-xs space-y-6">
            <h2 className="font-heading font-extrabold text-xl text-graphite">
              Store Information
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-graphite block text-sm mb-0.5">Physical Showroom Address:</strong>
                  <span className="text-sage-600 leading-relaxed">
                    Shop No. 6, Al-Mushtaq Mobiles, Rehma Commercial Centre, Katchehry Road, Katchehry Chowk, Qadirabad, Mohalla Qadirabad, Multan, Punjab 60000, Pakistan.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-graphite block text-sm mb-0.5">Direct Helpline / Order Desk:</strong>
                  <a href={getCallLink()} className="font-mono font-bold text-accent text-sm hover:underline block">
                    {siteConfig.phoneRaw}
                  </a>
                  <span className="text-[11px] text-sage-400">Available Mon-Sat (10:00 AM - 10:00 PM)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-graphite block text-sm mb-0.5">WhatsApp Chat:</strong>
                  <a
                    href={getWhatsAppLink('Assalam-o-Alaikum Al-Mushtaq Mobiles! I need assistance with smartphone prices.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-bold text-green-700 hover:underline block"
                  >
                    +92 300 0600956
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Facebook className="w-5 h-5 text-[#1877F2] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-graphite block text-sm mb-0.5">Official Facebook Community:</strong>
                  <a
                    href={siteConfig.socialLinks?.facebook || 'https://www.facebook.com/Almushtaqmobiles/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-semibold block"
                  >
                    facebook.com/Almushtaqmobiles
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-graphite block text-sm mb-0.5">Shop Working Hours:</strong>
                  <div className="text-sage-600 space-y-0.5">
                    <div>Monday – Saturday: <strong>{siteConfig.openingHours?.weekdays || '10:30 AM – 10:30 PM'}</strong></div>
                    <div>Sunday: <strong>{siteConfig.openingHours?.sunday || '12:00 PM – 09:30 PM'}</strong></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-sage-100 flex gap-2">
              <a
                href={getCallLink()}
                className="flex-1 py-3 rounded-xl bg-graphite hover:bg-accent text-white text-xs font-bold text-center transition-colors"
              >
                Call Shop
              </a>
              <a
                href={getWhatsAppLink('Assalam-o-Alaikum! Looking for mobile showroom directions.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white text-xs font-bold text-center transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Interactive Google Map Simulation Frame */}
          <div className="bg-white rounded-3xl border border-sage-200 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-graphite flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Katchehry Chowk Multan Location</span>
              </span>
              <a
                href="https://maps.google.com/?q=Katchehry+Chowk+Multan"
                target="_blank"
                rel="noreferrer"
                className="text-accent font-bold hover:underline"
              >
                Open in Google Maps →
              </a>
            </div>

            <div className="relative h-48 rounded-2xl overflow-hidden bg-sage-100 border border-sage-200">
              <iframe
                title="Al-Mushtaq Mobiles Multan Location"
                src="https://maps.google.com/maps?q=Katchehry+Chowk+Multan&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Contact Form (Cols 6-12) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-sage-200 shadow-xs space-y-6">
          <div>
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-graphite tracking-tight">
              Send us a Message
            </h2>
            <p className="text-xs text-sage-500 mt-1">
              Have a bulk order inquiry, installment query, or looking for a specific phone model? Fill out this form and our sales manager will reply within 30 minutes.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-green-50 border border-green-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
              <h3 className="font-heading font-bold text-base text-graphite">Message Received!</h3>
              <p className="text-xs text-sage-600 max-w-sm mx-auto">
                Thank you! Our shop representative at Katchehry Chowk Multan has received your message and will call you back shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 px-5 py-2 rounded-xl bg-graphite text-white text-xs font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-graphite block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Asad Raza"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs focus:border-accent"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-graphite block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs font-mono focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-graphite block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs focus:border-accent"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-graphite block mb-1">Topic / Subject</label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs focus:border-accent"
                  >
                    <option value="Product Availability">Phone Price & Stock Query</option>
                    <option value="Repair Inquiry">Hardware Repair Estimate</option>
                    <option value="Trade-In Inquiry">Sell / Exchange Used Phone</option>
                    <option value="Installment Inquiry">Installment Plan Questions</option>
                    <option value="Wholesale / Corporate">Wholesale / Corporate Order</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-graphite block mb-1">Your Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Tell us what device or service you are interested in..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs focus:border-accent"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-graphite hover:bg-accent text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md disabled:bg-sage-400"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Sending Message...' : 'Send Message to Al-Mushtaq Team'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
