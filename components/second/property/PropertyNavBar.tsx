"use client";

import { useState } from "react";

interface PropertyNavBarProps {
  overviewLabel: string;
  infoLabel: string;
  facilitiesLabel: string;
  rulesLabel: string;
  importantLabel: string;
  reviewsLabel: string;
}

export function PropertyNavBar({
  overviewLabel,
  infoLabel,
  facilitiesLabel,
  rulesLabel,
  importantLabel,
  reviewsLabel,
}: PropertyNavBarProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: overviewLabel },
    { id: "info", label: infoLabel },
    { id: "facilities", label: facilitiesLabel },
    { id: "rules", label: rulesLabel },
    { id: "important", label: importantLabel },
    { id: "reviews", label: reviewsLabel },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -75; // Adjust this offset for sticky header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 mb-6 overflow-x-auto whitespace-nowrap no-scrollbar -mx-6 px-6 py-0.5 shadow-xs">
      <div className="max-w-7xl mx-auto flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`py-3.5 px-4 text-xs md:text-sm font-bold border-b-2 transition-all duration-200 cursor-pointer ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-extrabold"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
