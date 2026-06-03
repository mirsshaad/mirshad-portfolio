"use client";

import React, { useState } from "react";
import { Cpu, Terminal, ShieldCheck, Code, Settings } from "lucide-react";

interface SkillItem {
  name: string;
  level: number; // percentage
  exp: string; // e.g. "2+ years"
}

interface SkillCategory {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    icon: Code,
    skills: [
      { name: "React", level: 90, exp: "2+ Years" },
      { name: "Next.js 15", level: 85, exp: "1.5 Years" },
      { name: "TypeScript", level: 80, exp: "2 Years" },
      { name: "Tailwind CSS", level: 95, exp: "2.5 Years" },
      { name: "HTML / CSS / JS", level: 95, exp: "3 Years" },
    ]
  },
  {
    id: "backend",
    name: "Backend & DB",
    icon: Terminal,
    skills: [
      { name: "Node.js / Express", level: 85, exp: "2 Years" },
      { name: "Python", level: 90, exp: "2.5 Years" },
      { name: "Java / C", level: 80, exp: "3 Years" },
      { name: "REST APIs", level: 90, exp: "2 Years" },
      { name: "SQL & MongoDB", level: 85, exp: "2 Years" },
    ]
  },
  {
    id: "cloud",
    name: "Cloud & Security",
    icon: ShieldCheck,
    skills: [
      { name: "AWS Services", level: 90, exp: "2 Years" },
      { name: "Microsoft Azure", level: 85, exp: "1.5 Years" },
      { name: "Virtual Networks / VPC", level: 80, exp: "1.5 Years" },
      { name: "Cloud Security / IAM", level: 85, exp: "2 Years" },
      { name: "Storage / RDS / S3", level: 90, exp: "2 Years" },
    ]
  },
  {
    id: "ai",
    name: "Artificial Intelligence",
    icon: Cpu,
    skills: [
      { name: "Machine Learning", level: 80, exp: "2 Years" },
      { name: "LSTM Neural Networks", level: 85, exp: "1 Year" },
      { name: "TensorFlow / Keras", level: 75, exp: "1.5 Years" },
      { name: "AI Web Automation", level: 90, exp: "1.5 Years" },
      { name: "LLM Prompting & API", level: 95, exp: "2 Years" },
    ]
  },
  {
    id: "tools",
    name: "Tools & DevOps",
    icon: Settings,
    skills: [
      { name: "Git / GitHub", level: 95, exp: "3 Years" },
      { name: "Docker Containers", level: 80, exp: "1.5 Years" },
      { name: "CI / CD (GitHub Actions)", level: 80, exp: "1.5 Years" },
      { name: "Linux Bash Scripting", level: 85, exp: "2 Years" },
      { name: "VS Code / IDEs", level: 95, exp: "3 Years" },
    ]
  }
];

