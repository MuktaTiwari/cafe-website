export interface CoffeeProduct {
  id: string;
  name: string;
  category: 'espresso' | 'cold' | 'specialty' | 'bakery';
  price: string;
  rating: number;
  reviewsCount: number;
  description: string;
  tastingNotes: string[];
  image: string;
  tag?: string;
  calories?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const BEST_SELLERS: CoffeeProduct[] = [
  {
    id: 'caramel-macchiato',
    name: 'Caramel Macchiato',
    category: 'specialty',
    price: '$5.40',
    rating: 4.9,
    reviewsCount: 320,
    description: 'Freshly steamed whole milk marked with rich espresso and drizzled with buttery Madagascar caramel.',
    tastingNotes: ['Buttery Caramel', 'Vanilla Bean', 'Velvety Crema'],
    image: '/assets/cup-caramel-macchiato.jpg',
    tag: 'Bestseller',
    calories: '240 kcal',
  },
  {
    id: 'artisan-americano',
    name: 'Artisan Americano',
    category: 'espresso',
    price: '$4.20',
    rating: 4.8,
    reviewsCount: 285,
    description: 'Double-shot of single-origin Ethiopian roast poured over pure hot spring water with golden crema.',
    tastingNotes: ['Dark Cocoa', 'Toasted Hazelnut', 'Floral Jasmine'],
    image: '/assets/cup-hot-americano.jpg',
    tag: 'House Blend',
    calories: '15 kcal',
  },
  {
    id: 'cappuccino-frappe',
    name: 'Cappuccino Frappé',
    category: 'cold',
    price: '$5.80',
    rating: 5.0,
    reviewsCount: 410,
    description: 'Cold-blended double espresso with silky milk and crushed ice, finished with micro-foam and cocoa dust.',
    tastingNotes: ['Chilled Velvet', 'Belgian Cocoa', 'Sweet Cream'],
    image: '/assets/cup-cappuccino-frappe.jpg',
    tag: 'Trending',
    calories: '280 kcal',
  },
];

export const MENU_ITEMS: CoffeeProduct[] = [
  {
    id: 'espresso-single',
    name: 'Single-Origin Espresso',
    category: 'espresso',
    price: '$3.80',
    rating: 4.9,
    reviewsCount: 142,
    description: 'Concentrated 30ml extraction highlighting origin terroir with thick golden crema.',
    tastingNotes: ['Citrus Zest', 'Black Cherry', 'Dark Chocolate'],
    image: '/assets/cup-hot-americano.jpg',
    tag: 'Classic',
  },
  {
    id: 'velvet-latte',
    name: 'Silk Velvet Latte',
    category: 'espresso',
    price: '$4.90',
    rating: 4.9,
    reviewsCount: 290,
    description: 'Silky micro-textured milk poured expertly over a double ristretto base.',
    tastingNotes: ['Sweet Milk', 'Honey', 'Mild Cocoa'],
    image: '/assets/cup-paper-latte.jpg',
    tag: 'Staff Pick',
  },
  {
    id: 'caramel-macchiato-menu',
    name: 'Caramel Macchiato',
    category: 'specialty',
    price: '$5.40',
    rating: 4.9,
    reviewsCount: 320,
    description: 'Freshly steamed milk with vanilla-infused syrup, marked with espresso & caramel sauce.',
    tastingNotes: ['Madagascar Vanilla', 'Caramel', 'Sweet Cream'],
    image: '/assets/cup-caramel-macchiato.jpg',
    tag: 'Bestseller',
  },
  {
    id: 'nitro-cold-brew',
    name: 'Cascara Nitro Cold Brew',
    category: 'cold',
    price: '$5.60',
    rating: 5.0,
    reviewsCount: 184,
    description: '18-hour cold steeped coffee infused with micro-nitrogen bubbles for a Guinness-like pour.',
    tastingNotes: ['Cascara Fruit', 'Dark Molasses', 'Creamy Head'],
    image: '/assets/signature-drink.png',
    tag: 'Signature',
  },
  {
    id: 'cappuccino-frappe-menu',
    name: 'Cappuccino Frappé',
    category: 'cold',
    price: '$5.80',
    rating: 4.9,
    reviewsCount: 410,
    description: 'Blended espresso with pure milk, crushed crystal ice, and cocoa dust.',
    tastingNotes: ['Chilled Espresso', 'Cream', 'Cocoa Powder'],
    image: '/assets/cup-cappuccino-frappe.jpg',
    tag: 'Trending',
  },
  {
    id: 'croissant-almond',
    name: 'Artisan Almond Croissant',
    category: 'bakery',
    price: '$4.50',
    rating: 4.9,
    reviewsCount: 215,
    description: 'Twice-baked French butter croissant filled with fragrant frangipane cream and sliced almonds.',
    tastingNotes: ['Normandy Butter', 'Toasted Almond', 'Vanilla Cream'],
    image: '/assets/cup-paper-latte.jpg',
    tag: 'Fresh Daily',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    author: 'Elena Rostova',
    role: 'Architect & Coffee Connoisseur',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    quote: 'The Caramel Macchiato here is unmatched. The rich crema, silky milk texture, and serene atmosphere make this my everyday morning sanctuary.',
    position: 'top-left',
  },
  {
    id: 'rev-2',
    author: 'Marcus Sterling',
    role: 'Creative Director',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    quote: 'Every cup is an art piece. You can genuinely taste the care that goes into their slow micro-batch roasts and ethical single origins.',
    position: 'top-right',
  },
  {
    id: 'rev-3',
    author: 'Sophie Chen',
    role: 'UX Designer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    quote: 'The ambiance is pure tranquility. The Nitro Cold Brew feels like drinking velvet. Unbelievable balance of flavors!',
    position: 'bottom-left',
  },
  {
    id: 'rev-4',
    author: 'David Vance',
    role: 'Writer & Regular',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    quote: 'Simply the best café experience in town. Friendly baristas, soothing aesthetics, and the freshest morning croissants you could wish for.',
    position: 'bottom-right',
  },
];

export const CALLOUT_TAGS = [
  { text: 'Life begins after coffee ✨', rotation: '-2deg', bg: 'from-[#e58a36] to-[#f39c12]' },
  { text: 'Brew-tiful mornings start here ☕', rotation: '3deg', bg: 'from-[#d35400] to-[#e58a36]' },
  { text: 'Pure bliss in every single cup 🤍', rotation: '-1.5deg', bg: 'from-[#b86b28] to-[#e58a36]' },
];
