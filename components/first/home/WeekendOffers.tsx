"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FavoriteButton } from "@/components/shared/FavoriteButton";
import { Link } from "@/i18n/routing";

interface WeekendOfferItem {
  id: string;
  name: string;
  categoryEn: string;
  categoryRu: string;
  categoryUz: string;
  image: string;
  rating: number;
  reviews: number;
  locationEn: string;
  locationRu: string;
  locationUz: string;
  originalPrice: number;
  discountedPrice: number;
}

export function WeekendOffers() {
  const t = useTranslations("Index");
  const locale = useLocale();

  const properties: WeekendOfferItem[] = [
    {
      id: "art-residence",
      name: "Art Residence Hotel",
      categoryEn: "Hotel",
      categoryRu: "Отель",
      categoryUz: "Mehmonxona",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
      rating: 8.8,
      reviews: 209,
      locationEn: "Tashkent, Uzbekistan",
      locationRu: "Ташкент, Узбекистан",
      locationUz: "Toshkent, O'zbekiston",
      originalPrice: 12449,
      discountedPrice: 9337,
    },
    {
      id: "furkat-house",
      name: "Гостевой дом Фуркат",
      categoryEn: "Guest House",
      categoryRu: "Гостевой дом",
      categoryUz: "Mehmon uyi",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
      rating: 8.2,
      reviews: 953,
      locationEn: "Samarkand, Uzbekistan",
      locationRu: "Самарканд, Узбекистан",
      locationUz: "Samarqand, O'zbekiston",
      originalPrice: 5387,
      discountedPrice: 4579,
    },
    {
      id: "aq-minihotel",
      name: "AQ miniHOTEL",
      categoryEn: "Hotel",
      categoryRu: "Отель",
      categoryUz: "Mehmonxona",
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80",
      rating: 9.4,
      reviews: 239,
      locationEn: "Shymkent, Kazakhstan",
      locationRu: "Шымкент, Казахстан",
      locationUz: "Chimkent, Qozog'iston",
      originalPrice: 5094,
      discountedPrice: 4330,
    },
    {
      id: "garnet-mir",
      name: "Garnet Mir Airport Hotel",
      categoryEn: "Hotel",
      categoryRu: "Отель",
      categoryUz: "Mehmonxona",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
      rating: 9.2,
      reviews: 33,
      locationEn: "Tashkent, Uzbekistan",
      locationRu: "Ташкент, Узбекистан",
      locationUz: "Toshkent, O'zbekiston",
      originalPrice: 10192,
      discountedPrice: 7440,
    },
  ];

  // Ratings helper
  const getRatingLabel = (rating: number) => {
    if (rating >= 9.0) {
      if (locale === "ru") return "Превосходно";
      if (locale === "uz") return "Ajoyib";
      return "Exceptional";
    }
    if (rating >= 8.0) {
      if (locale === "ru") return "Потрясающе";
      if (locale === "uz") return "Mukammal";
      return "Wonderful";
    }
    if (locale === "ru") return "Хорошо";
    if (locale === "uz") return "Yaxshi";
    return "Good";
  };

  // 2 nights pricing formatter matching screenshot perfectly
  const getPriceLabel = (orig: number, disc: number) => {
    const uzsOrig = orig * 12000;
    const uzsDisc = disc * 12000;

    if (locale === "ru") {
      return (
        <div className="flex items-center gap-1.5 justify-end text-xs font-semibold text-gray-500">
          <span>2 ночи</span>
          <span className="text-red-600 line-through">
            {orig.toLocaleString("en-US")} руб.
          </span>
          <span className="font-extrabold text-sm text-gray-900 dark:text-white">
            {disc.toLocaleString("en-US")} руб.
          </span>
        </div>
      );
    }
    if (locale === "uz") {
      return (
        <div className="flex items-center gap-1.5 justify-end text-xs font-semibold text-gray-500">
          <span>2 kecha</span>
          <span className="text-red-600 line-through">
            {uzsOrig.toLocaleString("en-US")} so'm
          </span>
          <span className="font-extrabold text-sm text-gray-900 dark:text-white">
            {uzsDisc.toLocaleString("en-US")} so'm
          </span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5 justify-end text-xs font-semibold text-gray-500">
        <span>2 nights</span>
        <span className="text-red-600 line-through">
          ${orig.toLocaleString("en-US")}
        </span>
        <span className="font-extrabold text-sm text-gray-900 dark:text-white">
          ${disc.toLocaleString("en-US")}
        </span>
      </div>
    );
  };

  // Carousel slider code
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
        {t("weekend_offers_title")}
      </h2>
      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium mb-4">
        {locale === "uz" 
          ? "22-may - 24-may kunlari turar joylarda tejang." 
          : locale === "ru" 
            ? "Сэкономьте на жилье на 22 мая - 24 мая." 
            : "Save on stays for 22 May - 24 May."
        }
      </p>

      {/* Slider frame */}
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

        {/* Horizontal Carousel */}
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
                {/* Photo frame */}
                <div className="w-full h-44 relative overflow-hidden bg-gray-100 flex-shrink-0">
                  <Link href={`/property/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </Link>
                  {/* Live favorite heart button overlay */}
                  <div className="absolute top-3 right-3 z-10">
                    <FavoriteButton id={item.id} />
                  </div>
                </div>

                {/* Details body */}
                <div className="p-4 flex flex-col flex-grow">
                  {/* Row 1: Genius Badge */}
                  <div className="flex items-center gap-1.5 mb-1.5">
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

                  {/* Row 3: Address */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-semibold truncate">
                    {location}
                  </p>

                  {/* Row 4: Ratings layout */}
                  <div className="flex items-center gap-2 mb-3">
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

                  {/* Row 5: Green Seasonal Offer Badge matching screenshot 3 exactly */}
                  <div className="mb-4">
                    <span className="bg-[#008009] text-white px-2 py-1 rounded text-[10px] font-bold">
                      {locale === "uz" 
                        ? "Mavsumiy taklif" 
                        : locale === "ru" 
                          ? "Сезонное предложение" 
                          : "Seasonal offer"
                      }
                    </span>
                  </div>

                  {/* Row 6: Price tags */}
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
