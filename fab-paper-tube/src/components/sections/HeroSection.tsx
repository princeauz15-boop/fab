'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { staggerContainer, heroHeading, heroSubheading, heroButtons, heroImage } from '@/lib/animations';

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        /* Deep blue gradient exactly as in screenshots */
        background: 'linear-gradient(135deg, #0a1f6e 0%, #1040a8 35%, #1a55c0 60%, #0e38a0 100%)',
        minHeight: '100vh',
      }}
      aria-label="Hero section"
    >
      {/* ── Subtle paper-tube pattern overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='70' height='70'%3E%3Ccircle cx='35' cy='35' r='25' fill='none' stroke='white' stroke-width='0.8'/%3E%3Ccircle cx='35' cy='35' r='10' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* ── Content wrapper ── */}
      <div className="container-custom relative z-10 flex items-center" style={{ minHeight: '100vh', paddingTop: '80px' }}>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center w-full py-16">

          {/* ════════════════════════════
              LEFT — Text
          ════════════════════════════ */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5 max-w-xl"
          >
            {/* Main heading – matches screenshot font weight & color split */}
            <motion.h1
              variants={heroHeading}
              className="font-black leading-[1.08] tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              <span className="text-white">FAB Paper Tube. </span>
              <span style={{ color: '#f0b830' }}>
                Premium<br />
                and Sustainable<br />
                Packaging<br />
                Solutions
              </span>
            </motion.h1>

            {/* Gold underline accent */}
            <motion.div variants={heroSubheading} className="flex items-center gap-1">
              <span className="block h-[4px] w-20 rounded-sm" style={{ background: '#f0b830' }} />
              <span className="block h-[4px] w-10 rounded-sm bg-white/20" />
            </motion.div>

            {/* Bold subtitle */}
            <motion.p
              variants={heroSubheading}
              className="text-white font-bold text-[15px] md:text-[16px] leading-snug"
            >
              High Quality Paper Tubes &amp; Paper Cores for Textile, Packaging,<br />
              Stationery, Paper Converting and Industrial Applications.
            </motion.p>

            {/* Body copy */}
            <motion.p
              variants={heroSubheading}
              className="text-blue-100 text-sm md:text-[15px] leading-relaxed opacity-90"
            >
              FAB Paper Tube is a leading manufacturer of premium quality paper tubes,
              paper cores, and customized packaging solutions. We manufacture strong,
              durable, and eco-friendly paper tubes in various sizes according to customer
              requirements, ensuring consistent quality and timely delivery.
            </motion.p>

            {/* ── CTA buttons — exact match to screenshot ── */}
            <motion.div variants={heroButtons} className="flex flex-wrap gap-4 pt-1">
              {/* Outlined white button */}
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 border-2 border-white text-white font-bold px-6 py-3 rounded-sm text-sm hover:bg-white hover:text-[#1040a8] transition-all duration-300"
              >
                Get Free Quote
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              {/* Outlined white button */}
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 border-2 border-white text-white font-bold px-6 py-3 rounded-sm text-sm hover:bg-white hover:text-[#1040a8] transition-all duration-300"
              >
                View Products
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* ════════════════════════════
              RIGHT — Character illustration
          ════════════════════════════ */}
          <motion.div
            variants={heroImage}
            initial="hidden"
            animate="visible"
            className="relative flex items-center justify-center lg:justify-end"
          >
            {/* Gentle float */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full"
              style={{ maxWidth: '480px' }}
            >
              {/* Soft glow behind character */}
              <div
                className="absolute inset-x-12 bottom-0 rounded-full blur-3xl opacity-25"
                style={{ height: '160px', background: 'radial-gradient(ellipse, #80c0ff 0%, transparent 70%)' }}
              />

              {/* Character SVG */}
              <Image
                src="/images/hero-character.svg"
                alt="Person holding FAB paper tubes"
                width={560}
                height={500}
                priority
                className="w-full h-auto relative z-10 drop-shadow-2xl"
              />

              {/* ── Floating badge TOP — "10+ Years Manufacturing" ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.45, type: 'spring', stiffness: 200 }}
                className="absolute top-8 left-0 lg:-left-6 bg-white rounded-lg shadow-2xl flex items-center gap-2.5 z-20"
                style={{ padding: '8px 14px' }}
              >
                {/* Icon circle */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-[11px] flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#f0b830,#c88010)' }}
                >
                  10+
                </div>
                <div>
                  <div className="text-[11px] font-black text-[#0a1f6e] leading-tight">Years</div>
                  <div className="text-[9px] text-gray-500 leading-tight">Manufacturing</div>
                </div>
              </motion.div>

              {/* ── Floating badge BOTTOM — "ISO Quality Assured" ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.45, type: 'spring', stiffness: 200 }}
                className="absolute bottom-20 right-0 lg:-right-4 bg-white rounded-lg shadow-2xl flex items-center gap-2.5 z-20"
                style={{ padding: '8px 14px' }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-[13px] flex-shrink-0"
                  style={{ background: '#0a2878' }}
                >
                  ✓
                </div>
                <div>
                  <div className="text-[11px] font-black text-[#0a1f6e] leading-tight">ISO Quality</div>
                  <div className="text-[9px] text-gray-500 leading-tight">Assured Products</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom fade to white ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to top, white, transparent)' }}
      />
    </section>
  );
}
