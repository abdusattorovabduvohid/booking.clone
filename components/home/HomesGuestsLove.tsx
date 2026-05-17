import { getTranslations } from "next-intl/server";
import { fetchHomesGuestsLove } from "@/lib/backend-data";
import { FaHeart } from "react-icons/fa";

export async function HomesGuestsLove() {
  const t = await getTranslations("Index");
  const properties = await fetchHomesGuestsLove() || [];

  if (!properties || properties.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t("homes_guests_love_title")}</h2>
      <div className="flex gap-4 overflow-x-auto snap-x no-scrollbar pb-4">
        {properties.map((item: any) => (
          <div key={item.id} className="snap-start shrink-0 w-64 md:w-72 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-none dark:border dark:border-gray-700 relative flex flex-col h-full">
            <div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm z-10 cursor-pointer text-gray-400 hover:text-red-500 transition">
              <FaHeart className="w-4 h-4" />
            </div>
            <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover" />
            
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex items-center gap-1 mb-1 text-xs text-gray-500 dark:text-gray-400">
                <span>{item.category || "Hotel"}</span>
                {item.stars > 0 && <span className="text-[#febb02]">{"★".repeat(item.stars)}</span>}
                {item.is_genius && (
                  <span className="bg-[#003B95] text-white px-1 py-0.5 rounded-sm ml-1">Genius</span>
                )}
              </div>
              
              <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-1 line-clamp-2">{item.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 truncate">{item.city}, {item.country}</p>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#003B95] text-white text-xs font-bold px-1.5 py-1 rounded-sm rounded-tl-lg rounded-br-lg">{item.rating}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{item.rating >= 9 ? "Superb" : "Fabulous"}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{item.reviews_count} reviews</span>
              </div>
              
              {item.distance_center && (
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                  </svg>
                  {item.distance_center} from center
                </div>
              )}

              <div className="mt-auto pt-4 flex justify-between items-end">
                {item.original_price && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 line-through">UZS {item.original_price.toLocaleString()}</span>
                )}
                <span className="font-bold text-gray-900 dark:text-white">UZS {item.price_per_night.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
