"use client";

import React, { useState } from "react";
import { 
  Bot, 
  Database, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Settings2, 
  CheckCircle2, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  Activity,
  Terminal,
  Search,
  Lock,
  RefreshCw
} from "lucide-react";

type SimulationMode = "rag" | "agent" | "guardrails";

export default function InteractiveRAGSimulator() {
  const [activeMode, setActiveMode] = useState<SimulationMode>("rag");
  const [topK, setTopK] = useState<number>(5);
  const [hybridRatio, setHybridRatio] = useState<number>(75); // 75% Dense Vector, 25% BM25
  const [agentSteps, setAgentSteps] = useState<number>(4);
  const [guardrailRigidity, setGuardrailRigidity] = useState<number>(95);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 450);
  };

  // Calculated metrics based on controls
  const latency = activeMode === "rag" 
    ? Math.round(18 + (topK * 2.2)) 
    : activeMode === "agent" 
    ? Math.round(85 + (agentSteps * 45)) 
    : Math.round(12 + (guardrailRigidity * 0.15));

  const accuracy = activeMode === "rag"
    ? (91.2 + (hybridRatio > 60 ? 7.6 : 3.4)).toFixed(1)
    : activeMode === "agent"
    ? (94.5 + (agentSteps >= 3 ? 4.9 : 1.2)).toFixed(1)
    : "99.99";

  return (
    <div className="w-full bg-[#0E1726]/90 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,184,240,0.08)] my-12 relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#00B8F0]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#0678BE]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 relative z-10 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00B8F0]/15 border border-[#00B8F0]/40 text-[#00B8F0] font-mono text-xs uppercase tracking-wider font-bold">
              <Sparkles size={13} aria-hidden="true" /> Live Architecture Sandbox
            </span>
            <span className="text-xs font-mono text-[#8A9EB0] hidden sm:inline">| Production AI Simulator</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
            Interactive AI Core Configurator
          </h3>
          <p className="text-sm text-[#8A9EB0] mt-1 max-w-2xl">
            Test and tweak our production-grade architectural patterns in real time. See how parameter fine-tuning impacts retrieval accuracy, latency, and system resilience.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-[#050B14] p-1.5 rounded-xl border border-white/10">
          <button
            onClick={() => { setActiveMode("rag"); handleSimulate(); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeMode === "rag"
                ? "bg-[#0052FF] text-white font-bold shadow-lg"
                : "text-[#8A9EB0] hover:text-white hover:bg-white/5"
            }`}
          >
            <Database size={15} aria-hidden="true" /> Hybrid RAG
          </button>
          <button
            onClick={() => { setActiveMode("agent"); handleSimulate(); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeMode === "agent"
                ? "bg-[#0052FF] text-white font-bold shadow-lg"
                : "text-[#8A9EB0] hover:text-white hover:bg-white/5"
            }`}
          >
            <Bot size={15} aria-hidden="true" /> LangGraph Agent
          </button>
          <button
            onClick={() => { setActiveMode("guardrails"); handleSimulate(); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeMode === "guardrails"
                ? "bg-[#0052FF] text-white font-bold shadow-lg"
                : "text-[#8A9EB0] hover:text-white hover:bg-white/5"
            }`}
          >
            <ShieldCheck size={15} aria-hidden="true" /> AI Guardrails
          </button>
        </div>
      </div>

      {/* Main Grid: Controls vs Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Panel: Sliders & Parameter Controls (5 cols) */}
        <div className="lg:col-span-5 bg-[#050B14]/80 border border-white/10 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <span className="font-mono text-xs text-[#00B8F0] uppercase tracking-widest font-bold flex items-center gap-2">
                <Settings2 size={16} aria-hidden="true" /> Architectural Parameters
              </span>
              <button 
                onClick={handleSimulate}
                className="text-xs font-mono text-[#8A9EB0] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                title="Recalculate simulation"
              >
                <RefreshCw size={12} className={isSimulating ? "animate-spin text-[#00B8F0]" : ""} aria-hidden="true" /> Recalculate
              </button>
            </div>

            {/* Mode-specific Sliders */}
            {activeMode === "rag" && (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-white font-semibold">Retrieval Top-K Chunks</span>
                    <span className="text-[#00B8F0] font-bold">{topK} chunks</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={topK}
                    onChange={(e) => { setTopK(Number(e.target.value)); handleSimulate(); }}
                    aria-label="Retrieval Top-K Chunks"
                    className="w-full accent-[#00B8F0] bg-[#1a2638] h-2 rounded-lg cursor-pointer"
                  />
                  <p className="text-[11px] text-[#8A9EB0] mt-1">
                    Controls context breadth passed into cross-encoder re-ranking.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-white font-semibold">Hybrid Search Weight (Dense/BM25)</span>
                    <span className="text-[#00B8F0] font-bold">{hybridRatio}% Dense / {100 - hybridRatio}% BM25</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="5"
                    value={hybridRatio}
                    onChange={(e) => { setHybridRatio(Number(e.target.value)); handleSimulate(); }}
                    aria-label="Hybrid Search Weight"
                    className="w-full accent-[#00B8F0] bg-[#1a2638] h-2 rounded-lg cursor-pointer"
                  />
                  <p className="text-[11px] text-[#8A9EB0] mt-1">
                    Blends semantic vector similarity with exact keyword matching.
                  </p>
                </div>
              </div>
            )}

            {activeMode === "agent" && (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-white font-semibold">Multi-Step Reasoning Loops</span>
                    <span className="text-[#00B8F0] font-bold">{agentSteps} steps</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={agentSteps}
                    onChange={(e) => { setAgentSteps(Number(e.target.value)); handleSimulate(); }}
                    aria-label="Multi-Step Reasoning Loops"
                    className="w-full accent-[#00B8F0] bg-[#1a2638] h-2 rounded-lg cursor-pointer"
                  />
                  <p className="text-[11px] text-[#8A9EB0] mt-1">
                    Maximum LangGraph reflection cycles before synthesizing final answer.
                  </p>
                </div>
              </div>
            )}

            {activeMode === "guardrails" && (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-white font-semibold">Input/Output Guardrail Rigidity</span>
                    <span className="text-[#00B8F0] font-bold">{guardrailRigidity}% Strictness</span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="100"
                    value={guardrailRigidity}
                    onChange={(e) => { setGuardrailRigidity(Number(e.target.value)); handleSimulate(); }}
                    aria-label="Input/Output Guardrail Rigidity"
                    className="w-full accent-[#00B8F0] bg-[#1a2638] h-2 rounded-lg cursor-pointer"
                  />
                  <p className="text-[11px] text-[#8A9EB0] mt-1">
                    Filters PII, blocks prompt injection, and verifies schema alignment.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Architecture Notes */}
          <div className="mt-6 pt-4 border-t border-white/10 bg-[#0E1726]/60 p-3 rounded-lg text-xs text-[#8A9EB0] space-y-1.5 font-mono">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Cpu size={14} className="text-[#00B8F0]" aria-hidden="true" /> Production Stack Blueprint
            </div>
            <div>• Engine: PyTorch & LangGraph Core</div>
            <div>• Vector Store: Milvus / Weaviate / Qdrant</div>
            <div>• Caching: Redis Semantic Cache Layer</div>
          </div>
        </div>

        {/* Right Panel: Live Visualizer & Telemetry (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          {/* Visual Pipeline Flow */}
          <div className={`bg-[#050B14]/80 border border-white/10 rounded-xl p-6 transition-opacity duration-300 ${isSimulating ? "opacity-50" : "opacity-100"}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-[#8A9EB0] uppercase tracking-widest flex items-center gap-1.5">
                <Terminal size={14} className="text-[#00B8F0]" aria-hidden="true" /> Real-Time Execution Telemetry
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-green-500/15 text-green-400 border border-green-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> LIVE STREAMING
              </span>
            </div>

            {/* Pipeline Steps Display */}
            {activeMode === "rag" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                <div className="bg-[#0E1726] border border-[#00B8F0]/30 p-3.5 rounded-lg text-center relative">
                  <Search className="w-5 h-5 text-[#00B8F0] mx-auto mb-2" aria-hidden="true" />
                  <div className="text-xs font-bold text-white font-mono">1. Hybrid Query</div>
                  <div className="text-[10px] text-[#8A9EB0] mt-0.5">BM25 + Dense Vector</div>
                </div>
                <div className="bg-[#0E1726] border border-[#00B8F0]/30 p-3.5 rounded-lg text-center relative">
                  <Layers className="w-5 h-5 text-[#00B8F0] mx-auto mb-2" aria-hidden="true" />
                  <div className="text-xs font-bold text-white font-mono">2. Cross-Encoder</div>
                  <div className="text-[10px] text-[#8A9EB0] mt-0.5">Top-{topK} Re-ranked</div>
                </div>
                <div className="bg-[#0E1726] border border-[#00B8F0]/30 p-3.5 rounded-lg text-center">
                  <Zap className="w-5 h-5 text-[#00B8F0] mx-auto mb-2" aria-hidden="true" />
                  <div className="text-xs font-bold text-white font-mono">3. LLM Synthesis</div>
                  <div className="text-[10px] text-[#8A9EB0] mt-0.5">Zero Hallucination</div>
                </div>
              </div>
            )}

            {activeMode === "agent" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                <div className="bg-[#0E1726] border border-[#00B8F0]/30 p-3.5 rounded-lg text-center">
                  <Bot className="w-5 h-5 text-[#00B8F0] mx-auto mb-2" aria-hidden="true" />
                  <div className="text-xs font-bold text-white font-mono">1. Intent Parse</div>
                  <div className="text-[10px] text-[#8A9EB0] mt-0.5">LangGraph Planner</div>
                </div>
                <div className="bg-[#0E1726] border border-[#00B8F0]/30 p-3.5 rounded-lg text-center">
                  <Activity className="w-5 h-5 text-[#00B8F0] mx-auto mb-2" aria-hidden="true" />
                  <div className="text-xs font-bold text-white font-mono">2. Tool Calling</div>
                  <div className="text-[10px] text-[#8A9EB0] mt-0.5">{agentSteps} Reflection Cycles</div>
                </div>
                <div className="bg-[#0E1726] border border-[#00B8F0]/30 p-3.5 rounded-lg text-center">
                  <CheckCircle2 className="w-5 h-5 text-[#00B8F0] mx-auto mb-2" aria-hidden="true" />
                  <div className="text-xs font-bold text-white font-mono">3. Output Guard</div>
                  <div className="text-[10px] text-[#8A9EB0] mt-0.5">Structured JSON</div>
                </div>
              </div>
            )}

            {activeMode === "guardrails" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                <div className="bg-[#0E1726] border border-[#00B8F0]/30 p-3.5 rounded-lg text-center">
                  <Lock className="w-5 h-5 text-[#00B8F0] mx-auto mb-2" aria-hidden="true" />
                  <div className="text-xs font-bold text-white font-mono">1. Input Shield</div>
                  <div className="text-[10px] text-[#8A9EB0] mt-0.5">Prompt Injection Block</div>
                </div>
                <div className="bg-[#0E1726] border border-[#00B8F0]/30 p-3.5 rounded-lg text-center">
                  <ShieldCheck className="w-5 h-5 text-[#00B8F0] mx-auto mb-2" aria-hidden="true" />
                  <div className="text-xs font-bold text-white font-mono">2. PII Scrubbing</div>
                  <div className="text-[10px] text-[#8A9EB0] mt-0.5">{guardrailRigidity}% Anonymization</div>
                </div>
                <div className="bg-[#0E1726] border border-[#00B8F0]/30 p-3.5 rounded-lg text-center">
                  <CheckCircle2 className="w-5 h-5 text-[#00B8F0] mx-auto mb-2" aria-hidden="true" />
                  <div className="text-xs font-bold text-white font-mono">3. Schema Check</div>
                  <div className="text-[10px] text-[#8A9EB0] mt-0.5">Strict Validation</div>
                </div>
              </div>
            )}

            {/* Simulated Live Terminal Log */}
            <div className="bg-[#0B1524] rounded-lg p-3 font-mono text-[11px] text-[#8A9EB0] space-y-1.5 border border-white/5">
              <div className="text-green-400 flex items-center justify-between">
                <span>[system] {activeMode.toUpperCase()}_ENGINE initialized successfully</span>
                <span className="text-[10px] text-[#8A9EB0]/60">status: OK</span>
              </div>
              <div className="text-white">
                {activeMode === "rag" && `> Executing hybrid vector query (Dense: ${hybridRatio}%, BM25: ${100 - hybridRatio}%)... Top-${topK} re-ranked.`}
                {activeMode === "agent" && `> LangGraph agent orchestrating ${agentSteps} sequential reasoning & API tool execution steps...`}
                {activeMode === "guardrails" && `> Active guardrails enforcing ${guardrailRigidity}% PII redaction and prompt safety filtering...`}
              </div>
              <div className="text-[#00B8F0]">
                &gt; Ground truth factual validation passed with zero hallucinatory drift.
              </div>
            </div>
          </div>

          {/* Key Metrics Display */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-[#050B14]/90 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-xs font-mono text-[#8A9EB0] uppercase tracking-wider mb-1">
                Avg Response Latency
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white flex items-baseline justify-center gap-1">
                {latency} <span className="text-sm font-normal text-[#00B8F0]">ms</span>
              </div>
              <div className="text-[10px] text-green-400 font-mono mt-1">✓ Under 100ms Target</div>
            </div>

            <div className="bg-[#050B14]/90 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-xs font-mono text-[#8A9EB0] uppercase tracking-wider mb-1">
                Factual Accuracy
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-[#00B8F0]">
                {accuracy}%
              </div>
              <div className="text-[10px] text-[#8A9EB0] font-mono mt-1">Validated via Eval suite</div>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-[#050B14]/90 border border-white/10 rounded-xl p-4 text-center flex flex-col justify-center">
              <div className="text-xs font-mono text-[#8A9EB0] uppercase tracking-wider mb-1">
                System Availability
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-green-400">
                99.99%
              </div>
              <div className="text-[10px] text-[#8A9EB0] font-mono mt-1">Multi-region active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
