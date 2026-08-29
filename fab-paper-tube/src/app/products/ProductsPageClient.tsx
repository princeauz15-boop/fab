'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PageBanner from '@/components/ui/PageBanner';
import { ArrowRight, Package, ArrowUpRight, MessageSquare } from 'lucide-react';
import { viewportConfig } from '@/lib/animations';
import CTASection from '@/components/sections/CTASection';
import type { Product } from '@/types';

interface Props { products: Product[] }

/* ─── Product Card ─────────────────────────────────────────────────────────── */
function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white flex flex-col rounded-2xl overflow-hidden"
      style={{
        border: '1px solid #e8edf5',
        boxShadow: '0 2px 16px rgba(26,74,158,0.05)',
        transition: 'box-shadow 0.32s ease, transform 0.32s ease, border-color 0.32s ease',
      }}
      whileHover={{ y: -7, transition: { duration: 0.28 } }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = '0 24px 56px rgba(26,74,158,0.13)';
        el.style.borderColor = 'rgba(26,74,158,0.22)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = '0 2px 16px rgba(26,74,158,0.05)';
        el.style.borderColor = '#e8edf5';
      }}
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden bg-[#f4f6fb]" style={{ aspectRatio: '4/3' }}>
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.alt || product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-600 group-hover:scale-[1.06]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Package size={44} style={{ color: '#c8d8f0', opacity: 0.45 }} />
          </div>
        )}

        {/* Gradient on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(13,31,60,0.48) 0%, transparent 55%)' }}
        />

        {/* Arrow on hover */}
        <div
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none"
          style={{ background: '#1a4a9e' }}
        >
          <ArrowUpRight size={14} className="text-white" />
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-5 flex flex-col flex-1">

        {/* Used For */}
        {product.usedFor.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.usedFor.slice(0, 2).map(u => (
              <span
                key={u}
                className="font-semibold rounded-full"
                style={{ background: '#f0f5ff', color: '#1a4a9e', fontSize: '10.5px', padding: '3px 10px' }}
              >
                {u}
              </span>
            ))}
          </div>
        )}

        <h2
          className="font-black leading-tight mb-2 transition-colors duration-200 group-hover:text-[#1a4a9e]"
          style={{ color: '#0d1f3c', fontSize: '15px' }}
        >
          {product.title}
        </h2>

        <p
          className="leading-relaxed line-clamp-2 flex-1 mb-5"
          style={{ color: '#6a7a9a', fontSize: '12.5px' }}
        >
          {product.shortDescription.replace(/<[^>]*>/g, '')}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid #f0f5ff' }}>
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 font-bold rounded-lg transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #1a4a9e, #2a5fc0)',
              color: 'white',
              fontSize: '12.5px',
              padding: '10px 16px',
              boxShadow: '0 3px 12px rgba(26,74,158,0.22)',
            }}
          >
            View Details
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href={`https://wa.me/918238074700?text=${encodeURIComponent(`Hi, I am interested in ${product.title}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: '#25d366',
              boxShadow: '0 3px 10px rgba(37,211,102,0.25)',
            }}
            aria-label="WhatsApp enquiry"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.876L.057 23.886a.5.5 0 0 0 .619.603l6.186-1.617A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.659-.523-5.17-1.432l-.37-.222-3.827 1L3.64 17.6l-.237-.384A9.957 9.957 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Page Component ───────────────────────────────────────────────────────── */
export default function ProductsPageClient({ products }: Props) {
  return (
    <div className="pt-20">
      <PageBanner
        eyebrow="What We Make"
        title="Our Paper Tube Products"
        highlight="Products"
        description="Reliable paper tube solutions for textile, packaging, cracker, candle and industrial applications."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
      />

      {/* ── Products Grid Section ── */}
      <section style={{ background: '#f4f6fb', padding: '80px 0' }}>
        <div className="container-custom">

          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.55 }}
            >
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-[2px] w-6 rounded" style={{ background: '#c8922a' }} />
                <span className="font-bold tracking-widest uppercase" style={{ color: '#c8922a', fontSize: '11px' }}>
                  {products.length} Products
                </span>
              </div>
              <h2 className="font-black leading-tight" style={{ color: '#0d1f3c', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
                All Paper Tube Products
              </h2>
              <p className="mt-2" style={{ color: '#6a7a9a', fontSize: '14.5px' }}>
                Browse our complete range. Custom sizes and specifications available.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportConfig}
              transition={{ delay: 0.15 }}
              className="flex-shrink-0"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #c8922a, #e0a83b)',
                  color: 'white',
                  fontSize: '13px',
                  padding: '12px 22px',
                  boxShadow: '0 4px 16px rgba(200,146,42,0.30)',
                }}
              >
                <MessageSquare size={14} />
                Get a Custom Quote
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24" style={{ color: '#9aaacc' }}>
              <Package size={56} className="mx-auto mb-5 opacity-25" />
              <p className="font-medium" style={{ fontSize: '15px' }}>Products loading from WordPress...</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Custom Requirement Banner ── */}
      <section style={{ background: '#ffffff', padding: '72px 0' }}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.55 }}
            className="relative overflow-hidden rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #0d2240 0%, #1a4a9e 50%, #0d2240 100%)',
              padding: '56px 48px',
            }}
          >
            {/* Dot grid */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
            {/* Gold top line */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{ background: 'linear-gradient(90deg, transparent, #c8922a 30%, #e0a83b 50%, #c8922a 70%, transparent)' }}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <div className="font-bold tracking-widest uppercase mb-2" style={{ color: '#e0a83b', fontSize: '11px' }}>
                  Custom Manufacturing
                </div>
                <h3 className="font-black text-white leading-tight mb-3" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)' }}>
                  Need a Custom Size?
                </h3>
                <p style={{ color: 'rgba(185,210,250,0.75)', fontSize: '14.5px', maxWidth: '500px', lineHeight: '1.7' }}>
                  We manufacture paper tubes to your exact diameter, length and wall thickness. Tell us your requirement.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg, #c8922a, #e0a83b)',
                    color: 'white',
                    fontSize: '14px',
                    padding: '13px 26px',
                    boxShadow: '0 4px 18px rgba(200,146,42,0.38)',
                  }}
                >
                  Send Requirement
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="tel:+918238074700"
                  className="inline-flex items-center gap-2 font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(255,255,255,0.10)',
                    border: '1.5px solid rgba(255,255,255,0.25)',
                    color: 'white',
                    fontSize: '14px',
                    padding: '13px 26px',
                  }}
                >
                  Call Us Now
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
