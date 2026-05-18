import axios from "axios";
import { getMockTaxis, Taxi } from "../mocks/taxis";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const apiClient = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
  },
});

export async function getTaxis(): Promise<Taxi[]> {
  try {
    const { data } = await apiClient.get<any[]>("/airport_taxis", {
      params: {
        order: "price.asc",
      },
    });

    if (!data?.length) return getMockTaxis();

    return data.map((taxi) => ({
      id: taxi.id,
      name: taxi.car_type || "Такси",
      seats: 4,
      wait_time: "5-10 мин",
      description: taxi.provider || "Надежный партнер",
      free_cancel: true,
      image: taxi.image_url || `https://picsum.photos/seed/taxi_${taxi.id}/300/180`,
      price: taxi.price,
      perKm: null,
    }));
  } catch (error) {
    console.error("getTaxis:", error);
    return getMockTaxis();
  }
}

export async function getTaxiById(id: string | number): Promise<Taxi | null> {
  const taxis = await getTaxis();
  return taxis.find((t) => String(t.id) === String(id)) || null;
}

