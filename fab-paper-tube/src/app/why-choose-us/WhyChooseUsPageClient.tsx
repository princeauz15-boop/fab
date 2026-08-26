'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PageBanner from '@/components/ui/PageBanner';
import {
  CheckCircle2, Ruler, Cog, UserCheck, Truck,
  ArrowRight, Shield, Award, Target, RefreshCw,
  Star, ChevronRight, Zap, TrendingUp,
} from 'lucide-react';
import { staggerContainer, fadeUp, slideLeft, slideRight, viewportConfig } from '@/lib/animations';
import CTASection from '@/components/sections/CTASection';

/* ─── Data ─────────────────────────────────────────────────────────────────── */
const reasons = [
  {
    number: '01',
    icon: CheckCircle2,
    title: 'Consistent Quality',
    description:
      'Quality is our primary focus. Every tube manufactured at FAB Paper Tube goes through rigorous quality checks before dispatch. We ensure the same quality, same dimensions and same finish — batch after batch, order after order.',
    points: [
      'Same dimensional accuracy every batch',
      'Consistent wall thickness and paper quality',
      'Quality checks before every dispatch',
      'No compromise on manufacturing standards',
    ],
    accent: '#1a4a9e',
    light: 'rgba(26,74,158,0.08)',
  },
  {
    number: '02',
    icon: Ruler,
    title: 'Small Size Expertise',
    description:
      'Manufacturing small-diameter paper tubes requires a level of precision that larger tube manufacturers often do not focus on. We have developed specific expertise in small-size tube production — where dimensional accuracy and wall thickness consistency are critical.',
    points: [
      'Specialised in small diameter tubes',
      'Higher precision for smaller sizes',
      'Deep manufacturing expertise in this segment',
      'Optimised for your winding and production needs',
    ],
    accent: '#c8922a',
    light: 'rgba(200,146,42,0.08)',
  },
  {
    number: '03',
    icon: Cog,
    title: 'Precision Manufacturing',
    description:
      'In paper tube manufacturing, precision is not optional. Your winding machine, your production line and your final product all depend on the paper tube performing consistently. We manufacture with precision as our core objective.',
    points: [
      'Tight dimensional tolerances',
      'Consistent inner diameter for smooth winding',
      'Precise length cutting',
      'Clean finishing on both tube ends',
    ],
    accent: '#1a4a9e',
    light: 'rgba(26,74,158,0.08)',
  },
  {
    number: '04',
    icon: UserCheck,
    title: 'Customer-Specific Requirements',
    description:
      "Not every paper tube requirement is standard. Different applications need different specifications. We manufacture exactly to your requirements — whether it's a specific diameter, a custom length, a particular wall thickness or a specific paper grade.",
    points: [
      'Custom diameter as per your requirement',
      'Custom length cutting',
      'Custom wall thickness',
      'Paper grade selection based on application',
    ],
    accent: '#c8922a',
    light: 'rgba(200,146,42,0.08)',
  },
  {
    number: '05',
    icon: Truck,
    title: 'Reliable Supply',
    description:
      'A paper tube supplier you can depend on makes a real difference to your production planning. Since 2013, we have built a reputation for reliable, on-time supply. We understand that your production schedule depends on our delivery.',
    points: [
      'On-time delivery commitment',
      'Consistent production capacity',
      'Reliable supply chain management',
      'Pan-India supply capabilities',
    ],
    accent: '#1a4a9e',
    light: 'rgba(26,74,158,0.08)',
  },
];

const stats = [
  { value: '10+', label: 'Years of Experience', icon: Award },
  { value: '500+', label: 'Happy Clients', icon: Star },
  { value: '99%', label: 'On-Time Delivery', icon: TrendingUp },
  { value: '100%', label: 'Quality Assured', icon: Shield },
];

const differentiators = [
  { icon: Shield, title: 'Quality First', description: 'Quality checking before every dispatch', color: '#1a4a9e' },
  { icon: Target, title: 'Precision Focus', description: 'Tight dimensional tolerances', color: '#c8922a' },
  { icon: Award, title: 'Industry Experience', description: '10+ years of manufacturing expertise', color: '#1a4a9e' },
  { icon: RefreshCw, title: 'Consistency', description: 'Same quality, batch after batch', color: '#c8922a' },
];

