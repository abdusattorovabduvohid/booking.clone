"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useRouter } from "@/i18n/routing";
import { setDestination } from "@/store/searchSlice";

interface UzbekistanCityItem {
  id: string;
  nameEn: string;
  nameRu: string;
  nameUz: string;
  variants: number;
  image: string;
}

export function DiscoverCountry() {
  const t = useTranslations("Index");
  const locale = useLocale();
  const dispatch = useDispatch();
  const router = useRouter();

  const cities: UzbekistanCityItem[] = [
    {
      id: "tashkent",
      nameEn: "Tashkent",
      nameRu: "Ташкент",
      nameUz: "Toshkent",
      variants: 1408,
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=500&q=80",
    },
    {
      id: "samarkand",
      nameEn: "Samarkand",
      nameRu: "Самарканд",
      nameUz: "Samarqand",
      variants: 864,
      image: "https://images.unsplash.com/photo-1580835239846-5bb9ce03c8c3?w=500&q=80",
    },
    {
      id: "bukhara",
      nameEn: "Bukhara",
      nameRu: "Бухара",
      nameUz: "Buxoro",
      variants: 570,
      image: "https://images.unsplash.com/photo-1623864503714-c189b6fb3e74?w=500&q=80",
    },
    {
      id: "khiva",
      nameEn: "Khiva",
      nameRu: "Хива",
      nameUz: "Xiva",
      variants: 154,
      image: "https://images.unsplash.com/photo-1616075191297-c87d46538356?w=500&q=80",
    },
    {
      id: "fergana",
      nameEn: "Fergana",
      nameRu: "Фергана",
      nameUz: "Farg'ona",
      variants: 43,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80",
    },
    {
      id: "chimgan",
      nameEn: "Chimgan",
      nameRu: "Чимган",
      nameUz: "Chimyon",
      variants: 20,
      image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=500&q=80",
    },
  ];

  const handleCityClick = (cityName: string) => {
    dispatch(setDestination(cityName));
    router.push(`/search?destination=${encodeURIComponent(cityName)}`);
  };

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
  }, []);

  return (
    <section className="mb-10 relative group/section">
      <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white leading-none mb-1">
        {t("discover_uzbekistan_title")}
      </h2>
      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium mb-4">
        {t("discover_uzbekistan_subtitle")}
      </p>

      {/* Slide Wrapper */}
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-10 h-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full flex items-center justify-center shadow-lg border border-gray-100 dark:border-gray-700 hover:scale-105 active:scale-95 transition-all duration-200 z-30 cursor-pointer"
            aria-label="Scroll left"
          >
            <FaChevronLeft className="text-sm" />
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-10 h-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full flex items-center justify-center shadow-lg border border-gray-100 dark:border-gray-700 hover:scale-105 active:scale-95 transition-all duration-200 z-30 cursor-pointer"
            aria-label="Scroll right"
          >
            <FaChevronRight className="text-sm" />
          </button>
        )}

        {/* Slider Items */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto snap-x no-scrollbar pb-4 scroll-smooth"
        >
          {cities.map((city) => {
            const cityName = locale === "uz" ? city.nameUz : locale === "ru" ? city.nameRu : city.nameEn;
            const propertiesCount = city.variants.toLocaleString("en-US");
            
            const countText = t("discover_country_variants", {
              count: propertiesCount,
            });

            return (
              <div
                key={city.id}
                onClick={() => handleCityClick(cityName)}
                className="snap-start shrink-0 cursor-pointer group w-44 md:w-48 flex flex-col"
              >
                {/* Image Frame */}
                <div className="rounded-lg overflow-hidden h-32 md:h-36 mb-2.5 bg-gray-50 border border-gray-100 dark:border-gray-700 shadow-xs">
                  <img
                    src={city.image}
                    alt={cityName}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                {/* Bold City Name */}
                <h3 className="font-extrabold text-gray-900 dark:text-white text-sm md:text-base leading-none group-hover:text-blue-600 transition-colors duration-150">
                  {cityName}
                </h3>
                {/* Localized Property Variants Text */}
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-semibold leading-tight">
                  {countText}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
