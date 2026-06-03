"use client";

import React, { useEffect, useState } from "react";
import { BarChart3, TrendingUp, Users, Clock, Code, Award, CheckCircle } from "lucide-react";

interface MetricItem {
  label: string;
  value: number;
  suffix: string;
  icon: React.ComponentType<any>;
  color: string;
}

export default function AnalyticsApp() {
  const [tickerVals, setTickerVals] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  const metrics: MetricItem[] = [
    { label: "Projects Completed", value: 12, suffix: "+", icon: CheckCircle, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { label: "Technologies Used", value: 34, suffix: "+", icon: Code, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { label: "Cloud Deployments", value: 24, suffix: "", icon: Award, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
    { label: "Hours Learning", value: 2200, suffix: "+", icon: Clock, color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
    { label: "AI Models Built", value: 6, suffix: "", icon: TrendingUp, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    { label: "Clients Served", value: 8, suffix: "+", icon: Users, color: "text-pink-400 bg-pink-500/10 border-pink-500/20" },
  ];

  useEffect(() => {
    const timers = metrics.map((m, index) => {
      const step = Math.max(Math.floor(m.value / 30), 1);
      let current = 0;
      const interval = setInterval(() => {
        current += step;
        if (current >= m.value) {
          current = m.value;
          clearInterval(interval);
        }
        setTickerVals((prev) => {
          const next = [...prev];
          next[index] = current;
          return next;
        });
      }, 35);
      return interval;
    });

    return () => timers.forEach(clearInterval);
  }, []);

  return (
    <div className="p-6 overflow-y-auto h-full flex flex-col gap-6 text-zinc-300 bg-zinc-950 font-mono">
      <div>
        <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
          <BarChart3 size={18} className="text-os-blue" /> Production Performance Analytics
        </h2>
        <p className="text-[11px] text-zinc-400 mt-1">Live metrics of architectural deployments and code delivery</p>
      </div>

      {/* Grid of counter cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          const displayVal = tickerVals[idx] || 0;
          return (
            <div 
              key={idx}
              className={`p-4 rounded-xl border flex flex-col gap-1.5 ${m.color}`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">{m.label}</span>
                <Icon size={16} />
              </div>
              <h3 className="text-xl font-bold text-white tracking-wider">
                {displayVal.toLocaleString()}{m.suffix}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Chart: Activity curve */}
      <div className="bg-zinc-900 border border-white/5 p-5 rounded-xl flex flex-col gap-4">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-white flex items-center gap-1.5">
            <TrendingUp size={14} className="text-os-blue" /> Monthly Learning & Project Output (Q1-Q2)
          </span>
          <span className="text-[10px] text-zinc-500">In commits & logs</span>
        </div>

        <div className="h-32 relative border border-white/5 rounded-lg p-2 bg-black/40 overflow-hidden flex items-end">
          <svg viewBox="0 0 500 100" className="w-full h-full text-os-blue" preserveAspectRatio="none">
            {/* Grid Lines */}
            <line x1="0" y1="20" x2="500" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            
            {/* Sparkline curve */}
            <path
              d="M 0,90 Q 50,60 100,75 T 200,30 T 300,50 T 400,20 T 500,10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="stroke-os-blue"
            />
          </svg>
        </div>

        {/* Chart timeline labels */}
        <div className="flex justify-between text-[9px] text-zinc-500 px-1 select-none">
          <span>JAN</span>
          <span>FEB</span>
          <span>MAR</span>
          <span>APR</span>
          <span>MAY</span>
          <span>JUN</span>
        </div>
      </div>
    </div>
  );
}
