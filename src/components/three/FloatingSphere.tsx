
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

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

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false,
      alpha: true,
      precision: "lowp"
    });

    renderer.setSize(150, 150);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(size, 0);
    const material = new THREE.MeshPhongMaterial({
      color: color,
      flatShading: true,
    });

    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(...position);
    scene.add(sphere);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 2);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    camera.position.z = 5;

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      sphere.rotation.y += 0.01;
      sphere.rotation.x += 0.005;
      sphere.position.y = position[1] + Math.sin(Date.now() * 0.002) * 0.1;
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
  }, [color, position, size]);

  return <div ref={mountRef} className="absolute -z-10 opacity-40" />;
};

export default FloatingSphere;
