import { Hero } from "@/components/home/Hero";
import { TrendingDestinations } from "@/components/home/TrendingDestinations";
import { PropertyCategories } from "@/components/home/PropertyCategories";
import { RecentSearches } from "@/components/home/RecentSearches";
import { OffersBanner } from "@/components/home/OffersBanner";
import { HomesGuestsLove } from "@/components/home/HomesGuestsLove";
import { DiscoverCountry } from "@/components/home/DiscoverCountry";
import { QuickTripPlanner } from "@/components/home/QuickTripPlanner";
import { UniqueProperties } from "@/components/home/UniqueProperties";
import { WeekendOffers } from "@/components/home/WeekendOffers";
import { fetchQuickTripPlanner } from "@/lib/backend-data";

export default async function HomePage() {
  const plannerData = await fetchQuickTripPlanner() || [];

  return (
    <main>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <RecentSearches />
        <OffersBanner />
        <HomesGuestsLove />
        <TrendingDestinations />
        <PropertyCategories />
        <DiscoverCountry />
        <QuickTripPlanner destinations={plannerData} />
        <UniqueProperties />
        <WeekendOffers />
      </div>
    </main>
  );
}
