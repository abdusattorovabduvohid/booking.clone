"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { FavoriteButton } from "@/components/shared/FavoriteButton";
import { Link } from "@/i18n/routing";

interface UniquePropertyItem {
  id: string;
  name: string;
  categoryEn: string;
  categoryRu: string;
  categoryUz: string;
  stars: number;
  image: string;
  rating: number;
  reviews: number;
  locationEn: string;
  locationRu: string;
  locationUz: string;
  originalPrice?: number;
  discountedPrice: number;
}

export function UniqueProperties() {
  const t = useTranslations("Index");
  const locale = useLocale();

  const properties: UniquePropertyItem[] = [
    {
      id: "chiang-rai",
      name: "The Legend Chiang Rai Boutique River Resort & Spa",
      categoryEn: "Resort",
      categoryRu: "Курортный отель",
      categoryUz: "Kurort mehmonxonasi",
      stars: 5,
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80",
      rating: 9.1,
      reviews: 918,
      locationEn: "Chiang Rai, Thailand",
      locationRu: "Чианграй, Таиланд",
      locationUz: "Chiangray, Tailand",
      originalPrice: 10261,
      discountedPrice: 5746,
    },
    {
      id: "hmong-village",
      name: "Hmong Village Resort",
      categoryEn: "Resort",
      categoryRu: "Курортный отель",
      categoryUz: "Kurort mehmonxonasi",
      stars: 4,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
      rating: 9.1,
      reviews: 156,
      locationEn: "Ha Giang, Vietnam",
      locationRu: "Хазянг, Вьетнам",
      locationUz: "Xazyang, Vyetnam",
      discountedPrice: 4282,
    },
    {
      id: "mai-chau",
      name: "Mai Chau Ecolodge",
      categoryEn: "Hotel",
      categoryRu: "Отель",
      categoryUz: "Mehmonxona",
      stars: 4,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
      rating: 9.1,
      reviews: 986,
      locationEn: "Mai Chau, Vietnam",
      locationRu: "Майтяу, Вьетнам",
      locationUz: "Maytyau, Vyetnam",
      originalPrice: 13813,
      discountedPrice: 6630,
    },
    {
      id: "chi-boutique",
      name: "The Chi Boutique Hotel",
      categoryEn: "Hotel",
      categoryRu: "Отель",
      categoryUz: "Mehmonxona",
      stars: 4,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",
      rating: 9.0,
      reviews: 537,
      locationEn: "Hanoi, Vietnam",
      locationRu: "Ханой, Вьетнам",
      locationUz: "Xanoy, Vyetnam",
      originalPrice: 8205,
      discountedPrice: 4185,
    },
  ];

  const getRatingLabel = (rating: number) => {
    if (rating >= 9.0) {
      if (locale === "ru") return "Превосходно";
      if (locale === "uz") return "Ajoyib";
      return "Exceptional";
    }
    if (locale === "ru") return "Потрясающе";
    if (locale === "uz") return "Mukammal";
    return "Wonderful";
  };

  const getPriceLabel = (orig?: number, disc?: number) => {
    if (!disc) return null;
    const uzsDisc = disc * 12000;
    const uzsOrig = orig ? orig * 12000 : undefined;

    if (locale === "ru") {
      return (
        <div className="flex items-center gap-1.5 justify-end text-xs font-semibold text-gray-500">
          {orig && (
            <>
              <span>От</span>
              <span className="text-red-600 line-through">
                {orig.toLocaleString("en-US")} руб.
              </span>
            </>
          )}
          {!orig && <span>От</span>}
          <span className="font-extrabold text-sm text-gray-900 dark:text-white">
            {disc.toLocaleString("en-US")} руб.
          </span>
        </div>
      );
    }
    if (locale === "uz") {
      return (
        <div className="flex items-center gap-1.5 justify-end text-xs font-semibold text-gray-500">
          {uzsOrig && (
            <>
              <span>dan</span>
              <span className="text-red-600 line-through">
                {uzsOrig.toLocaleString("en-US")} so'm
              </span>
            </>
          )}
          {!uzsOrig && <span>dan</span>}
          <span className="font-extrabold text-sm text-gray-900 dark:text-white">
            {uzsDisc.toLocaleString("en-US")} so'm
          </span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5 justify-end text-xs font-semibold text-gray-500">
        {orig && (
          <>
            <span>From</span>
            <span className="text-red-600 line-through">
              ${orig.toLocaleString("en-US")}
            </span>
          </>
        )}
        {!orig && <span>From</span>}
        <span className="font-extrabold text-sm text-gray-900 dark:text-white">
          ${disc.toLocaleString("en-US")}
        </span>
      </div>
    );
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
      <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-1 leading-none">
        {t("unique_properties_title")}
      </h2>
      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium mb-4">
        {t("unique_properties_subtitle")}
      </p>

      {/* Slider wrapper */}
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

        {/* Carousel Slider */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto snap-x no-scrollbar pb-4 scroll-smooth"
        >
          {properties.map((item) => {
            const category = locale === "uz" ? item.categoryUz : locale === "ru" ? item.categoryRu : item.categoryEn;
            const location = locale === "uz" ? item.locationUz : locale === "ru" ? item.locationRu : item.locationEn;
            const ratingLabel = getRatingLabel(item.rating);

            return (
              <div
                key={item.id}
                className="snap-start shrink-0 w-64 md:w-72 bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 relative flex flex-col h-full hover:shadow-md transition-all duration-200 group"
              >
                {/* Image Grid Frame */}
                <div className="w-full h-44 relative overflow-hidden bg-gray-100 flex-shrink-0">
                  <Link href={`/property/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </Link>
                  {/* Live favorite button overlay */}
                  <div className="absolute top-3 right-3 z-10">
                    <FavoriteButton id={item.id} />
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-4 flex flex-col flex-grow">
                  {/* Row 1: Category, Stars & Genius Pill */}
                  <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-semibold text-gray-500 dark:text-gray-400 flex-wrap">
                    <span>{category}</span>
                    {/* Dynamic star icons */}
                    <span className="flex items-center text-[#febb02] gap-0.5">
                      {Array(item.stars)
                        .fill(0)
                        .map((_, idx) => (
                          <FaStar key={idx} className="text-[10px]" />
                        ))}
                    </span>
                    {/* Genius Stamp Pill */}
                    <span className="bg-[#006ce4] text-white px-1.5 py-0.5 rounded-sm text-[8px] font-black tracking-wider uppercase flex items-center">
                      Genius
                    </span>
                  </div>

                  {/* Row 2: Hotel Name */}
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-sm md:text-base leading-snug mb-1 group-hover:text-blue-600 transition-colors duration-150 line-clamp-2">
                    <Link href={`/property/${item.id}`}>
                      {item.name}
                    </Link>
                  </h3>

                  {/* Row 3: Location */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-semibold truncate">
                    {location}
                  </p>

                  {/* Row 4: Ratings layout */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-[#003580] text-white text-[11px] font-black rounded-t-md rounded-br-md rounded-bl-sm px-1.5 py-1 flex-shrink-0">
                      {item.rating.toFixed(1)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-black text-gray-950 dark:text-white leading-none">
                        {ratingLabel}
                      </span>
                      <span className="text-[9px] text-gray-500 dark:text-gray-400 leading-none mt-0.5">
                        {item.reviews.toLocaleString("en-US")} {locale === "uz" ? "ta sharh" : locale === "ru" ? "отзывов" : "reviews"}
                      </span>
                    </div>
                  </div>

                  {/* Row 5: Price tags */}
                  <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700 text-right">
                    {getPriceLabel(item.originalPrice, item.discountedPrice)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
