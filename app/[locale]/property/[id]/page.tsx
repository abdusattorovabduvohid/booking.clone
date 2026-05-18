import { setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { notFound } from "next/navigation";
import { getHotelById } from "@/lib/api/hotels";
import { getMockHotels } from "@/lib/mocks/hotels";
import { Link } from "@/i18n/routing";
import { PropertyNavBar } from "@/components/second/property/PropertyNavBar";
import { PropertyActionButtons } from "@/components/second/property/PropertyActionButtons";
import { 
  FaBed, 
  FaCalendarAlt, 
  FaUser, 
  FaShareAlt, 
  FaHeart, 
  FaChevronDown, 
  FaMapMarkerAlt, 
  FaWifi, 
  FaCoffee, 
  FaShuttleVan, 
  FaUtensils, 
  FaUserFriends, 
  FaRegCheckCircle, 
  FaStar, 
  FaChevronRight, 
  FaRegSmile, 
  FaInfoCircle 
} from "react-icons/fa";

export const revalidate = 3600;

export async function generateStaticParams() {
  const locales = ["en", "ru", "uz"];
  const hotels = getMockHotels("all");
  
  const params: Array<{ locale: string; id: string }> = [];
  for (const locale of locales) {
    for (const hotel of hotels) {
      params.push({
        locale,
        id: String(hotel.id),
      });
    }
  }
  return params;
}

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function PropertyPage({ params }: PageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const property = await getHotelById(id);

  if (!property) {
    notFound();
  }

  const localMap: any = {
    ru: {
      overview: "Обзор",
      info: "Информация о варианте и стоимости",
      facilities: "Удобства и услуги",
      rules: "Условия размещения",
      important: "Важная/правовая информация",
      reviewsCount: (n: number) => `Отзывы гостей (${n})`,
      showOnMap: "показать на карте",
      reserve: "Забронировать",
      advantages: "Преимущества этого варианта",
      breakfast: "Превосходный завтрак",
      breakfastDesc: "Континентальный",
      wifi: "Великолепный бесплатный Wi-Fi",
      wifiDesc: "Оценка гостей: 9.7",
      transfer: "Трансфер",
      transferDesc: "Трансфер от/до аэропорта",
      kitchen: "Собственная кухня",
      kitchenDesc: "Мини-кухня, Электрическая плита",
      geniusTitle: "Ваши Genius-вознаграждения 1-го уровня",
      geniusDesc: "Доступно для ряда вариантов: Скидка 13% применяется к цене без учета налогов и сборов.",
      popularFacilities: "Самые популярные удобства и услуги",
      availability: "Наличие мест",
      roomType: "Тип апартаментов",
      guests: "Число гостей",
      price: "Сегодняшняя цена",
      options: "Варианты тарифов",
      selectRoom: "Выберите апартаменты",
      reserveBtn: "Я бронирую",
      reserveInfo: "Процесс займет всего 2 минуты. Вы пока ничего не платите",
      reviewsTitle: "Отзывы гостей",
      staff: "Персонал",
      cleanliness: "Чистота",
      comfort: "Комфорт",
      value: "Соотношение цена/качество",
      facilitiesLabel: "Удобства",
      locationLabel: "Расположение",
      wifiLabel: "Бесплатный Wi-Fi",
      morePhotos: (n: number) => `+${n} фотографий`,
      onlyXLeft: (n: number) => `У нас осталось всего ${n} номера`,
      geniusDiscount: "Genius-скидка 13% применяется",
      freeCancel: "Бесплатная отмена",
      noPrep: "Предоплата не требуется",
      bestLocation: "Великолепное расположение",
      readAllReviews: "Читать все отзывы",
      checkAvailability: "Изменить параметры поиска"
    },
    en: {
      overview: "Overview",
      info: "Info & prices",
      facilities: "Facilities & amenities",
      rules: "House rules",
      important: "Important info",
      reviewsCount: (n: number) => `Guest reviews (${n})`,
      showOnMap: "show on map",
      reserve: "Reserve",
      advantages: "Property Highlights",
      breakfast: "Superb breakfast",
      breakfastDesc: "Continental",
      wifi: "Excellent free WiFi",
      wifiDesc: "Guest rating: 9.7",
      transfer: "Airport shuttle",
      transferDesc: "Shuttle service",
      kitchen: "Private kitchen",
      kitchenDesc: "Kitchenette, electric stovetop",
      geniusTitle: "Your Genius Level 1 rewards",
      geniusDesc: "Available for selected options: 13% discount is applied before taxes and fees.",
      popularFacilities: "Most popular facilities",
      availability: "Availability",
      roomType: "Accommodation type",
      guests: "Guests",
      price: "Today's price",
      options: "Rate options",
      selectRoom: "Select apartments",
      reserveBtn: "I'll reserve",
      reserveInfo: "It only takes 2 minutes. No payment required today",
      reviewsTitle: "Guest reviews",
      staff: "Staff",
      cleanliness: "Cleanliness",
      comfort: "Comfort",
      value: "Value for money",
      facilitiesLabel: "Facilities",
      locationLabel: "Location",
      wifiLabel: "Free WiFi",
      morePhotos: (n: number) => `+${n} photos`,
      onlyXLeft: (n: number) => `Only ${n} rooms left on our site`,
      geniusDiscount: "Genius 13% discount applied",
      freeCancel: "Free cancellation",
      noPrep: "No prepayment needed",
      bestLocation: "Excellent location",
      readAllReviews: "Read all reviews",
      checkAvailability: "Change search parameters"
    },
    uz: {
      overview: "Tavsif",
      info: "Ma'lumot va narxlar",
      facilities: "Qulayliklar va xizmatlar",
      rules: "Turar joy shartlari",
      important: "Muhim ma'lumotlar",
      reviewsCount: (n: number) => `Mehmonlar sharhlari (${n})`,
      showOnMap: "xaritada ko'rsatish",
      reserve: "Band qilish",
      advantages: "Ushbu variantning afzalliklari",
      breakfast: "Ajoyib nonushta",
      breakfastDesc: "Kontinental",
      wifi: "Ajoyib bepul Wi-Fi",
      wifiDesc: "Mehmonlar bahosi: 9.7",
      transfer: "Transfer xizmati",
      transferDesc: "Aeroportgacha transfer",
      kitchen: "Shaxsiy oshxona",
      kitchenDesc: "Mini-oshxona, elektr plita",
      geniusTitle: "Sizning Genius 1-darajali mukofotlaringiz",
      geniusDesc: "Ayrim variantlar uchun amal qiladi: Soliq va yig'imlarsiz narxga 13% chegirma qo'llaniladi.",
      popularFacilities: "Eng ommabop qulayliklar",
      availability: "Joylar mavjudligi",
      roomType: "Xonalar turi",
      guests: "Mehmonlar soni",
      price: "Bugungi narx",
      options: "Tarif variantlari",
      selectRoom: "Xonalarni tanlang",
      reserveBtn: "Band qilaman",
      reserveInfo: "Jarayon atigi 2 daqiqa oladi. Hozir to'lov talab qilinmaydi",
      reviewsTitle: "Mehmonlar sharhlari",
      staff: "Xodimlar",
      cleanliness: "Tozalik",
      comfort: "Qulaylik",
      value: "Narx va sifat mutanosibligi",
      facilitiesLabel: "Qulayliklar",
      locationLabel: "Joylashuv",
      wifiLabel: "Bepul Wi-Fi",
      morePhotos: (n: number) => `+${n} ta rasm`,
      onlyXLeft: (n: number) => `Bizda atigi ${n} ta xona qoldi`,
      geniusDiscount: "Genius 13% chegirma qo'llanildi",
      freeCancel: "Bepul bekor qilish",
      noPrep: "Oldindan to'lovsiz",
      bestLocation: "Ajoyib joylashuv",
      readAllReviews: "Barcha sharhlarni o'qish",
      checkAvailability: "Qidiruv parametrlarini o'zgartirish"
    }
  };

  const t = localMap[locale] || localMap.ru;

  const breadcrumbs = [
    { name: locale === "ru" ? "Главная" : locale === "en" ? "Home" : "Bosh sahifa", href: "/" },
    { name: locale === "ru" ? "Отели" : locale === "en" ? "Hotels" : "Mehmonxonalar", href: "/search" },
    { name: property.country, href: "#" },
    { name: property.city, href: "#" },
    { name: property.name, href: "#" },
  ];

  return (
    <main className="min-h-screen bg-[#f5f5f5] dark:bg-gray-950 pb-20 text-gray-900 dark:text-white pt-4">
      <div id="overview" className="max-w-7xl mx-auto px-4 md:px-8 bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs text-blue-600 dark:text-blue-400 font-medium mb-6 overflow-x-auto whitespace-nowrap">
          {breadcrumbs.map((bc, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <FaChevronRight className="w-2.5 h-2.5 mx-2 text-gray-400" />}
              <span className="hover:underline cursor-pointer">{bc.name}</span>
            </div>
          ))}
        </nav>

        {/* Dynamic Interactive Tab Navbar */}
        <PropertyNavBar
          overviewLabel={t.overview}
          infoLabel={t.info}
          facilitiesLabel={t.facilities}
          rulesLabel={t.rules}
          importantLabel={t.important}
          reviewsLabel={t.reviewsCount(property.reviews)}
        />

        {/* Title Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {property.genius && (
                <span className="bg-[#003580] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Genius
                </span>
              )}
              <div className="flex text-yellow-400 text-xs gap-0.5">
                {Array(Math.max(1, property.stars)).fill(0).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-4 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
                {property.name}
              </h1>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 flex items-center gap-1.5 flex-wrap">
              <FaMapMarkerAlt className="text-blue-600" />
              <span>{property.address}</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer">
                — {t.bestLocation} — {t.showOnMap}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <PropertyActionButtons
              propertyId={property.id}
              propertyName={property.name}
              locale={locale}
            />
            <Link href={`/checkout/${property.id}`}>
              <Button className="bg-[#006ce4] hover:bg-[#0057b8] text-white px-6 py-3 font-bold rounded">
                {t.reserve}
              </Button>
            </Link>
          </div>
        </div>

        {/* Gallery & Sidebar Review Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          
          {/* Main Photos Grid */}
          <div className="lg:col-span-3 grid grid-cols-3 gap-2">
            <div className="col-span-3 md:col-span-2 h-[260px] md:h-[350px] overflow-hidden rounded-lg relative cursor-pointer group">
              <img src={property.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-500" />
            </div>
            
            <div className="hidden md:flex flex-col col-span-1 gap-2 h-[350px]">
              <div className="h-1/2 overflow-hidden rounded-lg cursor-pointer group">
                <img src={property.images[1]} alt="" className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-500" />
              </div>
              <div className="h-1/2 overflow-hidden rounded-lg cursor-pointer group relative">
                <img src={property.images[2]} alt="" className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-500" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-extrabold text-sm md:text-base group-hover:bg-black/50 transition duration-300">
                  {t.morePhotos(80)}
                </div>
              </div>
            </div>

            {/* Thumbnail row */}
            <div className="col-span-3 grid grid-cols-5 gap-2 mt-1">
              {property.images.slice(1, 6).map((img, idx) => (
                <div key={idx} className="h-16 md:h-24 overflow-hidden rounded-lg cursor-pointer group">
                  <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Highlight Info Card */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            
            {/* Reviews spotlight widget */}
            <div className="bg-[#f0f6ff] dark:bg-gray-800 p-4 rounded-lg border border-blue-100 dark:border-gray-700 flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-start gap-3 mb-4">
                  <div>
                    <h4 className="font-extrabold text-sm text-gray-900 dark:text-white leading-tight">
                      {property.ratingLabel}
                    </h4>
                    <p className="text-[11px] text-gray-500">{property.reviews.toLocaleString("en-US")} {locale === "ru" ? "отзывов" : "reviews"}</p>
                  </div>
                  <div className="bg-[#003580] text-white font-extrabold px-2.5 py-1.5 rounded text-sm flex items-center justify-center">
                    {property.rating}
                  </div>
                </div>

                <div className="border-t border-blue-200/50 dark:border-gray-700 pt-3">
                  <p className="text-xs italic text-gray-700 dark:text-gray-300 line-clamp-4 leading-relaxed">
                    «{property.reviewsList[0]?.text}»
                  </p>
                  <p className="text-[10px] text-gray-500 font-bold mt-2">
                    {property.reviewsList[0]?.author} — {property.reviewsList[0]?.country}
                  </p>
                </div>
              </div>

              <div className="border-t border-blue-200/50 dark:border-gray-700 pt-3 mt-4 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                <span>{t.readAllReviews}</span>
                <FaChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* Minimap Widget */}
            <div className="bg-gray-100 dark:bg-gray-800 h-28 rounded-lg overflow-hidden relative border border-gray-200 dark:border-gray-700 flex items-center justify-center">
              <div className="absolute inset-0 bg-cover bg-center filter brightness-90" style={{ backgroundImage: "url('https://picsum.photos/seed/map/400/200')" }}></div>
              <Button className="bg-[#006ce4] hover:bg-[#0057b8] text-white font-bold text-xs py-2 px-3 relative z-10 shadow-lg rounded">
                {t.showOnMap}
              </Button>
            </div>

          </div>
        </div>

        {/* Content Body */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          
          {/* Main column */}
          <div className="w-full lg:w-3/4">
            
            {/* Highlights Advantages */}
            <h3 className="font-extrabold text-lg mb-4 text-gray-900 dark:text-white">
              {t.advantages}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              <div className="border border-gray-200 dark:border-gray-800 p-4 rounded-lg bg-gray-50/50 dark:bg-gray-800/20 flex flex-col gap-2">
                <FaCoffee className="text-blue-600 text-lg" />
                <h5 className="font-bold text-xs text-gray-900 dark:text-white">{t.breakfast}</h5>
                <p className="text-[10px] text-gray-500 leading-normal">{t.breakfastDesc}</p>
              </div>
              <div className="border border-gray-200 dark:border-gray-800 p-4 rounded-lg bg-gray-50/50 dark:bg-gray-800/20 flex flex-col gap-2">
                <FaWifi className="text-blue-600 text-lg" />
                <h5 className="font-bold text-xs text-gray-900 dark:text-white">{t.wifi}</h5>
                <p className="text-[10px] text-gray-500 leading-normal">{t.wifiDesc}</p>
              </div>
              <div className="border border-gray-200 dark:border-gray-800 p-4 rounded-lg bg-gray-50/50 dark:bg-gray-800/20 flex flex-col gap-2">
                <FaShuttleVan className="text-blue-600 text-lg" />
                <h5 className="font-bold text-xs text-gray-900 dark:text-white">{t.transfer}</h5>
                <p className="text-[10px] text-gray-500 leading-normal">{t.transferDesc}</p>
              </div>
              <div className="border border-gray-200 dark:border-gray-800 p-4 rounded-lg bg-gray-50/50 dark:bg-gray-800/20 flex flex-col gap-2">
                <FaUtensils className="text-blue-600 text-lg" />
                <h5 className="font-bold text-xs text-gray-900 dark:text-white">{t.kitchen}</h5>
                <p className="text-[10px] text-gray-500 leading-normal">{t.kitchenDesc}</p>
              </div>
            </div>

            {/* Description Text */}
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 mb-8">
              <p>{property.description}</p>
              <p>
                В каждом номере есть кондиционер, полностью оборудованная кухня, телевизор с плоским экраном и собственная ванная комната. 
                Гости могут заказать континентальный завтрак.
              </p>
            </div>

            {/* Genius Reward Widget */}
            <div className="border border-yellow-200 bg-yellow-50/50 dark:bg-yellow-950/20 dark:border-yellow-900/50 p-4 rounded-lg flex items-start gap-4 mb-8">
              <span className="text-xl">🎁</span>
              <div>
                <h4 className="font-extrabold text-sm text-gray-900 dark:text-white mb-1">
                  {t.geniusTitle}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t.geniusDesc}
                </p>
              </div>
            </div>

            {/* Popular Amenities Grid */}
            <h3 id="facilities" className="font-extrabold text-sm mb-4 text-gray-900 dark:text-white pt-6">
              {t.popularFacilities}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {property.amenities.map((amenity: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-green-700 dark:text-green-400 font-semibold bg-green-50/50 dark:bg-green-950/10 border border-green-100 dark:border-green-950/40 p-2.5 rounded-lg">
                  <FaRegCheckCircle />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Sidebar genius highlights */}
          <div className="w-full lg:w-1/4">
            <div className="bg-[#f0f6ff] dark:bg-gray-800 p-6 rounded-lg border border-blue-100 dark:border-gray-700 flex flex-col gap-4">
              <h4 className="font-extrabold text-base text-gray-900 dark:text-white leading-normal">
                {t.geniusTitle}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Скидка 13% применяется прямо сейчас к цене за бронирование.
              </p>
              <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {property.price.toLocaleString("uz-UZ")} UZS
              </div>
              <Link href={`/checkout/${property.id}`}>
                <Button className="w-full bg-[#006ce4] hover:bg-[#0057b8] text-white font-extrabold py-3.5 rounded text-sm">
                  {t.reserve}
                </Button>
              </Link>
            </div>
          </div>

        </div>

        {/* Room Availability Pricing Table */}
        <div id="info" className="mb-12 border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-gray-50/40 dark:bg-gray-900/40">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h3 className="font-extrabold text-xl text-gray-900 dark:text-white">
              {t.availability}
            </h3>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-4 rounded shadow-sm">
              {t.checkAvailability}
            </Button>
          </div>

          {/* Date Search header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-[#febb02]/20 p-2 rounded-lg mb-6 border border-[#febb02]/40">
            <div className="bg-white dark:bg-gray-800 px-3 py-2 rounded flex items-center gap-2">
              <FaCalendarAlt className="text-gray-400" />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">вт, 16 июня — ср, 17 июня</span>
            </div>
            <div className="bg-white dark:bg-gray-800 px-3 py-2 rounded flex items-center gap-2">
              <FaUser className="text-gray-400" />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">2 взрослых • 0 детей • 1 номер</span>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded">
              {locale === "ru" ? "Изменить параметры" : "Change parameters"}
            </Button>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900">
            <table className="w-full text-left border-collapse min-w-[700px]">
              
              {/* Header */}
              <thead>
                <tr className="bg-[#003580] text-white text-xs font-extrabold uppercase tracking-wider">
                  <th className="p-4 border-r border-[#00224f] w-[35%]">{t.roomType}</th>
                  <th className="p-4 border-r border-[#00224f] w-[15%] text-center">{t.guests}</th>
                  <th className="p-4 border-r border-[#00224f] w-[20%]">{t.price}</th>
                  <th className="p-4 border-r border-[#00224f] w-[20%]">{t.options}</th>
                  <th className="p-4 w-[10%] text-center">Выбрать</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-xs">
                {property.rooms.map((room: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                    
                    {/* Room details */}
                    <td className="p-4 border-r border-gray-200 dark:border-gray-800 vertical-align-top">
                      <div className="flex flex-col gap-2">
                        <span className="font-extrabold text-blue-600 dark:text-blue-400 text-sm hover:underline cursor-pointer">
                          {room.type}
                        </span>
                        <p className="text-gray-500 leading-relaxed text-[11px]">
                          {room.description}
                        </p>
                        <div className="flex gap-2 flex-wrap mt-2">
                          <span className="bg-red-50 text-red-600 font-bold border border-red-100 rounded px-1.5 py-0.5 text-[10px]">
                            {t.onlyXLeft(3)}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Guests capacity */}
                    <td className="p-4 border-r border-gray-200 dark:border-gray-800 text-center vertical-align-top">
                      <div className="flex justify-center items-center gap-1 text-gray-700 dark:text-gray-300 text-sm">
                        {Array(room.capacity).fill(0).map((_, i) => (
                          <FaUser key={i} />
                        ))}
                      </div>
                    </td>

                    {/* Price details */}
                    <td className="p-4 border-r border-gray-200 dark:border-gray-800 vertical-align-top">
                      <div className="flex flex-col gap-1">
                        {property.priceOld && (
                          <span className="text-red-500 line-through text-[11px]">
                            {Math.floor(room.price * 1.4).toLocaleString("uz-UZ")} UZS
                          </span>
                        )}
                        <span className="font-extrabold text-lg text-gray-900 dark:text-white">
                          {room.price.toLocaleString("uz-UZ")} UZS
                        </span>
                        <span className="text-[10px] text-gray-500 leading-normal">
                          Включая налоги и сборы
                        </span>
                        <div className="mt-2 flex flex-col gap-1">
                          <span className="bg-[#003580] text-white text-[9px] font-extrabold px-1 rounded uppercase w-max tracking-wide">
                            Genius
                          </span>
                          <span className="bg-green-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wide w-max">
                            Сезонное предложение
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Options policies */}
                    <td className="p-4 border-r border-gray-200 dark:border-gray-800 vertical-align-top">
                      <ul className="space-y-1.5 text-[11px] text-green-700 dark:text-green-400 font-semibold">
                        {room.options.map((opt: string, optIdx: number) => (
                          <li key={optIdx} className="flex items-center gap-1.5">
                            <FaRegCheckCircle className="text-xs text-green-600" />
                            <span>{opt}</span>
                          </li>
                        ))}
                      </ul>
                    </td>

                    {/* Quantity select */}
                    <td className="p-4 text-center vertical-align-top">
                      <select className="border border-gray-300 dark:border-gray-700 rounded p-1 text-xs focus:outline-none dark:bg-gray-800 text-gray-800 dark:text-white">
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                      </select>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* Reserve CTA block */}
          <div className="mt-4 flex flex-col md:flex-row items-end md:items-center justify-between gap-4 bg-blue-50 dark:bg-gray-800 p-4 rounded-lg border border-blue-100 dark:border-gray-700">
            <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
              {t.reserveInfo}
            </p>
            <Link href={`/checkout/${property.id}`}>
              <Button className="bg-[#006ce4] hover:bg-[#0057b8] text-white font-extrabold py-3.5 px-8 rounded text-sm shadow-md">
                {t.reserveBtn}
              </Button>
            </Link>
          </div>

        </div>

        {/* House Rules */}
        <div id="rules" className="mb-12 border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900 scroll-mt-20">
          <h3 className="font-extrabold text-xl text-gray-900 dark:text-white mb-2">
            {locale === "ru" ? "Правила проживания" : locale === "uz" ? "Yashash qoidalari" : "House rules"}
          </h3>
          <p className="text-xs text-gray-500 mb-6">
            {locale === "ru" 
              ? "Этот объект размещения принимает особые пожелания — добавьте их на следующем шаге!" 
              : locale === "uz" 
              ? "Ushbu turar joy maxsus so'rovlarni qabul qiladi — ularni keyingi bosqichda qo'shing!" 
              : "This property takes special requests – add them in the next step!"}
          </p>

          <div className="border border-gray-100 dark:border-gray-800 rounded-lg overflow-hidden text-xs">
            {/* Check-in */}
            <div className="flex border-b border-gray-100 dark:border-gray-800 p-4">
              <div className="w-1/3 font-extrabold text-gray-700 dark:text-gray-300">
                {locale === "ru" ? "Заезд" : locale === "uz" ? "Kelish (Check-in)" : "Check-in"}
              </div>
              <div className="w-2/3 text-gray-600 dark:text-gray-400 font-semibold">
                {locale === "ru" ? "С 14:00 до 22:00" : locale === "uz" ? "14:00 dan 22:00 gacha" : "14:00 – 22:00"}
              </div>
            </div>

            {/* Check-out */}
            <div className="flex border-b border-gray-100 dark:border-gray-800 p-4">
              <div className="w-1/3 font-extrabold text-gray-700 dark:text-gray-300">
                {locale === "ru" ? "Отъезд" : locale === "uz" ? "Ketish (Check-out)" : "Check-out"}
              </div>
              <div className="w-2/3 text-gray-600 dark:text-gray-400 font-semibold">
                {locale === "ru" ? "С 08:00 до 12:00" : locale === "uz" ? "08:00 dan 12:00 gacha" : "08:00 – 12:00"}
              </div>
            </div>

            {/* Pets */}
            <div className="flex border-b border-gray-100 dark:border-gray-800 p-4">
              <div className="w-1/3 font-extrabold text-gray-700 dark:text-gray-300">
                {locale === "ru" ? "Домашние животные" : locale === "uz" ? "Uy hayvonlari" : "Pets"}
              </div>
              <div className="w-2/3 text-gray-600 dark:text-gray-400 font-semibold">
                {locale === "ru" 
                  ? "Размещение домашних животных не допускается." 
                  : locale === "uz" 
                  ? "Uy hayvonlarini olib kelish taqiqlanadi." 
                  : "Pets are not allowed."}
              </div>
            </div>

            {/* Cash payments */}
            <div className="flex p-4">
              <div className="w-1/3 font-extrabold text-gray-700 dark:text-gray-300">
                {locale === "ru" ? "Оплата наличными" : locale === "uz" ? "To'lov naqd pulda" : "Cash payment"}
              </div>
              <div className="w-2/3 text-gray-600 dark:text-gray-400 font-semibold">
                {locale === "ru" 
                  ? "Этот объект принимает только оплату наличными." 
                  : locale === "uz" 
                  ? "Ushbu turar joy faqat naqd pulda to'lovlarni qabul qiladi." 
                  : "This property only accepts cash payments."}
              </div>
            </div>
          </div>
        </div>

        {/* Important Info */}
        <div id="important" className="mb-12 border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900 scroll-mt-20">
          <h3 className="font-extrabold text-xl text-gray-900 dark:text-white mb-4">
            {locale === "ru" ? "Важная информация" : locale === "uz" ? "Muhim ma'lumotlar" : "Important info"}
          </h3>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-4 font-semibold leading-relaxed">
            <p>
              {locale === "ru" 
                ? "Пожалуйста, заранее сообщите предполагаемое время прибытия. Вы можете использовать поле «Особые пожелания» при бронировании или связаться с объектом размещения напрямую." 
                : locale === "uz" 
                ? "Iltimos, kelish vaqtingizni oldindan ma'lum qiling. Band qilish jarayonida maxsus so'rovlar maydonidan foydalanishingiz mumkin." 
                : "Please inform the property in advance of your expected arrival time. You can use the Special Requests box when booking, or contact the property directly."}
            </p>
            <p>
              {locale === "ru" 
                ? "В этом объекте проживания не устраиваются девичники, мальчишники и подобные вечеринки." 
                : locale === "uz" 
                ? "Ushbu turar joyda bayramlar, yig'ilishlar va shunga o'xshash tadbirlar o'tkazish taqiqlanadi." 
                : "This property will not accommodate hen, stag or similar parties."}
            </p>
          </div>
        </div>

        {/* Guest Reviews Section */}
        <div id="reviews" className="border-t border-gray-200 dark:border-gray-800 pt-10 scroll-mt-20">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h3 className="font-extrabold text-xl text-gray-900 dark:text-white">
              {t.reviewsTitle}
            </h3>
            <div className="flex items-center gap-3">
              <div className="bg-[#003580] text-white font-extrabold px-3 py-2 rounded text-base">
                {property.rating}
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-gray-900 dark:text-white leading-tight">
                  {property.ratingLabel}
                </h4>
                <p className="text-xs text-gray-500">1,146 {locale === "ru" ? "отзывов гостей" : "guest reviews"}</p>
              </div>
            </div>
          </div>

          {/* Scores Breakdown grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-700 dark:text-gray-300">
                <span>{t.staff}</span>
                <span>{property.reviewScores.staff}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#003580] h-full rounded-full" style={{ width: `${property.reviewScores.staff * 10}%` }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-700 dark:text-gray-300">
                <span>{t.cleanliness}</span>
                <span>{property.reviewScores.cleanliness}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#003580] h-full rounded-full" style={{ width: `${property.reviewScores.cleanliness * 10}%` }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-700 dark:text-gray-300">
                <span>{t.comfort}</span>
                <span>{property.reviewScores.comfort}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#003580] h-full rounded-full" style={{ width: `${property.reviewScores.comfort * 10}%` }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-700 dark:text-gray-300">
                <span>{t.value}</span>
                <span>{property.reviewScores.value}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#003580] h-full rounded-full" style={{ width: `${property.reviewScores.value * 10}%` }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-700 dark:text-gray-300">
                <span>{t.facilitiesLabel}</span>
                <span>{property.reviewScores.facilities}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#003580] h-full rounded-full" style={{ width: `${property.reviewScores.facilities * 10}%` }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-700 dark:text-gray-300">
                <span>{t.locationLabel}</span>
                <span>{property.reviewScores.location}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#003580] h-full rounded-full" style={{ width: `${property.reviewScores.location * 10}%` }}></div>
              </div>
            </div>

          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {["Персонал", "Расположение", "Номер", "Завтрак", "Кухня"].map((tag, idx) => (
              <span key={idx} className="cursor-pointer border border-gray-300 dark:border-gray-700 rounded-full px-3 py-1 text-xs font-bold text-gray-700 dark:text-gray-300 bg-white hover:bg-gray-50 transition">
                + {tag}
              </span>
            ))}
          </div>

          {/* Individual Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {property.reviewsList.map((rev: any, revIdx: number) => (
              <div key={revIdx} className="bg-gray-50/50 dark:bg-gray-800/10 border border-gray-200 dark:border-gray-800 p-5 rounded-lg flex flex-col justify-between">
                <div>
                  
                  {/* Author Header */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <img src={rev.avatar} className="w-10 h-10 rounded-full object-cover border border-gray-200" alt="" />
                      <div>
                        <h5 className="font-bold text-xs text-gray-900 dark:text-white">{rev.author}</h5>
                        <p className="text-[10px] text-gray-500">{rev.country}</p>
                      </div>
                    </div>
                    <div className="bg-blue-600 text-white font-extrabold px-2 py-1 rounded text-xs">
                      {rev.score}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    «{rev.text}»
                  </p>

                </div>

                <div className="text-[10px] text-gray-400 font-semibold border-t border-gray-100 dark:border-gray-800 pt-3">
                  {locale === "ru" ? "Отзыв проверен" : "Verified Review"}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </main>
  );
}
