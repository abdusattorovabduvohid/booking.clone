import axios from "axios";
import { getMockDestinations, Destination } from "../mocks/destinations";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const apiClient = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
  },
});

export async function getTrendingDestinations(): Promise<Destination[]> {
  try {
    const { data } = await apiClient.get<Destination[]>("/destinations", {
      params: {
        is_trending: "eq.true",
        order: "variants.desc",
      },
    });
    if (!data?.length) return getMockDestinations();
    return data.map((d) => ({
      ...d,
      image_url: d.image_url || `https://picsum.photos/seed/${d.name}/400/250`,
    }));
  } catch (error) {
    console.error("getTrendingDestinations:", error);
    return getMockDestinations();
  }
}

export async function getAllDestinations(limit = 200): Promise<Destination[]> {
  try {
    const { data } = await apiClient.get<Destination[]>("/destinations", {
      params: {
        order: "variants.desc",
        limit,
      },
    });
    if (!data?.length) return getMockDestinations();
    return data;
  } catch (error) {
    console.error("getAllDestinations:", error);
    return getMockDestinations();
  }
}

export async function searchDestinations(query: string): Promise<Destination[]> {
  try {
    const { data } = await apiClient.get<Destination[]>("/destinations", {
      params: {
        or: `name.ilike.*${query}*,country.ilike.*${query}*`,
        order: "variants.desc",
        limit: 8,
      },
    });
    if (!data?.length) {
      return getMockDestinations().filter(
        (d) =>
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.country.toLowerCase().includes(query.toLowerCase()),
      );
    }
    return data;
  } catch (error) {
    console.error("searchDestinations:", error);
    return getMockDestinations().filter(
      (d) =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.country.toLowerCase().includes(query.toLowerCase()),
    );
  }
}

export async function getDestinationsByRegion(region: string): Promise<Destination[]> {
  try {
    const { data } = await apiClient.get<Destination[]>("/destinations", {
      params: {
        region: `eq.${region}`,
        order: "variants.desc",
      },
    });
    return data ?? [];
  } catch (error) {
    console.error("getDestinationsByRegion:", error);
    return [];
  }
}
