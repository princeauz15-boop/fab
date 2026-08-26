'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PageBanner from '@/components/ui/PageBanner';
import { ArrowRight } from 'lucide-react';
import { staggerContainer, fadeUp, viewportConfig } from '@/lib/animations';
import SectionHeading from '@/components/ui/SectionHeading';
import CTASection from '@/components/sections/CTASection';
import type { Product } from '@/types';

interface Props {
  products: Product[];
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      className="product-card group bg-white border border-[#e5e5e5] rounded overflow-hidden hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5 flex flex-col"
    >
      {/* Product Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f4f0]">
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.alt || product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="product-image object-cover transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#f5f4f0]">
            <div className="w-16 h-24 rounded-full bg-gradient-to-b from-[#c8922a] to-[#a67520] opacity-30 group-hover:opacity-50 transition-opacity" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-[#1a1a1a]/80 text-white text-xs font-medium px-2.5 py-1 rounded backdrop-blur-sm">
            Paper Tube
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h2 className="font-bold text-[#1a1a1a] text-base leading-tight mb-2 group-hover:text-[#c8922a] transition-colors duration-200">
          {product.title}
        </h2>

        {product.usedFor.length > 0 && (
          <div className="mb-3">
            <span className="text-xs font-semibold text-[#9a9a9a] uppercase tracking-wider">Used For</span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {product.usedFor.map((use) => (
                <span key={use} className="text-xs bg-[#f5f4f0] text-[#4a4a4a] px-2 py-1 rounded">
                  {use}
                </span>
              ))}
            </div>
          </div>
        )}

        <p className="text-[#6b6b6b] text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
          {product.shortDescription.replace(/<[^>]*>/g, '')}
        </p>

        <Link
          href={`/products/${product.slug}`}
          className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-xs font-semibold px-4 py-2.5 rounded-sm hover:bg-[#c8922a] transition-colors duration-300 group/btn w-fit mt-auto"
        >
          View Product
          <ArrowRight size={13} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}

export default function ProductsPageClient({ products }: Props) {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-[#0f0f0f] relative overflow-hidden py-20 md:py-28">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(200,146,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,146,42,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="max-w-2xl"
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-8 h-0.5 bg-[#c8922a]" />
              <span className="text-[#c8922a] text-xs font-bold tracking-[0.2em] uppercase">What We Make</span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4"
            >
              Our Paper Tube{' '}
              <span className="text-[#c8922a]">Products</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-gray-400 text-base md:text-lg leading-relaxed">
              Reliable paper tube solutions for textile, packaging, cracker, candle and industrial applications. All manufactured to your specific requirements.
            </motion.p>
            <motion.nav variants={fadeUp} aria-label="Breadcrumb" className="flex items-center gap-2 mt-6 text-xs text-gray-600">
              <Link href="/" className="hover:text-[#c8922a] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-gray-400">Products</span>
            </motion.nav>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-[#f5f4f0]">
        <div className="container-custom">
          <div className="mb-10">
            <SectionHeading
              align="left"
              eyebrow={`${products.length} Products`}
              title="All Paper Tube Products"
              description="Browse our complete range. Custom sizes and specifications available for all products."
            />
          </div>

          {products.length > 0 ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16 text-[#9a9a9a]">
              <div className="text-4xl mb-4">📦</div>
              <p>Products are being loaded. Please check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Custom Requirement Box */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
            className="bg-[#f5f4f0] border border-[#e5e5e5] rounded p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div>
              <div className="text-[#c8922a] text-xs font-bold tracking-widest uppercase mb-2">Custom Manufacturing</div>
              <h2 className="text-2xl font-black text-[#1a1a1a] mb-2">Need a Custom Size?</h2>
              <p className="text-[#6b6b6b] text-sm max-w-xl">
                We manufacture paper tubes to your exact specifications. Send us your required diameter, length, wall thickness and application details.
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-[#c8922a] text-white font-semibold px-7 py-3.5 rounded-sm hover:bg-[#a67520] transition-all duration-300 text-sm flex-shrink-0"
            >
              Send Requirement
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
