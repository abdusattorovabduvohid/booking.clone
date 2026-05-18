"use client";

import { useState, useEffect, MouseEvent } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface FavoriteButtonProps {
  id: string | number;
  size?: number;
  className?: string;
}

export function FavoriteButton({ id, size = 15, className = "" }: FavoriteButtonProps) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("booking_favorites");
      if (saved) {
        const list = JSON.parse(saved);
        setIsLiked(list.includes(String(id)));
      }
    } catch (e) {
      console.error("FavoriteButton load error:", e);
    }
  }, [id]);

  const handleToggle = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const saved = localStorage.getItem("booking_favorites");
      let list = saved ? JSON.parse(saved) : [];
      
      if (list.includes(String(id))) {
        list = list.filter((item: string) => item !== String(id));
        setIsLiked(false);
      } else {
        list.push(String(id));
        setIsLiked(true);
      }

      localStorage.setItem("booking_favorites", JSON.stringify(list));
    } catch (err) {
      console.error("FavoriteButton toggle error:", err);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm text-gray-400 hover:text-red-500 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ${className}`}
      aria-label="Toggle favorite"
    >
      {isLiked ? (
        <FaHeart size={size} className="text-red-500 fill-current animate-pulse" />
      ) : (
        <FaRegHeart size={size} className="text-gray-400 hover:text-red-500" />
      )}
    </button>
  );
}
