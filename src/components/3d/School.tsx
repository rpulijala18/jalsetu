import React from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ZoneData } from '../../types/simulation';

interface SchoolProps {
  data: ZoneData;
  isSelected?: boolean;
  onClick?: () => void;
}

export const School: React.FC<SchoolProps> = ({
  data,
  isSelected = false,
  onClick,
}) => {
  return (
    <group position={data.position} onClick={(e) => { e.stopPropagation(); onClick?.(); }}>
      {/* Main Classroom Block */}
      <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.8, 2.8, 3.4]} />
        <meshStandardMaterial color="#1a365d" roughness={0.5} />
      </mesh>

      {/* Slanted Roof Architectural Detail */}
      <mesh position={[0, 3.2, 0]}>
        <coneGeometry args={[3.2, 0.9, 4]} />
        <meshStandardMaterial color="#0284c7" roughness={0.3} />
      </mesh>

      {/* School Assembly / Playground Ground */}
      <mesh position={[0, 0.05, 3.2]} receiveShadow>
        <boxGeometry args={[4.8, 0.08, 2.6]} />
        <meshStandardMaterial color="#064e3b" roughness={0.8} />
      </mesh>

      {/* Playground Football Goalpost detail */}
      <mesh position={[0, 0.4, 4.2]}>
        <torusGeometry args={[0.5, 0.04, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>

      {/* Flagpole */}
      <mesh position={[-2.0, 1.8, 2.6]}>
        <cylinderGeometry args={[0.04, 0.04, 3.6, 8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} />
      </mesh>

      {/* Selection outline */}
      {isSelected && (
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.8, 4.1, 32]} />
          <meshBasicMaterial color="#00f2fe" side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Floating 3D Label */}
      <Html position={[0, 4.4, 0]} center distanceFactor={22} className="pointer-events-none select-none">
        <div className="bg-[#030d1e]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/40 text-center font-mono shadow-glow-cyan/20">
          <div className="text-[10px] font-bold text-sky-300 font-display tracking-wider">
            {data.name.toUpperCase()}
          </div>
          <div className="text-[10px] text-slate-300">
            Demand: {data.demandLiters.toLocaleString()} L • {data.population} Students
          </div>
        </div>
      </Html>
    </group>
  );
};
