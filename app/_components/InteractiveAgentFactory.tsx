"use client";

import React, { useState } from "react";
import {
  Bot,
  Play,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Terminal,
  Cpu,
  Layers,
  RefreshCw,
  Clock,
  UserCheck,
  FileText,
  Workflow,
  Zap,
  Lock,
  Pause,
  RotateCcw
} from "lucide-react";

interface AgentStep {
  id: string;
  name: string;
  role: string;
  type: "input" | "reason" | "tool" | "gate" | "mutation";
  status: "idle" | "running" | "waiting_approval" | "completed" | "rolled_back";
  details: string;
  output?: string;
  timestamp?: string;
}

const SAMPLE_SCENARIOS = [
  {
    id: "po_reconciliation",
    title: "SAP Purchase Order Reconciliation",
    category: "ERP & Finance",
    trigger: "Incoming Vendor Invoice: $42,500 from AvioCorp (Vendor ID #VN-8841)",
    steps: [
      {
        id: "step-1",
        name: "01 Ingress Contract Validator",
        role: "Pydantic v2 Contract Gate",
        type: "input" as const,
        status: "completed" as const,
        details: "Validating incoming payload against ERP Invoice Schema. Zero type drift allowed.",
        output: "Schema validated: VendorID #VN-8841, PO #PO-99214, Amount: $42,500.00.",
        timestamp: "+12ms"
      },
      {
        id: "step-2",
        name: "02 Cross-Ledger Verifier",
        role: "Subagent (Tool Runner)",
        type: "tool" as const,
        status: "completed" as const,
        details: "Queries PostgreSQL ERP ledger for PO #PO-99214 goods receipt matching.",
        output: "3-Way Match Verified: GRN #GR-1049 matches line items. Quantity 100% accounted.",
        timestamp: "+48ms"
      },
      {
        id: "step-3",
        name: "03 HITL Human Approval Gate",
        role: "LangGraph Interrupt Gate",
        type: "gate" as const,
        status: "waiting_approval" as const,
        details: "Invoice exceeds automatic release threshold ($25,000). Pausing graph execution for Controller sign-off.",
        output: "Awaiting Finance Controller approval before state mutation.",
        timestamp: "+62ms"
      },
      {
        id: "step-4",
        name: "04 Ledger Mutation & Audit Write",
        role: "WAL Ledger Committer",
        type: "mutation" as const,
        status: "idle" as const,
        details: "Executes atomic payment schedule write to SAP and writes SHA-256 hash to immutable audit log.",
        output: "Pending Human Sign-off.",
        timestamp: "--"
      }
    ]
  },
  {
    id: "mro_work_order",
    title: "FAA Turbine Fault Dispatch",
    category: "Aerospace MRO",
    trigger: "Sensor Alert: CFM56-7B High Vibration (Sensor Node #E1-VIB-08)",
    steps: [
      {
        id: "step-1",
        name: "01 Telemetry Ingestion",
        role: "Ingress Telemetry Parser",
        type: "input" as const,
        status: "completed" as const,
        details: "Normalized vibration amplitude (4.2 ips). Mapped against FAA Airworthiness Directives.",
        output: "Vibration threshold exceeded by 18%. Aircraft tail #N841AA flagged.",
        timestamp: "+8ms"
      },
      {
        id: "step-2",
        name: "02 Maintenance Manual RAG",
        role: "ColBERTv2 Spec Retriever",
        type: "tool" as const,
        status: "completed" as const,
        details: "Extracts Fault Isolation Manual (FIM) Task 72-00-00-810-801 with exact torque and bearing tolerances.",
        output: "Target inspection: Fan blade root lubrication & damper pin inspection cited.",
        timestamp: "+39ms"
      },
      {
        id: "step-3",
        name: "03 Lead Engineer Sign-off Gate",
        role: "HITL Maintenance Control",
        type: "gate" as const,
        status: "waiting_approval" as const,
        details: "Grounding an aircraft requires mandatory sign-off from Chief Inspector.",
        output: "Pending Chief Inspector 1-click confirmation on Slack/Console.",
        timestamp: "+54ms"
      },
      {
        id: "step-4",
        name: "04 MRO Work Order Generation",
        role: "ERP Work Order Committer",
        type: "mutation" as const,
        status: "idle" as const,
        details: "Dispatches technician work order with required tool kits and locks flight schedule.",
        output: "Pending Approval.",
        timestamp: "--"
      }
    ]
  }
];

