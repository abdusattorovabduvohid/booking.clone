import { SearchWidget } from "./SearchWidget";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("Index"); // Need to translate texts here eventually

  return (
    <div className="bg-[#003B95] text-white pt-12 pb-20 px-4 md:px-8 relative mb-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Find your next stay</h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90 tracking-wide">
          Search low prices on hotels, homes and much more...
        </p>
      </div>
      
      {/* Absolute positioning for the search widget so it overlaps the bottom */}
      <div className="absolute left-0 right-0 -bottom-8 flex justify-center px-4 md:px-8">
        <SearchWidget />
      </div>
    </div>
  );
}
