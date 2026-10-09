import React from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ZoneData } from '../../types/simulation';

interface ResidentialZoneProps {
  data: ZoneData;
  isSelected?: boolean;
  onClick?: () => void;
}

export const ResidentialZone: React.FC<ResidentialZoneProps> = ({
  data,
  isSelected = false,
  onClick,
}) => {
  const isDeficit = data.status === 'CRITICAL' || data.deficitLiters > 0;
  const isWarning = data.status === 'WARNING';

  // Base building color palette based on health
  const baseColor = isDeficit ? '#45101a' : isWarning ? '#3d2909' : '#0f2438';
  const roofColor = isDeficit ? '#991b1b' : isWarning ? '#d97706' : '#0369a1';

  return (
    <group position={data.position} onClick={(e) => { e.stopPropagation(); onClick?.(); }}>
      {/* Cluster of realistic stylized residential apartments/houses */}
      {/* Building 1 (Tall apartment) */}
      <mesh position={[-1.2, 1.6, -0.8]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 3.2, 1.8]} />
        <meshStandardMaterial color={baseColor} roughness={0.4} />
      </mesh>
      <mesh position={[-1.2, 3.3, -0.8]}>
        <boxGeometry args={[1.9, 0.2, 1.9]} />
        <meshStandardMaterial color={roofColor} />
      </mesh>

      {/* Building 2 (Mid-rise block) */}
      <mesh position={[1.2, 1.2, -0.4]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 2.4, 1.6]} />
        <meshStandardMaterial color={baseColor} roughness={0.5} />
      </mesh>
      <mesh position={[1.2, 2.5, -0.4]}>
        <boxGeometry args={[2.1, 0.2, 1.7]} />
        <meshStandardMaterial color={roofColor} />
      </mesh>

      {/* Building 3 (Courtyard homes) */}
      <mesh position={[0, 0.9, 1.4]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.8, 1.4]} />
        <meshStandardMaterial color={baseColor} roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.9, 1.4]}>
        <coneGeometry args={[1.6, 0.6, 4]} />
        <meshStandardMaterial color={roofColor} />
      </mesh>

      {/* Overhead Rooftop Water Tanks (Common Indian urban detail!) */}
      <mesh position={[-1.2, 3.6, -0.8]}>
        <cylinderGeometry args={[0.3, 0.3, 0.4, 12]} />
        <meshStandardMaterial color="#0284c7" />
      </mesh>
      <mesh position={[1.2, 2.8, -0.4]}>
        <cylinderGeometry args={[0.25, 0.25, 0.35, 12]} />
        <meshStandardMaterial color="#0284c7" />
      </mesh>

      {/* Selection outline */}
      {isSelected && (
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.2, 3.5, 32]} />
          <meshBasicMaterial color="#00f2fe" side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* 3D Zone Status Tag */}
      <Html position={[0, 4.4, 0]} center distanceFactor={22} className="pointer-events-none select-none">
        <div className={`px-2.5 py-1 rounded-lg border font-mono text-center shadow-md backdrop-blur-md ${
          isDeficit 
            ? 'bg-red-950/90 border-red-500/60 text-red-200 shadow-glow-red/30' 
            : isWarning 
            ? 'bg-amber-950/90 border-amber-500/60 text-amber-200'
            : 'bg-[#030d1e]/90 border-cyan-500/40 text-cyan-200'
        }`}>
          <div className="text-[10px] font-bold font-display tracking-wider">
            {data.name}
          </div>
          <div className="text-[9px] text-slate-300">
            Pop: {data.population} • Demand: {data.demandLiters.toLocaleString()} L
          </div>
          {isDeficit && (
            <div className="text-[9px] text-red-400 font-bold animate-pulse">
              DEFICIT: -{data.deficitLiters.toLocaleString()} L
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};
