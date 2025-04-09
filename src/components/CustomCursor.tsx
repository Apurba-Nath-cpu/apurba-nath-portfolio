
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<THREE.Mesh | null>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);
  const earthOrbitRef = useRef<number>(0);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  
  useEffect(() => {
    if (typeof window === 'undefined' || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return; // Don't run on server or mobile devices
    }
    
    // Setup ThreeJS for the cursor
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    // Performance optimization: Create scene only once
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    
    // Use lower resolution for better performance
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, // Disable antialiasing for pixelated look
      alpha: true,
      precision: "lowp", // Use lower precision for better performance
    });
    
    rendererRef.current = renderer;
    
    renderer.setSize(60, 60);
    renderer.setPixelRatio(1); // Force low pixel ratio for pixelated look
    renderer.setClearColor(0x000000, 0);
    cursor.appendChild(renderer.domElement);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // Create Sun with improved appearance - use more distinct pixel look
    const sunGeometry = new THREE.BoxGeometry(1.4, 1.4, 1.4, 1, 1, 1);
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xFFA500, // More vibrant orange color
      flatShading: true, // Enable flat shading for pixelated look
    });
    
    // Add sun glow
    const sunGlowGeometry = new THREE.BoxGeometry(1.6, 1.6, 1.6, 1, 1, 1);
    const sunGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xFFD700, // Gold color for glow
      transparent: true,
      opacity: 0.3,
      flatShading: true,
    });
    
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
    scene.add(sun);
    scene.add(sunGlow);
    sunRef.current = sun;
    
    // Create Earth with improved appearance
    const earthGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5, 1, 1, 1);
    const earthMaterial = new THREE.MeshLambertMaterial({
      color: 0x3399FF, // More vibrant blue color
      flatShading: true, // Enable flat shading for pixelated look
    });
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    earthRef.current = earth;
    earth.position.set(2.0, 0, 0); // Position Earth away from Sun
    
    // Position camera
    camera.position.z = 3;
    
    // Animation
    let lastTime = 0;
    const animate = (timestamp: number) => {
      requestAnimationFrame(animate);
      
      // Calculate delta time for smooth animation regardless of frame rate
      const delta = (timestamp - lastTime) / 1000;
      lastTime = timestamp;
      
      if (sunRef.current) {
        sunRef.current.rotation.y += 0.5 * delta;
        sunRef.current.rotation.x += 0.2 * delta;
        sunGlow.rotation.y = sunRef.current.rotation.y;
        sunGlow.rotation.x = sunRef.current.rotation.x;
      }
      
      if (earthRef.current) {
        // Update earth orbit - 1.4x faster as requested
        const orbitSpeed = isPointer ? 2.8 * delta : 1.4 * delta;
        earthOrbitRef.current += orbitSpeed;
        
        const orbitRadius = isClicking ? 1.5 : 2.0;
        earthRef.current.position.x = Math.cos(earthOrbitRef.current) * orbitRadius;
        earthRef.current.position.z = Math.sin(earthOrbitRef.current) * orbitRadius;
        earthRef.current.rotation.y += 1.2 * delta;
      }
      
      // Only render if the cursor is visible for performance
      if (!isHidden && rendererRef.current) {
        renderer.render(scene, camera);
      }
    };
    
    animate(0);
    
    // Clean up function
    return () => {
      if (cursor && cursor.contains(renderer.domElement)) {
        cursor.removeChild(renderer.domElement);
      }
      
      // Dispose of geometries and materials
      sunGeometry.dispose();
      sunMaterial.dispose();
      sunGlowGeometry.dispose();
      sunGlowMaterial.dispose();
      earthGeometry.dispose();
      earthMaterial.dispose();
      
      renderer.dispose();
      rendererRef.current = null;
      sunRef.current = null;
      earthRef.current = null;
    };
  }, [isHidden]);
  
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
      lastX += (targetX - lastX) * 0.3; // Improved smoothing factor
      lastY += (targetY - lastY) * 0.3;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${lastX}px, ${lastY}px, 0)`;
      }
      
      rafId = requestAnimationFrame(moveCursor);
    };
    
    // Use passive event listeners for better performance
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
    
    // Add event listeners with passive option for performance
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    
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
