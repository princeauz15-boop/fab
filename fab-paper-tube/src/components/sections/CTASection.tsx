'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Phone, CheckCircle2 } from 'lucide-react';
import { staggerContainer, fadeUp, viewportConfig } from '@/lib/animations';

const tags = ['Custom Sizes', 'Small Diameter Tubes', 'Fast Delivery', 'Pan India Supply'];

export default function CTASection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0d2240 0%, #1a4a9e 50%, #0d2240 100%)',
        padding: '96px 0',
      }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top gold line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #c8922a 30%, #e0a83b 50%, #c8922a 70%, transparent)',
        }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-6">
            <span className="block h-[2px] w-8 rounded" style={{ background: '#e0a83b' }} />
            <span
              className="font-bold tracking-[0.25em] uppercase"
              style={{ color: '#e0a83b', fontSize: '12px' }}
            >
              Start Your Order
            </span>
            <span className="block h-[2px] w-8 rounded" style={{ background: '#e0a83b' }} />
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="font-black text-white leading-tight tracking-tight mb-5"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}
          >
            Looking for the Right{' '}
            <span style={{ color: '#e0a83b' }}>Paper Tube?</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="leading-relaxed mb-10 mx-auto"
            style={{
              color: 'rgba(200,218,245,0.80)',
              fontSize: '16px',
              maxWidth: '560px',
              lineHeight: '1.8',
            }}
          >
            Tell us your required{' '}
            <strong className="font-semibold text-white">
              size, diameter, length, quantity and application
            </strong>
            . Our team will help you find the right paper tube solution for your manufacturing needs.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 text-white font-bold rounded-md hover:-translate-y-0.5 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #c8922a, #e0a83b)',
                fontSize: '15px',
                padding: '14px 30px',
                boxShadow: '0 4px 20px rgba(200,146,42,0.35)',
              }}
            >
              <MessageSquare size={16} />
              Send Your Requirement
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="tel:+918238074700"
              className="group inline-flex items-center gap-2.5 font-bold rounded-md hover:-translate-y-0.5 transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '2px solid rgba(255,255,255,0.20)',
                color: '#ffffff',
                fontSize: '15px',
                padding: '14px 30px',
              }}
            >
              <Phone size={16} />
              Call Us Now
            </a>
          </motion.div>

          {/* Tags */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 font-medium"
                style={{
                  color: 'rgba(200,218,245,0.75)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '999px',
                  padding: '5px 16px',
                  fontSize: '13px',
                  background: 'rgba(255,255,255,0.05)',
                }}
              >
                <CheckCircle2 size={11} style={{ color: '#e0a83b' }} />
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
