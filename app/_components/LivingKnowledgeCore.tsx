"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

export type CoreStage = "fragmented" | "connected" | "retrieval" | "verification" | "action";

interface LivingKnowledgeCoreProps {
  currentStage?: CoreStage;
  onStageChange?: (stage: CoreStage) => void;
  interactive?: boolean;
}

const STAGE_CONFIGS: Record<CoreStage, {
  label: string;
  badge: string;
  desc: string;
  docSpread: number;
  lineOpacity: number;
  coreGlow: number;
  highlightSignal: boolean;
  actionActive: boolean;
}> = {
  fragmented: {
    label: "01 / Fragmented Knowledge",
    badge: "SILOED DOCUMENTS",
    desc: "Business knowledge begins scattered across disconnected PDFs, SQL databases, and internal systems.",
    docSpread: 2.8,
    lineOpacity: 0.05,
    coreGlow: 0.2,
    highlightSignal: false,
    actionActive: false,
  },
  connected: {
    label: "02 / Connected Information",
    badge: "UNIFIED TOPOLOGY",
    desc: "Ingestion and layout parsing establish semantic relationships and access boundaries between document clusters.",
    docSpread: 1.8,
    lineOpacity: 0.45,
    coreGlow: 0.5,
    highlightSignal: false,
    actionActive: false,
  },
  retrieval: {
    label: "03 / Hybrid Retrieval",
    badge: "DENSE + BM25 QUERY",
    desc: "A query signal traverses the manifold, retrieving top candidate passages via hybrid vector and lexical matching.",
    docSpread: 1.4,
    lineOpacity: 0.75,
    coreGlow: 0.9,
    highlightSignal: true,
    actionActive: false,
  },
  verification: {
    label: "04 / Cross-Attention Verification",
    badge: "CALIBRATED EVIDENCE",
    desc: "Cross-encoder scoring aligns exact token-level evidence; hallucinated and unsupported branches are pruned.",
    docSpread: 1.2,
    lineOpacity: 0.85,
    coreGlow: 1.0,
    highlightSignal: true,
    actionActive: false,
  },
  action: {
    label: "05 / Controlled Action",
    badge: "GOVERNED EXECUTION",
    desc: "Verified knowledge flows through human-in-the-loop gates into production ERP, CRM, and API systems.",
    docSpread: 1.1,
    lineOpacity: 0.9,
    coreGlow: 1.1,
    highlightSignal: true,
    actionActive: true,
  },
};

