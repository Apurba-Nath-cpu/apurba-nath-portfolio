
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

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

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false,
      alpha: true,
      precision: "lowp"
    });

    renderer.setSize(200, 200);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(2, 3, 0.2);
    const material = new THREE.MeshPhongMaterial({
      color: color,
      flatShading: true,
    });

    const card = new THREE.Mesh(geometry, material);
    card.position.set(...position);
    card.rotation.set(...rotation);
    scene.add(card);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 2);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    camera.position.z = 5;

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      card.rotation.y += 0.005;
      card.position.y = position[1] + Math.sin(Date.now() * 0.001) * 0.1;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [color, position, rotation]);

  return <div ref={mountRef} className="absolute -z-10 opacity-50" />;
};

export default FloatingCard;
