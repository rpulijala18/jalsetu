import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface WaterTankProps {
  capacity: number;
  currentLevel: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export const WaterTank: React.FC<WaterTankProps> = ({
  capacity,
  currentLevel,
  isSelected = false,
  onClick,
}) => {
  const waterRef = useRef<THREE.Mesh>(null);
  const fillRatio = Math.max(0.05, Math.min(1.0, currentLevel / capacity));

  // Gently pulse water emissive glow
  useFrame((state) => {
    if (waterRef.current) {
      const wobble = Math.sin(state.clock.elapsedTime * 2.0) * 0.02;
      waterRef.current.scale.set(1 + wobble, fillRatio, 1 + wobble);
      waterRef.current.position.y = (fillRatio * 3.6) / 2;
    }
  });

  return (
    <group position={[0, 0, 0]} onClick={(e) => { e.stopPropagation(); onClick?.(); }}>
      {/* Concrete Foundation Base */}
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <cylinderGeometry args={[3.2, 3.4, 0.4, 32]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Structural Support Legs (4 Pillars) */}
      {[
        [-2.0, -2.0],
        [2.0, -2.0],
        [-2.0, 2.0],
        [2.0, 2.0],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.8, z]} castShadow>
          <cylinderGeometry args={[0.2, 0.25, 1.2, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* Outer Acrylic Tank Shell (Transparent Glass Cylinder) */}
      <mesh position={[0, 2.6, 0]}>
        <cylinderGeometry args={[2.8, 2.8, 3.6, 32]} />
        <meshPhysicalMaterial 
          color="#38bdf8"
          transparent
          opacity={0.25}
          roughness={0.1}
          metalness={0.1}
          transmission={0.8}
          thickness={0.8}
        />
      </mesh>

      {/* Internal Water Volume (Visibly Changes Height with Level) */}
      <mesh ref={waterRef} position={[0, 1.8, 0]}>
        <cylinderGeometry args={[2.72, 2.72, 3.6, 32]} />
        <meshStandardMaterial 
          color={currentLevel < 9000 ? '#ef4444' : currentLevel < 15000 ? '#f59e0b' : '#00e1ff'}
          emissive={currentLevel < 9000 ? '#991b1b' : currentLevel < 15000 ? '#b45309' : '#0284c7'}
          emissiveIntensity={0.6}
          roughness={0.2}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Tank Top Cap & Maintenance Dome */}
      <mesh position={[0, 4.45, 0]}>
        <cylinderGeometry args={[2.9, 2.8, 0.2, 32]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.8} />
      </mesh>
      <mesh position={[0, 4.7, 0]}>
        <sphereGeometry args={[0.9, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>

      {/* Selection Highlight Ring */}
      {isSelected && (
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.6, 3.9, 32]} />
          <meshBasicMaterial color="#00f2fe" side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* 3D Label & Live Capacity Tag */}
      <Html position={[0, 5.4, 0]} center distanceFactor={22} className="pointer-events-none select-none">
        <div className="bg-[#030814]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/40 text-center font-mono shadow-glow-cyan/30">
          <div className="text-[11px] font-bold text-cyan-300 font-display tracking-wider">
            CENTRAL WATER TANK
          </div>
          <div className="text-xs font-black text-white">
            {currentLevel.toLocaleString()} / {capacity.toLocaleString()} L
          </div>
          <div className="text-[9px] text-slate-400">
            {Math.round((currentLevel / capacity) * 100)}% Available
          </div>
        </div>
      </Html>
    </group>
  );
};