export default function InteractiveAgentFactory() {
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const [steps, setSteps] = useState<AgentStep[]>(SAMPLE_SCENARIOS[0].steps);
  const [isRunning, setIsRunning] = useState(false);
  const [executionLog, setExecutionLog] = useState<string[]>([
    "Graph initialized from LangGraph Postgres WAL Checkpoint (#tx_99410).",
    "Pydantic v2 Contract Gate verified input constraints in 12ms.",
    "Subagent dispatched: Cross-Ledger Verifier queried PostgreSQL ledger in 48ms.",
    "CRITICAL: Mutation boundary detected. State paused at HITL Gate (Human In The Loop)."
  ]);
  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  const scenario = SAMPLE_SCENARIOS[selectedScenarioIdx];

  const handleSelectScenario = (idx: number) => {
    setSelectedScenarioIdx(idx);
    setSteps(SAMPLE_SCENARIOS[idx].steps);
    setIsApproved(false);
    setIsRejected(false);
    setExecutionLog([
      `Graph initialized for scenario: "${SAMPLE_SCENARIOS[idx].title}"`,
      "State Checkpointer: WAL Append Log verified.",
      "Input contract validated successfully.",
      "Execution paused at Human Sign-Off Gate."
    ]);
  };

  const handleApprove = () => {
    setIsApproved(true);
    setIsRejected(false);
    const updated = [...steps];
    updated[2] = { ...updated[2], status: "completed", output: "Approved by Controller #ADM-04 (1-Click OAuth)" };
    updated[3] = { ...updated[3], status: "completed", output: "Committed to ERP Ledger. Audit Hash: #0x8f4c...3e1a", timestamp: "+88ms" };
    setSteps(updated);
    setExecutionLog((prev) => [
      ...prev,
      "USER ACTION: Operator authenticated via SAML SSO and clicked [APPROVE MUTATION].",
      "LangGraph runtime resumed from interrupt checkpoint (#tx_99410).",
      "Ledger Mutation committed successfully (Execution time: 88ms).",
      "IMMUTABLE AUDIT RECORD WRITTEN: Block #99214-FIN confirmed."
    ]);
  };

  const handleReject = () => {
    setIsRejected(true);
    setIsApproved(false);
    const updated = [...steps];
    updated[2] = { ...updated[2], status: "rolled_back", output: "Rejected by Controller. Compensating saga triggered." };
    updated[3] = { ...updated[3], status: "rolled_back", output: "State rolled back to initial checkpoint. Zero records mutated.", timestamp: "+24ms" };
    setSteps(updated);
    setExecutionLog((prev) => [
      ...prev,
      "USER ACTION: Operator clicked [REJECT MUTATION].",
      "TRIGGERING SAGA COMPENSATION: Rollback handlers dispatched.",
      "Graph state cleanly rewound. Zero database records modified.",
      "Audit alert dispatched to security team."
    ]);
  };

  const handleReset = () => {
    setSteps(scenario.steps);
    setIsApproved(false);
    setIsRejected(false);
    setExecutionLog([
      `Graph re-initialized from checkpoint.`,
      "Listening for incoming event triggers."
    ]);
  };

  return (
    <div className="w-full bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden font-sans">
      
      {/* Top HUD Bar */}
      <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <div className="font-mono text-xs uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-2">
            <Terminal size={14} className="text-[#0284C7]" />
            <span>BOTMARTZ AGENT FACTORY &bull; LIVE GOVERNANCE RUNTIME</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
            LangGraph + HITL Guard
          </span>
        </div>

        <div className="flex items-center gap-2">
          {SAMPLE_SCENARIOS.map((sc, i) => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedScenarioIdx === i
                  ? "bg-[#0284C7] text-white font-bold shadow-sm"
                  : "bg-slate-800/70 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {sc.title}
            </button>
          ))}
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Reset Simulation"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Main Factory Grid */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Graph Pipeline */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div>
            {/* Scenario Header */}
            <div className="mb-6 p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-[#0284C7] font-semibold uppercase tracking-wider block mb-1">
                  Active Workflow Pipeline &bull; {scenario.category}
                </span>
                <h4 className="text-sm font-semibold text-white">{scenario.trigger}</h4>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
                  Zero Runaway Loops
                </span>
              </div>
            </div>

            {/* Stepper Nodes Flow */}
            <div className="space-y-3.5 relative">
              {steps.map((st, idx) => {
                const isWaiting = st.status === "waiting_approval";
                const isDone = st.status === "completed";
                const isRolledBack = st.status === "rolled_back";

                return (
                  <div
                    key={st.id}
                    className={`p-4 rounded-xl border transition-all duration-300 relative ${
                      isWaiting
                        ? "bg-amber-950/20 border-amber-500/60 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/30"
                        : isDone
                        ? "bg-slate-950/50 border-emerald-500/30"
                        : isRolledBack
                        ? "bg-red-950/20 border-red-500/40"
                        : "bg-slate-950/30 border-slate-800 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                            isDone
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                              : isWaiting
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 animate-pulse"
                              : isRolledBack
                              ? "bg-red-500/20 text-red-400 border border-red-500/40"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {isDone ? <CheckCircle2 size={14} /> : isWaiting ? <Pause size={14} /> : isRolledBack ? <AlertTriangle size={14} /> : idx + 1}
                        </div>
                        <div>
                          <span className="font-bold text-sm text-slate-100">{st.name}</span>
                          <span className="text-[11px] font-mono text-slate-400 ml-2.5">[{st.role}]</span>
                        </div>
                      </div>

                      <div className="font-mono text-[11px]">
                        {isWaiting && (
                          <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 font-semibold">
                            PAUSED FOR APPROVAL
                          </span>
                        )}
                        {isDone && (
                          <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                            VERIFIED {st.timestamp}
                          </span>
                        )}
                        {isRolledBack && (
                          <span className="text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/30">
                            ROLLED BACK
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-2 pl-9.5">
                      {st.details}
                    </p>

                    {st.output && (
                      <div className="ml-9.5 p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center justify-between">
                        <span>{st.output}</span>
                        {isDone && <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />}
                      </div>
                    )}

                    {/* Interactive Approval Actions for Step 3 */}
                    {isWaiting && !isApproved && !isRejected && (
                      <div className="mt-3 ml-9.5 pt-3 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
                          <UserCheck size={14} />
                          <span>Human Authorization Required</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleApprove}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
                          >
                            <CheckCircle2 size={13} />
                            Approve Mutation
                          </button>
                          <button
                            onClick={handleReject}
                            className="bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800/80 font-semibold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all"
                          >
                            <AlertTriangle size={13} />
                            Reject &amp; Rollback
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Telemetry Strip */}
          <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 block mb-1">RUNAWAY LOOPS</span>
              <span className="text-base font-mono font-bold text-emerald-400">0 (Blocked)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 block mb-1">RETRY BOUND</span>
              <span className="text-base font-mono font-bold text-sky-400">Max 5 Loops</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 block mb-1">PERSISTENCE</span>
              <span className="text-base font-mono font-bold text-slate-200">Postgres WAL</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 block mb-1">STATE MUTATION</span>
              <span className={`text-base font-mono font-bold ${isApproved ? "text-emerald-400" : isRejected ? "text-red-400" : "text-amber-400"}`}>
                {isApproved ? "Committed" : isRejected ? "Compensated" : "Gated (HITL)"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Real-Time Audit Console / Execution Log */}
        <div className="lg:col-span-4 flex flex-col h-full justify-between">
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 font-bold text-slate-200">
                  <Terminal size={13} className="text-[#0284C7]" />
                  <span>AUDIT LEDGER &bull; WAL TRACE</span>
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-900">
                  SECURE
                </span>
              </div>

              {/* Console Stream */}
              <div className="space-y-2.5 text-xs font-mono">
                {executionLog.map((log, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-300">
                    <span className="text-[#0284C7] shrink-0 font-bold">&gt;</span>
                    <span className="leading-relaxed break-words">{log}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Pydantic v2 Contract:</span>
                  <span className="text-emerald-400 font-bold">STRICT_ENFORCE</span>
                </div>
                <div className="flex justify-between">
                  <span>Compensation Strategy:</span>
                  <span className="text-sky-400 font-bold">Saga Rollback</span>
                </div>
                <div className="flex justify-between">
                  <span>Audit Trail:</span>
                  <span className="text-slate-200 font-bold">Append-Only Immutable</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

