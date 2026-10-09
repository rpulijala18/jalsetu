import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Grid } from '@react-three/drei';
import * as THREE from 'three';

const TankerModel: React.FC = () => {
  const meshRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.8) * 4;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0.4, 4]}>
      {/* Tanker body */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 2.2, 16]} />
        <meshStandardMaterial color="#00f2fe" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Tanker cabin */}
      <mesh position={[1.4, 0.3, 0]}>
        <boxGeometry args={[0.8, 0.7, 0.8]} />
        <meshStandardMaterial color="#0284c7" roughness={0.4} />
      </mesh>
    </group>
  );
};

const RotatingCommunity: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const waterRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    if (waterRef.current) {
      const scale = 0.6 + Math.sin(state.clock.elapsedTime * 1.5) * 0.04;
      waterRef.current.scale.set(1, scale, 1);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Water Tank */}
      <group position={[0, 0, 0]}>
        {/* Support structure */}
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[1.5, 1.6, 2.4, 32]} />
          <meshStandardMaterial color="#1e293b" wireframe={false} roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Transparent glass cylinder */}
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[1.52, 1.52, 2.4, 32]} />
          <meshPhysicalMaterial 
            color="#00f2fe" 
            transparent 
            opacity={0.3} 
            roughness={0.1} 
            transmission={0.6} 
            thickness={0.5} 
          />
        </mesh>
        {/* Water inside tank */}
        <mesh ref={waterRef} position={[0, 0.6, 0]}>
          <cylinderGeometry args={[1.4, 1.4, 1.6, 32]} />
          <meshStandardMaterial 
            color="#00d2ff" 
            emissive="#0077aa" 
            emissiveIntensity={0.6} 
            roughness={0.1} 
          />
        </mesh>
        {/* Base and roof caps */}
        <mesh position={[0, 2.45, 0]}>
          <cylinderGeometry args={[1.6, 1.6, 0.2, 32]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>
      </group>

      {/* Hospital */}
      <group position={[-5, 0, -4]}>
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[3, 3, 2.5]} />
          <meshStandardMaterial color="#0f2b3e" roughness={0.3} />
        </mesh>
        {/* Hospital Red Cross symbol */}
        <mesh position={[0, 2.6, 1.3]}>
          <boxGeometry args={[0.8, 0.25, 0.05]} />
          <meshStandardMaterial color="#ef4444" emissive="#ff2233" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0, 2.6, 1.3]}>
          <boxGeometry args={[0.25, 0.8, 0.05]} />
          <meshStandardMaterial color="#ef4444" emissive="#ff2233" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* School */}
      <group position={[5, 0, -4]}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[3.2, 2, 2]} />
          <meshStandardMaterial color="#16324f" roughness={0.4} />
        </mesh>
        <mesh position={[0, 2.2, 0]}>
          <coneGeometry args={[2, 0.8, 4]} />
          <meshStandardMaterial color="#0284c7" />
        </mesh>
      </group>

      {/* Residential Zone A */}
      <group position={[-5, 0, 4]}>
        <mesh position={[-0.8, 1.2, 0]}>
          <boxGeometry args={[1.5, 2.4, 1.5]} />
          <meshStandardMaterial color="#1e3a5f" />
        </mesh>
        <mesh position={[0.8, 0.9, 0]}>
          <boxGeometry args={[1.4, 1.8, 1.4]} />
          <meshStandardMaterial color="#162e4d" />
        </mesh>
      </group>

      {/* Residential Zone B */}
      <group position={[0, 0, 5.5]}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[2.5, 2, 1.6]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      </group>

      {/* Residential Zone C */}
      <group position={[5, 0, 4]}>
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[2, 2.2, 1.8]} />
          <meshStandardMaterial color="#132a4a" />
        </mesh>
      </group>

      {/* Rainwater Reserve */}
      <group position={[-2, 0, -5]}>
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.8, 0.8, 1.8]} />
          <meshStandardMaterial color="#0d233a" />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[1.6, 0.4, 1.6]} />
          <meshStandardMaterial color="#00f2fe" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Moving Emergency Tanker */}
      <TankerModel />

      {/* Ground & Grid */}
      <Grid 
        args={[24, 24]} 
        cellSize={1} 
        cellThickness={0.7} 
        cellColor="#00f2fe" 
        sectionSize={3} 
        sectionThickness={1.2} 
        sectionColor="#0ea5e9" 
        fadeDistance={25} 
        fadeStrength={1.5}
        position={[0, -0.01, 0]} 
      />

      {/* Hologram base ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[8.8, 9, 64]} />
        <meshBasicMaterial color="#00f2fe" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

export const HeroCanvasPreview: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[460px] relative">
      <Canvas
        camera={{ position: [14, 12, 14], fov: 42 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 15]} intensity={1.5} color="#e0f2fe" />
        <pointLight position={[-10, 8, -10]} intensity={1.2} color="#00f2fe" />
        <pointLight position={[0, 4, 0]} intensity={2.0} color="#38bdf8" distance={15} />

        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
          <RotatingCommunity />
        </Float>

        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>

      {/* Cyber overlay indicators */}
      <div className="absolute top-4 left-4 pointer-events-none font-mono text-[11px] text-cyan-400 bg-black/60 px-2.5 py-1.5 rounded border border-cyan-500/30 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        DIGITAL TWIN LIVE TELEMETRY: 60 FPS
      </div>
      <div className="absolute bottom-4 right-4 pointer-events-none font-mono text-[11px] text-slate-400 bg-black/60 px-2.5 py-1.5 rounded border border-slate-700/50">
        Lakshmi Nagar Mesh • 30,000 L Reservoir
      </div>
    </div>
  );
};
