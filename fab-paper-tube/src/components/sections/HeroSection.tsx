'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { staggerContainer, heroHeading, heroSubheading, heroButtons, heroImage } from '@/lib/animations';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d2b6b 0%, #1a4a9e 40%, #1e5cbf 70%, #1a4a9e 100%)' }}
      aria-label="Hero section"
    >
      {/* Subtle paper tube pattern in background */}
      <div className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='20' fill='none' stroke='white' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='8' fill='none' stroke='white' stroke-width='0.8'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container-custom relative z-10 w-full pt-28 pb-12">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-4 items-center min-h-[88vh]">

          {/* ── LEFT: Text Content ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5 lg:pr-6"
          >
            <motion.h1
              variants={heroHeading}
              className="text-4xl md:text-5xl lg:text-[3.2rem] font-black leading-[1.1] tracking-tight"
            >
              <span className="text-white">FAB Paper Tube. </span>
              <span style={{ color: '#f0c040' }}>Premium<br />and Sustainable<br />Packaging<br />Solutions</span>
            </motion.h1>

            {/* Underline accent */}
            <motion.div variants={heroSubheading} className="flex items-center gap-0">
              <div className="h-1 w-20" style={{ background: '#f0c040' }} />
              <div className="h-0.5 w-12 bg-white/30" />
            </motion.div>

            <motion.p
              variants={heroSubheading}
              className="text-white font-bold text-base md:text-lg leading-relaxed"
            >
              High Quality Paper Tubes &amp; Paper Cores for Textile, Packaging,<br className="hidden md:block" />
              Stationery, Paper Converting and Industrial Applications.
            </motion.p>

            <motion.p
              variants={heroSubheading}
              className="text-blue-100 text-sm md:text-base leading-relaxed max-w-lg opacity-90"
            >
              FAB Paper Tube is a leading manufacturer of premium quality paper tubes, paper cores, and customized packaging solutions. We manufacture strong, durable, and eco-friendly paper tubes in various sizes according to customer requirements, ensuring consistent quality and timely delivery.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={heroButtons} className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-white text-[#0d2b6b] font-bold px-7 py-3.5 rounded-sm hover:bg-blue-50 transition-all duration-300 hover:-translate-y-0.5 shadow-lg text-sm"
              >
                Get Free Quote
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 border-2 border-white/60 text-white font-bold px-7 py-3.5 rounded-sm hover:bg-white hover:text-[#0d2b6b] transition-all duration-300 text-sm"
              >
                View Products
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Character Illustration ── */}
          <motion.div
            variants={heroImage}
            initial="hidden"
            animate="visible"
            className="relative flex items-end justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-[420px] lg:max-w-[480px]"
            >
              <Image
                src="/images/hero-character.svg"
                alt="FAB Paper Tube character holding paper tubes"
                width={560}
                height={500}
                priority
                className="w-full h-auto drop-shadow-2xl"
              />

              {/* Floating badge top-left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.4, type: 'spring' }}
                className="absolute top-10 -left-4 bg-white rounded-xl shadow-2xl px-4 py-2.5 flex items-center gap-2.5"
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #c8922a, #f0c040)' }}>
                  10+
                </div>
                <div>
                  <div className="text-[11px] font-black text-[#0d2b6b]">Years</div>
                  <div className="text-[9px] text-gray-500">Manufacturing</div>
                </div>
              </motion.div>

              {/* Floating badge bottom-right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.4, type: 'spring' }}
                className="absolute bottom-24 -right-2 bg-white rounded-xl shadow-2xl px-4 py-2.5 flex items-center gap-2.5"
              >
                <div className="w-9 h-9 rounded-full bg-[#0d2b6b] flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                  ✓
                </div>
                <div>
                  <div className="text-[11px] font-black text-[#0d2b6b]">ISO Quality</div>
                  <div className="text-[9px] text-gray-500">Assured Products</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
