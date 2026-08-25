import type { WPPost, WPMedia, Product, WPImage, Testimonial, CompanySettings } from '@/types';

const WP_API_URL = process.env.WORDPRESS_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2';

// ─── Fetch Helpers ────────────────────────────────────────────────────────────
async function wpFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${WP_API_URL}${endpoint}`;
  const res = await fetch(url, {
    next: { revalidate: 3600 }, // ISR: revalidate every hour
    ...options,
  });

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${res.statusText} for ${url}`);
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

// ─── Products ─────────────────────────────────────────────────────────────────
export async function getAllProducts(): Promise<Product[]> {
  try {
    const posts = await wpFetch<WPPost[]>(
      '/posts?categories=products&_embed&per_page=100&status=publish'
    );
    return posts.map(parseProduct);
  } catch {
    // Return fallback static products if WordPress is not configured
    return getFallbackProducts();
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const posts = await wpFetch<WPPost[]>(
      `/posts?slug=${slug}&_embed&status=publish`
    );
    if (!posts || posts.length === 0) return null;
    return parseProduct(posts[0]);
  } catch {
    // Return fallback product
    const fallback = getFallbackProducts();
    return fallback.find((p) => p.slug === slug) || null;
  }
}

export async function getRelatedProducts(currentSlug: string, limit = 4): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

function parseProduct(post: WPPost): Product {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  const featuredImage = media ? parseMedia(media) : null;
  const acf = (post.acf || {}) as Record<string, unknown>;

  const usedFor = typeof acf.used_for === 'string'
    ? acf.used_for.split('\n').filter(Boolean)
    : [];

  const applications = typeof acf.applications === 'string'
    ? acf.applications.split('\n').filter(Boolean)
    : [];

  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    shortDescription: typeof acf.short_description === 'string' ? acf.short_description : post.excerpt.rendered,
    description: post.content.rendered,
    featuredImage,
    gallery: [],
    usedFor,
    applications,
    specifications: Array.isArray(acf.specifications) ? acf.specifications as Product['specifications'] : [],
    seoTitle: post.yoast_head_json?.title || post.title.rendered,
    seoDescription: post.yoast_head_json?.description || '',
    acf: acf as Product['acf'],
  };
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const posts = await wpFetch<WPPost[]>(
      '/testimonials?_embed&per_page=20&status=publish'
    );
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
      address: settings.address || 'Shed No. 14, Star Gold Industrial Park, Opp. Ghardaghar Kothiya Bus Stand, Indore Highway, Kuha, Ahmedabad, Gujarat - 382433',
      addressLine1: settings.address_line1 || 'Shed No. 14, Star Gold Industrial Park',
      addressLine2: settings.address_line2 || 'Opp. Ghardaghar Kothiya Bus Stand, Indore Highway, Kuha',
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

