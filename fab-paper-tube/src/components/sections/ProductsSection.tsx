'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { staggerContainer, fadeUp, viewportConfig } from '@/lib/animations';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Product } from '@/types';

interface ProductsSectionProps {
  products: Product[];
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      className="product-card group bg-white border border-[#e5e5e5] rounded overflow-hidden hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5"
    >
      {/* Product Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f4f0]">
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.alt || product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="product-image object-cover transition-transform duration-500"
          />
        ) : (
          // Placeholder visual
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Tube placeholder */}
              <div className="w-20 h-28 rounded-full bg-gradient-to-b from-[#c8922a] via-[#a67520] to-[#c8922a] opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-6 bg-[#1a1a1a] rounded-full" />
            </div>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-[#1a1a1a]/80 text-white text-xs font-medium px-2.5 py-1 rounded backdrop-blur-sm">
            Paper Tube
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <h3 className="font-bold text-[#1a1a1a] text-base leading-tight mb-2 group-hover:text-[#c8922a] transition-colors duration-200">
          {product.title}
        </h3>

        {product.usedFor.length > 0 && (
          <div className="mb-3">
            <span className="text-xs font-semibold text-[#9a9a9a] uppercase tracking-wider">Used For</span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {product.usedFor.slice(0, 2).map((use) => (
                <span
                  key={use}
                  className="text-xs bg-[#f5f4f0] text-[#4a4a4a] px-2 py-1 rounded"
                >
                  {use}
                </span>
              ))}
            </div>
          </div>
        )}

        <p className="text-[#6b6b6b] text-sm leading-relaxed line-clamp-2 mb-4">
          {product.shortDescription.replace(/<[^>]*>/g, '')}
        </p>

        <Link
          href={`/products/${product.slug}`}
          className="inline-flex items-center gap-2 text-[#c8922a] text-sm font-semibold hover:gap-3 transition-all duration-200 group/link"
        >
          View Product
          <ArrowRight size={14} className="arrow-icon transition-transform duration-200 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function ProductsSection({ products }: ProductsSectionProps) {
  const displayProducts = products.slice(0, 8);

  return (
    <section className="section-padding bg-[#f5f4f0]">
      <div className="container-custom">
        <div className="mb-12">
          <SectionHeading
            eyebrow="What We Manufacture"
            title="Our Paper Tube Products"
            description="Reliable paper tube solutions for different industrial and commercial applications."
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {displayProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/products"
            className="group inline-flex items-center gap-2.5 bg-[#1a1a1a] text-white font-semibold px-8 py-4 rounded-sm hover:bg-[#c8922a] transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg text-sm"
          >
            View All Products
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
