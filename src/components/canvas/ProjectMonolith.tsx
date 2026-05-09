import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ProjectMonolithProps {
  projectName: string;
  position?: [number, number, number];
}

export const ProjectMonolith: React.FC<ProjectMonolithProps & { onActivation: (title: string | null) => void }> = ({ projectName, position = [0, 0, 0], onActivation }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [active, setActive] = useState(false);

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return;

    // Calculate distance between camera and monolith
    const distance = state.camera.position.distanceTo(groupRef.current.position);
    const activationDistance = 5;

    // Logic for activation
    if (distance < activationDistance && !active) {
      setActive(true);
      onActivation(projectName);
    } else if (distance >= activationDistance && active) {
      setActive(false);
      onActivation(null);
    }

    // Smooth scale and emissive intensity transition
    const targetScale = active ? 1.2 : 1.0;
    const targetEmissive = active ? 2.0 : 1.0;

    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      meshRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
        meshRef.current.material.emissiveIntensity,
        targetEmissive,
        0.1
      );
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Central 3D Primitive: Box */}
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={1}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Floating Glass Panel */}
      <mesh position={[0, 0, 0.7]}>
        <planeGeometry args={[1.2, 0.6]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.1}
          width={0.1}
          ior={1.5}
          chromaticAberration={0.02}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          color="#ffffff"
        />
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.1}
          color="white"
          font="/fonts/Inter-Bold.ttf" // Assume standard path or system font
          anchorX="center"
          anchorY="middle"
        >
          {projectName}
        </Text>
      </mesh>
    </group>
  );
};
