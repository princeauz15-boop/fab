'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PageBanner from '@/components/ui/PageBanner';
import {
  CheckCircle2,
  Award,
  Target,
  Users,
  ArrowRight,
  ClipboardList,
  Package,
  Cog,
  CheckSquare,
  Truck,
} from 'lucide-react';
import {
  staggerContainer,
  fadeUp,
  slideLeft,
  slideRight,
  viewportConfig,
} from '@/lib/animations';
import SectionHeading from '@/components/ui/SectionHeading';

const values = [
  {
    icon: Target,
    title: 'Precision',
    description: 'Every tube manufactured to exact dimensional specifications required by your production.',
  },
  {
    icon: CheckCircle2,
    title: 'Consistency',
    description: 'Same quality, same dimensions, batch after batch. Your production depends on it.',
  },
  {
    icon: Award,
    title: 'Quality',
    description: 'High-quality kraft paper selection and controlled manufacturing process.',
  },
  {
    icon: Users,
    title: 'Customer Focus',
    description: 'Custom sizes, specific requirements and responsive service — built around your needs.',
  },
];

const processSteps = [
  { icon: ClipboardList, number: '01', title: 'Requirement Understanding', description: 'We begin by understanding your exact tube specifications — diameter, length, wall thickness, paper grade and application.' },
  { icon: Package, number: '02', title: 'Material Selection', description: 'The right kraft paper grade is selected based on required strength, application type and dimensional requirements.' },
  { icon: Cog, number: '03', title: 'Tube Manufacturing', description: 'Tubes are manufactured on our production line with precision winding for consistent wall thickness and dimensions.' },
  { icon: CheckSquare, number: '04', title: 'Quality Checking', description: 'Every batch undergoes dimension, wall consistency, strength and finish checks before packing.' },
  { icon: Truck, number: '05', title: 'Final Supply', description: 'Carefully packed and delivered to your facility with reliable, on-time supply.' },
];

