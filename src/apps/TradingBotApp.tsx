"use client";

import React, { useState, useEffect } from "react";
import { Activity, Play, Pause, RefreshCw, Layers, TrendingUp, CheckCircle } from "lucide-react";

export default function TradingBotApp() {
  const [price, setPrice] = useState(67420.50);
  const [isRunning, setIsRunning] = useState(true);
  const [trend, setTrend] = useState<"UP" | "DOWN" | "NEUTRAL">("UP");
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Bot initialized. Model: LSTM_v4.5",
    "[BINANCE] WebSockets connected. Streaming BTCUSDT...",
    "[LSTM] Loaded network weights. Inputs: 60 timesteps.",
    "[DECISION] Prediction threshold: 0.58. Hold status active.",
  ]);

  const [priceHistory, setPriceHistory] = useState<number[]>([
    67100, 67150, 67210, 67180, 67250, 67300, 67290, 67350, 67400, 67420.5
  ]);

  // Simulate real-time price feed and logs
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const change = (Math.random() - 0.48) * 15; // slightly upward biased random walk
      const nextPrice = Number((price + change).toFixed(2));
      setPrice(nextPrice);
      setPriceHistory((prev) => [...prev.slice(1), nextPrice]);

      // Randomly inject model logs
      if (Math.random() > 0.6) {
        const timestamp = new Date().toLocaleTimeString();
        const logsPool = [
          `[LSTM] Prediction computed. Trend score: ${(Math.random() * 0.4 + 0.4).toFixed(3)}`,
          `[BINANCE] Dynamic order book volume balanced. Bid/Ask ratio: ${(Math.random() * 0.4 + 0.8).toFixed(2)}`,
          `[DECISION] Signal generated: ${Math.random() > 0.5 ? "BUY" : "HOLD"}. Price: $${nextPrice}`,
          `[SYSTEM] GPU inference time: ${Math.round(Math.random() * 20 + 15)}ms. Memory load: 24%`,
        ];
        const logText = logsPool[Math.floor(Math.random() * logsPool.length)];
        setLogs((prev) => [...prev.slice(-15), `[${timestamp}] ${logText}`]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [price, isRunning]);

  const handleToggle = () => {
    setIsRunning(!isRunning);
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [
      ...prev,
      `[${timestamp}] [SYSTEM] Trading Bot ${!isRunning ? "STARTED" : "STOPPED"}.`
    ]);
  };

  // Convert price history to SVG line coordinates
  const getSvgPathCoordinates = () => {
    const min = Math.min(...priceHistory);
    const max = Math.max(...priceHistory);
    const range = max - min || 1;
    const width = 300;
    const height = 100;
    const step = width / (priceHistory.length - 1);

    return priceHistory
      .map((p, i) => {
        const x = i * step;
        const y = height - ((p - min) / range) * height * 0.8 - height * 0.1; // margin inside svg
        return `${x},${y}`;
      })
      .join(" ");
  };

  return (
    <div className="flex flex-col h-full min-h-[480px] p-6 gap-6 bg-zinc-950 font-mono text-zinc-300">
      {/* Upper stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-white/5 p-4 rounded-xl flex flex-col gap-1">
          <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Asset Pair</p>
          <h3 className="text-sm font-semibold text-white">BTC / USDT</h3>
          <p className="text-[10px] text-zinc-400">Binance Spot Feed</p>
        </div>

        <div className="bg-zinc-900 border border-white/5 p-4 rounded-xl flex flex-col gap-1">
          <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Live Price</p>
          <h3 className="text-sm font-semibold text-white tracking-wider">${price.toLocaleString()}</h3>
          <p className="text-[10px] text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Streaming
          </p>
        </div>

        <div className="bg-zinc-900 border border-white/5 p-4 rounded-xl flex flex-col gap-1">
          <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">LSTM Prediction</p>
          <h3 className={`text-sm font-semibold flex items-center gap-1.5 ${
            trend === "UP" ? "text-emerald-400" : "text-rose-400"
          }`}>
            <TrendingUp size={16} /> BULLISH TREND
          </h3>
          <p className="text-[10px] text-zinc-400">Model Accuracy: 64%</p>
        </div>

        <div className="bg-zinc-900 border border-white/5 p-4 rounded-xl flex flex-col gap-1">
          <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Bot Status</p>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-semibold ${isRunning ? "text-emerald-400" : "text-rose-400"}`}>
              {isRunning ? "RUNNING" : "PAUSED"}
            </h3>
            <button 
              onClick={handleToggle}
              className={`px-2.5 py-0.5 rounded text-[9px] font-bold text-white uppercase ${
                isRunning ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {isRunning ? "Pause" : "Start"}
            </button>
          </div>
          <p className="text-[10px] text-zinc-400">API Connection Secured</p>
        </div>
      </div>

      {/* Center: Chart & Configs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Graph Visual */}
        <div className="md:col-span-2 bg-zinc-900 border border-white/5 p-5 rounded-xl flex flex-col gap-4">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Activity size={14} className="text-os-blue" /> LSTM Historical Price Tracking
            </span>
            <span className="text-[10px] text-zinc-500">60-timestep window</span>
          </div>

          <div className="flex-1 w-full h-[150px] relative mt-2 border border-white/5 rounded-lg p-2 bg-black/40 overflow-hidden flex items-center justify-center">
            <svg viewBox="0 0 300 100" className="w-full h-full text-os-blue" preserveAspectRatio="none">
              <path
                d={`M ${getSvgPathCoordinates()}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="stroke-os-blue"
              />
            </svg>
          </div>
        </div>

        {/* Model info panel */}
        <div className="bg-zinc-900 border border-white/5 p-5 rounded-xl flex flex-col gap-4 text-xs">
          <h3 className="font-semibold text-white flex items-center gap-1.5">
            <Layers size={14} className="text-os-blue" /> Network Topology
          </h3>
          <div className="flex flex-col gap-3 text-[11px] text-zinc-400">
            <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
              <span>Input Layer</span>
              <span className="text-white font-semibold">1x60 Features</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
              <span>LSTM Layer 1</span>
              <span className="text-white font-semibold">128 Units (Dropout 0.2)</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
              <span>LSTM Layer 2</span>
              <span className="text-white font-semibold">64 Units (Dropout 0.2)</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
              <span>Dense Layer</span>
              <span className="text-white font-semibold">32 Units (ReLU)</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Output Layer</span>
              <span className="text-white font-semibold">1 Unit (Linear Price)</span>
            </div>
          </div>
          <div className="mt-auto bg-white/5 p-3 rounded-lg border border-white/5 flex items-center gap-2">
            <CheckCircle size={14} className="text-emerald-400 shrink-0" />
            <span className="text-[10px] text-zinc-400">Binance API verification check valid. Ready.</span>
          </div>
        </div>
      </div>

      {/* Lower Console Logger */}
      <div className="h-32 bg-zinc-950 border border-white/5 rounded-xl p-4 overflow-y-auto flex flex-col gap-1 text-[10px] text-zinc-500 font-mono">
        <div className="flex justify-between border-b border-white/5 pb-1 mb-1 text-zinc-400">
          <span>Inference System Console Output</span>
          <span className="animate-pulse flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> ONLINE</span>
        </div>
        {logs.map((log, index) => (
          <div key={index} className="leading-relaxed truncate">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
