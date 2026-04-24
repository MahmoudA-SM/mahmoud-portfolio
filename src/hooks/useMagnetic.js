import { useRef, useEffect } from 'react';

/**
 * A hook that adds a "magnetic" pull effect to an element.
 * @param {number} strength - How strong the magnetic pull is (default 0.3)
 * @param {number} radius - How far away the mouse can be to trigger the effect (default 100)
 */
export const useMagnetic = (strength = 0.3, radius = 100) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < radius) {
        const x = distanceX * strength;
        const y = distanceY * strength;
        el.style.transform = `translate(${x}px, ${y}px)`;
      } else {
        el.style.transform = 'translate(0px, 0px)';
      }
    };

    const handleMouseLeave = () => {
      el.style.transform = 'translate(0px, 0px)';
    };

    window.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, radius]);

  return ref;
};
