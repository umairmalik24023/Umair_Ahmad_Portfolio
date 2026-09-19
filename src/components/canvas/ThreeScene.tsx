import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { ParticleField } from './ParticleField';
import { QuantumOrb } from './QuantumOrb';
import { ProjectHoloCards } from './ProjectHoloCards';
import { createGridMaterial } from './shaders/GridShaderMaterial';
import { SceneSection } from '../../types';

interface ThreeSceneProps {
  scrollProgress: number;
  currentSection: SceneSection;
  accentColor: string;
  wireframeMode: boolean;
  freeCameraMode: boolean;
  onSelectProject?: (id: string) => void;
  activeProjectId?: string;
}

// Sub-component that manages Camera choreography based on scroll progress and mouse
function CameraRig({
  scrollProgress,
  freeCameraMode,
}: {
  scrollProgress: number;
  freeCameraMode: boolean;
}) {
  const { camera, pointer } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 0, 7.5));
  const currentTarget = useRef(new THREE.Vector3(0.5, 0, 0));

  useFrame((state, delta) => {
    if (freeCameraMode) return; // OrbitControls take over

    // Waypoint calculation based on scrollProgress (0.0 to 1.0)
    // 0.00 -> Hero (y: 0)
    // 0.25 -> Skills (y: -5.5)
    // 0.50 -> Projects (y: -11.0)
    // 0.75 -> Experience (y: -16.5)
    // 1.00 -> Contact (y: -21.5)
    const p = Math.max(0, Math.min(1, scrollProgress));
    
    // Smooth camera path coordinates
    const targetY = -p * 21.5;
    
    // Camera coordinates curve slightly as you scroll
    const targetX = Math.sin(p * Math.PI * 2) * 1.8;
    const targetZ = 7.5 + Math.sin(p * Math.PI) * 1.2;

    // Apply mouse parallax
    const mouseX = pointer.x * 0.6;
    const mouseY = pointer.y * 0.4;

    const desiredPos = new THREE.Vector3(
      targetX + mouseX,
      targetY + mouseY,
      targetZ
    );

    const desiredLookTarget = new THREE.Vector3(
      targetX * 0.3,
      targetY,
      0
    );

    // Smooth lerp for buttery navigation
    currentPos.current.lerp(desiredPos, delta * 3.5);
    currentTarget.current.lerp(desiredLookTarget, delta * 4.0);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);
  });

  return null;
}

// Background Shader Grid Mesh that moves with camera Y
function CyberGrid({
  scrollProgress,
  accentColor,
}: {
  scrollProgress: number;
  accentColor: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  const gridMat = useMemo(() => {
    const colA = new THREE.Color('#020617');
    const colB = new THREE.Color(accentColor);
    return createGridMaterial(colA, colB);
  }, [accentColor]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (gridMat) {
      gridMat.uniforms.uTime.value = time;
      gridMat.uniforms.uScrollProgress.value = scrollProgress;
      gridMat.uniforms.uMouse.value.set(pointer.x, pointer.y);
    }
    if (meshRef.current) {
      // Follow scroll progress along Y axis
      meshRef.current.position.y = -scrollProgress * 21.5 - 2.8;
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI * 0.42, 0, 0]}
      position={[0, -2.8, -4.5]}
      material={gridMat}
    >
      <planeGeometry args={[45, 45, 64, 64]} />
    </mesh>
  );
}

// Dynamic Floating Skills Ring / Spheres in Skills Section
function SkillsCluster({
  accentColor,
}: {
  accentColor: string;
}) {
  const clusterRef = useRef<THREE.Group>(null);
  const nodes = useMemo(() => {
    const items = [
      { name: "Python", pos: [2.0, 0.8, 0.4], color: "#38bdf8" },
      { name: "Django", pos: [2.8, -0.6, -0.2], color: "#34d399" },
      { name: "PostgreSQL", pos: [1.2, -1.2, 0.6], color: "#60a5fa" },
      { name: "JavaScript", pos: [3.4, 0.2, -0.5], color: "#facc15" },
      { name: "Render", pos: [1.8, 1.6, -0.4], color: "#c084fc" },
      { name: "Docker/CI", pos: [2.5, -1.8, 0.3], color: "#f87171" },
    ];
    return items;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (clusterRef.current) {
      clusterRef.current.rotation.y = time * 0.25;
      clusterRef.current.position.y = -5.5 + Math.sin(time * 0.6) * 0.2;
    }
  });

  return (
    <group ref={clusterRef} position={[0, -5.5, 0]}>
      {/* Center glowing data node */}
      <mesh position={[2.2, 0, 0]}>
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={1.2}
          wireframe
        />
      </mesh>

      {nodes.map((node, i) => (
        <group key={i} position={node.pos as [number, number, number]}>
          <mesh>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={1.8}
            />
          </mesh>
          <mesh>
            <torusGeometry args={[0.26, 0.015, 8, 32]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Experience Section 3D Circuit / Data Pipeline
function ExperiencePipeline({
  accentColor,
}: {
  accentColor: string;
}) {
  const lineRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (lineRef.current) {
      lineRef.current.rotation.y = Math.sin(time * 0.3) * 0.15;
    }
  });

  return (
    <group ref={lineRef} position={[-2.4, -16.5, 0]}>
      {/* Vertical Data Spine */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 4.5, 12]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Checkpoint Rings */}
      {[-1.5, 0.8].map((yPos, idx) => (
        <group key={idx} position={[0, yPos, 0]}>
          <mesh>
            <torusGeometry args={[0.45, 0.03, 16, 32]} />
            <meshBasicMaterial color={accentColor} />
          </mesh>
          <mesh>
            <octahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive={accentColor}
              emissiveIntensity={1.5}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({
  scrollProgress,
  currentSection,
  accentColor,
  wireframeMode,
  freeCameraMode,
  onSelectProject,
  activeProjectId,
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className={freeCameraMode ? "pointer-events-auto" : "pointer-events-none"}
      >
        {/* Ambient & directional lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 15, 10]} intensity={1.2} />
        <directionalLight position={[-10, -5, -5]} intensity={0.5} color={accentColor} />

        {/* Dynamic Camera Rig responding to scroll and mouse */}
        <CameraRig
          scrollProgress={scrollProgress}
          freeCameraMode={freeCameraMode}
        />

        {/* Free camera orbit controls when unlocked */}
        {freeCameraMode && (
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            maxDistance={18}
            minDistance={3}
          />
        )}

        {/* Flowing Cyber Wave Grid Material (Custom Shader) */}
        <CyberGrid
          scrollProgress={scrollProgress}
          accentColor={accentColor}
        />

        {/* Constellation Particle System */}
        <ParticleField count={650} color={accentColor} />

        {/* Section 1: Hero Quantum Orb (Custom Shader Displacement) */}
        <QuantumOrb
          accentColor={accentColor}
          wireframeMode={wireframeMode}
          position={[2.4, 0, 0]}
          scale={1.45}
        />

        {/* Section 2: Skills 3D Cluster */}
        <SkillsCluster accentColor={accentColor} />

        {/* Section 3: Selected Projects 3D Hologram Pedestals */}
        <ProjectHoloCards
          activeProjectId={activeProjectId}
          onSelectProject={onSelectProject}
          accentColor={accentColor}
        />

        {/* Section 4: Experience Data Spine */}
        <ExperiencePipeline accentColor={accentColor} />
      </Canvas>
    </div>
  );
};
