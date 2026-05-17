"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { registerUser } from "@/actions/auth.actions";
import toast from "react-hot-toast";

const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: any) => {
    const loadingToast = toast.loading("Creating account...");
    const res = await registerUser(data);
    
    toast.dismiss(loadingToast);

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Account created! Please log in.");
      router.push("/login");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-sm shadow-sm border border-gray-100 dark:border-gray-700">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Already have an account? <Link href="/login" className="text-blue-600 hover:underline font-semibold">Sign in</Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">Full Name</label>
              <input
                {...register("name")}
                type="text"
                placeholder="Enter your full name"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">Email address</label>
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">Password</label>
              <input
                {...register("password")}
                type="password"
                placeholder="Create a password"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message as string}</p>}
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full flex justify-center py-6 text-lg font-bold bg-[#0071c2] hover:bg-[#005999]">
              Register
            </Button>
          </div>
        </form>

        <p className="text-center text-xs text-gray-500 mt-8 leading-relaxed">
          By signing in or creating an account, you agree with our <Link href="#" className="text-blue-600 hover:underline">Terms & Conditions</Link> and <Link href="#" className="text-blue-600 hover:underline">Privacy Statement</Link>
        </p>
      </div>
    </div>
  );
}
