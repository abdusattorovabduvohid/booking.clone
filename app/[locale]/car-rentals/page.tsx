import { setRequestLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { FaStar, FaCogs, FaUsers, FaGasPump } from "react-icons/fa";
import { getCars } from "@/lib/api/cars";
import { CarSearchWidget } from "@/components/first/car-rentals/CarSearchWidget";
import { Link } from "@/i18n/routing";

// Incremental Static Regeneration (ISR): Revalidate pages in the background every hour
export const revalidate = 3600;

export default async function CarRentalsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("CarRentals");
  const cars = await getCars();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      
      {/* Banner Hero */}
      <div className="bg-[#003B95] text-white pt-12 pb-20 px-4 md:px-8 relative mb-16 lg:mb-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{t("title")}</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 tracking-wide">
            {t("subtitle")}
          </p>
        </div>
        
        {/* Interactive Car Rental Search Widget */}
        <div className="lg:absolute relative left-0 right-0 lg:-bottom-12 flex justify-center px-4 md:px-8 z-10 mt-6 lg:mt-0">
          <CarSearchWidget />
        </div>
      </div>

      {/* Available Vehicles Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-24">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t("available_vehicles")}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition duration-200 flex flex-col h-full">
              <div className="h-48 bg-gray-200 relative overflow-hidden group">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-102 transition duration-300" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded text-xs font-extrabold text-gray-900 shadow-xs border border-gray-100">
                  {car.company}
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate pr-2">{car.name}</h3>
                  <div className="flex items-center text-[#febb02] bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded text-sm font-bold">
                    <FaStar className="mr-1 text-xs" />
                    <span>{car.rating}</span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-4">
                  {car.category === "Бизнес" ? t("category_business") :
                   car.category === "Средний класс" ? t("category_medium") :
                   car.category === "Эконом" ? t("category_economy") :
                   car.category === "Премиум" ? t("category_premium") :
                   car.category === "Внедорожник" ? t("category_suv") : car.category}
                </p>
                
                <div className="grid grid-cols-2 gap-y-3 mb-6 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-50 dark:border-gray-700 pt-4">
                  <div className="flex items-center gap-2 font-medium">
                    <FaUsers className="text-gray-400" />
                    <span>{car.seats} {locale === "ru" ? "мест" : locale === "uz" ? "o'rindiq" : "seats"}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <FaCogs className="text-gray-400" />
                    <span className="truncate">
                      {car.transmission === "Автомат" ? (locale === "ru" ? "Автомат" : locale === "uz" ? "Avtomat" : "Automatic") : (locale === "ru" ? "Механика" : locale === "uz" ? "Mexanika" : "Manual")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <FaGasPump className="text-gray-400" />
                    <span className="truncate">
                      {car.fuel === "Бензин" ? (locale === "ru" ? "Бензин" : locale === "uz" ? "Benzin" : "Petrol") : (locale === "ru" ? "Дизель" : locale === "uz" ? "Dizel" : "Diesel")}
                    </span>
                  </div>
                  {car.ac && (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-xs">
                      ✓ A/C
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-end mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div>
                    <div className="text-xs text-gray-400 font-semibold">{t("price_per_day")}</div>
                    <div className="text-xl font-extrabold text-gray-900 dark:text-white">
                      {car.priceDay.toLocaleString('uz-UZ')} UZS
                    </div>
                  </div>
                  <Link href={`/car-rentals/checkout/${car.id}?pickup=Tashkent&pickupDate=2026-06-12&dropoffDate=2026-06-15`}>
                    <Button className="bg-[#0071c2] hover:bg-[#005999] font-bold shadow-xs">
                      {t("book_now")}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
