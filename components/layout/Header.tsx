import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { FaBed, FaPlane, FaCar, FaMapMarkerAlt, FaTaxi } from "react-icons/fa";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { auth, signOut } from "@/auth";

export async function Header() {
  const t = await getTranslations("Index");
  const session = await auth();

  return (
    <header className="bg-[#003B95] text-white">
      {/* Top Row: Logo & User Actions */}
      <div className="flex items-center justify-between py-4 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Booking.com
        </Link>

        {/* Desktop Links & Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="cursor-pointer font-medium hover:bg-white/10 px-3 py-2 rounded-md transition text-sm">
              UZS
            </span>
            <LanguageSwitcher />
            <ThemeSwitcher />
            <span className="cursor-pointer hover:bg-white/10 p-2 rounded-full transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
            </span>
            <span className="cursor-pointer font-medium hover:bg-white/10 px-3 py-2 rounded-md transition text-sm">
              List your property
            </span>
          </div>

          <div className="flex space-x-2 ml-4">
            {session?.user ? (
              <div className="flex items-center gap-4">
                <Link href="/profile" className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-md transition">
                  <div className="w-8 h-8 rounded-full bg-[#febb02] flex items-center justify-center text-[#003B95] font-bold text-sm">
                    {session.user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold leading-none">{session.user.name}</span>
                    <span className="text-[10px] text-[#febb02]">Genius 1-го уровня</span>
                  </div>
                </Link>
                <form action={async () => {
                  "use server";
                  await signOut();
                }}>
                  <Button type="submit" variant="secondary" className="font-semibold text-white bg-transparent border border-white hover:bg-white/10">
                    Sign out
                  </Button>
                </form>
              </div>
            ) : (
              <>
                <Link href="/register">
                  <Button variant="secondary" className="font-semibold text-[#003B95] bg-white hover:bg-gray-100">
                    Register
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="secondary" className="font-semibold text-[#003B95] bg-white hover:bg-gray-100">
                    Sign in
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row: Navigation Tabs */}
      <div className="flex items-center space-x-1 pb-4 px-4 md:px-8 max-w-7xl mx-auto overflow-x-auto no-scrollbar">
        <Link href="/" className="flex items-center space-x-2 border border-white rounded-full px-4 py-2 bg-white/10 shrink-0">
          <FaBed className="text-xl" /> <span className="font-medium text-sm">Stays</span>
        </Link>
        <Link href="/flights" className="flex items-center space-x-2 rounded-full px-4 py-2 hover:bg-white/10 transition shrink-0">
          <FaPlane className="text-xl" /> <span className="font-medium text-sm">Flights</span>
        </Link>
        <Link href="/car-rentals" className="flex items-center space-x-2 rounded-full px-4 py-2 hover:bg-white/10 transition shrink-0">
          <FaCar className="text-xl" /> <span className="font-medium text-sm">Car rentals</span>
        </Link>
        <Link href="/attractions" className="flex items-center space-x-2 rounded-full px-4 py-2 hover:bg-white/10 transition shrink-0">
          <FaMapMarkerAlt className="text-xl" /> <span className="font-medium text-sm">Attractions</span>
        </Link>
        <Link href="/airport-taxis" className="flex items-center space-x-2 rounded-full px-4 py-2 hover:bg-white/10 transition shrink-0">
          <FaTaxi className="text-xl" /> <span className="font-medium text-sm">Airport taxis</span>
        </Link>
      </div>
    </header>
  );
}
