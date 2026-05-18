"use client";

import { Link, usePathname } from "@/i18n/routing";
import { FaBed, FaPlane, FaCar, FaMapMarkerAlt, FaTaxi } from "react-icons/fa";

interface HeaderTabsProps {
  tStays: string;
  tFlights: string;
  tCarRentals: string;
  tAttractions: string;
  tAirportTaxis: string;
}

export function HeaderTabs({
  tStays,
  tFlights,
  tCarRentals,
  tAttractions,
  tAirportTaxis,
}: HeaderTabsProps) {
  const pathname = usePathname();

  const tabs = [
    { href: "/", label: tStays, icon: FaBed },
    { href: "/flights", label: tFlights, icon: FaPlane },
    { href: "/car-rentals", label: tCarRentals, icon: FaCar },
    { href: "/attractions", label: tAttractions, icon: FaMapMarkerAlt },
    { href: "/airport-taxis", label: tAirportTaxis, icon: FaTaxi },
  ];

  return (
    <div className="flex items-center space-x-1 pb-4 px-4 md:px-8 max-w-7xl mx-auto overflow-x-auto no-scrollbar">
      {tabs.map((tab, idx) => {
        const Icon = tab.icon;
        const isActive =
          tab.href === "/"
            ? pathname === "/" || pathname === ""
            : pathname.startsWith(tab.href);

        return (
          <Link
            key={idx}
            href={tab.href}
            className={`flex items-center space-x-2 rounded-full px-4 py-2 shrink-0 transition-all duration-200 transform active:scale-95 border cursor-pointer ${
              isActive
                ? "border-white bg-white/10 font-extrabold shadow-sm"
                : "border-transparent hover:bg-white/10 hover:border-white/20 font-semibold"
            }`}
          >
            <Icon className="text-xl" />
            <span className="text-sm">{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
