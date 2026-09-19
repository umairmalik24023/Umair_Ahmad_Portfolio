import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createQuantumOrbMaterial } from './shaders/QuantumOrbMaterial';

interface QuantumOrbProps {
  accentColor: string;
  wireframeMode?: boolean;
  scale?: number;
  position?: [number, number, number];
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
}

export const QuantumOrb: React.FC<QuantumOrbProps> = ({
  accentColor,
  wireframeMode = false,
  scale = 1.6,
  position = [2.8, 0, 0],
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Derive shader colors based on active theme
  const shaderMaterial = useMemo(() => {
    const colCore = new THREE.Color('#0f172a');
    const colRim = new THREE.Color(accentColor);
    const colHighlight = new THREE.Color(accentColor).offsetHSL(0.08, 0.2, 0.25);
    return createQuantumOrbMaterial(colCore, colRim, colHighlight);
  }, [accentColor]);

  // Update wireframe mode
  useMemo(() => {
    if (shaderMaterial) {
      shaderMaterial.wireframe = wireframeMode;
    }
  }, [shaderMaterial, wireframeMode]);

  // Animate with frame updates
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (shaderMaterial) {
      shaderMaterial.uniforms.uTime.value = time;
      // Smoothly lerp hover state in shader uniform
      const targetHover = hovered ? 1.0 : 0.0;
      shaderMaterial.uniforms.uHover.value = THREE.MathUtils.lerp(
        shaderMaterial.uniforms.uHover.value,
        targetHover,
        delta * 6
      );
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (hovered ? 0.8 : 0.35);
      meshRef.current.rotation.x = Math.sin(time * 0.4) * 0.2;
    }

    // Orbital rings counter-rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.45;
      ring1Ref.current.rotation.y = time * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = time * -0.35;
      ring2Ref.current.rotation.x = time * 0.2;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = time * -0.5;
      ring3Ref.current.rotation.z = time * 0.25;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Central Plasma / Noise Displacement Mesh */}
      <mesh
        ref={meshRef}
        material={shaderMaterial}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1.35, 64, 64]} />
      </mesh>

      {/* Internal Inner Wireframe Sphere */}
      <mesh scale={0.92}>
        <sphereGeometry args={[1.35, 18, 18]} />
        <meshBasicMaterial
          color={accentColor}
          wireframe
          transparent
          opacity={hovered ? 0.35 : 0.18}
        />
      </mesh>

      {/* Inner Glowing Point Light */}
      <pointLight color={accentColor} intensity={hovered ? 4 : 2.2} distance={8} />

      {/* Orbital Ring 1 - Quantum Orbit */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[2.0, 0.018, 16, 100]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={hovered ? 2.5 : 1.2}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>
        {/* Orbital Node Satellite */}
        <mesh position={[2.0, 0, 0]}>
          <octahedronGeometry args={[0.09, 0]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Orbital Ring 2 - Latitude Coordinate */}
      <group ref={ring2Ref}>
        <mesh>
          <torusGeometry args={[2.3, 0.015, 16, 100]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={hovered ? 2.0 : 0.9}
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={0.5}
          />
        </mesh>
        <mesh position={[-2.3, 0, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Orbital Ring 3 - Equatorial Radar */}
      <group ref={ring3Ref}>
        <mesh>
          <ringGeometry args={[2.55, 2.58, 64]} />
          <meshBasicMaterial
            color={accentColor}
            transparent
            opacity={hovered ? 0.4 : 0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
};
