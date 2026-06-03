"use client";

import React from "react";
import { Trophy, ShieldAlert, Heart, Calendar, Target, Award } from "lucide-react";

export default function FootballApp() {
  const pillars = [
    {
      title: "Discipline",
      desc: "Early morning drills, constant running routines, and strict training regimes translate directly to my coding schedules and systematic debugging loops.",
      icon: Target,
    },
    {
      title: "Teamwork",
      desc: "Synchronizing tactical movements across a 11-player grid is identical to coordinating microservice APIs, CI/CD pipes, and cross-functional team workflows.",
      icon: Trophy,
    },
    {
      title: "Leadership Under Pressure",
      desc: "Maintaining tactical composure during a critical 90th-minute penalty setup prepares me to deploy operational cloud hotfixes during server outages.",
      icon: Award,
    },
  ];

  return (
    <div className="p-6 overflow-y-auto h-full flex flex-col gap-6 text-zinc-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4">
        <div>
          <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <Trophy size={18} className="text-yellow-500" /> Football & Athletic Journey
          </h2>
          <p className="text-[11px] text-zinc-400 mt-1">Bridging athletic values with software craftsmanship</p>
        </div>
        <span className="text-[10px] bg-yellow-500/15 text-yellow-500 px-3 py-1 rounded-full font-bold uppercase tracking-wider mt-2 sm:mt-0">
          Winger / Forward
        </span>
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div 
              key={idx}
              className="bg-zinc-900/40 border border-white/5 p-4 rounded-xl flex flex-col gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/25 flex items-center justify-center text-yellow-500">
                <Icon size={16} />
              </div>
              <h3 className="text-xs font-bold text-zinc-100">{p.title}</h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed text-justify">{p.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Narrative Section */}
      <div className="bg-zinc-900/25 border border-white/5 p-5 rounded-xl text-xs flex flex-col gap-3">
        <h3 className="font-bold text-zinc-200 flex items-center gap-2">
          <Calendar size={14} className="text-yellow-500" /> The Competitive Edge
        </h3>
        <p className="leading-relaxed text-zinc-400 text-justify">
          To me, football is more than a recreational sport—it's an essential framework that builds character. Performing as a winger requires speed, situational intelligence, precision passing, and rapid execution. I carry these exact values into cloud computing, where designing high-availability nodes demands strict accuracy, structural logic, and performant speeds.
        </p>
        <p className="leading-relaxed text-zinc-400 text-justify">
          Through competitive matchups and university-level scrimmages, I've developed the resilience to manage setbacks and the drive to consistently train and update my tech stacks daily.
        </p>
      </div>

      {/* Quick stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
        <div className="bg-zinc-900/45 p-3 rounded-lg border border-white/5 text-center flex flex-col gap-0.5">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Position</span>
          <span className="text-xs font-semibold text-zinc-200">Forward / Winger</span>
        </div>
        <div className="bg-zinc-900/45 p-3 rounded-lg border border-white/5 text-center flex flex-col gap-0.5">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Preferred Foot</span>
          <span className="text-xs font-semibold text-zinc-200">Right Footed</span>
        </div>
        <div className="bg-zinc-900/45 p-3 rounded-lg border border-white/5 text-center flex flex-col gap-0.5">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Matches Played</span>
          <span className="text-xs font-semibold text-zinc-200">120+ games</span>
        </div>
        <div className="bg-zinc-900/45 p-3 rounded-lg border border-white/5 text-center flex flex-col gap-0.5">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Goal Contributions</span>
          <span className="text-xs font-semibold text-zinc-200">60+ Goals/Assists</span>
        </div>
      </div>
    </div>
  );
}
