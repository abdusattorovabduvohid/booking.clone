export function Footer() {
  return (
    <footer className="bg-[#003B95] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 mb-8">
          <button className="bg-transparent border border-white rounded-sm px-4 py-2 text-sm font-semibold hover:bg-white/10 transition">
            List your property
          </button>
          <div className="w-full border-t border-white/20 my-4"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          <div className="flex flex-col space-y-3">
            <a href="#" className="hover:underline">Countries</a>
            <a href="#" className="hover:underline">Regions</a>
            <a href="#" className="hover:underline">Cities</a>
            <a href="#" className="hover:underline">Districts</a>
            <a href="#" className="hover:underline">Airports</a>
            <a href="#" className="hover:underline">Hotels</a>
          </div>
          <div className="flex flex-col space-y-3">
            <a href="#" className="hover:underline">Homes</a>
            <a href="#" className="hover:underline">Apartments</a>
            <a href="#" className="hover:underline">Resorts</a>
            <a href="#" className="hover:underline">Villas</a>
            <a href="#" className="hover:underline">Hostels</a>
            <a href="#" className="hover:underline">B&Bs</a>
          </div>
          <div className="flex flex-col space-y-3">
            <a href="#" className="hover:underline">Unique places to stay</a>
            <a href="#" className="hover:underline">All destinations</a>
            <a href="#" className="hover:underline">All flight destinations</a>
            <a href="#" className="hover:underline">All car rental locations</a>
            <a href="#" className="hover:underline">Discover</a>
            <a href="#" className="hover:underline">Reviews</a>
          </div>
          <div className="flex flex-col space-y-3">
            <a href="#" className="hover:underline">Car rental</a>
            <a href="#" className="hover:underline">Flight finder</a>
            <a href="#" className="hover:underline">Restaurant reservations</a>
            <a href="#" className="hover:underline">Booking.com for Travel Agents</a>
          </div>
          <div className="flex flex-col space-y-3">
            <a href="#" className="hover:underline">Coronavirus (COVID-19) FAQs</a>
            <a href="#" className="hover:underline">About Booking.com</a>
            <a href="#" className="hover:underline">Customer Service Help</a>
            <a href="#" className="hover:underline">Partner help</a>
            <a href="#" className="hover:underline">Careers</a>
            <a href="#" className="hover:underline">Sustainability</a>
            <a href="#" className="hover:underline">Press center</a>
            <a href="#" className="hover:underline">Safety Resource Center</a>
            <a href="#" className="hover:underline">Investor relations</a>
            <a href="#" className="hover:underline">Terms & conditions</a>
          </div>
        </div>

        <div className="mt-16 text-center text-xs text-white/70 flex flex-col items-center">
          <p className="mb-4">Copyright © 1996–2026 Booking.com™. All rights reserved.</p>
          <p className="max-w-2xl text-center">
            Booking.com is part of Booking Holdings Inc., the world leader in online travel and related services.
          </p>
        </div>
      </div>
    </footer>
  );
}
