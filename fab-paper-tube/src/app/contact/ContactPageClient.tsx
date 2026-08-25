'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, CheckCircle2, ArrowRight, Send } from 'lucide-react';
import { staggerContainer, fadeUp, slideLeft, slideRight, viewportConfig } from '@/lib/animations';

interface FormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  product: string;
  quantity: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

const contactInfo = [
  {
    icon: Phone,
    label: 'Axit Hirani',
    value: '+91 82380 74700',
    href: 'tel:+918238074700',
  },
  {
    icon: Phone,
    label: 'Mansukh Ranpariya',
    value: '+91 98796 45030',
    href: 'tel:+919879645030',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'fabpapertube111@gmail.com',
    href: 'mailto:fabpapertube111@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Factory Address',
    value:
      'Shed No. 14, Star Gold Industrial Park, Opp. Ghardaghar Kothiya Bus Stand, Indore Highway, Kuha, Ahmedabad, Gujarat - 382433',
    href: 'https://maps.google.com/?q=Star+Gold+Industrial+Park+Kuha+Ahmedabad',
  },
];

const productOptions = [
  'White Sewing Thread Paper Tube',
  'Brown Notebook Cover Paper Tube',
  'Birthday Cake Sparkle Candle Tube',
  'Selfie Stick Pencil Crackers Tube',
  'Butterfly Firecracker Tube',
  'Thermal Roll Paper Tube',
  'Mirchi Bomb Paper Tube',
  'Stretch Film Roll Paper Tube',
  'Custom / Other Requirement',
];

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Name is required';
  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^[+]?[\d\s-]{8,15}$/.test(data.phone)) {
    errors.phone = 'Enter a valid phone number';
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Enter a valid email address';
  }
  if (!data.message.trim()) errors.message = 'Please describe your requirement';
  return errors;
}

