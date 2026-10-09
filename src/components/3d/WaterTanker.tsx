import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface WaterTankerProps {
  locationStatus: string; // 'DEPOT' | 'EN_ROUTE_ZONE_A' | 'ZONE_A' | 'DELIVERING'
  capacity: number;
  waterDelivered: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export const WaterTanker: React.FC<WaterTankerProps> = ({
  locationStatus,
  capacity,
  waterDelivered,
  isSelected = false,
  onClick,
}) => {
  const tankerGroupRef = useRef<THREE.Group>(null);

  // Position coordinates:
  // DEPOT: [-12, 0.35, -12]
  // ZONE_A: [-10, 0.35, 6]
  useFrame((state) => {
    if (!tankerGroupRef.current) return;

    if (locationStatus === 'DEPOT') {
      tankerGroupRef.current.position.set(-12, 0.35, -12);
      tankerGroupRef.current.rotation.y = 0;
    } else if (locationStatus === 'EN_ROUTE_ZONE_A') {
      // Dynamic motion along the road from depot to Zone A
      const progress = (Math.sin(state.clock.elapsedTime * 1.2) + 1) / 2;
      const x = THREE.MathUtils.lerp(-12, -10, progress);
      const z = THREE.MathUtils.lerp(-12, 6, progress);
      tankerGroupRef.current.position.set(x, 0.35, z);
      tankerGroupRef.current.rotation.y = Math.PI / 2;
    } else if (locationStatus === 'ZONE_A') {
      tankerGroupRef.current.position.set(-10, 0.35, 6);
      tankerGroupRef.current.rotation.y = 0;
    }
  });

  return (
    <group 
      ref={tankerGroupRef} 
      position={[-12, 0.35, -12]}
      onClick={(e) => { e.stopPropagation(); onClick?.(); }}
    >
      {/* Truck Chassis */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[1.4, 0.3, 3.2]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>

      {/* Driver Cabin */}
      <mesh position={[0, 0.9, 1.1]} castShadow>
        <boxGeometry args={[1.3, 1.0, 1.0]} />
        <meshStandardMaterial color="#0284c7" roughness={0.3} />
      </mesh>
      {/* Windshield */}
      <mesh position={[0, 1.05, 1.62]}>
        <boxGeometry args={[1.1, 0.5, 0.05]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.1} />
      </mesh>

      {/* Stainless Steel Cylindrical Water Cistern / Tank */}
      <mesh position={[0, 1.0, -0.6]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.75, 0.75, 2.0, 24]} />
        <meshStandardMaterial 
          color="#00f2fe" 
          metalness={0.9} 
          roughness={0.2} 
          emissive="#005577"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* 6 Wheels */}
      {[
        [-0.75, 0.25, -1.0],
        [0.75, 0.25, -1.0],
        [-0.75, 0.25, 0.1],
        [0.75, 0.25, 0.1],
        [-0.75, 0.25, 1.1],
        [0.75, 0.25, 1.1],
      ].map(([x, y, z], idx) => (
        <mesh key={idx} position={[x, y, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
          <meshStandardMaterial color="#020617" roughness={0.9} />
        </mesh>
      ))}

      {/* Emergency Beacon */}
      <mesh position={[0, 1.45, 1.1]}>
        <cylinderGeometry args={[0.1, 0.1, 0.15, 8]} />
        <meshStandardMaterial color="#f59e0b" emissive="#ffaa00" emissiveIntensity={1.5} />
      </mesh>

      {/* 3D Label */}
      <Html position={[0, 2.2, 0]} center distanceFactor={20} className="pointer-events-none select-none">
        <div className="bg-[#030814]/90 backdrop-blur-md px-2 py-1 rounded border border-amber-500/40 font-mono text-[9px] text-amber-300 shadow-glow-amber/20 whitespace-nowrap">
          <span className="font-bold">TANKER #01</span> • {locationStatus}
        </div>
      </Html>
    </group>
  );
};
