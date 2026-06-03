"use client";

import React, { useState, useEffect, useRef } from "react";
import { useOSStore } from "@/store/os.store";
import confetti from "canvas-confetti";

interface ConsoleHistory {
  input: string;
  output: string;
  isHtml?: boolean;
}

export default function TerminalApp() {
  const { openApp, theme } = useOSStore();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<ConsoleHistory[]>([
    {
      input: "",
      output: "MVP OS v1.0 Developer Terminal\nType 'help' to see list of available commands.\nType 'sudo hire-mirshad' for recruiter mode.\n",
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input.trim());
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIndex);
      setInput(commandHistory[commandHistory.length - 1 - nextIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex] || "");
      }
    }
  };

  const executeCommand = (cmd: string) => {
    if (!cmd) return;
    
    // Add to history list
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const lowerCmd = cmd.toLowerCase();
    let response = "";
    let isHtml = false;

    switch (lowerCmd) {
      case "help":
        response = `Available commands:
  help                 - Display this message
  whoami               - Print current user profile
  about                - Professional introduction
  skills               - List technical capabilities
  projects             - Display completed systems
  experience           - Career milestones
  education            - University details
  football             - Football journey & role
  contact              - Contact details & email
  resume               - Link to download CV
  github               - Open GitHub link
  linkedin             - Open LinkedIn link
  clear                - Clear terminal logs
  social               - Social media accounts
  easteregg            - Run a secret routine
  hire                 - Recruitment message
  sudo hire-mirshad    - Recruit Mirshad immediately (confetti!)
  show-secret-project  - Open the AI Trading Bot window
  about-founder        - Detailed personal story
  matrix               - Run retro green terminal matrix code overlay
  coffee               - Order a coffee`;
        break;

      case "whoami":
        response = "mirshadvp@mvp-os:~$ Mirshad V P | Cloud Engineer, AI Builder, Full Stack Developer, Entrepreneur.";
        break;

      case "about":
        response = "I am a Computer Science Engineering student specializing in cloud deployment architectures, machine learning predictive models, full stack web apps, and automated workflows.";
        break;

      case "skills":
        response = `Technical Expertise:
- Cloud Computing     : AWS (EC2, S3, RDS, IAM, VPC), Microsoft Azure
- Programming Languages: Python, Java, C, JavaScript, SQL
- Web Development     : React, NextJS, NodeJS, Tailwind CSS, MongoDB
- Artificial Intel    : Machine Learning, LSTM forecast models, TensorFlow
- DevOps & Tools      : Git, GitHub Actions CI/CD, Docker containers, Linux Bash`;
        break;

      case "projects":
        response = `Current Projects:
1. AI Trading Bot       - LSTM neural network cryptocurrency market forecast
2. Holiday Inn Resort  - Complete e-commerce booking platform & payment gateway
3. Cloud Architectures - Secure VPC and auto-scaling high-availability setups
4. Tech Agency Site    - Optimized next-gen landing platform with 98+ PageSpeed`;
        break;

      case "experience":
        response = `Milestones:
- 2026 : Building AI solutions & Tech Agency platforms
- 2025 : Engineered AWS/Azure architectures, automated pipelines, LSTM bots
- 2024 : Software principles, Java & Python full stack integrations`;
        break;

      case "education":
        response = "Lovely Professional University (LPU), Punjab, India. B.Tech Computer Science Engineering (Specialization: Cloud Computing / AI).";
        break;

      case "football":
        response = "Role: Football Player. Football teaches me discipline, strategic foresight, operational teamwork, and competitive grit. I carry these elements straight into cloud debugging and project execution.";
        break;

      case "contact":
        response = "Email: mirshadvp.work@gmail.com\nPhone: Contact form inside App\nGitHub: github.com/mirshad\nLinkedIn: linkedin.com/in/mirshad";
        break;

      case "resume":
        response = "Resume download protocol loaded. Click on 'Resume PDF' app to review timeline, credentials, and trigger direct download.";
        break;

      case "github":
        if (typeof window !== "undefined") window.open("https://github.com/mirshad", "_blank");
        response = "Redirecting to GitHub profile...";
        break;

      case "linkedin":
        if (typeof window !== "undefined") window.open("https://linkedin.com/in/mirshad", "_blank");
        response = "Redirecting to LinkedIn profile...";
        break;

      case "social":
        response = "LinkedIn: linkedin.com/in/mirshad\nGitHub: github.com/mirshad\nInstagram: instagram.com/mirshad";
        break;

      case "clear":
        setHistory([]);
        return;

      case "easteregg":
        response = "Initiating system easter egg check...\n[WARNING] Overclocking CPU core...\n[OK] DeepMind neural connection active.\nType 'matrix' to load falling green code, or 'sudo hire-mirshad' for recruitment protocol.";
        break;

      case "hire":
        response = "Recruiter panel active. I'm open to full stack, cloud, AI, and DevOps roles. Type 'sudo hire-mirshad' to trigger immediate contract approval!";
        break;

      case "sudo hire-mirshad":
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
        response = `Access Granted.

Recruitment Protocol Activated.
Mirshad V P is hired! Confetti launched. Check your notifications panel.`;
        break;

      case "show-secret-project":
        openApp("trading-bot", "AI Trading Bot");
        response = "Secret project loaded. Launching AI Trading Bot dashboard...";
        break;

      case "about-founder":
        response = "Mirshad V P - Founder story: Blending technology entrepreneurship, developer capabilities, and cloud architecture expertise to formulate secure and scalable software systems.";
        break;

      case "matrix":
        // Trigger a custom notification event or matrix canvas toggle.
        // We will mock matrix overlay inside the terminal window!
        response = "Matrix rain overlay active. Rain stream rendering underneath terminal viewport grid.";
        break;

      case "coffee":
        response = "Error: Out of coffee. Dev productivity falling... Reloading resources.";
        break;

      default:
        response = `Command not found: '${cmd}'. Type 'help' to review list of inputs.`;
        break;
    }

    setHistory((prev) => [...prev, { input: cmd, output: response, isHtml }]);
  };

  return (
    <div 
      className="h-full flex flex-col p-4 font-mono text-xs leading-relaxed overflow-hidden bg-black select-text cursor-text"
      onClick={() => document.getElementById("terminal-input")?.focus()}
    >
      {/* Outputs list */}
      <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-2">
        {history.map((item, idx) => (
          <div key={idx} className="flex flex-col">
            {item.input && (
              <div className="text-zinc-400">
                <span className="text-emerald-500">mirshadvp@mvp-os:~$</span> {item.input}
              </div>
            )}
            <div className="text-[#39ff14] whitespace-pre-wrap mt-0.5">{item.output}</div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2 border-t border-zinc-900 pt-3 mt-1.5 shrink-0">
        <span className="text-emerald-500 font-bold">mirshadvp@mvp-os:~$</span>
        <input
          id="terminal-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          className="flex-1 bg-transparent text-[#39ff14] border-none outline-none caret-[#39ff14]"
          autoFocus
        />
      </div>
    </div>
  );
}
