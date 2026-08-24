import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // ── Cream Orbs (large, slow, blurred) ──
    class CreamOrb {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 250 + 150;
        this.vx = (Math.random() - 0.5) * 0.08;
        this.vy = (Math.random() - 0.5) * 0.06;
        // Warm cream / sand / parchment tones
        const palette = [
          'rgba(232, 221, 207, ',
          'rgba(239, 232, 221, ',
          'rgba(248, 245, 240, ',
          'rgba(200, 169, 119, ',
          'rgba(217, 206, 190, ',
        ];
        this.color = palette[Math.floor(Math.random() * palette.length)];
        this.opacity = Math.random() * 0.18 + 0.06;
        this.phase = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.001 + 0.0005;
      }

      update() {
        this.x += this.vx + Math.sin(time * this.speed + this.phase) * 0.3;
        this.y += this.vy + Math.cos(time * this.speed + this.phase) * 0.2;

        // Soft wrap around edges
        if (this.x < -this.radius) this.x = width + this.radius;
        if (this.x > width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = height + this.radius;
        if (this.y > height + this.radius) this.y = -this.radius;
      }

      draw() {
        const grad = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        grad.addColorStop(0, this.color + this.opacity + ')');
        grad.addColorStop(0.5, this.color + (this.opacity * 0.35) + ')');
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // ── Floating Dust Particles ──
    class DustParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + 20;
        this.size = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = -(Math.random() * 0.5 + 0.2);
        this.opacity = Math.random() * 0.18 + 0.04;
        this.maxLife = Math.random() * 600 + 200;
        this.life = 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;

        if (this.y < -20 || this.life > this.maxLife) {
          this.reset();
        }
      }

      draw() {
        const progress = this.life / this.maxLife;
        const fade = progress < 0.1 ? progress * 10 :
                     progress > 0.85 ? (1 - progress) / 0.15 : 1;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity * fade})`;
        ctx.fill();
      }
    }

    // Initialize objects
    const orbs = Array.from({ length: 7 }, () => new CreamOrb());
    const dust = Array.from({ length: 25 }, () => {
      const p = new DustParticle();
      // Scatter initial positions
      p.y = Math.random() * height;
      p.life = Math.random() * p.maxLife;
      return p;
    });

    // Animation Loop
    const animate = () => {
      time += 0.5;

      // Clear with base cream color
      ctx.fillStyle = '#F8F5F0';
      ctx.fillRect(0, 0, width, height);

      // Draw cream orbs
      orbs.forEach(orb => {
        orb.update();
        orb.draw();
      });

      // Draw dust particles
      dust.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Very subtle warm grid */}
      <div className="absolute inset-0 animated-grid opacity-[0.4]" />

      {/* Edge vignette — very soft */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(239, 232, 221, 0.4) 100%)',
        }}
      />
    </div>
  );
}
