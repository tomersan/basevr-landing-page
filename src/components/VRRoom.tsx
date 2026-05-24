"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function RotatingRoom() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  const edges = useMemo(() => {
    // Create a room box
    const roomGeometry = new THREE.BoxGeometry(4, 2.5, 5);
    return new THREE.EdgesGeometry(roomGeometry);
  }, []);

  const furnitureEdges = useMemo(() => {
    const geometries: THREE.EdgesGeometry[] = [];
    // Sofa
    const sofa = new THREE.BoxGeometry(2, 0.6, 0.8);
    geometries.push(new THREE.EdgesGeometry(sofa));
    // Table
    const table = new THREE.BoxGeometry(1.2, 0.4, 0.6);
    geometries.push(new THREE.EdgesGeometry(table));
    // Shelf
    const shelf = new THREE.BoxGeometry(1.5, 1.2, 0.3);
    geometries.push(new THREE.EdgesGeometry(shelf));
    // Window
    const window1 = new THREE.BoxGeometry(1.5, 1.2, 0.05);
    geometries.push(new THREE.EdgesGeometry(window1));
    // Bed
    const bed = new THREE.BoxGeometry(1.6, 0.5, 2);
    geometries.push(new THREE.EdgesGeometry(bed));
    return geometries;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Room wireframe */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#00A2FF" transparent opacity={0.6} />
      </lineSegments>

      {/* Sofa */}
      <group position={[0, -0.95, -1.8]}>
        <lineSegments geometry={furnitureEdges[0]}>
          <lineBasicMaterial color="#4FBFFF" transparent opacity={0.4} />
        </lineSegments>
      </group>

      {/* Table */}
      <group position={[0, -1.05, -0.5]}>
        <lineSegments geometry={furnitureEdges[1]}>
          <lineBasicMaterial color="#4FBFFF" transparent opacity={0.35} />
        </lineSegments>
      </group>

      {/* Shelf */}
      <group position={[-1.7, 0, 0]}>
        <lineSegments geometry={furnitureEdges[2]}>
          <lineBasicMaterial color="#4FBFFF" transparent opacity={0.3} />
        </lineSegments>
      </group>

      {/* Window on far wall */}
      <group position={[0, 0.2, -2.47]}>
        <lineSegments geometry={furnitureEdges[3]}>
          <lineBasicMaterial color="#87CEFF" transparent opacity={0.5} />
        </lineSegments>
      </group>

      {/* Bed in corner */}
      <group position={[1.0, -1.0, 1.0]}>
        <lineSegments geometry={furnitureEdges[4]}>
          <lineBasicMaterial color="#4FBFFF" transparent opacity={0.3} />
        </lineSegments>
      </group>

      {/* Floor grid */}
      <gridHelper
        args={[4, 8, "#00A2FF", "#0066CC"]}
        position={[0, -1.25, 0]}
        rotation={[0, 0, 0]}
      />

      {/* Ambient particles */}
      <Particles />
    </group>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 100;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00A2FF"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function VRRoom() {
  return (
    <div className="absolute inset-0 opacity-70">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <RotatingRoom />
      </Canvas>
    </div>
  );
}
