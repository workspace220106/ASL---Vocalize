import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const SKILLS = [
  { name: 'React', level: 'Mastery', color: '#61DAFB', size: 1.5 },
  { name: 'Next.js', level: 'Mastery', color: '#000000', size: 1.5 },
  { name: 'Framer Motion', level: 'Mastery', color: '#FF0055', size: 1.5 },
  { name: 'Three.js', level: 'Mastery', color: '#FFFFFF', size: 1.5 },
  { name: 'Supabase', level: 'Proficient', color: '#3ECSDB', size: 1.0 },
  { name: 'Python', level: 'Proficient', color: '#3776AB', size: 1.0 },
  { name: 'Agentic AI', level: 'Proficient', color: '#A855F7', size: 1.0 },
  { name: 'Figma', level: 'Foundational', color: '#F24E1E', size: 0.6 },
  { name: 'Git', level: 'Foundational', color: '#F05032', size: 0.6 },
  { name: 'Vercel', level: 'Foundational', color: '#000000', size: 0.6 },
];

const SkillSphere = ({ skill, index }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Unique offset for undulating animation
  const offset = index * 0.5;

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.position.y += Math.sin(t + offset) * 0.002;
      meshRef.current.position.x += Math.cos(t + offset) * 0.002;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[skill.size * 0.2, 32, 32]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <Text
        position={[0, skill.size * 0.3, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {skill.name}
      </Text>
    </group>
  );
};

export const SkillNebula = () => {
  const spheres = useMemo(() => {
    return SKILLS.map((skill, i) => {
      // Distribute spheres in a cluster
      const angle = (i / SKILLS.length) * Math.PI * 2;
      const radius = 5 + Math.random() * 5;
      return {
        ...skill,
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 10,
          Math.sin(angle) * radius
        ]
      };
    });
  }, []);

  return (
    <group position={[0, -100, 0]}>
      {spheres.map((skill, i) => (
        <group key={skill.name} position={skill.position}>
          <SkillSphere skill={skill} index={i} />
        </group>
      ))}
    </group>
  );
};
