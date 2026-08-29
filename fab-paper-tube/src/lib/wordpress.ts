import type { WPPost, WPMedia, Product, WPImage, Testimonial, CompanySettings } from '@/types';

const WP_API_URL =
  process.env.WORDPRESS_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2';

// ─── Fetch Helper ─────────────────────────────────────────────────────────────
async function wpFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${WP_API_URL}${endpoint}`;
  const res = await fetch(url, {
    next: { revalidate: 3600 }, // ISR: revalidate every hour
    ...options,
  });
  if (!res.ok) {
    throw new Error(`WP API error: ${res.status} for ${url}`);
  }
  return res.json();
}

// ─── Media Helper ─────────────────────────────────────────────────────────────
function parseMedia(media: WPMedia): WPImage {
  return {
    id: media.id,
    url: media.source_url,
    alt: media.alt_text || '',
    width: media.media_details?.width || 800,
    height: media.media_details?.height || 600,
  };
}

// ─── YouTube URL → Embed ID ───────────────────────────────────────────────────
export function getYouTubeEmbedId(url: string): string | null {
  if (!url) return null;
  // Handles: youtu.be/ID, youtube.com/watch?v=ID, youtube.com/shorts/ID
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// ─── Parse Product Post ───────────────────────────────────────────────────────
function parseProduct(post: WPPost): Product {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  const featuredImage = media ? parseMedia(media) : null;
  const acf = (post.acf || {}) as Record<string, unknown>;

  // ACF field: used_for (multiline text → array)
  const usedFor =
    typeof acf.used_for === 'string'
      ? acf.used_for.split('\n').map((s) => s.trim()).filter(Boolean)
      : [];

  // ACF field: applications (multiline text → array)
  const applications =
    typeof acf.applications === 'string'
      ? acf.applications.split('\n').map((s) => s.trim()).filter(Boolean)
      : typeof acf.usage_application === 'string' && acf.usage_application.trim()
      ? [acf.usage_application.trim()]
      : [];

  // Build specifications from ACF fields — only include if non-empty
  const specsList: Product['specifications'] = [];
  const addSpec = (label: string, val: unknown) => {
    if (typeof val === 'string' && val.trim()) {
      specsList.push({ label, value: val.trim() });
    }
  };
  addSpec('Thickness', acf.thickness);
  addSpec('Diameter', acf.diameter);
  addSpec('Length', acf.length);
  addSpec('Size', acf.size);
  addSpec('Weight', acf.weight);
  // usage_application is the correct ACF field name in WordPress
  addSpec('Usage / Application', acf.usage_application ?? acf.usage);
  addSpec('Material', acf.material);
  addSpec('Quality / Features', acf.quality);

  // Merge with legacy specifications array if provided
  const legacySpecs = Array.isArray(acf.specifications)
    ? (acf.specifications as Product['specifications'])
    : [];
  const allSpecs = specsList.length > 0 ? specsList : legacySpecs;

  const productOrder =
    typeof acf.product_order === 'number'
      ? acf.product_order
      : typeof post.menu_order === 'number'
      ? post.menu_order
      : 999;

  // short_description: prefer ACF field, fall back to excerpt
  const shortDesc =
    typeof acf.short_description === 'string' && acf.short_description.trim()
      ? acf.short_description.trim()
      : post.excerpt.rendered.replace(/<[^>]*>/g, '').trim();

  // video: product_video is the actual ACF field name
  const rawVideo = acf.product_video ?? acf.video_url;
  const videoUrl =
    typeof rawVideo === 'string' && rawVideo.trim() ? rawVideo.trim() : undefined;

  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    shortDescription: shortDesc,
    description: post.content.rendered,
    featuredImage,
    gallery: [],
    usedFor,
    applications,
    specifications: allSpecs,
    seoTitle: post.yoast_head_json?.title || post.title.rendered,
    seoDescription: post.yoast_head_json?.description || '',
    acf: acf as Product['acf'],
    videoUrl,
    thickness: typeof acf.thickness === 'string' && acf.thickness.trim() ? acf.thickness.trim() : undefined,
    diameter: typeof acf.diameter === 'string' && acf.diameter.trim() ? acf.diameter.trim() : undefined,
    length: typeof acf.length === 'string' && acf.length.trim() ? acf.length.trim() : undefined,
    size: typeof acf.size === 'string' && acf.size.trim() ? acf.size.trim() : undefined,
    weight: typeof acf.weight === 'string' && acf.weight.trim() ? acf.weight.trim() : undefined,
    usage: typeof acf.usage_application === 'string' && acf.usage_application.trim() ? acf.usage_application.trim() : undefined,
    material: typeof acf.material === 'string' && acf.material.trim() ? acf.material.trim() : undefined,
    quality: typeof acf.quality === 'string' && acf.quality.trim() ? acf.quality.trim() : undefined,
    productOrder,
  };
}

// ─── Products ─────────────────────────────────────────────────────────────────

// Try CPT 'products' first, fall back to posts in 'products' category
export async function getAllProducts(): Promise<Product[]> {
  try {
    let posts: WPPost[] = [];

    // Try 1: Custom Post Type 'products'
    try {
      posts = await wpFetch<WPPost[]>(
        '/products?_embed&per_page=100&status=publish&orderby=menu_order&order=asc'
      );
    } catch {
      // Try 2: Posts in 'products' category
      posts = await wpFetch<WPPost[]>(
        '/posts?categories=products&_embed&per_page=100&status=publish&orderby=menu_order&order=asc'
      );
    }

    const parsed = posts.map(parseProduct);
    // Sort by productOrder ascending
    return parsed.sort((a, b) => (a.productOrder ?? 999) - (b.productOrder ?? 999));
  } catch {
    return getFallbackProducts();
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    let posts: WPPost[] = [];

    try {
      posts = await wpFetch<WPPost[]>(`/products?slug=${slug}&_embed&status=publish`);
    } catch {
      posts = await wpFetch<WPPost[]>(`/posts?slug=${slug}&_embed&status=publish`);
    }

    if (!posts || posts.length === 0) return null;
    return parseProduct(posts[0]);
  } catch {
    const fallback = getFallbackProducts();
    return fallback.find((p) => p.slug === slug) ?? null;
  }
}

export async function getRelatedProducts(currentSlug: string, limit = 4): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const posts = await wpFetch<WPPost[]>('/testimonials?_embed&per_page=20&status=publish');
    return posts.map((post) => {
      const acf = (post.acf || {}) as Record<string, string | number>;
      return {
        id: post.id,
        clientName: typeof acf.client_name === 'string' ? acf.client_name : post.title.rendered,
        designation: typeof acf.designation === 'string' ? acf.designation : '',
        company: typeof acf.company === 'string' ? acf.company : '',
        review: typeof acf.review === 'string' ? acf.review : post.content.rendered,
        rating: typeof acf.rating === 'number' ? acf.rating : 5,
      };
    });
  } catch {
    return getFallbackTestimonials();
  }
}

// ─── Company Settings ─────────────────────────────────────────────────────────
export async function getCompanySettings(): Promise<CompanySettings> {
  try {
    const settings = await wpFetch<Record<string, string>>('/company-settings');
    return {
      name: settings.name || 'FAB Paper Tube',
      tagline: settings.tagline || 'Small Size. Big Precision.',
      phone1: settings.phone1 || '+91 82380 74700',
      phone2: settings.phone2 || '+91 98796 45030',
      email: settings.email || 'fabpapertube111@gmail.com',
      address:
        settings.address ||
        'Shed No. 14, Star Gold Industrial Park, Opp. Ghardaghar Kothiya Bus Stand, Indore Highway, Kuha, Ahmedabad, Gujarat - 382433',
      addressLine1: settings.address_line1 || 'Shed No. 14, Star Gold Industrial Park',
      addressLine2:
        settings.address_line2 || 'Opp. Ghardaghar Kothiya Bus Stand, Indore Highway, Kuha',
      city: settings.city || 'Ahmedabad',
      state: settings.state || 'Gujarat',
      pincode: settings.pincode || '382433',
      facebook: settings.facebook,
      instagram: settings.instagram,
      linkedin: settings.linkedin,
      whatsapp: settings.whatsapp || '+918238074700',
    };
  } catch {
    return getFallbackCompanySettings();
  }
}

// ─── Fallback Data ────────────────────────────────────────────────────────────
export function getFallbackProducts(): Product[] {
  return [
    {
      id: 1,
      slug: 'white-sewing-thread-paper-tube',
      title: 'White Sewing Thread Paper Tube',
      shortDescription:
        'Strong paper tubes specially made for sewing thread winding. Designed for smooth winding, good strength and reliable support.',
      description:
        '<p>Our White Sewing Thread Paper Tubes are manufactured with high precision to ensure consistent winding and smooth unwinding of sewing threads and yarns.</p>',
      featuredImage: null,
      gallery: [],
      usedFor: ['Sewing Thread & Yarn Winding'],
      applications: ['Textile Industry'],
      specifications: [
        { label: 'Material', value: 'High-quality Kraft Paper' },
        { label: 'Usage / Application', value: 'Sewing Thread Winding' },
      ],
      seoTitle: 'White Sewing Thread Paper Tube | FAB Paper Tube',
      seoDescription: 'Premium white sewing thread paper tubes for yarn winding.',
      acf: {},
      productOrder: 1,
    },
    {
      id: 2,
      slug: 'brown-notebook-cover-paper-tube',
      title: 'Brown Notebook Cover Paper Tube',
      shortDescription:
        'Strong and durable paper tubes used inside notebook cover rolls, keeping the material neat and wrinkle-free during winding.',
      description:
        '<p>Brown Notebook Cover Paper Tubes provide excellent support for notebook cover rolls and paper roll winding.</p>',
      featuredImage: null,
      gallery: [],
      usedFor: ['Notebook Cover Roll Winding'],
      applications: ['Stationery Industry'],
      specifications: [
        { label: 'Material', value: 'Brown Kraft Paper' },
        { label: 'Usage / Application', value: 'Notebook Cover Roll Winding' },
      ],
      seoTitle: 'Brown Notebook Cover Paper Tube | FAB Paper Tube',
      seoDescription: 'Heavy-duty brown paper tubes for notebook cover rolls.',
      acf: {},
      productOrder: 2,
    },
    {
      id: 3,
      slug: 'birthday-cake-sparkle-candle-tube',
      title: 'Birthday Cake Sparkle Candle Tube',
      shortDescription:
        'Precisely made paper tubes for birthday cake sparkle candles, offering good support during packaging and handling.',
      description:
        '<p>Our Birthday Cake Sparkle Candle Tubes are manufactured with precise dimensions for candle manufacturing.</p>',
      featuredImage: null,
      gallery: [],
      usedFor: ['Birthday Cake Sparkle Candles'],
      applications: ['Candle Manufacturing'],
      specifications: [
        { label: 'Material', value: 'Quality Kraft Paper' },
        { label: 'Usage / Application', value: 'Sparkle Candle Manufacturing' },
      ],
      seoTitle: 'Birthday Cake Sparkle Candle Tube | FAB Paper Tube',
      seoDescription: 'Precision paper tubes for sparkle candle manufacturing.',
      acf: {},
      productOrder: 3,
    },
    {
      id: 4,
      slug: 'selfie-stick-pencil-crackers-tube',
      title: 'Selfie Stick Pencil Crackers Tube',
      shortDescription:
        'Paper tubes for selfie stick firecrackers, providing strong support and reliable shape for the product.',
      description:
        '<p>Selfie Stick Pencil Crackers Tubes are manufactured to precise specifications for the cracker industry.</p>',
      featuredImage: null,
      gallery: [],
      usedFor: ['Selfie Stick Firecrackers'],
      applications: ['Cracker Manufacturing'],
      specifications: [
        { label: 'Material', value: 'Strong Kraft Paper' },
        { label: 'Usage / Application', value: 'Selfie Stick Firecrackers' },
      ],
      seoTitle: 'Selfie Stick Pencil Crackers Tube | FAB Paper Tube',
      seoDescription: 'Paper tubes for selfie stick firecracker manufacturing.',
      acf: {},
      productOrder: 4,
    },
    {
      id: 5,
      slug: 'butterfly-firecracker-tube',
      title: 'Butterfly Firecracker Tube',
      shortDescription:
        'Small kraft paper tubes for butterfly firecrackers, providing reliable shape and support for the product.',
      description:
        '<p>Butterfly Firecracker Tubes are manufactured with precise specifications for the cracker manufacturing industry.</p>',
      featuredImage: null,
      gallery: [],
      usedFor: ['Butterfly Firecrackers'],
      applications: ['Cracker Manufacturing'],
      specifications: [
        { label: 'Material', value: 'Strong Kraft Paper' },
        { label: 'Usage / Application', value: 'Butterfly Firecrackers' },
      ],
      seoTitle: 'Butterfly Firecracker Tube | FAB Paper Tube',
      seoDescription: 'Paper tubes for butterfly firecracker manufacturing.',
      acf: {},
      productOrder: 5,
    },
    {
      id: 6,
      slug: 'thermal-roll-paper-tube',
      title: 'Thermal Roll Paper Tube',
      shortDescription:
        'High-quality paper cores for thermal paper rolls, providing consistent performance and reliable roll support.',
      description:
        '<p>Our Thermal Roll Paper Tubes are designed for thermal paper rolls used in billing machines and POS systems.</p>',
      featuredImage: null,
      gallery: [],
      usedFor: ['Thermal Paper Rolls'],
      applications: ['POS Industry', 'Retail', 'Banking'],
      specifications: [
        { label: 'Material', value: 'Quality Kraft Paper' },
        { label: 'Usage / Application', value: 'Thermal Paper Rolls' },
      ],
      seoTitle: 'Thermal Roll Paper Tube | FAB Paper Tube',
      seoDescription: 'Precision paper tubes for thermal paper rolls.',
      acf: {},
      productOrder: 6,
    },
    {
      id: 7,
      slug: 'mirchi-bomb-paper-tube',
      title: 'Mirchi Bomb Paper Tube',
      shortDescription:
        'Paper tubes for Mirchi Bomb firecrackers, providing good strength, shape and reliable support.',
      description:
        '<p>Mirchi Bomb Paper Tubes are manufactured with high precision for the cracker manufacturing industry.</p>',
      featuredImage: null,
      gallery: [],
      usedFor: ['Mirchi Bomb Firecrackers'],
      applications: ['Cracker Manufacturing'],
      specifications: [
        { label: 'Material', value: 'Strong Kraft Paper' },
        { label: 'Usage / Application', value: 'Mirchi Bomb Firecrackers' },
      ],
      seoTitle: 'Mirchi Bomb Paper Tube | FAB Paper Tube',
      seoDescription: 'Precision paper tubes for Mirchi Bomb firecracker manufacturing.',
      acf: {},
      productOrder: 7,
    },
    {
      id: 8,
      slug: 'stretch-film-roll-paper-tube',
      title: 'Stretch Film Roll Paper Tube',
      shortDescription:
        'Quality paper cores for stretch film rolls, ensuring firm support and neat, uniform winding.',
      description:
        '<p>Stretch Film Roll Paper Tubes are manufactured to withstand the tension required in stretch film winding operations.</p>',
      featuredImage: null,
      gallery: [],
      usedFor: ['Stretch Film Rolls'],
      applications: ['Packaging Industry'],
      specifications: [
        { label: 'Material', value: 'Heavy-duty Kraft Paper' },
        { label: 'Usage / Application', value: 'Stretch Film Rolls' },
      ],
      seoTitle: 'Stretch Film Roll Paper Tube | FAB Paper Tube',
      seoDescription: 'Heavy-duty paper tubes for stretch film rolls.',
      acf: {},
      productOrder: 8,
    },
  ];
}

function getFallbackTestimonials(): Testimonial[] {
  return [
    {
      id: 1,
      clientName: 'Rajesh Patel',
      designation: 'Production Manager',
      company: 'Textile Manufacturing Unit',
      review:
        'FAB Paper Tube has been our trusted supplier for sewing thread tubes. Their precision and consistency has significantly improved our production efficiency.',
      rating: 5,
    },
    {
      id: 2,
      clientName: 'Suresh Mehta',
      designation: 'Purchase Manager',
      company: 'Cracker Manufacturing Company',
      review:
        'Excellent quality paper tubes for our cracker manufacturing needs. Very reliable supply and on-time delivery.',
      rating: 5,
    },
    {
      id: 3,
      clientName: 'Priya Shah',
      designation: 'Operations Head',
      company: 'Paper Converting Unit',
      review:
        'We have been using FAB Paper Tube products for thermal rolls and notebook covers. Quality is consistent and the team is very responsive.',
      rating: 5,
    },
  ];
}

function getFallbackCompanySettings(): CompanySettings {
  return {
    name: 'FAB Paper Tube',
    tagline: 'Small Size. Big Precision.',
    phone1: '+91 82380 74700',
    phone2: '+91 98796 45030',
    email: 'fabpapertube111@gmail.com',
    address:
      'Shed No. 14, Star Gold Industrial Park, Opp. Ghardaghar Kothiya Bus Stand, Indore Highway, Kuha, Ahmedabad, Gujarat - 382433',
    addressLine1: 'Shed No. 14, Star Gold Industrial Park',
    addressLine2: 'Opp. Ghardaghar Kothiya Bus Stand, Indore Highway, Kuha',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '382433',
    whatsapp: '+918238074700',
  };
}
