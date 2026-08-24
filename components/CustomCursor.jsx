import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(true);

  const mouseRef = useRef({ x: -200, y: -200, lastX: -200, lastY: -200 });
  const dotRef = useRef({ x: -200, y: -200 });
  const ringRef = useRef({ x: -200, y: -200 });

  const hoverStateRef = useRef('idle'); // idle | button | card | link | image | icon
  const hoveredElRef = useRef(null);

  const clickScaleRef = useRef(1);
  const idleTickRef = useRef(0);
  const trailRef = useRef([]);
  const ripplesRef = useRef([]);
  const ringRotationRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const check = () => setIsMobile(mq.matches);
    check();
    mq.addEventListener('change', check);
    if (mq.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    const onMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      idleTickRef.current = 0;
    };

    const onOver = (e) => {
      const t = e.target;
      if (!t) return;
      const btn = t.closest('button, .btn-primary, .btn-secondary, [role="button"]');
      const lnk = t.closest('a');
      const img = t.closest('img, .profile-image, figure');
      const crd = t.closest('.glass-card, .stat-card');
      const ico = t.closest('.tech-pill, svg');

      if (btn)      { hoverStateRef.current = 'button'; hoveredElRef.current = btn; }
      else if (img) { hoverStateRef.current = 'image';  hoveredElRef.current = img; }
      else if (lnk) { hoverStateRef.current = 'link';   hoveredElRef.current = lnk; }
      else if (ico) { hoverStateRef.current = 'icon';   hoveredElRef.current = ico; }
      else if (crd) { hoverStateRef.current = 'card';   hoveredElRef.current = crd; }
      else          { hoverStateRef.current = 'idle';   hoveredElRef.current = null; }
    };

    const onDown = () => {
      clickScaleRef.current = 0.7;
      ripplesRef.current.push({
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        r: 2,
        maxR: 45,
        alpha: 0.7,
      });
    };

    const onUp = () => {
      clickScaleRef.current = 1.2;
      setTimeout(() => { clickScaleRef.current = 1; }, 200);
    };

    const onScroll = () => {
      for (let i = 0; i < 2; i++) {
        trailRef.current.push({
          x: mouseRef.current.x + (Math.random() - 0.5) * 12,
          y: mouseRef.current.y + (Math.random() - 0.5) * 12,
          r: Math.random() * 2.5 + 1,
          alpha: 0.5,
          decay: 0.04,
          // cream dust color
          color: Math.random() > 0.5 ? 'rgba(200, 169, 119,' : 'rgba(0, 0, 0,',
        });
      }
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('scroll', onScroll);

    dotRef.current = { x: -200, y: -200 };
    ringRef.current = { x: -200, y: -200 };

    const render = () => {
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const state = hoverStateRef.current;
      const scale = clickScaleRef.current;

      idleTickRef.current++;
      ringRotationRef.current += state === 'card' ? 0.025 : 0;

      // Magnetic pull for buttons/icons
      let tx = mx, ty = my;
      if (hoveredElRef.current && (state === 'button' || state === 'icon')) {
        const r = hoveredElRef.current.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        tx = mx + (cx - mx) * 0.25;
        ty = my + (cy - my) * 0.25;
      }

      // Spring interpolation
      dotRef.current.x  += (tx - dotRef.current.x)  * 0.4;
      dotRef.current.y  += (ty - dotRef.current.y)  * 0.4;
      ringRef.current.x += (tx - ringRef.current.x) * 0.15;
      ringRef.current.y += (ty - ringRef.current.y) * 0.15;

      const dx = dotRef.current.x;
      const dy = dotRef.current.y;
      const rx = ringRef.current.x;
      const ry = ringRef.current.y;

      // Emit trail when moving
      const moved = Math.hypot(mx - mouseRef.current.lastX, my - mouseRef.current.lastY);
      if (moved > 6 && trailRef.current.length < 28) {
        trailRef.current.push({
          x: dx + (Math.random() - 0.5) * 4,
          y: dy + (Math.random() - 0.5) * 4,
          r: Math.random() * 1.8 + 0.8,
          alpha: 0.45,
          decay: 0.022,
          color: 'rgba(0, 0, 0,',
        });
        mouseRef.current.lastX = mx;
        mouseRef.current.lastY = my;
      }

      // Draw trail
      trailRef.current = trailRef.current.filter(p => {
        p.alpha -= p.decay;
        if (p.alpha <= 0) return false;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.alpha, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.fill();
        return true;
      });

      // Draw ripples
      ripplesRef.current = ripplesRef.current.filter(rip => {
        rip.r += (rip.maxR - rip.r) * 0.1;
        rip.alpha -= 0.03;
        if (rip.alpha <= 0) return false;
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200, 169, 119, ${rip.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        return true;
      });

      // Idle breathing
      const breathe = state === 'idle'
        ? Math.sin(idleTickRef.current * 0.035) * 1.5
        : 0;

      // ── Draw cursor based on state ──
      if (state === 'button') {
        // Large filled black circle with cream border
        const r = 24 * scale;
        ctx.beginPath();
        ctx.arc(dx, dy, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(17, 17, 17, 0.85)';
        ctx.fill();
        ctx.strokeStyle = '#E8DDCF';
        ctx.lineWidth = 1.5;
        ctx.stroke();

      } else if (state === 'image') {
        // Ring with "View" text
        const r = 30 * scale;
        ctx.beginPath();
        ctx.arc(rx, ry, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(17, 17, 17, 0.75)';
        ctx.fill();

        ctx.font = '700 9px Inter, system-ui';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('VIEW', rx, ry);
        ctx.textAlign = 'left';

      } else if (state === 'link') {
        // Elegant arrow with outer ring
        const r = 20 * scale;
        ctx.beginPath();
        ctx.arc(rx, ry, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(17, 17, 17, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Small arrow
        ctx.save();
        ctx.translate(dx, dy);
        ctx.beginPath();
        ctx.moveTo(-4, 4);
        ctx.lineTo(4, -4);
        ctx.lineTo(-2, -4);
        ctx.moveTo(4, -4);
        ctx.lineTo(4, 2);
        ctx.strokeStyle = '#111111';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

      } else if (state === 'card') {
        // Rotating outer ring
        const r = (26 + breathe) * scale;
        ctx.save();
        ctx.translate(rx, ry);
        ctx.rotate(ringRotationRef.current);
        ctx.translate(-rx, -ry);

        ctx.beginPath();
        ctx.arc(rx, ry, r, 0, Math.PI * 2);
        ctx.setLineDash([6, 5]);
        ctx.strokeStyle = 'rgba(200, 169, 119, 0.7)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        // Inner dot
        ctx.beginPath();
        ctx.arc(dx, dy, 3 * scale, 0, Math.PI * 2);
        ctx.fillStyle = '#111111';
        ctx.fill();

      } else if (state === 'icon') {
        // Outer ring with gold tint + dot
        const r = 20 * scale;
        ctx.beginPath();
        ctx.arc(rx, ry, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(200, 169, 119, 0.8)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(dx, dy, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#C8A977';
        ctx.fill();

      } else {
        // ── Idle State: small black dot + cream ring ──
        const outerR = (14 + breathe) * scale;

        // Outer cream ring
        ctx.beginPath();
        ctx.arc(rx, ry, outerR, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Inner black dot
        ctx.beginPath();
        ctx.arc(dx, dy, 3 * scale, 0, Math.PI * 2);
        ctx.fillStyle = '#111111';
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('scroll', onScroll);
      mq.removeEventListener('change', check);
      cancelAnimationFrame(animId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[99999]"
    />
  );
}
