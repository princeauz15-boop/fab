'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { staggerContainer, fadeUp, viewportConfig } from '@/lib/animations';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Testimonial } from '@/types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= rating ? 'text-[#c8922a] fill-current' : 'text-gray-200'}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  if (!testimonials.length) return null;

  const testimonial = testimonials[current];

  return (
    <section className="section-padding bg-[#f5f4f0] overflow-hidden">
      <div className="container-custom">
        <div className="mb-12">
          <SectionHeading
            eyebrow="Client Feedback"
            title="What Our Clients Say"
            description="Trusted by manufacturers across textile, packaging, candle and cracker industries."
          />
        </div>

        {/* Desktop: Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.slice(0, 6).map((t, i) => (
            <motion.div
              key={t.id}
              variants={fadeUp}
              custom={i}
              className="bg-white p-6 rounded border border-[#e5e5e5] hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
            >
              <Quote size={28} className="text-[#c8922a]/20 mb-3" />
              <p className="text-[#4a4a4a] text-sm leading-relaxed flex-1 mb-4 italic">
                &ldquo;{t.review}&rdquo;
              </p>
              <div className="border-t border-[#f5f4f0] pt-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c8922a]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#c8922a] font-bold text-sm">{t.clientName.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-bold text-[#1a1a1a] text-sm">{t.clientName}</div>
                  <div className="text-[#9a9a9a] text-xs">{t.designation}</div>
                  {t.company && <div className="text-[#c8922a] text-xs font-medium">{t.company}</div>}
                  <div className="mt-1">
                    <StarRating rating={t.rating} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: Carousel */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white p-6 rounded border border-[#e5e5e5] shadow-sm"
            >
              <Quote size={28} className="text-[#c8922a]/20 mb-3" />
              <p className="text-[#4a4a4a] text-sm leading-relaxed mb-4 italic">
                &ldquo;{testimonial.review}&rdquo;
              </p>
              <div className="border-t border-[#f5f4f0] pt-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c8922a]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#c8922a] font-bold text-sm">{testimonial.clientName.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-bold text-[#1a1a1a] text-sm">{testimonial.clientName}</div>
                  <div className="text-[#9a9a9a] text-xs">{testimonial.designation}</div>
                  {testimonial.company && <div className="text-[#c8922a] text-xs font-medium">{testimonial.company}</div>}
                  <div className="mt-1">
                    <StarRating rating={testimonial.rating} />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel controls */}
          <div className="flex items-center justify-between mt-5">
            <button
              onClick={prev}
              className="w-10 h-10 border border-[#e5e5e5] rounded flex items-center justify-center hover:border-[#c8922a] hover:text-[#c8922a] transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'w-5 bg-[#c8922a]' : 'w-1.5 bg-[#e5e5e5]'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 border border-[#e5e5e5] rounded flex items-center justify-center hover:border-[#c8922a] hover:text-[#c8922a] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
