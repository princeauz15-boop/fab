'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { staggerContainer, fadeUp, viewportConfig } from '@/lib/animations';

export default function CTASection() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #122840 0%, #1E4E76 45%, #1a4268 100%)',
      }}
    >
      {/* Background product photo with strong overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/1 product.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ opacity: 0.10 }}
        />
      </div>

      {/* Subtle radial glow — sky blue */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.10, 0.06] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-0"
        style={{
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(77,184,255,1) 0%, transparent 70%)',
        }}
      />

      {/* Decorative dots pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="block h-[2px] w-10 rounded" style={{ background: '#4db8ff' }} />
            <span
              className="font-bold tracking-[0.25em] uppercase"
              style={{ color: '#4db8ff', fontSize: '13px' }}
            >
              Start Your Order
            </span>
            <span className="block h-[2px] w-10 rounded" style={{ background: '#4db8ff' }} />
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="font-black text-white leading-tight tracking-tight mb-5"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
          >
            Looking for the Right{' '}
            <span style={{ color: '#4db8ff' }}>Paper Tube?</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="leading-relaxed mb-10 mx-auto"
            style={{
              color: 'rgba(200,225,250,0.88)',
              fontSize: '17px',
              maxWidth: '600px',
              lineHeight: '1.7',
            }}
          >
            Tell us your required{' '}
            <strong className="text-white font-bold">
              size, diameter, length, quantity and application
            </strong>
            . Our team will help you find the right paper tube solution for your manufacturing needs.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 text-white font-bold rounded-sm hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #1a7ec8, #4db8ff)',
                fontSize: '15px',
                padding: '14px 32px',
              }}
            >
              <MessageSquare size={17} />
              Send Your Requirement
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <a
              href="tel:+918238074700"
              className="group inline-flex items-center gap-2.5 font-bold rounded-sm hover:-translate-y-0.5 transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.10)',
                border: '2px solid rgba(255,255,255,0.30)',
                color: '#ffffff',
                fontSize: '15px',
                padding: '14px 32px',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(255,255,255,0.18)';
                el.style.borderColor = 'rgba(77,184,255,0.6)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(255,255,255,0.10)';
                el.style.borderColor = 'rgba(255,255,255,0.30)';
              }}
            >
              <Phone size={17} />
              Call Us Now
            </a>
          </motion.div>

          {/* Feature tags */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-3"
          >
            {['Custom Sizes', 'Small Diameter Tubes', 'Fast Delivery', 'Pan India Supply'].map(
              (tag) => (
                <span
                  key={tag}
                  className="font-medium"
                  style={{
                    color: 'rgba(180,220,255,0.75)',
                    border: '1px solid rgba(77,184,255,0.22)',
                    borderRadius: '999px',
                    padding: '5px 16px',
                    fontSize: '13px',
                    background: 'rgba(77,184,255,0.06)',
                  }}
                >
                  {tag}
                </span>
              )
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
