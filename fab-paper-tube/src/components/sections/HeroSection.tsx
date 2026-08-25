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
        /* Deep royal blue — matching the original website exactly */
        background:
          'linear-gradient(135deg, #0b1d6e 0%, #0f2fa0 35%, #1848c0 65%, #0d268a 100%)',
        minHeight: '100vh',
      }}
      aria-label="Hero section"
    >
      {/* Subtle circular watermark overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Ccircle cx='40' cy='40' r='30' fill='none' stroke='white' stroke-width='1'/%3E%3Ccircle cx='40' cy='40' r='12' fill='none' stroke='white' stroke-width='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '90px 90px',
        }}
      />

      {/* Content */}
      <div
        className="container-custom relative z-10 flex items-center"
        style={{ minHeight: '100vh', paddingTop: '80px' }}
      >
        <div className="grid lg:grid-cols-2 gap-6 items-center w-full py-16">

          {/* ── LEFT: Text ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5 max-w-xl"
          >
            {/* Heading — white + gold exactly like original site */}
            <motion.h1
              variants={heroHeading}
              className="font-black leading-[1.08] tracking-tight"
              style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.9rem)' }}
            >
              <span className="text-white">FAB Paper Tube. </span>
              <span style={{ color: '#f0b830' }}>
                Premium<br />
                and Sustainable<br />
                Packaging<br />
                Solutions
              </span>
            </motion.h1>

            {/* Gold underline */}
            <motion.div variants={heroSubheading} className="flex items-center gap-1">
              <span
                className="block h-1 w-20 rounded-sm"
                style={{ background: '#f0b830' }}
              />
              <span className="block h-1 w-10 rounded-sm bg-white/20" />
            </motion.div>

            {/* Bold sub-heading */}
            <motion.p
              variants={heroSubheading}
              className="text-white font-bold leading-snug"
              style={{ fontSize: '15px' }}
            >
              High Quality Paper Tubes &amp; Paper Cores for Textile, Packaging,<br />
              Stationery, Paper Converting and Industrial Applications.
            </motion.p>

            {/* Body copy */}
            <motion.p
              variants={heroSubheading}
              className="text-blue-100 leading-relaxed"
              style={{ fontSize: '14px', opacity: 0.92 }}
            >
              FAB Paper Tube is a leading manufacturer of premium quality paper
              tubes, paper cores, and customized packaging solutions. We manufacture
              strong, durable, and eco-friendly paper tubes in various sizes according
              to customer requirements, ensuring consistent quality and timely delivery.
            </motion.p>

            {/* CTA Buttons — outlined white, exactly like original */}
            <motion.div variants={heroButtons} className="flex flex-wrap gap-4 pt-1">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 border-2 border-white bg-transparent text-white font-bold px-6 py-3 rounded-sm text-sm hover:bg-white hover:text-[#0f2fa0] transition-all duration-300"
              >
                Get Free Quote
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 border-2 border-white bg-transparent text-white font-bold px-6 py-3 rounded-sm text-sm hover:bg-white hover:text-[#0f2fa0] transition-all duration-300"
              >
                View Products
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Real hero character PNG ── */}
          <motion.div
            variants={heroImage}
            initial="hidden"
            animate="visible"
            className="relative flex items-center justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full"
              style={{ maxWidth: '500px' }}
            >
              {/* Soft glow under character */}
              <div
                className="absolute bottom-0 inset-x-16 blur-3xl rounded-full opacity-20 pointer-events-none"
                style={{
                  height: '140px',
                  background:
                    'radial-gradient(ellipse, #90c8ff 0%, transparent 70%)',
                }}
              />

              {/* ── Real character image ── */}
              <Image
                src="/images/hero-character.png"
                alt="Person holding FAB paper tubes"
                width={600}
                height={540}
                priority
                className="w-full h-auto relative z-10 drop-shadow-2xl"
                style={{ objectFit: 'contain' }}
              />

              {/* Floating badge — 10+ Years */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 1.1,
                  duration: 0.45,
                  type: 'spring',
                  stiffness: 200,
                }}
                className="absolute top-8 left-0 lg:-left-4 bg-white rounded-lg shadow-2xl flex items-center gap-2.5 z-20"
                style={{ padding: '8px 14px' }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black flex-shrink-0"
                  style={{
                    fontSize: '11px',
                    background: 'linear-gradient(135deg,#f0b830,#c88010)',
                  }}
                >
                  10+
                </div>
                <div>
                  <div
                    className="font-black text-[#0b1d6e] leading-tight"
                    style={{ fontSize: '11px' }}
                  >
                    Years
                  </div>
                  <div className="text-gray-500 leading-tight" style={{ fontSize: '9px' }}>
                    Manufacturing
                  </div>
                </div>
              </motion.div>

              {/* Floating badge — ISO Quality */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 1.45,
                  duration: 0.45,
                  type: 'spring',
                  stiffness: 200,
                }}
                className="absolute bottom-24 right-0 lg:-right-4 bg-white rounded-lg shadow-2xl flex items-center gap-2.5 z-20"
                style={{ padding: '8px 14px' }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black flex-shrink-0"
                  style={{ fontSize: '14px', background: '#0a2878' }}
                >
                  ✓
                </div>
                <div>
                  <div
                    className="font-black text-[#0b1d6e] leading-tight"
                    style={{ fontSize: '11px' }}
                  >
                    ISO Quality
                  </div>
                  <div className="text-gray-500 leading-tight" style={{ fontSize: '9px' }}>
                    Assured Products
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to white */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to top, white, transparent)' }}
      />
    </section>
  );
}
