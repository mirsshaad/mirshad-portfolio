"use client";

import React, { useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import { useOSStore } from "@/store/os.store";
import { Minus, Square, X } from "lucide-react";

interface WindowProps {
  appId: string;
  title: string;
  children: React.ReactNode;
}

export default function Window({ appId, title, children }: WindowProps) {
  const { 
    windows, 
    activeAppId, 
    closeApp, 
    minimizeApp, 
    maximizeApp, 
    focusApp,
    updateWindowPosition,
    theme 
  } = useOSStore();

  const win = windows.find((w) => w.appId === appId);
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);

  if (!win || win.isMinimized) return null;

  const isActive = activeAppId === appId;

  const handlePointerDown = (e: React.PointerEvent) => {
    focusApp(appId);
    dragControls.start(e);
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        x: win.isMaximized ? 0 : win.x,
        y: win.isMaximized ? 32 : win.y,
        width: win.isMaximized ? "100%" : win.width,
        height: win.isMaximized ? "calc(100vh - 108px)" : win.height,
        transition: { type: "spring", stiffness: 350, damping: 28 }
      }}
      exit={{ scale: 0.85, opacity: 0, transition: { duration: 0.15 } }}
      style={{ zIndex: win.zIndex }}
      onClick={() => focusApp(appId)}
      className={`absolute flex flex-col rounded-xl overflow-hidden border shadow-2xl ${
        theme === "dark" 
          ? "bg-zinc-950/85 border-white/10 text-white" 
          : "bg-zinc-50/90 border-black/10 text-zinc-900"
      } backdrop-blur-xl`}
      drag={!win.isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragEnd={(_, info) => {
        updateWindowPosition(appId, win.x + info.offset.x, win.y + info.offset.y);
      }}
    >
      {/* Title bar / Header */}
      <div 
        onPointerDown={handlePointerDown}
        className={`h-11 flex items-center justify-between px-4 select-none cursor-move border-b ${
          theme === "dark" 
            ? "bg-zinc-900/50 border-white/5 text-zinc-300" 
            : "bg-zinc-200/50 border-black/5 text-zinc-800"
        }`}
      >
        {/* Left: Traffic Lights */}
        <div className="flex items-center gap-2 group/lights">
          {/* Close */}
          <button 
            onClick={(e) => { e.stopPropagation(); closeApp(appId); }}
            className="w-3.5 h-3.5 rounded-full bg-os-red flex items-center justify-center text-[8px] text-red-950 opacity-90 hover:opacity-100 cursor-default"
          >
            <X size={10} className="opacity-0 group-hover/lights:opacity-100 transition-opacity" />
          </button>
          {/* Minimize */}
          <button 
            onClick={(e) => { e.stopPropagation(); minimizeApp(appId); }}
            className="w-3.5 h-3.5 rounded-full bg-os-yellow flex items-center justify-center text-[8px] text-amber-950 opacity-90 hover:opacity-100 cursor-default"
          >
            <Minus size={10} className="opacity-0 group-hover/lights:opacity-100 transition-opacity" />
          </button>
          {/* Maximize */}
          <button 
            onClick={(e) => { e.stopPropagation(); maximizeApp(appId); }}
            className="w-3.5 h-3.5 rounded-full bg-os-green flex items-center justify-center text-[8px] text-green-950 opacity-90 hover:opacity-100 cursor-default"
          >
            <Square size={6} className="opacity-0 group-hover/lights:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Center: Title */}
        <div className="text-xs font-semibold tracking-wide truncate max-w-[50%]">
          {title}
        </div>

        {/* Right side placeholder (to keep center balanced) */}
        <div className="w-14" />
      </div>

      {/* Body / Content */}
      <div className="flex-1 overflow-auto relative">
        {children}
      </div>
    </motion.div>
  );
}
