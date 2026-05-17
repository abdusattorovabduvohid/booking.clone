"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] px-4 text-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Something went wrong!</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
        We're sorry, but we encountered an unexpected error while loading this page. 
        {error.message && <span className="block mt-2 text-sm">Error details: {error.message}</span>}
      </p>
      <Button onClick={() => reset()} className="bg-[#0071c2] hover:bg-[#005999] px-8 py-6 text-lg font-bold">
        Try again
      </Button>
    </div>
  );
}
