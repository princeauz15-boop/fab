'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Package } from 'lucide-react';
import { staggerContainer, fadeUp, viewportConfig } from '@/lib/animations';
import type { Product } from '@/types';

interface Props { products: Product[] }

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      className="product-card group bg-white rounded-xl overflow-hidden flex flex-col"
      style={{
        border: '1px solid #e8edf5',
        boxShadow: '0 2px 12px rgba(26,74,158,0.06)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.28 },
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(26,74,158,0.14)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,74,158,0.25)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(26,74,158,0.06)';
        (e.currentTarget as HTMLElement).style.borderColor = '#e8edf5';
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#f4f6fb]" style={{ aspectRatio: '4/3', position: 'relative' }}>
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.alt || product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="product-image object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Package size={48} style={{ color: '#c8d8f0', opacity: 0.6 }} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-bold leading-tight mb-2 transition-colors duration-200 group-hover:text-[#1a4a9e]"
          style={{ color: '#0d1f3c', fontSize: '15px' }}
        >
          {product.title}
        </h3>

        {product.usedFor.length > 0 && (
          <div className="mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#9aaacc', fontSize: '10px' }}>
              Used For
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {product.usedFor.slice(0, 2).map((use) => (
                <span
                  key={use}
                  className="text-xs px-2 py-0.5 rounded-md font-medium"
                  style={{ background: '#f0f5ff', color: '#1a4a9e', fontSize: '11px' }}
                >
                  {use}
                </span>
              ))}
            </div>
          </div>
        )}

        <p
          className="leading-relaxed line-clamp-2 flex-1 mb-4"
          style={{ color: '#6a7a9a', fontSize: '13px' }}
        >
          {product.shortDescription.replace(/<[^>]*>/g, '')}
        </p>

        <Link
          href={`/products/${product.slug}`}
          className="inline-flex items-center gap-1.5 font-bold transition-all duration-200 group/btn w-fit"
          style={{ color: '#1a4a9e', fontSize: '13px' }}
        >
          View Product
          <ArrowRight
            size={13}
            className="arrow-icon transition-transform duration-200 group-hover/btn:translate-x-1"
          />
        </Link>
      </div>
    </motion.article>
  );
}

export default function ProductsSection({ products }: Props) {
  // Show first 6 products on homepage
  const displayed = products.slice(0, 6);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">

        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-4">
            <span className="block h-[2px] w-8 rounded" style={{ background: '#c8922a' }} />
            <span
              className="font-bold tracking-[0.22em] uppercase"
              style={{ color: '#c8922a', fontSize: '12px' }}
            >
              Our Products
            </span>
            <span className="block h-[2px] w-8 rounded" style={{ background: '#c8922a' }} />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-black leading-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#0d1f3c' }}
          >
            Precision Paper Tubes for{' '}
            <span style={{ color: '#1a4a9e' }}>Every Application</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto leading-relaxed"
            style={{ color: '#6a7a9a', fontSize: '16px', maxWidth: '560px' }}
          >
            Explore our range of quality paper tubes designed for different industrial,
            packaging and winding applications.
          </motion.p>
        </motion.div>

        {/* Grid */}
        {displayed.length > 0 ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayed.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16" style={{ color: '#9aaacc' }}>
            <Package size={48} className="mx-auto mb-4 opacity-30" />
            <p style={{ fontSize: '15px' }}>Products are being loaded. Please check back soon.</p>
          </div>
        )}

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/products"
            className="group inline-flex items-center gap-2.5 text-white font-bold rounded-lg hover:-translate-y-0.5 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #1a4a9e, #2a5fc0)',
              fontSize: '15px',
              padding: '14px 32px',
              boxShadow: '0 4px 18px rgba(26,74,158,0.28)',
            }}
          >
            View All Products
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
