import React, { createContext, useContext, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface ThreeJSContextProps {
  sceneRef: React.MutableRefObject<THREE.Scene | null>;
  cameraRef: React.MutableRefObject<THREE.PerspectiveCamera | null>;
  rendererRef: React.MutableRefObject<THREE.WebGLRenderer | null>;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  meshRefs: React.MutableRefObject<THREE.Mesh[]>;
  controlsRef: React.MutableRefObject<OrbitControls | null>;
  raycaster: React.MutableRefObject<THREE.Raycaster | null>;
  mouse: React.MutableRefObject<THREE.Vector2 | null>;
}

const ThreeJSContext = createContext<ThreeJSContextProps | undefined>(undefined);

export const ThreeJSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const meshRefs = useRef<THREE.Mesh[]>([]);
  const controlsRef = useRef<OrbitControls | null>(null);
  const raycaster = useRef<THREE.Raycaster | null>(new THREE.Raycaster());
  const mouse = useRef<THREE.Vector2 | null>(new THREE.Vector2());

  return (
    <ThreeJSContext.Provider value={{ sceneRef, cameraRef, rendererRef, containerRef, meshRefs, controlsRef, raycaster, mouse }}>
      {children}
    </ThreeJSContext.Provider>
  );
};

export const useThreeJSContext = () => {
  const context = useContext(ThreeJSContext);
  if (!context) {
    throw new Error('useThreeJSContext must be used within a ThreeJSProvider');
  }
  return context;
};
