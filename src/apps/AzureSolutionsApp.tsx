"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Cloud, 
  Layers, 
  Server, 
  DollarSign, 
  Cpu, 
  Database, 
  Network, 
  Terminal, 
  Activity, 
  CheckCircle2, 
  Info,
  Globe,
  Share2,
  HardDrive,
  Users,
  Eye,
  Sliders,
  ExternalLink
} from "lucide-react";

interface AzureCapability {
  title: string;
  description: string;
  resources: string[];
}

const AZURE_CAPABILITIES: AzureCapability[] = [
  {
    title: "Compute & Microservices",
    description: "Architecting resilient, elastic, and serverless hosting models for APIs and enterprise applications.",
    resources: ["Virtual Machine Scale Sets (VMSS)", "Azure Kubernetes Service (AKS)", "Azure App Services", "Azure Functions (Serverless)"]
  },
  {
    title: "Networking & Security",
    description: "Designing zero-trust enterprise topologies with hub-and-spoke VNet peering and traffic firewalling.",
    resources: ["Azure VNet / Subnets / NSGs", "Azure Application Gateway / WAF", "Azure Front Door / CDN", "Azure Key Vault / Entra ID (Azure AD)"]
  },
  {
    title: "Databases & Storage",
    description: "Provisioning high-availability storage pools and multi-region database replication clusters.",
    resources: ["Azure SQL Database (Geo-Replication)", "Azure Cosmos DB (Global Scale)", "Blob Storage (Archive Lifecycle)", "Azure Files / File Sync"]
  },
  {
    title: "DevOps & Infrastructure (IaC)",
    description: "Automating resources provisioning and delivery lifecycles with industry-standard declarative configurations.",
    resources: ["Terraform / Azure Bicep / ARM Templates", "Azure DevOps Pipelines", "GitHub Actions CI/CD", "Azure Monitor / Log Analytics"]
  }
];

interface AzurePortalResource {
  name: string;
  type: string;
  resourceGroup: string;
  status: string;
  location: string;
}

const PORTAL_RESOURCES: AzurePortalResource[] = [
  { name: "companystore1234", type: "Storage account", resourceGroup: "RG-Development", status: "Online", location: "East US 2" },
  { name: "patientrecords2", type: "Storage account", resourceGroup: "RG-Development", status: "Online", location: "East US 2" },
  { name: "myvm1", type: "Virtual machine", resourceGroup: "DefaultResourceGroup-CIN", status: "Running", location: "East US 2" },
  { name: "myvm1536_z1", type: "Network interface", resourceGroup: "DefaultResourceGroup-CIN", status: "Connected", location: "East US 2" },
  { name: "myvm1-nsg", type: "Network security group", resourceGroup: "DefaultResourceGroup-CIN", status: "Active", location: "East US 2" },
  { name: "myvm1-ip", type: "Public IP address", resourceGroup: "DefaultResourceGroup-CIN", status: "Active", location: "East US 2" },
  { name: "company-relay-namespace", type: "Relay Namespace", resourceGroup: "DefaultResourceGroup-CIN", status: "Active", location: "East US 2" },
  { name: "Dev-team", type: "Application security group", resourceGroup: "RG-Development", status: "Active", location: "East US 2" },
];

