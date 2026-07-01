export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  featured?: boolean;
  inStock: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  count: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface NavLink {
  label: string;
  href: string;
}