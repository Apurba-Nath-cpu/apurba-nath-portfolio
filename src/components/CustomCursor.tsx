
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);
  const moonRef = useRef<THREE.Mesh | null>(null);
  const moonOrbitRef = useRef<number>(0);
  
  useEffect(() => {
    if (typeof window === 'undefined' || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return; // Don't run on server or mobile devices
    }
    
    // Setup ThreeJS for the cursor
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    
    renderer.setSize(60, 60);
    renderer.setClearColor(0x000000, 0);
    cursor.appendChild(renderer.domElement);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // Create Earth
    const earthGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'),
      bumpMap: new THREE.TextureLoader().load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg'),
      bumpScale: 0.05,
      specularMap: new THREE.TextureLoader().load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg'),
      specular: new THREE.Color(0x333333)
    });
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    earthRef.current = earth;
    
    // Create Moon
    const moonGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const moonMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('https://threejs.org/examples/textures/planets/moon_1024.jpg')
    });
    
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    scene.add(moon);
    moonRef.current = moon;
    moon.position.set(1.5, 0, 0);
    
    // Position camera
    camera.position.z = 3;
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (earthRef.current) {
        earthRef.current.rotation.y += isPointer ? 0.02 : 0.005;
      }
      
      if (moonRef.current) {
        // Update moon orbit
        moonOrbitRef.current += isPointer ? 0.03 : 0.01;
        const orbitRadius = isClicking ? 1.3 : 1.5;
        
        moonRef.current.position.x = Math.cos(moonOrbitRef.current) * orbitRadius;
        moonRef.current.position.z = Math.sin(moonOrbitRef.current) * orbitRadius;
        moonRef.current.rotation.y += 0.01;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Clean up function
    return () => {
      if (cursor && cursor.contains(renderer.domElement)) {
        cursor.removeChild(renderer.domElement);
      }
      
      scene.clear();
      renderer.dispose();
    };
  }, []);
  
  // Cursor position tracking (optimized for performance)
  useEffect(() => {
    if (typeof window === 'undefined' || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return;
    }
    
    let rafId: number;
    let lastX = 0;
    let lastY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const moveCursor = () => {
      // Smooth interpolation for cursor movement (reduces lag)
      lastX += (targetX - lastX) * 0.2;
      lastY += (targetY - lastY) * 0.2;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${lastX}px, ${lastY}px, 0)`;
      }
      
      rafId = requestAnimationFrame(moveCursor);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      // Update target position directly from mouse event
      targetX = e.clientX - 30; // Offset by half width
      targetY = e.clientY - 30; // Offset by half height
      
      // Check if mouse is over a pointer element
      const hoveredElement = document.querySelectorAll(":hover");
      const isPointerNow = Array.from(hoveredElement).some(el => {
        const cursor = window.getComputedStyle(el).cursor;
        return cursor === 'pointer';
      });
      setIsPointer(isPointerNow);
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // Start animation loop
    rafId = requestAnimationFrame(moveCursor);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);
  
  if (typeof window === 'undefined' || 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return null; // Don't render custom cursor on mobile devices
  }

  return (
    <>
      <style>
        {`
          body {
            cursor: none;
          }
          a, button, [role="button"], .tag, .card-hover {
            cursor: none;
          }
        `}
      </style>
      <div
        ref={cursorRef}
        className={`fixed w-[60px] h-[60px] pointer-events-none z-50 transition-opacity duration-150 ${
          isHidden ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ 
          left: '0', 
          top: '0',
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          filter: isPointer ? 'brightness(1.3)' : 'none',
          scale: isClicking ? '0.9' : '1'
        }}
      />
    </>
  );
};

export default CustomCursor;
