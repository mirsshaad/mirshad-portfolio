"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useOSStore } from "@/store/os.store";
import { GlassEffect } from "@/components/ui/liquid-glass";
import { 
  MacAboutIcon, 
  MacFinderIcon, 
  MacSkillsIcon, 
  MacTradingBotIcon, 
  MacAzureSolutionsIcon,
  MacAwsSolutionsIcon, 
  MacTerminalIcon, 
  MacAnalyticsIcon, 
  MacFootballIcon, 
  MacGalleryIcon, 
  MacResumeIcon, 
  MacSafariIcon, 
  MacGameCenterIcon, 
  MacSettingsIcon,
  MacMultiCloudIcon
} from "./MacIcons";

interface DockItem {
  appId: string;
  title: string;
  icon: React.ComponentType;
}

const DOCK_ITEMS: DockItem[] = [
  { appId: "about", title: "About Me", icon: MacAboutIcon },
  { appId: "projects", title: "Projects Finder", icon: MacFinderIcon },
  { appId: "skills", title: "Skills Dashboard", icon: MacSkillsIcon },
  { appId: "trading-bot", title: "AI Trading Bot", icon: MacTradingBotIcon },
  { appId: "aws-solutions", title: "AWS Deploys", icon: MacAwsSolutionsIcon },
  { appId: "azure-solutions", title: "Azure Deploys", icon: MacAzureSolutionsIcon },
  { appId: "multi-cloud-app", title: "Multi-Cloud Controller", icon: MacMultiCloudIcon },
  { appId: "terminal", title: "Interactive Terminal", icon: MacTerminalIcon },
  { appId: "analytics", title: "OS Analytics", icon: MacAnalyticsIcon },
  { appId: "football", title: "Football Journey", icon: MacFootballIcon },
  { appId: "gallery", title: "Media Gallery", icon: MacGalleryIcon },
  { appId: "resume", title: "Resume & Credentials", icon: MacResumeIcon },
  { appId: "contact", title: "Contact Center", icon: MacSafariIcon },
  { appId: "game", title: "Game Center", icon: MacGameCenterIcon },
  { appId: "settings", title: "System Settings", icon: MacSettingsIcon },
];

export default function Dock() {
  const { openApp, windows, activeAppId, theme } = useOSStore();
  const [bouncingAppId, setBouncingAppId] = useState<string | null>(null);

  const mouseX = useMotionValue(Infinity);

  const handleLaunch = (appId: string, title: string) => {
    setBouncingAppId(appId);
    openApp(appId, title);
    
    // Stop bouncing after 1.5 seconds
    setTimeout(() => {
      setBouncingAppId(null);
    }, 1500);
  };

  return (
    <div className="fixed bottom-4 left-0 right-0 z-[9900] flex justify-center pointer-events-none">
      <GlassEffect
        className="rounded-2xl pointer-events-auto"
        style={{ height: "68px" }}
      >
        <motion.div
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className={`flex items-end gap-3 px-4 py-2.5 w-full h-full border-none bg-transparent ${
            theme === "dark" ? "text-white" : "text-zinc-900"
          }`}
        >
        {DOCK_ITEMS.map((item) => {
          const isOpen = windows.some((w) => w.appId === item.appId);
          const isActive = activeAppId === item.appId;
          const isBouncing = bouncingAppId === item.appId;

          return (
            <DockIcon
              key={item.appId}
              item={item}
              mouseX={mouseX}
              isOpen={isOpen}
              isActive={isActive}
              isBouncing={isBouncing}
              onClick={() => handleLaunch(item.appId, item.title)}
            />
          );
        })}
        </motion.div>
      </GlassEffect>
    </div>
  );
}

interface DockIconProps {
  item: DockItem;
  mouseX: any;
  isOpen: boolean;
  isActive: boolean;
  isBouncing: boolean;
  onClick: () => void;
}

function DockIcon({ item, mouseX, isOpen, isActive, isBouncing, onClick }: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate size expansion based on hover distance
  const widthTransform = useTransform(distance, [-150, 0, 150], [42, 60, 42]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [42, 60, 42]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div className="relative flex flex-col items-center group">
      {/* Tooltip */}
      <div className="absolute bottom-16 px-2.5 py-1 text-[10px] rounded-md font-medium tracking-wide shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none bg-zinc-950/80 text-white border border-white/5 backdrop-blur-sm">
        {item.title}
      </div>

      {/* Icon frame */}
      <motion.div
        ref={ref}
        onClick={onClick}
        style={{ width, height }}
        animate={isBouncing ? {
          y: [0, -18, 0, -10, 0],
          transition: { duration: 1.2, ease: "easeInOut", repeat: Infinity }
        } : { y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center rounded-xl cursor-default drop-shadow-lg relative w-full h-full"
      >
        <item.icon />
      </motion.div>

      {/* Active Indicators */}
      <div className="h-1 flex items-center justify-center mt-1">
        {isOpen && (
          <motion.div
            layoutId={`dot-${item.appId}`}
            className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-white" : "bg-white/40"}`}
          />
        )}
      </div>
    </div>
  );
}
