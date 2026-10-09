import React from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface RainReserveProps {
  currentLevel: number;
  capacity: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export const RainReserve: React.FC<RainReserveProps> = ({
  currentLevel,
  capacity,
  isSelected = false,
  onClick,
}) => {
  const fillRatio = Math.max(0.1, currentLevel / capacity);

  return (
    <group position={[-5, 0, -11]} onClick={(e) => { e.stopPropagation(); onClick?.(); }}>
      {/* Stone / Concrete Catchment Basin Enclosure */}
      <mesh position={[0, 0.4, 0]} receiveShadow>
        <boxGeometry args={[3.6, 0.8, 3.6]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>

      {/* Internal Treated Rainwater Water Plane */}
      <mesh position={[0, 0.3 + fillRatio * 0.45, 0]}>
        <boxGeometry args={[3.2, 0.1, 3.2]} />
        <meshStandardMaterial 
          color="#38bdf8" 
          roughness={0.1} 
          metalness={0.2} 
          transparent 
          opacity={0.85} 
          emissive="#0284c7"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Aeration / Filtration Pump Station Unit */}
      <mesh position={[1.4, 0.9, 1.4]} castShadow>
        <boxGeometry args={[0.7, 0.8, 0.7]} />
        <meshStandardMaterial color="#0f766e" />
      </mesh>

      {/* Floating 3D Label */}
      <Html position={[0, 1.8, 0]} center distanceFactor={22} className="pointer-events-none select-none">
        <div className="bg-[#030d1e]/90 backdrop-blur-md px-2.5 py-1 rounded border border-sky-500/40 font-mono text-[9px] text-sky-300 text-center shadow-md">
          <div className="font-bold">RAINWATER RESERVE</div>
          <div>{currentLevel.toLocaleString()} / {capacity.toLocaleString()} L</div>
        </div>
      </Html>
    </group>
  );
};
