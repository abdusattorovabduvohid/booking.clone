import { Hero } from "@/components/first/home/Hero";
import { TrendingDestinations } from "@/components/first/home/TrendingDestinations";
import { PropertyCategories } from "@/components/first/home/PropertyCategories";
import { RecentSearches } from "@/components/first/home/RecentSearches";
import { OffersBanner } from "@/components/first/home/OffersBanner";
import { HomesGuestsLove } from "@/components/first/home/HomesGuestsLove";
import { DiscoverCountry } from "@/components/first/home/DiscoverCountry";
import { QuickTripPlanner } from "@/components/first/home/QuickTripPlanner";
import { LookingForStay } from "@/components/first/home/LookingForStay";
import { UniqueProperties } from "@/components/first/home/UniqueProperties";
import { WeekendOffers } from "@/components/first/home/WeekendOffers";
import { HomePreFooter } from "@/components/first/home/HomePreFooter";
import { fetchQuickTripPlanner } from "@/lib/backend-data";
import { auth } from "@/auth";

export default async function HomePage() {
  const plannerData = await fetchQuickTripPlanner() || [];
  const session = await auth();

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
        <QuickTripPlanner />
        <LookingForStay />
        <UniqueProperties />
        <WeekendOffers />
        <HomePreFooter sessionUsername={session?.user?.name} />
      </div>
    </main>
  );
}
