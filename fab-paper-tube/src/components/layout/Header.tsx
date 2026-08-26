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
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0,    opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300',
          scrolled
            ? 'shadow-[0_4px_28px_rgba(0,0,0,0.14)]'
            : 'shadow-[0_1px_8px_rgba(0,0,0,0.08)]'
        )}
        style={{ padding: scrolled ? '6px 0' : '10px 0' }}
      >
        <div className="container-custom flex items-center justify-between" style={{ gap: '24px' }}>

          {/* ══ LOGO — 90px normal, 76px scrolled ══ */}
          <Link href="/" aria-label="FAB Paper Tube Home" className="flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              style={{
                position: 'relative',
                width:  scrolled ? '76px' : '90px',
                height: scrolled ? '76px' : '90px',
                transition: 'width 0.3s ease, height 0.3s ease',
                flexShrink: 0,
              }}
            >
              <Image
                src="/images/fab-logo.png"
                alt="FAB Paper Tube Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* ══ DESKTOP NAV ══ */}
          <nav
            className="hidden lg:flex items-center flex-1 justify-center"
            style={{ gap: '4px' }}
            aria-label="Main navigation"
          >
            {navItems.map((item, i) => {
              const active = pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'relative font-bold tracking-wide transition-colors duration-200',
                      active ? 'text-[#1a4a9e]' : 'text-[#1a1a1a] hover:text-[#1a4a9e]'
                    )}
                    style={{ padding: '10px 16px', fontSize: '15px', display: 'block' }}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-ul"
                        className="absolute bottom-0 left-3 right-3 rounded-full bg-[#1a4a9e]"
                        style={{ height: '2.5px' }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* ══ RIGHT: phone + CTA ══ */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.45 }}
            className="hidden lg:flex items-center flex-shrink-0"
            style={{ gap: '16px' }}
          >
            <a
              href="tel:+918238074700"
              className="flex items-center gap-2 font-semibold text-[#444] hover:text-[#1a4a9e] transition-colors"
              style={{ fontSize: '15px' }}
            >
              <Phone size={16} className="text-[#1a4a9e]" />
              +91 82380 74700
            </a>

            <Link
              href="/contact"
              className="flex items-center gap-2 bg-[#1a4a9e] text-white font-bold rounded-sm hover:bg-[#0d2b6b] transition-all duration-300 shadow-md group"
              style={{ fontSize: '15px', padding: '11px 22px' }}
            >
              Get a Quote
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* ══ MOBILE TOGGLE ══ */}
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
                  <X size={26} />
                </motion.div>
              ) : (
                <motion.div key="m"
                  initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={26} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* ══ MOBILE MENU ══ */}
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
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                <div style={{ position: 'relative', width: '72px', height: '72px', flexShrink: 0 }}>
                  <Image src="/images/fab-logo.png" alt="FAB Paper Tube" fill className="object-contain" />
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded hover:bg-gray-100">
                  <X size={22} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto py-2">
                {navItems.map((item, i) => (
                  <motion.div key={item.href}
                    initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 + 0.07 }}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center justify-between px-5 py-4 font-bold border-b border-gray-50 transition-colors',
                        pathname === item.href
                          ? 'text-[#1a4a9e] bg-blue-50'
                          : 'text-[#1a1a1a] hover:text-[#1a4a9e] hover:bg-gray-50'
                      )}
                      style={{ fontSize: '16px' }}
                    >
                      {item.label}
                      {pathname === item.href && <span className="w-2 h-2 rounded-full bg-[#1a4a9e]" />}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="p-5 border-t border-gray-100 space-y-3">
                <a href="tel:+918238074700"
                  className="flex items-center gap-2 text-gray-500 hover:text-[#1a4a9e] transition-colors"
                  style={{ fontSize: '15px' }}>
                  <Phone size={16} className="text-[#1a4a9e]" /> +91 82380 74700
                </a>
                <Link href="/contact"
                  className="w-full bg-[#1a4a9e] text-white font-bold rounded-sm flex items-center justify-center gap-2 hover:bg-[#0d2b6b] transition-colors"
                  style={{ fontSize: '15px', padding: '12px 20px' }}>
                  Get a Quote <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