// ─── Fallback Data (used when WordPress is not configured) ────────────────────
export function getFallbackProducts(): Product[] {
  return [
    {
      id: 1,
      slug: 'white-sewing-thread-paper-tube',
      title: 'White Sewing Thread Paper Tube',
      shortDescription: 'Precision-wound paper tubes designed for sewing thread and yarn winding applications. Consistent inner diameter ensures smooth unwinding.',
      description: '<p>Our White Sewing Thread Paper Tubes are manufactured with high precision to ensure consistent winding and smooth unwinding of sewing threads and yarns. The tubes are made from high-quality kraft paper with precise dimensions for perfect fit in winding machines.</p>',
      featuredImage: {
        id: 1,
        url: '/images/products/sewing-thread-tube.jpg',
        alt: 'White Sewing Thread Paper Tube',
        width: 800,
        height: 600,
      },
      gallery: [],
      usedFor: ['Sewing Thread', 'Yarn Winding'],
      applications: ['Textile Industry', 'Thread Manufacturing'],
      specifications: [
        { label: 'Material', value: 'High-quality Kraft Paper' },
        { label: 'Color', value: 'White' },
        { label: 'Available Sizes', value: 'Custom as per requirement' },
      ],
      seoTitle: 'White Sewing Thread Paper Tube | FAB Paper Tube',
      seoDescription: 'Premium white sewing thread paper tubes for yarn winding. Precision manufactured for consistent performance.',
      acf: {},
    },
    {
      id: 2,
      slug: 'brown-notebook-cover-paper-tube',
      title: 'Brown Notebook Cover Paper Tube',
      shortDescription: 'Sturdy paper tubes for notebook cover rolls and paper roll winding. Strong construction ensures roll integrity during storage and transport.',
      description: '<p>Brown Notebook Cover Paper Tubes provide excellent support for notebook cover rolls and paper roll winding. Manufactured with strong kraft paper for durability and consistent performance in paper converting operations.</p>',
      featuredImage: {
        id: 2,
        url: '/images/products/notebook-cover-tube.jpg',
        alt: 'Brown Notebook Cover Paper Tube',
        width: 800,
        height: 600,
      },
      gallery: [],
      usedFor: ['Notebook Cover Roll', 'Paper Roll Winding'],
      applications: ['Paper Industry', 'Stationery Manufacturing'],
      specifications: [
        { label: 'Material', value: 'Brown Kraft Paper' },
        { label: 'Color', value: 'Brown' },
        { label: 'Available Sizes', value: 'Custom as per requirement' },
      ],
      seoTitle: 'Brown Notebook Cover Paper Tube | FAB Paper Tube',
      seoDescription: 'Heavy-duty brown paper tubes for notebook cover rolls and paper winding applications.',
      acf: {},
    },
    {
      id: 3,
      slug: 'birthday-cake-sparkle-candle-tube',
      title: 'Birthday Cake Sparkle Candle Tube',
      shortDescription: 'Specially designed paper tubes for birthday cake sparkle candles. Precise dimensions for consistent candle manufacturing.',
      description: '<p>Our Birthday Cake Sparkle Candle Tubes are manufactured with precise dimensions required for candle manufacturing. The consistent inner diameter ensures uniform candle production and reliable performance.</p>',
      featuredImage: {
        id: 3,
        url: '/images/products/sparkle-candle-tube.jpg',
        alt: 'Birthday Cake Sparkle Candle Tube',
        width: 800,
        height: 600,
      },
      gallery: [],
      usedFor: ['Birthday Cake Sparkle Candles', 'Candle Manufacturing'],
      applications: ['Candle Industry', 'Firework Manufacturing'],
      specifications: [
        { label: 'Material', value: 'Quality Kraft Paper' },
        { label: 'Color', value: 'As per requirement' },
        { label: 'Available Sizes', value: 'Custom as per requirement' },
      ],
      seoTitle: 'Birthday Cake Sparkle Candle Tube | FAB Paper Tube',
      seoDescription: 'Precision paper tubes for birthday cake sparkle candle manufacturing.',
      acf: {},
    },
    {
      id: 4,
      slug: 'selfie-stick-pencil-crackers-tube',
      title: 'Selfie Stick Pencil Crackers Tube',
      shortDescription: 'High-precision paper tubes for selfie stick firecracker and cracker manufacturing. Consistent dimensions for safe production.',
      description: '<p>Selfie Stick Pencil Crackers Tubes are manufactured to precise specifications required for the cracker industry. Our tubes ensure consistent dimensions for uniform product manufacturing.</p>',
      featuredImage: {
        id: 4,
        url: '/images/products/pencil-crackers-tube.jpg',
        alt: 'Selfie Stick Pencil Crackers Tube',
        width: 800,
        height: 600,
      },
      gallery: [],
      usedFor: ['Selfie Stick Firecrackers', 'Cracker Manufacturing'],
      applications: ['Cracker Manufacturing', 'Fireworks Industry'],
      specifications: [
        { label: 'Material', value: 'Strong Kraft Paper' },
        { label: 'Available Sizes', value: 'Custom as per requirement' },
      ],
      seoTitle: 'Selfie Stick Pencil Crackers Tube | FAB Paper Tube',
      seoDescription: 'Precision paper tubes for selfie stick firecrackers and cracker manufacturing.',
      acf: {},
    },
    {
      id: 5,
      slug: 'butterfly-firecracker-tube',
      title: 'Butterfly Firecracker Tube',
      shortDescription: 'Specially engineered paper tubes for butterfly firecracker manufacturing. Precise size and strength for consistent cracker production.',
      description: '<p>Butterfly Firecracker Tubes from FAB Paper Tube are manufactured with precise specifications for the cracker manufacturing industry. Our focus on small-size precision ensures consistent product quality.</p>',
      featuredImage: {
        id: 5,
        url: '/images/products/butterfly-firecracker-tube.jpg',
        alt: 'Butterfly Firecracker Tube',
        width: 800,
        height: 600,
      },
      gallery: [],
      usedFor: ['Butterfly Firecrackers', 'Cracker Manufacturing'],
      applications: ['Cracker Manufacturing', 'Fireworks Industry'],
      specifications: [
        { label: 'Material', value: 'Strong Kraft Paper' },
        { label: 'Available Sizes', value: 'Custom as per requirement' },
      ],
      seoTitle: 'Butterfly Firecracker Tube | FAB Paper Tube',
      seoDescription: 'Precision paper tubes for butterfly firecracker manufacturing.',
      acf: {},
    },
    {
      id: 6,
      slug: 'thermal-roll-paper-tube',
      title: 'Thermal Roll Paper Tube',
      shortDescription: 'Reliable paper tubes for thermal paper rolls used in billing and POS systems. Consistent dimensions for smooth roll performance.',
      description: '<p>Our Thermal Roll Paper Tubes are designed for thermal paper rolls used in billing machines and POS systems. Consistent inner diameter ensures smooth paper feeding and reliable POS performance.</p>',
      featuredImage: {
        id: 6,
        url: '/images/products/thermal-roll-tube.jpg',
        alt: 'Thermal Roll Paper Tube',
        width: 800,
        height: 600,
      },
      gallery: [],
      usedFor: ['Thermal Paper Rolls', 'Billing & POS Rolls'],
      applications: ['POS Industry', 'Retail', 'Banking'],
      specifications: [
        { label: 'Material', value: 'Quality Kraft Paper' },
        { label: 'Available Sizes', value: 'Custom as per requirement' },
      ],
      seoTitle: 'Thermal Roll Paper Tube | FAB Paper Tube',
      seoDescription: 'Precision paper tubes for thermal paper rolls and POS billing systems.',
      acf: {},
    },
    {
      id: 7,
      slug: 'mirchi-bomb-paper-tube',
      title: 'Mirchi Bomb Paper Tube',
      shortDescription: 'Precision-manufactured paper tubes for Mirchi Bomb firecrackers. Strong and consistent dimensions for reliable cracker production.',
      description: '<p>Mirchi Bomb Paper Tubes from FAB Paper Tube are manufactured with high precision for the cracker manufacturing industry. Our small-size expertise ensures perfect dimensional consistency required for Mirchi Bomb production.</p>',
      featuredImage: {
        id: 7,
        url: '/images/products/mirchi-bomb-tube.jpg',
        alt: 'Mirchi Bomb Paper Tube',
        width: 800,
        height: 600,
      },
      gallery: [],
      usedFor: ['Mirchi Bomb Firecrackers', 'Cracker Manufacturing'],
      applications: ['Cracker Manufacturing', 'Fireworks Industry'],
      specifications: [
        { label: 'Material', value: 'Strong Kraft Paper' },
        { label: 'Available Sizes', value: 'Custom as per requirement' },
      ],
      seoTitle: 'Mirchi Bomb Paper Tube | FAB Paper Tube',
      seoDescription: 'Precision paper tubes for Mirchi Bomb firecrackers and cracker manufacturing.',
      acf: {},
    },
    {
      id: 8,
      slug: 'stretch-film-roll-paper-tube',
      title: 'Stretch Film Roll Paper Tube',
      shortDescription: 'Heavy-duty paper tubes for stretch film rolls in the packaging industry. Strong construction for reliable stretch film winding and unwinding.',
      description: '<p>Stretch Film Roll Paper Tubes are manufactured to withstand the tension required in stretch film winding operations. Our tubes provide consistent performance in packaging industry applications.</p>',
      featuredImage: {
        id: 8,
        url: '/images/products/stretch-film-tube.jpg',
        alt: 'Stretch Film Roll Paper Tube',
        width: 800,
        height: 600,
      },
      gallery: [],
      usedFor: ['Stretch Film Rolls', 'Packaging Industry'],
      applications: ['Packaging Industry', 'Film Manufacturing'],
      specifications: [
        { label: 'Material', value: 'Heavy-duty Kraft Paper' },
        { label: 'Available Sizes', value: 'Custom as per requirement' },
      ],
      seoTitle: 'Stretch Film Roll Paper Tube | FAB Paper Tube',
      seoDescription: 'Heavy-duty paper tubes for stretch film rolls in the packaging industry.',
      acf: {},
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
      review: 'FAB Paper Tube has been our trusted supplier for sewing thread tubes. Their precision and consistency in manufacturing has significantly improved our production efficiency.',
      rating: 5,
    },
    {
      id: 2,
      clientName: 'Suresh Mehta',
      designation: 'Purchase Manager',
      company: 'Cracker Manufacturing Company',
      review: 'Excellent quality paper tubes for our cracker manufacturing needs. The small-size precision is outstanding. Very reliable supply and on-time delivery.',
      rating: 5,
    },
    {
      id: 3,
      clientName: 'Priya Shah',
      designation: 'Operations Head',
      company: 'Paper Converting Unit',
      review: 'We have been using FAB Paper Tube products for our thermal roll and notebook cover requirements. The quality is consistent and the team is very responsive to custom requirements.',
      rating: 5,
    },
    {
      id: 4,
      clientName: 'Amit Kumar',
      designation: 'Director',
      company: 'Packaging Solutions',
      review: 'Their stretch film tubes are exactly what we needed. Strong, consistent and delivered on time. FAB Paper Tube understands industrial requirements very well.',
      rating: 5,
    },
    {
      id: 5,
      clientName: 'Dinesh Sharma',
      designation: 'Factory Manager',
      company: 'Candle Manufacturing Unit',
      review: 'The birthday cake sparkle candle tubes from FAB are perfect. Precise dimensions, good quality paper and reliable supply. Highly recommended for candle manufacturers.',
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
    address: 'Shed No. 14, Star Gold Industrial Park, Opp. Ghardaghar Kothiya Bus Stand, Indore Highway, Kuha, Ahmedabad, Gujarat - 382433',
    addressLine1: 'Shed No. 14, Star Gold Industrial Park',
    addressLine2: 'Opp. Ghardaghar Kothiya Bus Stand, Indore Highway, Kuha',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '382433',
    whatsapp: '+918238074700',
  };
}
