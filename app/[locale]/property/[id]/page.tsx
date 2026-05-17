import { setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/Button";

import { MOCK_PROPERTY } from "@/lib/backend-data";

export default async function PropertyPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  // In a real app, fetch property by id from Prisma

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-gray-200 dark:bg-gray-800 text-xs px-2 py-1 rounded font-bold">Hotel</span>
              <div className="flex space-x-1 text-yellow-400">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{MOCK_PROPERTY.title}</h1>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-2 font-medium cursor-pointer underline">
              {MOCK_PROPERTY.address}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <Button className="bg-[#0071c2] hover:bg-[#005999] px-6 py-2 text-lg">Reserve</Button>
            <p className="text-xs mt-2 text-gray-500 font-medium">Price match guarantee</p>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-8 h-[300px] md:h-[400px]">
          <div className="md:col-span-2 h-full rounded-l-lg overflow-hidden cursor-pointer group">
            <img src={MOCK_PROPERTY.images[0]} alt="" className="w-full h-full object-cover group-hover:opacity-90 transition duration-300" />
          </div>
          <div className="hidden md:grid col-span-1 grid-rows-2 gap-2 h-full">
            <div className="rounded-tr-lg overflow-hidden cursor-pointer group">
              <img src={MOCK_PROPERTY.images[1]} alt="" className="w-full h-full object-cover group-hover:opacity-90 transition duration-300" />
            </div>
            <div className="rounded-br-lg overflow-hidden cursor-pointer relative group">
              <img src={MOCK_PROPERTY.images[2]} alt="" className="w-full h-full object-cover group-hover:opacity-90 transition duration-300" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-lg group-hover:bg-black/50 transition duration-300">
                +12 photos
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">{MOCK_PROPERTY.description}</p>
            
            <h3 className="text-xl font-bold mb-4">Most popular facilities</h3>
            <div className="flex flex-wrap gap-4 mb-8">
              {MOCK_PROPERTY.amenities.map(amenity => (
                <div key={amenity} className="flex items-center text-green-700 dark:text-green-500 font-medium bg-green-50 dark:bg-gray-800 px-3 py-1.5 rounded-md">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-[#ebf3ff] dark:bg-gray-800 p-6 rounded-sm border border-[#0071c2]/20">
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Property Highlights</h3>
              <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">
                <strong>Top Location:</strong> Highly rated by recent guests (9.2)
              </p>
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-900 dark:text-white mb-6">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span>Free parking available</span>
              </div>
              <Button className="w-full text-lg font-bold py-6 bg-[#0071c2] hover:bg-[#005999]">
                Reserve
              </Button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
