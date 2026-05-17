"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white dark:bg-gray-800 rounded-sm shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <ul className="flex flex-col">
              <li 
                className={`px-6 py-4 cursor-pointer font-medium hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 ${activeTab === "personal" ? "text-[#0071c2] border-l-4 border-l-[#0071c2] bg-blue-50/50 dark:bg-gray-700" : "text-gray-700 dark:text-gray-300"}`}
                onClick={() => setActiveTab("personal")}
              >
                Personal details
              </li>
              <li 
                className={`px-6 py-4 cursor-pointer font-medium hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 ${activeTab === "preferences" ? "text-[#0071c2] border-l-4 border-l-[#0071c2] bg-blue-50/50 dark:bg-gray-700" : "text-gray-700 dark:text-gray-300"}`}
                onClick={() => setActiveTab("preferences")}
              >
                Preferences
              </li>
              <li 
                className={`px-6 py-4 cursor-pointer font-medium hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 ${activeTab === "security" ? "text-[#0071c2] border-l-4 border-l-[#0071c2] bg-blue-50/50 dark:bg-gray-700" : "text-gray-700 dark:text-gray-300"}`}
                onClick={() => setActiveTab("security")}
              >
                Security
              </li>
              <li 
                className={`px-6 py-4 cursor-pointer font-medium hover:bg-gray-50 dark:hover:bg-gray-700 ${activeTab === "bookings" ? "text-[#0071c2] border-l-4 border-l-[#0071c2] bg-blue-50/50 dark:bg-gray-700" : "text-gray-700 dark:text-gray-300"}`}
                onClick={() => setActiveTab("bookings")}
              >
                Manage bookings
              </li>
            </ul>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-3/4">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-sm shadow-sm border border-gray-200 dark:border-gray-700">
            {activeTab === "personal" && (
              <div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Personal details</h2>
                <p className="text-gray-500 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">Update your information and find out how it's used.</p>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Name</h4>
                      <p className="text-gray-500 mt-1">John Doe</p>
                    </div>
                    <Button variant="ghost" className="text-[#0071c2] font-semibold hover:bg-blue-50">Edit</Button>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-6">
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
                {/* Preference settings would go here */}
              </div>
            )}
            
            {activeTab === "security" && (
              <div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Security</h2>
                <p className="text-gray-500 mb-8">Adjust your security settings and set up two-factor authentication.</p>
                {/* Security settings would go here */}
              </div>
            )}

            {activeTab === "bookings" && (
              <div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Manage Bookings</h2>
                <p className="text-gray-500 mb-8">View and manage your upcoming and past bookings.</p>
                {/* Booking list would go here */}
                <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-md flex justify-between items-center border border-blue-100 dark:border-gray-600">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Hilton Tashkent City</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Oct 12, 2026 - Oct 14, 2026</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Upcoming</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
