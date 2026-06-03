"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Folder, FileText, ChevronRight, Info, ExternalLink, Code, Layers } from "lucide-react";

interface ProjectDetails {
  id: string;
  title: string;
  category: string;
  image: string;
  tech: string[];
  overview: string;
  problem: string;
  solution: string;
  architecture: string;
  results: string;
  lessons: string;
  liveUrl?: string;
  githubUrl?: string;
}

const PROJECTS_DATA: ProjectDetails[] = [
  {
    id: "trading-bot",
    title: "AI Trading Bot",
    category: "AI / ML",
    image: "/images/project-ai-trading.png",
    tech: ["Python", "TensorFlow", "Binance API", "LSTM Networks", "Pandas"],
    overview: "Automated cryptocurrency trading bot utilizing LSTM neural network forecasting models and live Binance exchange APIs for real-time trade signals.",
    problem: "Manual crypto trading is highly volatile, prone to emotional decision-making, and requires 24/7 monitoring of market conditions.",
    solution: "Developed an autonomous system that streams market candles via Binance WebSockets, cleans the features, runs predictions through a trained Long Short-Term Memory model, and automatically issues trade triggers under pre-set stop-loss policies.",
    architecture: "1. Data Collector (WebSockets) -> 2. Processing Pipeline (NumPy/Pandas) -> 3. LSTM Inference Model (TensorFlow) -> 4. Execution Core (Binance API) -> 5. Dashboard Visuals.",
    results: "Achieved an accuracy rate of 64% on trend prediction direction, resulting in a consistent hypothetical ROI over standard baseline test periods.",
    lessons: "Handling WebSocket disconnections and API rate limits taught me the importance of backoff algorithms, error logs, and multi-threaded script loops.",
    liveUrl: "https://github.com/mirshad",
    githubUrl: "https://github.com/mirshad"
  },
  {
    id: "holiday-inn",
    title: "Middle Wayanad Holiday Inn",
    category: "Web Platform",
    image: "/images/project-resort.png",
    tech: ["React", "NextJS", "NodeJS", "MongoDB", "Razorpay", "Twilio"],
    overview: "A premium booking engine and management system built for a luxury holiday inn in Wayanad, Kerala, facilitating online bookings and notifications.",
    problem: "The resort was receiving manual bookings over phone calls, leading to double bookings, unconfirmed schedules, and manual invoice tracking.",
    solution: "Built a fully automated responsive booking website that checks room inventory calendars, handles transactions using Razorpay gateway integration, sends Instant WhatsApp confirmation triggers via Twilio API, and provides a management dashboard.",
    architecture: "NextJS Frontend + Express Backend + MongoDB Database + Twilio WhatsApp Gateway + Razorpay payment webhook handler.",
    results: "Reduced booking errors to 0% and improved reservation conversion rates by 35% within the first month of system launch.",
    lessons: "Implementing reliable database locks during transaction processing prevents double-booking race conditions during high holiday traffic.",
    liveUrl: "https://github.com/mirshad",
    githubUrl: "https://github.com/mirshad"
  },
  {
    id: "cloud-architecture",
    title: "Cloud Architecture Projects",
    category: "Cloud / DevOps",
    image: "/images/project-cloud.png",
    tech: ["AWS Services", "EC2", "S3", "RDS", "CloudFront", "IAM", "VPC"],
    overview: "Comprehensive production architectures designed on AWS, focusing on high availability, security hardening, cost optimization, and load balancing.",
    problem: "Inefficient cloud resources causing inflated monthly billing, lack of automated recovery, and loose security policies without IAM separation.",
    solution: "Designed auto-scaling multi-AZ VPC deployments, separating public web-subnets from private database tiers. Integrated CloudFront caching networks for global delivery, set up IAM group policies, and implemented S3 automated lifecycle archival.",
    architecture: "Multi-AZ Auto-Scaling EC2 web nodes behind Application Load Balancers + RDS MySQL Database + CloudFront Edge locations + AWS CloudWatch tracking alerts.",
    results: "Cut down client AWS infrastructure billings by 28% and established 99.9% uptime compliance with automatic failovers.",
    lessons: "Strict security boundaries (least privilege access) and VPC security groups prevent lateral network movement in case of node vulnerability.",
    liveUrl: "https://github.com/mirshad",
    githubUrl: "https://github.com/mirshad"
  },
  {
    id: "tech-agency",
    title: "Tech Agency Platform",
    category: "Web Platform",
    image: "/images/project-mindgpt.png", // MindGPT asset
    tech: ["NextJS", "Tailwind CSS", "Framer Motion", "Vercel", "SendGrid"],
    overview: "Portfolio and service portal for a software consultancy agency, showcasing cloud migration and custom web/AI development services.",
    problem: "The agency needed a modern, high-performance website to capture leads and demonstrate capabilities in AI models and DevOps setups.",
    solution: "Crafted a beautiful NextJS site using framer motion micro-animations, structured services, responsive request forms, and email/WhatsApp automation for instant lead notifications.",
    architecture: "Jamstack NextJS static exports deployed on Vercel Edge Serverless functions + dynamic client scheduling interfaces.",
    results: "Secured a PageSpeed optimization score of 98/100, driving client lead conversions up by 150%.",
    lessons: "Component optimization, asset sizing, and edge-rendering lead to fast loading times which increase retention of enterprise leads.",
    liveUrl: "https://github.com/mirshad",
    githubUrl: "https://github.com/mirshad"
  },
  {
    id: "aourish-luxua",
    title: "Aourish Luxua Brand",
    category: "Branding / E-commerce",
    image: "/images/project-resort.png", // Placeholder image or resort
    tech: ["Branding", "E-commerce Vision", "UX/UI Design", "Figma", "Stripe"],
    overview: "Creative direction and e-commerce design system for a premium luxury footwear brand named Aourish Luxua.",
    problem: "Luxury brands require an extremely high level of visual polish, bespoke styling, and premium layouts to command elite market pricing.",
    solution: "Curated a sleek minimalist dark visual aesthetic using high-end product layouts, smooth transitions, a tailored shopping bag checkout flow, and premium typography settings.",
    architecture: "Headless Shopify Engine + custom NextJS front-end shopping grid + Stripe payment custom portal.",
    results: "Created a comprehensive brand guideline and interactive storefront prototypes ready for custom development.",
    lessons: "Bespoke user interactions (e.g. smooth zoom-in on product details) directly influence the perceived value of high-ticket items.",
    liveUrl: "https://github.com/mirshad",
    githubUrl: "https://github.com/mirshad"
  }
];

