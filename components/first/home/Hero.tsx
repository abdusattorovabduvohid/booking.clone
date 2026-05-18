import { SearchWidget } from "./SearchWidget";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("Index");

  return (
    <div className="bg-[#003580] text-white pt-14 pb-24 px-4 md:px-8 relative mb-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          {t("hero_title")}
        </h1>
        <p className="text-lg md:text-xl mb-10 text-white/90 font-medium">
          {t("hero_subtitle")}
        </p>
      </div>
      
      {/* Absolute positioning for the search widget so it overlaps the bottom */}
      <div className="absolute left-0 right-0 -bottom-8 flex justify-center px-4 md:px-8 z-20">
        <SearchWidget />
      </div>
    </div>
  );
}
