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
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove);

    const mkParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.35 + 0.08),
      baseVy: -(Math.random() * 0.35 + 0.08),
      size: Math.random() * 2.4 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      opacityDir: (Math.random() - 0.5) * 0.004,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });

    const particles: Particle[] = Array.from({ length: 55 }, mkParticle);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;

      for (const p of particles) {
        /* mouse repulsion */
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130 && dist > 0) {
          const force = ((130 - dist) / 130) * 0.06;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        /* gentle drift back to base speed */
        p.vx *= 0.98;
        p.vy = p.vy * 0.98 + p.baseVy * 0.02;

        p.x += p.vx;
        p.y += p.vy;

        /* opacity flicker */
        p.opacity += p.opacityDir;
        if (p.opacity > 0.75 || p.opacity < 0.05) p.opacityDir *= -1;

        /* wrap */
        if (p.x < 0)             p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < -10)           p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        /* draw core */
        ctx.globalAlpha = p.opacity * 0.55;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        /* draw glow halo */
        if (p.size > 1.2) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
          g.addColorStop(0, p.color);
          g.addColorStop(1, 'transparent');
          ctx.globalAlpha = p.opacity * 0.18;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        ctx.globalAlpha = 1;
      }

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
      style={{ opacity: 0.55 }}
    />
  );
};

export default IslamicParticles;
