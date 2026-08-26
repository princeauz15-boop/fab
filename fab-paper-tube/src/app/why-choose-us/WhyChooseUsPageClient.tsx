'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PageBanner from '@/components/ui/PageBanner';
import {
  CheckCircle2, Ruler, Cog, UserCheck, Truck,
  ArrowRight, Shield, Award, Target, RefreshCw,
} from 'lucide-react';
import { staggerContainer, fadeUp, viewportConfig } from '@/lib/animations';
import SectionHeading from '@/components/ui/SectionHeading';
import CTASection from '@/components/sections/CTASection';

const reasons = [
  {
    number: '01',
    icon: CheckCircle2,
    title: 'Consistent Quality',
    description: 'Quality is our primary focus. Every tube manufactured at FAB Paper Tube goes through quality checks before dispatch. We ensure the same quality, same dimensions and same finish — batch after batch, order after order.',
    points: [
      'Same dimensional accuracy every batch',
      'Consistent wall thickness and paper quality',
      'Quality checks before every dispatch',
      'No compromise on manufacturing standards',
    ],
  },
  {
    number: '02',
    icon: Ruler,
    title: 'Small Size Expertise',
    description: 'Manufacturing small-diameter paper tubes requires a level of precision that larger tube manufacturers often do not focus on. We have developed specific expertise in small-size tube production — where dimensional accuracy and wall thickness consistency are critical.',
    points: [
      'Specialised in small diameter tubes',
      'Higher precision requirement for smaller sizes',
      'Deep manufacturing expertise in this segment',
      'Optimised for your winding and production needs',
    ],
  },
  {
    number: '03',
    icon: Cog,
    title: 'Precision Manufacturing',
    description: 'In paper tube manufacturing, precision is not optional. Your winding machine, your production line and your final product all depend on the paper tube performing consistently. We manufacture with precision as our core objective.',
    points: [
      'Tight dimensional tolerances',
      'Consistent inner diameter for smooth winding',
      'Precise length cutting',
      'Clean finishing on both tube ends',
    ],
  },
  {
    number: '04',
    icon: UserCheck,
    title: 'Customer-Specific Requirements',
    description: "Not every paper tube requirement is standard. Different applications need different specifications. We understand this and manufacture exactly to your requirements — whether it's a specific diameter, a custom length, a particular wall thickness or a specific paper grade.",
    points: [
      'Custom diameter as per your requirement',
      'Custom length cutting',
      'Custom wall thickness',
      'Paper grade selection based on application',
    ],
  },
  {
    number: '05',
    icon: Truck,
    title: 'Reliable Supply',
    description: 'A paper tube supplier you can depend on makes a real difference to your production planning. Since 2013, we have built a reputation for reliable, on-time supply. We understand that your production schedule depends on our delivery.',
    points: [
      'On-time delivery commitment',
      'Consistent production capacity',
      'Reliable supply chain management',
      'Pan-India supply capabilities',
    ],
  },
];

const differentiators = [
  { icon: Shield, title: 'Quality First', description: 'Quality checking before every dispatch' },
  { icon: Target, title: 'Precision Focus', description: 'Tight dimensional tolerances' },
  { icon: Award, title: 'Industry Experience', description: '10+ years of manufacturing expertise' },
  { icon: RefreshCw, title: 'Consistency', description: 'Same quality, batch after batch' },
];

