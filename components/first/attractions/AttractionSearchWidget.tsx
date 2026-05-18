"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaTimes, FaMapMarkerAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { getMockCities, CityMock } from "@/lib/mocks/cities";

interface AttractionSearchWidgetProps {
  initialQuery?: string;
  placeholder: string;
  searchBtnLabel: string;
  locale: string;
}

export function AttractionSearchWidget({
  initialQuery = "",
  placeholder,
  searchBtnLabel,
  locale,
}: AttractionSearchWidgetProps) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<CityMock[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  // Click outside suggestions list listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Live filter cities database as the user types
  const handleInputChange = (val: string) => {
    setValue(val);
    if (!val.trim()) {
      setSuggestions([]);
      return;
    }

    const query = val.toLowerCase().trim();
    const allCities = getMockCities();
    
    const matched = allCities.filter((c) => {
      return (
        c.name.toLowerCase().includes(query) ||
        c.nameEn.toLowerCase().includes(query) ||
        c.nameUz.toLowerCase().includes(query) ||
        c.country.toLowerCase().includes(query) ||
        c.countryEn.toLowerCase().includes(query) ||
        c.countryUz.toLowerCase().includes(query)
      );
    });

    setSuggestions(matched.slice(0, 6)); // Display top 6 matches
    setShowSuggestions(true);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const queryStr = value.trim();
    setShowSuggestions(false);
    if (queryStr) {
      router.push(`/attractions?query=${encodeURIComponent(queryStr)}`);
    } else {
      router.push(`/attractions`);
    }
  };

  const handleClear = () => {
    setValue("");
    setSuggestions([]);
    setShowSuggestions(false);
    router.push(`/attractions`);
  };

  const handleSuggestionClick = (city: CityMock) => {
    const cityName = locale === "uz" ? city.nameUz : locale === "en" ? city.nameEn : city.name;
    setValue(cityName);
    setShowSuggestions(false);
    router.push(`/attractions?query=${encodeURIComponent(cityName)}`);
  };

  return (
    <div ref={containerRef} className="w-full max-w-7xl relative">
      <form
        onSubmit={handleSearchSubmit}
        className="bg-[#febb02] p-1.5 rounded-lg shadow-lg w-full transition-all duration-300"
      >
        <div className="flex flex-col lg:flex-row gap-1">
          <div className="flex-[3] flex items-center bg-white px-4 py-3.5 rounded-sm relative group focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
            <FaSearch className="text-gray-400 mr-3 text-xl transition-colors group-focus-within:text-blue-500" />
            <input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => {
                if (value.trim()) setShowSuggestions(true);
              }}
              placeholder={placeholder}
              className="w-full focus:outline-none text-gray-900 font-semibold text-lg bg-transparent"
            />
            <AnimatePresence>
              {value && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  type="button"
                  onClick={handleClear}
                  className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors p-1.5 cursor-pointer rounded-full hover:bg-gray-100"
                >
                  <FaTimes className="text-sm" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          <button
            type="submit"
            className="bg-[#0071c2] hover:bg-[#005999] active:scale-98 text-white text-xl font-bold px-10 py-3.5 lg:w-auto w-full rounded-sm cursor-pointer shadow-sm transition-all duration-150 flex items-center justify-center gap-2"
          >
            {searchBtnLabel}
          </button>
        </div>
      </form>

      {/* Real-time Autocomplete Suggestions Popover */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 2 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl z-50 overflow-hidden mt-1.5 max-h-[360px] overflow-y-auto"
          >
            <div className="py-2">
              {suggestions.map((city) => {
                const cityName = locale === "uz" ? city.nameUz : locale === "en" ? city.nameEn : city.name;
                const countryName = locale === "uz" ? city.countryUz : locale === "en" ? city.countryEn : city.country;

                return (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => handleSuggestionClick(city)}
                    className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors border-b border-gray-50 dark:border-gray-800 last:border-0 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-700/40 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <FaMapMarkerAlt className="text-base" />
                      </div>
                      <div>
                        <div className="font-extrabold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                          <span>{cityName}</span>
                          <span className="text-base leading-none">{city.flag}</span>
                        </div>
                        <div className="text-[11px] font-bold text-gray-400 dark:text-gray-500 mt-0.5">
                          {countryName}
                        </div>
                      </div>
                    </div>
                    
                    {/* Visual variants badge */}
                    <div className="text-[10px] font-extrabold px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {city.variants} {locale === "ru" ? "мест" : locale === "uz" ? "ta variant" : "options"}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
