"use client";

import { useState, useRef, useEffect } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderActionsClientProps {
  listPropertyLabel: string;
  locale: string;
}

export function HeaderActionsClient({
  listPropertyLabel,
  locale,
}: HeaderActionsClientProps) {
  const [currency, setCurrency] = useState(() => {
    if (locale === "uz") return "UZS";
    if (locale === "ru") return "RUB";
    return "USD";
  });
  
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showHelpTooltip, setShowHelpTooltip] = useState(false);
  const [showListingModal, setShowListingModal] = useState(false);

  const currencyRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);

  // Click outside listener to close popovers automatically
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setShowCurrencyDropdown(false);
      }
      if (helpRef.current && !helpRef.current.contains(event.target as Node)) {
        setShowHelpTooltip(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getHelpText = () => {
    if (locale === "uz") return "24/7 Mijozlarni qo'llab-quvvatlash: +1 (800) 555-0199 📞";
    if (locale === "ru") return "Поддержка клиентов 24/7: +1 (800) 555-0199 📞";
    return "24/7 Customer Support: +1 (800) 555-0199 📞";
  };

  const getListingModalContent = () => {
    if (locale === "uz") {
      return {
        title: "O'z ob'ektingizni ro'yxatdan o'tkazing",
        body: "Booking.com Clone-da uyingiz yoki mehmonxonangizni ro'yxatdan o'tkazing va daromad olishni boshlang! Ro'yxatdan o'tish mutlaqo bepul va atigi 10 daqiqa vaqt oladi.",
        btn: "Hozir boshlash",
        close: "Yopish",
      };
    }
    if (locale === "ru") {
      return {
        title: "Зарегистрируйте свой объект",
        body: "Зарегистрируйте свой дом или отель на Booking.com Clone и начните зарабатывать уже сегодня! Регистрация бесплатна и займет не более 10 минут.",
        btn: "Начать сейчас",
        close: "Закрыть",
      };
    }
    return {
      title: "List your property",
      body: "List your home, apartment, or hotel on Booking.com Clone and start earning! Registration is completely free and takes less than 10 minutes.",
      btn: "Get started now",
      close: "Close",
    };
  };

  const modalData = getListingModalContent();

  return (
    <div className="flex items-center space-x-3">
      {/* 1. Dynamic Currency Picker Button */}
      <div className="relative font-bold" ref={currencyRef}>
        <button
          onClick={() => {
            setShowCurrencyDropdown(!showCurrencyDropdown);
            setShowHelpTooltip(false);
          }}
          className="cursor-pointer hover:bg-white/10 px-3 py-2 rounded-md transition-all duration-200 text-sm select-none focus:outline-none flex items-center gap-1 active:scale-95"
          title="Select currency"
        >
          {currency}
        </button>

        <AnimatePresence>
          {showCurrencyDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.12 }}
              className="absolute top-full left-0 mt-2 w-28 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-[100] p-1 flex flex-col font-bold"
            >
              {["UZS", "RUB", "USD"].map((curr) => (
                <button
                  key={curr}
                  onClick={() => {
                    setCurrency(curr);
                    setShowCurrencyDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs rounded hover:bg-gray-100 dark:hover:bg-gray-750 transition cursor-pointer select-none ${
                    currency === curr ? "text-blue-600 dark:text-blue-400" : ""
                  }`}
                >
                  {curr}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Language flag switcher */}
      <LanguageSwitcher />

      {/* 3. Theme toggle */}
      <ThemeSwitcher />

      {/* 4. Help desk icon with interactive tooltip popover */}
      <div className="relative" ref={helpRef}>
        <button
          onClick={() => {
            setShowHelpTooltip(!showHelpTooltip);
            setShowCurrencyDropdown(false);
          }}
          className="cursor-pointer hover:bg-white/10 p-2 rounded-full transition-all duration-200 focus:outline-none flex items-center justify-center active:scale-95"
          title="Help desk"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
            />
          </svg>
        </button>

        <AnimatePresence>
          {showHelpTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow-2xl z-[100] text-center"
            >
              {getHelpText()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5. List Your Property interactive modal link */}
      <button
        onClick={() => setShowListingModal(true)}
        className="cursor-pointer font-bold hover:bg-white/10 px-3 py-2 rounded-md transition-all duration-200 text-sm select-none focus:outline-none active:scale-95"
      >
        {listPropertyLabel}
      </button>

      {/* Premium Listing modal backdrop & card */}
      <AnimatePresence>
        {showListingModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-[9999]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 w-full max-w-md overflow-hidden"
            >
              {/* Modal Banner illustration */}
              <div className="bg-blue-600 h-28 flex items-center justify-center p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12 text-white animate-bounce"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5-11.5-3.75 1.364M3.75 16.5v.008h-.008v-.008h.008Zm0 2.25v.008h-.008V18.75h.008Zm0-4.5v.008h-.008v-.008h.008Zm0-2.25v.008h-.008V12h.008ZM12 3.75h.008v.008H12V3.75Zm0 2.25h.008v.008H12V6Zm0 2.25h.008v.008H12V8.25ZM12 10.5h.008v.008H12v-.008Zm0 2.25h.008v.008H12v-.008Z"
                  />
                </svg>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">
                  {modalData.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-6 font-semibold">
                  {modalData.body}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-3 justify-end">
                  <button
                    onClick={() => setShowListingModal(false)}
                    className="cursor-pointer text-xs font-bold text-gray-500 hover:text-gray-700 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded transition"
                  >
                    {modalData.close}
                  </button>
                  <button
                    onClick={() => setShowListingModal(false)}
                    className="cursor-pointer text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded shadow-md transition"
                  >
                    {modalData.btn}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
