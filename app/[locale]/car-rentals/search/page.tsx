import { setRequestLocale, getTranslations } from "next-intl/server";
import { getCars } from "@/lib/api/cars";
import { Button } from "@/components/ui/Button";
import { CarSearchWidget } from "@/components/first/car-rentals/CarSearchWidget";
import { FaStar, FaCogs, FaUsers, FaGasPump, FaChevronRight } from "react-icons/fa";
import { Link } from "@/i18n/routing";

export default async function CarSearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    pickup?: string;
    pickupDate?: string;
    dropoffDate?: string;
    transmission?: string;
    fuel?: string;
    category?: string;
    company?: string;
    sortBy?: string;
  }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("CarRentals");
  const resolvedSearchParams = await searchParams;

  const pickup = resolvedSearchParams.pickup || (locale === "ru" ? "Ташкент" : locale === "uz" ? "Toshkent" : "Tashkent");
  const pickupDate = resolvedSearchParams.pickupDate || "2026-06-12";
  const dropoffDate = resolvedSearchParams.dropoffDate || "2026-06-15";
  const activeTransmission = resolvedSearchParams.transmission || "";
  const activeFuel = resolvedSearchParams.fuel || "";
  const activeCategory = resolvedSearchParams.category || "";
  const activeCompany = resolvedSearchParams.company || "";
  const sortBy = resolvedSearchParams.sortBy || "priceAsc";

  // Calculate rental duration in days
  const d1 = new Date(pickupDate);
  const d2 = new Date(dropoffDate);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 3;

  // Fetch cars with active filters
  let cars = await getCars({
    category: activeCategory,
    transmission: activeTransmission,
    fuel: activeFuel,
    company: activeCompany,
    search: pickup,
  });

  // Sorting
  if (sortBy === "priceAsc") {
    cars = [...cars].sort((a, b) => a.priceDay - b.priceDay);
  } else if (sortBy === "priceDesc") {
    cars = [...cars].sort((a, b) => b.priceDay - a.priceDay);
  } else if (sortBy === "rating") {
    cars = [...cars].sort((a, b) => b.rating - a.rating);
  }

  // Generate filter URLs helper
  const createFilterLink = (key: string, value: string) => {
    const newParams = new URLSearchParams();
    newParams.set("pickup", pickup);
    newParams.set("pickupDate", pickupDate);
    newParams.set("dropoffDate", dropoffDate);
    if (activeTransmission) newParams.set("transmission", activeTransmission);
    if (activeFuel) newParams.set("fuel", activeFuel);
    if (activeCategory) newParams.set("category", activeCategory);
    if (activeCompany) newParams.set("company", activeCompany);
    newParams.set("sortBy", sortBy);

    if (value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    return `/${locale}/car-rentals/search?${newParams.toString()}`;
  };

  const categories = ["Economy", "Medium class", "Business", "Premium", "SUV"];
  const transmissions = ["Automatic", "Manual"];
  const fuels = ["Petrol", "Diesel"];
  const companies = ["Hertz", "Avis", "Budget", "Europcar"];

  const getLocalizedCategory = (cat: string) => {
    if (cat.toLowerCase() === "economy") return t("category_economy");
    if (cat.toLowerCase() === "medium class") return t("category_medium");
    if (cat.toLowerCase() === "business") return t("category_business");
    if (cat.toLowerCase() === "premium") return t("category_premium");
    if (cat.toLowerCase() === "suv") return t("category_suv");
    return cat;
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 text-gray-950 dark:text-white">
      
      {/* Yellow Subheader */}
      <div className="bg-[#febb02] px-4 md:px-8 py-4 mb-8 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <CarSearchWidget 
            initialPickup={pickup} 
            initialPickupDate={pickupDate} 
            initialDropoffDate={dropoffDate} 
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/car-rentals" className="hover:text-blue-600">Car rentals</Link>
          <FaChevronRight className="text-[8px] text-gray-400" />
          <span>Search results</span>
          <FaChevronRight className="text-[8px] text-gray-400" />
          <span className="text-gray-900 dark:text-white font-bold">{pickup}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-1/4 flex-shrink-0 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xs border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="font-extrabold text-lg border-b border-gray-100 dark:border-gray-700 pb-3 mb-4">
                {t("filters")}
              </h3>

              {/* Transmission filter */}
              <div className="mb-6">
                <h4 className="font-bold text-sm mb-3">{t("transmission")}</h4>
                <div className="space-y-2">
                  <Link 
                    href={createFilterLink("transmission", "")}
                    className={`flex items-center text-sm font-semibold py-1 hover:text-blue-600 ${activeTransmission === "" ? "text-blue-600 font-bold" : "text-gray-600 dark:text-gray-300"}`}
                  >
                    <span className="w-4 h-4 mr-2 border border-gray-300 rounded flex items-center justify-center text-[10px]">
                      {activeTransmission === "" && "✓"}
                    </span>
                    {locale === "ru" ? "Все коробки" : locale === "uz" ? "Barchasi" : "All transmissions"}
                  </Link>
                  {transmissions.map((trans) => {
                    const localized = trans === "Automatic" ? t("transmission_auto") : t("transmission_manual");
                    const activeVal = trans === "Automatic" ? "Автомат" : "Механика";
                    const isChecked = activeTransmission.toLowerCase() === activeVal.toLowerCase();
                    return (
                      <Link 
                        key={trans}
                        href={createFilterLink("transmission", activeVal)}
                        className={`flex items-center text-sm py-1 hover:text-blue-600 ${isChecked ? "text-blue-600 font-bold" : "text-gray-600 dark:text-gray-300"}`}
                      >
                        <span className="w-4 h-4 mr-2 border border-gray-300 rounded flex items-center justify-center text-[10px]">
                          {isChecked && "✓"}
                        </span>
                        {localized}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Fuel filter */}
              <div className="mb-6">
                <h4 className="font-bold text-sm mb-3">{t("fuel")}</h4>
                <div className="space-y-2">
                  <Link 
                    href={createFilterLink("fuel", "")}
                    className={`flex items-center text-sm font-semibold py-1 hover:text-blue-600 ${activeFuel === "" ? "text-blue-600 font-bold" : "text-gray-600 dark:text-gray-300"}`}
                  >
                    <span className="w-4 h-4 mr-2 border border-gray-300 rounded flex items-center justify-center text-[10px]">
                      {activeFuel === "" && "✓"}
                    </span>
                    {locale === "ru" ? "Все типы" : locale === "uz" ? "Barchasi" : "All fuels"}
                  </Link>
                  {fuels.map((fuel) => {
                    const localized = fuel === "Petrol" ? t("fuel_petrol") : t("fuel_diesel");
                    const activeVal = fuel === "Petrol" ? "Бензин" : "Дизель";
                    const isChecked = activeFuel.toLowerCase() === activeVal.toLowerCase();
                    return (
                      <Link 
                        key={fuel}
                        href={createFilterLink("fuel", activeVal)}
                        className={`flex items-center text-sm py-1 hover:text-blue-600 ${isChecked ? "text-blue-600 font-bold" : "text-gray-600 dark:text-gray-300"}`}
                      >
                        <span className="w-4 h-4 mr-2 border border-gray-300 rounded flex items-center justify-center text-[10px]">
                          {isChecked && "✓"}
                        </span>
                        {localized}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Category filter */}
              <div className="mb-6">
                <h4 className="font-bold text-sm mb-3">{t("category")}</h4>
                <div className="space-y-2">
                  <Link 
                    href={createFilterLink("category", "")}
                    className={`flex items-center text-sm font-semibold py-1 hover:text-blue-600 ${activeCategory === "" ? "text-blue-600 font-bold" : "text-gray-600 dark:text-gray-300"}`}
                  >
                    <span className="w-4 h-4 mr-2 border border-gray-300 rounded flex items-center justify-center text-[10px]">
                      {activeCategory === "" && "✓"}
                    </span>
                    {locale === "ru" ? "Все классы" : locale === "uz" ? "Barcha klasslar" : "All classes"}
                  </Link>
                  {categories.map((cat) => {
                    const localized = getLocalizedCategory(cat);
                    const isChecked = activeCategory.toLowerCase() === cat.toLowerCase();
                    return (
                      <Link 
                        key={cat}
                        href={createFilterLink("category", cat)}
                        className={`flex items-center text-sm py-1 hover:text-blue-600 ${isChecked ? "text-blue-600 font-bold" : "text-gray-600 dark:text-gray-300"}`}
                      >
                        <span className="w-4 h-4 mr-2 border border-gray-300 rounded flex items-center justify-center text-[10px]">
                          {isChecked && "✓"}
                        </span>
                        {localized}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Company filter */}
              <div>
                <h4 className="font-bold text-sm mb-3">{t("company")}</h4>
                <div className="space-y-2">
                  <Link 
                    href={createFilterLink("company", "")}
                    className={`flex items-center text-sm font-semibold py-1 hover:text-blue-600 ${activeCompany === "" ? "text-blue-600 font-bold" : "text-gray-600 dark:text-gray-300"}`}
                  >
                    <span className="w-4 h-4 mr-2 border border-gray-300 rounded flex items-center justify-center text-[10px]">
                      {activeCompany === "" && "✓"}
                    </span>
                    {locale === "ru" ? "Все компании" : locale === "uz" ? "Barcha kompaniyalar" : "All companies"}
                  </Link>
                  {companies.map((comp) => {
                    const isChecked = activeCompany.toLowerCase() === comp.toLowerCase();
                    return (
                      <Link 
                        key={comp}
                        href={createFilterLink("company", comp)}
                        className={`flex items-center text-sm py-1 hover:text-blue-600 ${isChecked ? "text-blue-600 font-bold" : "text-gray-600 dark:text-gray-300"}`}
                      >
                        <span className="w-4 h-4 mr-2 border border-gray-300 rounded flex items-center justify-center text-[10px]">
                          {isChecked && "✓"}
                        </span>
                        {comp}
                      </Link>
                    );
                  })}
                </div>
              </div>

            </div>
          </aside>

          {/* Results Column */}
          <div className="w-full lg:w-3/4">
            
            {/* Sorting Tab Headers */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-xs mb-6 overflow-x-auto no-scrollbar shrink-0">
              <Link 
                href={createFilterLink("sortBy", "priceAsc")}
                className={`flex-1 text-center py-3 px-4 font-bold text-sm rounded transition ${sortBy === "priceAsc" ? "bg-[#003B95] text-white" : "hover:bg-gray-50 text-gray-700 dark:text-gray-300"}`}
              >
                {locale === "ru" ? "Сначала дешевые" : locale === "uz" ? "Avval arzonlar" : "Cheapest first"}
              </Link>
              <Link 
                href={createFilterLink("sortBy", "priceDesc")}
                className={`flex-1 text-center py-3 px-4 font-bold text-sm rounded transition ${sortBy === "priceDesc" ? "bg-[#003B95] text-white" : "hover:bg-gray-50 text-gray-700 dark:text-gray-300"}`}
              >
                {locale === "ru" ? "Сначала дорогие" : locale === "uz" ? "Avval qimmatlar" : "Most expensive"}
              </Link>
              <Link 
                href={createFilterLink("sortBy", "rating")}
                className={`flex-1 text-center py-3 px-4 font-bold text-sm rounded transition ${sortBy === "rating" ? "bg-[#003B95] text-white" : "hover:bg-gray-50 text-gray-700 dark:text-gray-300"}`}
              >
                {locale === "ru" ? "Оценка гостей" : locale === "uz" ? "Mehmonlar bahosi" : "Best rated"}
              </Link>
            </div>

            {/* Empty State */}
            {cars.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center shadow-xs">
                <div className="text-4xl mb-4">🚗</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No vehicles found</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Try adjusting or clearing your filters to see more results for {pickup}.
                </p>
                <Link href={createFilterLink("category", "").replace(/transmission=[^&]+&?/, "").replace(/fuel=[^&]+&?/, "").replace(/company=[^&]+&?/, "")}>
                  <Button className="mt-6 bg-[#0071c2] hover:bg-[#005999]">Clear Filters</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {cars.map((car) => {
                  const totalPrice = car.priceDay * rentalDays;
                  return (
                    <div 
                      key={car.id} 
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-xs border border-gray-200 dark:border-gray-700 hover:shadow-md transition flex flex-col md:flex-row overflow-hidden"
                    >
                      {/* Left: Image */}
                      <div className="w-full md:w-1/3 h-52 md:h-auto bg-gray-200 relative overflow-hidden flex-shrink-0">
                        <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-extrabold text-gray-800 border border-gray-100 shadow-xs">
                          {car.company}
                        </div>
                      </div>

                      {/* Middle: Info */}
                      <div className="flex-1 p-6 flex flex-col border-r border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 hover:text-blue-600 transition">
                              {car.name}
                            </h3>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                              {getLocalizedCategory(car.category)}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <span className="text-xs font-bold text-gray-900 dark:text-white block leading-none">
                                {car.rating >= 9 ? "Exceptional" : car.rating >= 8.5 ? "Very Good" : "Good"}
                              </span>
                              <span className="text-[10px] text-gray-500">{car.reviews_count} reviews</span>
                            </div>
                            <div className="bg-[#003B95] text-white font-extrabold text-sm px-2 py-1 rounded">
                              {car.rating}
                            </div>
                          </div>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 gap-y-2 mt-4 text-xs font-medium text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-2"><FaUsers className="text-gray-400" /> {car.seats} seats</div>
                          <div className="flex items-center gap-2">
                            <FaCogs className="text-gray-400" /> 
                            {car.transmission === "Автомат" ? t("transmission_auto") : t("transmission_manual")}
                          </div>
                          <div className="flex items-center gap-2">
                            <FaGasPump className="text-gray-400" /> 
                            {car.fuel === "Бензин" ? t("fuel_petrol") : t("fuel_diesel")}
                          </div>
                          {car.free_cancel && (
                            <div className="text-green-600 dark:text-green-400 font-bold">✓ Free cancellation</div>
                          )}
                        </div>
                      </div>

                      {/* Right: Price / Booking button */}
                      <div className="w-full md:w-[220px] p-6 bg-gray-50/50 dark:bg-gray-800/30 flex flex-col justify-center items-stretch md:items-end">
                        <div className="mb-4 text-left md:text-right">
                          <div className="text-xs text-gray-400 font-bold uppercase leading-none">{t("price_per_day")}</div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                            {car.priceDay.toLocaleString("uz-UZ")} UZS
                          </div>
                          
                          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                            <span className="text-[10px] text-gray-400 font-bold uppercase block leading-none">{t("total_price")}</span>
                            <span className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1 block">
                              {totalPrice.toLocaleString("uz-UZ")} UZS
                            </span>
                            <span className="text-[10px] text-gray-500 font-semibold block mt-1">
                              {t("for_days").replace("{days}", String(rentalDays))}
                            </span>
                          </div>
                        </div>

                        <Link 
                          href={`/car-rentals/checkout/${car.id}?pickup=${encodeURIComponent(pickup)}&pickupDate=${pickupDate}&dropoffDate=${dropoffDate}`}
                          className="w-full"
                        >
                          <Button className="w-full bg-[#0071c2] hover:bg-[#005999] font-extrabold text-sm py-2.5 shadow-xs">
                            {t("book_now")}
                          </Button>
                        </Link>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
            
          </div>

        </div>

      </div>

    </main>
  );
}