/* ─── Component ─────────────────────────────────────────────────────────────── */
export default function WhyChooseUsPageClient() {
  return (
    <div className="pt-20">

      {/* ── Banner ─────────────────────────────────────────────────────────── */}
      <PageBanner
        eyebrow="The FAB Advantage"
        title="Why Choose FAB Paper Tube?"
        highlight="FAB Paper Tube?"
        description="Built on a decade of manufacturing experience and an unwavering commitment to quality, precision and customer satisfaction."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Why Choose Us' }]}
      />

      {/* ── Quick Differentiators Bar ───────────────────────────────────────── */}
      <section className="bg-white border-b border-[#e5e5e5]" style={{ padding: '24px 0' }}>
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {differentiators.map((d) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={d.title}
                  variants={fadeUp}
                  className="flex items-center gap-3 group"
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${d.color}15`, border: `1px solid ${d.color}25` }}
                  >
                    <Icon size={18} style={{ color: d.color }} />
                  </div>
                  <div>
                    <div className="font-bold text-[#1a1a1a] text-sm leading-tight">{d.title}</div>
                    <div className="text-xs text-[#9a9a9a] mt-0.5">{d.description}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Stats Strip ────────────────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0d2240 0%, #1a4a9e 50%, #0d2240 100%)',
          padding: '56px 0',
        }}
      >
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  className="text-center group"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(200,146,42,0.18)', border: '1px solid rgba(200,146,42,0.35)' }}
                  >
                    <Icon size={22} style={{ color: '#e0a83b' }} />
                  </div>
                  <div
                    className="font-black leading-none mb-2"
                    style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#ffffff' }}
                  >
                    {s.value}
                  </div>
                  <div className="text-sm font-medium" style={{ color: 'rgba(200,220,255,0.75)' }}>
                    {s.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Section Intro ───────────────────────────────────────────────────── */}
      <section className="bg-[#f7f6f2]" style={{ padding: '72px 0 0' }}>
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-4">
              <span className="block h-[2px] w-8 rounded" style={{ background: '#c8922a' }} />
              <span className="font-bold tracking-[0.22em] uppercase text-xs" style={{ color: '#c8922a' }}>
                5 Strong Reasons
              </span>
              <span className="block h-[2px] w-8 rounded" style={{ background: '#c8922a' }} />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-black text-[#1a1a1a] leading-tight tracking-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
            >
              Why Manufacturers Choose{' '}
              <span style={{ color: '#1a4a9e' }}>FAB</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#6b6b6b] leading-relaxed" style={{ fontSize: '16px' }}>
              Here is what makes FAB Paper Tube the right manufacturing partner for your paper tube requirements.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Reason Cards ────────────────────────────────────────────────────── */}
      <section className="bg-[#f7f6f2]" style={{ padding: '48px 0 80px' }}>
        <div className="container-custom">
          <div className="space-y-6">
            {reasons.map((reason, i) => {
              const Icon = reason.icon;
              const isEven = i % 2 === 1;
              return (
                <motion.div
                  key={reason.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.65, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative bg-white rounded-2xl overflow-hidden"
                  style={{
                    border: '1px solid #e8e7e2',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                    transition: 'box-shadow 0.35s ease, transform 0.35s ease',
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px rgba(26,74,158,0.12)`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.04)';
                  }}
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                    style={{ background: `linear-gradient(180deg, ${reason.accent}, ${reason.accent}88)` }}
                  />

                  <div className="pl-8 pr-6 md:pr-10 py-8 md:py-10">
                    <div className={`grid md:grid-cols-2 gap-8 items-start ${isEven ? 'md:grid-flow-dense' : ''}`}>

                      {/* Left: Icon + Title + Description */}
                      <div className={isEven ? 'md:col-start-2' : ''}>
                        <div className="flex items-start gap-4 mb-5">
                          {/* Number badge */}
                          <div
                            className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                            style={{ background: reason.light, border: `1px solid ${reason.accent}22` }}
                          >
                            <Icon size={24} style={{ color: reason.accent }} />
                          </div>
                          <div className="flex-1">
                            <div
                              className="text-xs font-black tracking-widest mb-1"
                              style={{ color: reason.accent }}
                            >
                              {reason.number}
                            </div>
                            <h2 className="font-black text-[#1a1a1a] leading-tight" style={{ fontSize: '1.3rem' }}>
                              {reason.title}
                            </h2>
                          </div>
                        </div>
                        <p className="text-[#6b6b6b] leading-relaxed" style={{ fontSize: '14.5px' }}>
                          {reason.description}
                        </p>
                      </div>

                      {/* Right: Bullet Points */}
                      <div className={isEven ? 'md:col-start-1 md:row-start-1' : ''}>
                        <div
                          className="rounded-xl p-6 h-full"
                          style={{ background: reason.light, border: `1px solid ${reason.accent}18` }}
                        >
                          <div className="text-xs font-bold tracking-wider uppercase mb-4" style={{ color: reason.accent }}>
                            Key Highlights
                          </div>
                          <div className="space-y-3">
                            {reason.points.map((point) => (
                              <div key={point} className="flex items-start gap-3">
                                <div
                                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                  style={{ background: reason.accent }}
                                >
                                  <CheckCircle2 size={12} className="text-white" />
                                </div>
                                <span className="text-[#3a3a3a] font-medium" style={{ fontSize: '14px' }}>
                                  {point}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Background watermark number */}
                  <div
                    className="absolute bottom-2 right-6 font-black select-none pointer-events-none transition-opacity duration-300"
                    style={{
                      fontSize: '7rem',
                      lineHeight: 1,
                      color: 'rgba(0,0,0,0.03)',
                    }}
                    aria-hidden="true"
                  >
                    {reason.number}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Brand Promise Banner ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0b1f3a 0%, #1a4a9e 45%, #0b1f3a 100%)',
          padding: '96px 0',
        }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        {/* Gold orb */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.20, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/4 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(200,146,42,1) 0%, transparent 70%)',
          }}
        />
        {/* Blue orb */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.14, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/2 right-1/4 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(77,184,255,1) 0%, transparent 70%)',
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
            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-8">
              <span className="block h-[2px] w-10 rounded" style={{ background: '#e0a83b' }} />
              <span className="font-bold tracking-[0.28em] uppercase text-xs" style={{ color: '#e0a83b' }}>
                Our Brand Promise
              </span>
              <span className="block h-[2px] w-10 rounded" style={{ background: '#e0a83b' }} />
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="font-black text-white tracking-tight leading-none mb-6"
              style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
            >
              Small Size.{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #e0a83b 0%, #f5c96a 50%, #c8922a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Big Precision.
              </span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="leading-relaxed mb-10 mx-auto"
              style={{ color: 'rgba(200,225,255,0.82)', fontSize: '17px', maxWidth: '560px', lineHeight: '1.8' }}
            >
              This is not just a tagline. It is our manufacturing promise. Every paper tube that
              leaves our facility reflects our commitment to precision, quality and consistency.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-white font-bold rounded-lg hover:-translate-y-1 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #c8922a, #e0a83b)',
                  fontSize: '15px',
                  padding: '14px 32px',
                  boxShadow: '0 4px 24px rgba(200,146,42,0.35)',
                }}
              >
                Start Your Requirement
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 font-bold rounded-lg transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: '2px solid rgba(255,255,255,0.25)',
                  color: '#ffffff',
                  fontSize: '15px',
                  padding: '14px 32px',
                  background: 'rgba(255,255,255,0.08)',
                }}
              >
                View Products
                <ChevronRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Why FAB vs Others Comparison ─────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: '88px 0' }}>
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="max-w-2xl mx-auto text-center mb-14"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-4">
              <span className="block h-[2px] w-8 rounded" style={{ background: '#1a4a9e' }} />
              <span className="font-bold tracking-[0.22em] uppercase text-xs" style={{ color: '#1a4a9e' }}>
                The FAB Edge
              </span>
              <span className="block h-[2px] w-8 rounded" style={{ background: '#1a4a9e' }} />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-black text-[#1a1a1a] leading-tight mb-4"
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)' }}
            >
              What Sets Us Apart
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#6b6b6b]" style={{ fontSize: '16px' }}>
              A side-by-side comparison of what you get when you choose FAB Paper Tube.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {/* FAB Column */}
            <motion.div
              variants={slideLeft}
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(155deg, #1a4a9e 0%, #0d2b6b 100%)',
                boxShadow: '0 8px 40px rgba(26,74,158,0.25)',
              }}
            >
              <div className="px-8 py-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#e0a83b' }}>
                    <Zap size={14} className="text-white" />
                  </div>
                  <h3 className="font-black text-white text-lg">With FAB Paper Tube</h3>
                </div>
              </div>
              <div className="px-8 py-7 space-y-4">
                {[
                  'Guaranteed dimensional accuracy every batch',
                  'Small-diameter specialisation & expertise',
                  'Custom sizes — diameter, length, wall thickness',
                  'Consistent quality — same finish every order',
                  'On-time delivery with pan-India supply',
                  'Dedicated support for your requirements',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center" style={{ background: '#e0a83b' }}>
                      <CheckCircle2 size={11} className="text-white" />
                    </div>
                    <span className="text-white/90 font-medium" style={{ fontSize: '14px' }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Others Column */}
            <motion.div
              variants={slideRight}
              className="rounded-2xl overflow-hidden bg-white"
              style={{
                border: '1px solid #e8e7e2',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              }}
            >
              <div className="px-8 py-6 border-b border-[#eee]" style={{ background: '#fafaf8' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#e5e5e5]">
                    <span className="text-[#999] font-black text-sm">?</span>
                  </div>
                  <h3 className="font-black text-[#444] text-lg">Typical Supplier</h3>
                </div>
              </div>
              <div className="px-8 py-7 space-y-4">
                {[
                  'Batch-to-batch dimensional variation',
                  'Focus on standard sizes only',
                  'Limited customisation options',
                  'Inconsistent finish and quality',
                  'Unpredictable delivery schedules',
                  'Minimal post-order support',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center bg-[#fee2e2]">
                      <span className="text-red-500 font-black" style={{ fontSize: '10px' }}>✕</span>
                    </div>
                    <span className="text-[#7a7a7a]" style={{ fontSize: '14px' }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <CTASection />
    </div>
  );
}
