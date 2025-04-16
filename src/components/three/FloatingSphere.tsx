
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createThreeSetup, cleanupThreeResources } from '@/utils/threeUtils';

interface FloatingSphereProps {
  position?: [number, number, number];
  color?: string;
  size?: number;
}

const FloatingSphere = ({ position = [0, 0, 0], color = '#9b87f5', size = 1 }: FloatingSphereProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const { scene, camera, renderer } = createThreeSetup(mountRef.current);
    const geometry = new THREE.IcosahedronGeometry(size, 0);
    const material = new THREE.MeshPhongMaterial({
      color: color,
      flatShading: true,
    });

    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(...position);
    scene.add(sphere);

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      sphere.rotation.y += 0.01;
      sphere.rotation.x += 0.005;
      sphere.position.y = position[1] + Math.sin(Date.now() * 0.002) * 0.1;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cleanupThreeResources(mountRef.current, renderer, geometry, material, animationIdRef.current);
    };
  }, [color, position, size]);

  return <div ref={mountRef} className="absolute -z-10 opacity-40" />;
};

export default FloatingSphere;
