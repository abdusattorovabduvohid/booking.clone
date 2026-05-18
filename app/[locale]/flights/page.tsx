import { setRequestLocale, getTranslations } from "next-intl/server";
import { FlightSearchWidget } from "@/components/first/flights/FlightSearchWidget";

export const revalidate = 3600;

export default async function FlightsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Flights");

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 pb-24 select-none">
      
      {/* Premium Hero Banner Frame */}
      <div className="bg-[#f0f4f9] dark:bg-gray-900 pt-16 pb-24 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center gap-12 relative z-10">
          
          {/* Left search card */}
          <div className="w-full xl:w-2/3">
            <h1 className="text-4xl md:text-[3.25rem] leading-tight font-extrabold mb-8 text-gray-900 dark:text-white tracking-tight">
              Search hundreds of flight sites at once.
            </h1>
            <FlightSearchWidget />
          </div>

          {/* Right layout matching screenshot 1 perfectly with 1:1 parallel rounded columns */}
          <div className="hidden xl:flex w-1/3 gap-4 h-[380px] shrink-0 relative overflow-visible">
             {/* Column 1 */}
             <div className="flex flex-col gap-4 w-1/2">
                <div className="h-44 rounded-3xl overflow-hidden shadow-md transition hover:scale-[1.02] duration-300">
                   <img 
                     src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&q=80" 
                     className="w-full h-full object-cover" 
                     alt="Airplane wing" 
                   />
                </div>
                <div className="h-44 rounded-3xl overflow-hidden shadow-md transition hover:scale-[1.02] duration-300">
                   <img 
                     src="https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=500&q=80" 
                     className="w-full h-full object-cover" 
                     alt="Child looking out airplane window" 
                   />
                </div>
             </div>
             
             {/* Column 2 - Offset downwards slightly exactly like screenshot 1 */}
             <div className="flex flex-col gap-4 w-1/2 -mt-6">
                <div className="h-32 rounded-3xl overflow-hidden shadow-md transition hover:scale-[1.02] duration-300">
                   <img 
                     src="https://images.unsplash.com/photo-1533105079780-92b9be482077?w=500&q=80" 
                     className="w-full h-full object-cover" 
                     alt="Houses by ocean" 
                   />
                </div>
                <div className="h-44 rounded-3xl overflow-hidden shadow-md transition hover:scale-[1.02] duration-300">
                   <img 
                     src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=500&q=80" 
                     className="w-full h-full object-cover" 
                     alt="Scenic canyons" 
                   />
                </div>
             </div>
          </div>
          
        </div>
      </div>

      {/* Pristine White Space & Clickable Policies and Partner Logos matching screenshot 1 exactly */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-44 flex flex-col items-center">
        
        {/* Clickable policy links - Navigating to official booking/kayak sites */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-4">
          <a 
            href="https://www.booking.com/content/privacy.html" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:underline hover:text-[#005bb8] transition"
          >
            Booking.com Privacy Policy
          </a>
          <a 
            href="https://www.booking.com/content/terms.html" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:underline hover:text-[#005bb8] transition"
          >
            Booking.com Terms of Use
          </a>
          <a 
            href="https://www.kayak.com/privacy" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:underline hover:text-[#005bb8] transition"
          >
            KAYAK Privacy Policy
          </a>
          <a 
            href="https://www.kayak.com/terms" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:underline hover:text-[#005bb8] transition"
          >
            KAYAK Terms of Use
          </a>
        </div>

        {/* Corporate footer description */}
        <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center max-w-2xl font-bold leading-normal mb-8 uppercase tracking-wider">
          Booking.com is part of Booking Holdings Inc., the world leader in online travel & related services.
        </p>

        {/* Dynamic Partner Badge grid matching screenshot 1 100% - All completely clickable! */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-4 border-t border-gray-100 dark:border-gray-800 w-full max-w-4xl select-none">
          {/* Booking.com Logo Link */}
          <a 
            href="https://www.booking.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 text-[#003580] dark:text-white font-extrabold text-sm select-none hover:opacity-85 transition"
          >
            <span className="bg-[#003580] text-white px-2 py-0.5 rounded text-[10px] tracking-tight">Booking.com</span>
          </a>

          {/* KAYAK Logo Link */}
          <a 
            href="https://www.kayak.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#ff690f] font-black text-sm select-none tracking-tighter uppercase flex items-center hover:opacity-85 transition"
          >
            KAYAK
          </a>

          {/* OpenTable Logo Link */}
          <a 
            href="https://www.opentable.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 font-extrabold text-xs select-none flex items-center gap-1.5 hover:opacity-85 transition"
          >
            <span className="text-[#da3743] text-sm">●</span>
            <span className="text-gray-800 dark:text-gray-200">OpenTable</span>
          </a>

          {/* Priceline Logo Link */}
          <a 
            href="https://www.priceline.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#0057b8] font-bold text-sm select-none italic tracking-tight hover:opacity-85 transition"
          >
            priceline
          </a>

          {/* Agoda Logo Link */}
          <a 
            href="https://www.agoda.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 text-sm select-none font-bold hover:opacity-85 transition"
          >
            <span className="text-gray-900 dark:text-white tracking-wide">agoda.com</span>
            <span className="flex gap-0.5">
              <span className="w-1.5 h-1.5 bg-[#4080ff] rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-[#ff4040] rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-[#ffcc00] rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-[#00cc66] rounded-full"></span>
            </span>
          </a>
        </div>

      </div>

    </main>
  );
}
