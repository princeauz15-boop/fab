'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import {
  heroHeading,
  heroSubheading,
  heroButtons,
  heroImage,
  staggerContainer,
} from '@/lib/animations';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0f0f0f]"
      aria-label="Hero section"
    >
      {/* Background Image with Overlay */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        {/* Abstract industrial background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#111111]" />

        {/* Industrial grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(200,146,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,146,42,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Diagonal accent lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-0.5 bg-gradient-to-r from-transparent via-[#c8922a]/20 to-transparent rotate-12" />
          <div className="absolute top-1/3 -right-20 w-96 h-0.5 bg-gradient-to-r from-transparent via-[#c8922a]/10 to-transparent -rotate-12" />
          <div className="absolute bottom-1/3 left-1/4 w-64 h-0.5 bg-gradient-to-r from-transparent via-[#c8922a]/15 to-transparent rotate-6" />
        </div>

        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #c8922a 0%, transparent 70%)' }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 container-custom w-full pt-24 pb-20"
        style={{ y: contentY }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh]">
          {/* Left: Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Eyebrow */}
            <motion.div variants={heroSubheading} className="flex items-center gap-3">
              <span className="w-8 h-0.5 bg-[#c8922a]" />
              <span className="text-[#c8922a] text-xs font-bold tracking-[0.25em] uppercase">
                Paper Tube Manufacturer Since 2013
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={heroHeading}
              className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-black text-white leading-[1.05] tracking-tight"
            >
              Precision Paper Tubes{' '}
              <span className="text-[#c8922a]">for Every</span>{' '}
              Industrial Requirement
            </motion.h1>

            {/* Tagline */}
            <motion.div variants={heroSubheading}>
              <span className="inline-block text-xl md:text-2xl font-bold text-white/90 border-l-4 border-[#c8922a] pl-4 py-1">
                Small Size. Big Precision.
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={heroSubheading}
              className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl"
            >
              FAB Paper Tube manufactures quality paper tubes and paper cores with a strong focus on{' '}
              <strong className="text-white font-medium">small-size manufacturing</strong>,
              precision, consistency and customer-specific requirements.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={heroButtons} className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2.5 bg-[#c8922a] text-white font-semibold px-7 py-3.5 rounded-sm hover:bg-[#a67520] transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl text-sm"
              >
                Explore Products
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 bg-transparent border-2 border-white/30 text-white font-semibold px-7 py-3.5 rounded-sm hover:border-[#c8922a] hover:text-[#c8922a] transition-all duration-300 text-sm"
              >
                Get a Quote
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              variants={heroButtons}
              className="flex flex-wrap gap-8 pt-4 border-t border-white/10"
            >
              {[
                { value: '2013', label: 'Established' },
                { value: '8+', label: 'Product Types' },
                { value: '100%', label: 'Custom Made' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl font-black text-[#c8922a]">{stat.value}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Product Visual */}
          <motion.div
            variants={heroImage}
            initial="hidden"
            animate="visible"
            className="relative flex items-center justify-center"
          >
            {/* Product Showcase Area */}
            <div className="relative w-full max-w-md mx-auto">
              {/* Main product display box */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                {/* Paper Tube SVG Illustration */}
                <div className="relative w-full aspect-square flex items-center justify-center">
                  {/* Outer decorative ring */}
                  <div className="absolute inset-4 border border-[#c8922a]/20 rounded-full" />
                  <div className="absolute inset-8 border border-[#c8922a]/10 rounded-full" />

                  {/* Central tube illustration */}
                  <div className="relative w-48 h-64">
                    {/* Main tube body */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#8B6914] via-[#c8922a] to-[#6B4F0A] shadow-[0_20px_60px_rgba(200,146,42,0.3)]"
                      style={{ borderRadius: '50% 50% 50% 50% / 10% 10% 10% 10%' }}
                    />
                    {/* Tube inner circle top */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-12 bg-gradient-to-b from-[#2d1f05] to-[#8B6914] rounded-full" />
                    {/* Tube inner hollow */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-8 bg-[#0f0f0f] rounded-full" />
                    {/* Tube spiral lines */}
                    {[20, 35, 50, 65, 80].map((top) => (
                      <div
                        key={top}
                        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        style={{ top: `${top}%` }}
                      />
                    ))}
                    {/* Tube bottom circle */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-12 bg-gradient-to-t from-[#2d1f05] to-[#8B6914] rounded-full" />
                  </div>

                  {/* Floating labels */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="absolute left-0 top-1/3 flex items-center gap-2"
                  >
                    <div className="w-12 h-px bg-[#c8922a]/50" />
                    <div className="bg-white/5 border border-white/10 rounded px-3 py-1.5 backdrop-blur-sm">
                      <span className="text-white text-xs font-medium">Precision Made</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                    className="absolute right-0 bottom-1/3 flex items-center gap-2"
                  >
                    <div className="bg-white/5 border border-white/10 rounded px-3 py-1.5 backdrop-blur-sm">
                      <span className="text-white text-xs font-medium">Small Diameter</span>
                    </div>
                    <div className="w-12 h-px bg-[#c8922a]/50" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Glow effect under product */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#c8922a]/30 blur-xl rounded-full" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-[0.2em] uppercase">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-[#c8922a]/60" />
        </motion.div>
      </motion.div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}
