import axios from "axios";
import { getFallbackFlights, getFallbackAirports, getFallbackRoutes, Flight, Airport, FlightRoute, AIRPORT_HINTS } from "../mocks/flights";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const apiClient = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
  },
});

function buildTags(tags: any, isBest: boolean, isCheapest: boolean) {
  const nextTags = Array.isArray(tags)
    ? [...tags]
    : typeof tags === "string" && tags.trim().length > 0
      ? tags
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  if (isBest && !nextTags.includes("Best")) nextTags.push("Best");
  if (isCheapest && !nextTags.includes("Cheapest")) nextTags.push("Cheapest");

  return nextTags;
}

function normalizeFlight(row: any): Flight {
  return {
    id: row.id,
    fromCity: row.from_city,
    fromCode: row.from_code,
    toCity: row.to_city,
    toCode: row.to_code,
    out: {
      dep: row.out_depart_time || row.depart_time,
      arr: row.out_arrive_time || row.arrive_time,
      airline: row.out_airline || row.airline,
      airlineCode: row.out_airline_code || row.airline_code || null,
      stops: row.out_stops || row.stops || "nonstop",
      stopCity: row.out_stop_city || null,
      duration: row.out_duration || row.duration,
      route: `${row.from_code}-${row.to_code}`,
    },
    back: {
      dep: row.back_depart_time || row.return_depart_time,
      arr: row.back_arrive_time || row.return_arrive_time,
      airline: row.back_airline || row.airline,
      airlineCode: row.back_airline_code || row.airline_code || null,
      stops: row.back_stops || row.stops || "nonstop",
      stopCity: row.back_stop_city || null,
      duration: row.back_duration || row.return_duration,
      route: `${row.to_code}-${row.from_code}`,
    },
    price: Number(row.price || 0),
    cabin: row.cabin_class || "Economy Cabin",
    tags: buildTags(row.tags, row.is_best, row.is_cheapest),
  };
}

export async function getFlights(params: { fromCode?: string; toCode?: string; from?: string; to?: string; locale?: string } = {}): Promise<Flight[]> {
  const locale = params.locale || "en";
  try {
    const requestParams: any = {
      order: "price.asc",
    };

    if (params.fromCode) {
      requestParams.from_code = `eq.${params.fromCode.toUpperCase()}`;
    } else if (params.from) {
      requestParams.or = `from_city.ilike.*${params.from}*,from_code.ilike.*${params.from}*`;
    }

    if (params.toCode) {
      requestParams.to_code = `eq.${params.toCode.toUpperCase()}`;
    } else if (params.to) {
      requestParams.or = (requestParams.or ? requestParams.or + ',' : '') + `to_city.ilike.*${params.to}*,to_code.ilike.*${params.to}*`;
    }

    const { data } = await apiClient.get<any[]>("/flights", { params: requestParams });

    if (!data?.length) return getFallbackFlights(locale);

    return data.map(normalizeFlight);
  } catch (error) {
    console.error("getFlights:", error);
    return getFallbackFlights(locale);
  }
}

export async function getFlightAirports(params: { search?: string } = {}): Promise<Airport[]> {
  try {
    const requestParams: any = {
      order: "popular_rank.asc,city.asc",
      limit: 20,
    };

    if (params.search) {
      const search = params.search.trim().toLowerCase();
      requestParams.or = `city.ilike.*${search}*,code.ilike.*${search}*,airport_name.ilike.*${search}*`;
    }

    const { data } = await apiClient.get<any[]>("/flight_airports", { params: requestParams });

    if (!data?.length) return getFallbackAirports();

    return data.map((row) => ({
      code: row.code,
      city: row.city,
      name: row.airport_name,
      country: row.country,
      popularRank: row.popular_rank ?? 999,
    }));
  } catch (error) {
    console.error("getFlightAirports:", error);
    return getFallbackAirports();
  }
}

export async function getFlightRoutes(params: { fromCode?: string } = {}): Promise<FlightRoute[]> {
  try {
    const requestParams: any = {
      is_featured: "eq.true",
      order: "sort_order.asc,sample_price.asc",
    };

    if (params.fromCode) {
      requestParams.from_code = `eq.${params.fromCode.toUpperCase()}`;
    }

    const { data } = await apiClient.get<any[]>("/flight_routes", { params: requestParams });

    if (!data?.length) return getFallbackRoutes();

    return data.map((row) => ({
      id: row.id,
      fromCode: row.from_code,
      fromCity: row.from_city,
      toCode: row.to_code,
      toCity: row.to_city,
      toCountry: row.to_country,
      routeLabel: row.route_label,
      teaser: row.teaser,
      samplePrice: Number(row.sample_price || 0),
      isFeatured: !!row.is_featured,
      sortOrder: row.sort_order ?? 999,
    }));
  } catch (error) {
    console.error("getFlightRoutes:", error);
    return getFallbackRoutes();
  }
}
