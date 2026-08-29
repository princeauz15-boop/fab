'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PageBanner from '@/components/ui/PageBanner';
import { ArrowRight, Package, ExternalLink } from 'lucide-react';
import { viewportConfig } from '@/lib/animations';
import CTASection from '@/components/sections/CTASection';
import type { Product } from '@/types';

interface Props { products: Product[] }

/* ─── Product Row Card ─────────────────────────────────────────────────────── */
function ProductRow({ product, index }: { product: Product; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div
        className="grid md:grid-cols-5 rounded-2xl overflow-hidden"
        style={{
          border: '1px solid #e8edf5',
          boxShadow: '0 2px 20px rgba(26,74,158,0.05)',
          background: '#ffffff',
          transition: 'box-shadow 0.3s ease',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(26,74,158,0.11)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 20px rgba(26,74,158,0.05)'; }}
      >
        {/* Image col — 2/5 */}
        <div className={`relative md:col-span-2 overflow-hidden bg-[#f4f6fb] ${isEven ? 'md:order-1' : 'md:order-2'}`} style={{ minHeight: '240px' }}>
          {product.featuredImage ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.alt || product.title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Package size={48} style={{ color: '#c8d8f0', opacity: 0.4 }} />
            </div>
          )}
          {/* Index pill */}
          <div
            className="absolute top-4 left-4 rounded-lg px-3 py-1.5 font-black"
            style={{
              background: 'rgba(13,31,60,0.72)',
              color: 'rgba(255,255,255,0.85)',
              fontSize: '11px',
              backdropFilter: 'blur(8px)',
              letterSpacing: '0.05em',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {/* Content col — 3/5 */}
        <div
          className={`md:col-span-3 flex flex-col justify-between p-7 md:p-9 ${isEven ? 'md:order-2' : 'md:order-1'}`}
        >
          <div>
            {/* Used For */}
            {product.usedFor.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {product.usedFor.map(u => (
                  <span
                    key={u}
                    className="font-semibold rounded-full"
                    style={{ background: '#f0f5ff', color: '#1a4a9e', fontSize: '11px', padding: '4px 12px' }}
                  >
                    {u}
                  </span>
                ))}
              </div>
            )}

            <h2
              className="font-black leading-tight mb-3 transition-colors duration-200 group-hover:text-[#1a4a9e]"
              style={{ color: '#0d1f3c', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
            >
              {product.title}
            </h2>

            <p
              className="leading-relaxed mb-6 line-clamp-3"
              style={{ color: '#6a7a9a', fontSize: '14px' }}
            >
              {product.shortDescription.replace(/<[^>]*>/g, '')}
            </p>

            {/* Specs chips */}
            {product.specifications.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {product.specifications.slice(0, 3).map(s => (
                  <div
                    key={s.label}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5"
                    style={{ background: '#f8faff', border: '1px solid #e8edf5' }}
                  >
                    <span style={{ color: '#9aaacc', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }}>
                      {s.label}
                    </span>
                    <span style={{ color: '#0d1f3c', fontSize: '11px', fontWeight: 700 }}>{s.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href={`/products/${product.slug}`}
              className="group/btn inline-flex items-center gap-2 font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #1a4a9e, #2a5fc0)',
                color: 'white',
                fontSize: '13.5px',
                padding: '12px 24px',
                boxShadow: '0 4px 16px rgba(26,74,158,0.25)',
              }}
            >
              View Details
              <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
            </Link>
            <a
              href={`https://wa.me/918238074700?text=${encodeURIComponent(`Hi FAB Paper Tube, I am interested in: ${product.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'rgba(37,211,102,0.10)',
                border: '1.5px solid rgba(37,211,102,0.35)',
                color: '#1a9e4a',
                fontSize: '13px',
                padding: '12px 20px',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#25d366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.876L.057 23.886a.5.5 0 0 0 .619.603l6.186-1.617A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.659-.523-5.17-1.432l-.37-.222-3.827 1L3.64 17.6l-.237-.384A9.957 9.957 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Enquire
            </a>
            <Link
              href={`/products/${product.slug}`}
              className="ml-auto inline-flex items-center gap-1 font-semibold transition-colors duration-200 hover:text-[#1a4a9e]"
              style={{ color: '#9aaacc', fontSize: '12px' }}
            >
              <ExternalLink size={12} />
              Full Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */
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

      {/* ── Products List Section ── */}
      <section style={{ background: '#f4f6fb', padding: '80px 0' }}>
        <div className="container-custom">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-[2px] w-6 rounded" style={{ background: '#c8922a' }} />
                <span className="font-bold tracking-widest uppercase" style={{ color: '#c8922a', fontSize: '11px' }}>
                  {products.length} Products
                </span>
              </div>
              <h2 className="font-black leading-tight" style={{ color: '#0d1f3c', fontSize: 'clamp(1.6rem, 3vw, 2.3rem)' }}>
                All Paper Tube Products
              </h2>
              <p className="mt-2" style={{ color: '#6a7a9a', fontSize: '14.5px' }}>
                Browse our complete range. Custom sizes and specifications available for all products.
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
                  boxShadow: '0 4px 16px rgba(200,146,42,0.28)',
                }}
              >
                Get Custom Quote
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Product rows */}
          {products.length > 0 ? (
            <div className="space-y-5">
              {products.map((product, i) => (
                <ProductRow key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24" style={{ color: '#9aaacc' }}>
              <Package size={56} className="mx-auto mb-5 opacity-20" />
              <p className="font-medium" style={{ fontSize: '15px' }}>Loading products from WordPress...</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Custom Banner ── */}
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
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
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
                  We manufacture paper tubes to your exact diameter, length and wall thickness.
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
