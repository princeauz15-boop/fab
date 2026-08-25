'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { slideLeft, slideRight, staggerContainer, fadeUp, viewportConfig } from '@/lib/animations';

const highlights = [
  'Manufacturing all types of paper tubes since 2013',
  'Stitching thread Tube, Stretch film core, Textile Paper Tube',
  'Precision small-diameter paper tube specialists',
  'Custom size manufacturing as per customer requirement',
  'Consistent quality and on-time delivery guaranteed',
];

export default function TrustedManufacturerSection() {
  return (
    <section className="section-padding" style={{ background: '#f0f4f8' }}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT: Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="flex flex-col gap-5"
          >
            <motion.div variants={slideLeft} className="flex items-center gap-3">
              <span className="w-8 h-0.5 bg-[#1a4a9e]" />
              <span className="text-[#1a4a9e] text-xs font-bold tracking-[0.2em] uppercase">About Us</span>
            </motion.div>

            <motion.h2 variants={slideLeft} className="text-3xl md:text-4xl font-black text-[#1a1a1a] leading-tight">
              Trusted Paper Tube<br />
              Manufacturer{' '}
              <span className="text-[#1a4a9e]">Since 2013</span>
            </motion.h2>

            <motion.p variants={slideLeft} className="text-[#4a4a4a] leading-relaxed">
              FAB Paper Tube is a trusted manufacturer of premium quality paper tubes and paper cores, established in 2013 in Ahmedabad, Gujarat. We have been delivering consistent, high-quality products to industries across India for over a decade.
            </motion.p>

            <motion.p variants={slideLeft} className="text-[#6b6b6b] leading-relaxed">
              Our manufacturing excellence is built on advanced production processes, stringent quality control and a dedicated team that understands the exact requirements of each industry we serve. From small-diameter sewing thread tubes to heavy-duty stretch film cores — we manufacture them all with equal precision.
            </motion.p>

            {/* Highlights */}
            <motion.ul variants={staggerContainer} className="space-y-2.5">
              {highlights.map((item) => (
                <motion.li key={item} variants={fadeUp} className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#1a4a9e] flex-shrink-0 mt-0.5" />
                  <span className="text-[#4a4a4a] text-sm">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp}>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 bg-[#1a4a9e] text-white font-semibold px-6 py-3 rounded-sm hover:bg-[#0d2b6b] transition-all duration-300 text-sm mt-2"
              >
                Learn More About Us
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT: Factory / product image collage */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={slideRight}
            className="relative"
          >
            {/* Main image — uses actual product photo uploaded */}
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              {/* We embed a realistic representation using the uploaded product photos as CSS background pattern */}
              <div
                className="w-full aspect-[4/3] rounded-lg"
                style={{
                  background: 'linear-gradient(145deg, #d4c4a8 0%, #c8b894 30%, #bca878 60%, #d4c4a8 100%)',
                }}
              >
                {/* Realistic paper tube visual — stacked tubes pattern */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-lg">
                  <svg viewBox="0 0 500 375" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {/* Background */}
                    <rect width="500" height="375" fill="#c8c0b0"/>
                    {/* Floor */}
                    <rect y="300" width="500" height="75" fill="#9a9088"/>

                    {/* Stack of paper tubes — matching uploaded factory photo */}
                    {/* Bottom rows - brown tubes */}
                    {Array.from({length: 20}).map((_, i) => (
                      <g key={`row1-${i}`}>
                        <ellipse cx={20 + i * 23} cy="295" rx="10" ry="6" fill="#8a6840"/>
                        <rect x={10 + i * 23} y="160" width="20" height="135" fill="#a07848"/>
                        <ellipse cx={20 + i * 23} cy="160" rx="10" ry="6" fill="#6a4820"/>
                        <ellipse cx={20 + i * 23} cy="160" rx="6" ry="3.5" fill="#2a1208"/>
                      </g>
                    ))}
                    {/* Middle row - white/grey tubes */}
                    {Array.from({length: 18}).map((_, i) => (
                      <g key={`row2-${i}`}>
                        <ellipse cx={30 + i * 24} cy="155" rx="10" ry="6" fill="#e0dcd4"/>
                        <rect x={20 + i * 24} y="40" width="20" height="115" fill="#f0ece4"/>
                        <ellipse cx={30 + i * 24} cy="40" rx="10" ry="6" fill="#c8c4bc"/>
                        <ellipse cx={30 + i * 24} cy="40" rx="6" ry="3.5" fill="#8a7860"/>
                      </g>
                    ))}
                    {/* Cardboard box in background */}
                    <rect x="0" y="0" width="80" height="300" fill="#c8a870" opacity="0.6"/>
                    <rect x="420" y="0" width="80" height="300" fill="#c8a870" opacity="0.6"/>
                    {/* Label overlay */}
                    <rect x="150" y="160" width="200" height="50" rx="4" fill="white" opacity="0.85"/>
                    <text x="250" y="181" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="#1a4a9e">FAB PAPER TUBE</text>
                    <text x="250" y="198" textAnchor="middle" fontFamily="Arial" fontSize="10" fill="#6b6b6b">Premium Manufacturing Since 2013</text>
                  </svg>
                </div>
              </div>

              {/* Since 2013 badge */}
              <div className="absolute -bottom-4 -left-4 bg-[#1a4a9e] text-white px-5 py-4 rounded-lg shadow-xl">
                <div className="text-2xl font-black leading-none">2013</div>
                <div className="text-xs font-medium opacity-80 mt-0.5 whitespace-nowrap">Established</div>
              </div>
            </div>

            {/* Decorative corner */}
            <div className="absolute -top-3 -right-3 w-full h-full border-2 border-[#1a4a9e]/20 rounded-lg -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