export default function CloudSolutionsApp() {
  const [vmCount, setVmCount] = useState(4);
  const [storageGb, setStorageGb] = useState(800);
  const [optimized, setOptimized] = useState(true);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"topology" | "portal">("portal");

  // Estimator Calculations for Azure VM nodes & storage
  const baseVMCost = vmCount * 68.50; // average D2s v5 virtual machine per month
  const baseStorageCost = storageGb * 0.08; // Azure Hot Blob Storage per GB
  const dbCost = 90.00; // Standard vCore-based Azure SQL Database instance
  const otherCost = 25.00; // App Gateway, Bandwidth, Key Vault operations
  
  const subTotal = baseVMCost + baseStorageCost + dbCost + otherCost;
  
  // Mirshad's optimizations: 
  // - Reserved Instances (RI) + Azure Hybrid Benefit (AHUB) saves ~40% on VMSS
  // - Storage lifecycle rules archives logs/files (saves ~60% on archived GBs)
  // - Auto-shutdown policies and auto-scaling VMSS off-peak
  const savingsFactor = optimized ? 0.62 : 1.0; 
  const finalCost = subTotal * savingsFactor;
  const totalSavings = subTotal * (1 - savingsFactor);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "Storage account":
        return <HardDrive size={13} className="text-teal-400" />;
      case "Virtual machine":
        return <Cpu size={13} className="text-sky-400 animate-pulse" />;
      case "Network interface":
        return <Network size={13} className="text-emerald-400" />;
      case "Network security group":
        return <ShieldCheck size={13} className="text-amber-500" />;
      case "Public IP address":
        return <Globe size={13} className="text-purple-400" />;
      case "Relay Namespace":
        return <Share2 size={13} className="text-indigo-400" />;
      case "Application security group":
        return <Users size={13} className="text-blue-400" />;
      default:
        return <Server size={13} className="text-zinc-400" />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[500px] text-zinc-300 font-sans select-none">
      
      {/* Left Column: Cloud architecture & Diagram */}
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
          <div>
            <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <Cloud size={18} className="text-[#0078d4] animate-pulse" /> Microsoft Azure Deployed Solutions
            </h2>
            <p className="text-[11px] text-zinc-400 mt-0.5">Live Resource Monitoring & Active VNet Topology Schema</p>
          </div>
          
          {/* View mode toggle */}
          <div className="flex bg-zinc-950/60 border border-white/5 p-0.5 rounded-lg text-[10px] font-bold self-start">
            <button
              onClick={() => setViewMode("portal")}
              className={`px-3 py-1 rounded transition cursor-default ${
                viewMode === "portal" ? "bg-[#0078d4] text-white" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Active Portal Resources
            </button>
            <button
              onClick={() => setViewMode("topology")}
              className={`px-3 py-1 rounded transition cursor-default ${
                viewMode === "topology" ? "bg-[#0078d4] text-white" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              VNet Architecture
            </button>
          </div>
        </div>

        {/* View Mode Content */}
        {viewMode === "portal" ? (
          /* Active Portal Resources View (Simulated Azure Portal Dashboard matching user screenshot) */
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5 bg-zinc-950/40 border border-white/5 px-2.5 py-1 rounded-lg">
                <Eye size={12} className="text-emerald-400" /> Active Subscription Deploys (Region: East US 2)
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">User: mirshadvp23@lpu.in</span>
            </div>

            <div className="border border-white/5 bg-zinc-950/30 rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[11px] font-mono">
                  <thead>
                    <tr className="bg-zinc-950/80 text-zinc-400 border-b border-white/5">
                      <th className="p-3 font-semibold">Resource Name</th>
                      <th className="p-3 font-semibold">Type</th>
                      <th className="p-3 font-semibold">Resource Group</th>
                      <th className="p-3 font-semibold">Location</th>
                      <th className="p-3 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PORTAL_RESOURCES.map((res, i) => (
                      <tr 
                        key={i} 
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="p-3 text-zinc-100 font-bold flex items-center gap-2">
                          {getResourceIcon(res.type)}
                          <span>{res.name}</span>
                        </td>
                        <td className="p-3 text-zinc-400">{res.type}</td>
                        <td className="p-3 text-zinc-400">{res.resourceGroup}</td>
                        <td className="p-3 text-zinc-500">{res.location}</td>
                        <td className="p-3 text-right">
                          <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> {res.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* CSS Diagram of Azure VNet Architecture */
          <div className="border border-white/5 bg-zinc-900/40 rounded-xl p-4 flex flex-col gap-4 font-mono text-[10px]">
            {/* Azure Front Door Routing */}
            <div className="border border-[#0078d4]/20 bg-[#0078d4]/5 text-[#0078d4] p-2 rounded text-center font-bold flex items-center justify-center gap-2">
              <Network size={12} />
              {"Azure Front Door Global Routing (CDN/WAF) -> HTTP(S) Gateway"}
            </div>
            
            {/* Spoke VNet */}
            <div className="border border-zinc-700/30 bg-zinc-950/40 p-3 rounded-lg flex flex-col gap-3">
              <div className="text-zinc-500 font-bold border-b border-white/5 pb-1 flex justify-between">
                <span>Azure Virtual Network (VNet Spoke - 10.1.0.0/16)</span>
                <span className="text-zinc-600 font-medium">Location: East US 2</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Availability Zone 1 */}
                <div className="border border-white/5 bg-zinc-950/80 p-3.5 rounded-xl flex flex-col gap-3">
                  <div className="text-zinc-400 font-bold text-[9px] uppercase tracking-wider">Availability Zone 1</div>
                  
                  {/* Public Gateway Subnet */}
                  <div className="border border-emerald-500/20 bg-emerald-950/10 text-emerald-400 p-2.5 rounded-lg">
                    <span className="font-bold flex items-center gap-1"><Server size={11} /> Gateway Subnet (10.1.1.0/24)</span>
                    <div className="mt-1 opacity-85 leading-normal">
                      Azure Application Gateway + WAF v2 (Ingress Controller)
                    </div>
                  </div>

                  {/* Compute Subnet */}
                  <div className="border border-amber-500/20 bg-amber-950/10 text-amber-400 p-2.5 rounded-lg">
                    <span className="font-bold flex items-center gap-1"><Cpu size={11} /> App Subnet (10.1.2.0/24)</span>
                    <div className="mt-1 opacity-85 leading-normal">
                      Virtual Machine Scale Sets (VMSS) running scalable microservice nodes
                    </div>
                  </div>
                </div>

                {/* Availability Zone 2 */}
                <div className="border border-white/5 bg-zinc-950/80 p-3.5 rounded-xl flex flex-col gap-3">
                  <div className="text-zinc-400 font-bold text-[9px] uppercase tracking-wider">Availability Zone 2</div>
                  
                  {/* Public Edge Subnet */}
                  <div className="border border-emerald-500/20 bg-emerald-950/10 text-emerald-400 p-2.5 rounded-lg">
                    <span className="font-bold flex items-center gap-1"><Server size={11} /> Gateway Subnet (10.1.3.0/24)</span>
                    <div className="mt-1 opacity-85 leading-normal">
                      Azure Bastion Host + Jump Box configurations
                    </div>
                  </div>

                  {/* Compute Subnet */}
                  <div className="border border-amber-500/20 bg-amber-950/10 text-amber-400 p-2.5 rounded-lg">
                    <span className="font-bold flex items-center gap-1"><Cpu size={11} /> App Subnet (10.1.4.0/24)</span>
                    <div className="mt-1 opacity-85 leading-normal">
                      Virtual Machine Scale Sets (VMSS) running scalable microservice nodes
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Database & Storage Layer Subnet */}
              <div className="border border-indigo-500/20 bg-indigo-950/10 text-indigo-400 p-3 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-2">
                <span className="font-bold flex items-center gap-1"><Database size={11} /> Database Subnet (10.1.5.0/24)</span>
                <span className="text-[9px] uppercase font-bold bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded text-indigo-300">
                  Azure SQL Geo-Replicated Database (Active Failover Group)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* capabilities Tabs: What Resources I Deploy & Maintain */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-zinc-200 text-xs uppercase tracking-wider flex items-center gap-2">
            <Activity size={15} className="text-[#0078d4]" /> Core Azure Competencies
          </h3>
          
          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 border-b border-white/5 pb-2">
            {AZURE_CAPABILITIES.map((cap, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold transition cursor-default ${
                  activeTab === i 
                    ? "bg-[#0078d4] text-white" 
                    : "bg-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-white/10"
                }`}
              >
                {cap.title}
              </button>
            ))}
          </div>

          {/* Active Tab Panel */}
          <div className="bg-zinc-950/40 p-4 border border-white/5 rounded-xl flex flex-col gap-3">
            <p className="text-xs text-zinc-300 font-medium">{AZURE_CAPABILITIES[activeTab].description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {AZURE_CAPABILITIES[activeTab].resources.map((res, i) => (
                <div key={i} className="flex items-center gap-2 text-zinc-400 font-mono text-[10.5px]">
                  <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                  <span>{res}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How I help users panel */}
        <div className="flex flex-col gap-3.5 border-t border-white/5 pt-5 text-xs text-zinc-400">
          <h3 className="font-semibold text-zinc-200 flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-400" /> How I Partner With Businesses & Users
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="font-bold text-zinc-300">1. Azure Migration Planning</span>
              <p className="text-[11px] leading-normal text-zinc-400">
                Executing secure Lift-and-Shift or Refactoring schemas using Azure Migrate. Staging data pools from physical boxes or AWS with minimal downtime templates.
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-bold text-zinc-300">2. FinOps & Cost Optimization</span>
              <p className="text-[11px] leading-normal text-zinc-400">
                Pruning cloud leakages. Auditing running VMs, implementing VM Reserved Instances, Hybrid Benefit mappings, and writing serverless autoscalers to curb cost leaks.
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-bold text-zinc-300">3. Infrastructure as Code (IaC)</span>
              <p className="text-[11px] leading-normal text-zinc-400">
                Authoring declarative Terraform scripts, Azure Bicep modules, or ARM templates to guarantee fully reproducible dev, staging, and production networks.
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-bold text-zinc-300">4. Hybrid Cloud & Active Failovers</span>
              <p className="text-[11px] leading-normal text-zinc-400">
                Connecting local centers to Azure VNets using VPN gateways, configuring disaster recovery vault streams, and multi-region load balancers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive cost optimization calculator */}
      <div className="w-full lg:w-72 bg-zinc-900/30 border-t lg:border-t-0 lg:border-l border-white/5 p-6 flex flex-col gap-5 shrink-0">
        <div>
          <h3 className="text-xs font-bold text-zinc-200 flex items-center gap-1.5 uppercase tracking-wider">
            <DollarSign size={14} className="text-[#0078d4]" /> Azure Savings Auditor
          </h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Simulate cost cuts with Azure policies</p>
        </div>

        {/* Sliders */}
        <div className="flex flex-col gap-4 text-xs">
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between font-medium">
              <span className="text-zinc-400">VMSS instances:</span>
              <span className="text-white font-bold">{vmCount} Virtual Machines</span>
            </div>
            <input 
              type="range" 
              min="2" 
              max="16" 
              step="2"
              value={vmCount}
              onChange={(e) => setVmCount(Number(e.target.value))}
              className="accent-[#0078d4] w-full h-1 bg-white/5 border border-white/5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between font-medium">
              <span className="text-zinc-400">Blob Data Storage:</span>
              <span className="text-white font-bold">{storageGb} GB</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="5000" 
              step="100"
              value={storageGb}
              onChange={(e) => setStorageGb(Number(e.target.value))}
              className="accent-[#0078d4] w-full h-1 bg-white/5 border border-white/5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Toggle optimization */}
          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <span className="text-zinc-400 font-medium">AHUB & VM reservations</span>
            <button 
              onClick={() => setOptimized(!optimized)}
              className={`w-10 h-5 rounded-full p-0.5 flex items-center transition-colors ${
                optimized ? "bg-[#0078d4] justify-end" : "bg-zinc-800 justify-start"
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md" />
            </button>
          </div>
        </div>

        {/* Financial output display */}
        <div className="mt-auto bg-zinc-950 p-4 border border-white/5 rounded-xl flex flex-col gap-2 font-mono text-xs">
          <div className="flex justify-between text-zinc-500 text-[11px]">
            <span>Raw Retail Cost:</span>
            <span>${subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-emerald-400 font-semibold border-b border-white/5 pb-2 text-[11px]">
            <span>Azure Partner Cuts:</span>
            <span>-${totalSavings.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-white font-bold text-sm pt-1">
            <span>Optimized Cost:</span>
            <span>${finalCost.toFixed(2)}/mo</span>
          </div>
        </div>

        <div className="text-[10px] text-zinc-500 leading-normal bg-white/5 border border-white/5 p-3 rounded-lg flex items-start gap-2 select-none">
          <Info size={14} className="text-[#0078d4] shrink-0" />
          <span>
            Mirshad's Azure VM reserves, Bicep templates, dynamic scaling, and Cool Storage Tier mapping cuts monthly pricing by up to 38% without risking uptime.
          </span>
        </div>
      </div>
    </div>
  );
}
