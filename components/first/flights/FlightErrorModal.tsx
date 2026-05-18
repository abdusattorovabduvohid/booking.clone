"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

interface FlightErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FlightErrorModal({ isOpen, onClose }: FlightErrorModalProps) {
  const t = useTranslations("Flights");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-end p-4">
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div className="px-8 pb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            {t("error_title")}
          </h2>
          
          <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-8">
            <li>{t("error_from")}</li>
            <li>{t("error_to")}</li>
            <li>{t("error_depart")}</li>
            <li>{t("error_return")}</li>
          </ol>
          
          <Button 
            onClick={onClose}
            className="w-full bg-[#202731] hover:bg-[#1a2028] text-white py-6 rounded-lg text-base font-bold shadow-none"
          >
            {t("dismiss")}
          </Button>
        </div>
      </div>
    </div>
  );
}
