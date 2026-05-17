import { supabaseApi } from "./supabase-api";

// Destinations
export const fetchTrendingDestinations = async () => {
  const { data } = await supabaseApi.get("/destinations?is_trending=eq.true&order=variants.desc&limit=5");
  return data;
};

export const fetchDiscoverUzbekistan = async () => {
  const { data } = await supabaseApi.get("/destinations?country=eq.Узбекистан&order=variants.desc");
  return data;
};

export const fetchQuickTripPlanner = async () => {
  const { data } = await supabaseApi.get("/destinations?region=eq.Центральная Азия&limit=6");
  return data;
};

// Hotels / Properties
export const fetchHomesGuestsLove = async () => {
  const { data } = await supabaseApi.get("/hotels?order=rating.desc&limit=4");
  return data;
};

export const fetchUniqueProperties = async () => {
  const { data } = await supabaseApi.get("/hotels?category=in.(Апартаменты,Хостел,Гостевой дом)&limit=4");
  return data;
};

export const fetchWeekendOffers = async () => {
  const { data } = await supabaseApi.get("/hotels?is_genius=eq.true&limit=4");
  return data;
};

export const fetchRecentSearches = async () => {
  // Mocking recent searches by pulling a few random hotels
  const { data } = await supabaseApi.get("/hotels?limit=2");
  return data;
};

// Static Mocks for UI elements lacking DB tables
export const categories = [
  { id: 1, name: "Hotels", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80" },
  { id: 2, name: "Apartments", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80" },
  { id: 3, name: "Resorts", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80" },
  { id: 4, name: "Villas", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" },
];
