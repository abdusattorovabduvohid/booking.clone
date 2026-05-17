"use client";
import { useTranslations } from "next-intl";
import { categories } from "@/lib/backend-data";

export function PropertyCategories() {
  const t = useTranslations("Index");

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t("search_property_type_title")}</h2>
      
      <div className="flex gap-4 overflow-x-auto snap-x no-scrollbar pb-4 relative">
        {categories.map((cat, i) => (
          <div
            key={cat.id}
            className="snap-start shrink-0 w-48 md:w-64 cursor-pointer group"
          >
            <div className="rounded-lg overflow-hidden mb-2">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
