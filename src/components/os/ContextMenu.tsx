"use client";

import React, { useEffect } from "react";
import { useOSStore } from "@/store/os.store";
import { Terminal, Settings, SunMoon, Image, RefreshCw, Info } from "lucide-react";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

export default function ContextMenu({ x, y, onClose }: ContextMenuProps) {
  const { theme, setTheme, openApp, wallpaper, setWallpaper } = useOSStore();

  useEffect(() => {
    const handleClose = () => onClose();
    document.addEventListener("click", handleClose);
    return () => document.removeEventListener("click", handleClose);
  }, [onClose]);

  const toggleTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTheme(theme === "dark" ? "light" : "dark");
    onClose();
  };

  const cycleWallpaper = (e: React.MouseEvent) => {
    e.stopPropagation();
    const wallpapers = ["mesh-sonoma", "mesh-dark", "mesh-aurora", "mesh-light", "solid-dark"];
    const currentIndex = wallpapers.indexOf(wallpaper);
    const nextIndex = (currentIndex + 1) % wallpapers.length;
    setWallpaper(wallpapers[nextIndex]);
    onClose();
  };

  return (
    <div
      style={{ top: y, left: x }}
      className={`absolute w-48 py-1.5 rounded-lg border shadow-2xl z-[9995] text-xs font-medium select-none ${
        theme === "dark"
          ? "bg-zinc-900/95 border-white/10 text-zinc-300"
          : "bg-zinc-50/95 border-black/10 text-zinc-800"
      } backdrop-blur-xl`}
    >
      <button
        onClick={() => openApp("about", "About Mirshad V P")}
        className="w-full px-3 py-1.5 hover:bg-os-blue hover:text-white text-left flex items-center gap-2"
      >
        <Info size={14} /> About MVP OS
      </button>
      <div className="h-px bg-white/10 dark:bg-black/10 my-1" />
      
      <button
        onClick={toggleTheme}
        className="w-full px-3 py-1.5 hover:bg-os-blue hover:text-white text-left flex items-center gap-2"
      >
        <SunMoon size={14} /> Switch Theme ({theme === "dark" ? "Light" : "Dark"})
      </button>
      
      <button
        onClick={cycleWallpaper}
        className="w-full px-3 py-1.5 hover:bg-os-blue hover:text-white text-left flex items-center gap-2"
      >
        <Image size={14} /> Cycle Wallpaper
      </button>

      <div className="h-px bg-white/10 dark:bg-black/10 my-1" />

      <button
        onClick={() => openApp("terminal", "Terminal")}
        className="w-full px-3 py-1.5 hover:bg-os-blue hover:text-white text-left flex items-center gap-2"
      >
        <Terminal size={14} /> Open Terminal
      </button>

      <button
        onClick={() => openApp("settings", "Settings")}
        className="w-full px-3 py-1.5 hover:bg-os-blue hover:text-white text-left flex items-center gap-2"
      >
        <Settings size={14} /> System Settings
      </button>

      <div className="h-px bg-white/10 dark:bg-black/10 my-1" />

      <button
        onClick={() => window.location.reload()}
        className="w-full px-3 py-1.5 hover:bg-os-blue hover:text-white text-left flex items-center gap-2"
      >
        <RefreshCw size={14} /> Reload System
      </button>
    </div>
  );
}
