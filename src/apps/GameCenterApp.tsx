"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Award, ShieldAlert } from "lucide-react";

interface Collectible {
  x: number;
  y: number;
  label: string;
  size: number;
  color: string;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  color: string;
}

export default function GameCenterApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"menu" | "playing" | "gameover">("menu");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Load high score from LocalStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("coderunner_highscore");
      if (saved) setHighScore(parseInt(saved, 10));
    }
  }, []);

  const startGame = () => {
    setScore(0);
    setGameState("playing");
  };

  useEffect(() => {
    if (gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // Game variables
    let gameSpeed = 5;
    let frameCount = 0;
    
    // Player
    const player = {
      x: 50,
      y: 180,
      width: 25,
      height: 35,
      vy: 0,
      gravity: 0.6,
      jumpForce: -11,
      isGrounded: true,
      jump: function () {
        if (this.isGrounded) {
          this.vy = this.jumpForce;
          this.isGrounded = false;
        }
      },
      update: function () {
        this.y += this.vy;
        this.vy += this.gravity;
        
        // Ground collision
        if (this.y >= 180) {
          this.y = 180;
          this.vy = 0;
          this.isGrounded = true;
        }
      },
      draw: function () {
        // Draw Developer character (blue capsule/hoodie)
        ctx.fillStyle = "#007aff";
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 6);
        ctx.fill();

        // Hoodie visor
        ctx.fillStyle = "#fff";
        ctx.fillRect(this.x + 12, this.y + 6, 8, 5);
      }
    };

    // Obstacles & Collectibles lists
    let obstacles: Obstacle[] = [];
    let collectibles: Collectible[] = [];

    const obstacleLabels = ["BUG", "ERROR", "CRASH", "NULL_POINTER"];
    const collectibleLabels = [
      { name: "PYTHON", color: "#ffd43b" },
      { name: "AWS", color: "#ff9900" },
      { name: "REACT", color: "#61dafb" },
      { name: "AI", color: "#a855f7" },
      { name: "CLOUD", color: "#0ea5e9" },
      { name: "GIT", color: "#f05032" }
    ];

    // Key handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        player.jump();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Touch/click jump handler
    const handleTouch = () => {
      player.jump();
    };
    canvas.addEventListener("click", handleTouch);

    // Loop
    const gameLoop = () => {
      frameCount++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw horizon road line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 215);
      ctx.lineTo(canvas.width, 215);
      ctx.stroke();

      // Update & Draw Player
      player.update();
      player.draw();

      // Increase speed slowly
      if (frameCount % 600 === 0) gameSpeed += 0.5;

      // Spawn Obstacles (avoid bugs)
      if (frameCount % 120 === 0) {
        const obsWidth = 35 + Math.random() * 20;
        obstacles.push({
          x: canvas.width,
          y: 190,
          width: obsWidth,
          height: 25,
          label: obstacleLabels[Math.floor(Math.random() * obstacleLabels.length)],
          color: "#ff5f56"
        });
      }

      // Spawn Collectibles (tech stacks)
      if (frameCount % 80 === 0 && frameCount % 120 !== 0) {
        const item = collectibleLabels[Math.floor(Math.random() * collectibleLabels.length)];
        collectibles.push({
          x: canvas.width,
          y: 90 + Math.random() * 60,
          label: item.name,
          size: 10,
          color: item.color
        });
      }

      // Update & Draw Obstacles
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.x -= gameSpeed;
        
        // Draw Obstacle card
        ctx.fillStyle = obs.color;
        ctx.beginPath();
        ctx.roundRect(obs.x, obs.y, obs.width, obs.height, 4);
        ctx.fill();

        ctx.fillStyle = "#fff";
        ctx.font = "bold 8px monospace";
        ctx.textAlign = "center";
        ctx.fillText(obs.label, obs.x + obs.width / 2, obs.y + 15);

        // Collision Check
        if (
          player.x < obs.x + obs.width &&
          player.x + player.width > obs.x &&
          player.y < obs.y + obs.height &&
          player.y + player.height > obs.y
        ) {
          // Game Over trigger
          setGameState("gameover");
          setHighScore((prev) => {
            const next = score > prev ? score : prev;
            localStorage.setItem("coderunner_highscore", next.toString());
            return next;
          });
          return;
        }

        // Remove offscreen
        if (obs.x < -100) obstacles.splice(i, 1);
      }

      // Update & Draw Collectibles
      for (let i = collectibles.length - 1; i >= 0; i--) {
        const col = collectibles[i];
        col.x -= gameSpeed;

        // Draw bubble
        ctx.fillStyle = col.color;
        ctx.beginPath();
        ctx.arc(col.x, col.y, 16, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#000";
        ctx.font = "bold 7px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(col.label, col.x, col.y + 3);

        // Collision check
        const dist = Math.hypot(player.x + 12 - col.x, player.y + 17 - col.y);
        if (dist < 28) {
          setScore((prev) => prev + 10);
          collectibles.splice(i, 1);
          continue;
        }

        // Remove offscreen
        if (col.x < -50) collectibles.splice(i, 1);
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", handleKeyDown);
      canvas.removeEventListener("click", handleTouch);
    };
  }, [gameState, score]);

  return (
    <div className="h-full flex flex-col p-6 gap-4 bg-zinc-950 font-mono text-zinc-300 items-center justify-center select-none">
      
      {/* UI Hud Panel */}
      <div className="w-[500px] max-w-full flex justify-between items-center text-xs border-b border-white/5 pb-2">
        <div className="flex items-center gap-4">
          <span className="font-bold text-white flex items-center gap-1">Score: <span className="text-os-blue text-sm">{score}</span></span>
          <span className="text-zinc-500 flex items-center gap-1">High Score: <span className="text-zinc-300">{highScore}</span></span>
        </div>
        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Space/Tap to jump</span>
      </div>

      {/* Screen container */}
      <div className="relative border border-white/10 rounded-xl bg-black overflow-hidden w-[500px] h-[250px] max-w-full shadow-inner">
        {gameState === "playing" && (
          <canvas 
            ref={canvasRef} 
            width={500} 
            height={250}
            className="w-full h-full block bg-zinc-950" 
          />
        )}

        {/* Start Menu View */}
        {gameState === "menu" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 gap-3">
            <h3 className="text-base font-bold text-white tracking-widest flex items-center gap-1.5"><Award size={18} className="text-os-blue animate-bounce" /> CODE RUNNER</h3>
            <p className="text-[10px] text-zinc-500 max-w-[320px] leading-relaxed">
              Control the developer, collect Python, AWS, and AI stacks. Avoid BUG, ERROR, and CRASH triggers.
            </p>
            <button 
              onClick={startGame}
              className="mt-2 py-2 px-6 rounded-lg bg-os-blue text-white text-xs font-bold flex items-center gap-1.5 cursor-default hover:opacity-90"
            >
              <Play size={14} /> Start Execution
            </button>
          </div>
        )}

        {/* Game Over View */}
        {gameState === "gameover" && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center text-center p-6 gap-3">
            <h3 className="text-base font-bold text-red-500 tracking-widest flex items-center gap-1.5"><ShieldAlert size={18} /> SEGMENTATION FAULT</h3>
            <p className="text-[11px] text-zinc-400">Your system crashed. Obstacle collision detected.</p>
            <div className="text-xs text-white font-bold my-1">
              Final Stack Score: <span className="text-os-blue">{score}</span>
            </div>
            <button 
              onClick={startGame}
              className="py-2 px-6 rounded-lg bg-zinc-800 border border-white/10 text-white text-xs font-bold flex items-center gap-1.5 cursor-default hover:bg-zinc-700"
            >
              <RotateCcw size={14} /> Retry Execution
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
