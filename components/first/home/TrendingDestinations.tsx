"use client";

import { useTranslations, useLocale } from "next-intl";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "@/i18n/routing";
import { setDestination } from "@/store/searchSlice";
import { useMemo } from "react";

interface TrendingItem {
  id: string;
  nameEn: string;
  nameRu: string;
  nameUz: string;
  flag: string;
  image: string;
}

export function TrendingDestinations() {
  const t = useTranslations("Index");
  const locale = useLocale();
  const dispatch = useDispatch();
  const router = useRouter();
  const searchState = useSelector((state: RootState) => state.search);
  const activeCity = searchState.destination || "";

  // Check if active query relates to China to swap subtitle dynamically
  const isChina = useMemo(() => {
    const query = activeCity.toLowerCase();
    return (
      query.includes("сюйчжоу") ||
      query.includes("xuzhou") ||
      query.includes("кит") ||
      query.includes("china") ||
      query.includes("пекин") ||
      query.includes("beijing") ||
      query.includes("шанхай") ||
      query.includes("shanghai")
    );
  }, [activeCity]);

  const subtitleText = isChina
    ? t("trending_destinations_subtitle_cn")
    : t("trending_destinations_subtitle_uz");

  // Premium destinations matching screenshot exactly!
  const destinations: TrendingItem[] = [
    {
      id: "guangzhou",
      nameEn: "Guangzhou",
      nameRu: "Гуанчжоу",
      nameUz: "Guanchjou",
      flag: "🇨🇳",
      image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&q=80",
    },
    {
      id: "vienna",
      nameEn: "Vienna",
      nameRu: "Вена",
      nameUz: "Vena",
      flag: "🇦🇹",
      image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80",
    },
    {
      id: "xuzhou",
      nameEn: "Xuzhou",
      nameRu: "Сюйчжоу",
      nameUz: "Syuichjou",
      flag: "🇨🇳",
      image: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?w=800&q=80",
    },
    {
      id: "nanjing",
      nameEn: "Nanjing",
      nameRu: "Нанкин",
      nameUz: "Nankin",
      flag: "🇨🇳",
      image: "https://images.unsplash.com/photo-1543097692-fa13c6cd8595?w=800&q=80",
    },
    {
      id: "chuzhou",
      nameEn: "Chuzhou",
      nameRu: "Chuzhou",
      nameUz: "Chuchjou",
      flag: "🇨🇳",
      image: "https://images.unsplash.com/photo-1534097692-fa13c6cd8595?w=800&q=80",
    },
  ];

  const handleCityClick = (cityName: string) => {
    dispatch(setDestination(cityName));
    router.push(`/search?destination=${encodeURIComponent(cityName)}`);
  };

  return (
    <section className="mb-10 select-none">
      <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white leading-none mb-1">
        {t("popular_destinations_title")}
      </h2>
      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium mb-4">
        {subtitleText}
      </p>

      {/* Grid wrapper matching the exact layout (2 large columns on top, 3 columns below) */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {destinations.map((dest, i) => {
          const cityName = locale === "uz" ? dest.nameUz : locale === "ru" ? dest.nameRu : dest.nameEn;
          const isLarge = i < 2;

          return (
            <div
              key={dest.id}
              onClick={() => handleCityClick(cityName)}
              className={`relative rounded-lg overflow-hidden group cursor-pointer border border-gray-100 dark:border-gray-800 ${
                isLarge 
                  ? "md:col-span-3 h-64 md:h-72" 
                  : "md:col-span-2 h-56 md:h-60"
              }`}
            >
              <img
                src={dest.image}
                alt={cityName}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
              
              {/* Sleek top linear gradient dark overlay to keep white text highly visible */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-transparent pointer-events-none h-1/2"></div>
              
              {/* Heading overlays with flag and city name */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <h3 className="text-white text-xl md:text-2xl font-black tracking-tight drop-shadow-sm select-none">
                  {cityName}
                </h3>
                <span className="text-xl md:text-2xl select-none" role="img" aria-label="flag">
                  {dest.flag}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
