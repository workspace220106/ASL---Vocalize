import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import * as THREE from 'three';

interface CameraRigProps {
  active?: boolean;
}

export const CameraRig = ({ active }: CameraRigProps) => {
  const progress = useScrollProgress();

  useFrame((state) => {
    // If nexus is active, we might want a specific animation or simply enable scroll-based movement
    if (!active) return;

    // Target Y position: -progress * 100 (moving down the gallery path)
    const targetY = -progress * 100;

    // LERP (Linear Interpolation) for smooth camera movement
    const lerpFactor = 0.1;
    state.camera.position.y += (targetY - state.camera.position.y) * lerpFactor;

    // Ensure the camera always looks at the center/target point
    state.camera.lookAt(0, state.camera.position.y - 1, 0);
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
    </>
  );
};
