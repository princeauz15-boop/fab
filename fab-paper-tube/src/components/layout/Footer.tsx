'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { staggerContainer, fadeUp, viewportConfig } from '@/lib/animations';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Products', href: '/products' },
  { label: 'Applications', href: '/applications' },
  { label: 'Why Choose Us', href: '/why-choose-us' },
  { label: 'Contact', href: '/contact' },
];

const products = [
  { label: 'Sewing Thread Tube', href: '/products/white-sewing-thread-paper-tube' },
  { label: 'Notebook Cover Tube', href: '/products/brown-notebook-cover-paper-tube' },
  { label: 'Sparkle Candle Tube', href: '/products/birthday-cake-sparkle-candle-tube' },
  { label: 'Thermal Roll Tube', href: '/products/thermal-roll-paper-tube' },
  { label: 'Stretch Film Tube', href: '/products/stretch-film-roll-paper-tube' },
  { label: 'Firecracker Tubes', href: '/products' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f0f0f] text-white relative overflow-hidden">
      {/* Industrial Pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(200,146,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,146,42,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top Accent Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#c8922a] to-transparent" />

      <div className="container-custom relative z-10">
        {/* Main Footer Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Brand Column */}
          <motion.div variants={fadeUp} className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src="/images/fab-logo.png"
                  alt="FAB Paper Tube Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="font-black text-base text-white">FAB PAPER TUBE</div>
                <div className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#c8922a]">Since 2013</div>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Quality Paper Tubes manufactured with precision, consistency and customer-focused requirements. Specializing in small-size and small-diameter paper tube manufacturing.
            </p>

            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-[#c8922a]/10 border border-[#c8922a]/20 rounded px-3 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8922a]" />
              <span className="text-[#c8922a] text-xs font-semibold tracking-wide">Small Size. Big Precision.</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp}>
            <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-[#c8922a]" />
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#c8922a] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div variants={fadeUp}>
            <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-[#c8922a]" />
              Products
            </h3>
            <ul className="space-y-2.5">
              {products.map((product) => (
                <li key={product.href}>
                  <Link
                    href={product.href}
                    className="text-gray-400 hover:text-[#c8922a] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0" />
                    {product.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeUp}>
            <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-[#c8922a]" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+918238074700"
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  <Phone size={15} className="mt-0.5 flex-shrink-0 text-[#c8922a]" />
                  <div>
                    <div className="text-xs text-gray-600 mb-0.5">Axit Hirani</div>
                    <div className="text-sm group-hover:text-[#c8922a] transition-colors">+91 82380 74700</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919879645030"
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  <Phone size={15} className="mt-0.5 flex-shrink-0 text-[#c8922a]" />
                  <div>
                    <div className="text-xs text-gray-600 mb-0.5">Mansukh Ranpariya</div>
                    <div className="text-sm group-hover:text-[#c8922a] transition-colors">+91 98796 45030</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:fabpapertube111@gmail.com"
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  <Mail size={15} className="mt-0.5 flex-shrink-0 text-[#c8922a]" />
                  <span className="text-sm group-hover:text-[#c8922a] transition-colors break-all">fabpapertube111@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Star+Gold+Industrial+Park+Kuha+Ahmedabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  <MapPin size={15} className="mt-0.5 flex-shrink-0 text-[#c8922a]" />
                  <span className="text-sm group-hover:text-[#c8922a] transition-colors">
                    Shed No. 14, Star Gold Industrial Park,<br />
                    Kuha, Ahmedabad, Gujarat - 382433
                  </span>
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/5" />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <span>
            © {currentYear} FAB Paper Tube. All rights reserved.
          </span>
          <span className="flex items-center gap-1">
            Paper Tube Manufacturer, Ahmedabad, Gujarat, India
          </span>
        </div>
      </div>
    </footer>
  );
}
