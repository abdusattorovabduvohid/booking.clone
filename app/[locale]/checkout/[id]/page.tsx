"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { useParams, useRouter } from "next/navigation";
import { getHotelById, Hotel } from "@/lib/api/hotels";
import { FaCalendarAlt, FaUser, FaInfoCircle, FaRegCheckCircle, FaLock } from "react-icons/fa";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

export default function CheckoutPage() {
  const { id, locale } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);

  const currentLocale = (locale as string) || "ru";

  const localMap: any = {
    ru: {
      title: "Введите ваши данные",
      firstName: "Имя",
      lastName: "Фамилия",
      email: "Адрес электронной почты",
      emailHelp: "На этот адрес мы отправим подтверждение бронирования",
      submitBtn: "Завершить бронирование",
      summaryTitle: "Детали вашего бронирования",
      checkIn: "Заезд",
      checkOut: "Отъезд",
      length: "Общая длительность проживания",
      lengthDays: "1 ночь",
      priceSummary: "Стоимость вашего проживания",
      originalPrice: "Оригинальная цена",
      total: "Итого",
      taxesInfo: "Включая налоги и сборы",
      successMsg: "Бронирование подтверждено! Желаем отличной поездки!",
      loading: "Загрузка данных...",
      onlyXLeft: "Только что забронировано другими гостями!",
      secureBooking: "Безопасное бронирование по SSL-соединению",
    },
    en: {
      title: "Enter your details",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      emailHelp: "Confirmation email goes to this address",
      submitBtn: "Complete booking",
      summaryTitle: "Your booking details",
      checkIn: "Check-in",
      checkOut: "Check-out",
      length: "Total length of stay",
      lengthDays: "1 night",
      priceSummary: "Your price summary",
      originalPrice: "Original price",
      total: "Total",
      taxesInfo: "Includes taxes and charges",
      successMsg: "Booking Confirmed! Have a wonderful trip!",
      loading: "Loading details...",
      onlyXLeft: "Just booked by other guests recently!",
      secureBooking: "Secure booking using SSL connection",
    },
    uz: {
      title: "Ma'lumotlaringizni kiriting",
      firstName: "Ism",
      lastName: "Familiya",
      email: "Elektron pochta manzili",
      emailHelp: "Ushbu manzilga tasdiqlash xati yuboriladi",
      submitBtn: "Band qilishni yakunlash",
      summaryTitle: "Band qilish tafsilotlari",
      checkIn: "Kelish sanasi",
      checkOut: "Ketish sanasi",
      length: "Jami turar joy davomiyligi",
      lengthDays: "1 kecha",
      priceSummary: "Sizning narxlar tafsiloti",
      originalPrice: "Asl narx",
      total: "Jami",
      taxesInfo: "Soliq va yig'imlarni o'z ichiga oladi",
      successMsg: "Band qilish muvaffaqiyatli tasdiqlandi! Ajoyib sayohat tilaymiz!",
      loading: "Yuklanmoqda...",
      onlyXLeft: "Biroz oldin boshqa mehmonlar band qilishdi!",
      secureBooking: "SSL orqali xavfsiz ulanish va band qilish",
    }
  };

  const t = localMap[currentLocale] || localMap.ru;

  useEffect(() => {
    const fetchHotel = async () => {
      if (id) {
        const hotel = await getHotelById(String(id));
        setProperty(hotel);
      }
      setLoading(false);
    };
    fetchHotel();
  }, [id]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema)
  });

  const onSubmit = (data: any) => {
    if (!property) return;
    
    // Save to localStorage so profile booking page lists it dynamically!
    const newBooking = {
      hotelName: property.name,
      city: property.city,
      country: property.country,
      price: property.price,
      image: property.image,
      dates: "16 июня 2026 г. - 17 июня 2026 г.",
      guests: "2 взрослых"
    };

    const existingBookingsRaw = localStorage.getItem("my_bookings");
    const existing = existingBookingsRaw ? JSON.parse(existingBookingsRaw) : [];
    existing.unshift(newBooking);
    localStorage.setItem("my_bookings", JSON.stringify(existing));

    alert(t.successMsg);
    router.push(`/${currentLocale}/profile`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center text-gray-500 font-bold text-lg">
        {t.loading}
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center text-red-500 font-bold text-lg">
        Property not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Form */}
        <div className="w-full lg:w-2/3 space-y-6">
          
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl md:text-2xl font-extrabold mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4 flex items-center gap-2">
              <FaInfoCircle className="text-blue-600" />
              {t.title}
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold mb-2 uppercase text-gray-700 dark:text-gray-300">{t.firstName}</label>
                  <input
                    {...register("firstName")}
                    className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-semibold focus:outline-none"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.firstName.message as string}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2 uppercase text-gray-700 dark:text-gray-300">{t.lastName}</label>
                  <input
                    {...register("lastName")}
                    className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-semibold focus:outline-none"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.lastName.message as string}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold mb-2 uppercase text-gray-700 dark:text-gray-300">{t.email}</label>
                <input
                  {...register("email")}
                  className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-semibold focus:outline-none"
                />
                <p className="text-[10px] text-gray-500 mt-1.5 font-medium">{t.emailHelp}</p>
                {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email.message as string}</p>}
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mt-4">
                <FaLock className="text-green-600" />
                <span>{t.secureBooking}</span>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
                <Button type="submit" className="text-base font-extrabold bg-[#0071c2] hover:bg-[#005999] text-white px-8 py-4 rounded shadow-md w-full md:w-auto">
                  {t.submitBtn}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Summary */}
        <div className="w-full lg:w-1/3 space-y-6">
          
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
            <h3 className="text-base font-extrabold mb-4 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
              {t.summaryTitle}
            </h3>
            <div className="flex gap-4 mb-6">
              <img src={property.image} alt="" className="w-20 h-20 object-cover rounded" />
              <div>
                <p className="font-extrabold text-sm text-gray-900 dark:text-white">{property.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{property.city}, {property.country}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="bg-[#003580] text-white text-[9px] font-extrabold px-1 rounded">{property.rating}</span>
                  <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">{property.ratingLabel}</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 dark:border-gray-800 py-4 grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-gray-500 dark:text-gray-400 font-bold mb-1">{t.checkIn}</p>
                <p className="font-extrabold text-gray-900 dark:text-white">Mon, Oct 12</p>
                <p className="text-[10px] text-gray-500 mt-0.5">From 2:00 PM</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 font-bold mb-1">{t.checkOut}</p>
                <p className="font-extrabold text-gray-900 dark:text-white">Wed, Oct 14</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Until 12:00 PM</p>
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 text-xs flex justify-between font-bold text-gray-700 dark:text-gray-300">
              <span>{t.length}:</span>
              <span>2 nights</span>
            </div>
          </div>

          <div className="bg-[#ebf3ff] dark:bg-gray-800 p-6 rounded-lg border border-[#0071c2]/20 shadow-sm flex flex-col gap-4">
            <h3 className="text-base font-extrabold text-gray-900 dark:text-white border-b border-blue-200/50 dark:border-gray-700 pb-2">
              {t.priceSummary}
            </h3>
            
            <div className="flex justify-between items-center text-xs font-semibold text-gray-600 dark:text-gray-300">
              <span>{t.originalPrice}</span>
              {property.priceOld ? (
                <span className="line-through text-red-500">{(property.priceOld * 2).toLocaleString("uz-UZ")} UZS</span>
              ) : (
                <span className="line-through text-red-500">{Math.floor(property.price * 2.3).toLocaleString("uz-UZ")} UZS</span>
              )}
            </div>

            <div className="flex justify-between items-end mt-2 pt-2 border-t border-blue-200/40 dark:border-gray-700">
              <span className="text-sm font-extrabold text-gray-900 dark:text-white">{t.total}</span>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  {(property.price * 2).toLocaleString("uz-UZ")} UZS
                </span>
                <p className="text-[9px] text-gray-500 mt-1">{t.taxesInfo}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
