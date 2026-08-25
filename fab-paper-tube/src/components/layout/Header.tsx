'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'HOME',       href: '/' },
  { label: 'ABOUT US',   href: '/about' },
  { label: 'WHY US?',    href: '/why-choose-us' },
  { label: 'PRODUCTS',   href: '/products' },
  { label: 'CONTACT US', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      {/* ─────────────────────────────────────────────
          HEADER  – white background, matches screenshot
      ───────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300',
          scrolled
            ? 'shadow-[0_2px_20px_rgba(0,0,0,0.13)] py-1'
            : 'shadow-[0_1px_6px_rgba(0,0,0,0.08)]  py-2'
        )}
      >
        <div className="container-custom flex items-center justify-between gap-4">

          {/* ── Logo (small circle, left) ── */}
          <Link href="/" aria-label="FAB Paper Tube Home" className="flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className={cn(
                'relative transition-all duration-300',
                scrolled ? 'w-[56px] h-[56px]' : 'w-[64px] h-[64px]'
              )}
            >
              <Image
                src="/images/fab-logo.svg"
                alt="FAB Paper Tube Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav
            className="hidden lg:flex items-center gap-0 flex-1 justify-center"
            aria-label="Main navigation"
          >
            {navItems.map((item, i) => {
              const active = pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'relative px-4 py-2 text-[13px] font-bold tracking-wide transition-colors duration-200',
                      active
                        ? 'text-[#1a4a9e]'
                        : 'text-[#333] hover:text-[#1a4a9e]'
                    )}
                  >
                    {item.label}
                    {/* active underline */}
                    {active && (
                      <motion.span
                        layoutId="hdr-underline"
                        className="absolute bottom-0 left-2 right-2 h-[2.5px] rounded-full bg-[#1a4a9e]"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* ── Right: phone + CTA ── */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.45 }}
            className="hidden lg:flex items-center gap-3 flex-shrink-0"
          >
            <a
              href="tel:+918238074700"
              className="flex items-center gap-1.5 text-[13px] font-semibold text-[#555] hover:text-[#1a4a9e] transition-colors"
            >
              <Phone size={13} className="text-[#1a4a9e]" />
              +91 82380 74700
            </a>

            {/* "Get a Quote →" button — matches screenshot exactly */}
            <Link
              href="/contact"
              className="flex items-center gap-1.5 bg-[#1a4a9e] text-white text-[13px] font-bold px-5 py-2.5 rounded-sm hover:bg-[#0d2b6b] transition-all duration-300 shadow-md group"
            >
              Get a Quote
              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>

          {/* ── Mobile toggle ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded text-[#333] hover:bg-gray-100 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="x"
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div key="m"
                  initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* ─────────────────────────────────────────────
          MOBILE MENU
      ───────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 flex flex-col shadow-2xl"
            >
              {/* mobile logo */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="relative w-12 h-12">
                  <Image src="/images/fab-logo.svg" alt="FAB Paper Tube" fill className="object-contain" />
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded hover:bg-gray-100" aria-label="Close">
                  <X size={20} />
                </button>
              </div>

              {/* mobile nav */}
              <nav className="flex-1 overflow-y-auto py-2">
                {navItems.map((item, i) => (
                  <motion.div key={item.href}
                    initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 + 0.07 }}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center justify-between px-5 py-3.5 text-sm font-bold border-b border-gray-50 transition-colors',
                        pathname === item.href
                          ? 'text-[#1a4a9e] bg-blue-50'
                          : 'text-[#333] hover:text-[#1a4a9e] hover:bg-gray-50'
                      )}
                    >
                      {item.label}
                      {pathname === item.href && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1a4a9e]" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* mobile CTA */}
              <div className="p-4 border-t border-gray-100 space-y-3">
                <a href="tel:+918238074700"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1a4a9e] transition-colors">
                  <Phone size={13} className="text-[#1a4a9e]" /> +91 82380 74700
                </a>
                <Link href="/contact"
                  className="w-full bg-[#1a4a9e] text-white text-sm font-bold py-3 rounded-sm flex items-center justify-center gap-2 hover:bg-[#0d2b6b] transition-colors">
                  Get a Quote <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
