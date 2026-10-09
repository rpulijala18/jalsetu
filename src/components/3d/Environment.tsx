import React, { useMemo } from 'react';
import { Grid, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Low-poly Tree Component
const Tree: React.FC<{ position: [number, number, number]; scale?: number }> = ({ position, scale = 1 }) => {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Trunk */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.15, 1.0, 6]} />
        <meshStandardMaterial color="#451a03" roughness={0.9} />
      </mesh>
      {/* Foliage Cone 1 */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <coneGeometry args={[0.7, 1.1, 6]} />
        <meshStandardMaterial color="#065f46" roughness={0.6} />
      </mesh>
      {/* Foliage Cone 2 */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <coneGeometry args={[0.5, 0.9, 6]} />
        <meshStandardMaterial color="#047857" roughness={0.6} />
      </mesh>
    </group>
  );
};

// Ground with Satellite Imagery
const SatelliteGround: React.FC = () => {
  // Load real high-resolution aerial satellite orthophoto
  const satelliteTexture = useTexture('/satellite_terrain.jpg');
  satelliteTexture.wrapS = THREE.ClampToEdgeWrapping;
  satelliteTexture.wrapT = THREE.ClampToEdgeWrapping;

  return (
    <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[56, 56]} />
      <meshStandardMaterial 
        map={satelliteTexture} 
        roughness={0.7} 
        metalness={0.1}
      />
    </mesh>
  );
};

export const CommunityEnvironment: React.FC = () => {
  // Road networks connecting Central Tank to Hospital, School, Zones, Depot
  const roads = useMemo(() => [
    // Main North-South Spine Road
    { pos: [0, 0.02, 0], size: [3.2, 0.02, 28] },
    // Hospital Cross Road
    { pos: [-6, 0.02, -8], size: [12, 0.02, 2.5] },
    // School Cross Road
    { pos: [6, 0.02, -8], size: [12, 0.02, 2.5] },
    // Residential Ring Road
    { pos: [0, 0.02, 8], size: [28, 0.02, 2.8] },
    // Depot Road to Tanker Station
    { pos: [-12, 0.02, -4], size: [2.5, 0.02, 18] },
  ], []);

  // Tree locations around borders and between buildings
  const treePositions: [number, number, number][] = useMemo(() => [
    [-6, 0, -2],
    [-7, 0, 1],
    [-4, 0, 3],
    [5, 0, -2],
    [6, 0, 2],
    [4, 0, 4],
    [-13, 0, -4],
    [-13, 0, 1],
    [-8, 0, 12],
    [8, 0, 12],
    [13, 0, -3],
    [13, 0, 2],
    [-2, 0, -12],
    [2, 0, -12],
  ], []);

  return (
    <group>
      {/* Real High-Resolution Satellite Aerial Photography Ground Plane */}
      <React.Suspense fallback={
        <mesh position={[0, -0.05, 0]} receiveShadow>
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial color="#050b14" roughness={0.9} />
        </mesh>
      }>
        <SatelliteGround />
      </React.Suspense>

      {/* Cyber Infrastructure Ground Grid (Semi-transparent overlay) */}
      <Grid 
        args={[50, 50]} 
        cellSize={2} 
        cellThickness={0.5} 
        cellColor="#00f2fe" 
        sectionSize={8} 
        sectionThickness={1.0} 
        sectionColor="#0284c7" 
        fadeDistance={40} 
        fadeStrength={1.2}
        position={[0, 0.01, 0]} 
      />

      {/* Roads */}
      {roads.map((r, i) => (
        <mesh key={i} position={r.pos as [number, number, number]} receiveShadow>
          <boxGeometry args={r.size as [number, number, number]} />
          <meshStandardMaterial color="#0f172a" roughness={0.8} />
        </mesh>
      ))}

      {/* Road Markings (Subtle cyber dashed centerlines) */}
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.15, 26]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
      </mesh>

      {/* Trees */}
      {treePositions.map((pos, idx) => (
        <Tree key={idx} position={pos} scale={0.9 + (idx % 3) * 0.2} />
      ))}
    </group>
  );
};
