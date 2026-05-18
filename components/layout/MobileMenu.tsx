"use client";

import { useState } from "react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { FaBed, FaPlane, FaCar, FaMapMarkerAlt, FaTaxi, FaSun, FaMoon, FaGlobe, FaChevronRight } from "react-icons/fa";
import { signOut } from "next-auth/react";

interface MobileMenuProps {
  session: any;
  tNavbar: {
    list_property: string;
    genius_level: string;
    sign_out: string;
    register: string;
    sign_in: string;
  };
  tStays: string;
  tFlights: string;
  tCarRentals: string;
  tAttractions: string;
  tAirportTaxis: string;
}

export function MobileMenu({
  session,
  tNavbar,
  tStays,
  tFlights,
  tCarRentals,
  tAttractions,
  tAirportTaxis,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const { theme, setTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const tabs = [
    { href: "/", label: tStays, icon: FaBed },
    { href: "/flights", label: tFlights, icon: FaPlane },
    { href: "/car-rentals", label: tCarRentals, icon: FaCar },
    { href: "/attractions", label: tAttractions, icon: FaMapMarkerAlt },
    { href: "/airport-taxis", label: tAirportTaxis, icon: FaTaxi },
  ];

  const getFlag = (l: string) => {
    switch (l) {
      case "en": return "https://flagcdn.com/w20/us.png";
      case "ru": return "https://flagcdn.com/w20/ru.png";
      case "uz": return "https://flagcdn.com/w20/uz.png";
      default: return "https://flagcdn.com/w20/us.png";
    }
  };

  const getLanguageName = (l: string) => {
    if (l === "uz") return "O'zbekcha";
    if (l === "ru") return "Русский";
    return "English";
  };

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "ru" : locale === "ru" ? "uz" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="md:hidden flex items-center z-[9999]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-[10000] relative cursor-pointer"
        aria-label="Toggle Menu"
      >
        <span 
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? "transform rotate-45 translate-y-2 bg-gray-900 dark:bg-white" : ""
          }`} 
        />
        <span 
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`} 
        />
        <span 
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? "transform -rotate-45 -translate-y-2 bg-gray-900 dark:bg-white" : ""
          }`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/55 backdrop-blur-xs z-[9998]"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-[310px] bg-white dark:bg-gray-900 shadow-2xl z-[9999] flex flex-col overflow-hidden text-gray-950 dark:text-white"
            >
              <div className="bg-gradient-to-br from-[#003580] to-[#001d4a] text-white pt-16 pb-6 px-6 relative select-none">
                {session?.user ? (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#febb02] flex items-center justify-center text-[#003B95] font-black text-lg shadow-md shrink-0">
                      {session.user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-extrabold text-base truncate leading-tight">{session.user.name}</span>
                      <span className="text-[10px] text-[#febb02] font-black mt-1 uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded-full w-max">
                        {tNavbar.genius_level}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <h3 className="font-black text-lg tracking-tight">Booking.com Clone</h3>
                    <div className="flex gap-2 mt-2">
                      <Link href="/login" onClick={() => setIsOpen(false)} className="flex-1">
                        <button className="w-full font-bold text-[#003580] bg-white hover:bg-gray-100 py-2 px-3 rounded text-xs transition duration-150 active:scale-95 cursor-pointer">
                          {tNavbar.sign_in}
                        </button>
                      </Link>
                      <Link href="/register" onClick={() => setIsOpen(false)} className="flex-1">
                        <button className="w-full font-bold text-white bg-transparent border border-white/50 hover:bg-white/10 py-2 px-3 rounded text-xs transition duration-150 active:scale-95 cursor-pointer">
                          {tNavbar.register}
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-3">
                  {locale === "ru" ? "Навигация" : locale === "uz" ? "Navigatsiya" : "Navigation"}
                </h4>
                {tabs.map((tab, idx) => {
                  const Icon = tab.icon;
                  const isActive =
                    tab.href === "/"
                      ? pathname === "/" || pathname === ""
                      : pathname.startsWith(tab.href);

                  return (
                    <Link
                      key={idx}
                      href={tab.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-3 py-3 rounded-lg transition duration-200 cursor-pointer ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-extrabold"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="text-lg shrink-0" />
                        <span className="text-sm">{tab.label}</span>
                      </div>
                      <FaChevronRight className="text-[9px] text-gray-300 dark:text-gray-600" />
                    </Link>
                  );
                })}

                <div className="h-px bg-gray-100 dark:bg-gray-800 my-6" />

                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-3">
                  {locale === "ru" ? "Настройки" : locale === "uz" ? "Sozlamalar" : "Settings"}
                </h4>
                
                <button
                  onClick={toggleLanguage}
                  className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <FaGlobe className="text-gray-400 shrink-0 text-base" />
                    <span className="text-sm font-medium">
                      {locale === "ru" ? "Язык" : locale === "uz" ? "Til" : "Language"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-bold">{getLanguageName(locale)}</span>
                    <img src={getFlag(locale)} alt={locale} className="h-4 w-4 rounded-full object-cover shadow-sm border border-gray-100" />
                  </div>
                </button>

                <button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {isDark ? (
                      <FaSun className="text-amber-500 shrink-0 text-base" />
                    ) : (
                      <FaMoon className="text-blue-500 shrink-0 text-base" />
                    )}
                    <span className="text-sm font-medium">
                      {locale === "ru" ? "Темный режим" : locale === "uz" ? "Tungi rejim" : "Dark Mode"}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 font-bold uppercase">
                    {isDark ? (locale === "ru" ? "Вкл" : locale === "uz" ? "Yoq" : "On") : (locale === "ru" ? "Выкл" : locale === "uz" ? "Och" : "Off")}
                  </span>
                </button>

                <div className="pt-2 px-3">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      alert(locale === "uz" ? "O'z ob'ektingizni ro'yxatdan o'tkazish sahifasi tez kunda!" : locale === "ru" ? "Страница регистрации вашего объекта скоро появится!" : "Property listing page coming soon!");
                    }}
                    className="w-full font-bold text-xs text-center text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40 py-2.5 rounded-lg hover:bg-blue-100 transition active:scale-[0.98] cursor-pointer"
                  >
                    {tNavbar.list_property}
                  </button>
                </div>
              </div>

              {session?.user && (
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex flex-col gap-2 select-none shrink-0">
                  <button
                    onClick={async () => {
                      setIsOpen(false);
                      await signOut();
                    }}
                    className="w-full py-2.5 bg-red-650 hover:bg-red-750 text-white font-bold rounded-lg text-xs transition duration-150 active:scale-95 cursor-pointer shadow-md text-center"
                  >
                    {tNavbar.sign_out}
                  </button>
                </div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