export default function LivingKnowledgeCore({
  currentStage = "retrieval",
  onStageChange,
  interactive = true,
}: LivingKnowledgeCoreProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<CoreStage>(currentStage);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setActiveStage(currentStage);
  }, [currentStage]);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mq.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mq.addEventListener("change", listener);
      return () => mq.removeEventListener("change", listener);
    }
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (e) {
      console.warn("WebGL not available, falling back to CSS schematic.", e);
      return;
    }

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 420;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 5.2);
    camera.lookAt(0, 0, 0);

    // Lighting: Studio Precision
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00B8F0, 1.4);
    dirLight1.position.set(4, 5, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x0066FF, 1.2);
    dirLight2.position.set(-4, -2, -3);
    scene.add(dirLight2);

    // Group for entire core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Create Floating Document-like Planes
    const docPlanes: THREE.Mesh[] = [];
    const docPositions: { x: number; y: number; z: number; rotX: number; rotY: number }[] = [
      { x: -1.4, y: 0.8, z: 0.5, rotX: 0.2, rotY: 0.4 },
      { x: 1.5, y: 0.9, z: -0.4, rotX: -0.3, rotY: -0.5 },
      { x: -1.2, y: -0.7, z: -0.6, rotX: 0.4, rotY: 0.2 },
      { x: 1.3, y: -0.8, z: 0.6, rotX: -0.2, rotY: -0.3 },
      { x: 0.2, y: 1.3, z: -0.8, rotX: 0.5, rotY: 0.1 },
      { x: -0.3, y: -1.2, z: 0.8, rotX: -0.4, rotY: 0.3 },
    ];

    const planeGeom = new THREE.PlaneGeometry(0.85, 0.6);
    const planeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.6,
      ior: 1.4,
      side: THREE.DoubleSide,
    });

    const borderMaterial = new THREE.LineBasicMaterial({
      color: 0x0092D7,
      transparent: true,
      opacity: 0.6,
    });

    docPositions.forEach((pos) => {
      const mesh = new THREE.Mesh(planeGeom, planeMaterial);
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.rotation.set(pos.rotX, pos.rotY, 0);

      // Add architectural wireframe border
      const edges = new THREE.EdgesGeometry(planeGeom);
      const line = new THREE.LineSegments(edges, borderMaterial);
      mesh.add(line);

      coreGroup.add(mesh);
      docPlanes.push(mesh);
    });

    // 2. Central Layered Hybrid Retrieval Core
    const layerGeom = new THREE.BoxGeometry(1.2, 0.08, 1.2);
    const layerMat1 = new THREE.MeshStandardMaterial({
      color: 0x0B1C2C,
      roughness: 0.3,
      metalness: 0.8,
    });
    const layerMat2 = new THREE.MeshStandardMaterial({
      color: 0x0092D7,
      roughness: 0.2,
      metalness: 0.5,
    });
    const layerMat3 = new THREE.MeshStandardMaterial({
      color: 0x00B8F0,
      emissive: 0x00B8F0,
      emissiveIntensity: 0.4,
      roughness: 0.1,
    });

    const layer1 = new THREE.Mesh(layerGeom, layerMat1);
    layer1.position.y = -0.15;
    const layer2 = new THREE.Mesh(layerGeom, layerMat2);
    layer2.position.y = 0.0;
    const layer3 = new THREE.Mesh(layerGeom, layerMat3);
    layer3.position.y = 0.15;

    const centerStructure = new THREE.Group();
    centerStructure.add(layer1);
    centerStructure.add(layer2);
    centerStructure.add(layer3);
    coreGroup.add(centerStructure);

    // 3. Evidence Pulse Ring
    const ringGeom = new THREE.TorusGeometry(1.6, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00E5FF,
      transparent: true,
      opacity: 0.5,
    });
    const evidenceRing = new THREE.Mesh(ringGeom, ringMat);
    evidenceRing.rotation.x = Math.PI / 2.3;
    coreGroup.add(evidenceRing);

    // 4. Graph Connection Lines (Points & Lines)
    const lineCoords: number[] = [];
    docPositions.forEach((pos) => {
      lineCoords.push(pos.x, pos.y, pos.z);
      lineCoords.push(0, 0, 0);
    });
    const lineGeom = new THREE.BufferGeometry();
    lineGeom.setAttribute("position", new THREE.Float32BufferAttribute(lineCoords, 3));
    const linesMat = new THREE.LineBasicMaterial({
      color: 0x8EC2E6,
      transparent: true,
      opacity: 0.4,
    });
    const connectionLines = new THREE.LineSegments(lineGeom, linesMat);
    coreGroup.add(connectionLines);

    // Pointer Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
      targetRotationY = mouseX * 0.4;
      targetRotationX = -mouseY * 0.3;
    };

    if (interactive && !reducedMotion) {
      container.addEventListener("mousemove", handlePointerMove);
    }

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isPaused && !reducedMotion) {
        const delta = clock.getDelta();
        const time = clock.getElapsedTime();

        // Subtle idle rotation
        coreGroup.rotation.y += (targetRotationY - coreGroup.rotation.y) * 0.05 + 0.002;
        coreGroup.rotation.x += (targetRotationX - coreGroup.rotation.x) * 0.05;

        // Subtle document floating oscillation
        docPlanes.forEach((plane, i) => {
          plane.position.y += Math.sin(time * 1.5 + i) * 0.0008;
          plane.rotation.z = Math.sin(time * 0.8 + i) * 0.03;
        });

        // Pulse Ring Animation
        evidenceRing.rotation.z += 0.004;
        const pulse = 1 + Math.sin(time * 2.5) * 0.04;
        evidenceRing.scale.set(pulse, pulse, pulse);
      }

      renderer?.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (interactive && !reducedMotion) {
        container.removeEventListener("mousemove", handlePointerMove);
      }
      cancelAnimationFrame(animationFrameId);
      renderer?.dispose();
      planeGeom.dispose();
      planeMaterial.dispose();
      layerGeom.dispose();
      ringGeom.dispose();
      ringMat.dispose();
      if (container && renderer?.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeStage, isPaused, reducedMotion, interactive]);

  const config = STAGE_CONFIGS[activeStage];

  const handleStageSelect = (stage: CoreStage) => {
    setActiveStage(stage);
    if (onStageChange) onStageChange(stage);
  };

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#F0F6FB] via-[#F8FAFD] to-white border border-[#C9DCE9] p-6 sm:p-8 shadow-[0_12px_40px_rgba(11,28,44,0.06)] overflow-hidden">
      {/* Blueprint Grid Watermark */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'linear-gradient(#E2EBF2 1px, transparent 1px), linear-gradient(90deg, #E2EBF2 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#C9DCE9]/70 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00B8F0] shadow-[0_0_8px_#00B8F0] animate-pulse" />
          <span className="font-bold text-[#0B1C2C]">LIVING KNOWLEDGE CORE</span>
          <span className="text-slate-400">/</span>
          <span className="text-[#0678BE] font-semibold">{config.badge}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="px-2.5 py-1 rounded-md bg-white border border-[#C9DCE9] text-[11px] font-mono text-[#4B6175] hover:text-[#0B1C2C] transition-colors"
            aria-label={isPaused ? "Resume 3D rotation" : "Pause 3D rotation"}
          >
            {isPaused ? "▶ Resume" : "⏸ Pause"}
          </button>
          <span className="text-[11px] text-[#4B6175] bg-white px-2 py-1 rounded border border-[#C9DCE9]">
            p95: 42ms
          </span>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div 
        ref={mountRef} 
        className="relative z-10 w-full h-[360px] sm:h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {/* Accessible Fallback if WebGL fails */}
        <noscript>
          <div className="p-8 text-center text-sm font-mono text-slate-600">
            3D interactive schematic active. Enable WebGL for spatial perspective.
          </div>
        </noscript>
      </div>

      {/* Interactive 5-Stage Story Controller */}
      <div className="relative z-10 pt-4 border-t border-[#C9DCE9]/70">
        <div className="text-[11px] font-mono font-bold text-[#4B6175] uppercase tracking-wider mb-2.5">
          Story Stages — Explore the Transformation:
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
          {(Object.keys(STAGE_CONFIGS) as CoreStage[]).map((stage, idx) => {
            const isActive = activeStage === stage;
            return (
              <button
                key={stage}
                onClick={() => handleStageSelect(stage)}
                className={`px-3 py-2 rounded-xl text-left font-mono text-[11px] transition-all border ${
                  isActive
                    ? "bg-[#0B1C2C] text-white border-[#0B1C2C] shadow-md"
                    : "bg-white text-[#4B6175] border-[#C9DCE9] hover:border-[#0092D7] hover:text-[#0B1C2C]"
                }`}
              >
                <div className={`text-[10px] font-bold ${isActive ? "text-[#00B8F0]" : "text-slate-400"}`}>
                  0{idx + 1}
                </div>
                <div className="font-bold truncate capitalize">{stage}</div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Contextual Explanation for Selected Stage */}
        <div className="p-3.5 rounded-xl bg-white/90 border border-[#C9DCE9] flex items-start gap-3 shadow-sm">
          <div className="w-5 h-5 rounded-full bg-[#E5F3FC] text-[#0678BE] font-mono text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
            i
          </div>
          <div>
            <div className="text-xs font-bold font-mono text-[#0B1C2C] mb-0.5">
              {config.label}
            </div>
            <p className="text-xs text-[#4B6175] leading-relaxed m-0">
              {config.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
