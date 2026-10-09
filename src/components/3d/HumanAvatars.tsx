import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { HumanEntity } from '../../types/simulation';

interface HumanAvatarProps {
  person: HumanEntity;
  isTankerDelivering?: boolean;
  onSelectPerson?: (person: HumanEntity) => void;
  isSelected?: boolean;
}

// Low-poly stylized human figure with idle animation & status tag
export const HumanAvatar: React.FC<HumanAvatarProps> = ({
  person,
  onSelectPerson,
  isSelected = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<boolean>(false);

  // Micro-motion animation (gentle breathing & bobbing)
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime + (person.position[0] * 2.1 + person.position[2] * 1.7);
      groupRef.current.position.y = person.position[1] + Math.sin(t * 2.4) * 0.04;
      // Subtle idle sway
      groupRef.current.rotation.y = Math.sin(t * 1.2) * 0.12;
    }
  });

  // Clothing & skin palette based on role
  const getRoleColors = () => {
    switch (person.role) {
      case 'DOCTOR':
        return { shirt: '#f8fafc', pants: '#0284c7', head: '#fcd34d', accessory: '#38bdf8' }; // Lab coat & scrubs
      case 'NURSE':
        return { shirt: '#06b6d4', pants: '#0e7490', head: '#fde047', accessory: '#22d3ee' }; // Cyan medical scrubs
      case 'ENGINEER':
        return { shirt: '#f59e0b', pants: '#1e293b', head: '#facc15', accessory: '#eab308' }; // High-vis vest & hard hat
      case 'STUDENT':
        return { shirt: '#3b82f6', pants: '#1e3a8a', head: '#fcd34d', accessory: '#60a5fa' }; // Blue school uniform & backpack
      case 'TANKER_DRIVER':
        return { shirt: '#0284c7', pants: '#0f172a', head: '#fbbf24', accessory: '#38bdf8' }; // Uniform & cap
      case 'CITIZEN':
      default:
        return { shirt: person.avatarColor || '#ec4899', pants: '#334155', head: '#fde047', accessory: '#94a3b8' };
    }
  };

  const colors = getRoleColors();

  return (
    <group
      ref={groupRef}
      position={person.position}
      onClick={(e) => {
        e.stopPropagation();
        onSelectPerson?.(person);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        if (typeof document !== 'undefined') document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        if (typeof document !== 'undefined') document.body.style.cursor = 'auto';
      }}
    >
      {/* Head */}
      <mesh position={[0, 1.48, 0]} castShadow>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshStandardMaterial color={colors.head} roughness={0.5} />
      </mesh>

      {/* Hardhat for Engineer or Cap for Driver */}
      {person.role === 'ENGINEER' && (
        <mesh position={[0, 1.6, 0]}>
          <cylinderGeometry args={[0.2, 0.22, 0.12, 12]} />
          <meshStandardMaterial color="#facc15" roughness={0.3} metalness={0.2} />
        </mesh>
      )}

      {/* Torso / Clothes */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <boxGeometry args={[0.34, 0.6, 0.22]} />
        <meshStandardMaterial color={colors.shirt} roughness={0.6} />
      </mesh>

      {/* High-Vis reflective stripes for engineer */}
      {person.role === 'ENGINEER' && (
        <mesh position={[0, 1.12, 0.12]}>
          <planeGeometry args={[0.32, 0.08]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      )}

      {/* Stethoscope for doctor */}
      {person.role === 'DOCTOR' && (
        <mesh position={[0, 1.15, 0.12]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.1, 0.02, 6, 12, Math.PI]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
      )}

      {/* Water Container / Bucket carried by Citizen */}
      {person.role === 'CITIZEN' && (
        <group position={[0.24, 0.72, 0.05]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.1, 0.08, 0.25, 10]} />
            <meshStandardMaterial color="#0284c7" metalness={0.4} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <torusGeometry args={[0.07, 0.015, 6, 10, Math.PI]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
        </group>
      )}

      {/* School Backpack for Student */}
      {person.role === 'STUDENT' && (
        <mesh position={[0, 1.1, -0.14]} castShadow>
          <boxGeometry args={[0.24, 0.35, 0.14]} />
          <meshStandardMaterial color="#dc2626" roughness={0.7} />
        </mesh>
      )}

      {/* Left & Right Legs */}
      <mesh position={[-0.09, 0.42, 0]} castShadow>
        <boxGeometry args={[0.12, 0.65, 0.14]} />
        <meshStandardMaterial color={colors.pants} roughness={0.7} />
      </mesh>
      <mesh position={[0.09, 0.42, 0]} castShadow>
        <boxGeometry args={[0.12, 0.65, 0.14]} />
        <meshStandardMaterial color={colors.pants} roughness={0.7} />
      </mesh>

      {/* Selection Glow Indicator */}
      {(isSelected || hovered) && (
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.35, 0.45, 24]} />
          <meshBasicMaterial color={isSelected ? '#00f2fe' : '#38bdf8'} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Interactive 3D Status Bubble on Hover or Selected */}
      {(hovered || isSelected) && (
        <Html position={[0, 2.1, 0]} center distanceFactor={18} className="pointer-events-none select-none z-30">
          <div className="bg-[#030917]/95 border border-cyan-400/80 rounded-xl px-3 py-2 text-center font-mono shadow-2xl backdrop-blur-xl min-w-[190px] text-slate-100">
            <div className="flex items-center justify-between gap-2 border-b border-cyan-500/30 pb-1">
              <span className="text-[11px] font-bold text-cyan-300 font-display">{person.name}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold border border-cyan-500/40">
                {person.role}
              </span>
            </div>
            <div className="text-[10px] text-slate-300 italic mt-1.5 leading-snug">
              "{person.quote}"
            </div>
            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-800 text-[9px]">
              <span className="text-slate-400">Hydration:</span>
              <span className={`font-bold ${person.hydrationScore >= 80 ? 'text-emerald-400' : person.hydrationScore >= 45 ? 'text-amber-400' : 'text-red-400'}`}>
                {person.hydrationScore}%
              </span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

// Crowd and Key Responders Placed Dynamically Across the Community
export const CommunityPeople: React.FC<{
  people: HumanEntity[];
  onSelectPerson?: (person: HumanEntity) => void;
  selectedPersonId?: string;
  isTankerInZoneA?: boolean;
}> = ({ people, onSelectPerson, selectedPersonId }) => {
  return (
    <group>
      {people.map((person) => (
        <HumanAvatar
          key={person.id}
          person={person}
          isSelected={selectedPersonId === person.id}
          onSelectPerson={onSelectPerson}
        />
      ))}
    </group>
  );
};
