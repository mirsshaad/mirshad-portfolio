"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GraduationCap, Award, Briefcase, Heart, Rocket, User } from "lucide-react";

export default function AboutApp() {
  const roles = [
    "Full Stack Developer",
    "AI Builder",
    "Cloud Engineer",
    "Entrepreneur",
    "Football Player"
  ];
  
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const activeRole = roles[roleIndex];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) => activeRole.slice(0, prev.length + 1));
      }, 100);
    }

    if (!isDeleting && currentText === activeRole) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  return (
    <div className="flex flex-col md:flex-row h-full min-h-[480px]">
      {/* Left profile section */}
      <div className="w-full md:w-1/3 bg-zinc-900/30 border-r border-white/5 p-6 flex flex-col items-center text-center gap-4">
        <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-os-blue shadow-lg bg-zinc-800 shrink-0">
          <Image 
            src="/images/profile.jpg" 
            alt="Mirshad V P" 
            fill
            className="object-cover object-center"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight">Mirshad V P</h2>
          <div className="h-6 mt-1 flex items-center justify-center">
            <span className="text-xs text-os-blue font-medium bg-os-blue/15 px-2.5 py-0.5 rounded-full">
              {currentText}
              <span className="animate-pulse">|</span>
            </span>
          </div>
        </div>

        <div className="h-px bg-white/5 w-full my-2" />

        <div className="flex flex-col gap-3 w-full text-xs text-zinc-400 text-left px-2">
          <div className="flex items-center gap-3">
            <GraduationCap size={16} className="text-zinc-500 shrink-0" />
            <div>
              <p className="font-semibold text-zinc-300">LPU Student</p>
              <p>B.Tech Computer Science Engineering</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Rocket size={16} className="text-zinc-500 shrink-0" />
            <div>
              <p className="font-semibold text-zinc-300">Goal</p>
              <p>Technology Consultant & Founder</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Heart size={16} className="text-zinc-500 shrink-0" />
            <div>
              <p className="font-semibold text-zinc-300">Interests</p>
              <p>Football, Cloud Automation, Generative AI</p>
            </div>
          </div>
        </div>

        {/* LPU Logo */}
        <div className="mt-auto flex items-center gap-3 bg-white/5 border border-white/5 p-3 rounded-xl w-full">
          <div className="relative w-10 h-10 shrink-0 bg-white rounded-lg p-1.5">
            <Image 
              src="/images/lpu-logo.png" 
              alt="LPU Logo" 
              fill 
              className="object-contain p-1"
            />
          </div>
          <div className="text-left">
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Education</p>
            <p className="text-xs font-semibold text-zinc-300">Lovely Professional University</p>
          </div>
        </div>
      </div>

      {/* Right details section */}
      <div className="flex-1 p-6 sm:p-8 flex flex-col gap-6 overflow-y-auto">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
            <User size={18} className="text-os-blue" /> Personal Story
          </h3>
          <p className="text-xs leading-relaxed text-zinc-400 text-justify">
            Hello, I'm Mirshad V.P, a Computer Science Engineering student passionate about Cloud Computing, Artificial Intelligence, DevOps, and emerging technologies. My mission is to build software products that merge state-of-the-art engineering with practical utility, helping startups and businesses automate and scale.
          </p>
          <p className="text-xs leading-relaxed text-zinc-400 mt-3 text-justify">
            I believe that the future belongs to builders who don't just write code, but understand how to deploy architectures, configure robust security protocols, and train intelligent systems.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
            <Briefcase size={18} className="text-os-blue" /> Key Milestones
          </h3>
          <div className="relative border-l border-white/10 pl-4 ml-2 flex flex-col gap-4 py-2">
            <div className="relative">
              <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-os-blue border-2 border-black" />
              <p className="text-[10px] text-zinc-500 font-bold">2026 – PRESENT</p>
              <h4 className="text-xs font-semibold text-zinc-200">Building AI Solutions & Tech Agency</h4>
              <p className="text-[11px] text-zinc-400 leading-normal">
                Designing custom LSTM forecast bots, integrating APIs, deploying microservices for client platforms.
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-zinc-600 border-2 border-black" />
              <p className="text-[10px] text-zinc-500 font-bold">2025</p>
              <h4 className="text-xs font-semibold text-zinc-200">Enterprise Cloud Automations</h4>
              <p className="text-[11px] text-zinc-400 leading-normal">
                Built cloud infrastructure systems on AWS & Azure focusing on automation pipelines, IAM compliance, and cost savings.
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-zinc-600 border-2 border-black" />
              <p className="text-[10px] text-zinc-500 font-bold">2024</p>
              <h4 className="text-xs font-semibold text-zinc-200">Full Stack Foundations</h4>
              <p className="text-[11px] text-zinc-400 leading-normal">
                Studied software engineering principles, Java, Python, and frontend web development (React/NextJS).
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
            <Award size={18} className="text-os-blue" /> Mission Statement
          </h3>
          <div className="p-4 rounded-xl bg-os-blue/5 border border-os-blue/15 text-zinc-300 text-xs italic leading-relaxed">
            "To construct next-generation cloud architectures and machine learning integrations that solve operational issues, empowering organizations with reliable and intelligent automated systems."
          </div>
        </div>
      </div>
    </div>
  );
}
