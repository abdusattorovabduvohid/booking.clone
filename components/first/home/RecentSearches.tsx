"use client";

import { useTranslations, useLocale } from "next-intl";
import { useDispatch } from "react-redux";
import { useRouter } from "@/i18n/routing";
import { FaBed } from "react-icons/fa";
import {
  setDestination,
  setCheckIn,
  setCheckOut,
  setAdults,
} from "@/store/searchSlice";
import { FavoriteButton } from "@/components/shared/FavoriteButton";
import { Link } from "@/i18n/routing";

interface RecentSearchItem {
  id: string;
  cityEn: string;
  cityRu: string;
  cityUz: string;
  image: string;
}

export function RecentSearches() {
  const t = useTranslations("Index");
  const locale = useLocale();
  const dispatch = useDispatch();
  const router = useRouter();

  const searchChips: RecentSearchItem[] = [
    {
      id: "xuzhou",
      cityEn: "Xuzhou",
      cityRu: "Сюйчжоу",
      cityUz: "Syuychjou",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=300&q=80",
    },
    {
      id: "istanbul",
      cityEn: "Istanbul",
      cityRu: "Стамбул",
      cityUz: "Istanbul",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=300&q=80",
    },
  ];

  const viewedProperties = [
    {
      id: "element-garden",
      name: "Element Garden",
      cityEn: "Istanbul, Turkey",
      cityRu: "Стамбул, Турция",
      cityUz: "Istanbul, Turkiya",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",
      rating: 9.1,
      ratingLabelEn: "Exceptional",
      ratingLabelRu: "Превосходно",
      ratingLabelUz: "Ajoyib",
      reviews: 1143,
      price: 875000,
    },
    {
      id: "marxal-resort",
      name: "Marxal Resort & Spa",
      cityEn: "Sheki, Azerbaijan",
      cityRu: "Шеки, Азербайджан",
      cityUz: "Sheki, Ozarbayjon",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
      rating: 9.6,
      ratingLabelEn: "Exceptional",
      ratingLabelRu: "Великолепно",
      ratingLabelUz: "Mukammal",
      reviews: 1039,
      price: 1120000,
    },
  ];

  const handleChipClick = (item: RecentSearchItem) => {
    const city = locale === "uz" ? item.cityUz : locale === "ru" ? item.cityRu : item.cityEn;
    
    dispatch(setDestination(city));
    dispatch(setCheckIn("2026-06-16T12:00:00.000Z"));
    dispatch(setCheckOut("2026-06-17T12:00:00.000Z"));
    dispatch(setAdults(2));

    router.push(`/search?destination=${encodeURIComponent(city)}`);
  };

  const getDatesLabel = () => {
    if (locale === "uz") return "se, 16-iyun — cho, 17-iyun";
    if (locale === "ru") return "вт, 16 июня — ср, 17 июня";
    return "Tue, Jun 16 — Wed, Jun 17";
  };

  const getTravelersLabel = () => {
    if (locale === "uz") return "2 kishi";
    if (locale === "ru") return "2 человека";
    return "2 travelers";
  };

  return (
    <div className="space-y-10 my-8">
      <section>
        <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-4">
          {t("recently_searched_title")}
        </h2>
        <div className="flex flex-wrap gap-4">
          {searchChips.map((chip) => {
            const cityName = locale === "uz" ? chip.cityUz : locale === "ru" ? chip.cityRu : chip.cityEn;
            return (
              <div
                key={chip.id}
                onClick={() => handleChipClick(chip)}
                className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-xs hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 cursor-pointer p-3 select-none w-full sm:w-72 relative active:scale-[0.98]"
              >
                <div className="w-16 h-16 rounded-md overflow-hidden relative flex-shrink-0 bg-gray-100">
                  <img
                    src={chip.image}
                    alt={cityName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 left-1 bg-blue-600/80 p-0.5 rounded text-white text-[10px]">
                    <FaBed />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="font-extrabold text-sm text-gray-900 dark:text-white truncate">
                    {cityName}
                  </div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 truncate">
                    {getDatesLabel()}
                  </div>
                  <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                    {getTravelersLabel()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-4">
          {t("still_interested_title")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {viewedProperties.map((item) => {
            const propertyName = item.name;
            const cityCountry = locale === "uz" ? item.cityUz : locale === "ru" ? item.cityRu : item.cityEn;
            const ratingLabel = locale === "uz" ? item.ratingLabelUz : locale === "ru" ? item.ratingLabelRu : item.ratingLabelEn;

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 relative flex flex-col h-full hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-full h-48 relative overflow-hidden bg-gray-100 flex-shrink-0">
                  <Link href={`/property/${item.id}`}>
                    <img
                      src={item.image}
                      alt={propertyName}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </Link>
                  <div className="absolute top-3 right-3 z-10">
                    <FavoriteButton id={item.id} />
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-base leading-tight mb-1 group-hover:text-blue-600 transition duration-150">
                    <Link href={`/property/${item.id}`}>
                      {propertyName}
                    </Link>
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    {cityCountry}
                  </p>

                  <div className="flex items-center gap-2 mt-auto">
                    <div className="bg-[#003580] text-white text-[11px] font-black rounded-t-md rounded-br-md rounded-bl-sm px-1.5 py-1 flex-shrink-0">
                      {item.rating}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-black text-gray-950 dark:text-white truncate">
                        {ratingLabel}
                      </span>
                      <span className="text-[9px] text-gray-500 dark:text-gray-400 leading-none mt-0.5">
                        {item.reviews.toLocaleString("en-US")} {locale === "uz" ? "ta sharh" : locale === "ru" ? "отзывов" : "reviews"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
