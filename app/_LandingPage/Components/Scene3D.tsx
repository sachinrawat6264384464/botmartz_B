"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Float, MeshDistortMaterial, PerspectiveCamera, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, DepthOfField, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

const THEME = {
  glow: "#A7EBF2",
  primary: "#54ACBF",
  secondary: "#26658C",
  void: "#011C40",
};

// Camera Rig with Enhanced Cinematics
function CameraRig({ isEntered, onAnimationComplete }) {
  const { camera } = useThree();
  const timeRef = useRef(0);
  const hasCompletedRef = useRef(false);

  useFrame((state, delta) => {
    if (!isEntered) {
      // Idle state - gentle orbit
      camera.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 5;
      camera.position.y = Math.cos(state.clock.elapsedTime * 0.15) * 3;
      camera.position.z = 35;
      camera.lookAt(0, 0, 0);
    } else if (!hasCompletedRef.current) {
      timeRef.current += delta;
      const t = timeRef.current;

      // Phase 1: Pull back (0-1s)
      if (t < 1) {
        const progress = t / 1;
        camera.position.z = 35 + progress * 15; // Move to z=50
      }
      // Phase 2: Hyper-speed rush (1-2.5s)
      else if (t < 2.5) {
        const progress = (t - 1) / 1.5;
        const eased = 1 - Math.pow(1 - progress, 4); // Ease out quart
        camera.position.z = 50 - eased * 65; // Rush to z=-15
        camera.position.x = eased * 2;
      }
      // Phase 3: Dramatic swing and settle (2.5-5s)
      else if (t < 5) {
        const progress = (t - 2.5) / 2.5;
        const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        
        camera.position.x = 2 - eased * 14; // Move to x=-12
        camera.position.y = Math.sin(progress * Math.PI) * 3; // Arc motion
        camera.position.z = -15 + eased * 33; // Settle to z=18
        
        const targetRotation = -0.3;
        camera.rotation.y = eased * targetRotation;
      }
      // Phase 4: Complete
      else {
        hasCompletedRef.current = true;
        onAnimationComplete();
      }

      camera.lookAt(0, 0, 0);
    } else {
      // Final position with subtle breathing
      const breath = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      camera.position.x = -12 + breath;
      camera.position.y = breath * 0.5;
      camera.position.z = 18;
      camera.rotation.y = -0.3;
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

// Particle Galaxy
function ParticleGalaxy({ isEntered }) {
  const pointsRef = useRef();
  const count = 12000;
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    const color1 = new THREE.Color(THEME.glow);
    const color2 = new THREE.Color(THEME.primary);
    const color3 = new THREE.Color(THEME.secondary);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Create spiral galaxy shape
      const radius = Math.random() * 20;
      const spinAngle = radius * 0.5;
      const branchAngle = ((i % 6) / 6) * Math.PI * 2;
      
      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 3;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 3;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 3;
      
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
      
      // Color mixing based on distance
      const mixRatio = radius / 20;
      const color = color1.clone().lerp(color2, mixRatio).lerp(color3, Math.random() * 0.3);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      sizes[i] = Math.random() * 2 + 0.5;
    }
    
    return { positions, colors, sizes };
  }, []);
  
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.elapsedTime;
    const positions = pointsRef.current.geometry.attributes.position.array;
    
    // Animate particles
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const z = positions[i3 + 2];
      const angle = Math.atan2(z, x);
      const radius = Math.sqrt(x * x + z * z);
      
      // Wave effect
      positions[i3 + 1] += Math.sin(time * 2 + radius * 0.5 + angle * 3) * 0.01;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotation
    if (isEntered) {
      pointsRef.current.rotation.y = time * 0.15;
      pointsRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    } else {
      pointsRef.current.rotation.y = time * 0.05;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Energy Rings
function EnergyRings({ isEntered }) {
  const ringsRef = useRef([]);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    ringsRef.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.x = time * 0.3 * (i % 2 === 0 ? 1 : -1) + i;
        ring.rotation.y = time * 0.2;
        ring.rotation.z = time * 0.15 * (i % 2 === 0 ? -1 : 1);
        
        const scale = 1 + Math.sin(time * 2 + i * 0.5) * 0.15;
        ring.scale.setScalar(scale);
        
        if (isEntered) {
          ring.material.opacity = 0.4 + Math.sin(time * 3 + i) * 0.2;
        }
      }
    });
  });
  
  const rings = [
    { radius: 6, tube: 0.08, color: THEME.glow },
    { radius: 9, tube: 0.12, color: THEME.primary },
    { radius: 12, tube: 0.1, color: THEME.secondary },
    { radius: 15, tube: 0.08, color: THEME.glow },
  ];
  
  return (
    <>
      {rings.map((ring, i) => (
        <mesh
          key={i}
          ref={(el) => (ringsRef.current[i] = el)}
          position={[0, 0, 0]}
        >
          <torusGeometry args={[ring.radius, ring.tube, 16, 100]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={0.3}
            wireframe
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </>
  );
}

// Central Core Sphere
function CoreSphere({ isEntered }) {
  const meshRef = useRef();
  const glowRef = useRef();
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
    
    const pulse = 1 + Math.sin(time * 2) * 0.2;
    meshRef.current.scale.setScalar(pulse);
    
    if (glowRef.current) {
      glowRef.current.scale.setScalar(pulse * 1.5);
      glowRef.current.material.opacity = 0.2 + Math.sin(time * 3) * 0.1;
    }
  });
  
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <group>
        {/* Outer glow */}
        <mesh ref={glowRef}>
          <icosahedronGeometry args={[3.5, 2]} />
          <meshBasicMaterial
            color={THEME.glow}
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        
        {/* Core */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2.5, 4]} />
          <MeshDistortMaterial
            color={THEME.primary}
            emissive={THEME.glow}
            emissiveIntensity={0.8}
            distort={0.3}
            speed={2}
            transparent
            opacity={0.9}
            wireframe
          />
        </mesh>
        
        {/* Inner core */}
        <mesh>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial
            color={THEME.glow}
            transparent
            opacity={0.6}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Data Streams
function DataStreams({ isEntered }) {
  const streamsRef = useRef([]);
  
  const streams = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      angle: (i / 40) * Math.PI * 2,
      radius: 18 + (i % 3) * 4,
      speed: 0.3 + Math.random() * 0.5,
      offset: Math.random() * 100,
      color: i % 3 === 0 ? THEME.glow : i % 3 === 1 ? THEME.primary : THEME.secondary
    }));
  }, []);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    streamsRef.current.forEach((stream, i) => {
      if (stream) {
        const config = streams[i];
        const t = (time * config.speed + config.offset) % 100;
        const progress = t / 100;
        
        const currentRadius = config.radius * (1 - progress * 0.3);
        stream.position.x = Math.cos(config.angle) * currentRadius;
        stream.position.z = Math.sin(config.angle) * currentRadius;
        stream.position.y = (progress - 0.5) * 30;
        
        stream.material.opacity = Math.sin(progress * Math.PI) * 0.6;
        
        if (isEntered) {
          stream.rotation.y += 0.1;
        }
      }
    });
  });
  
  return (
    <>
      {streams.map((config, i) => (
        <mesh
          key={config.id}
          ref={(el) => (streamsRef.current[i] = el)}
        >
          <boxGeometry args={[0.1, 0.8, 0.1]} />
          <meshBasicMaterial
            color={config.color}
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </>
  );
}

// Ambient Particles
function AmbientParticles() {
  return (
    <>
      <Sparkles
        count={200}
        scale={[50, 50, 50]}
        size={2}
        speed={0.3}
        color={THEME.glow}
        opacity={0.6}
      />
      <Sparkles
        count={150}
        scale={[40, 40, 40]}
        size={3}
        speed={0.2}
        color={THEME.primary}
        opacity={0.4}
      />
    </>
  );
}

// Main Scene Component
export default function Scene3D({ isEntered, onAnimationComplete }) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
      >
        <color attach="background" args={[THEME.void]} />
        <fog attach="fog" args={[THEME.void, 20, 60]} />
        
        <PerspectiveCamera makeDefault position={[0, 0, 35]} fov={60} />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={2} color={THEME.glow} distance={30} />
        <pointLight position={[10, 10, 10]} intensity={1} color={THEME.primary} />
        <pointLight position={[-10, -10, 10]} intensity={1} color={THEME.secondary} />
        
        {/* 3D Elements */}
        <ParticleGalaxy isEntered={isEntered} />
        <EnergyRings isEntered={isEntered} />
        <CoreSphere isEntered={isEntered} />
        <DataStreams isEntered={isEntered} />
        <AmbientParticles />
        
        <CameraRig isEntered={isEntered} onAnimationComplete={onAnimationComplete} />
        
        {/* Post Processing */}
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            radius={0.8}
          />
          <ChromaticAberration
            offset={[0.001, 0.001]}
          />
          <DepthOfField
            focusDistance={0.02}
            focalLength={0.05}
            bokehScale={3}
          />
          <Vignette
            offset={0.3}
            darkness={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}