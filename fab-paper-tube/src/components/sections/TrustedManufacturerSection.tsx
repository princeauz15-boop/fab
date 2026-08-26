'use client';

import Link from 'next/link';
import Image from 'next/image';
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

          {/* RIGHT: Factory / product image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={slideRight}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/Trusted_Paper_Tube.jpeg"
                alt="FAB Paper Tube manufacturing facility"
                width={620}
                height={465}
                className="w-full h-auto object-cover"
                style={{ display: 'block' }}
              />
            </div>

            {/* Decorative corner */}
            <div
              className="absolute -top-3 -right-3 w-full h-full rounded-2xl -z-10"
              style={{ border: '2px solid rgba(26,74,158,0.18)' }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
