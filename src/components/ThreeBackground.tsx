
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, // Disable antialiasing for performance
      alpha: true,
      precision: "lowp" // Use lower precision for performance
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio)); // Limit pixel ratio for performance
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create particles with reduced count for better performance
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800; // Reduced count for better performance
    
    const positionArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      positionArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: new THREE.Color(0x6366f1),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Position camera
    camera.position.z = 3;

    // Throttle mouse events for performance
    const mouse = {
      x: 0,
      y: 0
    };
    
    let throttlePause = false;
    
    const throttle = (callback: Function, time: number) => {
      if (throttlePause) return;
      
      throttlePause = true;
      setTimeout(() => {
        callback();
        throttlePause = false;
      }, time);
    };

    const handleMouseMove = (event: MouseEvent) => {
      throttle(() => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      }, 50); // Throttle to 50ms
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle window resize with throttling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    let resizeTimeout: number;
    const throttledResize = () => {
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(handleResize, 100);
    };
    
    window.addEventListener('resize', throttledResize, { passive: true });
    
    // Animation loop with frame limiting
    let lastTime = 0;
    const targetFPS = 30; // Limit to 30 FPS for performance
    const frameInterval = 1000 / targetFPS;
    
    const animate = (timestamp: number) => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Calculate delta time
      const delta = timestamp - lastTime;
      
      // Only render if enough time has passed
      if (delta > frameInterval) {
        lastTime = timestamp - (delta % frameInterval);
        
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;
        
        // Subtle movement based on mouse position
        particles.rotation.x += (mouse.y * 0.0003);
        particles.rotation.y += (mouse.x * 0.0003);
        
        renderer.render(scene, camera);
      }
    };
    
    animate(0);
    
    // Clean up
    return () => {
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      window.removeEventListener('resize', throttledResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);
  
  return <div ref={mountRef} className="absolute inset-0 -z-10" />;
};

export default ThreeBackground;
