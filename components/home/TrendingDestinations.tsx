import { getTranslations } from "next-intl/server";
import { fetchTrendingDestinations } from "@/lib/backend-data";

export async function TrendingDestinations() {
  const t = await getTranslations("Index");
  const destinations = await fetchTrendingDestinations() || [];

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t("popular_destinations_title")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {destinations.map((dest: any, i: number) => (
          <div
            key={dest.id}
            className={`relative rounded-lg overflow-hidden group cursor-pointer h-64 md:h-72 ${i < 2 ? 'md:col-span-2' : 'md:col-span-1'}`}
          >
            <img
              src={dest.image_url}
              alt={dest.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Dark gradient overlay at top */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent pointer-events-none h-1/2"></div>
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <h3 className="text-white text-2xl font-bold tracking-tight drop-shadow-md">{dest.name}</h3>
              <span className="text-2xl drop-shadow-md">{dest.flag}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
