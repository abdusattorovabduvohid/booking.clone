"use client";

import { useTranslations } from "next-intl";

export function OffersBanner() {
  const t = useTranslations("Index");

  return (
    <section className="mb-10">
      {/* Dynamic Headers */}
      <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-1">
        {t("offers_title")}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">
        {t("offers_subtitle")}
      </p>
      
      {/* Premium Stays Offers Card Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-xs transition duration-200">
        <div className="flex-1 min-w-0">
          <p className="text-xs md:text-sm font-bold text-gray-500 dark:text-gray-400 mb-1">
            {t("offers_promo")}
          </p>
          <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white mb-2 leading-tight">
            {t("offers_heading")}
          </h3>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-6 font-semibold leading-relaxed">
            {t("offers_desc")}
          </p>
          
          <button className="bg-[#006ce4] hover:bg-[#005bb5] text-white text-xs md:text-sm font-bold px-4 py-2.5 rounded transition duration-150 active:scale-[0.98] cursor-pointer shadow-xs select-none">
            {t("offers_btn")}
          </button>
        </div>

        {/* Brand Illustration (Beach walking couple matching screenshot) */}
        <div className="w-full md:w-32 lg:w-36 h-28 md:h-32 shrink-0 overflow-hidden rounded-lg bg-gray-100 border border-gray-100 dark:border-gray-700">
          <img 
            src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80" 
            alt="Seasonal Promo Beach Couple" 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
    </section>
  );
}
