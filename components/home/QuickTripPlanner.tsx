"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

const TABS = ["Historical expeditions", "Art & Music", "Gastronomy", "Shopping", "Festivals & Events", "More"];

export function QuickTripPlanner({ destinations }: { destinations: any[] }) {
  const t = useTranslations("Index");
  const [activeTab, setActiveTab] = useState(TABS[0]);

  if (!destinations || destinations.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">{t("plan_trip_title")}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{t("plan_trip_subtitle")}</p>
      
      <div className="flex gap-4 overflow-x-auto no-scrollbar mb-6 pb-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === tab 
                ? "bg-blue-50 border border-[#0071c2] text-[#0071c2] dark:bg-gray-800 dark:border-blue-400 dark:text-blue-400" 
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex gap-4 overflow-x-auto snap-x no-scrollbar pb-4">
        {destinations.map((item) => (
          <div key={item.id} className="snap-start shrink-0 w-48 cursor-pointer group">
            <div className="rounded-lg overflow-hidden mb-2 relative">
              <img 
                src={item.image_url} 
                alt={item.name} 
                className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">{item.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.country}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