export default function AboutPageClient() {
  return (
    <div className="pt-20">
      <PageBanner
        eyebrow="Since 2013"
        title="About FAB Paper Tube"
        highlight="Paper Tube"
        description="A decade of manufacturing precision paper tubes and paper cores with a relentless focus on quality, consistency and customer requirements."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Company Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={staggerContainer}
              className="flex flex-col gap-5"
            >
              <motion.div variants={slideLeft} className="flex items-center gap-3">
                <span className="w-8 h-0.5 bg-[#c8922a]" />
                <span className="text-[#c8922a] text-xs font-bold tracking-[0.2em] uppercase">Company Overview</span>
              </motion.div>
              <motion.h2 variants={slideLeft} className="text-3xl md:text-4xl font-black text-[#1a1a1a] leading-tight">
                Manufacturing Paper Tubes with Precision{' '}
                <span className="text-[#c8922a]">Since 2013</span>
              </motion.h2>
              <motion.p variants={slideLeft} className="text-[#6b6b6b] leading-relaxed">
                FAB Paper Tube is an Ahmedabad-based paper tube and paper core manufacturer established in 2013. Over the past decade, we have built a strong reputation for manufacturing precision paper tubes that meet the exact requirements of our customers.
              </motion.p>
              <motion.p variants={slideLeft} className="text-[#6b6b6b] leading-relaxed">
                Our manufacturing facility is located at Star Gold Industrial Park, Kuha, Ahmedabad, Gujarat — strategically positioned to serve customers across Gujarat and pan-India.
              </motion.p>
              <motion.p variants={slideLeft} className="text-[#6b6b6b] leading-relaxed">
                What sets FAB Paper Tube apart is our <strong className="text-[#1a1a1a] font-semibold">core specialisation in small-size and small-diameter paper tubes</strong>. This segment requires significantly higher precision in wall thickness, dimensional accuracy and paper quality — areas where we have developed deep expertise over the years.
              </motion.p>
              {/* Highlights */}
              <motion.div variants={staggerContainer} className="mt-2 space-y-3">
                {[
                  'Established in 2013 in Ahmedabad, Gujarat',
                  'Speciality in small-size paper tube manufacturing',
                  'Custom size manufacturing as per customer requirements',
                  'Serving textile, packaging, cracker, candle and industrial sectors',
                  'Pan-India supply capabilities',
                ].map((item) => (
                  <motion.div key={item} variants={fadeUp} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#c8922a] flex-shrink-0 mt-0.5" />
                    <span className="text-[#4a4a4a] text-sm">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={slideRight}
              className="space-y-6"
            >
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '2013', label: 'Year Established', accent: true },
                  { value: '10+', label: 'Years Experience', accent: false },
                  { value: '8+', label: 'Product Types', accent: false },
                  { value: '100%', label: 'Customer-Focused', accent: true },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={`p-6 rounded text-center ${stat.accent ? 'bg-[#c8922a] text-white' : 'bg-[#f5f4f0] text-[#1a1a1a]'}`}
                  >
                    <div className={`text-3xl font-black mb-1 ${stat.accent ? 'text-white' : 'text-[#c8922a]'}`}>
                      {stat.value}
                    </div>
                    <div className={`text-xs ${stat.accent ? 'text-white/80' : 'text-[#9a9a9a]'} uppercase tracking-wider`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Main speciality box */}
              <div className="bg-[#0f0f0f] p-6 rounded text-white">
                <div className="text-[#c8922a] text-xs font-bold tracking-widest uppercase mb-3">Our Speciality</div>
                <div className="text-2xl font-black mb-3">Small Size. Big Precision.</div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We specialise in small-size and small-diameter paper tube manufacturing — where precision, wall thickness consistency and dimensional accuracy are critical.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[#f5f4f0]">
        <div className="container-custom">
          <div className="mb-10">
            <SectionHeading
              eyebrow="What Drives Us"
              title="Our Manufacturing Values"
              description="The principles that guide every tube we manufacture."
            />
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  variants={fadeUp}
                  custom={i}
                  className="bg-white p-6 rounded border border-[#e5e5e5] hover:border-[#c8922a]/40 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="w-11 h-11 bg-[#c8922a]/10 rounded flex items-center justify-center mb-4">
                    <Icon size={20} className="text-[#c8922a]" />
                  </div>
                  <h3 className="font-bold text-[#1a1a1a] text-base mb-2">{val.title}</h3>
                  <p className="text-[#6b6b6b] text-sm leading-relaxed">{val.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Manufacturing Process — Horizontal Timeline Design */}
      <section className="section-padding" style={{ background: 'linear-gradient(160deg, #1a3d60 0%, #1E4E76 50%, #1a3d60 100%)' }}>
        <div className="container-custom">

          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              className="inline-flex items-center gap-3 mb-5"
            >
              <span className="block h-[2px] w-10 rounded" style={{ background: '#4db8ff' }} />
              <span className="font-bold tracking-[0.25em] uppercase" style={{ color: '#4db8ff', fontSize: '13px' }}>
                How We Work
              </span>
              <span className="block h-[2px] w-10 rounded" style={{ background: '#4db8ff' }} />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ delay: 0.1 }}
              className="font-black text-white mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}
            >
              Our Manufacturing Process
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ delay: 0.15 }}
              className="max-w-lg mx-auto"
              style={{ color: 'rgba(180,210,240,0.85)', fontSize: '16px', lineHeight: '1.7' }}
            >
              From your requirement to final delivery — a structured and quality-focused approach.
            </motion.p>
          </div>

          {/* Timeline Steps */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="relative"
          >
            {/* Horizontal connector line — desktop only */}
            <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-[2px] z-0"
              style={{ background: 'linear-gradient(90deg, transparent 4%, rgba(77,184,255,0.25) 20%, rgba(77,184,255,0.25) 80%, transparent 96%)' }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
              {processSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    variants={fadeUp}
                    custom={i}
                    className="process-step-card flex flex-col items-center text-center group cursor-default"
                  >
                    {/* Icon circle — hover turns gold #c8922a */}
                    <div
                      className="process-icon-wrap relative z-10 flex items-center justify-center rounded-full mb-5 transition-all duration-400"
                      style={{
                        width: '104px',
                        height: '104px',
                        background: 'rgba(255,255,255,0.07)',
                        border: '2px solid rgba(77,184,255,0.30)',
                      }}
                    >
                      {/* Inner circle */}
                      <div
                        className="process-icon-inner flex items-center justify-center rounded-full transition-all duration-400"
                        style={{
                          width: '72px',
                          height: '72px',
                          background: 'rgba(77,184,255,0.12)',
                        }}
                      >
                        <Icon
                          size={30}
                          className="process-icon transition-all duration-400"
                          style={{ color: '#4db8ff' }}
                        />
                      </div>

                      {/* Step number badge */}
                      <div
                        className="absolute -top-2 -right-2 flex items-center justify-center rounded-full font-black transition-all duration-400"
                        style={{
                          width: '28px',
                          height: '28px',
                          background: '#1E4E76',
                          border: '2px solid rgba(77,184,255,0.40)',
                          fontSize: '11px',
                          color: '#4db8ff',
                        }}
                      >
                        {step.number}
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-black mb-2 transition-colors duration-300"
                      style={{ color: '#ffffff', fontSize: '15px', lineHeight: '1.3' }}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p style={{ color: 'rgba(180,215,245,0.75)', fontSize: '13px', lineHeight: '1.6' }}>
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Hover styles via style tag */}
        <style>{`
          .process-step-card:hover .process-icon-wrap {
            border-color: #c8922a;
            box-shadow: 0 0 28px rgba(200,146,42,0.35);
          }
          .process-step-card:hover .process-icon-inner {
            background: rgba(200,146,42,0.18);
          }
          .process-step-card:hover .process-icon {
            color: #c8922a !important;
          }
          .process-step-card:hover h3 {
            color: #f5be30 !important;
          }
        `}</style>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-[#1a1a1a] mb-4">
              Ready to Start a Partnership?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#6b6b6b] mb-8">
              Tell us your paper tube requirements and we will manufacture them to your exact specifications.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-[#c8922a] text-white font-semibold px-7 py-3.5 rounded-sm hover:bg-[#a67520] transition-all duration-300 text-sm"
              >
                Get a Quote
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#f5f4f0] text-[#1a1a1a] font-semibold px-7 py-3.5 rounded-sm hover:bg-[#e5e5e5] transition-colors text-sm"
              >
                View Products
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
