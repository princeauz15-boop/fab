'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Package } from 'lucide-react';
import { viewportConfig } from '@/lib/animations';
import type { Product } from '@/types';

interface Props { products: Product[] }

/* ── Number formatter ── */
const pad = (n: number) => String(n + 1).padStart(2, '0');

/* ── Single Product Card ── */
function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: '#ffffff',
        border: '1px solid #e8edf5',
        boxShadow: '0 2px 16px rgba(26,74,158,0.05)',
        transition: 'box-shadow 0.35s ease, transform 0.35s ease',
      }}
      whileHover={{ y: -8, transition: { duration: 0.32 } }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 24px 56px rgba(26,74,158,0.14)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,74,158,0.18)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(26,74,158,0.05)';
        (e.currentTarget as HTMLElement).style.borderColor = '#e8edf5';
      }}
    >
      {/* Image container */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '4/3', background: '#f4f6fb' }}
      >
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.alt || product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Package size={52} style={{ color: '#c8d8f0', opacity: 0.5 }} />
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(to top, rgba(13,31,60,0.55) 0%, transparent 60%)' }}
        />

        {/* Number badge */}
        <div
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center font-black text-xs"
          style={{ background: 'rgba(255,255,255,0.92)', color: '#1a4a9e', backdropFilter: 'blur(8px)' }}
        >
          {pad(index)}
        </div>

        {/* Hover arrow button */}
        <div
          className="absolute bottom-4 right-4 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          style={{ background: '#1a4a9e' }}
        >
          <ArrowUpRight size={16} className="text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Used For tags */}
        {product.usedFor.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.usedFor.slice(0, 1).map(u => (
              <span
                key={u}
                className="inline-block font-semibold rounded-full"
                style={{ background: '#f0f5ff', color: '#1a4a9e', fontSize: '10.5px', padding: '3px 10px' }}
              >
                {u}
              </span>
            ))}
          </div>
        )}

        <h3
          className="font-black leading-tight mb-2 transition-colors duration-200 group-hover:text-[#1a4a9e]"
          style={{ color: '#0d1f3c', fontSize: '15.5px' }}
        >
          {product.title}
        </h3>

        <p
          className="leading-relaxed line-clamp-2 flex-1 mb-5"
          style={{ color: '#6a7a9a', fontSize: '13px' }}
        >
          {product.shortDescription.replace(/<[^>]*>/g, '')}
        </p>

        {/* Bottom CTA */}
        <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #f0f5ff' }}>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 font-bold group/link"
            style={{ color: '#1a4a9e', fontSize: '13px' }}
          >
            View Product
            <ArrowRight size={13} className="transition-transform duration-200 group-hover/link:translate-x-1.5" />
          </Link>
          <span className="font-black" style={{ color: '#e8edf5', fontSize: '22px' }}>
            {pad(index)}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Main Section ── */
export default function ProductsSection({ products }: Props) {
  const displayed = products.slice(0, 6);

  return (
    <section className="relative overflow-hidden" style={{ background: '#ffffff', padding: '96px 0' }}>

      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(26,74,158,1) 1px, transparent 1px), linear-gradient(90deg, rgba(26,74,158,1) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      {/* Soft blue blob top-right */}
      <div
        className="absolute -top-32 -right-32 rounded-full pointer-events-none"
        style={{
          width: '480px', height: '480px',
          background: 'radial-gradient(circle, rgba(26,74,158,0.06) 0%, transparent 70%)',
        }}
      />
      {/* Soft gold blob bottom-left */}
      <div
        className="absolute -bottom-32 -left-32 rounded-full pointer-events-none"
        style={{
          width: '420px', height: '420px',
          background: 'radial-gradient(circle, rgba(200,146,42,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="container-custom relative z-10">

        {/* ── Section Heading ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="block h-[2px] w-8 rounded" style={{ background: '#c8922a' }} />
              <span
                className="font-bold tracking-[0.22em] uppercase"
                style={{ color: '#c8922a', fontSize: '12px' }}
              >
                Our Products
              </span>
            </div>
            <h2
              className="font-black leading-tight"
              style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3rem)', color: '#0d1f3c', maxWidth: '580px' }}
            >
              Precision Paper Tubes for{' '}
              <span style={{ color: '#1a4a9e' }}>Every Application</span>
            </h2>
            <p
              className="mt-4 leading-relaxed"
              style={{ color: '#6a7a9a', fontSize: '15.5px', maxWidth: '500px' }}
            >
              Explore our range of quality paper tubes designed for different industrial,
              packaging and winding applications.
            </p>
          </motion.div>

          {/* Desktop: View All link aligned right */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden lg:block flex-shrink-0"
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-2.5 font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #1a4a9e, #2a5fc0)',
                color: 'white',
                fontSize: '14px',
                padding: '13px 26px',
                boxShadow: '0 4px 18px rgba(26,74,158,0.25)',
              }}
            >
              View All Products
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* ── Product Grid ── */}
        {displayed.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {displayed.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20" style={{ color: '#9aaacc' }}>
            <Package size={56} className="mx-auto mb-5 opacity-25" />
            <p style={{ fontSize: '15px' }}>Products loading from WordPress...</p>
          </div>
        )}

        {/* Mobile: View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center lg:hidden"
        >
          <Link
            href="/products"
            className="group inline-flex items-center gap-2.5 text-white font-bold rounded-xl hover:-translate-y-0.5 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #1a4a9e, #2a5fc0)',
              fontSize: '15px',
              padding: '14px 32px',
              boxShadow: '0 4px 18px rgba(26,74,158,0.25)',
            }}
          >
            View All Products
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* ── Bottom count strip ── */}
        {displayed.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportConfig}
            transition={{ delay: 0.5 }}
            className="mt-12 flex items-center justify-center gap-3"
          >
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, #e8edf5)' }} />
            <span style={{ color: '#9aaacc', fontSize: '13px', fontWeight: 600 }}>
              Showing {displayed.length} of {products.length} products
            </span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #e8edf5, transparent)' }} />
          </motion.div>
        )}

      </div>
    </section>
  );
}
