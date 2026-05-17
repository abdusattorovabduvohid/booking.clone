import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";

interface Property {
  id: string;
  title: string;
  city: string;
  country: string;
  type: string;
  rating: number;
  pricePerNight: number;
  images: string[];
}

export function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="flex flex-col md:flex-row border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-4 p-4 gap-4 bg-white dark:bg-gray-800">
      <div className="w-full md:w-1/3 h-56 rounded-lg overflow-hidden">
        <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
      </div>
      <div className="w-full md:w-2/3 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 transition">
              <Link href={`/property/${property.id}`}>{property.title}</Link>
            </h3>
            <div className="flex flex-col items-end">
              <div className="flex items-center space-x-2">
                <span className="font-semibold hidden sm:inline">
                  {property.rating >= 4.5 ? "Exceptional" : "Very Good"}
                </span>
                <div className="bg-[#003B95] text-white font-bold rounded-t-md rounded-br-md rounded-bl-sm px-2 py-1 text-sm">
                  {property.rating}
                </div>
              </div>
              <span className="text-xs text-gray-500 mt-1">120 reviews</span>
            </div>
          </div>
          <div className="text-sm text-blue-600 underline mt-1 cursor-pointer">
            {property.city}, {property.country}
          </div>
          <div className="text-sm mt-2 text-gray-700 dark:text-gray-300">{property.type}</div>
          <div className="text-xs text-green-700 dark:text-green-500 font-bold mt-2">
            Free cancellation
          </div>
        </div>
        
        <div className="flex justify-between items-end mt-4">
          <div className="text-xs text-red-600 font-medium">Only 2 rooms left at this price on our site</div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500">2 nights, 2 adults</span>
            <span className="text-2xl font-bold">${property.pricePerNight * 2}</span>
            <span className="text-xs text-gray-500 mb-2">+US$32 taxes and charges</span>
            <Link href={`/property/${property.id}`}>
              <Button>See availability</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
