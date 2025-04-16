
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

    const { scene, camera, renderer } = createThreeSetup(mountRef.current, {
      size: { width: 200, height: 200 },
      position: { zIndex: "-1" }
    });
    
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        const domElement = renderer.domElement;
        if (entry.isIntersecting) {
          domElement.style.visibility = 'visible';
          if (!animationIdRef.current) {
            animate();
          }
        } else {
          domElement.style.visibility = 'hidden';
          if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current);
            animationIdRef.current = null;
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(mountRef.current);

    return () => {
      observer.disconnect();
      cleanupThreeResources(mountRef.current, renderer, geometry, material, animationIdRef.current);
    };
  }, [color, position, size]);

  return <div ref={mountRef} className="absolute w-full h-full opacity-40" />;
};

export default FloatingSphere;
