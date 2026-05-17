import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export function OffersBanner() {
  const t = useTranslations("Index");

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">{t("offers_title")}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{t("offers_subtitle")}</p>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-none dark:border dark:border-gray-700 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Save on your trip thanks to Seasonal offers</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Great conditions. Great vacation.</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">Save 15% or more on stays at participating properties — just book and travel.</p>
          <Button className="bg-[#0071c2] hover:bg-[#005999] text-white px-6 py-2 rounded-sm font-semibold">
            Save with Seasonal offers
          </Button>
        </div>
        <div className="hidden md:block w-48 h-32 shrink-0">
          <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80" alt="Beach vacation" className="w-full h-full object-cover rounded-md" />
        </div>
      </div>
    </section>
  );
}
