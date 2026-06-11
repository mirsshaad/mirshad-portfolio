"use client";

import React, { useState } from "react";
import { useOSStore } from "@/store/os.store";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";
import ContextMenu from "./ContextMenu";
import { 
  Search,
  Bell,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  CloudSun
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { GlassEffect, GlassFilter } from "@/components/ui/liquid-glass";
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

// Lazy loaded App Views
import AboutApp from "@/apps/AboutApp";
import ProjectsApp from "@/apps/ProjectsApp";
import SkillsApp from "@/apps/SkillsApp";
import TradingBotApp from "@/apps/TradingBotApp";
import AzureSolutionsApp from "@/apps/AzureSolutionsApp";
import AwsSolutionsApp from "@/apps/AwsSolutionsApp";
import TerminalApp from "@/apps/TerminalApp";
import AnalyticsApp from "@/apps/AnalyticsApp";
import FootballApp from "@/apps/FootballApp";
import GalleryApp from "@/apps/GalleryApp";
import ResumeApp from "@/apps/ResumeApp";
import ContactApp from "@/apps/ContactApp";
import GameCenterApp from "@/apps/GameCenterApp";
import SettingsApp from "@/apps/SettingsApp";
import MultiCloudApp from "@/apps/MultiCloudApp";

interface DesktopIconConfig {
  appId: string;
  title: string;
  icon: React.ComponentType;
}

const DESKTOP_ICONS: DesktopIconConfig[] = [
  { appId: "about", title: "About Me", icon: MacAboutIcon },
  { appId: "projects", title: "Projects Finder", icon: MacFinderIcon },
  { appId: "skills", title: "Skills", icon: MacSkillsIcon },
  { appId: "trading-bot", title: "AI Trading Bot", icon: MacTradingBotIcon },
  { appId: "aws-solutions", title: "AWS Deploys", icon: MacAwsSolutionsIcon },
  { appId: "azure-solutions", title: "Azure Deploys", icon: MacAzureSolutionsIcon },
  { appId: "multi-cloud-app", title: "Multi-Cloud", icon: MacMultiCloudIcon },
  { appId: "analytics", title: "Analytics", icon: MacAnalyticsIcon },
  { appId: "football", title: "Football Journey", icon: MacFootballIcon },
  { appId: "gallery", title: "Gallery", icon: MacGalleryIcon },
  { appId: "resume", title: "Resume PDF", icon: MacResumeIcon },
  { appId: "contact", title: "Contact", icon: MacSafariIcon },
  { appId: "terminal", title: "Terminal", icon: MacTerminalIcon },
  { appId: "game", title: "Game Center", icon: MacGameCenterIcon },
  { appId: "settings", title: "Settings", icon: MacSettingsIcon },
];

export default function Desktop() {
  const { 
    windows, 
    wallpaper, 
    theme,
    showSearch,
    toggleSearch,
    showNotifications,
    toggleNotifications,
    openApp
  } = useOSStore();

  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleDesktopClick = () => {
    setContextMenu(null);
  };

  // Render correct app component inside window
  const renderAppContent = (appId: string) => {
    switch (appId) {
      case "about":
        return <AboutApp />;
      case "projects":
        return <ProjectsApp />;
      case "skills":
        return <SkillsApp />;
      case "trading-bot":
        return <TradingBotApp />;
      case "aws-solutions":
        return <AwsSolutionsApp />;
      case "azure-solutions":
        return <AzureSolutionsApp />;
      case "multi-cloud-app":
        return <MultiCloudApp />;
      case "terminal":
        return <TerminalApp />;
      case "analytics":
        return <AnalyticsApp />;
      case "football":
        return <FootballApp />;
      case "gallery":
        return <GalleryApp />;
      case "resume":
        return <ResumeApp />;
      case "contact":
        return <ContactApp />;
      case "game":
        return <GameCenterApp />;
      case "settings":
        return <SettingsApp />;
      default:
        return <div className="p-4 text-center">App failed to load.</div>;
    }
  };

  // Filter apps based on spotlight search
  const filteredSearchItems = DESKTOP_ICONS.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div 
      onContextMenu={handleContextMenu}
      onClick={handleDesktopClick}
      className={`relative w-screen h-screen overflow-hidden flex flex-col pt-8 transition-colors duration-500 select-none ${
        theme === "dark" ? "theme-dark text-white" : "theme-light text-zinc-950"
      } bg-mesh-${wallpaper}`}
      style={{
        backgroundImage: `var(--color-bg-mesh-${wallpaper})`,
        animation: "moveBackground 120s linear infinite"
      }}
    >
      <GlassFilter />
      <MenuBar />

      {/* Weather Widget (macOS style) */}
      <GlassEffect
        className={`absolute top-14 right-6 w-44 h-44 rounded-2xl border cursor-default hidden md:block ${
          theme === "dark" ? "border-white/5" : "border-black/5"
        }`}
        style={{ zIndex: 0 }}
      >
        <div className={`w-full h-full p-4 flex flex-col justify-between select-none ${
          theme === "dark" ? "text-white" : "text-zinc-900"
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-xs font-bold tracking-wide">Wayanad</h4>
              <span className="text-[10px] opacity-60">Partly Cloudy</span>
            </div>
            <CloudSun className="text-amber-400 shrink-0 animate-pulse" size={26} />
          </div>

          <div>
            <h2 className="text-4xl font-light tracking-tighter">28°</h2>
          </div>

          <div className="flex justify-between items-center text-[10px] opacity-75 border-t border-white/5 pt-2">
            <span>H: 31° &nbsp; L: 23°</span>
            <span className="flex items-center gap-1 font-bold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> AQI 18
            </span>
          </div>
        </div>
      </GlassEffect>

      {/* Grid of Desktop Icons */}
      <div className="absolute top-12 left-4 bottom-24 w-28 flex flex-col flex-wrap gap-4 items-start content-start pointer-events-auto">
        {DESKTOP_ICONS.map((item) => (
          <DesktopIcon
            key={item.appId}
            appId={item.appId}
            title={item.title}
            icon={item.icon}
          />
        ))}
      </div>

      {/* Render open application windows */}
      {windows.map((w) => (
        <Window key={w.appId} appId={w.appId} title={w.title}>
          {renderAppContent(w.appId)}
        </Window>
      ))}

      {/* Right-click Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* SPOTLIGHT SEARCH DIALOG */}
      {showSearch && (
        <div 
          onClick={toggleSearch}
          className="fixed inset-0 bg-black/40 z-[9990] flex items-start justify-center pt-24 backdrop-blur-sm pointer-events-auto"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`w-[450px] rounded-xl border shadow-2xl p-4 flex flex-col gap-3 ${
              theme === "dark"
                ? "bg-zinc-900/90 border-white/10 text-white"
                : "bg-zinc-50/90 border-black/10 text-zinc-900"
            } backdrop-blur-xl`}
          >
            <div className="flex items-center gap-3 border-b border-white/10 pb-2">
              <Search size={18} className="opacity-55" />
              <input
                autoFocus
                type="text"
                placeholder="Search applications, skills, files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-sm placeholder:opacity-40"
              />
            </div>

            <div className="flex flex-col gap-1 max-h-56 overflow-auto">
              {filteredSearchItems.map((item) => (
                <button
                  key={item.appId}
                  onClick={() => {
                    openApp(item.appId, item.title);
                    toggleSearch();
                    setSearchQuery("");
                  }}
                  className={`flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-left text-xs ${
                    theme === "dark" 
                      ? "hover:bg-white/10" 
                      : "hover:bg-black/5"
                  }`}
                >
                  <div className="w-6 h-6 rounded-md flex items-center justify-center drop-shadow relative">
                    <item.icon />
                  </div>
                  <span>{item.title}</span>
                </button>
              ))}
              {filteredSearchItems.length === 0 && (
                <div className="text-center py-4 text-xs text-zinc-500 italic">
                  No matching apps found. Try "Skills", "Terminal", "Contact".
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATIONS CENTER PANEL */}
      {showNotifications && (
        <div 
          onClick={toggleNotifications}
          className="fixed inset-0 bg-transparent z-[9990] flex justify-end pointer-events-auto"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`w-[320px] h-[calc(100vh-32px)] mt-8 border-l flex flex-col gap-4 p-5 shadow-2xl ${
              theme === "dark"
                ? "bg-zinc-950/85 border-white/10 text-white"
                : "bg-zinc-50/90 border-black/10 text-zinc-900"
            } backdrop-blur-xl`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-wide flex items-center gap-2">
                <Bell size={15} /> Notification Center
              </h3>
              <button 
                onClick={toggleNotifications}
                className="text-xs opacity-50 hover:opacity-100"
              >
                Close
              </button>
            </div>

            {/* Simulated Notifications */}
            <div className="flex flex-col gap-3.5 flex-1 overflow-auto">
              <div className={`p-3 rounded-xl border flex flex-col gap-1.5 ${
                theme === "dark" ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"
              }`}>
                <div className="flex items-center justify-between text-[10px] opacity-55">
                  <span className="flex items-center gap-1"><Sparkles size={10} /> Recruiter Protocol</span>
                  <span>Just now</span>
                </div>
                <h4 className="text-xs font-semibold">Welcome to MVP OS v1.0!</h4>
                <p className="text-[10px] opacity-75 leading-normal">
                  Explore Mirshad's cloud engineering labs, interactive terminal, and play Code Runner.
                </p>
              </div>

              <div className={`p-3 rounded-xl border flex flex-col gap-1.5 ${
                theme === "dark" ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"
              }`}>
                <div className="flex items-center justify-between text-[10px] opacity-55">
                  <span className="flex items-center gap-1"><TrendingUp size={10} /> AI Trading Bot</span>
                  <span>10 mins ago</span>
                </div>
                <h4 className="text-xs font-semibold">LSTM Prediction Finished</h4>
                <p className="text-[10px] opacity-75 leading-normal">
                  Binance API data feed validated. Predicted trend is positive. Open Trading Bot to see chart.
                </p>
              </div>

              <div className={`p-3 rounded-xl border flex flex-col gap-1.5 ${
                theme === "dark" ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"
              }`}>
                <div className="flex items-center justify-between text-[10px] opacity-55">
                  <span className="flex items-center gap-1"><ShieldCheck size={10} /> Cloud Security</span>
                  <span>1 hour ago</span>
                </div>
                <h4 className="text-xs font-semibold">AWS Compliance Check Passed</h4>
                <p className="text-[10px] opacity-75 leading-normal">
                  IAM, virtual network gateway configurations checked. 100% compliant.
                </p>
              </div>
            </div>

            {/* Social handles shortcuts */}
            <div className="flex gap-2 border-t border-white/10 dark:border-black/10 pt-4">
              <a 
                href="https://github.com/Mirshadvp7377" 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border text-xs font-medium bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800"
              >
                <FaGithub size={13} /> GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/mirshadvp" 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border text-xs font-medium bg-[#0a66c2] border-[#0a66c2] text-white hover:opacity-90"
              >
                <FaLinkedin size={13} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}

      <Dock />
    </div>
  );
}
