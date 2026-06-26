import React, { useEffect, useRef } from 'react';

interface DotFieldProps {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
}

export default function DotField({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 0,
  gradientFrom = "rgba(168, 85, 247, 0.35)",
  gradientTo = "rgba(180, 151, 207, 0.25)",
  glowColor = "#120F17"
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Handle high DPI screens
    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      // Gently move off-screen
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.targetX = e.touches[0].clientX - rect.left;
        mouseRef.current.targetY = e.touches[0].clientY - rect.top;
        mouseRef.current.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // Grid dots cache
    interface Dot {
      baseX: number;
      baseY: number;
      randomOffset: number;
    }

    let dots: Dot[] = [];

    const generateGrid = () => {
      dots = [];
      const cols = Math.ceil(width / dotSpacing) + 2;
      const rows = Math.ceil(height / dotSpacing) + 2;
      
      for (let c = -1; c < cols; c++) {
        for (let r = -1; r < rows; r++) {
          dots.push({
            baseX: c * dotSpacing,
            baseY: r * dotSpacing,
            randomOffset: Math.random() * 100,
          });
        }
      }
    };

    generateGrid();

    // Re-generate grid when resized
    const oldWidth = width;
    const oldHeight = height;
    
    // Animation loop
    const render = () => {
      timeRef.current += 0.01;
      const time = timeRef.current;

      // Check if width/height changed and regenerate grid
      if (width !== canvas.clientWidth || height !== canvas.clientHeight) {
        generateGrid();
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse movement interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      // Draw custom glow underneath (if glowColor is active and mouse is on-screen)
      if (glowColor && mouse.x > -500 && mouse.y > -500) {
        ctx.save();
        const glowGrad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, glowRadius
        );
        glowGrad.addColorStop(0, glowColor);
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      // Draw dots
      const numDots = dots.length;
      
      // We will draw all dots in a single path or batch by pre-calculating the color gradient
      const linearGrad = ctx.createLinearGradient(0, 0, width, height);
      linearGrad.addColorStop(0, gradientFrom);
      linearGrad.addColorStop(1, gradientTo);
      ctx.fillStyle = linearGrad;

      for (let i = 0; i < numDots; i++) {
        const dot = dots[i];
        
        let x = dot.baseX;
        let y = dot.baseY;

        // Apply wave amplitude oscillation
        if (waveAmplitude > 0) {
          y += Math.sin(time + (dot.baseX * 0.01)) * waveAmplitude;
          x += Math.cos(time + (dot.baseY * 0.01)) * waveAmplitude;
        }

        // Calculate interaction with cursor
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const distSq = dx * dx + dy * dy;
        const cursorRadiusSq = cursorRadius * cursorRadius;

        let renderX = x;
        let renderY = y;

        if (distSq < cursorRadiusSq) {
          const dist = Math.sqrt(distSq) || 0.001;
          const pct = 1 - dist / cursorRadius; // 1 at cursor, 0 at outer edge

          // Force calculates bulge/displacement
          if (bulgeOnly) {
            // Push outwards radially
            const force = pct * bulgeStrength;
            renderX = x + (dx / dist) * force;
            renderY = y + (dy / dist) * force;
          } else {
            // Apply standard gravitational force pull
            const force = pct * cursorForce * 100;
            renderX = x - (dx / dist) * force;
            renderY = y - (dy / dist) * force;
          }
        }

        // Apply sparkle effect
        let opacityMultiplier = 1;
        if (sparkle) {
          // Subtle sparkling flicker
          opacityMultiplier = 0.5 + Math.sin(time * 5 + dot.randomOffset) * 0.5;
        }

        // Check bounds before drawing to optimize rendering
        if (renderX >= -10 && renderX <= width + 10 && renderY >= -10 && renderY <= height + 10) {
          ctx.beginPath();
          ctx.arc(renderX, renderY, dotRadius, 0, Math.PI * 2);
          
          if (sparkle) {
            ctx.save();
            ctx.globalAlpha = opacityMultiplier;
            ctx.fill();
            ctx.restore();
          } else {
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [
    dotRadius,
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    glowRadius,
    sparkle,
    waveAmplitude,
    gradientFrom,
    gradientTo,
    glowColor
  ]);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      <canvas ref={canvasRef} className="block absolute inset-0 pointer-events-none" />
    </div>
  );
}
