"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Send, Mic, MicOff, Settings, LayoutDashboard,
  ListTodo, MessageSquare, Volume2, VolumeX, Key, Save,
  ChevronRight, Zap, Users, CheckCircle2, Clock, AlertCircle,
  Plus, X, ArrowRight, Sparkles, Activity, Brain
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Agent Definitions
// ─────────────────────────────────────────────────────────────────────────────
const AGENTS = [
  {
    id: "nexus",
    name: "NEXUS",
    role: "Team Leader",
    emoji: "🧠",
    color: "#a855f7",
    colorClass: "purple",
    isLeader: true,
    systemPrompt: `You are NEXUS, the AI Team Leader of an elite AI cloud business team. You are strategic, decisive, and visionary. You oversee Alex (Sales & Marketing), Nova (Product Dev), Zara (Customer Support), Orion (Analytics), Echo (Content), and Kai (Operations & Finance). You report directly to the CEO (the user). You give concise, authoritative, strategic responses. Always think about business growth and team coordination.`,
  },
  {
    id: "alex",
    name: "Alex",
    role: "Sales & Marketing",
    emoji: "📊",
    color: "#f59e0b",
    colorClass: "amber",
    isLeader: false,
    systemPrompt: `You are Alex, the Sales & Marketing AI Agent for a growing AI cloud business. You are enthusiastic, persuasive, and creative. You handle lead generation, marketing campaigns, social media strategy, and client acquisition. You report to NEXUS and the CEO. Give actionable, results-driven, energetic responses about sales and marketing.`,
  },
  {
    id: "nova",
    name: "Nova",
    role: "Product Development",
    emoji: "⚡",
    color: "#06b6d4",
    colorClass: "cyan",
    isLeader: false,
    systemPrompt: `You are Nova, the Product Development AI Agent for a growing AI cloud business. You are technical, precise, and innovative. You handle product roadmaps, feature design, technical architecture, and R&D initiatives. You report to NEXUS and the CEO. Give structured, technical, forward-thinking responses about product development.`,
  },
  {
    id: "zara",
    name: "Zara",
    role: "Customer Support",
    emoji: "💬",
    color: "#10b981",
    colorClass: "emerald",
    isLeader: false,
    systemPrompt: `You are Zara, the Customer Support AI Agent for a growing AI cloud business. You are warm, empathetic, and solution-focused. You handle client issues, support tickets, onboarding flows, and customer satisfaction. You report to NEXUS and the CEO. Give helpful, compassionate, practical responses about customer success.`,
  },
  {
    id: "orion",
    name: "Orion",
    role: "Analytics & Data",
    emoji: "📈",
    color: "#3b82f6",
    colorClass: "blue",
    isLeader: false,
    systemPrompt: `You are Orion, the Analytics & Data AI Agent for a growing AI cloud business. You are data-driven, precise, and insightful. You handle business intelligence, KPI tracking, performance analysis, and strategic reporting. You report to NEXUS and the CEO. Give data-informed, structured, insight-rich responses about analytics.`,
  },
  {
    id: "echo",
    name: "Echo",
    role: "Content Creation",
    emoji: "✍️",
    color: "#ec4899",
    colorClass: "pink",
    isLeader: false,
    systemPrompt: `You are Echo, the Content Creation AI Agent for a growing AI cloud business. You are creative, expressive, and compelling. You handle blog posts, social media content, email campaigns, landing page copy, and brand storytelling. You report to NEXUS and the CEO. Give creative, engaging, high-quality content and writing advice.`,
  },
  {
    id: "kai",
    name: "Kai",
    role: "Operations & Finance",
    emoji: "⚙️",
    color: "#f97316",
    colorClass: "orange",
    isLeader: false,
    systemPrompt: `You are Kai, the Operations & Finance AI Agent for a growing AI cloud business. You are organized, strategic, and detail-oriented. You handle operational efficiency, financial planning, budgeting, vendor management, and process optimization. You report to NEXUS and the CEO. Give structured, pragmatic, financially-sound responses.`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Task {
  id: string;
  title: string;
  assignedTo: string;
  status: "todo" | "inprogress" | "done";
  priority: "high" | "medium" | "low";
}

type View = "dashboard" | "chat" | "tasks" | "settings";

// ─────────────────────────────────────────────────────────────────────────────
// Color Map
// ─────────────────────────────────────────────────────────────────────────────
const COLORS: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  purple: { bg: "rgba(168,85,247,0.1)", border: "rgba(168,85,247,0.35)", text: "#a855f7", glow: "0 0 20px rgba(168,85,247,0.3)" },
  amber:  { bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.35)",  text: "#f59e0b", glow: "0 0 20px rgba(245,158,11,0.3)" },
  cyan:   { bg: "rgba(6,182,212,0.1)",   border: "rgba(6,182,212,0.35)",   text: "#06b6d4", glow: "0 0 20px rgba(6,182,212,0.3)" },
  emerald:{ bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.35)",  text: "#10b981", glow: "0 0 20px rgba(16,185,129,0.3)" },
  blue:   { bg: "rgba(59,130,246,0.1)",  border: "rgba(59,130,246,0.35)",  text: "#3b82f6", glow: "0 0 20px rgba(59,130,246,0.3)" },
  pink:   { bg: "rgba(236,72,153,0.1)",  border: "rgba(236,72,153,0.35)",  text: "#ec4899", glow: "0 0 20px rgba(236,72,153,0.3)" },
  orange: { bg: "rgba(249,115,22,0.1)",  border: "rgba(249,115,22,0.35)",  text: "#f97316", glow: "0 0 20px rgba(249,115,22,0.3)" },
};

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function AICommandCenterApp() {
  const [view, setView] = useState<View>("dashboard");
  const [selectedAgentId, setSelectedAgentId] = useState("nexus");
  const [chats, setChats] = useState<Record<string, Message[]>>({});
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Define product roadmap Q3", assignedTo: "nova",  status: "inprogress", priority: "high" },
    { id: "2", title: "Launch LinkedIn awareness campaign", assignedTo: "alex",  status: "todo",       priority: "high" },
    { id: "3", title: "Onboard first 3 pilot clients",  assignedTo: "zara",  status: "todo",       priority: "medium" },
    { id: "4", title: "Build KPI tracking dashboard",   assignedTo: "orion", status: "done",       priority: "medium" },
    { id: "5", title: "Write homepage copy & value prop",assignedTo: "echo",  status: "inprogress", priority: "high" },
    { id: "6", title: "Setup Stripe billing & pricing",  assignedTo: "kai",   status: "todo",       priority: "medium" },
  ]);
  const [geminiKey, setGeminiKey] = useState("");
  const [groqKey, setGroqKey] = useState("");
  const [tempGemini, setTempGemini] = useState("");
  const [tempGroq, setTempGroq] = useState("");
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskAgent, setNewTaskAgent] = useState("nexus");
  const [newTaskPriority, setNewTaskPriority] = useState<Task["priority"]>("medium");
  const [activityFeed] = useState([
    { emoji: "🧠", agent: "NEXUS", text: "Team briefing complete. All 6 agents operational.", time: "2m ago" },
    { emoji: "📊", agent: "Alex",  text: "LinkedIn content strategy drafted and ready.", time: "8m ago" },
    { emoji: "⚡", agent: "Nova",  text: "Product roadmap v0.2 pushed to team review.", time: "15m ago" },
    { emoji: "✍️", agent: "Echo",  text: "Homepage value proposition copy finished.", time: "22m ago" },
    { emoji: "⚙️", agent: "Kai",   text: "Q3 budget estimate prepared. Awaiting CEO review.", time: "35m ago" },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load saved keys
  useEffect(() => {
    const gk = localStorage.getItem("acc-gemini") || "";
    const rk = localStorage.getItem("acc-groq") || "";
    setGeminiKey(gk); setTempGemini(gk);
    setGroqKey(rk); setTempGroq(rk);
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, selectedAgentId, isLoading]);

  // ── AI Calls ────────────────────────────────────────────────────────────────
  const callGemini = async (msgs: Message[], sys: string): Promise<string> => {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: sys }] },
          contents: msgs.map(m => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
          generationConfig: { maxOutputTokens: 500, temperature: 0.85 },
        }),
      }
    );
    if (!res.ok) throw new Error(`Gemini ${res.status}`);
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
  };

  const callGroq = async (msgs: Message[], sys: string): Promise<string> => {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${groqKey}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: sys },
          ...msgs.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content })),
        ],
        max_tokens: 500,
        temperature: 0.85,
      }),
    });
    if (!res.ok) throw new Error(`Groq ${res.status}`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content || "No response.";
  };

  const callAI = async (agentId: string, msgs: Message[]): Promise<string> => {
    const agent = AGENTS.find(a => a.id === agentId);
    if (!agent) return "Agent not found.";
    if (!geminiKey && !groqKey)
      return "⚠️ No API keys configured. Go to Settings tab and add your Gemini or Groq key.";
    if (geminiKey) {
      try { return await callGemini(msgs, agent.systemPrompt); }
      catch { /* fall through to groq */ }
    }
    if (groqKey) {
      try { return await callGroq(msgs, agent.systemPrompt); }
      catch { return "⚠️ AI call failed. Check your API keys in Settings."; }
    }
    return "⚠️ Both providers failed. Verify your API keys.";
  };

  // ── Send Message ────────────────────────────────────────────────────────────
  const sendMessage = async (text: string) => {
    const t = text.trim();
    if (!t || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: t, timestamp: new Date() };
    const prev = chats[selectedAgentId] || [];
    const updated = [...prev, userMsg];
    setChats(c => ({ ...c, [selectedAgentId]: updated }));
    setInputText("");
    setIsLoading(true);

    const reply = await callAI(selectedAgentId, updated);
    const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: reply, timestamp: new Date() };
    setChats(c => ({ ...c, [selectedAgentId]: [...(c[selectedAgentId] || []), aiMsg] }));
    setIsLoading(false);

    // Speak
    const agent = AGENTS.find(a => a.id === selectedAgentId);
    if (agent) speakText(reply, agent.isLeader);
  };

  // ── Voice Input ─────────────────────────────────────────────────────────────
  const toggleVoice = () => {
    if (typeof window === "undefined") return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { alert("Voice input requires Chrome or Edge browser."); return; }
    if (isListening) { recognitionRef.current?.stop(); return; }
    const r = new SR();
    r.continuous = false; r.lang = "en-US";
    r.onstart = () => setIsListening(true);
    r.onend   = () => setIsListening(false);
    r.onerror = () => setIsListening(false);
    r.onresult = (e: any) => {
      const t = e.results[0][0].transcript;
      setInputText(t);
      setTimeout(() => sendMessage(t), 200);
    };
    recognitionRef.current = r;
    r.start();
  };

  // ── Speech Synthesis ────────────────────────────────────────────────────────
  const speakText = (text: string, isLeader: boolean) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.slice(0, 350));
    u.rate = 0.92; u.pitch = isLeader ? 0.85 : 1.05; u.volume = 0.85;
    u.onstart = () => setIsSpeaking(true);
    u.onend = () => setIsSpeaking(false);
    u.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(u);
  };

  const stopSpeaking = () => { window.speechSynthesis?.cancel(); setIsSpeaking(false); };

  // ── Settings ────────────────────────────────────────────────────────────────
  const saveSettings = () => {
    localStorage.setItem("acc-gemini", tempGemini);
    localStorage.setItem("acc-groq", tempGroq);
    setGeminiKey(tempGemini); setGroqKey(tempGroq);
    setSaveMsg("✅ API keys saved successfully!");
    setTimeout(() => setSaveMsg(""), 3000);
  };

  // ── Tasks ───────────────────────────────────────────────────────────────────
  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    setTasks(t => [...t, { id: Date.now().toString(), title: newTaskTitle.trim(), assignedTo: newTaskAgent, status: "todo", priority: newTaskPriority }]);
    setNewTaskTitle("");
  };
  const moveTask = (id: string, status: Task["status"]) => setTasks(t => t.map(x => x.id === id ? { ...x, status } : x));
  const deleteTask = (id: string) => setTasks(t => t.filter(x => x.id !== id));

  // ── Derived ─────────────────────────────────────────────────────────────────
  const selectedAgent = AGENTS.find(a => a.id === selectedAgentId)!;
  const agentColor = COLORS[selectedAgent.colorClass];
  const messages = chats[selectedAgentId] || [];
  const doneTasks = tasks.filter(t => t.status === "done").length;
  const hasKeys = !!(geminiKey || groqKey);

  // ────────────────────────────────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────────────────────────────────
  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{ background: "linear-gradient(135deg, #07070f 0%, #0d0d1a 100%)", fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Header ── */}
      <div
        className="flex items-center justify-between px-4 py-2.5 shrink-0 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)" }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #a855f7, #06b6d4)" }}>
            <Brain size={14} className="text-white" />
          </div>
          <div>
            <h1 className="text-xs font-bold text-white tracking-wider">AI COMMAND CENTER</h1>
            <p className="text-[9px]" style={{ color: "#a855f7" }}>
              {hasKeys ? "● SYSTEMS ONLINE" : "○ SETUP REQUIRED"}
            </p>
          </div>
        </div>

        {/* Nav Tabs */}
        <div className="flex items-center gap-1">
          {([
            { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
            { id: "chat",      icon: MessageSquare,   label: "Chat" },
            { id: "tasks",     icon: ListTodo,        label: "Tasks" },
            { id: "settings",  icon: Settings,        label: "Settings" },
          ] as { id: View; icon: React.ElementType; label: string }[]).map(tab => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all duration-200"
              style={{
                background: view === tab.id ? "rgba(168,85,247,0.15)" : "transparent",
                color: view === tab.id ? "#a855f7" : "rgba(255,255,255,0.45)",
                border: view === tab.id ? "1px solid rgba(168,85,247,0.3)" : "1px solid transparent",
              }}
            >
              <tab.icon size={11} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* ── Left Sidebar: Agent List ── */}
        <div
          className="w-[180px] shrink-0 flex flex-col gap-0.5 overflow-y-auto p-2 border-r"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <p className="text-[9px] uppercase tracking-widest px-2 py-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>
            Team Agents
          </p>
          {AGENTS.map(agent => {
            const c = COLORS[agent.colorClass];
            const isSelected = selectedAgentId === agent.id;
            return (
              <button
                key={agent.id}
                onClick={() => {
                  setSelectedAgentId(agent.id);
                  if (view !== "chat") setView("chat");
                }}
                className="flex items-center gap-2 px-2 py-2 rounded-lg text-left transition-all duration-150 w-full"
                style={{
                  background: isSelected ? c.bg : "transparent",
                  border: isSelected ? `1px solid ${c.border}` : "1px solid transparent",
                }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0 relative"
                  style={{ background: isSelected ? c.bg : "rgba(255,255,255,0.05)", boxShadow: isSelected ? c.glow : "none" }}
                >
                  {agent.emoji}
                  <span
                    className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full"
                    style={{ background: hasKeys ? c.text : "#3f3f46" }}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold truncate" style={{ color: isSelected ? c.text : "rgba(255,255,255,0.8)" }}>
                    {agent.name}
                  </p>
                  <p className="text-[9px] truncate" style={{ color: "rgba(255,255,255,0.35)" }}>{agent.role}</p>
                </div>
                {agent.isLeader && (
                  <span className="text-[8px] px-1 py-0.5 rounded ml-auto shrink-0" style={{ background: "rgba(168,85,247,0.2)", color: "#a855f7" }}>
                    LEAD
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Main Content ── */}
        <div className="flex-1 min-w-0 overflow-hidden flex flex-col">

          {/* ═══════════════════════ DASHBOARD ═══════════════════════ */}
          {view === "dashboard" && (
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">

              {/* Stat cards */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Tasks Done",     value: doneTasks,               icon: CheckCircle2, color: "#10b981" },
                  { label: "Active Agents",  value: hasKeys ? 7 : 0,         icon: Users,        color: "#a855f7" },
                  { label: "In Progress",    value: tasks.filter(t => t.status === "inprogress").length, icon: Activity, color: "#06b6d4" },
                ].map(stat => (
                  <div key={stat.label} className="rounded-xl p-3 border flex flex-col gap-1.5"
                    style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.label}</span>
                      <stat.icon size={12} style={{ color: stat.color }} />
                    </div>
                    <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Team Hierarchy */}
              <div className="rounded-xl p-4 border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
                <p className="text-[10px] uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>Team Hierarchy</p>

                {/* CEO */}
                <div className="flex flex-col items-center gap-2">
                  <div className="px-4 py-2 rounded-xl border text-center" style={{ background: "rgba(168,85,247,0.12)", borderColor: "rgba(168,85,247,0.4)" }}>
                    <p className="text-[10px] font-bold text-white">👑 YOU — CEO</p>
                    <p className="text-[9px]" style={{ color: "#a855f7" }}>AI Cloud Business</p>
                  </div>
                  <div className="w-px h-4" style={{ background: "rgba(168,85,247,0.4)" }} />

                  {/* NEXUS */}
                  <div className="px-4 py-2 rounded-xl border text-center" style={{ background: "rgba(168,85,247,0.08)", borderColor: "rgba(168,85,247,0.3)" }}>
                    <p className="text-[10px] font-bold" style={{ color: "#a855f7" }}>🧠 NEXUS — Team Leader</p>
                  </div>
                  <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.1)" }} />

                  {/* Workers */}
                  <div className="grid grid-cols-6 gap-2 w-full">
                    {AGENTS.filter(a => !a.isLeader).map(agent => {
                      const c = COLORS[agent.colorClass];
                      return (
                        <button
                          key={agent.id}
                          onClick={() => { setSelectedAgentId(agent.id); setView("chat"); }}
                          className="p-2 rounded-xl border flex flex-col items-center gap-1 transition-all hover:scale-105"
                          style={{ background: c.bg, borderColor: c.border }}
                        >
                          <span className="text-base">{agent.emoji}</span>
                          <p className="text-[9px] font-bold" style={{ color: c.text }}>{agent.name}</p>
                          <p className="text-[8px] text-center leading-tight" style={{ color: "rgba(255,255,255,0.4)" }}>{agent.role}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="rounded-xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
                <div className="px-4 py-2.5 border-b flex items-center gap-2" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <Zap size={11} style={{ color: "#a855f7" }} />
                  <p className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>Live Activity Feed</p>
                </div>
                <div className="flex flex-col divide-y divide-white/5">
                  {activityFeed.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-2.5">
                      <span className="text-sm shrink-0">{item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold text-white">{item.agent}</p>
                        <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>{item.text}</p>
                      </div>
                      <p className="text-[9px] shrink-0" style={{ color: "rgba(255,255,255,0.25)" }}>{item.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* No keys warning */}
              {!hasKeys && (
                <div className="rounded-xl p-3 border flex items-center gap-3" style={{ background: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.3)" }}>
                  <AlertCircle size={14} style={{ color: "#f59e0b" }} />
                  <p className="text-[11px]" style={{ color: "#f59e0b" }}>
                    No API keys configured. Go to{" "}
                    <button className="underline font-bold" onClick={() => setView("settings")}>Settings</button>
                    {" "}to add your Gemini or Groq key and enable real AI.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════ CHAT ═══════════════════════ */}
          {view === "chat" && (
            <div className="flex flex-col h-full overflow-hidden">
              {/* Agent Header */}
              <div
                className="px-4 py-2.5 border-b flex items-center justify-between shrink-0"
                style={{ borderColor: "rgba(255,255,255,0.06)", background: agentColor.bg }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-base relative"
                    style={{ background: agentColor.bg, border: `1px solid ${agentColor.border}`, boxShadow: agentColor.glow }}
                  >
                    {selectedAgent.emoji}
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-[#0d0d1a]"
                      style={{ background: hasKeys ? agentColor.text : "#52525b" }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{selectedAgent.name}</p>
                    <p className="text-[9px]" style={{ color: agentColor.text }}>{selectedAgent.role} {selectedAgent.isLeader ? "· Team Leader" : "· Worker Agent"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isSpeaking && (
                    <button onClick={stopSpeaking} className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] transition-all"
                      style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" }}>
                      <VolumeX size={11} /> Stop
                    </button>
                  )}
                  <span className="text-[10px] px-2 py-1 rounded-lg" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}>
                    {messages.length} msgs
                  </span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full gap-4 opacity-60">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                      style={{ background: agentColor.bg, border: `1px solid ${agentColor.border}` }}>
                      {selectedAgent.emoji}
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-semibold text-white">{selectedAgent.name} is ready</p>
                      <p className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {selectedAgent.role} · Type or speak to start
                      </p>
                    </div>
                    <div className="flex flex-col gap-1.5 w-full max-w-xs">
                      {[
                        `What's your current priority?`,
                        `Give me a status report`,
                        `What should I focus on today?`,
                      ].map(q => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="px-3 py-2 rounded-xl text-[10px] text-left flex items-center gap-2 transition-all hover:scale-[1.02]"
                          style={{ background: agentColor.bg, border: `1px solid ${agentColor.border}`, color: agentColor.text }}
                        >
                          <ChevronRight size={10} />
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                    {msg.role === "assistant" && (
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0 mt-0.5"
                        style={{ background: agentColor.bg, border: `1px solid ${agentColor.border}` }}>
                        {selectedAgent.emoji}
                      </div>
                    )}
                    <div
                      className="max-w-[75%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed"
                      style={
                        msg.role === "user"
                          ? { background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.25)", color: "#e2e8f0", borderBottomRightRadius: "4px" }
                          : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#cbd5e1", borderBottomLeftRadius: "4px" }
                      }
                    >
                      {msg.content}
                      <p className="text-[8px] mt-1 opacity-40">
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0"
                      style={{ background: agentColor.bg, border: `1px solid ${agentColor.border}` }}>
                      {selectedAgent.emoji}
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      {[0, 1, 2].map(i => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full animate-bounce"
                          style={{ background: agentColor.text, animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="px-4 py-3 border-t shrink-0" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage(inputText)}
                    placeholder={`Message ${selectedAgent.name}...`}
                    className="flex-1 bg-transparent outline-none text-[11px] placeholder:opacity-30 text-white"
                  />
                  <button
                    onClick={toggleVoice}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-all shrink-0"
                    style={{
                      background: isListening ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.06)",
                      border: `1px solid ${isListening ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.1)"}`,
                      color: isListening ? "#ef4444" : "rgba(255,255,255,0.5)",
                    }}
                    title="Voice input"
                  >
                    {isListening ? <MicOff size={11} /> : <Mic size={11} />}
                  </button>
                  <button
                    onClick={() => sendMessage(inputText)}
                    disabled={isLoading || !inputText.trim()}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-all shrink-0"
                    style={{
                      background: inputText.trim() && !isLoading ? agentColor.bg : "rgba(255,255,255,0.04)",
                      border: `1px solid ${inputText.trim() && !isLoading ? agentColor.border : "rgba(255,255,255,0.08)"}`,
                      color: inputText.trim() && !isLoading ? agentColor.text : "rgba(255,255,255,0.2)",
                    }}
                  >
                    <Send size={11} />
                  </button>
                </div>
                {isListening && (
                  <div className="flex items-center gap-2 mt-2 px-1">
                    <span className="w-2 h-2 rounded-full animate-pulse bg-red-400" />
                    <p className="text-[9px]" style={{ color: "#ef4444" }}>Listening... speak now</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═══════════════════════ TASKS ═══════════════════════ */}
          {view === "tasks" && (
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {/* Add task */}
              <div className="rounded-xl p-3 border flex items-center gap-2"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}>
                <input
                  type="text" placeholder="New task title..." value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addTask()}
                  className="flex-1 bg-transparent outline-none text-[11px] text-white placeholder:opacity-30"
                />
                <select value={newTaskAgent} onChange={e => setNewTaskAgent(e.target.value)}
                  className="bg-transparent outline-none text-[10px] border rounded-lg px-2 py-1 cursor-pointer"
                  style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }}>
                  {AGENTS.map(a => <option key={a.id} value={a.id} className="bg-zinc-900">{a.name}</option>)}
                </select>
                <select value={newTaskPriority} onChange={e => setNewTaskPriority(e.target.value as Task["priority"])}
                  className="bg-transparent outline-none text-[10px] border rounded-lg px-2 py-1 cursor-pointer"
                  style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }}>
                  <option value="high" className="bg-zinc-900">High</option>
                  <option value="medium" className="bg-zinc-900">Medium</option>
                  <option value="low" className="bg-zinc-900">Low</option>
                </select>
                <button onClick={addTask} className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)", color: "#a855f7" }}>
                  <Plus size={13} />
                </button>
              </div>

              {/* Kanban Columns */}
              <div className="grid grid-cols-3 gap-3 flex-1">
                {([
                  { status: "todo",       label: "📋 To Do",      color: "#3b82f6" },
                  { status: "inprogress", label: "⚡ In Progress", color: "#f59e0b" },
                  { status: "done",       label: "✅ Done",        color: "#10b981" },
                ] as { status: Task["status"]; label: string; color: string }[]).map(col => {
                  const colTasks = tasks.filter(t => t.status === col.status);
                  return (
                    <div key={col.status} className="rounded-xl border flex flex-col gap-2 p-3"
                      style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[10px] font-bold" style={{ color: col.color }}>{col.label}</p>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full"
                          style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}>
                          {colTasks.length}
                        </span>
                      </div>
                      {colTasks.map(task => {
                        const agent = AGENTS.find(a => a.id === task.assignedTo)!;
                        const ac = COLORS[agent.colorClass];
                        const pColors: Record<string, string> = { high: "#ef4444", medium: "#f59e0b", low: "#10b981" };
                        return (
                          <div key={task.id} className="rounded-xl p-2.5 border group relative"
                            style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
                            <button onClick={() => deleteTask(task.id)}
                              className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{ color: "rgba(255,255,255,0.3)" }}>
                              <X size={9} />
                            </button>
                            <p className="text-[10px] font-medium text-white leading-snug pr-3">{task.title}</p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-1">
                                <span className="text-[9px]">{agent.emoji}</span>
                                <span className="text-[9px]" style={{ color: ac.text }}>{agent.name}</span>
                              </div>
                              <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold"
                                style={{ background: `${pColors[task.priority]}20`, color: pColors[task.priority] }}>
                                {task.priority}
                              </span>
                            </div>
                            {/* Move actions */}
                            <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              {col.status !== "todo" && (
                                <button onClick={() => moveTask(task.id, col.status === "inprogress" ? "todo" : "inprogress")}
                                  className="flex-1 text-[8px] py-0.5 rounded text-center transition-all"
                                  style={{ background: "rgba(59,130,246,0.15)", color: "#3b82f6" }}>
                                  ← Back
                                </button>
                              )}
                              {col.status !== "done" && (
                                <button onClick={() => moveTask(task.id, col.status === "todo" ? "inprogress" : "done")}
                                  className="flex-1 text-[8px] py-0.5 rounded text-center transition-all"
                                  style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>
                                  Next →
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      {colTasks.length === 0 && (
                        <div className="rounded-xl border-2 border-dashed flex items-center justify-center py-4"
                          style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                          <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.2)" }}>No tasks</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═══════════════════════ SETTINGS ═══════════════════════ */}
          {view === "settings" && (
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 max-w-lg mx-auto w-full">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Key size={14} style={{ color: "#a855f7" }} /> API Configuration
                </h2>
                <p className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Keys are stored locally in your browser. Never shared externally.
                </p>
              </div>

              {/* Gemini */}
              <div className="rounded-xl p-4 border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs" style={{ background: "rgba(66,133,244,0.15)" }}>G</div>
                  <div>
                    <p className="text-[11px] font-semibold text-white">Google Gemini API</p>
                    <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.35)" }}>Primary AI — Free tier available · Key starts with AIzaSy...</p>
                  </div>
                  {geminiKey && <span className="ml-auto text-[8px] px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>ACTIVE</span>}
                </div>
                <input
                  type="password"
                  value={tempGemini}
                  onChange={e => setTempGemini(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-3 py-2 rounded-lg text-[11px] outline-none text-white placeholder:opacity-30"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
                <p className="text-[9px] mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Get free key → <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer" className="underline" style={{ color: "#a855f7" }}>aistudio.google.com/apikey</a>
                </p>
              </div>

              {/* Groq */}
              <div className="rounded-xl p-4 border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs" style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>Q</div>
                  <div>
                    <p className="text-[11px] font-semibold text-white">Groq API (Llama 3.3 70B)</p>
                    <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.35)" }}>Backup AI — Ultra fast · Key starts with gsk_...</p>
                  </div>
                  {groqKey && <span className="ml-auto text-[8px] px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>ACTIVE</span>}
                </div>
                <input
                  type="password"
                  value={tempGroq}
                  onChange={e => setTempGroq(e.target.value)}
                  placeholder="gsk_..."
                  className="w-full px-3 py-2 rounded-lg text-[11px] outline-none text-white placeholder:opacity-30"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
                <p className="text-[9px] mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Get free key → <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="underline" style={{ color: "#f59e0b" }}>console.groq.com/keys</a>
                </p>
              </div>

              <button
                onClick={saveSettings}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #a855f7, #06b6d4)" }}
              >
                <Save size={13} /> Save API Keys
              </button>

              {saveMsg && (
                <p className="text-center text-[11px] font-medium" style={{ color: "#10b981" }}>{saveMsg}</p>
              )}

              {/* Info box */}
              <div className="rounded-xl p-3 border mt-2" style={{ background: "rgba(168,85,247,0.05)", borderColor: "rgba(168,85,247,0.2)" }}>
                <p className="text-[10px] font-semibold mb-2" style={{ color: "#a855f7" }}>🔐 Security Note</p>
                <ul className="flex flex-col gap-1">
                  {[
                    "Keys are stored only in your browser's localStorage",
                    "Keys are never sent to any server except the AI providers",
                    "Gemini is used first, Groq activates if Gemini fails",
                    "Voice input uses your browser's built-in Speech API (Chrome/Edge)",
                  ].map((note, i) => (
                    <li key={i} className="flex items-start gap-2 text-[10px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                      <span className="mt-0.5">•</span> {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
