"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, MeshDistortMaterial, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Sparkles, Activity, Shield, Terminal, ArrowRight, Eye, RefreshCw } from "lucide-react";

interface NodeProps {
  position: [number, number, number];
  label: string;
  sub: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
}

function ArchitectureNode({ position, label, sub, color, isActive, onClick }: NodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.3;
      const targetScale = isActive ? 1.25 : hovered ? 1.15 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
          setHovered(true);
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
          setHovered(false);
        }}
      >
        <octahedronGeometry args={[0.7, 0]} />
        <MeshDistortMaterial
          color={color}
          speed={isActive ? 3 : 1.5}
          distort={isActive ? 0.35 : 0.15}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Floating 3D Label & Micro HUD */}
      <Html position={[0, -1.0, 0]} center distanceFactor={12}>
        <div 
          onClick={onClick}
          className={`px-3 py-1.5 rounded-lg backdrop-blur-md border transition-all duration-200 cursor-pointer whitespace-nowrap text-center ${
            isActive 
              ? 'bg-slate-900/90 border-[#38BDF8] text-white shadow-[0_0_15px_rgba(56,189,248,0.4)] scale-105' 
              : hovered 
                ? 'bg-slate-900/80 border-slate-600 text-slate-200 scale-100' 
                : 'bg-slate-900/60 border-slate-700/60 text-slate-400'
          }`}
        >
          <div className="font-mono text-[10px] font-bold uppercase tracking-wider">{label}</div>
          <div className="text-[9px] text-slate-400 font-sans">{sub}</div>
        </div>
      </Html>
    </group>
  );
}

function ConnectingBeam({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) {
  const lineRef = useRef<any>(null);

  const points = React.useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);
  const lineGeometry = React.useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <primitive object={new THREE.Line(
      lineGeometry,
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.45, linewidth: 2 })
    )} />
  );
}

function Scene({ selectedNode, setSelectedNode }: { selectedNode: number; setSelectedNode: (i: number) => void }) {
  const nodes: { pos: [number, number, number]; label: string; sub: string; color: string }[] = [
    { pos: [-3.0, 0.8, 0], label: "01 Ingestion", sub: "AST Proposition Engine", color: "#10B981" },
    { pos: [-1.0, -0.6, 0.5], label: "02 Hybrid Index", sub: "BM25 + Qdrant HNSW", color: "#0284C7" },
    { pos: [1.0, 0.8, -0.5], label: "03 RRF Fusion", sub: "Cross-Encoder Rescore", color: "#38BDF8" },
    { pos: [3.0, -0.4, 0], label: "04 Governed Agent", sub: "LangGraph HITL Checkpoint", color: "#6366F1" }
  ];

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#FFFFFF" />
      <pointLight position={[-5, 5, -5]} intensity={1.2} color="#0284C7" />
      <pointLight position={[5, -5, 5]} intensity={1.0} color="#38BDF8" />

      <ConnectingBeam start={nodes[0].pos} end={nodes[1].pos} color="#10B981" />
      <ConnectingBeam start={nodes[1].pos} end={nodes[2].pos} color="#0284C7" />
      <ConnectingBeam start={nodes[2].pos} end={nodes[3].pos} color="#6366F1" />

      {nodes.map((n, idx) => (
        <ArchitectureNode
          key={idx}
          position={n.pos}
          label={n.label}
          sub={n.sub}
          color={n.color}
          isActive={selectedNode === idx}
          onClick={() => setSelectedNode(idx)}
        />
      ))}

      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 2.5} />
    </>
  );
}

export default function Interactive3DArchitectureCanvas() {
  const [selectedNode, setSelectedNode] = useState<number>(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const nodeDetails = [
    {
      title: "Layer 01 · Structural AST Layout & Ingestion",
      headline: "Lossless Proposition Chunking for Dirty Enterprise Documents",
      description: "Parses complex multi-column PDFs, nested financial tables, and legal schedules without cutting numbers or clauses across token boundaries. Generates cryptographic SHA-256 provenance hashes for every chunk.",
      specs: [{ k: "Token Loss", v: "0.0%" }, { k: "Table Accuracy", v: "100%" }, { k: "Provenance", v: "SHA-256 Stamp" }]
    },
    {
      title: "Layer 02 · Dual-Channel Hybrid Retrieval",
      headline: "Parallel Lucene BM25 Lexical + Qdrant Dense Vector HNSW",
      description: "Dual-stream retrieval catches statutory contract identifiers, FAA serial numbers, and exact technical codes while capturing conceptual semantic intent in parallel.",
      specs: [{ k: "P99 SLA", v: "< 118ms" }, { k: "RRF k-Factor", v: "60" }, { k: "ANN Accuracy", v: "99.4%" }]
    },
    {
      title: "Layer 03 · Reciprocal Rank Fusion & Cross-Encoder",
      headline: "Neural Pairwise Re-Scoring and Noise Pruning",
      description: "Reciprocal Rank Fusion (k=60) mathematically harmonizes sparse and dense result sets before BGE-reranker evaluates query-document pairs, rejecting hallucination-inducing noise.",
      specs: [{ k: "Candidates", v: "50 -> 5 Reranked" }, { k: "Cross-Encoder", v: "BGE-Large" }, { k: "Noise Rejection", v: "94.2%" }]
    },
    {
      title: "Layer 04 · Deterministic Agent Execution & HITL Gate",
      headline: "LangGraph StateGraph DAG with Human Sign-Off Consoles",
      description: "Constrained cyclical execution graphs with Postgres WAL persistence. State-changing mutations (ERP writes, email dispatch, disbursements) pause automatically for human 1-click authorization.",
      specs: [{ k: "Runaway Loops", v: "0 (Guaranteed)" }, { k: "Approval Gate", v: "Dual-Key HITL" }, { k: "Rollback", v: "Saga Pattern" }]
    }
  ];

  const current = nodeDetails[selectedNode];

  return (
    <div className="w-full bg-[#0A101D] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative text-white">
      
      {/* Top Console Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <span className="font-bold text-slate-200">INTERACTIVE 3D SYSTEM ARCHITECTURE</span>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span>Click nodes or drag canvas to inspect spatial topology</span>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div className="relative h-[340px] sm:h-[400px] w-full bg-gradient-to-b from-[#0A101D] via-[#0D1527] to-[#0A101D]">
        {isClient ? (
          <Canvas camera={{ position: [0, 0, 6.2], fov: 45 }}>
            <Scene selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
          </Canvas>
        ) : (
          <div className="flex items-center justify-center h-full text-xs font-mono text-slate-500">
            Initializing WebGL 3D System Topology...
          </div>
        )}

        {/* Floating Quick Selector Bar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-950/80 border border-slate-800 backdrop-blur-md z-10 font-mono text-[11px]">
          {["01 Ingest", "02 Search", "03 RRF", "04 Agent"].map((name, i) => (
            <button
              key={i}
              onClick={() => setSelectedNode(i)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedNode === i 
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Component Telemetry HUD */}
      <div className="p-6 sm:p-8 bg-slate-900/90 border-t border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="font-mono text-[11px] text-cyan-400 uppercase tracking-wider font-semibold mb-1">
              {current.title}
            </div>
            <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 font-sans">
              {current.headline}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans font-normal">
              {current.description}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 font-mono shrink-0">
            {current.specs.map((s, idx) => (
              <div key={idx} className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center min-w-[100px]">
                <div className="text-[10px] text-slate-400 uppercase">{s.k}</div>
                <div className="text-sm font-bold text-cyan-300 mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