export default function ContactPageClient() {
  const [form, setForm] = useState<FormData>({
    name: '',
    company: '',
    phone: '',
    email: '',
    product: '',
    quantity: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    // Simulate API call — replace with your real endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-[#0f0f0f] relative overflow-hidden py-20 md:py-28">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(200,146,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,146,42,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-2xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-[#c8922a]" />
              <span className="text-[#c8922a] text-xs font-bold tracking-[0.2em] uppercase">
                Get In Touch
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4"
            >
              Contact{' '}
              <span className="text-[#c8922a]">FAB Paper Tube</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-gray-400 text-base md:text-lg leading-relaxed">
              Send us your paper tube requirement — size, diameter, length, quantity and application.
              We will get back to you with the right solution.
            </motion.p>
            <motion.nav
              variants={fadeUp}
              aria-label="Breadcrumb"
              className="flex items-center gap-2 mt-6 text-xs text-gray-600"
            >
              <Link href="/" className="hover:text-[#c8922a] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-gray-400">Contact</span>
            </motion.nav>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={staggerContainer}
              className="flex flex-col gap-6"
            >
              <motion.div variants={slideLeft}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-0.5 bg-[#c8922a]" />
                  <span className="text-[#c8922a] text-xs font-bold tracking-[0.2em] uppercase">
                    Reach Us Directly
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-[#1a1a1a] leading-tight">
                  We Are Ready to Help
                </h2>
              </motion.div>

              <motion.p variants={slideLeft} className="text-[#6b6b6b] leading-relaxed">
                Have a paper tube requirement? Call us, send an email or fill the form. Our team will
                respond promptly with the right solution.
              </motion.p>

              {/* Contact Cards */}
              <motion.div variants={staggerContainer} className="space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={info.label}
                      variants={fadeUp}
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-start gap-4 p-4 border border-[#e5e5e5] rounded hover:border-[#c8922a]/40 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 bg-[#c8922a]/10 rounded flex items-center justify-center flex-shrink-0 group-hover:bg-[#c8922a]/20 transition-colors">
                        <Icon size={18} className="text-[#c8922a]" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#9a9a9a] uppercase tracking-wider mb-0.5">
                          {info.label}
                        </div>
                        <div className="text-[#1a1a1a] text-sm font-medium group-hover:text-[#c8922a] transition-colors">
                          {info.value}
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </motion.div>

              {/* Map embed placeholder */}
              <motion.div
                variants={fadeUp}
                className="rounded overflow-hidden border border-[#e5e5e5] aspect-video bg-[#f5f4f0] flex items-center justify-center"
              >
                <a
                  href="https://maps.google.com/?q=Star+Gold+Industrial+Park+Kuha+Ahmedabad+382433"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 text-[#9a9a9a] hover:text-[#c8922a] transition-colors group"
                >
                  <MapPin size={32} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">View on Google Maps</span>
                  <span className="text-xs text-center px-6 leading-relaxed">
                    Shed No. 14, Star Gold Industrial Park, Kuha, Ahmedabad
                  </span>
                </a>
              </motion.div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={slideRight}
            >
              <div className="bg-[#f5f4f0] rounded p-6 md:p-8 border border-[#e5e5e5]">
                {submitted ? (
                  /* Success State */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center text-center py-10 gap-4"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-black text-[#1a1a1a]">Requirement Sent!</h3>
                    <p className="text-[#6b6b6b] text-sm leading-relaxed max-w-sm">
                      Thank you for contacting FAB Paper Tube. We have received your requirement and
                      will get back to you shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: '',
                          company: '',
                          phone: '',
                          email: '',
                          product: '',
                          quantity: '',
                          message: '',
                        });
                      }}
                      className="mt-2 text-sm text-[#c8922a] font-semibold hover:underline"
                    >
                      Send Another Requirement
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h2 className="text-xl font-black text-[#1a1a1a] mb-1">Send Your Requirement</h2>
                      <p className="text-[#9a9a9a] text-sm">
                        Fill in the details below and we will get back to you.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                      {/* Name + Company */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-xs font-semibold text-[#4a4a4a] uppercase tracking-wider mb-1.5"
                          >
                            Name <span className="text-[#c8922a]">*</span>
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className={`w-full px-4 py-3 bg-white border rounded text-sm text-[#1a1a1a] placeholder:text-[#c0c0c0] focus:outline-none focus:ring-2 focus:ring-[#c8922a]/30 focus:border-[#c8922a] transition-colors ${
                              errors.name ? 'border-red-400' : 'border-[#e5e5e5]'
                            }`}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="company"
                            className="block text-xs font-semibold text-[#4a4a4a] uppercase tracking-wider mb-1.5"
                          >
                            Company Name
                          </label>
                          <input
                            id="company"
                            name="company"
                            type="text"
                            value={form.company}
                            onChange={handleChange}
                            placeholder="Company / Business name"
                            className="w-full px-4 py-3 bg-white border border-[#e5e5e5] rounded text-sm text-[#1a1a1a] placeholder:text-[#c0c0c0] focus:outline-none focus:ring-2 focus:ring-[#c8922a]/30 focus:border-[#c8922a] transition-colors"
                          />
                        </div>
                      </div>

                      {/* Phone + Email */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-xs font-semibold text-[#4a4a4a] uppercase tracking-wider mb-1.5"
                          >
                            Phone <span className="text-[#c8922a]">*</span>
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className={`w-full px-4 py-3 bg-white border rounded text-sm text-[#1a1a1a] placeholder:text-[#c0c0c0] focus:outline-none focus:ring-2 focus:ring-[#c8922a]/30 focus:border-[#c8922a] transition-colors ${
                              errors.phone ? 'border-red-400' : 'border-[#e5e5e5]'
                            }`}
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-xs font-semibold text-[#4a4a4a] uppercase tracking-wider mb-1.5"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className={`w-full px-4 py-3 bg-white border rounded text-sm text-[#1a1a1a] placeholder:text-[#c0c0c0] focus:outline-none focus:ring-2 focus:ring-[#c8922a]/30 focus:border-[#c8922a] transition-colors ${
                              errors.email ? 'border-red-400' : 'border-[#e5e5e5]'
                            }`}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      {/* Product + Quantity */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="product"
                            className="block text-xs font-semibold text-[#4a4a4a] uppercase tracking-wider mb-1.5"
                          >
                            Product Requirement
                          </label>
                          <select
                            id="product"
                            name="product"
                            value={form.product}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-[#e5e5e5] rounded text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#c8922a]/30 focus:border-[#c8922a] transition-colors appearance-none cursor-pointer"
                          >
                            <option value="">Select product type</option>
                            {productOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="quantity"
                            className="block text-xs font-semibold text-[#4a4a4a] uppercase tracking-wider mb-1.5"
                          >
                            Quantity
                          </label>
                          <input
                            id="quantity"
                            name="quantity"
                            type="text"
                            value={form.quantity}
                            onChange={handleChange}
                            placeholder="e.g. 10,000 pieces"
                            className="w-full px-4 py-3 bg-white border border-[#e5e5e5] rounded text-sm text-[#1a1a1a] placeholder:text-[#c0c0c0] focus:outline-none focus:ring-2 focus:ring-[#c8922a]/30 focus:border-[#c8922a] transition-colors"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-xs font-semibold text-[#4a4a4a] uppercase tracking-wider mb-1.5"
                        >
                          Your Requirement <span className="text-[#c8922a]">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Describe your requirement — tube diameter, length, wall thickness, application, etc."
                          className={`w-full px-4 py-3 bg-white border rounded text-sm text-[#1a1a1a] placeholder:text-[#c0c0c0] focus:outline-none focus:ring-2 focus:ring-[#c8922a]/30 focus:border-[#c8922a] transition-colors resize-none ${
                            errors.message ? 'border-red-400' : 'border-[#e5e5e5]'
                          }`}
                        />
                        {errors.message && (
                          <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                        )}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-[#c8922a] text-white font-bold py-3.5 rounded-sm hover:bg-[#a67520] transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                      >
                        {loading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Send Requirement
                            <ArrowRight size={14} />
                          </>
                        )}
                      </button>

                      <p className="text-xs text-[#9a9a9a] text-center">
                        Fields marked with <span className="text-[#c8922a]">*</span> are required
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
