import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  color?: string;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({ 
  count = 700, 
  color = "#38bdf8" 
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, scales, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sca = new Float32Array(count);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spread across a cylindrical / expansive volume
      const radius = 10 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 35;

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * radius;

      sca[i] = Math.random() * 2.5 + 0.8;
      spd[i] = (Math.random() * 0.4 + 0.1) * (Math.random() > 0.5 ? 1 : -1);
    }

    return [pos, sca, spd];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geometry = pointsRef.current.geometry;
    const positionAttr = geometry.attributes.position;
    const array = positionAttr.array as Float32Array;

    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      // Subtle float up/down
      array[i * 3 + 1] += speeds[i] * delta * 0.8;

      // Wrap boundaries
      if (array[i * 3 + 1] > 18) array[i * 3 + 1] = -18;
      if (array[i * 3 + 1] < -18) array[i * 3 + 1] = 18;
    }

    positionAttr.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        color={color}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
