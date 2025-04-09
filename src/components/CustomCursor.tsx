
import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const checkIfPointer = () => {
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

    document.addEventListener('mousemove', (e) => {
      moveCursor(e);
      checkIfPointer();
    });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (typeof window === 'undefined' || 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return null; // Don't render custom cursor on mobile devices
  }

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none;
        }
        a, button, [role="button"], .tag, .card-hover {
          cursor: none;
        }
      `}</style>
      <div
        className={`fixed pointer-events-none z-50 mix-blend-difference transition-opacity duration-150 ${isHidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ left: '0', top: '0' }}
      >
        <div
          className={`rounded-full bg-white transition-all duration-150 fixed transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference ${
            isPointer
              ? 'w-7 h-7 border-2 border-white bg-transparent'
              : 'w-5 h-5'
          } ${isClicking ? 'scale-75' : 'scale-100'}`}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`
          }}
        />
        <div
          className={`rounded-full bg-white opacity-25 transition-all duration-300 fixed transform -translate-x-1/2 -translate-y-1/2 ${
            isPointer ? 'w-10 h-10 scale-150' : 'w-10 h-10'
          }`}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
