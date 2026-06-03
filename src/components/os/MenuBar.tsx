"use client";

import React, { useState, useEffect } from "react";
import { useOSStore } from "@/store/os.store";
import { 
  Wifi, 
  WifiOff, 
  Battery, 
  BatteryCharging, 
  Search, 
  Bell, 
  Volume2, 
  VolumeX, 
  Settings, 
  Terminal, 
  Play, 
  FileText,
  User,
  Coffee,
  ExternalLink,
  Info
} from "lucide-react";
import { GlassEffect } from "@/components/ui/liquid-glass";

export default function MenuBar() {
  const { 
    theme, 
    setTheme, 
    soundOn, 
    setSoundOn, 
    openApp, 
    shutdownSystem,
    toggleSearch,
    toggleNotifications
  } = useOSStore();

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);
  const [wifiOn, setWifiOn] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Time & Date updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }));
      setDate(now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Battery status API
  useEffect(() => {
    if (typeof window !== "undefined" && "getBattery" in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBattery = () => {
          setBatteryLevel(Math.round(battery.level * 100));
          setIsCharging(battery.charging);
        };
        updateBattery();
        battery.addEventListener("levelchange", updateBattery);
        battery.addEventListener("chargingchange", updateBattery);
        return () => {
          battery.removeEventListener("levelchange", updateBattery);
          battery.removeEventListener("chargingchange", updateBattery);
        };
      });
    } else {
      // Mock changes to make battery feel alive
      const interval = setInterval(() => {
        setBatteryLevel((prev) => (prev > 10 ? prev - 1 : 100));
      }, 60000);
      return () => clearInterval(interval);
    }
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleMenuClick = (e: React.MouseEvent, menuId: string) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === menuId ? null : menuId);
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-8 z-[9900] w-full">
      <GlassEffect
        className={`w-full h-full rounded-none border-b ${
          theme === "dark" ? "border-white/5" : "border-black/5"
        }`}
        style={{
          boxShadow: "none"
        }}
      >
        <div className={`w-full h-full flex items-center justify-between px-4 text-xs font-medium select-none ${
          theme === "dark" ? "text-zinc-200" : "text-zinc-800"
        }`}>
      
      {/* LEFT: Menu Actions */}
      <div className="flex items-center gap-4">
        {/* Apple/Logo Dropdown */}
        <div className="relative">
          <button 
            onClick={(e) => handleMenuClick(e, "logo")}
            className="cursor-default hover:bg-white/10 dark:hover:bg-zinc-800/50 p-1 px-1.5 rounded transition flex items-center justify-center"
          >
            <svg viewBox="0 0 170 170" width="14" height="14" fill="currentColor">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.37.13-9.13-1.9-14.28-6.07-3.47-2.91-7.41-7.84-11.83-14.79-9.13-14.6-13.7-29.21-13.7-43.83 0-15.42 3.92-28.27 11.75-38.56 7.84-10.29 17.22-15.5 28.16-15.63 6.13-.13 12.39 1.86 18.8 5.96 6.4 4.09 11.08 5.95 14.03 5.57 3.02-.38 7.88-2.4 14.58-6.07 7.51-4.04 14.02-5.77 19.53-5.2 19.82 2.02 34.42 12.19 43.81 30.5-16.71 10.12-24.96 23.47-24.78 40.06.19 13.1 4.97 23.86 14.34 32.27 9.38 8.41 20.31 12.92 32.8 13.56-.94 2.85-2.02 5.51-3.23 7.97zM119.22 19c0 7.73-2.77 14.88-8.3 21.43-5.54 6.56-12.08 10.47-19.63 11.73-.25-7.34 2.45-14.51 8.11-21.5 5.66-6.99 12.33-11.04 20-12.16.25.88.38 1.77.38 2.5z" />
            </svg>
          </button>
          
          {openDropdown === "logo" && (
            <div className={`absolute left-0 mt-1.5 w-52 py-1 rounded-lg shadow-xl border flex flex-col z-[9990] ${
              theme === "dark" 
                ? "bg-zinc-900/95 border-white/10 text-zinc-300" 
                : "bg-zinc-50/95 border-black/10 text-zinc-800"
            } backdrop-blur-xl`}>
              <button 
                onClick={() => openApp("about", "About Mirshad V P")}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-os-blue hover:text-white text-left w-full"
              >
                <Info size={14} /> About MVP OS
              </button>
              <button 
                onClick={() => openApp("settings", "Settings")}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-os-blue hover:text-white text-left w-full"
              >
                <Settings size={14} /> System Settings...
              </button>
              <div className="h-px bg-white/10 dark:bg-black/10 my-1" />
              <button 
                onClick={() => openApp("terminal", "Terminal")}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-os-blue hover:text-white text-left w-full"
              >
                <Terminal size={14} /> Developer Terminal
              </button>
              <div className="h-px bg-white/10 dark:bg-black/10 my-1" />
              <button 
                onClick={shutdownSystem}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-os-blue hover:text-white text-left w-full text-red-400 dark:text-red-400"
              >
                <VolumeX size={14} /> Shut Down...
              </button>
            </div>
          )}
        </div>

        {/* File Dropdown */}
        <div className="relative">
          <button 
            onClick={(e) => handleMenuClick(e, "file")}
            className="cursor-default hover:bg-white/10 dark:hover:bg-zinc-800/50 px-2 py-0.5 rounded transition"
          >
            File
          </button>
          {openDropdown === "file" && (
            <div className={`absolute left-0 mt-1.5 w-44 py-1 rounded-lg shadow-xl border flex flex-col z-[9990] ${
              theme === "dark" 
                ? "bg-zinc-900/95 border-white/10 text-zinc-300" 
                : "bg-zinc-50/95 border-black/10 text-zinc-800"
            } backdrop-blur-xl`}>
              <button 
                onClick={() => openApp("projects", "Projects Explorer")}
                className="px-3 py-1.5 hover:bg-os-blue hover:text-white text-left w-full flex items-center gap-2"
              >
                <FileText size={14} /> Open Projects
              </button>
              <button 
                onClick={() => openApp("resume", "Resume Viewer")}
                className="px-3 py-1.5 hover:bg-os-blue hover:text-white text-left w-full flex items-center gap-2"
              >
                <FileText size={14} /> View Resume
              </button>
            </div>
          )}
        </div>

        {/* Edit Dropdown */}
        <div className="relative">
          <button 
            onClick={(e) => handleMenuClick(e, "edit")}
            className="cursor-default hover:bg-white/10 dark:hover:bg-zinc-800/50 px-2 py-0.5 rounded transition"
          >
            Edit
          </button>
          {openDropdown === "edit" && (
            <div className={`absolute left-0 mt-1.5 w-44 py-1 rounded-lg shadow-xl border flex flex-col z-[9990] ${
              theme === "dark" 
                ? "bg-zinc-900/95 border-white/10 text-zinc-300" 
                : "bg-zinc-50/95 border-black/10 text-zinc-800"
            } backdrop-blur-xl`}>
              <div className="px-3 py-1.5 text-zinc-500 italic">No items selectable</div>
            </div>
          )}
        </div>

        {/* View Dropdown */}
        <div className="relative">
          <button 
            onClick={(e) => handleMenuClick(e, "view")}
            className="cursor-default hover:bg-white/10 dark:hover:bg-zinc-800/50 px-2 py-0.5 rounded transition"
          >
            View
          </button>
          {openDropdown === "view" && (
            <div className={`absolute left-0 mt-1.5 w-48 py-1 rounded-lg shadow-xl border flex flex-col z-[9990] ${
              theme === "dark" 
                ? "bg-zinc-900/95 border-white/10 text-zinc-300" 
                : "bg-zinc-50/95 border-black/10 text-zinc-800"
            } backdrop-blur-xl`}>
              <button 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="px-3 py-1.5 hover:bg-os-blue hover:text-white text-left w-full"
              >
                Toggle {theme === "dark" ? "Light" : "Dark"} Mode
              </button>
            </div>
          )}
        </div>

        {/* Help Dropdown */}
        <div className="relative">
          <button 
            onClick={(e) => handleMenuClick(e, "help")}
            className="cursor-default hover:bg-white/10 dark:hover:bg-zinc-800/50 px-2 py-0.5 rounded transition"
          >
            Help
          </button>
          {openDropdown === "help" && (
            <div className={`absolute left-0 mt-1.5 w-52 py-1 rounded-lg shadow-xl border flex flex-col z-[9990] ${
              theme === "dark" 
                ? "bg-zinc-900/95 border-white/10 text-zinc-300" 
                : "bg-zinc-50/95 border-black/10 text-zinc-800"
            } backdrop-blur-xl`}>
              <a 
                href="https://github.com/mirshad" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between px-3 py-1.5 hover:bg-os-blue hover:text-white text-left w-full"
              >
                Visit GitHub Profile <ExternalLink size={12} />
              </a>
              <a 
                href="https://linkedin.com/in/mirshad" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between px-3 py-1.5 hover:bg-os-blue hover:text-white text-left w-full"
              >
                Connect on LinkedIn <ExternalLink size={12} />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Status Icons & Time */}
      <div className="flex items-center gap-3">
        {/* Sound controls */}
        <button 
          onClick={() => setSoundOn(!soundOn)}
          className="hover:bg-white/10 dark:hover:bg-zinc-800/50 p-1 rounded transition cursor-default"
        >
          {soundOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
        </button>

        {/* Wifi controls */}
        <button 
          onClick={() => setWifiOn(!wifiOn)}
          className="hover:bg-white/10 dark:hover:bg-zinc-800/50 p-1 rounded transition cursor-default"
        >
          {wifiOn ? <Wifi size={14} /> : <WifiOff size={14} className="text-red-400" />}
        </button>

        {/* Battery info */}
        <div className="flex items-center gap-1.5 hover:bg-white/10 dark:hover:bg-zinc-800/50 px-1 py-0.5 rounded cursor-default">
          <span className="text-[10px]">{batteryLevel}%</span>
          {isCharging ? (
            <BatteryCharging size={14} className="text-emerald-400" />
          ) : (
            <Battery size={14} className={batteryLevel < 20 ? "text-red-400" : ""} />
          )}
        </div>

        {/* Spotlight Search Toggle */}
        <button 
          onClick={toggleSearch}
          className="hover:bg-white/10 dark:hover:bg-zinc-800/50 p-1 rounded transition cursor-default"
        >
          <Search size={14} />
        </button>

        {/* Notifications Drawer Toggle */}
        <button 
          onClick={toggleNotifications}
          className="hover:bg-white/10 dark:hover:bg-zinc-800/50 p-1 rounded transition cursor-default"
        >
          <Bell size={14} />
        </button>

        {/* Date & Time */}
        <div className="hover:bg-white/10 dark:hover:bg-zinc-800/50 px-2 py-0.5 rounded cursor-default">
          {date} &nbsp; {time}
        </div>
      </div>
      </div>
      </GlassEffect>
    </div>
  );
}
