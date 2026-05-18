import React, { useEffect, useRef } from 'react';

export default function DenimCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d');
    const patternCanvas = document.createElement('canvas');
    const patternContext = patternCanvas.getContext('2d');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrame;
    let offset = 0;

    const drawPattern = () => {
      patternCanvas.width = 96;
      patternCanvas.height = 96;
      patternContext.clearRect(0, 0, patternCanvas.width, patternCanvas.height);

      patternContext.lineWidth = 1;
      for (let i = -96; i < 192; i += 4) {
        patternContext.beginPath();
        patternContext.strokeStyle = i % 8 === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)';
        patternContext.moveTo(i, 96);
        patternContext.lineTo(i + 96, 0);
        patternContext.stroke();
      }

      patternContext.lineWidth = 2;
      patternContext.strokeStyle = 'rgba(255,255,255,0.015)';
      for (let i = -96; i < 192; i += 8) {
        patternContext.beginPath();
        patternContext.moveTo(i, 0);
        patternContext.lineTo(i + 96, 96);
        patternContext.stroke();
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const pattern = context.createPattern(patternCanvas, 'repeat');

      context.clearRect(0, 0, width, height);
      context.save();
      context.translate((offset % 96) - 96, (offset % 96) - 96);
      context.fillStyle = pattern;
      context.fillRect(0, 0, width + 192, height + 192);
      context.restore();

      if (!prefersReduced) {
        offset += 0.3;
        animationFrame = requestAnimationFrame(render);
      }
    };

    drawPattern();
    resize();

    const observer = new ResizeObserver(() => {
      resize();
      if (prefersReduced) render();
    });

    observer.observe(canvas);
    render();

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      aria-hidden="true"
    />
  );
}
