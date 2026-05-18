"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("personal");
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "bookings") {
      setActiveTab("bookings");
    }
  }, [searchParams]);

  useEffect(() => {
    const saved = localStorage.getItem("my_bookings");

    if (saved) {
      setBookings(JSON.parse(saved));
    } else {
      setBookings([
        {
          hotelName: "Hilton Tashkent City",
          city: "Ташкент",
          country: "Узбекистан",
          price: 1845000,
          image: "https://picsum.photos/seed/hilton/300/200",
          dates: "12 октября 2026 г. - 14 октября 2026 г.",
          guests: "2 взрослых"
        }
      ]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
            <ul className="flex flex-col">
              <li 
                className={`px-6 py-4 cursor-pointer font-medium hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800 ${activeTab === "personal" ? "text-[#0071c2] border-l-4 border-l-[#0071c2] bg-blue-50/50 dark:bg-gray-800" : "text-gray-700 dark:text-gray-300"}`}
                onClick={() => setActiveTab("personal")}
              >
                Personal details
              </li>
              <li 
                className={`px-6 py-4 cursor-pointer font-medium hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800 ${activeTab === "preferences" ? "text-[#0071c2] border-l-4 border-l-[#0071c2] bg-blue-50/50 dark:bg-gray-800" : "text-gray-700 dark:text-gray-300"}`}
                onClick={() => setActiveTab("preferences")}
              >
                Preferences
              </li>
              <li 
                className={`px-6 py-4 cursor-pointer font-medium hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800 ${activeTab === "security" ? "text-[#0071c2] border-l-4 border-l-[#0071c2] bg-blue-50/50 dark:bg-gray-800" : "text-gray-700 dark:text-gray-300"}`}
                onClick={() => setActiveTab("security")}
              >
                Security
              </li>
              <li 
                className={`px-6 py-4 cursor-pointer font-medium hover:bg-gray-50 dark:hover:bg-gray-800 ${activeTab === "bookings" ? "text-[#0071c2] border-l-4 border-l-[#0071c2] bg-blue-50/50 dark:bg-gray-800" : "text-gray-700 dark:text-gray-300"}`}
                onClick={() => setActiveTab("bookings")}
              >
                Manage bookings
              </li>
            </ul>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-3/4">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
            {activeTab === "personal" && (
              <div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Personal details</h2>
                <p className="text-gray-500 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">Update your information and find out how it's used.</p>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Name</h4>
                      <p className="text-gray-500 mt-1">John Doe</p>
                    </div>
                    <Button variant="ghost" className="text-[#0071c2] font-semibold hover:bg-blue-50">Edit</Button>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Email address</h4>
                      <p className="text-gray-500 mt-1">john.doe@example.com</p>
                    </div>
                    <Button variant="ghost" className="text-[#0071c2] font-semibold hover:bg-blue-50">Edit</Button>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Phone number</h4>
                      <p className="text-gray-500 mt-1">Add your phone number</p>
                    </div>
                    <Button variant="ghost" className="text-[#0071c2] font-semibold hover:bg-blue-50">Add</Button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "preferences" && (
              <div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Preferences</h2>
                <p className="text-gray-500 mb-8">Change your language, currency and accessibility requirements.</p>
              </div>
            )}
            
            {activeTab === "security" && (
              <div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Security</h2>
                <p className="text-gray-500 mb-8">Adjust your security settings and set up two-factor authentication.</p>
              </div>
            )}

            {activeTab === "bookings" && (
              <div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Manage Bookings</h2>
                <p className="text-gray-500 mb-8">View and manage your upcoming and past bookings.</p>
                
                <div className="space-y-4">
                  {bookings.map((booking, idx) => (
                    <div key={idx} className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center border border-blue-100 dark:border-gray-800">
                      <div className="flex gap-4">
                        <img src={booking.image} className="w-16 h-16 rounded object-cover" alt="" />
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white text-base">{booking.hotelName}</h3>
                          <p className="text-xs text-gray-500 mt-1">{booking.city}, {booking.country}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium">{booking.dates} • {booking.guests}</p>
                          <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-1.5">{booking.price.toLocaleString("uz-UZ")} UZS</p>
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded dark:bg-green-950/40 dark:text-green-400 self-start sm:self-auto">
                        Upcoming
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
