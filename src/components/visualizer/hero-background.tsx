
'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Stars } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function RotatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[1.5, 4]}>
      <meshStandardMaterial
        color="#007bff"
        wireframe
        emissive="#007bff"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </Icosahedron>
  );
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <RotatingIcosahedron />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}
