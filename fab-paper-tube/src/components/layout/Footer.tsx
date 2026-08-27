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
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-shrink-0" style={{ width: '90px', height: '90px' }}>
                <Image
                  src="/images/fab-logo.png"
                  alt="FAB Paper Tube Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="font-black text-white" style={{ fontSize: '18px', letterSpacing: '0.04em' }}>
                  FAB PAPER TUBE
                </div>
                <div className="font-semibold tracking-[0.18em] uppercase mt-1" style={{ fontSize: '11px', color: '#c8922a' }}>
                  Since 2013
                </div>
              </div>
            </div>

            <p className="leading-relaxed mb-6" style={{ color: '#9a9a9a', fontSize: '14px' }}>
              Quality Paper Tubes manufactured with precision, consistency and customer-focused requirements. Specializing in small-size and small-diameter paper tube manufacturing.
            </p>

            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-[#c8922a]/10 border border-[#c8922a]/20 rounded px-3 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8922a]" />
              <span className="font-semibold tracking-wide" style={{ color: '#c8922a', fontSize: '12px' }}>
                Small Size. Big Precision.
              </span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp}>
            <h3 className="font-bold tracking-widest uppercase mb-6 flex items-center gap-2" style={{ color: '#ffffff', fontSize: '13px' }}>
              <span className="w-5 h-0.5 bg-[#c8922a]" />
              Quick Links
            </h3>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-0 rounded-md transition-all duration-250"
                    style={{
                      color: '#a0a0a0',
                      fontSize: '14.5px',
                      padding: '7px 10px 7px 0',
                      display: 'flex',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = '#e0a83b';
                      el.style.paddingLeft = '10px';
                      el.style.background = 'rgba(200,146,42,0.07)';
                      el.style.borderRadius = '6px';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = '#a0a0a0';
                      el.style.paddingLeft = '0px';
                      el.style.background = 'transparent';
                    }}
                  >
                    <ArrowRight size={13} className="mr-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200" style={{ color: '#e0a83b' }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div variants={fadeUp}>
            <h3 className="font-bold tracking-widest uppercase mb-6 flex items-center gap-2" style={{ color: '#ffffff', fontSize: '13px' }}>
              <span className="w-5 h-0.5 bg-[#c8922a]" />
              Products
            </h3>
            <ul className="space-y-1">
              {products.map((product) => (
                <li key={product.href}>
                  <Link
                    href={product.href}
                    className="group flex items-center gap-0 rounded-md transition-all duration-250"
                    style={{
                      color: '#a0a0a0',
                      fontSize: '14.5px',
                      padding: '7px 10px 7px 0',
                      display: 'flex',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = '#e0a83b';
                      el.style.paddingLeft = '10px';
                      el.style.background = 'rgba(200,146,42,0.07)';
                      el.style.borderRadius = '6px';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = '#a0a0a0';
                      el.style.paddingLeft = '0px';
                      el.style.background = 'transparent';
                    }}
                  >
                    <ArrowRight size={13} className="mr-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200" style={{ color: '#e0a83b' }} />
                    {product.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeUp}>
            <h3 className="font-bold tracking-widest uppercase mb-5 flex items-center gap-2" style={{ color: '#ffffff', fontSize: '13px' }}>
              <span className="w-5 h-0.5 bg-[#c8922a]" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+918238074700"
                  className="flex items-start gap-3 hover:text-white transition-colors duration-200 group"
                  style={{ color: '#a0a0a0' }}
                >
                  <Phone size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#c8922a' }} />
                  <div>
                    <div className="mb-0.5" style={{ color: '#666', fontSize: '12px' }}>Axit Hirani</div>
                    <div className="group-hover:text-[#c8922a] transition-colors" style={{ fontSize: '14px' }}>+91 82380 74700</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919879645030"
                  className="flex items-start gap-3 hover:text-white transition-colors duration-200 group"
                  style={{ color: '#a0a0a0' }}
                >
                  <Phone size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#c8922a' }} />
                  <div>
                    <div className="mb-0.5" style={{ color: '#666', fontSize: '12px' }}>Mansukh Ranpariya</div>
                    <div className="group-hover:text-[#c8922a] transition-colors" style={{ fontSize: '14px' }}>+91 98796 45030</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:fabpapertube111@gmail.com"
                  className="flex items-start gap-3 hover:text-white transition-colors duration-200 group"
                  style={{ color: '#a0a0a0' }}
                >
                  <Mail size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#c8922a' }} />
                  <span className="group-hover:text-[#c8922a] transition-colors break-all" style={{ fontSize: '14px' }}>
                    fabpapertube111@gmail.com
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Star+Gold+Industrial+Park+Kuha+Ahmedabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-white transition-colors duration-200 group"
                  style={{ color: '#a0a0a0' }}
                >
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#c8922a' }} />
                  <span className="group-hover:text-[#c8922a] transition-colors" style={{ fontSize: '14px', lineHeight: '1.6' }}>
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
