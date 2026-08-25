import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import CompanyIntroSection from '@/components/sections/CompanyIntroSection';
import SpecialitySection from '@/components/sections/SpecialitySection';
import ProductsSection from '@/components/sections/ProductsSection';
import ApplicationsSection from '@/components/sections/ApplicationsSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import QualitySection from '@/components/sections/QualitySection';
import ManufacturingProcess from '@/components/sections/ManufacturingProcess';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTASection from '@/components/sections/CTASection';
import { getAllProducts, getTestimonials } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'FAB Paper Tube | Paper Tube & Paper Core Manufacturer, Ahmedabad',
  description:
    'FAB Paper Tube — quality paper tubes and paper cores since 2013. Small-size specialists. Serving textile, packaging, cracker and industrial sectors from Ahmedabad, Gujarat.',
};

// JSON-LD Organization Schema
function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FAB Paper Tube',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fabpapertube.com',
    description:
      'Paper Tube and Paper Core Manufacturer based in Ahmedabad, Gujarat. Established in 2013.',
    foundingDate: '2013',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shed No. 14, Star Gold Industrial Park, Opp. Ghardaghar Kothiya Bus Stand, Indore Highway, Kuha',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      postalCode: '382433',
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-82380-74700',
        contactType: 'sales',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Gujarati'],
      },
    ],
    email: 'fabpapertube111@gmail.com',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function HomePage() {
  const [products, testimonials] = await Promise.all([
    getAllProducts(),
    getTestimonials(),
  ]);

  return (
    <>
      <OrganizationSchema />
      <HeroSection />
      <CompanyIntroSection />
      <SpecialitySection />
      <ProductsSection products={products} />
      <ApplicationsSection />
      <WhyChooseUsSection />
      <QualitySection />
      <ManufacturingProcess />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
    </>
  );
}