export default function SkillsApp() {
  const [activeTab, setActiveTab] = useState("frontend");

  const activeCategory = SKILL_CATEGORIES.find((c) => c.id === activeTab) || SKILL_CATEGORIES[0];

  // SVG Radar Chart Coordinates (Center is 100, 100)
  // Categories in order: Cloud, Frontend, Backend, AI/ML, DevOps, Database
  const radarMetrics = [
    { label: "Cloud", val: 90, x: 100, y: 30 },
    { label: "Frontend", val: 92, x: 165, y: 65 },
    { label: "Backend", val: 88, x: 165, y: 135 },
    { label: "AI & ML", val: 82, x: 100, y: 170 },
    { label: "DevOps", val: 85, x: 35, y: 135 },
    { label: "Database", val: 86, x: 35, y: 65 },
  ];

  // Generate SVG Polygon path string
  const getRadarPolygonPath = () => {
    return radarMetrics
      .map((m) => {
        // Calculate point coordinate based on factor (0 to 1) from center (100,100)
        const factor = m.val / 100;
        const x = 100 + (m.x - 100) * factor;
        const y = 100 + (m.y - 100) * factor;
        return `${x},${y}`;
      })
      .join(" ");
  };

  return (
    <div className="flex flex-col md:flex-row h-full min-h-[480px]">
      {/* Left: Tab selection */}
      <div className="w-full md:w-56 bg-zinc-900/30 border-r border-white/5 p-3 flex flex-col gap-1 shrink-0 select-none">
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider px-2.5 mb-1.5">Categories</p>
        {SKILL_CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveTab(c.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs transition ${
              activeTab === c.id 
                ? "bg-os-blue text-white" 
                : "hover:bg-white/5 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <c.icon size={15} className={activeTab === c.id ? "text-white" : "text-zinc-500 shrink-0"} />
            <span>{c.name}</span>
          </button>
        ))}
      </div>

      {/* Right: Skills List and Radar Panel */}
      <div className="flex-1 p-6 sm:p-8 overflow-y-auto flex flex-col lg:flex-row gap-8">
        
        {/* Progress list section */}
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
              <activeCategory.icon size={16} className="text-os-blue" /> {activeCategory.name} Skills
            </h3>
            <p className="text-[10px] text-zinc-500 mt-0.5">Estimated confidence level & experience</p>
          </div>

          <div className="flex flex-col gap-4.5 mt-2">
            {activeCategory.skills.map((skill, index) => (
              <div key={index} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-zinc-200">{skill.name}</span>
                  <div className="flex items-center gap-3 text-zinc-500 text-[10px]">
                    <span>{skill.exp}</span>
                    <span className="font-bold text-os-blue text-xs">{skill.level}%</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-white/5 border border-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-os-blue rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Radar spider chart section */}
        <div className="w-full lg:w-64 flex flex-col items-center justify-center shrink-0 border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-6">
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider text-center mb-2">Overall Profile Radar</p>
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 200 200" className="w-full h-full text-zinc-700">
              {/* Outer boundary hexagon */}
              <polygon points="100,30 165,65 165,135 100,170 35,135 35,65" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3" />
              {/* Inner hexagons for grid steps */}
              <polygon points="100,50 150,78 150,122 100,150 50,122 50,78" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3" opacity="0.6" />
              <polygon points="100,70 135,90 135,110 100,130 65,110 65,90" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3" opacity="0.3" />
              
              {/* Axis lines */}
              <line x1="100" y1="100" x2="100" y2="30" stroke="currentColor" strokeWidth="0.5" />
              <line x1="100" y1="100" x2="165" y2="65" stroke="currentColor" strokeWidth="0.5" />
              <line x1="100" y1="100" x2="165" y2="135" stroke="currentColor" strokeWidth="0.5" />
              <line x1="100" y1="100" x2="100" y2="170" stroke="currentColor" strokeWidth="0.5" />
              <line x1="100" y1="100" x2="35" y2="135" stroke="currentColor" strokeWidth="0.5" />
              <line x1="100" y1="100" x2="35" y2="65" stroke="currentColor" strokeWidth="0.5" />

              {/* Data area polygon */}
              <polygon 
                points={getRadarPolygonPath()} 
                fill="rgba(0, 122, 255, 0.25)" 
                stroke="#007aff" 
                strokeWidth="1.5" 
              />

              {/* Text Labels */}
              <text x="100" y="24" textAnchor="middle" className="text-[7px] font-semibold fill-zinc-400">Cloud</text>
              <text x="170" y="65" textAnchor="start" className="text-[7px] font-semibold fill-zinc-400">Frontend</text>
              <text x="170" y="138" textAnchor="start" className="text-[7px] font-semibold fill-zinc-400">Backend</text>
              <text x="100" y="180" textAnchor="middle" className="text-[7px] font-semibold fill-zinc-400">AI & ML</text>
              <text x="30" y="138" textAnchor="end" className="text-[7px] font-semibold fill-zinc-400">DevOps</text>
              <text x="30" y="65" textAnchor="end" className="text-[7px] font-semibold fill-zinc-400">Database</text>
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
