"use client";

import { useTranslations } from "next-intl";
import { categories } from "@/lib/backend-data";
import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "@/i18n/routing";

export function PropertyCategories() {
  const t = useTranslations("Index");
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const getLocalizedName = (name: string) => {
    const key = name.toLowerCase();
    if (key === "hotels") return t("prop_hotels");
    if (key === "apartments") return t("prop_apartments");
    if (key === "resorts") return t("prop_resorts");
    if (key === "villas") return t("prop_villas");
    return name;
  };

  const handleCategoryClick = (name: string) => {
    const key = name.toLowerCase();
    let types = "";
    if (key === "hotels") {
      types = "Отель,Гостиница,Апарт-отель";
    } else if (key === "apartments") {
      types = "Апартаменты";
    } else if (key === "resorts") {
      types = "Курортный отель";
    } else if (key === "villas") {
      types = "Вилла";
    }

    if (types) {
      router.push(`/search?type=${encodeURIComponent(types)}`);
    } else {
      router.push("/search");
    }
  };

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
      if (el) {
        el.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <section className="mb-10 relative group/section">
      <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-4">
        {t("search_property_type_title")}
      </h2>
      
      {/* Scrollable Container Wrapper with Arrows */}
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
          className="flex gap-4 overflow-x-auto snap-x no-scrollbar pb-4 relative scroll-smooth"
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="snap-start shrink-0 w-52 md:w-64 cursor-pointer group"
            >
              {/* Image Frame matching rounded-lg style in screenshot */}
              <div className="rounded-lg overflow-hidden mb-2.5 aspect-[4/3] bg-gray-50 border border-gray-100 dark:border-gray-700">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
              </div>
              <h3 className="font-extrabold text-gray-900 dark:text-white text-sm md:text-base leading-snug group-hover:text-blue-600 transition-colors duration-150">
                {getLocalizedName(cat.name)}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
