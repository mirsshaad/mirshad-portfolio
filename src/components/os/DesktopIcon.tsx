"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useOSStore } from "@/store/os.store";

interface DesktopIconProps {
  appId: string;
  title: string;
  icon: React.ComponentType;
  x?: number;
  y?: number;
}

export default function DesktopIcon({ appId, title, icon: Icon }: DesktopIconProps) {
  const { openApp, theme } = useOSStore();
  const [isSelected, setIsSelected] = useState(false);

  const handleDoubleClick = () => {
    openApp(appId, title);
    setIsSelected(false);
  };

  const handleSingleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(true);

    // Global click listener to deselect
    const deselect = () => {
      setIsSelected(false);
      document.removeEventListener("click", deselect);
    };
    document.addEventListener("click", deselect);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.05}
      whileTap={{ scale: 0.95 }}
      onClick={handleSingleClick}
      onDoubleClick={handleDoubleClick}
      className="w-20 h-22 flex flex-col items-center justify-center gap-1.5 rounded-lg cursor-default border border-transparent active:cursor-grabbing p-1.5 relative"
    >
      {/* Background Highlight selection */}
      {isSelected && (
        <div className={`absolute inset-0 rounded-lg -z-10 ${
          theme === "dark" 
            ? "bg-white/10 border border-white/15" 
            : "bg-black/5 border border-black/10"
        }`} />
      )}

      {/* Icon Frame */}
      <div className="w-11 h-11 rounded-xl flex items-center justify-center drop-shadow-md relative">
        <Icon />
      </div>

      {/* Label */}
      <span className={`text-[10px] font-semibold text-center select-none truncate w-full px-0.5 leading-tight shadow-text filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${
        theme === "dark" ? "text-zinc-100" : "text-zinc-900"
      }`}>
        {title}
      </span>
    </motion.div>
  );
}
