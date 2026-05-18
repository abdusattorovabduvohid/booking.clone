"use client";

import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface PropertyActionButtonsProps {
  propertyId: string | number;
  propertyName: string;
  locale: string;
}

export function PropertyActionButtons({
  propertyId,
  propertyName,
  locale,
}: PropertyActionButtonsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("booking_favorites");
      if (saved) {
        const list = JSON.parse(saved);
        setIsLiked(list.includes(String(propertyId)));
      }
    } catch (e) {
      console.error(e);
    }
  }, [propertyId]);

  const handleLikeToggle = () => {
    try {
      const saved = localStorage.getItem("booking_favorites");
      let list = saved ? JSON.parse(saved) : [];

      if (list.includes(String(propertyId))) {
        list = list.filter((item: string) => item !== String(propertyId));
        setIsLiked(false);
      } else {
        list.push(String(propertyId));
        setIsLiked(true);
      }

      localStorage.setItem("booking_favorites", JSON.stringify(list));
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: propertyName,
      text: `Check out ${propertyName} on Booking.com!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        console.warn("navigator.share failed, falling back to clipboard copy", err);
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2500);
    } catch (clipboardErr) {
      console.error("Clipboard copy failed:", clipboardErr);
    }
  };

  const getTooltipText = () => {
    if (locale === "uz") return "Havola buferga nusxalandi! 📋";
    if (locale === "ru") return "Ссылка скопирована в буфер! 📋";
    return "Link copied to clipboard! 📋";
  };

  return (
    <div className="flex items-center gap-3 relative">
      {/* Heart Toggle Button */}
      <button
        onClick={handleLikeToggle}
        className={`p-2.5 rounded-full border transition-all duration-200 cursor-pointer shadow-xs hover:scale-105 active:scale-95 ${
          isLiked
            ? "border-red-500 bg-red-50 text-red-500 dark:border-red-600 dark:bg-red-950/20"
            : "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20"
        }`}
        title="Save property"
      >
        {isLiked ? (
          <FaHeart className="w-5 h-5 text-red-500 fill-current animate-pulse" />
        ) : (
          <FaRegHeart className="w-5 h-5" />
        )}
      </button>

      {/* Share Button */}
      <div className="relative">
        <button
          onClick={handleShare}
          className="p-2.5 rounded-full border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-200 cursor-pointer shadow-xs hover:scale-105 active:scale-95"
          title="Share property"
        >
          <FaShareAlt className="w-5 h-5" />
        </button>

        {/* Copy success tooltip toast */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              className="absolute right-0 top-full mt-2 w-48 bg-gray-900 text-white text-[11px] font-bold py-2 px-3 rounded shadow-lg z-50 text-center pointer-events-none"
            >
              {getTooltipText()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
