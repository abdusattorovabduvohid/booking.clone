import { setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { FaSearch } from "react-icons/fa";

export default async function AttractionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="bg-[#003B95] text-white pt-12 pb-20 px-4 md:px-8 relative mb-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Attractions, activities and experiences</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 tracking-wide">
            Discover new attractions and experiences to match your interests and travel style
          </p>
        </div>
        
        {/* Mock Attraction Search Widget */}
        <div className="absolute left-0 right-0 -bottom-8 flex justify-center px-4 md:px-8 z-10">
          <div className="bg-[#febb02] p-1 rounded-lg shadow-lg w-full max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-1">
              <div className="flex-[3] flex items-center bg-white px-4 py-3 rounded-sm">
                <FaSearch className="text-gray-400 mr-3 text-xl" />
                <input type="text" placeholder="Where are you going?" className="w-full focus:outline-none text-gray-900 font-medium text-lg" />
              </div>
              <Button className="bg-[#0071c2] hover:bg-[#005999] text-white text-xl font-bold px-8 py-3 lg:w-auto w-full rounded-sm">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
