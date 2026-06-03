"use client";

import React from "react";
import { FileText, Download, Briefcase, GraduationCap, Award, ShieldCheck } from "lucide-react";

interface TimelineItem {
  year: string;
  role: string;
  org: string;
  desc: string;
  tags: string[];
}

const EXP_DATA: TimelineItem[] = [
  {
    year: "2026 – Present",
    role: "AI & Cloud Solutions Developer",
    org: "Tech Agency & Independent Projects",
    desc: "Developing and deploying custom machine learning integrations, designing auto-scaling VPC architectures, and executing frontend software applications for businesses.",
    tags: ["NextJS", "Docker", "AWS", "ML"]
  },
  {
    year: "2025",
    role: "ML and Data Pipelines Builder",
    org: "AI Research",
    desc: "Architected long short-term memory (LSTM) crypto prediction algorithms. Formulated automated triggers with Binance Exchange WebSocket endpoints.",
    tags: ["Python", "TensorFlow", "Pandas", "APIs"]
  },
  {
    year: "2024",
    role: "Full Stack Software Developer",
    org: "Freelance & Education Labs",
    desc: "Constructed frontend interfaces, payment webhooks, database locking schemes, and system APIs for e-commerce and local agency portals.",
    tags: ["React", "Express", "MongoDB", "Tailwind"]
  }
];

const EDU_DATA: TimelineItem[] = [
  {
    year: "2022 – Present",
    role: "B.Tech Computer Science Engineering",
    org: "Lovely Professional University",
    desc: "Specialization in Cloud Computing and AI. Core courses: Operating Systems, Computer Networks, Software Engineering, Database Systems.",
    tags: ["Cloud", "AI", "Core CS"]
  }
];

const CERT_DATA = [
  { name: "AWS Cloud Fundamentals", org: "Amazon Web Services" },
  { name: "Azure Fundamentals", org: "Microsoft Azure" },
  { name: "Cloud Security Basics", org: "Security Foundations" },
  { name: "DevOps Foundations", org: "CI/CD Automation" },
  { name: "AI & ML Foundations", org: "TensorFlow Academy" },
  { name: "Data Analytics Specialist", org: "Google Data Engineering" },
];

export default function ResumeApp() {
  const handleDownload = () => {
    if (typeof window !== "undefined") {
      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "Mirshad_VP_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[480px]">
      {/* Left panel: Timeline lists */}
      <div className="flex-1 p-6 sm:p-8 overflow-y-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
          <div>
            <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <FileText size={18} className="text-os-blue" /> Resume Timeline
            </h2>
            <p className="text-[11px] text-zinc-400 mt-1">Milestones, qualifications, and core developer experience</p>
          </div>

          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-os-blue hover:opacity-90 text-white text-xs font-semibold shrink-0 cursor-default"
          >
            <Download size={14} /> Download CV / Print
          </button>
        </div>

        {/* Section: Professional Experience */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <Briefcase size={14} className="text-os-blue" /> Professional Experience
          </h3>
          <div className="border-l border-white/10 pl-4 ml-1 flex flex-col gap-6 py-2">
            {EXP_DATA.map((item, idx) => (
              <div key={idx} className="relative">
                <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-os-blue border border-black" />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs">
                  <h4 className="font-semibold text-zinc-200">{item.role}</h4>
                  <span className="text-[10px] text-zinc-500 font-bold">{item.year}</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-medium mt-0.5">{item.org}</p>
                <p className="text-[11px] text-zinc-500 leading-relaxed mt-1 text-justify">{item.desc}</p>
                <div className="flex gap-1.5 mt-2">
                  {item.tags.map((t, i) => (
                    <span key={i} className="text-[8px] bg-white/5 text-zinc-400 px-2 py-0.5 rounded border border-white/5 font-bold uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Education */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <GraduationCap size={15} className="text-os-blue" /> Education History
          </h3>
          <div className="border-l border-white/10 pl-4 ml-1 flex flex-col gap-6 py-2">
            {EDU_DATA.map((item, idx) => (
              <div key={idx} className="relative">
                <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-zinc-600 border border-black" />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs">
                  <h4 className="font-semibold text-zinc-200">{item.role}</h4>
                  <span className="text-[10px] text-zinc-500 font-bold">{item.year}</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-medium mt-0.5">{item.org}</p>
                <p className="text-[11px] text-zinc-500 leading-relaxed mt-1 text-justify">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel: Credentials / Certificates */}
      <div className="w-full lg:w-72 bg-zinc-900/30 border-t lg:border-t-0 lg:border-l border-white/5 p-6 overflow-y-auto flex flex-col gap-5 shrink-0 select-none">
        <div>
          <h3 className="text-xs font-bold text-zinc-200 flex items-center gap-1.5 uppercase tracking-wider">
            <Award size={15} className="text-os-blue" /> Credentials & Certs
          </h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Verified technical certifications</p>
        </div>

        <div className="flex flex-col gap-2.5">
          {CERT_DATA.map((cert, idx) => (
            <div 
              key={idx}
              className="bg-zinc-950 border border-white/5 p-3 rounded-lg flex items-start gap-2.5 shadow-sm"
            >
              <ShieldCheck size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex flex-col select-text">
                <span className="text-[11px] font-semibold text-zinc-200 leading-tight">{cert.name}</span>
                <span className="text-[9px] text-zinc-500 mt-0.5">{cert.org}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
