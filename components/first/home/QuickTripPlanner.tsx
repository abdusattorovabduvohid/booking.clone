"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "@/i18n/routing";
import { setDestination } from "@/store/searchSlice";
import { FaChevronLeft, FaChevronRight, FaChevronDown } from "react-icons/fa";

interface CityItem {
  id: string;
  nameEn: string;
  nameRu: string;
  nameUz: string;
  dist: number;
  image: string;
}

export function QuickTripPlanner() {
  const t = useTranslations("Index");
  const locale = useLocale();
  const dispatch = useDispatch();
  const router = useRouter();
  const searchState = useSelector((state: RootState) => state.search);
  const activeCity = searchState.destination || "";

  // 1. Determine if searched city is in China or Uzbekistan/Other
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

  // City datasets matching screenshot exactly!
  const chinaCities: CityItem[] = [
    {
      id: "nanjing",
      nameEn: "Nanjing",
      nameRu: "Нанкин",
      nameUz: "Nankin",
      dist: 286,
      image: "https://images.unsplash.com/photo-1543097692-fa13c6cd8595?w=500&q=80",
    },
    {
      id: "shanghai",
      nameEn: "Shanghai",
      nameRu: "Шанхай",
      nameUz: "Shanhay",
      dist: 524,
      image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=500&q=80",
    },
    {
      id: "hangzhou",
      nameEn: "Hangzhou",
      nameRu: "Ханчжоу",
      nameUz: "Xanchjou",
      dist: 524,
      image: "https://images.unsplash.com/photo-1534097692-fa13c6cd8595?w=500&q=80",
    },
    {
      id: "beijing",
      nameEn: "Beijing",
      nameRu: "Пекин",
      nameUz: "Pekin",
      dist: 632,
      image: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?w=500&q=80",
    },
    {
      id: "xian",
      nameEn: "Xi'an",
      nameRu: "Сиань",
      nameUz: "Sian",
      dist: 758,
      image: "https://images.unsplash.com/photo-1599572418684-24a04b11358c?w=500&q=80",
    },
    {
      id: "guangzhou",
      nameEn: "Guangzhou",
      nameRu: "Гуанчжоу",
      nameUz: "Guanchjou",
      dist: 1293,
      image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=500&q=80",
    },
  ];

  const uzbekCities: CityItem[] = [
    {
      id: "samarkand",
      nameEn: "Samarkand",
      nameRu: "Самарканд",
      nameUz: "Samarqand",
      dist: 268,
      image: "https://images.unsplash.com/photo-1580835239846-5bb9ce03c8c3?w=500&q=80",
    },
    {
      id: "bukhara",
      nameEn: "Bukhara",
      nameRu: "Бухара",
      nameUz: "Buxoro",
      dist: 437,
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=500&q=80",
    },
    {
      id: "khiva",
      nameEn: "Khiva",
      nameRu: "Хива",
      nameUz: "Xiva",
      dist: 730,
      image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=500&q=80",
    },
    {
      id: "kokand",
      nameEn: "Kokand",
      nameRu: "Коканд",
      nameUz: "Qo'qon",
      dist: 165,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80",
    },
    {
      id: "namangan",
      nameEn: "Namangan",
      nameRu: "Наманган",
      nameUz: "Namangan",
      dist: 200,
      image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=500&q=80",
    },
  ];

  // Dynamic values
  const activeCitiesList = isChina ? chinaCities : uzbekCities;
  const activeCityName = activeCity || (locale === "ru" ? "Ташкент" : locale === "uz" ? "Toshkent" : "Tashkent");

  const getSubTitle = () => {
    return isChina ? t("plan_trip_subtitle_cn") : t("plan_trip_subtitle_uz");
  };

  const getDistanceLabel = (dist: number) => {
    if (locale === "uz") return `Toshkentdan ${dist} km uzoqlikda`;
    if (locale === "ru") return `${dist} км от города ${activeCityName}`;
    return `${dist} km from ${activeCityName}`;
  };

  // Localized Tabs matching screenshot
  const tabsList = useMemo(() => {
    if (locale === "uz") {
      return ["Hashamatli kurortlar", "Festivallar va tadbirlar", "Gastronomiya", "Tabiat bag'rida", "Yana"];
    }
    if (locale === "ru") {
      return ["Роскошные спа", "Фестивали и мероприятия", "Еда и кулинария", "Природные ретриты", "Еще"];
    }
    return ["Luxury spa", "Festivals & Events", "Gastronomy", "Nature retreats", "More"];
  }, [locale]);

  const [activeTab, setActiveTab] = useState(tabsList[0]);

  // Sort cities dynamically based on active tab to create a live sorting experience!
  const sortedCitiesList = useMemo(() => {
    const list = [...activeCitiesList];
    const tabIndex = tabsList.indexOf(activeTab);

    if (tabIndex === 0) {
      // Luxury Spa: Sort by distance descending
      return list.sort((a, b) => b.dist - a.dist);
    } else if (tabIndex === 1) {
      // Festivals & Events: Sort alphabetically by ID
      return list.sort((a, b) => a.id.localeCompare(b.id));
    } else if (tabIndex === 2) {
      // Gastronomy: Reverse order
      return list.reverse();
    } else if (tabIndex === 3) {
      // Nature Retreats: Sort by distance ascending
      return list.sort((a, b) => a.dist - b.dist);
    }
    return list;
  }, [activeCitiesList, activeTab, tabsList]);

  const handleCityClick = (cityName: string) => {
    dispatch(setDestination(cityName));
    router.push(`/search?destination=${encodeURIComponent(cityName)}`);
  };

  // Slider refs
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 15);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const offset = direction === "left" ? -300 : 300;
      sliderRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      handleScroll();
    }
    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, [sortedCitiesList]);

  // Adjust active tab state if locale changes
  useEffect(() => {
    setActiveTab(tabsList[0]);
  }, [tabsList]);

  return (
    <section className="mb-10 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
      <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white leading-none mb-1">
        {t("plan_trip_title")}
      </h2>
      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium mb-6">
        {getSubTitle()}
      </p>

      {/* Localized Category Pills matching screenshot */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-2 select-none">
        {tabsList.map((tab, i) => {
          const isSelected = activeTab === tab;
          const isLast = i === tabsList.length - 1;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-2 text-xs md:text-sm font-bold transition-all duration-200 cursor-pointer border ${
                isSelected
                  ? "bg-transparent border-[#006ce4] text-[#006ce4] rounded-full border-2"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full"
              } ${isLast ? "flex items-center gap-1.5" : ""}`}
            >
              <span>{tab}</span>
              {isLast && <FaChevronDown className="text-[10px]" />}
            </button>
          );
        })}
      </div>

      {/* Cities Carousel Slider */}
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/3 -translate-y-1/2 -ml-4 w-10 h-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full flex items-center justify-center shadow-lg border border-gray-100 dark:border-gray-700 hover:scale-105 active:scale-95 transition-all duration-200 z-30 cursor-pointer"
            aria-label="Scroll left"
          >
            <FaChevronLeft className="text-sm" />
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/3 -translate-y-1/2 -mr-4 w-10 h-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full flex items-center justify-center shadow-lg border border-gray-100 dark:border-gray-700 hover:scale-105 active:scale-95 transition-all duration-200 z-30 cursor-pointer"
            aria-label="Scroll right"
          >
            <FaChevronRight className="text-sm" />
          </button>
        )}

        {/* Slider Items */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto snap-x no-scrollbar pb-2 scroll-smooth"
        >
          {sortedCitiesList.map((item) => {
            const cityName = locale === "uz" ? item.nameUz : locale === "ru" ? item.nameRu : item.nameEn;
            return (
              <div
                key={item.id}
                onClick={() => handleCityClick(cityName)}
                className="snap-start shrink-0 w-44 md:w-52 cursor-pointer group"
              >
                {/* Beautiful rounded aspect ratio card frame */}
                <div className="rounded-lg overflow-hidden mb-3 aspect-[4/3] bg-gray-50 border border-gray-100 dark:border-gray-700 shadow-xs">
                  <img
                    src={item.image}
                    alt={cityName}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                {/* City name bold */}
                <h3 className="font-extrabold text-gray-900 dark:text-white text-sm md:text-base leading-tight group-hover:text-blue-600 transition-colors duration-150">
                  {cityName}
                </h3>
                {/* Subtext distance matching screenshot */}
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-semibold leading-tight">
                  {getDistanceLabel(item.dist)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
