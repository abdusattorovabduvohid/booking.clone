"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { FlightErrorModal } from "./FlightErrorModal";
import { FaExchangeAlt, FaChevronDown, FaCalendarAlt, FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";

export function FlightSearchWidget() {
  const router = useRouter();
  const t = useTranslations("Flights");
  const locale = useLocale();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [tripType, setTripType] = useState("Round-trip");
  
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("2026-06-01");
  const [returnDate, setReturnDate] = useState("2026-06-08");
  
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [showTravelers, setShowTravelers] = useState(false);
  const [showDates, setShowDates] = useState(false);
  
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabin, setCabin] = useState("Economy");

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);
  const travelersRef = useRef<HTMLDivElement>(null);
  const datesRef = useRef<HTMLDivElement>(null);

  const popularAirports = [
    { name: "Tashkent International Airport (TAS)", code: "TAS", city: "Tashkent", ru: "Ташкент (TAS)", uz: "Toshkent (TAS)" },
    { name: "Samarkand Airport (SKD)", code: "SKD", city: "Samarkand", ru: "Самарканд (SKD)", uz: "Samarqand (SKD)" },
    { name: "Bukhara Airport (BHK)", code: "BHK", city: "Bukhara", ru: "Бухара (BHK)", uz: "Buxoro (BHK)" },
    { name: "Moscow Domodedovo Airport (DME)", code: "DME", city: "Moscow", ru: "Москва (DME)", uz: "Moskva (DME)" },
    { name: "Dubai International Airport (DXB)", code: "DXB", city: "Dubai", ru: "Дубай (DXB)", uz: "Dubay (DXB)" },
    { name: "Istanbul Airport (IST)", code: "IST", city: "Istanbul", ru: "Стамбул (IST)", uz: "Istanbul (IST)" },
    { name: "New York John F. Kennedy (JFK)", code: "JFK", city: "New York", ru: "Нью-Йорк (JFK)", uz: "Nyu-York (JFK)" },
    { name: "Seoul Incheon Airport (ICN)", code: "ICN", city: "Seoul", ru: "Сеул (ICN)", uz: "Seul (ICN)" }
  ];

  const getLocalizedAirport = (airport: typeof popularAirports[0]) => {
    if (locale === "ru") return airport.ru;
    if (locale === "uz") return airport.uz;
    return airport.name;
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowFromDropdown(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowToDropdown(false);
      }
      if (travelersRef.current && !travelersRef.current.contains(event.target as Node)) {
        setShowTravelers(false);
      }
      if (datesRef.current && !datesRef.current.contains(event.target as Node)) {
        setShowDates(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSwap = (e: React.MouseEvent) => {
    e.stopPropagation();
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = () => {
    if (!from || !to || !departDate || (tripType === "Round-trip" && !returnDate)) {
      setIsErrorModalOpen(true);
    } else {
      router.push(`/flights/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&departDate=${departDate}&returnDate=${returnDate}&adults=${adults}&children=${children}&infants=${infants}&cabin=${cabin}&tripType=${tripType}`);
    }
  };

  return (
    <div className="relative w-full z-20">
      <div className="mb-2">
        <button className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:hover:bg-gray-800 px-3 py-1.5 rounded-md text-sm font-bold transition-colors cursor-pointer border-none outline-none focus:ring-0">
          {tripType} <FaChevronDown className="ml-2 text-xs" />
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-1.5 flex flex-col lg:flex-row items-center border border-gray-200 dark:border-gray-700">
        
        <div className="flex w-full lg:w-2/5 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 relative">
          
          <div className="flex-1 px-4 py-3 relative" ref={fromRef}>
            <input 
              type="text" 
              placeholder={t("from")}
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
                setShowFromDropdown(true);
              }}
              onFocus={() => setShowFromDropdown(true)}
              className="w-full focus:outline-none text-gray-955 dark:text-white font-extrabold bg-transparent placeholder-gray-400 dark:placeholder-gray-500 border-none outline-none ring-0 p-0 text-sm md:text-base"
            />

            {showFromDropdown && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 p-4 z-50 max-h-[250px] overflow-y-auto">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 select-none">
                  {locale === "ru" ? "Аэропорт отправления" : locale === "uz" ? "Uchish aeroporti" : "Departure Airport"}
                </h4>
                <div className="space-y-1">
                  {popularAirports
                    .filter(a => 
                      a.name.toLowerCase().includes(from.toLowerCase()) ||
                      a.code.toLowerCase().includes(from.toLowerCase()) ||
                      a.city.toLowerCase().includes(from.toLowerCase())
                    )
                    .map((airport, idx) => (
                      <div 
                        key={idx}
                        onMouseDown={() => {
                          setFrom(getLocalizedAirport(airport));
                          setShowFromDropdown(false);
                        }}
                        className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      >
                        <FaPlaneDeparture className="text-gray-400 text-xs shrink-0" />
                        <div className="flex flex-col">
                          <span className="font-bold text-xs text-gray-900 dark:text-white">
                            {getLocalizedAirport(airport)}
                          </span>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}
          </div>
          
          <div 
            onClick={handleSwap}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-2 rounded-full cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md active:scale-95 transition-all"
            title="Swap locations"
          >
            <FaExchangeAlt className="text-gray-500 text-[10px]" />
          </div>

          <div className="flex-1 px-4 py-3 relative pl-8" ref={toRef}>
            <input 
              type="text" 
              placeholder={t("to")}
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
                setShowToDropdown(true);
              }}
              onFocus={() => setShowToDropdown(true)}
              className="w-full focus:outline-none text-gray-955 dark:text-white font-extrabold bg-transparent placeholder-gray-400 dark:placeholder-gray-500 border-none outline-none ring-0 p-0 text-sm md:text-base"
            />

            {showToDropdown && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 p-4 z-50 max-h-[250px] overflow-y-auto">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 select-none">
                  {locale === "ru" ? "Аэропорт назначения" : locale === "uz" ? "Qo'nish aeroporti" : "Arrival Airport"}
                </h4>
                <div className="space-y-1">
                  {popularAirports
                    .filter(a => 
                      a.name.toLowerCase().includes(to.toLowerCase()) ||
                      a.code.toLowerCase().includes(to.toLowerCase()) ||
                      a.city.toLowerCase().includes(to.toLowerCase())
                    )
                    .map((airport, idx) => (
                      <div 
                        key={idx}
                        onMouseDown={() => {
                          setTo(getLocalizedAirport(airport));
                          setShowToDropdown(false);
                        }}
                        className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      >
                        <FaPlaneArrival className="text-gray-400 text-xs shrink-0" />
                        <div className="flex flex-col">
                          <span className="font-bold text-xs text-gray-900 dark:text-white">
                            {getLocalizedAirport(airport)}
                          </span>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 w-full lg:w-auto relative border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 flex items-center px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
          <FaCalendarAlt className="text-gray-400 mr-3 text-xl animate-pulse" />
          <div className="flex flex-col w-full">
            <span className="text-[10px] text-gray-400 font-bold uppercase leading-none mb-1 select-none">{t("depart")}</span>
            <input 
              type="date"
              value={departDate}
              onChange={(e) => setDepartDate(e.target.value)}
              className="focus:outline-none text-gray-955 dark:text-white font-extrabold bg-transparent text-sm w-full cursor-pointer border-none outline-none ring-0 p-0"
            />
          </div>
        </div>

        {tripType === "Round-trip" && (
          <div className="flex-1 w-full lg:w-auto relative border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 flex items-center px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
            <FaCalendarAlt className="text-gray-400 mr-3 text-xl animate-pulse" />
            <div className="flex flex-col w-full">
              <span className="text-[10px] text-gray-400 font-bold uppercase leading-none mb-1 select-none">{t("return")}</span>
              <input 
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="focus:outline-none text-gray-955 dark:text-white font-extrabold bg-transparent text-sm w-full cursor-pointer border-none outline-none ring-0 p-0"
              />
            </div>
          </div>
        )}

        <div className="w-full lg:w-[240px] relative" ref={travelersRef}>
          <div 
            className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => setShowTravelers(!showTravelers)}
          >
            <span className="text-gray-900 dark:text-white font-bold whitespace-nowrap truncate text-sm">
              {adults + children + infants} {t("travelers")}, {t(cabin.toLowerCase().replace(" ", "_"))}
            </span>
          </div>

          {showTravelers && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6 z-50">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">{t("travelers_title")}</h3>
              
              <div className="space-y-4 mb-6 border-b border-gray-100 dark:border-gray-800 pb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{t("adults")}</div>
                    <div className="text-xs text-gray-500">18+</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:border-blue-500 disabled:opacity-50 text-gray-950 font-bold" disabled={adults <= 1}>-</button>
                    <span className="w-4 text-center font-bold text-gray-900 dark:text-white">{adults}</span>
                    <button onClick={() => setAdults(adults + 1)} className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:border-blue-500 text-gray-950 font-bold">+</button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{t("children")}</div>
                    <div className="text-xs text-gray-500">0-17</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:border-blue-500 disabled:opacity-50 text-gray-950 font-bold" disabled={children <= 0}>-</button>
                    <span className="w-4 text-center font-bold text-gray-900 dark:text-white">{children}</span>
                    <button onClick={() => setChildren(children + 1)} className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:border-blue-500 text-gray-950 font-bold">+</button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{t("infants")}</div>
                    <div className="text-xs text-gray-500">under 2</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => setInfants(Math.max(0, infants - 1))} className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:border-blue-500 disabled:opacity-50 text-gray-950 font-bold" disabled={infants <= 0}>-</button>
                    <span className="w-4 text-center font-bold text-gray-900 dark:text-white">{infants}</span>
                    <button onClick={() => setInfants(infants + 1)} className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:border-blue-500 text-gray-950 font-bold">+</button>
                  </div>
                </div>
              </div>

              <h3 className="font-bold text-gray-900 dark:text-white mb-4">{t("cabin_class")}</h3>
              <div className="flex flex-wrap gap-2">
                {["Economy", "Premium Economy", "Business", "First"].map((c) => (
                  <button 
                    key={c}
                    onClick={() => setCabin(c)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${cabin === c ? 'border-gray-900 text-gray-900 dark:border-white dark:text-white bg-gray-50 dark:bg-gray-800' : 'border-gray-200 text-gray-600 hover:border-gray-400 dark:border-gray-700 dark:text-gray-400'}`}
                  >
                    {t(c.toLowerCase().replace(" ", "_"))}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-1 w-full lg:w-auto">
          <Button 
            onClick={handleSearch}
            className="w-full bg-[#006ce4] hover:bg-[#0057b8] text-white px-8 py-2.5 rounded-md font-bold text-base shadow-none transition-all duration-200 transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          >
            {t("search")}
          </Button>
        </div>

      </div>

      <FlightErrorModal isOpen={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)} />
    </div>
  );
}
