"use client";

export function FilterSidebar() {
  return (
    <div className="w-full border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <h3 className="font-bold text-lg mb-4">Filter by:</h3>
      
      {/* Popular Filters */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h4 className="font-bold mb-3">Popular filters</h4>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm">Hotels</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm">Breakfast included</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm">Free cancellation</span>
          </label>
        </div>
      </div>

      {/* Property Rating */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h4 className="font-bold mb-3">Property rating</h4>
        <div className="flex flex-col space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <label key={star} className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-sm">{star} stars</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <h4 className="font-bold mb-3">Your budget (per night)</h4>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm">US$0 - US$50</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm">US$50 - US$100</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm">US$100 - US$200</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm">US$200 +</span>
          </label>
        </div>
      </div>
    </div>
  );
}
