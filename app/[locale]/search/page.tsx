import { setRequestLocale } from "next-intl/server";
import { FilterSidebar } from "@/components/second/search/FilterSidebar";
import { PropertyCard } from "@/components/second/search/PropertyCard";
import { searchHotels } from "@/lib/api/hotels";
import { Link } from "@/i18n/routing";

interface SearchPageProps {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const resolvedSearchParams = await searchParams;
  const destination = typeof resolvedSearchParams?.destination === 'string' ? resolvedSearchParams.destination : undefined;

  // Fetch matched properties
  const properties = await searchHotels({ destination });

  // Apply filters locally for 1000% reliability
  let filtered = [...properties];

  // Stars filter
  const starsParam = resolvedSearchParams?.stars;
  if (typeof starsParam === 'string' && starsParam) {
    const starsList = starsParam.split(",").map(Number);
    filtered = filtered.filter(h => starsList.includes(h.stars));
  }

  // Type filter
  const typeParam = resolvedSearchParams?.type;
  if (typeof typeParam === 'string' && typeParam) {
    const typesList = typeParam.split(",");
    filtered = filtered.filter(h => typesList.includes(h.type));
  }

  // Breakfast filter
  if (resolvedSearchParams?.breakfast === 'true') {
    filtered = filtered.filter(h => h.breakfast === true);
  }

  // Free cancellation filter
  if (resolvedSearchParams?.freeCancel === 'true') {
    filtered = filtered.filter(h => h.freeCancel === true);
  }

  // Price range filter
  const priceRangeParam = resolvedSearchParams?.priceRange;
  if (typeof priceRangeParam === 'string' && priceRangeParam) {
    const ranges = priceRangeParam.split(",");
    filtered = filtered.filter(h => {
      return ranges.some(r => {
        const [min, max] = r.split("-").map(Number);
        return h.price >= min && h.price <= max;
      });
    });
  }

  // Sorting
  const sortParam = typeof resolvedSearchParams?.sort === 'string' ? resolvedSearchParams.sort : 'best';
  if (sortParam === 'price_asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortParam === 'rating_desc') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortParam === 'stars_desc') {
    filtered.sort((a, b) => b.stars - a.stars);
  }

  // Build URL helper for sorting
  const buildSortUrl = (newSort: string) => {
    const params = new URLSearchParams();
    if (resolvedSearchParams) {
      Object.entries(resolvedSearchParams).forEach(([k, v]) => {
        if (v !== undefined) {
          params.set(k, String(v));
        }
      });
    }
    params.set("sort", newSort);
    return `/search?${params.toString()}`;
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-6">
        
        {/* Left Sidebar */}
        <aside className="w-full md:w-1/4 flex-shrink-0">
          <FilterSidebar />
        </aside>

        {/* Right Content */}
        <div className="w-full md:w-3/4">
          
          <h1 className="text-xl md:text-2xl font-extrabold mb-4 text-gray-900 dark:text-white">
            {destination || "All Destinations"}: {filtered.length} properties found
          </h1>
          
          {/* Sorting Bar */}
          <div className="flex border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden mb-6 bg-white dark:bg-gray-900 shadow-sm text-center">
            <Link 
              href={buildSortUrl("price_asc")}
              className={`flex-1 py-3 text-xs font-bold border-r border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition ${sortParam === 'price_asc' ? 'bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
            >
              Сначала дешевые (Cheapest)
            </Link>
            <Link 
              href={buildSortUrl("rating_desc")}
              className={`flex-1 py-3 text-xs font-bold border-r border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition ${sortParam === 'rating_desc' ? 'bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
            >
              Лучшие оценки (Best Rating)
            </Link>
            <Link 
              href={buildSortUrl("stars_desc")}
              className={`flex-1 py-3 text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition ${sortParam === 'stars_desc' ? 'bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
            >
              Класс звезд (Stars Class)
            </Link>
          </div>

          {/* Properties List */}
          <div className="flex flex-col">
            {filtered.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg border border-gray-200 dark:border-gray-800 text-center text-gray-500 font-bold">
                No properties match your filters. Try clearing some options!
              </div>
            ) : (
              filtered.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            )}
          </div>

        </div>

      </div>
    </main>
  );
}
