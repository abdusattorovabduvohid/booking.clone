"use client";

import { useTranslations, useLocale } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();

  const getFlag = (l: string) => {
    switch (l) {
      case "en": return "https://flagcdn.com/w20/us.png";
      case "ru": return "https://flagcdn.com/w20/ru.png";
      case "uz": return "https://flagcdn.com/w20/uz.png";
      default: return "https://flagcdn.com/w20/us.png";
    }
  };

  return (
    <footer className="bg-[#f5f5f5] dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 pt-10 pb-8 text-xs select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* 5-Column Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Column 1: Help */}
          <div className="flex flex-col space-y-2.5">
            <h4 className="font-extrabold text-gray-900 dark:text-white text-sm mb-1">{t("col_help")}</h4>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("manage_bookings")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("contact_us")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("safety_center")}</a>
          </div>

          {/* Column 2: Miscellaneous */}
          <div className="flex flex-col space-y-2.5">
            <h4 className="font-extrabold text-gray-900 dark:text-white text-sm mb-1">{t("col_misc")}</h4>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("genius_program")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("seasonal_deals")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("travel_articles")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("booking_business")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("traveller_awards")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("car_rental")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("flight_finder")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("restaurant_res")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("booking_agents")}</a>
          </div>

          {/* Column 3: Terms & Settings */}
          <div className="flex flex-col space-y-2.5">
            <h4 className="font-extrabold text-gray-900 dark:text-white text-sm mb-1">{t("col_terms")}</h4>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("privacy_policy")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("terms_conditions")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("accessibility")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("dispute_res")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("anti_slavery")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("human_rights")}</a>
          </div>

          {/* Column 4: Partners */}
          <div className="flex flex-col space-y-2.5">
            <h4 className="font-extrabold text-gray-900 dark:text-white text-sm mb-1">{t("col_partners")}</h4>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("extranet_login")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("partner_help")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("list_property")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("affiliate_program")}</a>
          </div>

          {/* Column 5: Company */}
          <div className="flex flex-col space-y-2.5">
            <h4 className="font-extrabold text-gray-900 dark:text-white text-sm mb-1">{t("col_company")}</h4>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("about_booking")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("how_we_work")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("sustainability")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("press_center")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("careers")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("investor_relations")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("corporate_contacts")}</a>
            <a href="#" className="hover:text-blue-600 hover:underline transition font-semibold">{t("content_policy")}</a>
          </div>
        </div>

        {/* Currency & Language flag row */}
        <div className="flex items-center space-x-4 mb-8 border-b border-gray-200 dark:border-gray-800 pb-8">
          <div className="flex items-center space-x-2 bg-transparent hover:bg-gray-200/50 dark:hover:bg-gray-800/50 px-2.5 py-1.5 rounded cursor-pointer transition select-none">
            <img src={getFlag(locale)} alt={locale} className="h-4 w-5 rounded object-cover shadow-sm" />
            <span className="font-bold text-gray-800 dark:text-gray-200 text-xs">USD</span>
          </div>
        </div>

        {/* Brand logos & Copyright Row */}
        <div className="text-center text-[10px] text-gray-400 dark:text-gray-500 font-semibold space-y-6 flex flex-col items-center select-none">
          <p className="max-w-3xl leading-relaxed text-gray-400 dark:text-gray-500">
            {t("copyright_desc")}
          </p>
          <p className="text-gray-400 dark:text-gray-500">
            {t("copyright_rights")}
          </p>

          {/* Booking Holdings Stylized Logos Grid */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-200/60 dark:border-gray-800/60 w-full max-w-2xl">
            <span className="text-sm font-black text-gray-500 hover:text-[#003B95] dark:hover:text-white transition duration-200 cursor-pointer">
              Booking.com
            </span>
            <span className="text-sm font-black text-gray-400 hover:text-blue-500 italic transition duration-200 cursor-pointer">
              priceline
            </span>
            <span className="text-xs font-black tracking-tight text-white bg-gray-400 hover:bg-[#FF690F] px-1.5 py-0.5 rounded transition duration-200 cursor-pointer uppercase">
              KAYAK
            </span>
            <div className="flex items-baseline gap-0.5 text-sm font-black text-gray-400 hover:text-[#5C2D91] transition duration-200 cursor-pointer">
              <span>agoda</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A6D] inline-block"></span>
            </div>
            <div className="flex items-center gap-1 text-sm font-bold text-gray-400 hover:text-[#da3743] transition duration-200 cursor-pointer">
              <span className="w-2.5 h-2.5 rounded-full border-2 border-current inline-block"></span>
              <span>OpenTable</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
