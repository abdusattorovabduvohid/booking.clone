import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { auth, signOut } from "@/auth";
import { HeaderTabs } from "./HeaderTabs";
import { HeaderActionsClient } from "./HeaderActionsClient";
import { MobileMenu } from "./MobileMenu";

export async function Header() {
  const tNavbar = await getTranslations("Navbar");
  const session = await auth();
  const locale = await getLocale();

  const tNavbarObj = {
    list_property: tNavbar("list_property"),
    genius_level: tNavbar("genius_level"),
    sign_out: tNavbar("sign_out"),
    register: tNavbar("register"),
    sign_in: tNavbar("sign_in"),
  };

  return (
    <header className="bg-[#003580] text-white shadow-md">
      {/* Top Row: Logo & User Actions */}
      <div className="flex items-center justify-between py-4 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black tracking-tight transform hover:scale-[1.02] transition duration-200 cursor-pointer select-none">
          Booking.com
        </Link>

        {/* Desktop Links & Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <HeaderActionsClient
            listPropertyLabel={tNavbar("list_property")}
            locale={locale}
          />

          <div className="flex space-x-2 ml-4">
            {session?.user ? (
              <div className="flex items-center gap-4">
                <Link href="/profile" className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-md transition duration-200 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-[#febb02] flex items-center justify-center text-[#003B95] font-black text-sm">
                    {session.user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black leading-none">{session.user.name}</span>
                    <span className="text-[10px] text-[#febb02] font-semibold mt-0.5">{tNavbar("genius_level")}</span>
                  </div>
                </Link>
                <form action={async () => {
                  "use server";
                  await signOut();
                }}>
                  <Button type="submit" variant="secondary" className="font-extrabold text-white bg-transparent border border-white hover:bg-white/10 px-4 py-2 cursor-pointer transition duration-200 active:scale-95">
                    {tNavbar("sign_out")}
                  </Button>
                </form>
              </div>
            ) : (
              <>
                <Link href="/register" className="cursor-pointer">
                  <Button variant="secondary" className="font-extrabold text-[#003B95] bg-white hover:bg-gray-100 transition duration-200 active:scale-95">
                    {tNavbar("register")}
                  </Button>
                </Link>
                <Link href="/login" className="cursor-pointer">
                  <Button variant="secondary" className="font-extrabold text-[#003B95] bg-white hover:bg-gray-100 transition duration-200 active:scale-95">
                    {tNavbar("sign_in")}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Button & Drawer Menu */}
        <MobileMenu
          session={session}
          tNavbar={tNavbarObj}
          tStays={tNavbar("stays")}
          tFlights={tNavbar("flights")}
          tCarRentals={tNavbar("car_rentals")}
          tAttractions={tNavbar("attractions")}
          tAirportTaxis={tNavbar("airport_taxis")}
        />
      </div>

      {/* Bottom Row: Dynamic Navigation Tabs */}
      <HeaderTabs 
        tStays={tNavbar("stays")}
        tFlights={tNavbar("flights")}
        tCarRentals={tNavbar("car_rentals")}
        tAttractions={tNavbar("attractions")}
        tAirportTaxis={tNavbar("airport_taxis")}
      />
    </header>
  );
}
