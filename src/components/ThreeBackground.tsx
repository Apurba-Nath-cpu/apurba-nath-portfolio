
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup with fog for depth
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 5, 15);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false,
      alpha: true,
      precision: "lowp"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create a low-poly particle system for stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 1000;
    const positions = new Float32Array(starsCount * 3);
    const sizes = new Float32Array(starsCount);
    
    for (let i = 0; i < starsCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;
      sizes[i / 3] = Math.random() * 2;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const starsMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x6366f1,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });
    
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Create low-poly floating shapes
    const shapes: THREE.Mesh[] = [];
    const shapeCount = 5;
    const geometries = [
      new THREE.TetrahedronGeometry(0.5, 0),
      new THREE.OctahedronGeometry(0.5, 0),
      new THREE.IcosahedronGeometry(0.5, 0)
    ];

    for (let i = 0; i < shapeCount; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
        shininess: 0,
        flatShading: true
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      shapes.push(mesh);
      scene.add(mesh);
    }

    // Add ambient and directional light
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Position camera
    camera.position.z = 8;

    // Mouse interaction setup with throttling
    const mouse = {
      x: 0,
      y: 0
    };
    
    let throttlePause = false;
    const throttle = (callback: () => void, time: number): void => {
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
      }, 50);
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
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (timestamp: number) => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      const delta = timestamp - lastTime;
      
      if (delta > frameInterval) {
        lastTime = timestamp - (delta % frameInterval);
        
        // Animate stars
        stars.rotation.x += 0.0005;
        stars.rotation.y += 0.0005;

        // Animate shapes
        shapes.forEach((shape, i) => {
          shape.rotation.x += 0.001 * (i + 1);
          shape.rotation.y += 0.001 * (i + 1);
          
          // Add subtle floating motion
          shape.position.y += Math.sin(timestamp * 0.001 + i) * 0.002;
        });

        // Camera movement based on mouse position
        camera.position.x += (mouse.x * 2 - camera.position.x) * 0.1;
        camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.1;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      }
    };
    
    animate(0);
    
    return () => {
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      window.removeEventListener('resize', throttledResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Clean up geometries and materials
      starsGeometry.dispose();
      starsMaterial.dispose();
      shapes.forEach(shape => {
        shape.geometry.dispose();
        (shape.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);
  
  return <div ref={mountRef} className="absolute inset-0 -z-10" />;
};

export default ThreeBackground;
