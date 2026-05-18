"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getCarById, Car } from "@/lib/api/cars";
import { FaCalendarAlt, FaUser, FaInfoCircle, FaLock, FaCar, FaCogs, FaGasPump } from "react-icons/fa";
import toast from "react-hot-toast";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  ageAgreement: z.boolean().refine((val) => val === true, {
    message: "You must confirm you are between 30 and 65 years old",
  }),
});

export default function CarCheckoutPage() {
  const { id, locale } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLocale = (locale as string) || "en";

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  const pickup = searchParams.get("pickup") || "Tashkent";
  const pickupDate = searchParams.get("pickupDate") || "2026-06-12";
  const dropoffDate = searchParams.get("dropoffDate") || "2026-06-15";

  const d1 = new Date(pickupDate);
  const d2 = new Date(dropoffDate);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 3;

  const localMap: any = {
    ru: {
      title: "Введите ваши данные",
      firstName: "Имя",
      lastName: "Фамилия",
      email: "Адрес электронной почты",
      emailHelp: "На этот адрес мы отправим подтверждение аренды автомобиля",
      ageCheck: "Мне от 30 до 65 лет",
      submitBtn: "Завершить бронирование",
      summaryTitle: "Детали вашей аренды",
      pickup: "Получение",
      dropoff: "Возврат",
      duration: "Длительность аренды",
      days: "{days} дн.",
      priceSummary: "Стоимость вашей аренды",
      originalPrice: "Оригинальная цена",
      total: "Итого",
      taxesInfo: "Включая налоги и сборы",
      successMsg: "Аренда автомобиля успешно забронирована! Желаем приятной дороги!",
      loading: "Загрузка данных...",
      secureBooking: "Безопасное бронирование по SSL-соединению",
    },
    en: {
      title: "Enter your details",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      emailHelp: "Confirmation email goes to this address",
      ageCheck: "I am between 30 and 65 years old",
      submitBtn: "Complete booking",
      summaryTitle: "Your rental summary",
      pickup: "Pick-up",
      dropoff: "Drop-off",
      duration: "Rental duration",
      days: "{days} days",
      priceSummary: "Your price summary",
      originalPrice: "Original price",
      total: "Total",
      taxesInfo: "Includes taxes and charges",
      successMsg: "Car rental booked successfully! Have a safe trip!",
      loading: "Loading details...",
      secureBooking: "Secure booking using SSL connection",
    },
    uz: {
      title: "Ma'lumotlaringizni kiriting",
      firstName: "Ism",
      lastName: "Familiya",
      email: "Elektron pochta manzili",
      emailHelp: "Ushbu manzilga ijara tasdiqnomasi yuboriladi",
      ageCheck: "Yoshim 30 dan 65 gacha",
      submitBtn: "Band qilishni yakunlash",
      summaryTitle: "Ijara tafsilotlari",
      pickup: "Olish",
      dropoff: "Qaytarish",
      duration: "Ijara davomiyligi",
      days: "{days} kun",
      priceSummary: "Ijara narxlari tafsiloti",
      originalPrice: "Asl narx",
      total: "Jami",
      taxesInfo: "Soliq va yig'imlarni o'z ichiga oladi",
      successMsg: "Avtomobil ijarasi muvaffaqiyatli band qilindi! Oq yo'l!",
      loading: "Yuklanmoqda...",
      secureBooking: "SSL orqali xavfsiz ulanish va band qilish",
    }
  };

  const t = localMap[currentLocale] || localMap.en;

  useEffect(() => {
    const fetchCar = async () => {
      if (id) {
        const data = await getCarById(String(id));
        setCar(data);
      }
      setLoading(false);
    };
    fetchCar();
  }, [id]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema)
  });

  const onSubmit = (data: any) => {
    if (!car) return;
    
    const newBooking = {
      hotelName: `${car.name} (${car.company})`,
      city: pickup,
      country: currentLocale === "ru" ? "Аренда автомобиля" : currentLocale === "uz" ? "Avtomobil ijarasi" : "Car Rental",
      price: car.priceDay * rentalDays,
      image: car.image,
      dates: `${pickupDate} — ${dropoffDate} (${rentalDays} ${currentLocale === "ru" ? "дн." : currentLocale === "uz" ? "kun" : "days"})`,
      guests: `${car.seats} ${currentLocale === "ru" ? "мест" : currentLocale === "uz" ? "o'rindiq" : "seats"} • ${car.transmission}`
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

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center text-red-500 font-bold text-lg">
        Vehicle not found
      </div>
    );
  }

  const totalPrice = car.priceDay * rentalDays;

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

              <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                <label className="flex items-center gap-3 cursor-pointer text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <input 
                    type="checkbox" 
                    {...register("ageAgreement")} 
                    className="w-4 h-4 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <span>{t.ageCheck}</span>
                </label>
                {errors.ageAgreement && <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.ageAgreement.message as string}</p>}
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
              <img src={car.image} alt="" className="w-24 h-20 object-cover rounded shadow-xs" />
              <div>
                <p className="font-extrabold text-sm text-gray-900 dark:text-white leading-tight">{car.name}</p>
                <p className="text-xs text-gray-500 font-bold uppercase mt-1">{car.company}</p>
                
                <div className="flex items-center gap-1 mt-2">
                  <span className="bg-[#003B95] text-white text-[9px] font-extrabold px-1 rounded">{car.rating}</span>
                  <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">
                    {car.rating >= 9 ? "Exceptional" : car.rating >= 8.5 ? "Very Good" : "Good"}
                  </span>
                </div>
              </div>
            </div>

            {/* Spec tags */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded"><FaUser /> {car.seats} seats</span>
              <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded"><FaCogs /> {car.transmission}</span>
              <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded"><FaGasPump /> {car.fuel}</span>
            </div>
            
            <div className="border-t border-gray-100 dark:border-gray-800 py-4 grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-gray-500 dark:text-gray-400 font-bold mb-1">{t.pickup}</p>
                <p className="font-extrabold text-gray-900 dark:text-white leading-none">{pickup}</p>
                <p className="text-[10px] text-gray-500 mt-1 font-semibold">{pickupDate}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 font-bold mb-1">{t.dropoff}</p>
                <p className="font-extrabold text-gray-900 dark:text-white leading-none">{pickup}</p>
                <p className="text-[10px] text-gray-500 mt-1 font-semibold">{dropoffDate}</p>
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 text-xs flex justify-between font-bold text-gray-700 dark:text-gray-300">
              <span>{t.duration}:</span>
              <span>{t.days.replace("{days}", String(rentalDays))}</span>
            </div>
          </div>

          <div className="bg-[#ebf3ff] dark:bg-gray-800 p-6 rounded-lg border border-[#0071c2]/20 shadow-sm flex flex-col gap-4">
            <h3 className="text-base font-extrabold text-gray-900 dark:text-white border-b border-blue-200/50 dark:border-gray-700 pb-2">
              {t.priceSummary}
            </h3>
            
            <div className="flex justify-between items-center text-xs font-semibold text-gray-600 dark:text-gray-300">
              <span>{t.originalPrice}</span>
              <span className="line-through text-red-500">{Math.floor(totalPrice * 1.25).toLocaleString("uz-UZ")} UZS</span>
            </div>

            <div className="flex justify-between items-end mt-2 pt-2 border-t border-blue-200/40 dark:border-gray-700">
              <span className="text-sm font-extrabold text-gray-900 dark:text-white">{t.total}</span>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  {totalPrice.toLocaleString("uz-UZ")} UZS
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
