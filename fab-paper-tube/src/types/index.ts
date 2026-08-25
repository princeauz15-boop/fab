// ─── Product Types ────────────────────────────────────────────────────────────
export interface Product {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  featuredImage: WPImage | null;
  gallery: WPImage[];
  usedFor: string[];
  applications: string[];
  specifications: ProductSpecification[];
  seoTitle: string;
  seoDescription: string;
  acf: ProductACF;
}

export interface ProductACF {
  short_description?: string;
  used_for?: string;
  applications?: string;
  specifications?: ProductSpecification[];
  seo_title?: string;
  seo_description?: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface WPImage {
  id: number;
  url: string;
  alt: string;
  width: number;
  height: number;
}

// ─── WordPress REST API Types ─────────────────────────────────────────────────
export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: WPMedia[];
    'wp:term'?: WPTerm[][];
  };
  acf?: Record<string, unknown>;
  yoast_head_json?: {
    title?: string;
    description?: string;
    og_image?: { url: string }[];
  };
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    width: number;
    height: number;
    sizes?: Record<string, { source_url: string; width: number; height: number }>;
  };
}

export interface WPTerm {
  id: number;
  name: string;
  slug: string;
}

// ─── Testimonial Types ────────────────────────────────────────────────────────
export interface Testimonial {
  id: number;
  clientName: string;
  designation: string;
  company: string;
  review: string;
  rating: number;
  photo?: WPImage;
}

// ─── Company Settings ─────────────────────────────────────────────────────────
export interface CompanySettings {
  name: string;
  tagline: string;
  phone1: string;
  phone2: string;
  email: string;
  address: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  whatsapp?: string;
}

// ─── Application Types ────────────────────────────────────────────────────────
export interface Application {
  id: string;
  title: string;
  description: string;
  icon: string;
  products: string[];
  image?: string;
}

// ─── Navigation Types ─────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// ─── Animation Variants ───────────────────────────────────────────────────────
export interface AnimationVariant {
  hidden: Record<string, unknown>;
  visible: Record<string, unknown>;
}
