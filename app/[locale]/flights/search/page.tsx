import { setRequestLocale, getTranslations } from "next-intl/server";
import { getFlights } from "@/lib/api/flights";
import { FlightSearchResultsList } from "@/components/first/flights/FlightSearchResultsList";

export default async function FlightSearchResultsPage({ 
  params,
  searchParams,
}: { 
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ 
    from?: string; 
    to?: string; 
    departDate?: string; 
    returnDate?: string; 
    adults?: string; 
    cabin?: string; 
    tripType?: string; 
  }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Flights");

  const resolvedParams = await searchParams;
  const fromParam = resolvedParams.from || "Tashkent (TAS)";
  const toParam = resolvedParams.to || "Dubai (DXB)";
  const departDateParam = resolvedParams.departDate || "2026-06-01";
  const returnDateParam = resolvedParams.returnDate || "2026-06-08";
  const adultsParam = resolvedParams.adults || "1";
  const cabinParam = resolvedParams.cabin || "Economy";

  const flights = await getFlights({ from: fromParam, to: toParam, locale });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <FlightSearchResultsList 
          initialFlights={flights}
          from={fromParam}
          to={toParam}
          departDate={departDateParam}
          returnDate={returnDateParam}
          adults={adultsParam}
          cabin={cabinParam}
          tSearch={t("search")}
          tCheapest={t("cheapest")}
          tBest={t("best")}
          tQuickest={t("quickest")}
          tOtherSort={t("other_sort")}
          tSelect={t("select")}
          tLite={t("lite")}
          tStops={t("stops")}
          tNonstop={t("nonstop")}
          tOneStop={t("one_stop")}
          tTwoStops={t("two_stops")}
          tImportantMessages={t("important_messages")}
          tInfantWarning={t("infant_warning")}
          tSmartFilters={t("smart_filters")}
          tAiPowered={t("ai_powered")}
          tFilterFlights={t("filter_flights")}
          tNoFlightsMatch={t("no_flights_match")}
          tAdjustFilters={t("adjust_filters")}
        />
      </div>
    </main>
  );
}
