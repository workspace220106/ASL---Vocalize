import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

const Scene: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{
        backgroundColor: '#050505',
        width: '100vw',
        height: '100vh'
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
    </Canvas>
  );
};

export default Scene;
