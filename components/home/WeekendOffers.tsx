import { getTranslations } from "next-intl/server";
import { fetchWeekendOffers } from "@/lib/backend-data";
import { FaHeart } from "react-icons/fa";

export async function WeekendOffers() {
  const t = await getTranslations("Index");
  const offers = await fetchWeekendOffers() || [];

  if (offers.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">{t("weekend_offers_title")}</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-4">{t("weekend_offers_subtitle")}</p>
      
      <div className="flex gap-4 overflow-x-auto snap-x no-scrollbar pb-4">
        {offers.map((item: any) => (
          <div key={item.id} className="snap-start shrink-0 w-64 md:w-72 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-none dark:border dark:border-gray-700 relative flex flex-col h-full cursor-pointer group">
            <div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm z-10 cursor-pointer text-gray-400 hover:text-red-500 transition">
              <FaHeart className="w-4 h-4" />
            </div>
            <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity" />
            
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-1 line-clamp-2">{item.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 truncate">{item.city}, {item.country}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#003B95] text-white text-xs font-bold px-1.5 py-1 rounded-sm rounded-tl-lg rounded-br-lg">{item.rating}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{item.rating >= 9 ? "Superb" : "Fabulous"}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{item.reviews_count} reviews</span>
              </div>
              
              <div className="mt-auto text-sm text-gray-600 dark:text-gray-300">
                <span className="font-bold text-gray-900 dark:text-white">UZS {(item.price_per_night * 2).toLocaleString()}</span>
                <span className="text-xs ml-1">/ 2 nights</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
