"use client";

import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";

interface HomePreFooterProps {
  sessionUsername?: string | null;
}

type TabType = "domestic" | "international" | "countries" | "stays";

export function HomePreFooter({ sessionUsername }: HomePreFooterProps) {
  const t = useTranslations("PreFooter");
  const [activeTab, setActiveTab] = useState<TabType>("domestic");
  const [userName, setUserName] = useState<string | null>(sessionUsername || null);

  useEffect(() => {
    if (sessionUsername) {
      setUserName(sessionUsername);
    }
  }, [sessionUsername]);

  const displayName = userName || "traveler";

  const tabLinks = useMemo(() => {
    return {
      domestic: [
        { name: "Samarkand", key: "hotel_in_city", translateKey: "Самарканд" },
        { name: "Chorwoq", key: "hotel_in_city", translateKey: "Chorwoq" },
        { name: "Nukus", key: "hotel_in_city", translateKey: "Нукус" },
        { name: "Tashkent", key: "hotel_in_city", translateKey: "Ташкент" },
        { name: "Bukhara", key: "hotel_in_city", translateKey: "Бухара" },
        { name: "Chilanzar", key: "hotel_in_city", translateKey: "Chilanzar" },
        { name: "Khiva", key: "hotel_in_city", translateKey: "Хива" },
        { name: "Fergana", key: "hotel_in_city", translateKey: "Фергана" },
        { name: "Kokand", key: "hotel_in_city", translateKey: "Коканд" },
        { name: "Urgench", key: "hotel_in_city", translateKey: "Ургенч" },
      ],
      international: [
        { name: "Istanbul", key: "hotel_in_city", translateKey: "Стамбул" },
        { name: "Dubai", key: "hotel_in_city", translateKey: "Дубай" },
        { name: "Moscow", key: "hotel_in_city", translateKey: "Москва" },
        { name: "Antalya", key: "hotel_in_city", translateKey: "Анталья" },
        { name: "New York", key: "hotel_in_city", translateKey: "Нью-Йорк" },
        { name: "Paris", key: "hotel_in_city", translateKey: "Париж" },
        { name: "London", key: "hotel_in_city", translateKey: "Лондон" },
        { name: "Tokyo", key: "hotel_in_city", translateKey: "Токио" },
        { name: "Rome", key: "hotel_in_city", translateKey: "Рим" },
        { name: "Almaty", key: "hotel_in_city", translateKey: "Алматы" },
      ],
      countries: [
        { name: "Uzbekistan", key: "hotel_in_country", translateKey: "Узбекистан" },
        { name: "Turkey", key: "hotel_in_country", translateKey: "Турция" },
        { name: "UAE", key: "hotel_in_country", translateKey: "ОАЭ" },
        { name: "Russia", key: "hotel_in_country", translateKey: "Россия" },
        { name: "Kazakhstan", key: "hotel_in_country", translateKey: "Казахстан" },
        { name: "USA", key: "hotel_in_country", translateKey: "США" },
        { name: "France", key: "hotel_in_country", translateKey: "Франция" },
        { name: "Italy", key: "hotel_in_country", translateKey: "Италия" },
        { name: "Egypt", key: "hotel_in_country", translateKey: "Египет" },
        { name: "Spain", key: "hotel_in_country", translateKey: "Испания" },
      ],
      stays: [
        { name: "Tashkent", key: "apartment_in_city", translateKey: "Ташкент" },
        { name: "Samarkand", key: "hostel_in_city", translateKey: "Самарканд" },
        { name: "Chorwoq", key: "villa_in_city", translateKey: "Chorwoq" },
        { name: "Bukhara", key: "guest_house_in_city", translateKey: "Бухара" },
        { name: "Nukus", key: "resort_in_city", translateKey: "Нукус" },
        { name: "Chilanzar", key: "flat_in_city", translateKey: "Chilanzar" },
        { name: "Khiva", key: "hotel_in_city", translateKey: "Хива" },
        { name: "Fergana", key: "guest_house_in_city", translateKey: "Фергана" },
        { name: "Tashkent", key: "hostel_in_city", translateKey: "Ташкент" },
        { name: "Tashkent", key: "villa_in_city", translateKey: "Ташкент" },
      ],
    };
  }, []);

  const activeLinks = tabLinks[activeTab];

  return (
    <div className="mt-14 w-full">
      <div className="mb-12">
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {t("genius_title")}
          </h2>
          <a href="#" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            {t("genius_sub")}
          </a>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          <div className="snap-start shrink-0 w-[280px] sm:w-[320px] bg-[#003580] text-white p-5 rounded-lg flex flex-col justify-between h-[170px] shadow-sm transform hover:translate-y-[-1px] transition duration-200">
            <div>
              <span className="text-lg font-black tracking-tight">Genius</span>
              <p className="text-xs text-blue-100 font-semibold mt-2 leading-relaxed">
                {t("genius_active_card", { username: displayName })}
              </p>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-300">Active Status</span>
          </div>

          <div className="snap-start shrink-0 w-[280px] sm:w-[320px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-lg flex flex-col justify-between h-[170px] shadow-sm transform hover:translate-y-[-1px] transition duration-200">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-sm font-bold text-gray-900 dark:text-white">{t("genius_discount_1")}</span>
                <span className="text-blue-600 dark:text-blue-400 text-lg">%</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-2 leading-relaxed">
                {t("genius_discount_1_desc")}
              </p>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Level 1 Benefit</span>
          </div>

          <div className="snap-start shrink-0 w-[280px] sm:w-[320px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-lg flex flex-col justify-between h-[170px] shadow-sm transform hover:translate-y-[-1px] transition duration-200">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-sm font-bold text-gray-900 dark:text-white">{t("genius_discount_2")}</span>
                <span className="text-blue-600 dark:text-blue-400 text-lg">🚗</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-2 leading-relaxed">
                {t("genius_discount_2_desc")}
              </p>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Level 1 Benefit</span>
          </div>

          <div className="snap-start shrink-0 w-[280px] sm:w-[320px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-lg flex flex-col justify-between h-[170px] shadow-sm transform hover:translate-y-[-1px] transition duration-200">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-sm font-bold text-gray-900 dark:text-white">{t("genius_discount_3")}</span>
                <span className="text-blue-600 dark:text-blue-400 text-lg">🔒</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-2 leading-relaxed">
                {t("genius_discount_3_desc")}
              </p>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Next Unlock</span>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
          {t("popular_title")}
        </h2>

        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 border-b border-gray-100 dark:border-gray-800 pb-2">
          {(["domestic", "international", "countries", "stays"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 transform active:scale-95 cursor-pointer border ${
                activeTab === tab
                  ? "bg-blue-50 border-[#0071c2] text-[#0071c2] dark:bg-gray-800 dark:border-blue-400 dark:text-blue-400 shadow-sm"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900"
              }`}
            >
              {t(`tab_${tab}`)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-3 mb-10 transition-all duration-300">
          {activeLinks.map((link, idx) => (
            <a
              key={idx}
              href="#"
              className="text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors block leading-relaxed"
            >
              {t(link.key, { name: link.translateKey })}
            </a>
          ))}
        </div>

        <div className="text-[11px] text-gray-400 dark:text-gray-500 font-bold leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-6 select-none space-x-1.5">
          {[
            "Страны",
            "Регионы",
            "Города",
            "Районы",
            "Аэропорты",
            "Отели",
            "Ориентиры",
            "Дома для отпуска",
            "Апартаменты/квартиры",
            "Курортные отели",
            "Виллы",
            "Хостелы",
            "Отели типа «постель и завтрак»",
            "Гостевые дома",
            "Уникальное жилье",
            "Все направления",
            "Авиабилеты: все направления",
            "Все пункты проката",
            "Все направления для отпуска",
            "Советы",
            "Идеи для поездки",
            "Жилье на месяц",
          ].map((item, i, arr) => (
            <span key={item} className="inline-block hover:text-blue-500 cursor-pointer">
              {item}
              {i < arr.length - 1 && <span className="mx-2 text-gray-300 dark:text-gray-700">•</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
