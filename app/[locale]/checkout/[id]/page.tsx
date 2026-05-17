"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { MOCK_PROPERTY } from "@/lib/backend-data";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

export default function CheckoutPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema)
  });

  const onSubmit = (data: any) => {
    console.log("Booking submitted:", data);
    // Proceed to payment or confirm
    alert("Booking Details Confirmed! Redirecting to payment...");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Left Column: Form */}
        <div className="w-full md:w-2/3 space-y-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-sm shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Enter your details</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">First Name</label>
                  <input
                    {...register("firstName")}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message as string}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">Last Name</label>
                  <input
                    {...register("lastName")}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message as string}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">Email Address</label>
                <input
                  {...register("email")}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
                <p className="text-xs text-gray-500 mt-1">Confirmation email goes to this address</p>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" className="text-lg font-bold bg-[#0071c2] hover:bg-[#005999] px-8 py-6 rounded-sm w-full md:w-auto">
                  Next: Final Details
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Summary */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-sm shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Your booking details</h3>
            <div className="flex gap-4 mb-6">
              <img src={MOCK_PROPERTY.images[0]} alt="" className="w-24 h-24 object-cover rounded-sm" />
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{MOCK_PROPERTY.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{MOCK_PROPERTY.city}, {MOCK_PROPERTY.country}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 py-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Check-in</p>
                <p className="font-bold text-gray-900 dark:text-white">Mon, Oct 12</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">From 2:00 PM</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Check-out</p>
                <p className="font-bold text-gray-900 dark:text-white">Wed, Oct 14</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Until 12:00 PM</p>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 py-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total length of stay:</p>
              <p className="font-bold text-gray-900 dark:text-white">2 nights</p>
            </div>
          </div>

          <div className="bg-[#ebf3ff] dark:bg-gray-800 p-6 rounded-sm border border-[#0071c2]/20 shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Your price summary</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 dark:text-gray-300">Original price</span>
              <span className="line-through text-red-500">${MOCK_PROPERTY.pricePerNight * 2 + 50}</span>
            </div>
            <div className="flex justify-between items-end mt-4">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Total</span>
              <div className="text-right">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${MOCK_PROPERTY.pricePerNight * 2}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">Includes taxes and charges</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
