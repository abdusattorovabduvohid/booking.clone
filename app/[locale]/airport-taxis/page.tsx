"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { FaTaxi, FaCalendarAlt, FaUser, FaSuitcase, FaUserFriends, FaCheck, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { getTaxis } from "@/lib/api/taxis";
import { Taxi } from "@/lib/mocks/taxis";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function AirportTaxisPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("AirportTaxis");
  const currentLocale = (params.locale as string) || "en";

  const [taxis, setTaxis] = useState<Taxi[]>([]);
  const [filteredTaxis, setFilteredTaxis] = useState<Taxi[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupDate, setPickupDate] = useState("2026-06-12");
  const [pickupTime, setPickupTime] = useState("12:00");
  const [passengers, setPassengers] = useState(2);

  // Dropdown states
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDropoffDropdown, setShowDropoffDropdown] = useState(false);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);

  const pickupRef = useRef<HTMLDivElement>(null);
  const dropoffRef = useRef<HTMLDivElement>(null);
  const passengerRef = useRef<HTMLDivElement>(null);

  const popularCities = [
    { name: "Tashkent Airport (TAS)", ru: "Аэропорт Ташкента (TAS)", uz: "Toshkent Aeroporti (TAS)" },
    { name: "Samarkand Airport (SKD)", ru: "Аэропорт Самарканда (SKD)", uz: "Samarqand Aeroporti (SKD)" },
    { name: "Bukhara Airport (BHK)", ru: "Аэропорт Бухары (BHK)", uz: "Buxoro Aeroporti (BHK)" },
    { name: "Khiva City Center", ru: "Центр города Хивы", uz: "Xiva shahar markazi" },
    { name: "Dubai International Airport (DXB)", ru: "Аэропорт Дубая (DXB)", uz: "Dubay Aeroporti (DXB)" }
  ];

  const getLocalizedCity = (city: typeof popularCities[0]) => {
    if (currentLocale === "ru") return city.ru;
    if (currentLocale === "uz") return city.uz;
    return city.name;
  };

  useEffect(() => {
    const fetchTaxisData = async () => {
      const data = await getTaxis();
      setTaxis(data);
      
      // Initial parsing of search parameters from URL
      const queryPickup = searchParams.get("pickup");
      const queryDropoff = searchParams.get("dropoff");
      const queryDate = searchParams.get("date");
      const queryTime = searchParams.get("time");
      const queryPassengers = searchParams.get("passengers");

      if (queryPickup) setPickup(queryPickup);
      if (queryDropoff) setDropoff(queryDropoff);
      if (queryDate) setPickupDate(queryDate);
      if (queryTime) setPickupTime(queryTime);
      
      let pCount = passengers;
      if (queryPassengers) {
        pCount = Number(queryPassengers);
        setPassengers(pCount);
      }

      let results = [...data];
      if (pCount > 4) {
        results = results.filter(t => t.seats >= 7);
      } else {
        results = results.filter(t => t.seats >= pCount);
      }
      setFilteredTaxis(results);
      setLoading(false);
    };
    fetchTaxisData();
  }, [searchParams]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickupRef.current && !pickupRef.current.contains(event.target as Node)) {
        setShowPickupDropdown(false);
      }
      if (dropoffRef.current && !dropoffRef.current.contains(event.target as Node)) {
        setShowDropoffDropdown(false);
      }
      if (passengerRef.current && !passengerRef.current.contains(event.target as Node)) {
        setShowPassengerDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const qPickup = pickup.trim() || (currentLocale === "ru" ? "Аэропорт Ташкента (TAS)" : currentLocale === "uz" ? "Toshkent Aeroporti (TAS)" : "Tashkent Airport (TAS)");
    const qDropoff = dropoff.trim() || (currentLocale === "ru" ? "Гостиница Hilton" : currentLocale === "uz" ? "Hilton Mehmonxonasi" : "Hilton Hotel");

    let results = [...taxis];
    if (passengers > 4) {
      results = results.filter(t => t.seats >= 7);
    } else {
      results = results.filter(t => t.seats >= passengers);
    }
    setFilteredTaxis(results);

    // Dynamic routing path with parameters
    router.push(`/${currentLocale}/airport-taxis?pickup=${encodeURIComponent(qPickup)}&dropoff=${encodeURIComponent(qDropoff)}&date=${pickupDate}&time=${pickupTime}&passengers=${passengers}`, { scroll: false });
  };

  const handleBook = (taxiId: number) => {
    const queryPickup = pickup.trim() || (currentLocale === "ru" ? "Аэропорт Ташкента (TAS)" : currentLocale === "uz" ? "Toshkent Aeroporti (TAS)" : "Tashkent Airport (TAS)");
    const queryDropoff = dropoff.trim() || (currentLocale === "ru" ? "Гостиница Hilton" : currentLocale === "uz" ? "Hilton Mehmonxonasi" : "Hilton Hotel");
    
    router.push(`/${currentLocale}/airport-taxis/checkout/${taxiId}?pickup=${encodeURIComponent(queryPickup)}&dropoff=${encodeURIComponent(queryDropoff)}&date=${pickupDate}&time=${pickupTime}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 text-gray-950 dark:text-white">
      
      {/* Banner Hero */}
      <div className="bg-[#003B95] text-white pt-12 pb-20 px-4 md:px-8 relative mb-16 lg:mb-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{t("title")}</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 tracking-wide">
            {t("subtitle")}
          </p>
        </div>
        
        {/* Interactive Taxi Search Widget - Responsive positioning */}
        <div className="lg:absolute relative left-0 right-0 lg:-bottom-16 flex justify-center px-4 md:px-8 z-10 mt-6 lg:mt-0">
          <div className="bg-[#febb02] p-1 rounded-lg shadow-lg w-full max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-1">
              
              {/* Pickup Location */}
              <div className="flex-1 flex items-center bg-white px-4 py-3 rounded-sm relative" ref={pickupRef}>
                <FaTaxi className="text-gray-400 mr-3 text-xl" />
                <input 
                  type="text" 
                  placeholder={t("pickup_placeholder")}
                  value={pickup}
                  onChange={(e) => {
                    setPickup(e.target.value);
                    setShowPickupDropdown(true);
                  }}
                  onFocus={() => setShowPickupDropdown(true)}
                  className="w-full focus:outline-none text-gray-950 font-semibold bg-transparent text-sm"
                />
                
                {showPickupDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-100 dark:border-gray-800 z-[100] p-4 max-h-[250px] overflow-y-auto">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                      {currentLocale === "ru" ? "Место посадки" : currentLocale === "uz" ? "Olish joyi" : "Pick-up Airport"}
                    </h4>
                    <div className="space-y-1">
                      {popularCities
                        .filter(c => 
                          c.name.toLowerCase().includes(pickup.toLowerCase()) || 
                          c.ru.toLowerCase().includes(pickup.toLowerCase()) || 
                          c.uz.toLowerCase().includes(pickup.toLowerCase())
                        )
                        .map((city, idx) => (
                          <div 
                            key={idx}
                            onMouseDown={() => {
                              setPickup(getLocalizedCity(city));
                              setShowPickupDropdown(false);
                            }}
                            className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                          >
                            <FaMapMarkerAlt className="text-gray-400" />
                            <span className="font-bold text-sm text-gray-900 dark:text-white">
                              {getLocalizedCity(city)}
                            </span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )}
              </div>

              {/* Destination Location */}
              <div className="flex-1 flex items-center bg-white px-4 py-3 rounded-sm relative" ref={dropoffRef}>
                <FaTaxi className="text-gray-400 mr-3 text-xl" />
                <input 
                  type="text" 
                  placeholder={t("dropoff_placeholder")}
                  value={dropoff}
                  onChange={(e) => {
                    setDropoff(e.target.value);
                    setShowDropoffDropdown(true);
                  }}
                  onFocus={() => setShowDropoffDropdown(true)}
                  className="w-full focus:outline-none text-gray-950 font-semibold bg-transparent text-sm"
                />

                {showDropoffDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-100 dark:border-gray-800 z-[100] p-4 max-h-[250px] overflow-y-auto">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                      {currentLocale === "ru" ? "Место назначения" : currentLocale === "uz" ? "Qayerga" : "Drop-off Destination"}
                    </h4>
                    <div className="space-y-1">
                      {popularCities
                        .filter(c => 
                          c.name.toLowerCase().includes(dropoff.toLowerCase()) || 
                          c.ru.toLowerCase().includes(dropoff.toLowerCase()) || 
                          c.uz.toLowerCase().includes(dropoff.toLowerCase())
                        )
                        .map((city, idx) => (
                          <div 
                            key={idx}
                            onMouseDown={() => {
                              setDropoff(getLocalizedCity(city));
                              setShowDropoffDropdown(false);
                            }}
                            className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                          >
                            <FaMapMarkerAlt className="text-gray-400" />
                            <span className="font-bold text-sm text-gray-900 dark:text-white">
                              {getLocalizedCity(city)}
                            </span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )}
              </div>

              {/* Date & Time Picker */}
              <div className="flex-1 flex items-center bg-white px-4 py-3 rounded-sm gap-2">
                <FaCalendarAlt className="text-gray-400 mr-2 text-xl" />
                <div className="flex flex-col w-full">
                  <span className="text-[9px] text-gray-400 font-bold uppercase leading-none">{t("date_time")}</span>
                  <div className="flex gap-2 mt-0.5">
                    <input 
                      type="date" 
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="focus:outline-none text-gray-950 font-bold bg-transparent text-xs w-full"
                    />
                    <input 
                      type="time" 
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="focus:outline-none text-gray-950 font-bold bg-transparent text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Passenger Selector */}
              <div className="flex-1 flex items-center bg-white px-4 py-3 rounded-sm cursor-pointer hover:bg-gray-50 relative" ref={passengerRef}>
                <FaUser className="text-gray-400 mr-3 text-xl" />
                <div 
                  className="flex flex-col w-full text-left"
                  onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                >
                  <span className="text-[9px] text-gray-400 font-bold uppercase leading-none">{t("passengers")}</span>
                  <span className="text-gray-950 font-bold text-sm mt-0.5">
                    {passengers} {currentLocale === "ru" ? "пассажира" : currentLocale === "uz" ? "yo'lovchi" : "Passengers"}
                  </span>
                </div>

                {showPassengerDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-100 dark:border-gray-800 z-[100] p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-gray-900 dark:text-white">{t("passengers")}</span>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setPassengers(Math.max(1, passengers - 1))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center font-bold hover:bg-gray-50 text-gray-900"
                        >-</button>
                        <span className="font-bold text-gray-900 dark:text-white">{passengers}</span>
                        <button 
                          onClick={() => setPassengers(Math.min(16, passengers + 1))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center font-bold hover:bg-gray-50 text-gray-900"
                        >+</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button 
                onClick={handleSearch}
                className="bg-[#0071c2] hover:bg-[#005999] text-white text-xl font-bold px-8 py-3 lg:w-auto w-full rounded-sm"
              >
                {t("search")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Available Taxis List */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-24">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t("available_taxis")}</h2>
        
        {loading ? (
          <div className="text-gray-500 font-bold text-lg text-center py-10">Loading taxis...</div>
        ) : filteredTaxis.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center shadow-xs">
            <div className="text-4xl mb-4">🚖</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No suitable transfer found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting the number of passengers to match available vehicles.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTaxis.map((taxi) => {
              const waitTimeLabel = t("wait_time").replace("{time}", taxi.wait_time);
              return (
                <div key={taxi.id} className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition duration-200 flex flex-col h-full">
                  <div className="h-40 bg-gray-200 relative overflow-hidden">
                    <img src={taxi.image} alt={taxi.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 leading-tight">{taxi.name}</h3>
                        <p className="text-xs text-gray-400 font-semibold">{taxi.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 mb-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-1.5"><FaUserFriends className="text-gray-400" /> {taxi.seats} seats</div>
                      <div className="flex items-center gap-1.5"><FaSuitcase className="text-gray-400" /> {taxi.seats} bags</div>
                    </div>

                    <ul className="text-xs font-semibold text-gray-600 dark:text-gray-400 space-y-2 mb-6 border-t border-gray-50 dark:border-gray-700 pt-4 mt-auto">
                      {taxi.free_cancel && (
                        <li className="flex items-center text-green-600 dark:text-green-400"><FaCheck className="mr-2" /> {t("free_cancel")}</li>
                      )}
                      <li className="flex items-center gap-1.5"><FaClock className="text-gray-400" /> {waitTimeLabel}</li>
                    </ul>

                    <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div>
                        <div className="text-xs text-gray-400 font-bold uppercase">{currentLocale === "ru" ? "Цена" : currentLocale === "uz" ? "Narxi" : "Price"}</div>
                        <div className="text-2xl font-extrabold text-gray-900 dark:text-white">
                          {taxi.price.toLocaleString('uz-UZ')} UZS
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleBook(taxi.id)}
                        className="bg-[#0071c2] hover:bg-[#005999] font-extrabold"
                      >
                        {t("book")}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
