export interface Attraction {
  id: string | number;
  city_slug: string;
  city: string;
  country: string;
  name: string;
  category: string;
  short_description: string;
  rating: number;
  rating_label: string;
  reviews_count: number;
  price: number;
  original_price: number;
  duration_hours: number;
  duration_label: string;
  image_url: string;
  gallery_images: string[];
  free_cancel: boolean;
  available_today: boolean;
  bestseller_rank: number | null;
  is_genius: boolean;
}

export interface AttractionCity {
  slug: string;
  name: string;
  city: string;
  country: string;
  image_url: string;
  gallery_images?: string[];
  variants: number;
  heroTitle: string;
  heroSubtitle: string;
  discoveryText: string;
}

export interface DiscoveryCard {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  citySlug: string;
  totalItems: number;
  sortOrder?: number;
}

export function slugifyAttractionCity(value = "") {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/ё/g, "e")
    .replace(/[^a-zа-я0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

export function getFallbackAttractionCities(): AttractionCity[] {
  return [
    {
      slug: "tashkent",
      name: "Ташкент",
      city: "Ташкент",
      country: "Узбекистан",
      image_url: "https://picsum.photos/seed/tashkent-city-1/420/280",
      variants: 16,
      heroTitle: "Варианты досуга в городе Ташкент",
      heroSubtitle: "Базары, музеи, современные кварталы",
      discoveryText: "Сочетание советской архитектуры",
    },
    {
      slug: "samarkand",
      name: "Самарканд",
      city: "Самарканд",
      country: "Узбекистан",
      image_url: "https://picsum.photos/seed/samarkand-city-1/420/280",
      variants: 16,
      heroTitle: "Варианты досуга в городе Самарканд",
      heroSubtitle: "Площади, мавзолеи",
      discoveryText: "Регистан, мавзолеи",
    },
  ];
}

export function getFallbackAttractions({ city, category, limit }: { city?: string; category?: string; limit?: number } = {}): Attraction[] {
  return [
    {
      id: "samarkand-1",
      city_slug: "samarkand",
      city: "Самарканд",
      country: "Узбекистан",
      name: "Площадь Регистан с гидом",
      category: "История",
      short_description: "Главная площадь города.",
      rating: 4.8,
      rating_label: "Потрясающе",
      reviews_count: 1200,
      price: 42000,
      original_price: 48000,
      duration_hours: 3,
      duration_label: "2 ч. – 4 ч.",
      image_url: "https://picsum.photos/seed/samarkand-1-main/440/440",
      gallery_images: [
        "https://picsum.photos/seed/samarkand-1-thumb-1/216/216",
      ],
      free_cancel: true,
      available_today: true,
      bestseller_rank: 1,
      is_genius: false,
    },
    {
      id: "tashkent-1",
      city_slug: "tashkent",
      city: "Ташкент",
      country: "Узбекистан",
      name: "Чорсу базар с гидом",
      category: "Гастрономия",
      short_description: "Главный рынок Ташкента.",
      rating: 4.6,
      rating_label: "Превосходно",
      reviews_count: 850,
      price: 30000,
      original_price: 35000,
      duration_hours: 2,
      duration_label: "2 ч.",
      image_url: "https://picsum.photos/seed/tashkent-1-main/440/440",
      gallery_images: [
        "https://picsum.photos/seed/tashkent-1-thumb-1/216/216",
      ],
      free_cancel: true,
      available_today: true,
      bestseller_rank: 1,
      is_genius: false,
    },
  ];
}

export function getFallbackDiscoveryCards(): DiscoveryCard[] {
  return [
    {
      id: "historic",
      title: "Исторические хиты",
      subtitle: "Главные памятники",
      category: "История",
      image: "https://picsum.photos/seed/attractions-history/900/560",
      citySlug: "all",
      totalItems: 12,
    },
  ];
}
