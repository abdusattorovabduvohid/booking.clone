"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleToggle = (key: string, value: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (checked) {
      if (key === "stars" || key === "type") {
        const existing = params.get(key) ? params.get(key)!.split(",") : [];
        if (!existing.includes(value)) {
          existing.push(value);
          params.set(key, existing.join(","));
        }
      } else {
        params.set(key, value);
      }
    } else {
      if (key === "stars" || key === "type") {
        const existing = params.get(key) ? params.get(key)!.split(",") : [];
        const filtered = existing.filter(v => v !== value);
        if (filtered.length > 0) {
          params.set(key, filtered.join(","));
        } else {
          params.delete(key);
        }
      } else {
        params.delete(key);
      }
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const isChecked = (key: string, value: string) => {
    if (key === "stars" || key === "type") {
      const existing = searchParams.get(key) ? searchParams.get(key)!.split(",") : [];
      return existing.includes(value);
    }
    return searchParams.get(key) === value;
  };

  return (
    <div className="w-full border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-white dark:bg-gray-900 shadow-sm">
      <h3 className="font-extrabold text-base mb-4 text-gray-900 dark:text-white">Filter by:</h3>
      
      {/* Property Type */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
        <h4 className="font-bold text-sm mb-3 text-gray-900 dark:text-white">Popular filters</h4>
        <div className="flex flex-col space-y-2">
          
          <label className="flex items-center space-x-2.5 cursor-pointer text-xs font-medium text-gray-700 dark:text-gray-300">
            <input 
              type="checkbox" 
              checked={isChecked("type", "Гостиница")}
              onChange={(e) => handleToggle("type", "Гостиница", e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 w-4 h-4" 
            />
            <span>Hotels</span>
          </label>

          <label className="flex items-center space-x-2.5 cursor-pointer text-xs font-medium text-gray-700 dark:text-gray-300">
            <input 
              type="checkbox" 
              checked={isChecked("breakfast", "true")}
              onChange={(e) => handleToggle("breakfast", "true", e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 w-4 h-4" 
            />
            <span>Breakfast included</span>
          </label>

          <label className="flex items-center space-x-2.5 cursor-pointer text-xs font-medium text-gray-700 dark:text-gray-300">
            <input 
              type="checkbox" 
              checked={isChecked("freeCancel", "true")}
              onChange={(e) => handleToggle("freeCancel", "true", e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 w-4 h-4" 
            />
            <span>Free cancellation</span>
          </label>

        </div>
      </div>

      {/* Property Rating Stars */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
        <h4 className="font-bold text-sm mb-3 text-gray-900 dark:text-white">Property rating</h4>
        <div className="flex flex-col space-y-2">
          {["5", "4", "3", "2", "1"].map((star) => (
            <label key={star} className="flex items-center space-x-2.5 cursor-pointer text-xs font-medium text-gray-700 dark:text-gray-300">
              <input 
                type="checkbox" 
                checked={isChecked("stars", star)}
                onChange={(e) => handleToggle("stars", star, e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 w-4 h-4" 
              />
              <span>{star} stars</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price budget */}
      <div className="mb-2">
        <h4 className="font-bold text-sm mb-3 text-gray-900 dark:text-white">Your budget (per night)</h4>
        <div className="flex flex-col space-y-2">
          
          <label className="flex items-center space-x-2.5 cursor-pointer text-xs font-medium text-gray-700 dark:text-gray-300">
            <input 
              type="checkbox" 
              checked={isChecked("priceRange", "0-600000")}
              onChange={(e) => handleToggle("priceRange", "0-600000", e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 w-4 h-4" 
            />
            <span>0 UZS - 600,000 UZS</span>
          </label>

          <label className="flex items-center space-x-2.5 cursor-pointer text-xs font-medium text-gray-700 dark:text-gray-300">
            <input 
              type="checkbox" 
              checked={isChecked("priceRange", "600000-1200000")}
              onChange={(e) => handleToggle("priceRange", "600000-1200000", e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 w-4 h-4" 
            />
            <span>600,000 UZS - 1,200,000 UZS</span>
          </label>

          <label className="flex items-center space-x-2.5 cursor-pointer text-xs font-medium text-gray-700 dark:text-gray-300">
            <input 
              type="checkbox" 
              checked={isChecked("priceRange", "1200000-3000000")}
              onChange={(e) => handleToggle("priceRange", "1200000-3000000", e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 w-4 h-4" 
            />
            <span>1,200,000 UZS - 3,000,000 UZS</span>
          </label>

          <label className="flex items-center space-x-2.5 cursor-pointer text-xs font-medium text-gray-700 dark:text-gray-300">
            <input 
              type="checkbox" 
              checked={isChecked("priceRange", "3000000-99999999")}
              onChange={(e) => handleToggle("priceRange", "3000000-99999999", e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 w-4 h-4" 
            />
            <span>3,000,000 UZS +</span>
          </label>

        </div>
      </div>
    </div>
  );
}