export default function WhyChooseUsPageClient() {
  return (
    <div className="pt-20">
      <PageBanner
        eyebrow="The FAB Advantage"
        title="Why Choose FAB Paper Tube?"
        highlight="FAB Paper Tube?"
        description="Built on a decade of manufacturing experience and an unwavering commitment to quality, precision and customer satisfaction."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Why Choose Us' }]}
      />

      {/* Quick differentiators */}
      <section className="py-10 bg-white border-b border-[#e5e5e5]">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
          >
            {differentiators.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div key={d.title} variants={fadeUp} custom={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(30,78,118,0.10)' }}>
                    <Icon size={18} style={{ color: '#1E4E76' }} />
                  </div>
                  <div>
                    <div className="font-bold text-[#1a1a1a] text-sm">{d.title}</div>
                    <div className="text-xs text-[#9a9a9a]">{d.description}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Detailed Reasons */}
      <section className="section-padding bg-[#f5f4f0]">
        <div className="container-custom">
          <div className="mb-12">
            <SectionHeading
              eyebrow="5 Strong Reasons"
              title="Why Manufacturers Choose FAB"
              description="Here is what makes FAB Paper Tube the right manufacturing partner for your paper tube requirements."
            />
          </div>

          <div className="space-y-8">
            {reasons.map((reason, i) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={reason.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="bg-white rounded border border-[#e5e5e5] p-6 md:p-8 relative overflow-hidden group hover:border-[#1E4E76]/30 hover:shadow-md transition-all duration-300"
                >
                  {/* Background number */}
                  <div
                    className="absolute top-0 right-6 text-[8rem] font-black text-[#f5f4f0] group-hover:text-[#c8922a]/5 transition-colors duration-300 leading-none select-none"
                    aria-hidden="true"
                  >
                    {reason.number}
                  </div>

                  <div className="relative z-10 grid md:grid-cols-2 gap-6 items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded flex items-center justify-center" style={{ background: 'rgba(30,78,118,0.10)' }}>
                          <Icon size={20} style={{ color: '#1E4E76' }} />
                        </div>
                        <div>
                          <div className="text-xs font-bold" style={{ color: '#1E4E76' }}>{reason.number}</div>
                          <h2 className="font-black text-[#1a1a1a] text-xl leading-tight">{reason.title}</h2>
                        </div>
                      </div>
                      <p className="text-[#6b6b6b] text-sm leading-relaxed">{reason.description}</p>
                    </div>

                    <div className="space-y-2.5">
                      {reason.points.map((point) => (
                        <div key={point} className="flex items-start gap-2.5">
                          <CheckCircle2 size={15} style={{ color: '#1E4E76' }} className="flex-shrink-0 mt-0.5" />
                          <span className="text-[#4a4a4a] text-sm">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Brand Promise */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0e2a45 0%, #1E4E76 50%, #0e2a45 100%)' }}
      >
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Sky blue glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(77,184,255,0.08) 0%, transparent 70%)',
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
            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-6">
              <span className="block h-[2px] w-10 rounded" style={{ background: '#4db8ff' }} />
              <span className="font-bold tracking-[0.25em] uppercase" style={{ color: '#4db8ff', fontSize: '13px' }}>
                Our Brand Promise
              </span>
              <span className="block h-[2px] w-10 rounded" style={{ background: '#4db8ff' }} />
            </motion.div>

            {/* Big tagline */}
            <motion.div
              variants={fadeUp}
              className="font-black text-white mb-5 tracking-tight leading-none"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
            >
              Small Size.{' '}
              <span style={{ color: '#4db8ff' }}>Big Precision.</span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="leading-relaxed mb-10 mx-auto"
              style={{ color: 'rgba(195,225,250,0.85)', fontSize: '17px', maxWidth: '560px', lineHeight: '1.7' }}
            >
              This is not just a tagline. It is our manufacturing promise. Every paper tube that
              leaves our facility reflects our commitment to precision, quality and consistency.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-white font-bold rounded-sm hover:-translate-y-0.5 transition-all duration-300 shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #1a7ec8, #4db8ff)',
                  fontSize: '15px',
                  padding: '13px 28px',
                }}
              >
                Start Your Requirement
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 font-bold rounded-sm transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  border: '2px solid rgba(77,184,255,0.35)',
                  color: '#ffffff',
                  fontSize: '15px',
                  padding: '13px 28px',
                  background: 'rgba(77,184,255,0.07)',
                }}
              >
                View Products
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
