import React, { useEffect, useRef } from 'react';

const COLORS = ['#C9A84C', '#E8D5A3', '#F5E6C0', '#B8952A', '#FFE082'];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  baseVy: number;
  size: number;
  opacity: number;
  opacityDir: number;
  color: string;
}

const IslamicParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Lower resolution on mobile/low-DPI for better performance
    const dpr = Math.min(window.devicePixelRatio ?? 1, 1.5);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width  = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width  = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Throttle mouse updates — only store position, no computation here
    let mx = -9999, my = -9999;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener('mousemove', onMove, { passive: true });

    // Fewer particles on mobile
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 20 : 32;

    const mkParticle = (): Particle => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.22,
      vy: -(Math.random() * 0.32 + 0.07),
      baseVy: -(Math.random() * 0.32 + 0.07),
      size: Math.random() * 2.2 + 0.5,
      opacity: Math.random() * 0.45 + 0.08,
      opacityDir: (Math.random() - 0.5) * 0.003,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });

    const particles: Particle[] = Array.from({ length: COUNT }, mkParticle);

    const draw = () => {
      // Pause when tab is hidden
      if (document.hidden) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const W = window.innerWidth;
      const H = window.innerHeight;
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        // Mouse repulsion — only on desktop
        if (!isMobile) {
          const dx = p.x - mx, dy = p.y - my;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 16900 && dist2 > 0) { // 130^2
            const dist = Math.sqrt(dist2);
            const force = ((130 - dist) / 130) * 0.055;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Gentle drift back to base speed
        p.vx *= 0.98;
        p.vy = p.vy * 0.98 + p.baseVy * 0.02;

        p.x += p.vx;
        p.y += p.vy;

        // Opacity flicker
        p.opacity += p.opacityDir;
        if (p.opacity > 0.7 || p.opacity < 0.04) p.opacityDir *= -1;

        // Wrap
        if (p.x < 0)      p.x = W;
        if (p.x > W)      p.x = 0;
        if (p.y < -10)    p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // Draw core only — no per-frame gradient (expensive)
        ctx.globalAlpha = p.opacity * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.6, willChange: 'transform' }}
    />
  );
};

export default IslamicParticles;
