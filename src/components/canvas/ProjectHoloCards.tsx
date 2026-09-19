import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PROJECTS } from '../../data/portfolioData';

interface ProjectHoloCardsProps {
  activeProjectId?: string;
  onSelectProject?: (id: string) => void;
  accentColor: string;
}

export const ProjectHoloCards: React.FC<ProjectHoloCardsProps> = ({
  activeProjectId,
  onSelectProject,
  accentColor,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Position the 3 project monoliths across 3D space
  const cardCoordinates: [number, number, number][] = [
    [-3.2, -10.5, -1.5], // Mobile Inventory Shop
    [0.0, -11.2, 0.5],   // Clothing E-commerce Store
    [3.2, -10.7, -1.2],  // High-Throughput Engine
  ];

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle breathing idle float
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {PROJECTS.map((proj, idx) => {
        const isHovered = hoveredIndex === idx;
        const isSelected = activeProjectId === proj.id;
        const coords = cardCoordinates[idx] || [0, 0, 0];

        return (
          <HoloNode
            key={proj.id}
            index={idx}
            project={proj}
            position={coords}
            isHovered={isHovered}
            isSelected={isSelected}
            accentColor={accentColor}
            onPointerOver={() => setHoveredIndex(idx)}
            onPointerOut={() => setHoveredIndex(null)}
            onClick={() => onSelectProject?.(proj.id)}
          />
        );
      })}
    </group>
  );
};

interface HoloNodeProps {
  index: number;
  project: (typeof PROJECTS)[0];
  position: [number, number, number];
  isHovered: boolean;
  isSelected: boolean;
  accentColor: string;
  onPointerOver: () => void;
  onPointerOut: () => void;
  onClick: () => void;
}

const HoloNode: React.FC<HoloNodeProps> = ({
  index,
  project,
  position,
  isHovered,
  isSelected,
  accentColor,
  onPointerOver,
  onPointerOut,
  onClick,
}) => {
  const nodeRef = useRef<THREE.Group>(null);
  const crystalRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * (isHovered ? 1.5 : 0.6);
      crystalRef.current.rotation.x = Math.sin(time + index) * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (isHovered ? -1.2 : -0.4);
    }
  });

  const nodeColor = project.accentHex ? `#${project.accentHex.toString(16).padStart(6, '0')}` : accentColor;

  return (
    <group
      ref={nodeRef}
      position={position}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
      scale={isSelected ? 1.25 : isHovered ? 1.15 : 1.0}
    >
      {/* Central Polyhedron Tech Crystal */}
      <mesh ref={crystalRef}>
        <icosahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial
          color={nodeColor}
          emissive={nodeColor}
          emissiveIntensity={isHovered || isSelected ? 1.8 : 0.6}
          roughness={0.15}
          metalness={0.9}
          wireframe={!isHovered && !isSelected}
        />
      </mesh>

      {/* Internal Core Light */}
      <mesh scale={0.45}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Rotating Cyber Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.15, 0.02, 16, 64]} />
        <meshBasicMaterial
          color={nodeColor}
          transparent
          opacity={isHovered ? 0.9 : 0.4}
        />
      </mesh>

      {/* Base Project Hologram Beacon Pedestal */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.8, 1.1, 0.15, 32]} />
        <meshStandardMaterial
          color="#0b1120"
          roughness={0.5}
          metalness={0.8}
        />
      </mesh>

      {/* Vertical Light Pillar */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2.4, 8]} />
        <meshBasicMaterial
          color={nodeColor}
          transparent
          opacity={isHovered ? 0.6 : 0.25}
        />
      </mesh>

      <pointLight
        color={nodeColor}
        intensity={isHovered ? 3.0 : 1.2}
        distance={5}
      />
    </group>
  );
};
