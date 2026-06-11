"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Cloud, 
  Terminal, 
  Play, 
  CheckCircle2, 
  Loader2, 
  Activity, 
  Database, 
  Cpu, 
  Network, 
  ExternalLink,
  Layers,
  ArrowRight,
  TrendingUp,
  RotateCw,
  FileText,
  AlertCircle,
  ShieldCheck,
  Check
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";

export default function MultiCloudApp() {
  const [pipelineState, setPipelineState] = useState<"idle" | "building" | "publishing" | "deploying" | "success">("idle");
  const [activeTab, setActiveTab] = useState<"casestudy" | "dashboard" | "pipeline" | "architecture">("casestudy");
  const [liveCpuEks, setLiveCpuEks] = useState(8.31);
  const [liveCpuAks, setLiveCpuAks] = useState(6.25);
  const [liveMemoryEks, setLiveMemoryEks] = useState(29.8);
  const [liveMemoryAks, setLiveMemoryAks] = useState(31.4);

  // Simulate live metric ticks for Grafana
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCpuEks(prev => Math.max(4, Math.min(25, Number((prev + (Math.random() * 2 - 1)).toFixed(2)))));
      setLiveCpuAks(prev => Math.max(3, Math.min(22, Number((prev + (Math.random() * 2 - 1)).toFixed(2)))));
      setLiveMemoryEks(prev => Math.max(25, Math.min(45, Number((prev + (Math.random() * 0.4 - 0.2)).toFixed(2)))));
      setLiveMemoryAks(prev => Math.max(26, Math.min(48, Number((prev + (Math.random() * 0.4 - 0.2)).toFixed(2)))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const runPipelineDemo = () => {
    setPipelineState("building");
    setTimeout(() => {
      setPipelineState("publishing");
      setTimeout(() => {
        setPipelineState("deploying");
        setTimeout(() => {
          setPipelineState("success");
        }, 2500);
      }, 2000);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full min-h-[500px] text-zinc-300 font-sans select-none bg-zinc-950/20">
      
      {/* Top App bar */}
      <div className="flex justify-between items-center px-6 py-3.5 border-b border-white/5 bg-zinc-900/40 shrink-0">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Cloud size={16} className="text-sky-400" /> Multi-Cloud Platform controller
          </h2>
          <p className="text-[10px] text-zinc-500 mt-0.5">AWS EKS & Azure AKS Cluster Coordinator</p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-zinc-950 border border-white/5 p-0.5 rounded-lg text-[10px] font-bold">
          {([
            { id: "casestudy", label: "Case Study" },
            { id: "dashboard", label: "Grafana Metrics" },
            { id: "pipeline", label: "CI/CD Pipeline" },
            { id: "architecture", label: "Terraform IaC" },
          ] as const).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 rounded transition cursor-default ${
                activeTab === tab.id ? "bg-sky-500 text-white shadow-sm" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        
        {/* TAB 0: CASE STUDY */}
        {activeTab === "casestudy" && (
          <div className="flex flex-col gap-6 select-text">
            {/* Header info */}
            <div className="border-b border-white/5 pb-4">
              <h1 className="text-lg font-bold text-white leading-tight">Multi-Cloud Infrastructure Automation Platform</h1>
              <p className="text-xs text-zinc-500 mt-1">
                Case Study by <span className="text-sky-400 font-semibold">Mirshad VP</span> — Cloud Infrastructure Engineer
              </p>
            </div>

            {/* Problem & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-zinc-950/40 border border-white/5 p-4 rounded-xl flex flex-col gap-2">
                <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle size={13} /> The Problem
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed text-justify">
                  Companies running on a single cloud provider face a critical risk — one outage means complete downtime, lost revenue, and damaged reputation. Manual infrastructure management makes scaling slow, error-prone, and impossible to replicate consistently across environments.
                </p>
              </div>

              <div className="bg-zinc-950/40 border border-white/5 p-4 rounded-xl flex flex-col gap-2">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck size={13} /> The Solution
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed text-justify">
                  Built a production-grade multi-cloud infrastructure platform that runs simultaneously on AWS and Azure, with full automation from code to deployment. If one cloud goes down, the other handles traffic. Every infrastructure change is version-controlled, reproducible, and automatically deployed.
                </p>
              </div>
            </div>

            {/* Architecture Details */}
            <div className="flex flex-col gap-3.5">
              <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                <Layers size={13} className="text-sky-400" /> Architecture Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {[
                  {
                    title: "Infrastructure as Code",
                    desc: "Terraform provisions both AWS EKS and Azure AKS clusters from a single codebase, with remote state stored in Azure Blob Storage.",
                    icon: Database
                  },
                  {
                    title: "Containerization",
                    desc: "Application packaged as a Docker image, versioned and stored on Docker Hub.",
                    icon: Cpu
                  },
                  {
                    title: "Multi-Cloud Kubernetes",
                    desc: "App deployed on both clusters simultaneously, each with a public load-balanced endpoint.",
                    icon: Network
                  },
                  {
                    title: "CI/CD Pipeline",
                    desc: "GitHub Actions automatically builds, tags, and deploys to both clouds on every code push — zero manual steps.",
                    icon: RotateCw
                  },
                  {
                    title: "Monitoring & Observability",
                    desc: "Prometheus collects real-time metrics from both clusters, visualized in Grafana dashboards showing CPU, memory, and workload health.",
                    icon: Activity
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-zinc-950/20 border border-white/5 p-3 rounded-xl flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon size={14} className="text-sky-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-zinc-200 leading-tight">{item.title}</h4>
                      <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Results */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp size={13} className="text-sky-400" /> Project Results
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  "99.9% availability through multi-cloud redundancy",
                  "Zero-touch deployments — code push to production in under 60 seconds",
                  "Full infrastructure reproducible in minutes via Terraform",
                  "Real-time visibility across both clouds from a single Grafana dashboard"
                ].map((res, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-zinc-950/30 border border-white/5 px-3 py-2 rounded-xl">
                    <Check size={14} className="text-emerald-400 shrink-0" />
                    <span className="text-zinc-300 font-medium">{res}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Tech Stack</span>
              <div className="flex flex-wrap gap-1.5">
                {["AWS EKS", "Azure AKS", "Terraform", "Docker", "Kubernetes", "GitHub Actions", "Prometheus", "Grafana", "Python Flask"].map((t, i) => (
                  <span
                    key={i}
                    className="text-[9px] font-semibold bg-white/5 text-zinc-300 px-2.5 py-1 rounded border border-white/5 uppercase font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: GRAFANA METRICS */}
        {activeTab === "dashboard" && (
          <div className="flex flex-col gap-6">
            
            {/* Real-time stats panels */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-zinc-950/60 border border-white/5 p-3 rounded-xl flex flex-col gap-1 shadow-md">
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-semibold">AWS EKS CPU</span>
                <span className="text-lg font-bold text-sky-400 font-mono">{liveCpuEks.toFixed(2)}%</span>
                <span className="text-[8px] text-zinc-600">Region: ap-south-1</span>
              </div>
              <div className="bg-zinc-950/60 border border-white/5 p-3 rounded-xl flex flex-col gap-1 shadow-md">
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-semibold">Azure AKS CPU</span>
                <span className="text-lg font-bold text-indigo-400 font-mono">{liveCpuAks.toFixed(2)}%</span>
                <span className="text-[8px] text-zinc-600">Region: centralindia</span>
              </div>
              <div className="bg-zinc-950/60 border border-white/5 p-3 rounded-xl flex flex-col gap-1 shadow-md">
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-semibold">EKS Memory Usage</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">{liveMemoryEks.toFixed(2)}%</span>
                <span className="text-[8px] text-zinc-600">29.8% configured limit</span>
              </div>
              <div className="bg-zinc-950/60 border border-white/5 p-3 rounded-xl flex flex-col gap-1 shadow-md">
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-semibold">AKS Memory Usage</span>
                <span className="text-lg font-bold text-teal-400 font-mono">{liveMemoryAks.toFixed(2)}%</span>
                <span className="text-[8px] text-zinc-600">31.4% configured limit</span>
              </div>
            </div>

            {/* Grafana Dashboard screenshot showcase */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity size={13} className="text-sky-400" /> Active Grafana Dashboard
                </h3>
                <span className="text-[9px] text-zinc-500 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Prometheus Scraper: Live (10s scrape interval)
                </span>
              </div>

              <div className="relative w-full h-[280px] rounded-xl overflow-hidden border border-white/5 bg-zinc-900 shadow-xl">
                <Image 
                  src="/images/project-multi-cloud-grafana.png"
                  alt="Grafana Kubernetes dashboard"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Cluster resources layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* AWS EKS Details */}
              <div className="border border-white/5 bg-zinc-950/20 rounded-xl p-4 flex flex-col gap-3">
                <span className="text-xs font-bold text-sky-400 flex items-center gap-2">
                  <Cloud size={14} /> AWS Elastic Kubernetes Service (EKS)
                </span>
                <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
                  <div className="flex flex-col bg-zinc-950/40 p-2.5 rounded border border-white/5">
                    <span className="text-zinc-500">Nodes</span>
                    <span className="font-bold text-white mt-0.5">3 (m5.large)</span>
                  </div>
                  <div className="flex flex-col bg-zinc-950/40 p-2.5 rounded border border-white/5">
                    <span className="text-zinc-500">Active Pods</span>
                    <span className="font-bold text-white mt-0.5">21 running</span>
                  </div>
                </div>
              </div>

              {/* Azure AKS Details */}
              <div className="border border-white/5 bg-zinc-950/20 rounded-xl p-4 flex flex-col gap-3">
                <span className="text-xs font-bold text-indigo-400 flex items-center gap-2">
                  <Cloud size={14} /> Azure Kubernetes Service (AKS)
                </span>
                <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
                  <div className="flex flex-col bg-zinc-950/40 p-2.5 rounded border border-white/5">
                    <span className="text-zinc-500">Nodes</span>
                    <span className="font-bold text-white mt-0.5">2 (Standard_D2s_v3)</span>
                  </div>
                  <div className="flex flex-col bg-zinc-950/40 p-2.5 rounded border border-white/5">
                    <span className="text-zinc-500">Active Pods</span>
                    <span className="font-bold text-white mt-0.5">18 running</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: CI/CD PIPELINE SIMULATOR */}
        {activeTab === "pipeline" && (
          <div className="flex flex-col gap-6">
            
            {/* Explanation card */}
            <div className="bg-zinc-950/40 border border-white/5 p-4 rounded-xl flex flex-col gap-2 text-xs">
              <span className="font-bold text-white flex items-center gap-2">
                <FaGithub size={14} className="text-zinc-400" /> GitHub Actions Parallel Deployment Pipeline
              </span>
              <p className="text-zinc-400 leading-relaxed text-justify">
                To guarantee zero-downtime multi-cloud failover, every push to the <code>main</code> branch triggers a deployment workflow.
                The runner compiles the application, packages it into a Docker image tagged with the commit SHA, and pushes it to Docker Hub before executing parallel deployments to AWS EKS and Azure AKS.
              </p>
            </div>

            {/* Pipeline simulator console */}
            <div className="bg-zinc-950 border border-white/5 rounded-xl overflow-hidden shadow-2xl flex flex-col">
              
              {/* Console header */}
              <div className="bg-zinc-900 px-4 py-2 border-b border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1.5">
                  <Terminal size={11} className="text-sky-400" /> actions-runner-core-01
                </span>
                {pipelineState === "idle" ? (
                  <button 
                    onClick={runPipelineDemo}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-500 hover:bg-sky-400 text-white text-[10px] font-bold transition cursor-default"
                  >
                    <Play size={10} fill="#fff" /> Trigger CI/CD Push
                  </button>
                ) : pipelineState === "success" ? (
                  <button 
                    onClick={() => setPipelineState("idle")}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold transition cursor-default border border-white/5"
                  >
                    <RotateCw size={10} /> Reset Workflow
                  </button>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] text-amber-400 font-bold">
                    <Loader2 size={11} className="animate-spin" /> Execution in progress...
                  </span>
                )}
              </div>

              {/* Steps timeline */}
              <div className="p-5 flex flex-col gap-4 font-mono text-[11px]">
                
                {/* Step 1: Build Docker Container */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {pipelineState === "idle" ? (
                      <span className="w-4 h-4 rounded-full border border-zinc-700 flex items-center justify-center text-[9px] text-zinc-500">1</span>
                    ) : pipelineState === "building" ? (
                      <Loader2 size={14} className="text-amber-400 animate-spin" />
                    ) : (
                      <CheckCircle2 size={14} className="text-emerald-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-white">Docker Build & Tag</span>
                    <p className="text-[10px] text-zinc-500 mt-0.5">
                      {pipelineState === "building" ? "Compiling Flask app & bundling modules..." : pipelineState !== "idle" ? "Docker image built: flask-app:sha-dfeeb5d (Success)" : "Waiting to build container image..."}
                    </p>
                  </div>
                </div>

                {/* Step 2: Push to Registry */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {pipelineState === "idle" || pipelineState === "building" ? (
                      <span className="w-4 h-4 rounded-full border border-zinc-700 flex items-center justify-center text-[9px] text-zinc-500">2</span>
                    ) : pipelineState === "publishing" ? (
                      <Loader2 size={14} className="text-amber-400 animate-spin" />
                    ) : (
                      <CheckCircle2 size={14} className="text-emerald-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-white">Push to Docker Hub</span>
                    <p className="text-[10px] text-zinc-500 mt-0.5">
                      {pipelineState === "publishing" ? "Streaming layers to docker.io/mirsshaad/multi-cloud-app..." : pipelineState === "deploying" || pipelineState === "success" ? "Pushed layers to Docker Hub registry successfully (Success)" : "Waiting to publish layers..."}
                    </p>
                  </div>
                </div>

                {/* Step 3: Deploy to EKS & AKS (Parallel) */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {pipelineState === "idle" || pipelineState === "building" || pipelineState === "publishing" ? (
                      <span className="w-4 h-4 rounded-full border border-zinc-700 flex items-center justify-center text-[9px] text-zinc-500">3</span>
                    ) : pipelineState === "deploying" ? (
                      <Loader2 size={14} className="text-amber-400 animate-spin" />
                    ) : (
                      <CheckCircle2 size={14} className="text-emerald-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-white">Parallel Kubernetes Rolling Update (EKS & AKS)</span>
                    <p className="text-[10px] text-zinc-500 mt-0.5">
                      {pipelineState === "deploying" ? (
                        <span className="text-amber-400 flex flex-col gap-1 mt-1">
                          <span>$ kubectl set image deployment/flask-app flask-app=mirsshaad/multi-cloud-app:sha-dfeeb5d --context=eks-ap-south-1</span>
                          <span>$ kubectl set image deployment/flask-app flask-app=mirsshaad/multi-cloud-app:sha-dfeeb5d --context=aks-centralindia</span>
                        </span>
                      ) : pipelineState === "success" ? (
                        <span className="text-emerald-400 flex flex-col gap-0.5">
                          <span>✔ AWS EKS: Deployment complete. 21/21 pods active.</span>
                          <span>✔ Azure AKS: Deployment complete. 18/18 pods active.</span>
                        </span>
                      ) : "Waiting to connect and deploy..."}
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Real Pipeline Screenshot */}
            <div className="flex flex-col gap-3 border-t border-white/5 pt-5">
              <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                <FaGithub size={13} className="text-zinc-400" /> Real GitHub Actions Pipeline Proof
              </span>
              <div className="relative w-full h-[280px] rounded-xl overflow-hidden border border-white/5 bg-zinc-900 shadow-xl">
                <Image 
                  src="/images/project-multi-cloud-actions.png"
                  alt="GitHub Actions green workflow"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: TERRAFORM IAC */}
        {activeTab === "architecture" && (
          <div className="flex flex-col gap-5">
            
            {/* Grid structure showing code sample & architecture */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              
              {/* Terraform details */}
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Database size={13} className="text-sky-400" /> Infrastructure as Code (IaC)
                </h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed text-justify">
                  Both clusters and network components are declared as code using Terraform modules.
                  The remote state is locked and stored securely in Azure Blob Storage. This guarantees that your multi-cloud networks are fully reproducible from scratch in under 15 minutes.
                </p>

                {/* code sample console */}
                <div className="border border-white/5 bg-zinc-950 rounded-xl overflow-hidden font-mono text-[9.5px] p-4 flex flex-col gap-1.5 shadow-xl select-text">
                  <span className="text-[8px] text-zinc-600 border-b border-white/5 pb-1 mb-1 font-bold">main.tf</span>
                  <p className="text-zinc-500"># AWS EKS Module Provisioning</p>
                  <p className="text-white"><span className="text-sky-400">module</span> &quot;eks_cluster&quot; &#123;</p>
                  <p className="text-white">  source  = <span className="text-emerald-400">&quot;terraform-aws-modules/eks/aws&quot;</span></p>
                  <p className="text-white">  version = <span className="text-amber-500">&quot;~&gt; 20.0&quot;</span></p>
                  <p className="text-white">  cluster_name    = <span className="text-emerald-400">&quot;eks-ap-south-1&quot;</span></p>
                  <p className="text-white">  cluster_version = <span className="text-emerald-400">&quot;1.30&quot;</span></p>
                  <p className="text-white">  vpc_id          = module.vpc.vpc_id</p>
                  <p className="text-white">  subnet_ids      = module.vpc.private_subnets</p>
                  <p className="text-white">&#125;</p>
                  <p className="text-zinc-500 mt-2"># Azure AKS Module Provisioning</p>
                  <p className="text-white"><span className="text-sky-400">resource</span> &quot;azurerm_kubernetes_cluster&quot; &quot;aks&quot; &#123;</p>
                  <p className="text-white">  name                = <span className="text-emerald-400">&quot;aks-centralindia&quot;</span></p>
                  <p className="text-white">  location            = <span className="text-emerald-400">&quot;centralindia&quot;</span></p>
                  <p className="text-white">  resource_group_name = azurerm_resource_group.rg.name</p>
                  <p className="text-white">  dns_prefix          = <span className="text-emerald-400">&quot;aks-app&quot;</span></p>
                  <p className="text-white">  default_node_pool &#123;</p>
                  <p className="text-white">    name       = <span className="text-emerald-400">&quot;default&quot;</span></p>
                  <p className="text-white">    node_count = 2</p>
                  <p className="text-white">    vm_size    = <span className="text-emerald-400">&quot;Standard_D2s_v3&quot;</span></p>
                  <p className="text-white">  &#125;</p>
                  <p className="text-white">&#125;</p>
                </div>
              </div>

              {/* Architecture details */}
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers size={13} className="text-sky-400" /> Multi-Cloud Network Flow
                </h4>
                
                {/* CSS Flowchart */}
                <div className="flex flex-col gap-2.5 font-mono text-[9px] border border-white/5 bg-zinc-950/20 p-4 rounded-xl shadow-lg">
                  <div className="bg-zinc-900 border border-white/5 p-2 rounded text-center font-bold text-zinc-300">
                    💻 Developer Git Push to Main Branch
                  </div>
                  <div className="flex justify-center text-zinc-600"><ArrowRight size={14} className="rotate-90" /></div>
                  <div className="bg-zinc-900 border border-white/5 p-2 rounded text-center font-bold text-zinc-300">
                    ⚡ GitHub Actions CI/CD Build Runner
                  </div>
                  <div className="flex justify-center text-zinc-600"><ArrowRight size={14} className="rotate-90" /></div>
                  
                  {/* Two clouds side by side */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-sky-950/15 border border-sky-500/20 p-2.5 rounded text-center">
                      <span className="font-bold text-sky-400">AWS EKS Cluster</span>
                      <p className="text-[8px] text-zinc-500 mt-1">Region: ap-south-1</p>
                      <p className="text-[8px] text-zinc-500">Pods: 21 running</p>
                    </div>
                    <div className="bg-indigo-950/15 border border-indigo-500/20 p-2.5 rounded text-center">
                      <span className="font-bold text-indigo-400">Azure AKS Cluster</span>
                      <p className="text-[8px] text-zinc-500 mt-1">Region: centralindia</p>
                      <p className="text-[8px] text-zinc-500">Pods: 18 running</p>
                    </div>
                  </div>

                  <div className="flex justify-center text-zinc-600"><ArrowRight size={14} className="rotate-90" /></div>
                  <div className="bg-zinc-900 border border-white/5 p-2 rounded text-center font-bold text-zinc-300">
                    📈 Unified Grafana Dashboard Monitoring (Scrapes Prometheus metrics)
                  </div>
                </div>

                <div className="text-[10px] text-zinc-500 leading-relaxed bg-white/5 border border-white/5 p-3 rounded-lg flex items-start gap-2 select-none">
                  <Network size={14} className="text-sky-400 shrink-0 mt-0.5" />
                  <span>
                    By deploying duplicate setups in separate regions and cloud fabrics, this system survives a complete AWS or Azure zone failure without any application downtime.
                  </span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
