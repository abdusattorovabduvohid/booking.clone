import { setRequestLocale } from "next-intl/server";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { PropertyCard } from "@/components/search/PropertyCard";

import { MOCK_PROPERTIES } from "@/lib/backend-data";

export default async function SearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-6">
        
        {/* Left Sidebar */}
        <aside className="w-full md:w-1/4 flex-shrink-0">
          <FilterSidebar />
        </aside>

        {/* Right Content */}
        <div className="w-full md:w-3/4">
          <h1 className="text-2xl font-bold mb-4">Tashkent: {MOCK_PROPERTIES.length} properties found</h1>
          
          <div className="flex flex-col">
            {MOCK_PROPERTIES.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
