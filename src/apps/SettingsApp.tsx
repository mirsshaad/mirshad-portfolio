"use client";

import React from "react";
import { useOSStore } from "@/store/os.store";
import { Sliders, Sun, Moon, Volume2, VolumeX, Image as ImageIcon, Check } from "lucide-react";

interface WallpaperOption {
  id: string;
  name: string;
  class: string;
}

const WALLPAPERS: WallpaperOption[] = [
  { id: "liquid-glass-bg", name: "Liquid Glass Unsplash", class: "bg-mesh-liquid-glass-bg" },
  { id: "beach-waves", name: "Beach Waves", class: "bg-mesh-beach-waves" },
  { id: "mountain-lake", name: "Mountain Lake", class: "bg-mesh-mountain-lake" },
  { id: "aurora-landscape", name: "Aurora Canyon", class: "bg-mesh-aurora-landscape" },
  { id: "sonoma", name: "macOS Sonoma", class: "bg-mesh-sonoma" },
  { id: "dark", name: "Deep Space Dark", class: "bg-mesh-dark" },
  { id: "aurora", name: "Emerald Aurora", class: "bg-mesh-aurora" },
  { id: "light", name: "Light Mesh", class: "bg-mesh-light" },
  { id: "solid-dark", name: "Midnight Solid", class: "bg-solid-dark" },
];

export default function SettingsApp() {
  const { 
    theme, 
    setTheme, 
    wallpaper, 
    setWallpaper, 
    soundOn, 
    setSoundOn 
  } = useOSStore();

  return (
    <div className="p-6 sm:p-8 overflow-y-auto h-full flex flex-col gap-6 text-zinc-300 select-none">
      
      {/* Header */}
      <div className="border-b border-white/5 pb-4">
        <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
          <Sliders size={18} className="text-os-blue" /> System Configuration
        </h2>
        <p className="text-[11px] text-zinc-400 mt-1 font-mono">Personalize wallpaper, sound profiles, and theme modes</p>
      </div>

      {/* Settings Grid */}
      <div className="flex flex-col gap-6 max-w-lg">
        
        {/* Theme Settings */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Appearance Mode</h3>
          <div className="flex gap-4 mt-1">
            <button
              onClick={() => setTheme("dark")}
              className={`flex-1 p-3 rounded-xl border flex items-center justify-center gap-2 cursor-default transition ${
                theme === "dark"
                  ? "bg-os-blue/15 border-os-blue text-white"
                  : "bg-zinc-900/40 border-white/5 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Moon size={16} />
              <span className="text-xs font-semibold">Dark Theme</span>
            </button>
            <button
              onClick={() => setTheme("light")}
              className={`flex-1 p-3 rounded-xl border flex items-center justify-center gap-2 cursor-default transition ${
                theme === "light"
                  ? "bg-os-blue/15 border-os-blue text-white"
                  : "bg-zinc-900/40 border-white/5 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Sun size={16} />
              <span className="text-xs font-semibold">Light Theme</span>
            </button>
          </div>
        </div>

        {/* Wallpaper Picker */}
        <div className="flex flex-col gap-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Desktop Background</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-1">
            {WALLPAPERS.map((wall) => {
              const isSelected = wallpaper === wall.id;
              return (
                <button
                  key={wall.id}
                  onClick={() => setWallpaper(wall.id)}
                  className={`relative h-20 rounded-xl overflow-hidden border cursor-default flex flex-col justify-end p-2.5 transition text-left group ${
                    isSelected ? "border-os-blue ring-2 ring-os-blue/20" : "border-white/5 hover:border-white/20"
                  } bg-mesh-${wall.id}`}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <span className="relative text-[9px] font-bold text-white tracking-wide truncate max-w-full drop-shadow">
                    {wall.name}
                  </span>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-os-blue flex items-center justify-center text-white">
                      <Check size={10} className="stroke-[3px]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Audio profile settings */}
        <div className="flex items-center justify-between border-t border-white/5 pt-5 mt-2">
          <div className="flex flex-col">
            <h3 className="text-xs font-bold text-zinc-200">System Sound Effects</h3>
            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Toggle chord synth boot audio feedback</p>
          </div>
          <button
            onClick={() => setSoundOn(!soundOn)}
            className={`p-2.5 rounded-xl border cursor-default transition ${
              soundOn 
                ? "bg-emerald-600/15 border-emerald-500/30 text-emerald-400" 
                : "bg-zinc-900 border-white/5 text-zinc-500"
            }`}
          >
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>

      </div>
    </div>
  );
}
