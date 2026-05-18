import { setRequestLocale } from "next-intl/server";
import { FaStar, FaClock, FaArrowLeft, FaCompass } from "react-icons/fa";
import { getAttractions } from "@/lib/api/attractions";
import { AttractionSearchWidget } from "@/components/first/attractions/AttractionSearchWidget";
import { Link } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ query?: string }>;
}

export default async function AttractionsPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { query } = await searchParams;
  setRequestLocale(locale);

  const dict = {
    en: {
      title: "Attractions, activities and experiences",
      subtitle: "Discover new attractions and experiences to match your interests and travel style",
      placeholder: "Where are you going?",
      search: "Search",
      popular: "Popular experiences",
      showing: "Showing experiences in \"{city}\"",
      no_results: "No experiences found for \"{query}\"",
      no_results_sub: "Try searching for another city, like Tashkent, Samarkand, or Bukhara.",
      clear: "Clear search"
    },
    ru: {
      title: "Варианты досуга, экскурсии и мероприятия",
      subtitle: "Откройте для себя новые развлечения в соответствии с вашими интересами и стилем путешествия",
      placeholder: "Куда вы хотите поехать?",
      search: "Найти",
      popular: "Популярные развлечения",
      showing: "Варианты досуга в городе «{city}»",
      no_results: "Не найдено развлечений по запросу «{query}»",
      no_results_sub: "Попробуйте поискать другой город, например, Ташкент, Самарканд или Бухара.",
      clear: "Сбросить поиск"
    },
    uz: {
      title: "Diqqatga sazovor joylar, tadbirlar va tajribalar",
      subtitle: "Qiziqishlaringiz va sayohat uslubingizga mos keladigan yangi joylar va tajribalarni kashf eting",
      placeholder: "Qayerga bormoqchisiz?",
      search: "Qidirish",
      popular: "Ommabop tajribalar",
      showing: "«{city}» shahridagi diqqatga sazovor joylar",
      no_results: "«{query}» bo'yicha hech qanday tajriba topilmadi",
      no_results_sub: "Boshqa shahar, masalan, Toshkent, Samarqand yoki Buxoroni qidirib ko'ring.",
      clear: "Filtrni tozalash"
    }
  }[locale as "en" | "ru" | "uz"] || {
    title: "Attractions, activities and experiences",
    subtitle: "Discover new attractions and experiences to match your interests and travel style",
    placeholder: "Where are you going?",
    search: "Search",
    popular: "Popular experiences",
    showing: "Showing experiences in \"{city}\"",
    no_results: "No experiences found for \"{query}\"",
    no_results_sub: "Try searching for another city, like Tashkent, Samarkand, or Bukhara.",
    clear: "Clear search"
  };

  const attractions = await getAttractions({ city: query });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      
      {/* Banner / Hero Section */}
      <div className="bg-[#003B95] text-white pt-12 pb-24 px-4 md:px-8 relative mb-16 select-none">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
            {dict.title}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl leading-relaxed">
            {dict.subtitle}
          </p>
        </div>
        
        {/* Interactive Search Bar Widget */}
        <div className="absolute left-0 right-0 -bottom-8 flex justify-center px-4 md:px-8 z-10">
          <AttractionSearchWidget
            initialQuery={query}
            placeholder={dict.placeholder}
            searchBtnLabel={dict.search}
            locale={locale}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-20">
        
        {/* Search Header Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {query 
                ? dict.showing.replace("{city}", query) 
                : dict.popular
              }
            </h2>
            {query && (
              <p className="text-sm font-semibold text-gray-500 mt-1">
                {attractions.length} {attractions.length === 1 ? 'experience' : 'experiences'} found
              </p>
            )}
          </div>

          {query && (
            <Link
              href="/attractions"
              className="inline-flex items-center text-sm font-extrabold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors"
            >
              <FaArrowLeft className="mr-2 text-xs" />
              {dict.clear}
            </Link>
          )}
        </div>

        {/* Search Results Grid */}
        {attractions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {attractions.map((item) => (
              <div 
                key={item.id} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition duration-200 cursor-pointer group flex flex-col h-full"
              >
                <div className="h-48 relative overflow-hidden bg-gray-100">
                  <img 
                    src={item.image_url} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" 
                  />
                  <div className="absolute top-3 left-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xs px-2.5 py-1 rounded text-xs font-black text-gray-900 dark:text-white shadow-xs border border-gray-100 dark:border-gray-800">
                    {item.category}
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-extrabold text-gray-900 dark:text-white mb-2 line-clamp-2 text-base leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs font-bold text-gray-500 mb-3">{item.city}, {item.country}</p>
                  
                  <div className="flex items-center text-xs mb-4">
                    <div className="flex items-center text-[#febb02] bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded mr-2 font-bold">
                      <FaStar className="mr-1 text-xs" />
                      <span className="text-gray-950 dark:text-amber-300">{item.rating}</span>
                    </div>
                    <span className="text-gray-500 font-semibold">({item.reviews_count} reviews)</span>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/60">
                    <div className="flex items-center text-xs font-bold text-gray-500 mb-2">
                      <FaClock className="mr-1.5 text-gray-400 text-sm" /> 
                      {item.duration_label}
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-gray-400">From</div>
                        <div className="font-extrabold text-lg text-gray-900 dark:text-white leading-tight">
                          {item.price.toLocaleString('uz-UZ')} UZS
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Premium Empty Search Results State */
          <div className="w-full flex flex-col items-center justify-center py-16 px-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-xs max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-gray-700/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 animate-bounce">
              <FaCompass className="text-3xl" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">
              {dict.no_results.replace("{query}", query || "")}
            </h3>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 max-w-md leading-relaxed mb-6">
              {dict.no_results_sub}
            </p>
            <Link
              href="/attractions"
              className="bg-[#0071c2] hover:bg-[#005999] active:scale-95 text-white text-sm font-extrabold px-6 py-2.5 rounded-sm transition-all shadow-xs cursor-pointer"
            >
              {dict.clear}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
