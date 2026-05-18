import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { Hotel } from "@/lib/api/hotels";
import { FaStar, FaRegSmile } from "react-icons/fa";
import { FavoriteButton } from "@/components/shared/FavoriteButton";

export function PropertyCard({ property }: { property: Hotel }) {
  const images = property.images && property.images.length > 0 
    ? property.images 
    : [property.image || "https://picsum.photos/seed/hotel/400/300"];

  return (
    <div className="flex flex-col md:flex-row border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden mb-4 p-4 gap-4 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition">
      
      {/* Photo Column */}
      <div className="w-full md:w-1/3 h-52 md:h-60 rounded-lg overflow-hidden relative flex-shrink-0">
        <img src={images[0]} alt={property.name} className="w-full h-full object-cover" />
        <FavoriteButton id={property.id} className="absolute top-2 right-2 z-10" />
        {property.genius && (
          <span className="absolute top-2 left-2 bg-[#003580] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
            Genius
          </span>
        )}
      </div>

      {/* Details Column */}
      <div className="w-full md:w-2/3 flex flex-col justify-between">
        
        <div>
          {/* Header Title & Rating */}
          <div className="flex justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-[10px] font-bold px-2 py-0.5 rounded">
                  {property.type}
                </span>
                <div className="flex text-yellow-400 text-xs">
                  {Array(Math.max(1, property.stars)).fill(0).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
              
              <h3 className="text-lg md:text-xl font-extrabold text-blue-600 dark:text-blue-400 hover:text-blue-800 transition mt-1.5 leading-tight">
                <Link href={`/property/${property.id}`}>{property.name}</Link>
              </h3>

              <p className="text-xs text-blue-600 underline mt-1 cursor-pointer">
                {property.city}, {property.country} {property.distance && `— ${property.distance}`}
              </p>
            </div>

            {/* Rating Badge */}
            <div className="flex flex-col items-end flex-shrink-0">
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xs text-gray-900 dark:text-white hidden sm:inline">
                  {property.ratingLabel}
                </span>
                <div className="bg-[#003B95] text-white font-extrabold rounded-t-md rounded-br-md rounded-bl-sm px-2 py-1 text-xs">
                  {property.rating}
                </div>
              </div>
              <span className="text-[10px] text-gray-500 mt-1">
                {property.reviews.toLocaleString("en-US")} reviews
              </span>
            </div>
          </div>

          {/* Description Snippet */}
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 line-clamp-2 leading-relaxed">
            {property.description}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2 mt-4">
            {property.freeCancel && (
              <span className="text-[10px] font-bold text-green-700 dark:text-green-500 bg-green-50 dark:bg-green-950/10 px-2 py-1 rounded">
                ✔ Free cancellation
              </span>
            )}
            {property.noPrep && (
              <span className="text-[10px] font-bold text-green-700 dark:text-green-500 bg-green-50 dark:bg-green-950/10 px-2 py-1 rounded">
                ✔ No prepayment needed
              </span>
            )}
            {property.breakfast && (
              <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">
                🍳 Breakfast included
              </span>
            )}
          </div>
        </div>

        {/* Pricing CTA Column */}
        <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="text-[10px] text-red-600 font-extrabold">
            Only 3 rooms left at this price on our site
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-500">1 night, 2 adults</span>
            <span className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white">
              {property.price.toLocaleString("uz-UZ")} UZS
            </span>
            <span className="text-[9px] text-gray-400 mt-0.5">Includes taxes & charges</span>
            
            <Link href={`/property/${property.id}`} className="mt-2.5">
              <Button className="bg-[#006ce4] hover:bg-[#0057b8] text-white font-extrabold text-xs px-4 py-2 rounded">
                See availability
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
