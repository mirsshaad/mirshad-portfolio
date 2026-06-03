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

interface AwsCapability {
  title: string;
  description: string;
  resources: string[];
}

const AWS_CAPABILITIES: AwsCapability[] = [
  {
    title: "Compute & Serverless",
    description: "Architecting resilient, elastic, and serverless hosting models for APIs and enterprise workloads.",
    resources: ["Elastic Compute Cloud (EC2 / VMSS-equivalent)", "Elastic Kubernetes Service (EKS)", "AWS Elastic Beanstalk / ECS Fargate", "AWS Lambda (Serverless)"]
  },
  {
    title: "Networking & Content Delivery",
    description: "Designing zero-trust enterprise VPC topologies with Transit Gateway and global caching edge.",
    resources: ["Amazon VPC / Subnets / Security Groups", "Application Load Balancer (ALB) / WAF", "Amazon CloudFront CDN", "AWS Route 53 DNS / Certificate Manager"]
  },
  {
    title: "Databases & Storage Pools",
    description: "Provisioning high-availability storage pools and multi-region database replication clusters.",
    resources: ["Amazon RDS (Multi-AZ Replication)", "Amazon DynamoDB (Global Tables)", "Amazon S3 (Glacier Archive Lifecycles)", "Amazon EFS / EBS Volume Encryption"]
  },
  {
    title: "DevOps & Infrastructure (IaC)",
    description: "Automating resources provisioning and delivery lifecycles with industry-standard declarative configurations.",
    resources: ["Terraform / AWS CloudFormation", "AWS CodePipeline / CodeBuild", "GitHub Actions CI/CD integration", "Amazon CloudWatch / AWS CloudTrail Monitoring"]
  }
];

interface AwsPortalResource {
  name: string;
  type: string;
  resourceGroup: string;
  status: string;
  location: string;
}

const PORTAL_RESOURCES: AwsPortalResource[] = [
  { name: "company-s3-bucket", type: "S3 Bucket", resourceGroup: "Dev-ResourceGroup", status: "Online", location: "us-east-1" },
  { name: "patient-records-s3", type: "S3 Bucket", resourceGroup: "Dev-ResourceGroup", status: "Online", location: "us-east-1" },
  { name: "my-ec2-instance", type: "EC2 Instance (t3.medium)", resourceGroup: "Default-RG", status: "Running", location: "us-east-1" },
  { name: "my-eni-01", type: "Network Interface (ENI)", resourceGroup: "Default-RG", status: "Attached", location: "us-east-1" },
  { name: "my-security-group", type: "Security Group", resourceGroup: "Default-RG", status: "Active", location: "us-east-1" },
  { name: "my-elastic-ip", type: "Elastic IP", resourceGroup: "Default-RG", status: "Active", location: "us-east-1" },
  { name: "company-sqs-queue", type: "SQS Queue", resourceGroup: "Default-RG", status: "Active", location: "us-east-1" },
  { name: "dev-iam-role", type: "IAM Instance Profile", resourceGroup: "Dev-ResourceGroup", status: "Active", location: "us-east-1" },
];

