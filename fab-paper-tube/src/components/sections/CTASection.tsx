'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { staggerContainer, fadeUp, viewportConfig } from '@/lib/animations';

export default function CTASection() {
  return (
    <section className="section-padding bg-[#0f0f0f] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(200,146,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,146,42,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        {/* Radial glow */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, #c8922a 0%, transparent 70%)' }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.span
            variants={fadeUp}
            className="text-[#c8922a] text-xs font-bold tracking-[0.25em] uppercase flex items-center justify-center gap-3 mb-5"
          >
            <span className="w-8 h-0.5 bg-[#c8922a]" />
            Start Your Order
            <span className="w-8 h-0.5 bg-[#c8922a]" />
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-5"
          >
            Looking for the Right{' '}
            <span className="text-[#c8922a]">Paper Tube?</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-gray-400 text-base md:text-lg leading-relaxed mb-10"
          >
            Tell us your required <strong className="text-white font-medium">size, diameter, length, quantity and application</strong>. Our team will help you find the right paper tube solution for your manufacturing needs.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 bg-[#c8922a] text-white font-semibold px-8 py-4 rounded-sm hover:bg-[#a67520] transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl text-sm"
            >
              <MessageSquare size={16} />
              Send Your Requirement
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+918238074700"
              className="group inline-flex items-center gap-2.5 bg-transparent border-2 border-white/20 text-white font-semibold px-8 py-4 rounded-sm hover:border-[#c8922a] hover:text-[#c8922a] transition-all duration-300 text-sm"
            >
              <Phone size={16} />
              Call Us Now
            </a>
          </motion.div>

          {/* Info tags */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3 mt-10">
            {['Custom Sizes', 'Small Diameter Tubes', 'Fast Delivery', 'Pan India Supply'].map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-500 border border-white/10 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
