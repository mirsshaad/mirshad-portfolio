"use client";

import React, { useState } from "react";
import { Mail, Phone, ClipboardCheck, Clipboard, MessageSquare, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";

export default function ContactApp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const myEmail = "mirshadvp.work@gmail.com";
  const myPhone = "+919562656910"; // Sample phone or Mirshad's WhatsApp number

  const handleCopy = () => {
    navigator.clipboard.writeText(myEmail);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    
    // Construct WhatsApp link
    const text = `Hi Mirshad, my name is ${name} (${email}). %0A%0A${message}`;
    const url = `https://wa.me/${myPhone.replace("+", "")}?text=${encodeURIComponent(text)}`;
    if (typeof window !== "undefined") window.open(url, "_blank");
  };

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    
    // Construct mailto link
    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const url = `mailto:${myEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (typeof window !== "undefined") window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[480px]">
      {/* Left panel: Form */}
      <div className="flex-1 p-6 sm:p-8 overflow-y-auto flex flex-col gap-6 select-text">
        <div>
          <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <MessageSquare size={18} className="text-os-blue" /> Send Message
          </h2>
          <p className="text-[11px] text-zinc-400 mt-1 font-mono">Fill your details to connect with Mirshad</p>
        </div>

        <form className="flex flex-col gap-4 text-xs font-mono">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="p-3 bg-zinc-900 border border-white/5 rounded-xl text-zinc-200 outline-none focus:border-os-blue"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Your Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="p-3 bg-zinc-900 border border-white/5 rounded-xl text-zinc-200 outline-none focus:border-os-blue"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Message Details</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi Mirshad, let's discuss cloud migration/AI application integration..."
              className="p-3 bg-zinc-900 border border-white/5 rounded-xl text-zinc-200 outline-none focus:border-os-blue resize-none"
              required
            />
          </div>

          {/* Double action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              onClick={handleWhatsApp}
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold tracking-wide flex items-center justify-center gap-2 cursor-default transition"
            >
              <Send size={14} /> Send via WhatsApp
            </button>
            <button
              onClick={handleEmail}
              className="flex-1 py-3 px-4 rounded-xl bg-os-blue hover:opacity-90 text-white font-bold tracking-wide flex items-center justify-center gap-2 cursor-default transition"
            >
              <Mail size={14} /> Send via Email
            </button>
          </div>
        </form>
      </div>

      {/* Right panel: Social Connections */}
      <div className="w-full lg:w-72 bg-zinc-900/30 border-t lg:border-t-0 lg:border-l border-white/5 p-6 overflow-y-auto flex flex-col gap-6 shrink-0 select-none">
        <div>
          <h3 className="text-xs font-bold text-zinc-200 flex items-center gap-1.5 uppercase tracking-wider">
            <Phone size={15} className="text-os-blue" /> Direct Connect
          </h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Quick social endpoints</p>
        </div>

        {/* Email Copy Card */}
        <div className="bg-zinc-950 border border-white/5 p-4 rounded-xl flex flex-col gap-2 relative">
          <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">Office Email</p>
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-200 select-text font-medium">{myEmail}</span>
            <button 
              onClick={handleCopy}
              className="text-zinc-400 hover:text-white p-1 transition cursor-default"
            >
              {isCopied ? <ClipboardCheck size={16} className="text-emerald-400" /> : <Clipboard size={16} />}
            </button>
          </div>
        </div>

        {/* Social channels buttons */}
        <div className="flex flex-col gap-2 text-xs font-medium">
          <a
            href="https://www.linkedin.com/in/mirshadvp"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-3 bg-[#0a66c2]/10 border border-[#0a66c2]/20 rounded-xl text-zinc-200 hover:bg-[#0a66c2]/15 transition"
          >
            <FaLinkedin size={16} className="text-[#0a66c2]" />
            <span>Connect on LinkedIn</span>
          </a>

          <a
            href="https://github.com/Mirshadvp7377"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-3 bg-zinc-800/40 border border-zinc-700/40 rounded-xl text-zinc-200 hover:bg-zinc-800/60 transition"
          >
            <FaGithub size={16} className="text-white" />
            <span>Review Source Code</span>
          </a>

          <a
            href="https://www.instagram.com/mirsshaad/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-3 bg-pink-500/10 border border-pink-500/20 rounded-xl text-zinc-200 hover:bg-pink-500/15 transition"
          >
            <FaInstagram size={16} className="text-pink-500" />
            <span>Follow on Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
}
