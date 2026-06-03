"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, ZoomIn, X } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  src: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, title: "Long Short-Term Memory Prediction Model", category: "AI Trading Bot", src: "/images/project-ai-trading.png" },
  { id: 2, title: "Multi-AZ Cloud Subnet Partitioning Map", category: "AWS Cloud Infrastructure", src: "/images/project-cloud.png" },
  { id: 3, title: "MindGPT Application Console Frame", category: "AI Productivity Platform", src: "/images/project-mindgpt.png" },
  { id: 4, title: "Wayanad Luxury Resort Landing Banner", category: "Holiday Inn Platform", src: "/images/project-resort.png" },
  { id: 5, title: "Mirshad V P — Professional Portrait", category: "Owner Profile", src: "/images/profile.jpg" },
];

export default function GalleryApp() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  return (
    <div className="p-6 overflow-y-auto h-full flex flex-col gap-6 text-zinc-300">
      <div>
        <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
          <ImageIcon size={18} className="text-os-blue" /> Media Gallery
        </h2>
        <p className="text-[11px] text-zinc-400 mt-1 font-mono">System screenshot inventory and project architectural diagrams</p>
      </div>

      {/* Grid of gallery files */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {GALLERY_ITEMS.map((item) => (
          <div 
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group relative h-40 bg-zinc-900 border border-white/5 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:border-os-blue/35 transition duration-300"
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
            {/* Overlay cover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <span className="text-[8px] text-os-blue font-bold uppercase tracking-wider">{item.category}</span>
              <p className="text-[10px] font-semibold text-white leading-normal truncate">{item.title}</p>
            </div>
            <ZoomIn size={16} className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-85 transition-opacity" />
          </div>
        ))}
      </div>

      {/* POPUP VIEW LARGE */}
      {activeItem && (
        <div 
          onClick={() => setActiveItem(null)}
          className="fixed inset-0 z-[9999] bg-black/90 flex flex-col items-center justify-center p-6 backdrop-blur-md"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[700px] h-[380px] sm:h-[450px] bg-zinc-950 rounded-2xl border border-white/10 overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Close button */}
            <button 
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black/85"
            >
              <X size={16} />
            </button>

            {/* Photo frame */}
            <div className="flex-1 w-full relative bg-zinc-900">
              <Image
                src={activeItem.src}
                alt={activeItem.title}
                fill
                className="object-contain"
              />
            </div>

            {/* Info panel */}
            <div className="p-4 border-t border-white/5 bg-zinc-900/90 backdrop-blur-md flex flex-col gap-1 select-text">
              <span className="text-[9px] text-os-blue font-bold uppercase tracking-widest">{activeItem.category}</span>
              <h3 className="text-xs font-bold text-white">{activeItem.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
