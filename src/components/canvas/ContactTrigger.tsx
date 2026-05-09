import React from 'react';
import { useFrame } from '@react-three/fiber';

interface TriggerProps {
  onTrigger: () => void;
}

export const ContactTrigger: React.FC<TriggerProps> = ({ onTrigger }) => {
  useFrame((state) => {
    // Trigger contact form when camera reaches the end of the journey (e.g., Y < -130)
    if (state.camera.position.y < -130) {
      onTrigger();
    }
  });

  return null;
};
