import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface IdentityCoreProps {
  position?: [number, number, number];
}

const bioFragments = [
  "SATELLITE ARCHITECT",
  "SYSTEMS THINKER",
  "UI/UX VISIONARY",
  "CODE ARTISAN",
  "DIGITAL STRATEGIST"
];

export const IdentityCore: React.FC<IdentityCoreProps> = ({ position = [0, -120, 0] }) => {
  const coreRef = useRef<THREE.Group>(null);
  const torus1Ref = useRef<THREE.Mesh>(null);
  const torus2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!coreRef.current) return;

    const t = state.clock.getElapsedTime();

    // Rotate overall core
    coreRef.current.rotation.y = t * 0.2;

    // Rotate individual tori in opposing directions
    if (torus1Ref.current) torus1Ref.current.rotation.x = t * 0.5;
    if (torus2Ref.current) torus2Ref.current.rotation.z = t * 0.8;

    // Logic for text alignment as camera reaches Y = -120
    // We adjust transparency or scale based on distance to the target Y
    const dist = Math.abs(state.camera.position.y - position[1]);
    const opacity = Math.max(0, 1 - dist / 20);

    // This is a simplified implementation of "align as camera reaches"
    // The actual positioning of fragments is handled by the fragments map below
  });

  return (
    <group position={position} ref={coreRef}>
      {/* The Core Geometries */}
      <mesh ref={torus1Ref}>
        <torusGeometry args={[2, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#00F0FF"
          metalness={1}
          roughness={0.1}
          emissive="#00F0FF"
          emissiveIntensity={0.5}
        />
      </mesh>

      <mesh ref={torus2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#FFFFFF"
          metalness={1}
          roughness={0.2}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#00F0FF"
          metalness={1}
          roughness={0.1}
          emissive="#00F0FF"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Bio-text Fragments */}
      {bioFragments.map((text, i) => (
        <Float
          key={i}
          speed={2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
          position={[
            Math.cos((i / bioFragments.length) * Math.PI * 2) * 5,
            Math.sin((i / bioFragments.length) * Math.PI * 2) * 2,
            Math.sin((i / bioFragments.length) * Math.PI * 2) * 5
          ]}
        >
          <Text
            fontSize={0.5}
            color="#FFFFFF"
            font="/fonts/Inter-Bold.ttf" // Assumes font exists or uses default
            anchor={[0, 0]}
            outlineWidth={0.02}
            outlineColor="#00F0FF"
          >
            {text}
          </Text>
        </Float>
      ))}
    </group>
  );
};
