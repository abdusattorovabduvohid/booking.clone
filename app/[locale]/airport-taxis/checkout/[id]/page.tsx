"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getTaxiById } from "@/lib/api/taxis";
import { Taxi } from "@/lib/mocks/taxis";
import { FaCalendarAlt, FaUser, FaInfoCircle, FaLock, FaTaxi, FaSuitcase, FaPlaneArrival, FaClock } from "react-icons/fa";
import toast from "react-hot-toast";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  flightNumber: z.string().optional(),
  pickupTime: z.string().min(3, "Exact pick-up time is required"),
});

export default function TaxiCheckoutPage() {
  const { id, locale } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLocale = (locale as string) || "en";

  const [taxi, setTaxi] = useState<Taxi | null>(null);
  const [loading, setLoading] = useState(true);

  const pickup = searchParams.get("pickup") || "Tashkent Airport (TAS)";
  const dropoff = searchParams.get("dropoff") || "Hilton Hotel";
  const date = searchParams.get("date") || "2026-06-12";
  const time = searchParams.get("time") || "12:00";

  const localMap: any = {
    ru: {
      title: "Введите данные трансфера",
      firstName: "Имя пассажира",
      lastName: "Фамилия пассажира",
      email: "Адрес электронной почты",
      emailHelp: "Мы отправим подтверждение трансфера на этот адрес",
      flightNumber: "Номер рейса (рекомендуется)",
      flightHelp: "Помогает отслеживать время прилета на случай задержки",
      pickupTime: "Точное время встречи",
      submitBtn: "Заказать трансфер",
      summaryTitle: "Детали трансфера",
      pickup: "Откуда",
      dropoff: "Куда",
      vehicleClass: "Класс автомобиля",
      capacity: "Вместимость",
      priceSummary: "Стоимость вашего трансфера",
      originalPrice: "Оригинальная цена",
      total: "Итого",
      taxesInfo: "Включая налоги и сборы",
      successMsg: "Трансфер успешно забронирован! Водитель будет встречать вас с табличкой!",
      loading: "Загрузка данных...",
      secureBooking: "Безопасное бронирование по SSL-соединению",
    },
    en: {
      title: "Enter passenger details",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      emailHelp: "We will send your transfer confirmation to this address",
      flightNumber: "Flight Number (recommended)",
      flightHelp: "We track your flight for delays so your driver waits for you",
      pickupTime: "Exact pick-up time",
      submitBtn: "Book Transfer",
      summaryTitle: "Your transfer summary",
      pickup: "From",
      dropoff: "To",
      vehicleClass: "Vehicle Class",
      capacity: "Capacity",
      priceSummary: "Your transfer price",
      originalPrice: "Original price",
      total: "Total",
      taxesInfo: "Includes taxes and charges",
      successMsg: "Airport transfer booked successfully! Your driver will meet you with a nameboard!",
      loading: "Loading details...",
      secureBooking: "Secure booking using SSL connection",
    },
    uz: {
      title: "Yo'lovchi ma'lumotlarini kiriting",
      firstName: "Yo'lovchi ismi",
      lastName: "Yo'lovchi familiyasi",
      email: "Elektron pochta manzili",
      emailHelp: "Ushbu manzilga transfer tasdiqnomasi yuboriladi",
      flightNumber: "Reys raqami (tavsiya etiladi)",
      flightHelp: "Reysingiz kechiksa ham, haydovchi sizni kutib turishi uchun kuzatib boramiz",
      pickupTime: "Uchrashuvning aniq vaqti",
      submitBtn: "Transferni band qilish",
      summaryTitle: "Transfer tafsilotlari",
      pickup: "Qayerdan",
      dropoff: "Qayerga",
      vehicleClass: "Mashina klassi",
      capacity: "Sig'imi",
      priceSummary: "Transfer narxi tafsiloti",
      originalPrice: "Asl narx",
      total: "Jami",
      taxesInfo: "Soliq va yig'imlarni o'z ichiga oladi",
      successMsg: "Aeroport transferi muvaffaqiyatli band qilindi! Haydovchi sizni ismingiz yozilgan taxtacha bilan kutib oladi!",
      loading: "Yuklanmoqda...",
      secureBooking: "SSL orqali xavfsiz ulanish va band qilish",
    }
  };

  const t = localMap[currentLocale] || localMap.en;

  useEffect(() => {
    const fetchTaxi = async () => {
      if (id) {
        const data = await getTaxiById(String(id));
        setTaxi(data);
      }
      setLoading(false);
    };
    fetchTaxi();
  }, [id]);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      pickupTime: time,
    }
  });

  const onSubmit = (data: any) => {
    if (!taxi) return;
    
    const newBooking = {
      hotelName: `${taxi.name} (Airport Transfer)`,
      city: dropoff,
      country: currentLocale === "ru" ? "Трансфер из аэропорта" : currentLocale === "uz" ? "Aeroport transferi" : "Airport Taxi Transfer",
      price: taxi.price,
      image: taxi.image,
      dates: `${date} @ ${data.pickupTime} (Flight: ${data.flightNumber || "N/A"})`,
      guests: `${pickup} → ${dropoff} • ${taxi.seats} seats`
    };

    const existingBookingsRaw = localStorage.getItem("my_bookings");
    const existing = existingBookingsRaw ? JSON.parse(existingBookingsRaw) : [];
    existing.unshift(newBooking);
    localStorage.setItem("my_bookings", JSON.stringify(existing));

    toast.success(t.successMsg);
    
    router.push(`/${currentLocale}/profile?tab=bookings`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center text-gray-500 font-bold text-lg">
        {t.loading}
      </div>
    );
  }

  if (!taxi) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center text-red-500 font-bold text-lg">
        Transfer type not found
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
                    className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-semibold focus:outline-none text-gray-900 dark:text-white"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.firstName.message as string}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2 uppercase text-gray-700 dark:text-gray-300">{t.lastName}</label>
                  <input
                    {...register("lastName")}
                    className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-semibold focus:outline-none text-gray-900 dark:text-white"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.lastName.message as string}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold mb-2 uppercase text-gray-700 dark:text-gray-300">{t.email}</label>
                <input
                  {...register("email")}
                  className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-semibold focus:outline-none text-gray-900 dark:text-white"
                />
                <p className="text-[10px] text-gray-500 mt-1.5 font-medium">{t.emailHelp}</p>
                {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email.message as string}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 dark:border-gray-800 pt-6">
                <div>
                  <label className="block text-xs font-bold mb-2 uppercase text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <FaPlaneArrival className="text-blue-500" />
                    {t.flightNumber}
                  </label>
                  <input
                    {...register("flightNumber")}
                    placeholder="e.g. HY-301, EK-571"
                    className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-semibold focus:outline-none text-gray-900 dark:text-white"
                  />
                  <p className="text-[9px] text-gray-400 mt-1.5 font-medium leading-normal">{t.flightHelp}</p>
                </div>
                
                <div>
                  <label className="block text-xs font-bold mb-2 uppercase text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <FaClock className="text-blue-500" />
                    {t.pickupTime}
                  </label>
                  <input
                    type="time"
                    {...register("pickupTime")}
                    className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-bold focus:outline-none text-gray-900 dark:text-white"
                  />
                  {errors.pickupTime && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.pickupTime.message as string}</p>}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mt-4">
                <FaLock className="text-green-600" />
                <span>{t.secureBooking}</span>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
                <Button type="submit" className="text-base font-extrabold bg-[#0071c2] hover:bg-[#005999] text-white px-8 py-4 rounded shadow-md w-full md:w-auto">
                  {t.complete_booking}
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
              <img src={taxi.image} alt="" className="w-24 h-16 object-cover rounded shadow-xs" />
              <div>
                <p className="font-extrabold text-sm text-gray-900 dark:text-white leading-tight">{taxi.name}</p>
                <p className="text-xs text-gray-500 font-bold uppercase mt-1 leading-none">{t.vehicleClass}</p>
                
                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
                  <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded"><FaUser /> {taxi.seats}</span>
                  <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded"><FaSuitcase /> {taxi.seats}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 py-4 grid grid-cols-1 gap-4 text-xs font-medium text-gray-700 dark:text-gray-300">
              <div className="pb-2 border-b border-gray-50 dark:border-gray-800">
                <p className="text-gray-500 dark:text-gray-400 font-bold mb-1">{t.pickup}</p>
                <p className="font-extrabold text-gray-900 dark:text-white leading-snug">{pickup}</p>
              </div>
              <div className="pb-2 border-b border-gray-50 dark:border-gray-800">
                <p className="text-gray-500 dark:text-gray-400 font-bold mb-1">{t.dropoff}</p>
                <p className="font-extrabold text-gray-900 dark:text-white leading-snug">{dropoff}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 font-bold mb-1">Date & Time</p>
                <p className="font-extrabold text-gray-900 dark:text-white leading-none">{date} • {time}</p>
              </div>
            </div>

            {taxi.free_cancel && (
              <div className="border-t border-gray-100 dark:border-gray-800 pt-4 text-xs font-bold text-green-600 dark:text-green-400">
                ✓ Free cancellation
              </div>
            )}
          </div>

          <div className="bg-[#ebf3ff] dark:bg-gray-800 p-6 rounded-lg border border-[#0071c2]/20 shadow-sm flex flex-col gap-4">
            <h3 className="text-base font-extrabold text-gray-900 dark:text-white border-b border-blue-200/50 dark:border-gray-700 pb-2">
              {t.priceSummary}
            </h3>
            
            <div className="flex justify-between items-center text-xs font-semibold text-gray-600 dark:text-gray-300">
              <span>{t.originalPrice}</span>
              <span className="line-through text-red-500">{Math.floor(taxi.price * 1.3).toLocaleString("uz-UZ")} UZS</span>
            </div>

            <div className="flex justify-between items-end mt-2 pt-2 border-t border-blue-200/40 dark:border-gray-700">
              <span className="text-sm font-extrabold text-gray-900 dark:text-white">{t.total}</span>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  {taxi.price.toLocaleString("uz-UZ")} UZS
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
