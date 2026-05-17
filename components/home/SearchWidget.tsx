"use client";
import { useState } from "react";
import { FaBed, FaCalendarAlt, FaUser } from "react-icons/fa";
import { Button } from "@/components/ui/Button";

export function SearchWidget() {
  return (
    <div className="bg-[#febb02] p-1 rounded-lg shadow-lg w-full max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-1">
        
        {/* Destination Input */}
        <div className="flex-1 flex items-center bg-white px-4 py-3 rounded-sm">
          <FaBed className="text-gray-400 mr-3 text-xl" />
          <input 
            type="text" 
            placeholder="Where are you going?" 
            className="w-full focus:outline-none text-gray-900 font-medium placeholder-gray-500"
          />
        </div>

        {/* Dates Input */}
        <div className="flex-1 flex items-center bg-white px-4 py-3 rounded-sm cursor-pointer hover:bg-gray-50">
          <FaCalendarAlt className="text-gray-400 mr-3 text-xl" />
          <div className="flex items-center text-gray-500 font-medium whitespace-nowrap">
            <span>Check-in date</span>
            <span className="mx-2">—</span>
            <span>Check-out date</span>
          </div>
        </div>

        {/* Guests & Rooms Input */}
        <div className="flex-1 flex items-center bg-white px-4 py-3 rounded-sm cursor-pointer hover:bg-gray-50">
          <FaUser className="text-gray-400 mr-3 text-xl" />
          <span className="text-gray-900 font-medium whitespace-nowrap">
            2 adults · 0 children · 1 room
          </span>
        </div>

        {/* Search Button */}
        <Button className="bg-[#0071c2] hover:bg-[#005999] text-white text-xl font-bold px-8 py-3 lg:w-auto w-full rounded-sm">
          Search
        </Button>
      </div>
    </div>
  );
}
