import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PipelineSegment } from '../../types/simulation';

interface PipelineProps {
  segment: PipelineSegment;
  isSelected?: boolean;
  onClick?: () => void;
}

export const Pipeline: React.FC<PipelineProps> = ({
  segment,
  isSelected = false,
  onClick,
}) => {
  const particleGroupRef = useRef<THREE.Group>(null);

  // Construct CatmullRom curve for pipeline segments
  const curve = useMemo(() => {
    const points = segment.path.map(p => new THREE.Vector3(...p));
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.1);
  }, [segment.path]);

  // Generate tube geometry
  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 32, 0.15, 8, false);
  }, [curve]);

  // Color scheme based on status
  let pipeColor = '#0284c7'; // normal blue
  let particleColor = '#00f2fe';
  let isBroken = segment.status === 'FAILED';
  let isWarning = segment.status === 'WARNING';

  if (isBroken) {
    pipeColor = '#ef4444';
    particleColor = '#991b1b';
  } else if (isWarning) {
    pipeColor = '#f59e0b';
    particleColor = '#fbbf24';
  }

  // Create 6 animated water droplet spheres along the pipe
  const dropletCount = isBroken ? 0 : 5;
  const droplets = useMemo(() => {
    return Array.from({ length: dropletCount }, (_, i) => ({
      offset: i / dropletCount,
      speed: 0.25 * segment.flowRate
    }));
  }, [dropletCount, segment.flowRate]);

  useFrame((state) => {
    if (!particleGroupRef.current || isBroken) return;
    const time = state.clock.elapsedTime * 0.4;
    particleGroupRef.current.children.forEach((child, i) => {
      const progress = (droplets[i].offset + time) % 1.0;
      const point = curve.getPointAt(progress);
      child.position.copy(point);
    });
  });

  return (
    <group onClick={(e) => { e.stopPropagation(); onClick?.(); }}>
      {/* Outer pipe casing */}
      <mesh geometry={tubeGeometry} castShadow receiveShadow>
        <meshStandardMaterial 
          color={pipeColor} 
          metalness={0.7} 
          roughness={0.3} 
          emissive={isBroken ? '#7f1d1d' : pipeColor}
          emissiveIntensity={isBroken ? 0.6 : 0.2}
        />
      </mesh>

      {/* Junction fittings at extremities */}
      {segment.path.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.22, 12, 12]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>
      ))}

      {/* Animated Water Droplets / Particles */}
      {!isBroken && (
        <group ref={particleGroupRef}>
          {droplets.map((_, i) => (
            <mesh key={i}>
              <sphereGeometry args={[0.2, 12, 12]} />
              <meshStandardMaterial 
                color={particleColor} 
                emissive={particleColor} 
                emissiveIntensity={1.2} 
                roughness={0.1}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* Breakage leak smoke / alert marker */}
      {isBroken && (
        <mesh position={curve.getPointAt(0.5)}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial 
            color="#ef4444" 
            emissive="#ff0022" 
            emissiveIntensity={1.8} 
            wireframe 
          />
        </mesh>
      )}
    </group>
  );
};
