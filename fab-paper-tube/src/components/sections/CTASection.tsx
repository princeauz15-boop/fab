'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Phone, CheckCircle2, Zap } from 'lucide-react';
import { staggerContainer, fadeUp, slideLeft, slideRight, viewportConfig } from '@/lib/animations';

const tags = ['Custom Sizes', 'Small Diameter Tubes', 'Fast Delivery', 'Pan India Supply'];

const features = [
  'Any diameter — small or large',
  'Custom length cutting',
  'Specific wall thickness',
  'Pan-India delivery',
];

export default function CTASection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: '#ffffff', padding: '88px 0' }}
    >
      {/* Subtle top separator */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: '#e8edf5' }} />

      {/* Light grid background */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(26,74,158,1) 1px, transparent 1px), linear-gradient(90deg, rgba(26,74,158,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Text content ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-5">
              <span className="block h-[2px] w-8 rounded" style={{ background: '#c8922a' }} />
              <span
                className="font-bold tracking-[0.25em] uppercase"
                style={{ color: '#c8922a', fontSize: '12px' }}
              >
                Start Your Order
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              className="font-black leading-tight tracking-tight mb-5"
              style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', color: '#0d1f3c' }}
            >
              Looking for the{' '}
              <span style={{ color: '#1a4a9e' }}>Right Paper Tube</span>{' '}
              for Your Production?
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="leading-relaxed mb-7"
              style={{ color: '#5a6a8a', fontSize: '16px', lineHeight: '1.8', maxWidth: '460px' }}
            >
              Tell us your required{' '}
              <strong className="font-semibold" style={{ color: '#0d1f3c' }}>
                size, diameter, length, quantity and application
              </strong>
              . We manufacture exactly to your specs.
            </motion.p>

            {/* Feature list */}
            <motion.div variants={fadeUp} className="space-y-2.5 mb-9">
              {features.map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(26,74,158,0.10)' }}
                  >
                    <CheckCircle2 size={12} style={{ color: '#1a4a9e' }} />
                  </div>
                  <span className="font-medium" style={{ color: '#3a4a6a', fontSize: '14px' }}>{f}</span>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 text-white font-bold rounded-md hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #1a4a9e, #2a5fc0)',
                  fontSize: '15px',
                  padding: '14px 28px',
                  boxShadow: '0 4px 18px rgba(26,74,158,0.30)',
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
                  background: 'transparent',
                  border: '2px solid #c8922a',
                  color: '#c8922a',
                  fontSize: '15px',
                  padding: '14px 28px',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = '#c8922a';
                  el.style.color = '#ffffff';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'transparent';
                  el.style.color = '#c8922a';
                }}
              >
                <Phone size={16} />
                Call Us Now
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right: Highlight card ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={slideRight}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(155deg, #0d2240 0%, #1a4a9e 100%)',
                boxShadow: '0 20px 60px rgba(26,74,158,0.22)',
              }}
            >
              {/* Card top accent */}
              <div
                className="h-[4px] w-full"
                style={{
                  background: 'linear-gradient(90deg, #c8922a, #e0a83b, #c8922a)',
                }}
              />

              <div className="p-8 md:p-10">
                {/* Card heading */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(200,146,42,0.18)' }}
                  >
                    <Zap size={20} style={{ color: '#e0a83b' }} />
                  </div>
                  <div>
                    <div className="font-black text-white text-lg leading-tight">Quick Response</div>
                    <div className="text-sm" style={{ color: 'rgba(180,210,255,0.65)' }}>We reply within 24 hours</div>
                  </div>
                </div>

                {/* Stat row */}
                <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  {[
                    { value: '10+', label: 'Years' },
                    { value: '500+', label: 'Clients' },
                    { value: '100%', label: 'Quality' },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <div
                        className="font-black text-white leading-none mb-1"
                        style={{ fontSize: '1.6rem' }}
                      >
                        {s.value}
                      </div>
                      <div className="text-xs font-medium" style={{ color: 'rgba(180,210,255,0.60)' }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 font-medium"
                      style={{
                        color: 'rgba(200,218,245,0.80)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '999px',
                        padding: '5px 14px',
                        fontSize: '12px',
                        background: 'rgba(255,255,255,0.05)',
                      }}
                    >
                      <CheckCircle2 size={10} style={{ color: '#e0a83b' }} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
