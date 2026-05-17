import { getTranslations } from "next-intl/server";
import { fetchDiscoverUzbekistan } from "@/lib/backend-data";

export async function DiscoverCountry() {
  const t = await getTranslations("Index");
  const destinations = await fetchDiscoverUzbekistan() || [];

  if (destinations.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">{t("discover_uzbekistan_title")}</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-4">{t("discover_uzbekistan_subtitle")}</p>

      <div className="flex gap-4 overflow-x-auto snap-x no-scrollbar pb-4">
        {destinations.map((city: any) => (
          <div key={city.id} className="snap-start shrink-0 cursor-pointer group w-48 flex flex-col">
            <div className="rounded-lg overflow-hidden h-36 mb-2">
              <img src={city.image_url} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">{city.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{city.variants} properties</p>
          </div>
        ))}
      </div>
    </section>
  );
}
