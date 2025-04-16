
import * as THREE from 'three';

interface ThreeSetupConfig {
  size?: { width: number; height: number };
  antialias?: boolean;
  alpha?: boolean;
  precision?: "highp" | "mediump" | "lowp";
  position?: { top?: string; left?: string; right?: string; bottom?: string; zIndex?: string };
}

export const createThreeSetup = (mount: HTMLDivElement, config: ThreeSetupConfig = {}) => {
  const {
    size = { width: 150, height: 150 },
    antialias = false,
    alpha = true,
    precision = "lowp",
    position = { zIndex: "-10" }
  } = config;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias, alpha, precision });

  renderer.setSize(size.width, size.height);
  mount.appendChild(renderer.domElement);
  
  // Apply positioning styles
  renderer.domElement.style.position = 'absolute';
  if (position.top) renderer.domElement.style.top = position.top;
  if (position.left) renderer.domElement.style.left = position.left;
  if (position.right) renderer.domElement.style.right = position.right;
  if (position.bottom) renderer.domElement.style.bottom = position.bottom;
  if (position.zIndex) renderer.domElement.style.zIndex = position.zIndex;
  
  // Enable preserving the WebGL drawing buffer to prevent flickering
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  // Add lights
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 2);
  scene.add(light);

  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);

  camera.position.z = 5;

  return { scene, camera, renderer };
};

export const cleanupThreeResources = (
  mount: HTMLDivElement | null,
  renderer: THREE.WebGLRenderer,
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  animationId: number | null
) => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  geometry.dispose();
  material.dispose();
  renderer.dispose();
  if (mount && mount.contains(renderer.domElement)) {
    mount.removeChild(renderer.domElement);
  }
};