export default function ProjectsApp() {
  const [selectedId, setSelectedId] = useState("trading-bot");

  const project = PROJECTS_DATA.find((p) => p.id === selectedId) || PROJECTS_DATA[0];

  return (
    <div className="flex h-full min-h-[480px]">
      {/* Sidebar (Finder style) */}
      <div className="w-56 bg-zinc-900/30 border-r border-white/5 p-3 flex flex-col gap-1.5 shrink-0 select-none">
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider px-2.5 mb-1.5">Locations</p>
        {PROJECTS_DATA.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedId(p.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs transition ${
              selectedId === p.id 
                ? "bg-os-blue text-white" 
                : "hover:bg-white/5 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Folder size={15} className={selectedId === p.id ? "text-white" : "text-os-blue shrink-0"} />
            <span className="truncate">{p.title}</span>
          </button>
        ))}
      </div>

      {/* Main Panel */}
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
        {/* Header Title & Meta */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/5 pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight">{project.title}</h2>
            <p className="text-xs text-zinc-500 mt-0.5">{project.category}</p>
          </div>
          <div className="flex gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-os-blue text-white text-xs font-semibold hover:opacity-90 transition"
              >
                Live Demo <ExternalLink size={12} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 border border-white/5 text-xs font-semibold hover:bg-zinc-700 transition"
              >
                Code <Code size={12} />
              </a>
            )}
          </div>
        </div>

        {/* Project Image */}
        <div className="relative w-full h-[220px] rounded-xl overflow-hidden border border-white/5 bg-zinc-900 shadow-inner">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="text-[10px] font-semibold bg-white/5 text-zinc-300 px-2.5 py-1 rounded border border-white/5 uppercase"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Case Study Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-zinc-400">
          <div>
            <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-1.5 mb-2">
              <Info size={15} className="text-os-blue" /> Overview
            </h3>
            <p className="text-justify">{project.overview}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-1.5 mb-2">
              <Layers size={15} className="text-os-blue" /> Challenge / Problem
            </h3>
            <p className="text-justify">{project.problem}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-1.5 mb-2">
              <Code size={15} className="text-os-blue" /> The Solution
            </h3>
            <p className="text-justify">{project.solution}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-1.5 mb-2">
              <Layers size={15} className="text-os-blue" /> System Architecture
            </h3>
            <p className="text-justify">{project.architecture}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-1.5 mb-2">
              <Info size={15} className="text-os-blue" /> Project Results
            </h3>
            <p className="text-justify">{project.results}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-1.5 mb-2">
              <Info size={15} className="text-os-blue" /> Lessons Learned
            </h3>
            <p className="text-justify">{project.lessons}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
