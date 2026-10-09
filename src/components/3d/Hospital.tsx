import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ZoneData } from '../../types/simulation';

interface HospitalProps {
  data: ZoneData;
  isSelected?: boolean;
  onClick?: () => void;
}

export const Hospital: React.FC<HospitalProps> = ({
  data,
  isSelected = false,
  onClick,
}) => {
  const beaconRef = useRef<THREE.PointLight>(null);
  const isAlert = data.status === 'CRITICAL' || data.status === 'WARNING';

  useFrame((state) => {
    if (beaconRef.current && isAlert) {
      beaconRef.current.intensity = 1.0 + Math.sin(state.clock.elapsedTime * 6) * 0.8;
    }
  });

  return (
    <group position={data.position} onClick={(e) => { e.stopPropagation(); onClick?.(); }}>
      {/* Hospital Main Block */}
      <mesh position={[0, 2.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 4.0, 4.4]} />
        <meshStandardMaterial color="#0f263d" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Hospital Trauma & Surgery Wing */}
      <mesh position={[-2.8, 1.4, 0.4]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 2.8, 3.2]} />
        <meshStandardMaterial color="#133352" roughness={0.4} />
      </mesh>

      {/* Rooftop Helipad / Infrastructure Deck */}
      <mesh position={[0, 4.05, 0]}>
        <boxGeometry args={[4.6, 0.1, 3.8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.6} />
      </mesh>

      {/* Hospital Entrance Canopy */}
      <mesh position={[0, 0.8, 2.4]}>
        <boxGeometry args={[2.4, 0.15, 1.2]} />
        <meshStandardMaterial color="#38bdf8" />
      </mesh>

      {/* Red Cross Sign (Front Façade) */}
      <group position={[0, 3.0, 2.22]}>
        <mesh>
          <boxGeometry args={[1.2, 0.35, 0.08]} />
          <meshStandardMaterial color="#ef4444" emissive="#ff2233" emissiveIntensity={0.8} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.35, 1.2, 0.08]} />
          <meshStandardMaterial color="#ef4444" emissive="#ff2233" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* Emergency Beacon (Flashes if critical/warning) */}
      {isAlert && (
        <group position={[0, 4.3, 0]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.25, 0.4, 16]} />
            <meshStandardMaterial color="#ef4444" emissive="#ff0022" emissiveIntensity={1.5} />
          </mesh>
          <pointLight ref={beaconRef} color="#ff1133" distance={10} intensity={2} />
        </group>
      )}

      {/* Selection outline ring */}
      {isSelected && (
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[4.2, 4.5, 32]} />
          <meshBasicMaterial color="#00f2fe" side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* 3D Floating Information Label */}
      <Html position={[0, 5.2, 0]} center distanceFactor={22} className="pointer-events-none select-none">
        <div className={`px-3 py-1.5 rounded-lg border font-mono text-center shadow-lg backdrop-blur-md ${
          isAlert 
            ? 'bg-red-950/90 border-red-500/60 text-red-200 shadow-glow-red/30' 
            : 'bg-[#030d1e]/90 border-cyan-500/40 text-cyan-200 shadow-glow-cyan/20'
        }`}>
          <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold tracking-wider font-display">
            <span className={`w-2 h-2 rounded-full ${isAlert ? 'bg-red-500 animate-ping' : 'bg-emerald-400'}`} />
            {data.name.toUpperCase()}
          </div>
          <div className="text-[10px] text-slate-300">
            Demand: {data.demandLiters.toLocaleString()} L • {data.status}
          </div>
        </div>
      </Html>
    </group>
  );
};
