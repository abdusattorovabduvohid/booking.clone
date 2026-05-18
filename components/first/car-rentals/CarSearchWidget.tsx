"use client";
import { useState, useEffect, useRef } from "react";
import { FaCar, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

export function CarSearchWidget({ 
  initialPickup = "", 
  initialPickupDate = "", 
  initialDropoffDate = "" 
}: { 
  initialPickup?: string;
  initialPickupDate?: string;
  initialDropoffDate?: string;
}) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const t = useTranslations("CarRentals");

  const [pickup, setPickup] = useState(initialPickup || searchParams.get("pickup") || "");
  const [pickupDate, setPickupDate] = useState(initialPickupDate || searchParams.get("pickupDate") || "2026-06-12");
  const [dropoffDate, setDropoffDate] = useState(initialDropoffDate || searchParams.get("dropoffDate") || "2026-06-15");
  const [isOpen, setIsOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLocale = params.locale || "en";

  const popularCities = [
    { name: "Tashkent", ru: "Ташкент", uz: "Toshkent" },
    { name: "Samarkand", ru: "Самарканд", uz: "Samarqand" },
    { name: "Bukhara", ru: "Бухара", uz: "Buxoro" },
    { name: "Khiva", ru: "Хива", uz: "Xiva" },
    { name: "Dubai", ru: "Дубай", uz: "Dubay" }
  ];

  const getLocalizedName = (city: typeof popularCities[0]) => {
    if (currentLocale === "ru") return city.ru;
    if (currentLocale === "uz") return city.uz;
    return city.name;
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (cityName: string) => {
    setPickup(cityName);
    setIsOpen(false);
  };

  const handleSearch = () => {
    const queryPickup = pickup.trim() || (currentLocale === "ru" ? "Ташкент" : currentLocale === "uz" ? "Toshkent" : "Tashkent");
    router.push(`/${currentLocale}/car-rentals/search?pickup=${encodeURIComponent(queryPickup)}&pickupDate=${pickupDate}&dropoffDate=${dropoffDate}`);
  };

  return (
    <div className="bg-[#febb02] p-1 rounded-lg shadow-lg w-full max-w-7xl relative" ref={dropdownRef}>
      <div className="flex flex-col lg:flex-row gap-1">
        
        {/* Pick-up Location */}
        <div className="flex-[2] flex items-center bg-white px-4 py-3 rounded-sm relative">
          <FaCar className="text-gray-400 mr-3 text-xl" />
          <input 
            type="text" 
            placeholder={t("pickup_placeholder")}
            value={pickup}
            onChange={(e) => {
              setPickup(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className="w-full focus:outline-none text-gray-900 font-semibold placeholder-gray-500 bg-transparent text-sm md:text-base"
          />

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-100 dark:border-gray-800 z-[100] p-4 max-h-[300px] overflow-y-auto">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                {currentLocale === "ru" ? "Популярные направления" : currentLocale === "uz" ? "Ommabop yo'nalishlar" : "Popular destinations"}
              </h4>
              <div className="space-y-1">
                {popularCities
                  .filter(c => 
                    c.name.toLowerCase().includes(pickup.toLowerCase()) || 
                    c.ru.toLowerCase().includes(pickup.toLowerCase()) || 
                    c.uz.toLowerCase().includes(pickup.toLowerCase())
                  )
                  .map((city, idx) => (
                    <div 
                      key={idx}
                      onMouseDown={() => handleSelect(getLocalizedName(city))}
                      className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span className="font-bold text-sm text-gray-900 dark:text-white">
                        {getLocalizedName(city)}
                      </span>
                    </div>
                  ))
                }
              </div>
            </div>
          )}
        </div>

        {/* Pick-up Date */}
        <div className="flex-1 flex items-center bg-white px-4 py-3 rounded-sm relative">
          <FaCalendarAlt className="text-gray-400 mr-3 text-xl" />
          <div className="flex flex-col w-full">
            <span className="text-[10px] text-gray-400 font-bold uppercase">{t("pickup_date")}</span>
            <input 
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="focus:outline-none text-gray-950 font-bold bg-transparent text-sm w-full"
            />
          </div>
        </div>

        {/* Drop-off Date */}
        <div className="flex-1 flex items-center bg-white px-4 py-3 rounded-sm relative">
          <FaCalendarAlt className="text-gray-400 mr-3 text-xl" />
          <div className="flex flex-col w-full">
            <span className="text-[10px] text-gray-400 font-bold uppercase">{t("dropoff_date")}</span>
            <input 
              type="date"
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
              className="focus:outline-none text-gray-950 font-bold bg-transparent text-sm w-full"
            />
          </div>
        </div>

        {/* Search button */}
        <Button 
          onClick={handleSearch}
          className="bg-[#0071c2] hover:bg-[#005999] text-white text-base md:text-lg font-bold px-8 py-3 lg:w-auto w-full rounded-sm"
        >
          {t("search")}
        </Button>
      </div>
    </div>
  );
}
