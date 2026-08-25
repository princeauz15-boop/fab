'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Applications', href: '/applications' },
  { label: 'Why Choose Us', href: '/why-choose-us' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Determine if we're on the home page for transparent header
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const headerScrolled = scrolled || !isHome;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
          headerScrolled
            ? 'bg-white shadow-[0_1px_20px_rgba(0,0,0,0.08)] py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="FAB Paper Tube Home">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              {/* Logo Mark */}
              <div className="w-9 h-9 bg-[#c8922a] flex items-center justify-center rounded-sm flex-shrink-0">
                <span className="text-white font-black text-lg leading-none">F</span>
              </div>
              <div className="flex flex-col">
                <span
                  className={cn(
                    'font-black text-base leading-none tracking-tight transition-colors duration-300',
                    headerScrolled ? 'text-[#1a1a1a]' : 'text-white'
                  )}
                >
                  FAB PAPER TUBE
                </span>
                <span
                  className={cn(
                    'text-[10px] font-medium tracking-[0.15em] uppercase transition-colors duration-300',
                    headerScrolled ? 'text-[#c8922a]' : 'text-[#c8922a]'
                  )}
                >
                  Since 2013
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium transition-colors duration-200 group',
                    headerScrolled ? 'text-[#1a1a1a]' : 'text-white',
                    pathname === item.href && 'text-[#c8922a]'
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      'absolute bottom-0 left-3 right-3 h-0.5 bg-[#c8922a] transition-all duration-300 origin-left',
                      pathname === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    )}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="hidden lg:flex items-center gap-3"
          >
            <a
              href="tel:+918238074700"
              className={cn(
                'flex items-center gap-1.5 text-sm font-medium transition-colors duration-200',
                headerScrolled ? 'text-[#6b6b6b] hover:text-[#1a1a1a]' : 'text-white/80 hover:text-white'
              )}
            >
              <Phone size={14} />
              <span>+91 82380 74700</span>
            </a>
            <Link
              href="/contact"
              className="bg-[#c8922a] text-white text-sm font-semibold px-5 py-2.5 rounded-sm hover:bg-[#a67520] transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center gap-2 group"
            >
              Get a Quote
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              'lg:hidden p-2 rounded transition-colors duration-200',
              headerScrolled
                ? 'text-[#1a1a1a] hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            )}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[90vw] bg-white z-50 flex flex-col shadow-2xl"
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-5 border-b border-[#e5e5e5]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#c8922a] flex items-center justify-center rounded-sm">
                    <span className="text-white font-black text-base leading-none">F</span>
                  </div>
                  <div>
                    <div className="font-black text-sm text-[#1a1a1a]">FAB PAPER TUBE</div>
                    <div className="text-[9px] font-medium tracking-widest uppercase text-[#c8922a]">Since 2013</div>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} className="text-[#1a1a1a]" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex-1 overflow-y-auto py-4" aria-label="Mobile navigation">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center justify-between px-5 py-3.5 text-sm font-medium border-b border-[#f5f5f5] transition-colors duration-200',
                        pathname === item.href
                          ? 'text-[#c8922a] bg-[#c8922a]/5'
                          : 'text-[#1a1a1a] hover:text-[#c8922a] hover:bg-[#f5f5f5]'
                      )}
                    >
                      {item.label}
                      {pathname === item.href && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c8922a]" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className="p-5 border-t border-[#e5e5e5] space-y-3">
                <a
                  href="tel:+918238074700"
                  className="flex items-center gap-2 text-sm text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
                >
                  <Phone size={14} className="text-[#c8922a]" />
                  +91 82380 74700
                </a>
                <Link
                  href="/contact"
                  className="w-full bg-[#c8922a] text-white text-sm font-semibold px-5 py-3 rounded-sm hover:bg-[#a67520] transition-colors flex items-center justify-center gap-2"
                >
                  Get a Quote
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