export default function AwsSolutionsApp() {
  const [ec2Count, setEc2Count] = useState(4);
  const [storageGb, setStorageGb] = useState(800);
  const [optimized, setOptimized] = useState(true);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"topology" | "portal">("portal");

  // Estimator Calculations for AWS compute & storage
  const baseEC2Cost = ec2Count * 28.80; // average t3.medium per month
  const baseStorageCost = storageGb * 0.023; // AWS S3 Standard per GB
  const dbCost = 65.00; // Standard db.t3.medium RDS Database instance
  const otherCost = 20.00; // ALB, Bandwidth, Route53 queries
  
  const subTotal = baseEC2Cost + baseStorageCost + dbCost + otherCost;
  
  // Mirshad's optimizations: 
  // - Compute Savings Plans + EC2 Reserved Instances saves ~35% on VMSS
  // - S3 Lifecycle Glacier Deep Archive rules (saves ~75% on archived GBs)
  // - Auto-scaling policies and scale-down rules off-peak
  const savingsFactor = optimized ? 0.65 : 1.0; 
  const finalCost = subTotal * savingsFactor;
  const totalSavings = subTotal * (1 - savingsFactor);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "S3 Bucket":
        return <HardDrive size={13} className="text-amber-500" />;
      case "EC2 Instance (t3.medium)":
        return <Cpu size={13} className="text-orange-400 animate-pulse" />;
      case "Network Interface (ENI)":
        return <Network size={13} className="text-sky-400" />;
      case "Security Group":
        return <ShieldCheck size={13} className="text-emerald-500" />;
      case "Elastic IP":
        return <Globe size={13} className="text-purple-400" />;
      case "SQS Queue":
        return <Share2 size={13} className="text-indigo-400" />;
      case "IAM Instance Profile":
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
              <Cloud size={18} className="text-[#ff9900] animate-pulse" /> Amazon Web Services (AWS) Deployed Solutions
            </h2>
            <p className="text-[11px] text-zinc-400 mt-0.5">VPC Multi-AZ Architecture & Live S3/EC2 Resource Explorer</p>
          </div>
          
          {/* View mode toggle */}
          <div className="flex bg-zinc-950/60 border border-white/5 p-0.5 rounded-lg text-[10px] font-bold self-start">
            <button
              onClick={() => setViewMode("portal")}
              className={`px-3 py-1 rounded transition cursor-default ${
                viewMode === "portal" ? "bg-[#ff9900] text-black" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Active Portal Resources
            </button>
            <button
              onClick={() => setViewMode("topology")}
              className={`px-3 py-1 rounded transition cursor-default ${
                viewMode === "topology" ? "bg-[#ff9900] text-black" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              VPC Architecture
            </button>
          </div>
        </div>

        {/* View Mode Content */}
        {viewMode === "portal" ? (
          /* Active Portal Resources View (Simulated AWS Console Dashboard matching user reference style) */
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5 bg-zinc-950/40 border border-white/5 px-2.5 py-1 rounded-lg">
                <Eye size={12} className="text-emerald-400" /> Active Subscription Deploys (Region: us-east-1)
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
          /* CSS Diagram of AWS VPC Architecture */
          <div className="border border-white/5 bg-zinc-900/40 rounded-xl p-4 flex flex-col gap-4 font-mono text-[10px]">
            {/* AWS CloudFront Routing */}
            <div className="border border-[#ff9900]/20 bg-[#ff9900]/5 text-[#ff9900] p-2 rounded text-center font-bold flex items-center justify-center gap-2">
              <Network size={12} />
              {"Amazon CloudFront Routing Edge (CDN/WAF) -> Internet Gateway (IGW)"}
            </div>
            
            {/* VPC Spoke */}
            <div className="border border-zinc-700/30 bg-zinc-950/40 p-3 rounded-lg flex flex-col gap-3">
              <div className="text-zinc-500 font-bold border-b border-white/5 pb-1 flex justify-between">
                <span>Amazon VPC (Spoke VPC - 10.0.0.0/16)</span>
                <span className="text-zinc-600 font-medium">Location: us-east-1</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Availability Zone 1 */}
                <div className="border border-white/5 bg-zinc-950/80 p-3.5 rounded-xl flex flex-col gap-3">
                  <div className="text-zinc-400 font-bold text-[9px] uppercase tracking-wider">Availability Zone a</div>
                  
                  {/* Public Subnet */}
                  <div className="border border-emerald-500/20 bg-emerald-950/10 text-emerald-400 p-2.5 rounded-lg">
                    <span className="font-bold flex items-center gap-1"><Server size={11} /> Public Subnet (10.0.1.0/24)</span>
                    <div className="mt-1 opacity-85 leading-normal">
                      Application Load Balancer (ALB Routing Nodes)
                    </div>
                  </div>

                  {/* Private App Subnet */}
                  <div className="border border-amber-500/20 bg-amber-950/10 text-amber-400 p-2.5 rounded-lg">
                    <span className="font-bold flex items-center gap-1"><Cpu size={11} /> Private Subnet (10.0.2.0/24)</span>
                    <div className="mt-1 opacity-85 leading-normal">
                      Auto Scaling Groups (EC2 Compute Instances)
                    </div>
                  </div>
                </div>

                {/* Availability Zone 2 */}
                <div className="border border-white/5 bg-zinc-950/80 p-3.5 rounded-xl flex flex-col gap-3">
                  <div className="text-zinc-400 font-bold text-[9px] uppercase tracking-wider">Availability Zone b</div>
                  
                  {/* Public Subnet */}
                  <div className="border border-emerald-500/20 bg-emerald-950/10 text-emerald-400 p-2.5 rounded-lg">
                    <span className="font-bold flex items-center gap-1"><Server size={11} /> Public Subnet (10.0.3.0/24)</span>
                    <div className="mt-1 opacity-85 leading-normal">
                      AWS NAT Gateway (Outbound Outing)
                    </div>
                  </div>

                  {/* Private App Subnet */}
                  <div className="border border-amber-500/20 bg-amber-950/10 text-amber-400 p-2.5 rounded-lg">
                    <span className="font-bold flex items-center gap-1"><Cpu size={11} /> Private Subnet (10.0.4.0/24)</span>
                    <div className="mt-1 opacity-85 leading-normal">
                      Auto Scaling Groups (EC2 Compute Instances)
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Database Layer Subnet */}
              <div className="border border-indigo-500/20 bg-indigo-950/10 text-indigo-400 p-3 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-2">
                <span className="font-bold flex items-center gap-1"><Database size={11} /> Isolated Database Subnet (10.0.5.0/24)</span>
                <span className="text-[9px] uppercase font-bold bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded text-indigo-300">
                  Amazon RDS Aurora PostgreSQL (Multi-AZ Replica Synchronization)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Competencies Tabs: What AWS Resources I Deploy & Maintain */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-zinc-200 text-xs uppercase tracking-wider flex items-center gap-2">
            <Activity size={15} className="text-[#ff9900]" /> Core AWS Competencies
          </h3>
          
          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 border-b border-white/5 pb-2">
            {AWS_CAPABILITIES.map((cap, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold transition cursor-default ${
                  activeTab === i 
                    ? "bg-[#ff9900] text-black" 
                    : "bg-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-white/10"
                }`}
              >
                {cap.title}
              </button>
            ))}
          </div>

          {/* Active Tab Panel */}
          <div className="bg-zinc-950/40 p-4 border border-white/5 rounded-xl flex flex-col gap-3">
            <p className="text-xs text-zinc-300 font-medium">{AWS_CAPABILITIES[activeTab].description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {AWS_CAPABILITIES[activeTab].resources.map((res, i) => (
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
              <span className="font-bold text-zinc-300">1. AWS Migration schemas</span>
              <p className="text-[11px] leading-normal text-zinc-400">
                Deploying AWS Application Migration Service (MGN) to coordinate live database migrations and server replication with minimal network cutover outages.
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-bold text-zinc-300">2. FinOps & AWS Savings Plans</span>
              <p className="text-[11px] leading-normal text-zinc-400">
                Configuring AWS Compute Savings Plans, reserving EC2 instances, auditing idle EBS volumes, and setting up S3 Glacier lifecycle transitions to optimize monthly bills.
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-bold text-zinc-300">3. Infrastructure as Code (IaC)</span>
              <p className="text-[11px] leading-normal text-zinc-400">
                Writing custom modular Terraform configurations and CloudFormation stacks to spin up compliant VNets, autoscaling groups, and database replicas.
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-bold text-zinc-300">4. Serverless Architectures</span>
              <p className="text-[11px] leading-normal text-zinc-400">
                Designing event-driven serverless backends utilizing API Gateway, AWS Lambda, DynamoDB tables, and Amazon SQS queues for maximum cost efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive cost optimization calculator */}
      <div className="w-full lg:w-72 bg-zinc-900/30 border-t lg:border-t-0 lg:border-l border-white/5 p-6 flex flex-col gap-5 shrink-0">
        <div>
          <h3 className="text-xs font-bold text-zinc-200 flex items-center gap-1.5 uppercase tracking-wider">
            <DollarSign size={14} className="text-[#ff9900]" /> AWS Billing Auditor
          </h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Simulate cost cuts with AWS plans</p>
        </div>

        {/* Sliders */}
        <div className="flex flex-col gap-4 text-xs">
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between font-medium">
              <span className="text-zinc-400">EC2 Instances:</span>
              <span className="text-white font-bold">{ec2Count} Compute Nodes</span>
            </div>
            <input 
              type="range" 
              min="2" 
              max="16" 
              step="2"
              value={ec2Count}
              onChange={(e) => setEc2Count(Number(e.target.value))}
              className="accent-[#ff9900] w-full h-1 bg-white/5 border border-white/5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between font-medium">
              <span className="text-zinc-400">Amazon S3 Storage:</span>
              <span className="text-white font-bold">{storageGb} GB</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="5000" 
              step="100"
              value={storageGb}
              onChange={(e) => setStorageGb(Number(e.target.value))}
              className="accent-[#ff9900] w-full h-1 bg-white/5 border border-white/5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Toggle optimization */}
          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <span className="text-zinc-400 font-medium">Spot VMs & Glacier rules</span>
            <button 
              onClick={() => setOptimized(!optimized)}
              className={`w-10 h-5 rounded-full p-0.5 flex items-center transition-colors ${
                optimized ? "bg-[#ff9900] justify-end" : "bg-zinc-800 justify-start"
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
            <span>AWS Partner Cuts:</span>
            <span>-${totalSavings.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-white font-bold text-sm pt-1">
            <span>Optimized Cost:</span>
            <span>${finalCost.toFixed(2)}/mo</span>
          </div>
        </div>

        <div className="text-[10px] text-zinc-500 leading-normal bg-white/5 border border-white/5 p-3 rounded-lg flex items-start gap-2 select-none">
          <Info size={14} className="text-[#ff9900] shrink-0" />
          <span>
            Mirshad's AWS Savings Plans, Lambda serverless triggers, autoscaling, and Glacier Deep Archive rules reduce standard billing rates by up to 35%.
          </span>
        </div>
      </div>
    </div>
  );
}
