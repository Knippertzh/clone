import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface DatabaseVisualizationProps {
  onDatabaseSelect: (database: string) => void;
}

const databases = [
  'TrustedShops',
  'GelbeSeiten',
  'Billiger.de',
  'Guenstiger.de',
  'Google',
  'WLW'
];

const AIAgent = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null);
  const [targetPos] = useState(new THREE.Vector3(...position));
  const speed = 0.01;

  useFrame(() => {
    if (ref.current) {
      ref.current.position.x = targetPos.x + Math.sin(Date.now() * speed) * 2;
      ref.current.position.y = targetPos.y + Math.cos(Date.now() * speed) * 0.5;
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.4, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.2, 0.4]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

const DatabaseNode = ({ name, position, onClick }: { 
  name: string; 
  position: [number, number, number];
  onClick: () => void;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
      if (hovered) {
        ref.current.scale.setScalar(1.2);
      } else {
        ref.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={ref}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color={hovered ? "#00ff00" : "#008800"}
          emissive="#00ff00"
          emissiveIntensity={hovered ? 0.5 : 0.2}
          wireframe
        />
      </mesh>
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.5}
        color="#00ff00"
        anchorX="center"
        anchorY="middle"
        lookAt={camera.position}
      >
        {name}
      </Text>
    </group>
  );
};

const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
    }
  });

  // Create blinking points around the globe
  const pointsGeometry = new THREE.BufferGeometry();
  const positions = [];
  for (let i = 0; i < 1000; i++) {
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * Math.PI;
    const radius = 5;
    positions.push(
      radius * Math.sin(theta) * Math.cos(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(theta)
    );
  }
  pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  return (
    <group position={[0, -10, -20]}>
      <mesh ref={earthRef}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshStandardMaterial
          color="#004400"
          emissive="#00ff00"
          emissiveIntensity={0.2}
          wireframe
        />
      </mesh>
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial
          size={0.1}
          color="#00ff00"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export const DatabaseVisualization: React.FC<DatabaseVisualizationProps> = ({ onDatabaseSelect }) => {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Databases */}
      {databases.map((db, i) => {
        const angle = (i / databases.length) * Math.PI * 2;
        const radius = 8;
        return (
          <DatabaseNode
            key={db}
            name={db}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              0
            ]}
            onClick={() => onDatabaseSelect(db)}
          />
        );
      })}

      {/* AI Agents */}
      {[...Array(6)].map((_, i) => (
        <AIAgent
          key={i}
          position={[
            Math.cos((i / 6) * Math.PI * 2) * 12,
            Math.sin((i / 6) * Math.PI * 2) * 12,
            2
          ]}
        />
      ))}

      {/* Earth */}
      <Earth />

      {/* Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={10}
        maxDistance={30}
      />
    </Canvas>
  );
};