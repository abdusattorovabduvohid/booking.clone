"use client";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const toggleLanguage = () => {
    // Cycle through: en -> ru -> uz -> en
    const nextLocale = locale === "en" ? "ru" : locale === "ru" ? "uz" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  const getFlag = (l: string) => {
    switch(l) {
      case "en": return "https://flagcdn.com/w20/us.png";
      case "ru": return "https://flagcdn.com/w20/ru.png";
      case "uz": return "https://flagcdn.com/w20/uz.png";
      default: return "https://flagcdn.com/w20/us.png";
    }
  };

  return (
    <button 
      onClick={toggleLanguage} 
      className="cursor-pointer hover:bg-white/10 px-3 py-2 rounded-md transition flex items-center justify-center focus:outline-none"
      aria-label="Change language"
      title={`Current: ${locale.toUpperCase()} (Click to change)`}
    >
      <img src={getFlag(locale)} alt={locale} className="h-5 w-5 rounded-full object-cover" />
    </button>
  );
}
