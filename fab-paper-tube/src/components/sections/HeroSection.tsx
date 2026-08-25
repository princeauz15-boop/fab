'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  staggerContainer,
  heroHeading,
  heroSubheading,
  heroButtons,
  heroImage,
} from '@/lib/animations';

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: '#1a3bc1',
        background:
          'radial-gradient(ellipse at 60% 40%, #2850d8 0%, #1a3bc1 40%, #122da0 70%, #0d2080 100%)',
        minHeight: '100vh',
      }}
      aria-label="Hero section"
    >
      {/* Paper-tube watermark */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Ccircle cx='45' cy='45' r='32' fill='none' stroke='white' stroke-width='1.2'/%3E%3Ccircle cx='45' cy='45' r='14' fill='none' stroke='white' stroke-width='0.7'/%3E%3C/svg%3E")`,
          backgroundSize: '95px 95px',
        }}
      />

      <div
        className="container-custom relative z-10 flex items-center"
        style={{ minHeight: '100vh', paddingTop: '88px' }}
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center w-full py-14">

          {/* ══ LEFT TEXT ══ */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 max-w-xl"
          >
            {/* H1 — increased to clamp(2.2rem, 4.2vw, 3.4rem) */}
            <motion.h1
              variants={heroHeading}
              className="font-black leading-[1.1] tracking-tight"
              style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)' }}
            >
              <span className="text-white">FAB Paper Tube. </span>
              <span style={{ color: '#f5be30' }}>
                Premium<br />
                and Sustainable<br />
                Packaging<br />
                Solutions
              </span>
            </motion.h1>

            {/* Gold underline */}
            <motion.div variants={heroSubheading}>
              <span className="block h-[4px] w-24 rounded-sm" style={{ background: '#f5be30' }} />
            </motion.div>

            {/* Bold sub-heading — increased to 17px */}
            <motion.p
              variants={heroSubheading}
              className="font-bold leading-snug text-white"
              style={{ fontSize: '17px' }}
            >
              High Quality Paper Tubes &amp; Paper Cores for Textile, Packaging,
              Stationery, Paper Converting and Industrial Applications.
            </motion.p>

            {/* Body copy — increased to 16px */}
            <motion.p
              variants={heroSubheading}
              style={{
                fontSize: '16px',
                color: 'rgba(220,235,255,0.93)',
                lineHeight: '1.7',
              }}
            >
              FAB Paper Tube is a leading manufacturer of premium quality paper
              tubes, paper cores, and customized packaging solutions. We manufacture
              strong, durable, and eco-friendly paper tubes in various sizes according
              to customer requirements, ensuring consistent quality and timely delivery.
            </motion.p>

            {/* CTA buttons — increased font + padding */}
            <motion.div variants={heroButtons} className="flex flex-wrap gap-4 pt-1">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-transparent border-2 border-white text-white font-bold px-8 py-3.5 rounded-sm text-[15px] hover:bg-white hover:text-[#1a3bc1] transition-all duration-300"
              >
                Get Free Quote
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 bg-transparent border-2 border-white text-white font-bold px-8 py-3.5 rounded-sm text-[15px] hover:bg-white hover:text-[#1a3bc1] transition-all duration-300"
              >
                View Products
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* ══ RIGHT CHARACTER ══ */}
          <motion.div
            variants={heroImage}
            initial="hidden"
            animate="visible"
            className="relative flex items-center justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full"
              style={{ maxWidth: '520px' }}
            >
              <Image
                src="/images/hero-character.png"
                alt="Person holding FAB paper tubes"
                width={620}
                height={560}
                priority
                className="w-full h-auto relative z-10"
                style={{
                  objectFit: 'contain',
                  mixBlendMode: 'screen',
                  filter: 'drop-shadow(0 20px 40px rgba(0,80,200,0.35))',
                }}
              />

              {/* Badge — 10+ Years */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, type: 'spring', stiffness: 200 }}
                className="absolute top-6 left-0 lg:-left-2 bg-white rounded-xl shadow-2xl flex items-center gap-3 z-20"
                style={{ padding: '10px 16px' }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black flex-shrink-0"
                  style={{ fontSize: '13px', background: 'linear-gradient(135deg,#f5be30,#c88010)' }}
                >
                  10+
                </div>
                <div>
                  <div className="font-black text-[#0d2080] leading-tight" style={{ fontSize: '13px' }}>Years</div>
                  <div className="text-gray-400 leading-tight" style={{ fontSize: '11px' }}>Manufacturing</div>
                </div>
              </motion.div>

              {/* Badge — ISO Quality */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, type: 'spring', stiffness: 200 }}
                className="absolute bottom-20 right-0 lg:-right-2 bg-white rounded-xl shadow-2xl flex items-center gap-3 z-20"
                style={{ padding: '10px 16px' }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black flex-shrink-0"
                  style={{ fontSize: '17px', background: '#0d2080' }}
                >
                  ✓
                </div>
                <div>
                  <div className="font-black text-[#0d2080] leading-tight" style={{ fontSize: '13px' }}>ISO Quality</div>
                  <div className="text-gray-400 leading-tight" style={{ fontSize: '11px' }}>Assured Products</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
