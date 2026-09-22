import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, HelpCircle, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { faqs, blogPosts } from '../data/seedData';
import { BlogPost } from '../types';

interface BlogFaqPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const BlogFaqPage: React.FC<BlogFaqPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const categories = ['all', 'delivery', 'pta', 'warranty', 'payments'];

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter(f => f.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3">
        <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-graphite tracking-tight">
          Smartphone Guides & Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-sage-500 max-w-xl mx-auto">
          Everything you need to know about purchasing genuine PTA-approved phones, checking warranties, and ordering online in Multan and Pakistan.
        </p>
      </div>

      {/* Selected Blog Modal / Reader */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-graphite/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 max-h-[85vh] overflow-y-auto border border-sage-200 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-orange-100 text-accent font-bold text-xs">
                {selectedPost.category}
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-sage-400 hover:text-graphite font-bold text-sm cursor-pointer p-1"
              >
                ✕ Close
              </button>
            </div>

            <img
              src={selectedPost.coverImage}
              alt=""
              className="w-full h-56 object-cover rounded-2xl"
            />

            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-graphite">
              {selectedPost.title}
            </h2>

            <div className="text-xs text-sage-400 flex items-center gap-3">
              <span>By {selectedPost.author}</span>
              <span>•</span>
              <span>{selectedPost.date}</span>
            </div>

            <div className="text-xs sm:text-sm text-sage-700 leading-relaxed space-y-3 pt-2">
              <p>{selectedPost.excerpt}</p>
              <p>
                When purchasing smartphones in Pakistan, knowing your device's legal PTA status and hardware integrity is critical. At Al-Mushtaq Mobiles (Shop No. 6, Rehma Commercial Centre, Katchehry Chowk, Multan), our technician desk performs a comprehensive 35-point testing routine before any phone is delivered.
              </p>
              <p>
                From testing display digitizers for phantom ghost-touches to checking OEM battery cycle counts and authentic PTA tax clearances, we make sure Multani mobile buyers never fall victim to re-sealed or blocked carrier-locked sets.
              </p>
            </div>

            <div className="pt-4 border-t border-sage-200 flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2.5 rounded-xl bg-graphite text-white text-xs font-bold"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog Guides Grid */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-sage-200">
          <BookOpen className="w-5 h-5 text-accent" />
          <h2 className="font-heading font-extrabold text-xl text-graphite">
            Mobile Buying & Maintenance Guides
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-3xl border border-sage-200 overflow-hidden shadow-xs hover:border-accent hover:shadow-md transition-all cursor-pointer flex flex-col group"
            >
              <div className="relative h-44 overflow-hidden bg-sage-100">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold text-graphite">
                  {post.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-[11px] text-sage-400 mb-1">{post.date}</div>
                  <h3 className="font-heading font-bold text-sm text-graphite group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-sage-500 line-clamp-3 mt-1.5 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-2 text-xs font-bold text-accent flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center justify-between pb-2 border-b border-sage-200 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-accent" />
            <h2 className="font-heading font-extrabold text-xl text-graphite">
              Frequently Asked Questions (FAQ)
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeCategory === c
                    ? 'bg-graphite text-white'
                    : 'bg-sage-100 text-sage-600 hover:text-graphite'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 max-w-4xl mx-auto">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-sage-200 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-sage-50/50"
                >
                  <span className="font-heading font-bold text-xs sm:text-sm text-graphite">
                    {faq.question}
                  </span>
                  <span className="text-sage-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-sage-600 leading-relaxed border-t border-sage-100 pt-3 bg-sage-50/20">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
