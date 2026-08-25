'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { staggerContainer, fadeUp, viewportConfig } from '@/lib/animations';
import type { Product } from '@/types';

interface Props { products: Product[] }

// Product photo backgrounds using real uploaded images via data URIs or descriptive gradients
const productColors: Record<string, string> = {
  'white-sewing-thread-paper-tube': 'linear-gradient(145deg, #e8e4dc, #d4cfc4)',
  'brown-notebook-cover-paper-tube': 'linear-gradient(145deg, #c8a870, #b89050)',
  'birthday-cake-sparkle-candle-tube': 'linear-gradient(145deg, #d8d0c4, #c4bab0)',
  'selfie-stick-pencil-crackers-tube': 'linear-gradient(145deg, #c0b8a8, #b0a898)',
  'butterfly-firecracker-tube': 'linear-gradient(145deg, #c8c0b0, #b8b0a0)',
  'thermal-roll-paper-tube': 'linear-gradient(145deg, #e0dcd4, #d0ccc4)',
  'mirchi-bomb-paper-tube': 'linear-gradient(145deg, #c4bab0, #b4aaa0)',
  'stretch-film-roll-paper-tube': 'linear-gradient(145deg, #d0c8b8, #c0b8a8)',
};

function ProductCard({ product, index }: { product: Product; index: number }) {
  const bg = productColors[product.slug] || 'linear-gradient(145deg, #d4cfc4, #c4bfb4)';

  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400 hover:-translate-y-1.5 flex flex-col border border-gray-100"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.alt || product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          /* Realistic paper tube image placeholder */
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: bg }}>
            <svg viewBox="0 0 300 225" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Tube bundle visual */}
              {[0,1,2,3,4,5,6].map((i) => (
                <g key={i}>
                  <ellipse cx={80 + i * 22} cy="80" rx="10" ry="5.5" fill="rgba(120,80,30,0.8)"/>
                  <rect x={70 + i * 22} y="80" width="20" height="110" fill={i % 2 === 0 ? 'rgba(200,185,160,0.9)' : 'rgba(220,205,180,0.9)'}/>
                  <ellipse cx={80 + i * 22} cy="190" rx="10" ry="5.5" fill="rgba(100,65,20,0.7)"/>
                  <ellipse cx={80 + i * 22} cy="80" rx="6" ry="3" fill="rgba(50,30,10,0.6)"/>
                </g>
              ))}
              {/* Soft shadow overlay */}
              <rect width="300" height="225" fill="url(#shadowGrad)" opacity="0.2"/>
              <defs>
                <linearGradient id="shadowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="white" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="black" stopOpacity="0.1"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}
      </div>

      {/* Blue title bar — exactly matches screenshot style */}
      <div className="bg-[#1a4a9e] px-4 py-3">
        <h3 className="text-white font-bold text-sm leading-tight">{product.title}</h3>
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1 bg-white">
        {product.usedFor.length > 0 && (
          <div className="mb-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Used For: </span>
            <span className="text-xs text-gray-600">{product.usedFor.join(', ')}</span>
          </div>
        )}
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-1">
          {product.shortDescription.replace(/<[^>]*>/g, '')}
        </p>
        <Link
          href={`/products/${product.slug}`}
          className="mt-3 inline-flex items-center gap-1.5 text-[#1a4a9e] text-xs font-bold hover:gap-2.5 transition-all duration-200"
        >
          View Details <ArrowRight size={12} />
        </Link>
      </div>
    </motion.article>
  );
}

export default function ProductsSection({ products }: Props) {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="text-center mb-10"
        >
          <motion.span variants={fadeUp} className="text-xs font-bold tracking-[0.2em] uppercase text-[#8B7355] flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-0.5 bg-[#8B7355]" />
            What We Make
            <span className="w-8 h-0.5 bg-[#8B7355]" />
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-[#1a1a1a] mb-3">
            Premium <span className="text-[#1a4a9e]">Paper Tube</span> Products
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#6b6b6b] text-base max-w-2xl mx-auto">
            Our wide range of paper tubes is designed to meet the specific requirements of different industrial applications.
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 bg-[#8B7355] text-white font-semibold px-8 py-3.5 rounded-sm hover:bg-[#7a6245] transition-all duration-300 hover:-translate-y-0.5 shadow-md text-sm"
          >
            View All Products
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
