"use client";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <button className="cursor-pointer hover:bg-white/10 p-2 rounded-full transition w-9 h-9"></button>;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button 
      onClick={() => setTheme(isDark ? "light" : "dark")} 
      className="cursor-pointer hover:bg-white/10 p-2 rounded-full transition w-9 h-9 flex items-center justify-center focus:outline-none"
      aria-label="Toggle Dark Mode"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
    </button>
  );
}
