
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createThreeSetup, cleanupThreeResources } from '@/utils/threeUtils';

interface FloatingCardProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}

const FloatingCard = ({ position = [0, 0, 0], rotation = [0, 0, 0], color = '#4a5568' }: FloatingCardProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const { scene, camera, renderer } = createThreeSetup(mountRef.current, {
      size: { width: 200, height: 200 },
      position: { zIndex: "-1" }
    });

    const geometry = new THREE.BoxGeometry(2, 3, 0.2);
    const material = new THREE.MeshPhongMaterial({
      color: color,
      flatShading: true,
    });

    const card = new THREE.Mesh(geometry, material);
    card.position.set(...position);
    card.rotation.set(...rotation);
    scene.add(card);

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      card.rotation.y += 0.005;
      card.position.y = position[1] + Math.sin(Date.now() * 0.001) * 0.1;
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
  }, [color, position, rotation]);

  return <div ref={mountRef} className="absolute w-full h-full opacity-50" />;
};

export default FloatingCard;
