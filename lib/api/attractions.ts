import axios from "axios";
import { getFallbackAttractions, getFallbackAttractionCities, getFallbackDiscoveryCards, slugifyAttractionCity, Attraction, AttractionCity, DiscoveryCard } from "../mocks/attractions";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const apiClient = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
  },
});

function normalizeAttractionRow(row: any, index = 0): Attraction {
  const imageBase = row.id || `${slugifyAttractionCity(row.city || "attraction")}-${index}`;
  const rating = Number.parseFloat(row.rating ?? 4.4);
  const reviewsCount = Number(row.reviews_count ?? row.reviews ?? 900 + index * 37);
  const price = Number(row.price ?? row.price_from ?? 0);
  const originalPrice = Number(row.original_price ?? (price > 0 ? Math.round(price * 1.12) : 0));

  return {
    id: row.id || `${imageBase}`,
    city_slug: row.city_slug || slugifyAttractionCity(row.city),
    city: row.city || "",
    country: row.country || "",
    name: row.name || row.title || "Вариант досуга",
    category: row.category || "История",
    short_description: row.short_description || row.description || `Популярное развлечение в городе ${row.city || ""}.`,
    rating: Number.isFinite(rating) ? rating : 4.4,
    rating_label: row.rating_label || (rating >= 4.7 ? "Потрясающе" : rating >= 4.5 ? "Превосходно" : "Очень хорошо"),
    reviews_count: Number.isFinite(reviewsCount) ? reviewsCount : 0,
    price,
    original_price: originalPrice,
    duration_hours: Number(row.duration_hours ?? 2),
    duration_label: row.duration_label || `${Number(row.duration_hours ?? 2)} ч.`,
    image_url: row.image_url || `https://picsum.photos/seed/${imageBase}-main/440/440`,
    gallery_images: row.gallery_images || Array.from({ length: 4 }, (_, i) => `https://picsum.photos/seed/${imageBase}-thumb-${i + 1}/216/216`),
    free_cancel: row.free_cancel ?? true,
    available_today: row.available_today ?? true,
    bestseller_rank: row.bestseller_rank ?? null,
    is_genius: row.is_genius ?? false,
  };
}

export async function getAttractions(params: { city?: string; category?: string; limit?: number } = {}): Promise<Attraction[]> {
  try {
    const requestParams: any = {
      order: "rating.desc",
    };
    if (params.limit) requestParams.limit = params.limit;
    if (params.category) requestParams.category = `eq.${params.category}`;
    if (params.city && params.city !== "all") {
      requestParams.or = `city_slug.eq.${params.city},city.ilike.*${params.city}*`;
    }

    const { data } = await apiClient.get<any[]>("/attractions", { params: requestParams });

    if (!data?.length) return getFallbackAttractions(params);

    return data.map(normalizeAttractionRow).slice(0, params.limit || 12);
  } catch (error) {
    console.error("getAttractions:", error);
    return getFallbackAttractions(params);
  }
}

export async function searchAttractions(params: { query?: string; city?: string; category?: string; limit?: number } = {}): Promise<Attraction[]> {
  try {
    const requestParams: any = {
      order: "rating.desc",
      limit: params.limit || 24,
    };
    if (params.category) requestParams.category = `eq.${params.category}`;
    if (params.city && params.city !== "all") {
      requestParams.or = `city_slug.eq.${params.city},city.ilike.*${params.city}*`;
    }
    if (params.query) {
      requestParams.name = `ilike.*${params.query}*`;
    }

    const { data } = await apiClient.get<any[]>("/attractions", { params: requestParams });

    if (!data?.length) return getFallbackAttractions(params);

    return data.map(normalizeAttractionRow).slice(0, params.limit || 24);
  } catch (error) {
    console.error("searchAttractions:", error);
    return getFallbackAttractions(params);
  }
}

export async function getAttractionCities(): Promise<AttractionCity[]> {
  try {
    const { data } = await apiClient.get<any[]>("/attraction_cities", {
      params: {
        order: "variants.desc",
      },
    });

    if (!data?.length) return getFallbackAttractionCities();

    return data.map(row => ({
      slug: row.city_slug || row.slug || slugifyAttractionCity(row.name || row.city),
      name: row.name || row.city || "Город",
      city: row.name || row.city || "Город",
      country: row.country || "",
      image_url: row.image_url || `https://picsum.photos/seed/${row.slug}/900/700`,
      variants: Number(row.variants ?? row.variants_count ?? 0),
      heroTitle: `Варианты досуга в городе ${row.name || row.city}`,
      heroSubtitle: `Популярные развлечения в ${row.name || row.city}.`,
      discoveryText: `Лучшие идеи досуга в ${row.name || row.city}.`,
    }));
  } catch (error) {
    console.error("getAttractionCities:", error);
    return getFallbackAttractionCities();
  }
}

export async function getAttractionDiscoveryCards(): Promise<DiscoveryCard[]> {
  try {
    const { data } = await apiClient.get<any[]>("/attraction_collections", {
      params: {
        order: "sort_order.asc",
      },
    });

    if (!data?.length) return getFallbackDiscoveryCards();

    return data.map((row, index) => ({
      id: row.id || `collection-${index + 1}`,
      title: row.title || "Подборка",
      subtitle: row.subtitle || "Лучшие развлечения.",
      category: row.category || "История",
      citySlug: row.city_slug || "all",
      totalItems: Number(row.total_items ?? 0),
      image: row.image_url || `https://picsum.photos/seed/collection-${index + 1}/1200/760`,
      sortOrder: Number(row.sort_order ?? 999),
    }));
  } catch (error) {
    console.error("getAttractionDiscoveryCards:", error);
    return getFallbackDiscoveryCards();
  }
}

export async function getAttractionById(id: string | number): Promise<Attraction | null> {
  try {
    const { data } = await apiClient.get<any[]>("/attractions", {
      params: {
        id: `eq.${id}`,
        limit: 1,
      },
    });

    if (!data?.length) return null;

    return normalizeAttractionRow(data[0]);
  } catch (error) {
    console.error("getAttractionById:", error);
    return null;
  }
}
