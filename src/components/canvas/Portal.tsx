import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PortalProps {
  active?: boolean;
}

export const Portal: React.FC<PortalProps> = ({ active }) => {
  const meshRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Constant rotation
    meshRef.current.rotation.y += 0.01;

    if (active) {
      // Glide toward the camera
      meshRef.current.position.z += (state.camera.position.z - meshRef.current.position.z) * 0.1;
    }
  });

  // Create particle burst using Points and SphereGeometry
  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 2;
  }

  return (
    <points ref={meshRef}>
      <sphereGeometry args={[1, particleCount]} />
      <pointsMaterial
        color="#00F0FF"
        transparent
        opacity={0.6}
        size={0.02}
      />
    </points>
  );
};
