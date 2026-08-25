'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Package, ChevronRight, ArrowLeft } from 'lucide-react';
import { staggerContainer, fadeUp, slideLeft, slideRight, viewportConfig } from '@/lib/animations';
import type { Product } from '@/types';

interface Props {
  product: Product;
  relatedProducts: Product[];
}

// Product JSON-LD
function ProductSchema({ product }: { product: Product }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.shortDescription.replace(/<[^>]*>/g, ''),
    image: product.featuredImage?.url,
    brand: { '@type': 'Brand', name: 'FAB Paper Tube' },
    manufacturer: {
      '@type': 'Organization',
      name: 'FAB Paper Tube',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fabpapertube.com',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
      seller: { '@type': 'Organization', name: 'FAB Paper Tube' },
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  return (
    <div className="pt-20">
      <ProductSchema product={product} />

      {/* Breadcrumb */}
      <div className="bg-[#f5f4f0] border-b border-[#e5e5e5]">
        <div className="container-custom py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#9a9a9a]">
            <Link href="/" className="hover:text-[#c8922a] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/products" className="hover:text-[#c8922a] transition-colors">Products</Link>
            <ChevronRight size={12} />
            <span className="text-[#1a1a1a] font-medium truncate max-w-[200px]">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Image */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideLeft}
              className="relative"
            >
              <div className="relative aspect-square rounded overflow-hidden bg-[#f5f4f0] sticky top-24">
                {product.featuredImage ? (
                  <Image
                    src={product.featuredImage.url}
                    alt={product.featuredImage.alt || product.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover hover:scale-[1.02] transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-32 h-48 rounded-full bg-gradient-to-b from-[#c8922a] via-[#a67520] to-[#c8922a] opacity-30" />
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-10 bg-[#1a1a1a] rounded-full" />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right: Info */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col gap-5"
            >
              {/* Category */}
              <motion.div variants={fadeUp}>
                <span className="text-[#c8922a] text-xs font-bold tracking-[0.2em] uppercase">Paper Tube</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeUp}
                className="text-3xl md:text-4xl font-black text-[#1a1a1a] leading-tight"
              >
                {product.title}
              </motion.h1>

              {/* Short description */}
              <motion.p variants={fadeUp} className="text-[#6b6b6b] text-base leading-relaxed">
                {product.shortDescription.replace(/<[^>]*>/g, '')}
              </motion.p>

              {/* Used For */}
              {product.usedFor.length > 0 && (
                <motion.div variants={fadeUp} className="bg-[#f5f4f0] rounded p-5">
                  <div className="text-xs font-bold tracking-widest uppercase text-[#9a9a9a] mb-3">Used For</div>
                  <div className="flex flex-wrap gap-2">
                    {product.usedFor.map((use) => (
                      <span
                        key={use}
                        className="flex items-center gap-1.5 bg-white border border-[#e5e5e5] text-[#4a4a4a] text-sm px-3 py-1.5 rounded"
                      >
                        <CheckCircle2 size={13} className="text-[#c8922a]" />
                        {use}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Applications */}
              {product.applications.length > 0 && (
                <motion.div variants={fadeUp}>
                  <div className="text-xs font-bold tracking-widest uppercase text-[#9a9a9a] mb-3">Industries</div>
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((app) => (
                      <span
                        key={app}
                        className="bg-[#1a1a1a] text-white text-xs font-medium px-3 py-1.5 rounded"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Specifications */}
              {product.specifications.length > 0 && (
                <motion.div variants={fadeUp}>
                  <div className="text-xs font-bold tracking-widest uppercase text-[#9a9a9a] mb-3">Specifications</div>
                  <div className="border border-[#e5e5e5] rounded overflow-hidden">
                    {product.specifications.map((spec, i) => (
                      <div
                        key={spec.label}
                        className={`flex gap-4 px-4 py-3 text-sm ${i % 2 === 0 ? 'bg-[#f5f4f0]' : 'bg-white'}`}
                      >
                        <span className="text-[#9a9a9a] w-36 flex-shrink-0">{spec.label}</span>
                        <span className="text-[#1a1a1a] font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Manufacturing note */}
              <motion.div
                variants={fadeUp}
                className="flex items-start gap-3 bg-[#c8922a]/5 border border-[#c8922a]/20 rounded p-4"
              >
                <Package size={18} className="text-[#c8922a] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#4a4a4a]">
                  <strong className="text-[#1a1a1a]">Custom sizes available.</strong> All our tubes are manufactured to your specific diameter, length and wall thickness requirements.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 bg-[#c8922a] text-white font-semibold px-7 py-3.5 rounded-sm hover:bg-[#a67520] transition-all duration-300 text-sm"
                >
                  Request Quote
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="tel:+918238074700"
                  className="inline-flex items-center gap-2 bg-[#f5f4f0] text-[#1a1a1a] font-semibold px-7 py-3.5 rounded-sm hover:bg-[#e5e5e5] transition-colors text-sm"
                >
                  Call Now
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Full Description */}
          {product.description && product.description !== '<p></p>' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6 }}
              className="mt-16 pt-12 border-t border-[#e5e5e5]"
            >
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Product Details</h2>
              <div
                className="wp-content prose max-w-none text-[#4a4a4a]"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </motion.div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-[#f5f4f0]">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-[#1a1a1a]">Related Products</h2>
              <Link
                href="/products"
                className="flex items-center gap-1.5 text-sm text-[#c8922a] font-semibold hover:gap-2.5 transition-all duration-200"
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {relatedProducts.map((rel, i) => (
                <motion.div
                  key={rel.id}
                  variants={fadeUp}
                  custom={i}
                  className="group bg-white border border-[#e5e5e5] rounded overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f4f0]">
                    {rel.featuredImage ? (
                      <Image
                        src={rel.featuredImage.url}
                        alt={rel.featuredImage.alt || rel.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-16 rounded-full bg-[#c8922a]/20" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#1a1a1a] text-sm mb-3 group-hover:text-[#c8922a] transition-colors line-clamp-2">
                      {rel.title}
                    </h3>
                    <Link
                      href={`/products/${rel.slug}`}
                      className="inline-flex items-center gap-1.5 text-[#c8922a] text-xs font-semibold"
                    >
                      View <ArrowRight size={12} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Back to Products */}
      <div className="bg-white py-8 border-t border-[#e5e5e5]">
        <div className="container-custom">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-[#6b6b6b] hover:text-[#c8922a] transition-colors font-medium"
          >
            <ArrowLeft size={14} />
            Back to All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
