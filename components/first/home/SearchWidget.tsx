"use client";

import { useState, useEffect, useRef } from "react";
import { FaBed, FaCalendarAlt, FaUser, FaHistory, FaMapMarkerAlt, FaPlus, FaMinus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  setDestination,
  setCheckIn,
  setCheckOut,
  setAdults,
  setChildren,
  setRooms,
} from "@/store/searchSlice";
import { format, addDays, isAfter, isBefore, isSameDay, addMonths, subMonths, eachDayOfInterval, startOfMonth, endOfMonth, getDay, startOfToday } from "date-fns";
import { ru, enUS } from "date-fns/locale";
import { useTranslations, useLocale } from "next-intl";
import { searchAutocomplete, Hotel } from "@/lib/api/hotels";
import { useRouter } from "@/i18n/routing";
import { AnimatePresence, motion } from "framer-motion";

export function SearchWidget() {
  const t = useTranslations("Index");
  const locale = useLocale();
  const dispatch = useDispatch();
  const router = useRouter();
  const searchState = useSelector((state: RootState) => state.search);

  const [query, setQuery] = useState(searchState.destination);
  const [results, setResults] = useState<Hotel[]>([]);
  
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);

  const [currentMonthLeft, setCurrentMonthLeft] = useState(new Date());
  const [calendarTab, setCalendarTab] = useState<"calendar" | "flexible">("calendar");
  const [activeDatePill, setActiveDatePill] = useState("exact"); // exact, 1, 2, 3, 7

  const [travelWithPets, setTravelWithPets] = useState(false);

  const widgetRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);

  const defaultRecent = [
    {
      id: 51,
      name: "Toronto 🇨🇦",
      city: "Торонто",
      location: "Торонто, Канада 🇨🇦",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80",
      rating: 9.4,
      reviews: 4325,
      ratingLabel: locale === "uz" ? "Ajoyib" : locale === "ru" ? "Великолепно" : "Exceptional"
    },
    {
      id: 1,
      name: "Tashkent 🇺🇿",
      city: "Ташкент",
      location: "Ташкент, Узбекистан 🇺🇿",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=200&q=80",
      rating: 9.3,
      reviews: 1408,
      ratingLabel: locale === "uz" ? "Ajoyib" : locale === "ru" ? "Превосходно" : "Exceptional"
    },
    {
      id: 154,
      name: "Dubai 🇦🇪",
      city: "Дубай",
      location: "Дубай, ОАЭ 🇦🇪",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=200&q=80",
      rating: 8.7,
      reviews: 28003,
      ratingLabel: locale === "uz" ? "Juda yaxshi" : locale === "ru" ? "Потрясающе" : "Very Good"
    }
  ];

  useEffect(() => {
    setQuery(searchState.destination);
  }, [searchState.destination]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      const data = await searchAutocomplete(query);
      setResults(data);
    };

    const timer = setTimeout(fetchResults, 200);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setIsDestOpen(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
      if (guestRef.current && !guestRef.current.contains(event.target as Node)) {
        setIsGuestPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLocaleObj = locale === "ru" ? ru : enUS;

  const formatDates = () => {
    try {
      const checkIn = new Date(searchState.checkIn);
      const checkOut = new Date(searchState.checkOut);
      return `${format(checkIn, "d MMMM", { locale: activeLocaleObj })} — ${format(checkOut, "d MMMM", { locale: activeLocaleObj })}`;
    } catch (e) {
      return locale === "uz" ? "Sanalarni tanlang" : locale === "ru" ? "Выберите даты" : "Select dates";
    }
  };

  const formatGuests = () => {
    const { adults, children, rooms } = searchState;
    if (locale === "uz") {
      return `${adults} ta katta · ${children} ta bola · ${rooms} ta xona`;
    }
    if (locale === "ru") {
      return `${adults} взрослых · ${children} детей · ${rooms} номер`;
    }
    return `${adults} adults · ${children} children · ${rooms} room`;
  };

  const handleSelectDest = (dest: string) => {
    dispatch(setDestination(dest));
    setQuery(dest);
    setIsDestOpen(false);
    setIsDatePickerOpen(true); // Auto focus date picker on city selection
  };

  const handleSearch = () => {
    router.push(`/search?destination=${encodeURIComponent(query)}`);
  };

  const checkInDate = new Date(searchState.checkIn);
  const checkOutDate = new Date(searchState.checkOut);
  const today = startOfToday();

  const handleDateClick = (day: Date) => {
    if (isBefore(day, today)) return;

    if (!searchState.checkIn || isSameDay(checkInDate, checkOutDate)) {
      dispatch(setCheckIn(day.toISOString()));
      dispatch(setCheckOut(addDays(day, 1).toISOString()));
    } else if (isSameDay(day, checkInDate)) {
    } else if (isBefore(day, checkInDate)) {
      dispatch(setCheckIn(day.toISOString()));
      dispatch(setCheckOut(addDays(day, 1).toISOString()));
    } else {
      dispatch(setCheckOut(day.toISOString()));
      setIsDatePickerOpen(false); // Close calendar after select
      setIsGuestPickerOpen(true); // Auto focus guest count adjusters
    }
  };

  const isSelected = (day: Date) => isSameDay(day, checkInDate) || isSameDay(day, checkOutDate);
  const isInRange = (day: Date) => isAfter(day, checkInDate) && isBefore(day, checkOutDate);

  const renderMonthGrid = (monthDate: Date) => {
    const start = startOfMonth(monthDate);
    const end = endOfMonth(monthDate);
    const days = eachDayOfInterval({ start, end });
    const startWeekday = getDay(start); // 0 = Sunday, 1 = Monday etc.
    
    const offset = Array(startWeekday === 0 ? 6 : startWeekday - 1).fill(null);

    const weekDaysRu = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
    const weekDaysUz = ["du", "se", "cho", "pay", "ju", "sha", "yak"];
    const weekDaysEn = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    const weekDaysHeader = locale === "uz" ? weekDaysUz : locale === "ru" ? weekDaysRu : weekDaysEn;

    return (
      <div className="flex flex-col">
        <h4 className="text-center font-extrabold text-gray-900 dark:text-white mb-4 text-sm capitalize">
          {format(monthDate, "LLLL yyyy", { locale: activeLocaleObj })}
        </h4>
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400 mb-2">
          {weekDaysHeader.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1 gap-x-1 select-none">
          {offset.map((_, i) => <div key={`offset-${i}`} />)}
          {days.map((day) => {
            const selected = isSelected(day);
            const inRange = isInRange(day);
            const past = isBefore(day, today);
            const isStart = isSameDay(day, checkInDate);
            const isEnd = isSameDay(day, checkOutDate);

            return (
              <div
                key={day.toISOString()}
                onClick={() => !past && handleDateClick(day)}
                className={`
                  h-9 w-9 flex items-center justify-center text-xs font-bold transition relative select-none
                  ${past ? "text-gray-300 dark:text-gray-700 cursor-not-allowed" : "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"}
                  ${isStart ? "rounded-l-full bg-[#006ce4] text-white z-10 shadow-sm" : ""}
                  ${isEnd ? "rounded-r-full bg-[#006ce4] text-white z-10 shadow-sm" : ""}
                  ${inRange ? "bg-[#f0f6ff] dark:bg-blue-950/40 text-[#006ce4] dark:text-blue-400 rounded-none" : ""}
                `}
              >
                {format(day, "d")}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#febb02] p-1.5 rounded-lg shadow-xl w-full max-w-7xl relative select-none" ref={widgetRef}>
      <div className="flex flex-col lg:flex-row gap-1">
        
        {/* 1. Destination Input */}
        <div className="flex-1 flex items-center bg-white dark:bg-gray-900 px-4 py-3.5 rounded-sm relative" ref={destRef}>
          <FaBed className="text-gray-400 dark:text-gray-500 mr-3 text-xl" />
          <input 
            type="text" 
            placeholder={locale === "uz" ? "Qayerga bormoqchisiz?" : locale === "ru" ? "Куда вы хотите поехать?" : "Where are you going?"} 
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsDestOpen(true);
            }}
            onFocus={() => {
              setIsDestOpen(true);
              setIsDatePickerOpen(false);
              setIsGuestPickerOpen(false);
            }}
            className="w-full focus:outline-none text-gray-900 dark:text-white font-bold placeholder-gray-500 bg-transparent cursor-text text-sm"
          />

          {/* Autocomplete Dropdown */}
          <AnimatePresence>
            {isDestOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-800 z-[100] max-h-[450px] overflow-y-auto p-4"
              >
                {query.trim() === "" ? (
                  <div>
                    <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider mb-3 flex items-center">
                      <FaHistory className="mr-2 text-gray-400" />
                      {locale === "uz" ? "Oxirgi qidiruvlar" : locale === "ru" ? "Недавние поиски" : "Recent searches"}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {defaultRecent.map((h) => (
                        <div 
                          key={h.id}
                          onClick={() => handleSelectDest(h.name)}
                          className="cursor-pointer border border-gray-150 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-md transition duration-200 bg-gray-50/70 dark:bg-gray-800/50 p-2 flex flex-row items-center gap-3 active:scale-[0.98]"
                        >
                          <img src={h.image} className="w-12 h-12 rounded-md object-cover flex-shrink-0" alt={h.name} />
                          <div className="flex-1 min-w-0">
                            <div className="font-extrabold text-xs text-gray-900 dark:text-white truncate">{h.name}</div>
                            <div className="text-[10px] text-gray-500 truncate">{h.location}</div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="bg-blue-600 text-white text-[9px] font-bold px-1 py-0.5 rounded">{h.rating}</span>
                              <span className="text-[9px] text-gray-600 dark:text-gray-400 font-bold">{h.ratingLabel}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {results.length === 0 ? (
                      <div className="text-gray-500 text-sm py-3 px-3 font-semibold text-center">
                        {locale === "uz" ? "Hech narsa topilmadi" : locale === "ru" ? "Ничего не найдено" : "No results found"}
                      </div>
                    ) : (
                      results.map((h) => (
                        <div 
                          key={h.id}
                          onClick={() => handleSelectDest(h.name)}
                          className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition duration-150 active:scale-[0.995]"
                        >
                          <FaMapMarkerAlt className="text-gray-400 dark:text-gray-500 flex-shrink-0 text-lg" />
                          <div className="min-w-0">
                            <div className="font-extrabold text-sm text-gray-900 dark:text-white flex items-center gap-1">
                              {h.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{h.location}</div>
                          </div>
                          <div className="ml-auto bg-blue-50 dark:bg-blue-950/30 px-2 py-1 rounded text-xs font-bold text-blue-600 dark:text-blue-400">
                            {h.badge || `${h.rating} Rating`}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
 
        {/* 2. Dates Input */}
        <div 
          className="flex-1 flex items-center bg-white dark:bg-gray-900 px-4 py-3.5 rounded-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition select-none relative" 
          ref={dateRef}
          onClick={() => {
            setIsDatePickerOpen(!isDatePickerOpen);
            setIsDestOpen(false);
            setIsGuestPickerOpen(false);
          }}
        >
          <FaCalendarAlt className="text-gray-400 dark:text-gray-500 mr-3 text-xl" />
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 dark:text-gray-500 font-extrabold uppercase">
              {locale === "uz" ? "Kelish / Ketish sanalari" : locale === "ru" ? "Даты заезда / отъезда" : "Check-in / Check-out"}
            </span>
            <span className="text-gray-900 dark:text-white font-bold text-xs whitespace-nowrap mt-0.5">
              {formatDates()}
            </span>
          </div>

          {/* 1:1 Calendar Popover styling */}
          <AnimatePresence>
            {isDatePickerOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.15 }}
                onClick={(e) => e.stopPropagation()} 
                className="absolute top-full left-0 md:left-auto right-0 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-800 z-[100] p-6 w-full max-w-[680px]"
              >
                {/* 1. Month Picker Top Tab Switchers */}
                <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6">
                  <button
                    onClick={() => setCalendarTab("calendar")}
                    className={`flex-1 pb-3 pt-1 px-4 text-center font-extrabold text-xs md:text-sm transition-all cursor-pointer ${
                      calendarTab === "calendar"
                        ? "text-[#006ce4] border-b-2 border-[#006ce4]"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900"
                    }`}
                  >
                    {locale === "uz" ? "Kalendar" : locale === "ru" ? "Календарь" : "Calendar"}
                  </button>
                  <button
                    onClick={() => setCalendarTab("flexible")}
                    className={`flex-1 pb-3 pt-1 px-4 text-center font-extrabold text-xs md:text-sm transition-all cursor-pointer ${
                      calendarTab === "flexible"
                        ? "text-[#006ce4] border-b-2 border-[#006ce4]"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900"
                    }`}
                  >
                    {locale === "uz" ? "Moslashuvchan rejalar" : locale === "ru" ? "У меня гибкие планы" : "I have flexible plans"}
                  </button>
                </div>

                {calendarTab === "calendar" ? (
                  <>
                    {/* Month header pagination */}
                    <div className="flex items-center justify-between mb-4">
                      <button 
                        onClick={() => setCurrentMonthLeft(subMonths(currentMonthLeft, 1))}
                        className="p-2 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full cursor-pointer transition active:scale-90"
                      >
                        <FaChevronLeft className="text-gray-600 dark:text-gray-400 text-xs" />
                      </button>
                      <span className="font-extrabold text-xs text-gray-500 uppercase tracking-widest">
                        {locale === "uz" ? "Sanalarni tanlang" : locale === "ru" ? "Выберите даты поездки" : "Choose dates"}
                      </span>
                      <button 
                        onClick={() => setCurrentMonthLeft(addMonths(currentMonthLeft, 1))}
                        className="p-2 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full cursor-pointer transition active:scale-90"
                      >
                        <FaChevronRight className="text-gray-600 dark:text-gray-400 text-xs" />
                      </button>
                    </div>

                    {/* Twin grid layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {renderMonthGrid(currentMonthLeft)}
                      {renderMonthGrid(addMonths(currentMonthLeft, 1))}
                    </div>

                    {/* Bottom Flex Date Pill Switchers */}
                    <div className="border-t border-gray-100 dark:border-gray-800 mt-6 pt-4 flex gap-2 overflow-x-auto no-scrollbar pb-1">
                      {[
                        { id: "exact", labelRu: "Точные даты", labelUz: "Aniq sanalar", labelEn: "Exact dates" },
                        { id: "1", labelRu: "± 1 день", labelUz: "± 1 kun", labelEn: "± 1 day" },
                        { id: "2", labelRu: "± 2 дня", labelUz: "± 2 kun", labelEn: "± 2 days" },
                        { id: "3", labelRu: "± 3 дня", labelUz: "± 3 kun", labelEn: "± 3 days" },
                        { id: "7", labelRu: "± 7 дней", labelUz: "± 7 kun", labelEn: "± 7 days" }
                      ].map((pill) => {
                        const label = locale === "uz" ? pill.labelUz : locale === "ru" ? pill.labelRu : pill.labelEn;
                        const isSelected = activeDatePill === pill.id;

                        return (
                          <button
                            key={pill.id}
                            onClick={() => setActiveDatePill(pill.id)}
                            className={`whitespace-nowrap px-4 py-2 rounded-full border text-xs font-bold transition duration-150 cursor-pointer ${
                              isSelected
                                ? "border-[#006ce4] text-[#006ce4] bg-[#f0f6ff]"
                                : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="py-8 text-center text-gray-500 font-bold text-sm">
                    {locale === "uz" ? "Moslashuvchan rejalar hozircha mavjud emas." : locale === "ru" ? "Гибкие планы пока недоступны." : "Flexible plans are not available yet."}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. Guests & Rooms Input */}
        <div 
          className="flex-1 flex items-center bg-white dark:bg-gray-900 px-4 py-3.5 rounded-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition select-none relative" 
          ref={guestRef}
          onClick={() => {
            setIsGuestPickerOpen(!isGuestPickerOpen);
            setIsDestOpen(false);
            setIsDatePickerOpen(false);
          }}
        >
          <FaUser className="text-gray-400 dark:text-gray-500 mr-3 text-xl" />
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 dark:text-gray-500 font-extrabold uppercase">
              {locale === "uz" ? "Mehmonlar va xonalar" : locale === "ru" ? "Гости и номера" : "Guests & Rooms"}
            </span>
            <span className="text-gray-900 dark:text-white font-bold text-xs whitespace-nowrap mt-0.5">
              {formatGuests()}
            </span>
          </div>

          {/* Guest selector dropdown popover */}
          <AnimatePresence>
            {isGuestPickerOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.15 }}
                onClick={(e) => e.stopPropagation()} 
                className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-800 z-[100] p-5 w-80 space-y-4"
              >
                {/* Adults Row */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-extrabold text-sm text-gray-950 dark:text-white">
                      {locale === "uz" ? "Kattalar" : locale === "ru" ? "Взрослые" : "Adults"}
                    </span>
                    <span className="text-[10px] text-gray-400 font-semibold mt-0.5">
                      {locale === "uz" ? "18 yosh va undan katta" : locale === "ru" ? "18 лет и старше" : "18 years and older"}
                    </span>
                  </div>
                  {/* Outlined counter box matching screenshot */}
                  <div className="border border-gray-400 dark:border-gray-600 rounded flex items-center h-10 w-28 justify-between px-2.5">
                    <button
                      onClick={() => dispatch(setAdults(searchState.adults - 1))}
                      disabled={searchState.adults <= 1}
                      className="text-gray-500 hover:text-blue-600 font-medium text-lg flex items-center justify-center cursor-pointer select-none disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <FaMinus className="text-[10px]" />
                    </button>
                    <span className="font-extrabold text-sm text-gray-950 dark:text-white w-8 text-center">{searchState.adults}</span>
                    <button
                      onClick={() => dispatch(setAdults(searchState.adults + 1))}
                      className="text-gray-500 hover:text-blue-600 font-medium text-lg flex items-center justify-center cursor-pointer select-none"
                    >
                      <FaPlus className="text-[10px]" />
                    </button>
                  </div>
                </div>

                {/* Children Row */}
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-3.5">
                  <div className="flex flex-col">
                    <span className="font-extrabold text-sm text-gray-950 dark:text-white">
                      {locale === "uz" ? "Bolalar" : locale === "ru" ? "Дети" : "Children"}
                    </span>
                    <span className="text-[10px] text-gray-400 font-semibold mt-0.5">
                      {locale === "uz" ? "0 yoshdan 17 yoshgacha" : locale === "ru" ? "От 0 до 17 лет" : "0 to 17 years"}
                    </span>
                  </div>
                  {/* Outlined counter box */}
                  <div className="border border-gray-400 dark:border-gray-600 rounded flex items-center h-10 w-28 justify-between px-2.5">
                    <button
                      onClick={() => dispatch(setChildren(searchState.children - 1))}
                      disabled={searchState.children <= 0}
                      className="text-gray-500 hover:text-blue-600 font-medium text-lg flex items-center justify-center cursor-pointer select-none disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <FaMinus className="text-[10px]" />
                    </button>
                    <span className="font-extrabold text-sm text-gray-950 dark:text-white w-8 text-center">{searchState.children}</span>
                    <button
                      onClick={() => dispatch(setChildren(searchState.children + 1))}
                      className="text-gray-500 hover:text-blue-600 font-medium text-lg flex items-center justify-center cursor-pointer select-none"
                    >
                      <FaPlus className="text-[10px]" />
                    </button>
                  </div>
                </div>

                {/* Rooms Row */}
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-3.5">
                  <div className="flex flex-col">
                    <span className="font-extrabold text-sm text-gray-950 dark:text-white">
                      {locale === "uz" ? "Xonalar" : locale === "ru" ? "Номера" : "Rooms"}
                    </span>
                    <span className="text-[10px] text-gray-400 font-semibold mt-0.5">
                      {locale === "uz" ? "Xonalar soni" : locale === "ru" ? "Количество комнат" : "Number of rooms"}
                    </span>
                  </div>
                  {/* Outlined counter box */}
                  <div className="border border-gray-400 dark:border-gray-600 rounded flex items-center h-10 w-28 justify-between px-2.5">
                    <button
                      onClick={() => dispatch(setRooms(searchState.rooms - 1))}
                      disabled={searchState.rooms <= 1}
                      className="text-gray-500 hover:text-blue-600 font-medium text-lg flex items-center justify-center cursor-pointer select-none disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <FaMinus className="text-[10px]" />
                    </button>
                    <span className="font-extrabold text-sm text-gray-950 dark:text-white w-8 text-center">{searchState.rooms}</span>
                    <button
                      onClick={() => dispatch(setRooms(searchState.rooms + 1))}
                      className="text-gray-500 hover:text-blue-600 font-medium text-lg flex items-center justify-center cursor-pointer select-none"
                    >
                      <FaPlus className="text-[10px]" />
                    </button>
                  </div>
                </div>

                {/* Animal Toggle Row matching screenshot 2 perfectly */}
                <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-gray-900 dark:text-white">
                      {locale === "uz" ? "Hayvonlar bilan sayohat qilyapsizmi?" : locale === "ru" ? "Вы путешествуете с животными?" : "Are you traveling with pets?"}
                    </span>
                    {/* Dynamic Switch Toggle Switch */}
                    <button
                      onClick={() => setTravelWithPets(!travelWithPets)}
                      className={`w-11 h-6 rounded-full transition-colors duration-200 relative focus:outline-none flex-shrink-0 cursor-pointer ${
                        travelWithPets ? "bg-[#006ce4]" : "bg-gray-300 dark:bg-gray-700"
                      }`}
                    >
                      <span
                        className={`absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                          travelWithPets ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                  {/* Service Animals text */}
                  <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">
                    {locale === "uz" 
                      ? "Yordamchi hayvonlar hisobga olinmaydi. " 
                      : locale === "ru" 
                        ? "Животные-помощники не считаются. " 
                        : "Service animals don't count. "
                    }
                    <span className="text-[#006ce4] cursor-pointer hover:underline">
                      {locale === "uz" ? "Batafsil ma'lumot" : locale === "ru" ? "Подробнее о путешествиях" : "More details"}
                    </span>
                  </p>
                </div>

                {/* Done/Close Button styled as outlined blue */}
                <button
                  onClick={() => setIsGuestPickerOpen(false)}
                  className="w-full mt-4 bg-white dark:bg-gray-800 border border-[#006ce4] text-[#006ce4] hover:bg-blue-50/50 text-xs font-black py-2.5 rounded transition cursor-pointer select-none text-center"
                >
                  {locale === "uz" ? "Tayyor" : locale === "ru" ? "Готово" : "Done"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 4. Search Button */}
        <Button 
          onClick={handleSearch}
          className="bg-[#006ce4] hover:bg-[#005999] text-white text-base font-extrabold px-10 py-4 lg:w-auto w-full rounded-sm cursor-pointer select-none transition duration-150 active:scale-95 shadow-md flex items-center justify-center gap-1.5"
        >
          {locale === "uz" ? "Qidirish" : locale === "ru" ? "Найти" : "Search"}
        </Button>

      </div>
    </div>
  );
}
