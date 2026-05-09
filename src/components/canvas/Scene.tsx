import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { ProjectMonolith } from './ProjectMonolith';
import { SkillNebula } from './SkillNebula';
import { Portal } from './Portal';
import { CameraRig } from './CameraRig';
import { projects } from '../../constants/projects';
import { Hero } from '../ui/Hero';

const Scene: React.FC = () => {
  const [isNexusActive, setIsNexusActive] = useState(false);

  return (
    <div className="relative w-full h-screen">
      {!isNexusActive && (
        <div className="absolute inset-0 z-20">
          <Hero onEnterNexus={() => setIsNexusActive(true)} />
        </div>
      )}

      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{
          backgroundColor: '#050505',
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          inset: 0,
          zIndex: 1
        }}
      >
        <color attach="background" args={['#050505']} />

        <Environment preset="city" />

        <ambientLight intensity={0.2} />

        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={2}
          castShadow
        />

        <CameraRig active={isNexusActive} />
        <Portal active={isNexusActive} />

        {projects.map((project, index) => (
          <ProjectMonolith
            key={project.title}
            projectName={project.title}
            position={[0, -index * 20, 0]}
          />
        ))}

        <SkillNebula />
      </Canvas>
    </div>
  );
};

export default Scene;
