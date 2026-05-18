import axios from "axios";
import { getMockCars, Car } from "../mocks/cars";
export type { Car };

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const apiClient = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
  },
});

export async function getCars({ 
  category,
  transmission,
  fuel,
  company,
  search
}: { 
  category?: string;
  transmission?: string;
  fuel?: string;
  company?: string;
  search?: string;
} = {}): Promise<Car[]> {
  try {
    const params: any = {
      order: "price_per_day.asc",
    };
    if (category) {
      params.car_class = `eq.${category}`;
    }

    const { data } = await apiClient.get<any[]>("/car_rentals", { params });
    let carsList: Car[] = [];

    if (!data?.length) {
      carsList = getMockCars();
    } else {
      carsList = data.map((c) => ({
        id: c.id,
        name: c.car_model,
        category: c.car_class || c.company,
        seats: c.seats,
        transmission: c.transmission,
        fuel: c.fuel_type,
        ac: true,
        rating: parseFloat(c.rating) || 8.5,
        reviews_count: c.reviews || 0,
        company: c.company,
        image: c.image_url || `https://picsum.photos/seed/car_${c.id}/400/240`,
        priceDay: c.price_per_day,
        free_cancel: true,
      }));
    }

    // Apply mock filtering client-side as well for absolute reliability
    if (category) {
      carsList = carsList.filter(c => c.category.toLowerCase() === category.toLowerCase());
    }
    if (transmission) {
      carsList = carsList.filter(c => c.transmission.toLowerCase() === transmission.toLowerCase());
    }
    if (fuel) {
      carsList = carsList.filter(c => c.fuel.toLowerCase() === fuel.toLowerCase());
    }
    if (company) {
      carsList = carsList.filter(c => c.company.toLowerCase() === company.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      carsList = carsList.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.category.toLowerCase().includes(q) || 
        c.company.toLowerCase().includes(q)
      );
    }

    return carsList;
  } catch (error) {
    console.error("getCars:", error);
    let fallback = getMockCars();
    if (category) fallback = fallback.filter(c => c.category.toLowerCase() === category.toLowerCase());
    if (transmission) fallback = fallback.filter(c => c.transmission.toLowerCase() === transmission.toLowerCase());
    if (fuel) fallback = fallback.filter(c => c.fuel.toLowerCase() === fuel.toLowerCase());
    if (company) fallback = fallback.filter(c => c.company.toLowerCase() === company.toLowerCase());
    return fallback;
  }
}

export async function getCarById(id: string | number): Promise<Car | null> {
  const cars = await getCars();
  return cars.find((c) => String(c.id) === String(id)) || null;
}

