"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function WaveField() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 3000;

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
      spd[i] = 0.2 + Math.random() * 0.8;
    }
    return { positions: pos, speeds: spd };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const speed = speeds[i];
      // Wave motion
      posArray[i3 + 1] += Math.sin(time * speed + posArray[i3] * 0.3) * 0.003;
      // Drift forward slowly
      posArray[i3 + 2] += 0.008 * speed;
      // Reset when too far
      if (posArray[i3 + 2] > 5) {
        posArray[i3 + 2] = -8;
        posArray[i3] = (Math.random() - 0.5) * 20;
        posArray[i3 + 1] = (Math.random() - 0.5) * 12;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = Math.sin(time * 0.05) * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00A2FF"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function EnergyRings() {
  const groupRef = useRef<THREE.Group>(null);

  const rings = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const geometry = new THREE.RingGeometry(1.5 + i * 0.8, 1.55 + i * 0.8, 64);
      return { geometry, offset: i * 1.2 };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.3 + 0.5;
    groupRef.current.rotation.z = time * 0.08;
    groupRef.current.children.forEach((child, i) => {
      child.rotation.z = time * (0.1 + i * 0.05);
      const scale = 1 + Math.sin(time * 0.5 + i) * 0.15;
      child.scale.set(scale, scale, 1);
    });
  });

  return (
    <group ref={groupRef} position={[2, 0, -4]}>
      {rings.map((ring, i) => (
        <mesh key={i} geometry={ring.geometry}>
          <meshBasicMaterial
            color="#00A2FF"
            transparent
            opacity={0.15 - i * 0.02}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function ConnectedNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  const { nodePositions, linePositions } = useMemo(() => {
    const nodeCount = 40;
    const nodes = new Float32Array(nodeCount * 3);
    const lines: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes[i * 3] = (Math.random() - 0.5) * 14;
      nodes[i * 3 + 1] = (Math.random() - 0.5) * 9;
      nodes[i * 3 + 2] = (Math.random() - 0.5) * 6 - 5;
    }

    // Connect nearby nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodes[i * 3] - nodes[j * 3];
        const dy = nodes[i * 3 + 1] - nodes[j * 3 + 1];
        const dz = nodes[i * 3 + 2] - nodes[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 4) {
          lines.push(
            nodes[i * 3], nodes[i * 3 + 1], nodes[i * 3 + 2],
            nodes[j * 3], nodes[j * 3 + 1], nodes[j * 3 + 2]
          );
        }
      }
    }

    return { nodePositions: nodes, linePositions: new Float32Array(lines) };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#4FBFFF"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connections */}
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00A2FF"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

function DataStream() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = -2 + Math.random() * -5;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= 0.06;
      if (arr[i * 3 + 1] < -10) {
        arr[i * 3 + 1] = 10;
        arr[i * 3] = (Math.random() - 0.5) * 0.5;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group position={[-5, 0, 0]}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#87CEFF"
          transparent
          opacity={0.5}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-2]" style={{ background: "#03060F" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: "#03060F" }}
      >
        <WaveField />
        <EnergyRings />
        <ConnectedNodes />
        <DataStream />
      </Canvas>
      {/* Gradient overlay to ensure readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(0,162,255,0.06) 0%, transparent 50%),
            linear-gradient(180deg, rgba(3,6,15,0.3) 0%, rgba(3,6,15,0.7) 50%, rgba(3,6,15,0.4) 100%)
          `,
        }}
      />
    </div>
  );
}
