"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt, FaUser } from "react-icons/fa";
import { Flight } from "@/lib/mocks/flights";

interface FlightSearchResultsListProps {
  initialFlights: Flight[];
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  adults: string;
  cabin: string;
  tSearch: string;
  tCheapest: string;
  tBest: string;
  tQuickest: string;
  tOtherSort: string;
  tSelect: string;
  tLite: string;
  tStops: string;
  tNonstop: string;
  tOneStop: string;
  tTwoStops: string;
  tImportantMessages: string;
  tInfantWarning: string;
  tSmartFilters: string;
  tAiPowered: string;
  tFilterFlights: string;
  tNoFlightsMatch: string;
  tAdjustFilters: string;
}

export function FlightSearchResultsList({
  initialFlights,
  from,
  to,
  departDate,
  returnDate,
  adults,
  cabin,
  tSearch,
  tCheapest,
  tBest,
  tQuickest,
  tOtherSort,
  tSelect,
  tLite,
  tStops,
  tNonstop,
  tOneStop,
  tTwoStops,
  tImportantMessages,
  tInfantWarning,
  tSmartFilters,
  tAiPowered,
  tFilterFlights,
  tNoFlightsMatch,
  tAdjustFilters,
}: FlightSearchResultsListProps) {
  // Sort State
  const [sortBy, setSortBy] = useState<"best" | "cheapest" | "quickest">("best");
  
  // Filter States
  const [filterNonstop, setFilterNonstop] = useState(true);
  const [filterOneStop, setFilterOneStop] = useState(true);
  const [filterTwoStops, setFilterTwoStops] = useState(true);

  // Search input fields
  const [fromVal, setFromVal] = useState(from || "Tashkent (TAS)");
  const [toVal, setToVal] = useState(to || "Dubai (DXB)");
  const [departVal, setDepartVal] = useState(departDate || "2026-06-01");
  const [returnVal, setReturnVal] = useState(returnDate || "2026-06-08");

  // Helper to parse duration string (e.g., "4h 40m", "24h 25m") to total minutes for sorting
  const parseDurationToMinutes = (durationStr: string): number => {
    if (!durationStr) return 0;
    const hMatch = durationStr.match(/(\d+)h/);
    const mMatch = durationStr.match(/(\d+)m/);
    const hours = hMatch ? parseInt(hMatch[1]) : 0;
    const minutes = mMatch ? parseInt(mMatch[1]) : 0;
    return hours * 60 + minutes;
  };

  // Process flights list: filter and then sort
  const processedFlights = useMemo(() => {
    // 1. Filter
    let filtered = initialFlights.filter((flight) => {
      const stopsStr = (flight.out.stops || "").toLowerCase();
      if (stopsStr.includes("nonstop") && !filterNonstop) return false;
      if (stopsStr.includes("1 stop") && !filterOneStop) return false;
      if ((stopsStr.includes("2 stops") || stopsStr.includes("2+ stops") || stopsStr.includes("stop")) && !stopsStr.includes("nonstop") && !stopsStr.includes("1 stop") && !filterTwoStops) return false;
      return true;
    });

    // 2. Sort
    return [...filtered].sort((a, b) => {
      if (sortBy === "cheapest") {
        return a.price - b.price;
      }
      if (sortBy === "quickest") {
        const durationA = parseDurationToMinutes(a.out.duration) + parseDurationToMinutes(a.back.duration);
        const durationB = parseDurationToMinutes(b.out.duration) + parseDurationToMinutes(b.back.duration);
        return durationA - durationB;
      }
      // "best": custom score combining price and total duration
      const durationA = parseDurationToMinutes(a.out.duration) + parseDurationToMinutes(a.back.duration);
      const durationB = parseDurationToMinutes(b.out.duration) + parseDurationToMinutes(b.back.duration);
      
      const scoreA = a.price + durationA * 2000;
      const scoreB = b.price + durationB * 2000;
      return scoreA - scoreB;
    });
  }, [initialFlights, sortBy, filterNonstop, filterOneStop, filterTwoStops]);

  // Formatted date string for display
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", { weekday: "short", month: "numeric", day: "numeric" });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="w-full">
      {/* Yellow Header */}
      <div className="bg-[#febb02] px-4 md:px-8 py-3 mb-6 shadow-sm rounded-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-2">
          <div className="flex-1 flex items-center bg-white px-4 py-2 rounded-sm border border-gray-300">
            <input 
              type="text" 
              value={fromVal} 
              onChange={(e) => setFromVal(e.target.value)}
              className="w-full focus:outline-none text-gray-900 font-medium text-sm" 
            />
          </div>
          <div 
            onClick={() => {
              const temp = fromVal;
              setFromVal(toVal);
              setToVal(temp);
            }}
            className="flex items-center justify-center bg-white px-3 rounded-sm border border-gray-300 cursor-pointer hover:bg-gray-50 active:scale-95 transition-all select-none font-bold text-gray-700"
          >
            ⇄
          </div>
          <div className="flex-1 flex items-center bg-white px-4 py-2 rounded-sm border border-gray-300">
            <input 
              type="text" 
              value={toVal} 
              onChange={(e) => setToVal(e.target.value)}
              className="w-full focus:outline-none text-gray-900 font-medium text-sm" 
            />
          </div>
          <div className="flex-1 flex items-center bg-white px-4 py-2 rounded-sm border border-gray-300 relative cursor-pointer">
            <FaCalendarAlt className="text-gray-400 mr-2 text-sm" />
            <input 
              type="date" 
              value={departVal}
              onChange={(e) => setDepartVal(e.target.value)}
              className="focus:outline-none text-gray-900 font-medium text-sm w-full bg-transparent cursor-pointer"
            />
          </div>
          <div className="flex-1 flex items-center bg-white px-4 py-2 rounded-sm border border-gray-300 relative cursor-pointer">
            <FaCalendarAlt className="text-gray-400 mr-2 text-sm" />
            <input 
              type="date" 
              value={returnVal}
              onChange={(e) => setReturnVal(e.target.value)}
              className="focus:outline-none text-gray-900 font-medium text-sm w-full bg-transparent cursor-pointer"
            />
          </div>
          <Button className="bg-[#0071c2] hover:bg-[#005999] text-white font-bold px-6 py-2 rounded-sm transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
            {tSearch}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 flex-shrink-0 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-1.5">
              ✨ {tSmartFilters}
            </h3>
            <p className="text-xs text-gray-500 mb-4">{tAiPowered}</p>
            <textarea 
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white" 
              placeholder="What are you looking for?"
              rows={4}
            />
            <Button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 cursor-pointer">{tFilterFlights}</Button>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
             <h4 className="font-extrabold text-sm text-gray-900 dark:text-white mb-3 uppercase tracking-wider">{tStops}</h4>
             <div className="space-y-2">
               <label className="flex items-center text-sm cursor-pointer select-none text-gray-700 dark:text-gray-300">
                 <input 
                   type="checkbox" 
                   checked={filterNonstop} 
                   onChange={(e) => setFilterNonstop(e.target.checked)}
                   className="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4" 
                 />
                 <span>{tNonstop}</span>
               </label>
               <label className="flex items-center text-sm cursor-pointer select-none text-gray-700 dark:text-gray-300">
                 <input 
                   type="checkbox" 
                   checked={filterOneStop} 
                   onChange={(e) => setFilterOneStop(e.target.checked)}
                   className="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4" 
                 />
                 <span>{tOneStop}</span>
               </label>
               <label className="flex items-center text-sm cursor-pointer select-none text-gray-700 dark:text-gray-300">
                 <input 
                   type="checkbox" 
                   checked={filterTwoStops} 
                   onChange={(e) => setFilterTwoStops(e.target.checked)}
                   className="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4" 
                 />
                 <span>{tTwoStops}</span>
               </label>
             </div>
          </div>
        </aside>

        {/* Results */}
        <div className="w-full md:w-3/4">
          
          <div className="bg-[#ebf3ff] border border-blue-200 p-4 rounded-lg mb-6 flex items-start">
            <span className="text-blue-600 mr-3 mt-0.5">ℹ️</span>
            <div>
              <p className="font-bold text-sm text-gray-900 mb-1">{tImportantMessages}</p>
              <p className="text-sm text-gray-700">{tInfantWarning}</p>
            </div>
          </div>

          {/* Dynamic Sort Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
            <button 
              onClick={() => setSortBy("cheapest")}
              className={`flex-1 text-left py-3 px-5 border-b-2 transition-all duration-200 cursor-pointer ${
                sortBy === "cheapest" 
                  ? "border-[#0071c2] bg-blue-50/50 dark:bg-blue-900/10 font-bold" 
                  : "border-transparent hover:bg-gray-50/50 dark:hover:bg-gray-700/30"
              }`}
            >
              <div className={`text-sm ${sortBy === "cheapest" ? "text-[#0071c2]" : "text-gray-900 dark:text-white"}`}>{tCheapest}</div>
              <div className="text-xs text-gray-500 font-semibold mt-0.5">
                {initialFlights.length > 0 ? `${Math.min(...initialFlights.map(f => f.price)).toLocaleString('uz-UZ')} UZS` : '—'}
              </div>
            </button>
            
            <button 
              onClick={() => setSortBy("best")}
              className={`flex-1 text-left py-3 px-5 border-b-2 transition-all duration-200 cursor-pointer ${
                sortBy === "best" 
                  ? "border-[#0071c2] bg-blue-50/50 dark:bg-blue-900/10 font-bold" 
                  : "border-transparent hover:bg-gray-50/50 dark:hover:bg-gray-700/30"
              }`}
            >
              <div className={`text-sm ${sortBy === "best" ? "text-[#0071c2]" : "text-gray-900 dark:text-white"}`}>{tBest}</div>
              <div className="text-xs text-gray-500 font-semibold mt-0.5">
                {initialFlights.length > 0 ? `${(Math.min(...initialFlights.map(f => f.price)) * 1.05).toLocaleString('uz-UZ')} UZS` : '—'}
              </div>
            </button>
            
            <button 
              onClick={() => setSortBy("quickest")}
              className={`flex-1 text-left py-3 px-5 border-b-2 transition-all duration-200 cursor-pointer ${
                sortBy === "quickest" 
                  ? "border-[#0071c2] bg-blue-50/50 dark:bg-blue-900/10 font-bold" 
                  : "border-transparent hover:bg-gray-50/50 dark:hover:bg-gray-700/30"
              }`}
            >
              <div className={`text-sm ${sortBy === "quickest" ? "text-[#0071c2]" : "text-gray-900 dark:text-white"}`}>{tQuickest}</div>
              <div className="text-xs text-gray-500 font-semibold mt-0.5">
                {initialFlights.length > 0 ? `${(Math.max(...initialFlights.map(f => f.price)) * 0.95).toLocaleString('uz-UZ')} UZS` : '—'}
              </div>
            </button>
            
            <div className="px-5 text-gray-500 font-medium text-sm flex items-center select-none border-l border-gray-100 dark:border-gray-700">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path></svg>
              {tOtherSort}
            </div>
          </div>

          {/* Flights list */}
          <div className="space-y-4 transition-all duration-300">
            {processedFlights.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-200 dark:border-gray-700">
                <span className="text-4xl block mb-3">✈️</span>
                <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">{tNoFlightsMatch}</h3>
                <p className="text-sm text-gray-500">{tAdjustFilters}</p>
              </div>
            ) : (
              processedFlights.map((flight) => (
                <div 
                  key={flight.id} 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row overflow-hidden group transform hover:translate-y-[-1px]"
                >
                  <div className="flex-1 p-5 border-b sm:border-b-0 sm:border-r border-gray-100 dark:border-gray-700">
                    
                    {/* Outbound */}
                    <div className="flex items-center mb-6">
                      <img 
                        src={`https://picsum.photos/seed/${flight.out.airlineCode || "airline"}/40/40`} 
                        className="w-8 h-8 rounded-full object-cover mr-4 border border-gray-100 dark:border-gray-700" 
                        alt={flight.out.airline} 
                      />
                      <div className="flex-1 flex flex-col xs:flex-row justify-between xs:items-center gap-3 xs:gap-4">
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white text-base">{flight.out.dep} — {flight.out.arr}</div>
                          <div className="text-xs text-gray-500 font-semibold">{flight.out.airline}</div>
                        </div>
                        <div className="text-left xs:text-center">
                          <div className="text-xs font-bold px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 inline-block">{flight.out.stops}</div>
                        </div>
                        <div className="text-left xs:text-right">
                          <div className="text-sm font-bold text-gray-900 dark:text-white">{flight.out.duration}</div>
                          <div className="text-xs text-gray-400 font-bold">{flight.out.route}</div>
                        </div>
                      </div>
                    </div>

                    {/* Return */}
                    <div className="flex items-center">
                      <img 
                        src={`https://picsum.photos/seed/${flight.back.airlineCode || "airline2"}/40/40`} 
                        className="w-8 h-8 rounded-full object-cover mr-4 border border-gray-100 dark:border-gray-700" 
                        alt={flight.back.airline} 
                      />
                      <div className="flex-1 flex flex-col xs:flex-row justify-between xs:items-center gap-3 xs:gap-4">
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white text-base">{flight.back.dep} — {flight.back.arr}</div>
                          <div className="text-xs text-gray-500 font-semibold">{flight.back.airline}</div>
                        </div>
                        <div className="text-left xs:text-center">
                          <div className="text-xs font-bold px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 inline-block">{flight.back.stops}</div>
                        </div>
                        <div className="text-left xs:text-right">
                          <div className="text-sm font-bold text-gray-900 dark:text-white">{flight.back.duration}</div>
                          <div className="text-xs text-gray-400 font-bold">{flight.back.route}</div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Pricing / Booking button panel */}
                  <div className="w-full sm:w-[220px] p-5 flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900/30">
                    <div className="flex flex-col items-start w-full mb-4">
                      <div className="text-2xl font-black text-gray-900 dark:text-white tracking-tight group-hover:text-blue-600 transition-colors">
                        {flight.price.toLocaleString('uz-UZ')} UZS
                      </div>
                      <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mt-0.5">{tLite}</div>
                      <span className="text-[10px] px-1.5 py-0.5 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 rounded font-bold uppercase mt-2">{cabin || "Economy"}</span>
                    </div>
                    <Button className="w-full bg-[#0071c2] hover:bg-[#005999] text-white font-extrabold h-11 rounded transition-all duration-200 transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer shadow-sm">
                      {tSelect}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
