"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
};

type Packet = {
  a: number;
  b: number;
  t: number;
  speed: number;
};

type Accent = { r: number; g: number; b: number };

function hexToRgb(hex: string): Accent {
  const value = hex.replace("#", "").trim();
  if (value.length === 3) {
    return {
      r: Number.parseInt(value[0] + value[0], 16),
      g: Number.parseInt(value[1] + value[1], 16),
      b: Number.parseInt(value[2] + value[2], 16),
    };
  }
  if (value.length !== 6) {
    return { r: 25, g: 181, b: 198 };
  }

  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

function readAccent(): Accent {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--section-accent")
    .trim();
  return hexToRgb(raw || "#19b5c6");
}

export default function HeroBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parent = canvas.parentElement;
    let raf = 0;
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let running = true;
    let visible = document.visibilityState !== "hidden";
    let tick = 0;
    let accent = readAccent();

    const seed = () => {
      const count = Math.min(58, Math.max(28, Math.round((width * height) / 17000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.26,
        vy: (Math.random() - 0.5) * 0.26,
        r: Math.random() * 1.35 + 1.05,
        pulse: Math.random() > 0.78 ? Math.random() : -1,
      }));
      packets = Array.from({ length: Math.max(7, Math.round(count / 6)) }, () => ({
        a: Math.floor(Math.random() * count),
        b: Math.floor(Math.random() * count),
        t: Math.random(),
        speed: 0.0032 + Math.random() * 0.0042,
      }));
    };

    const resize = () => {
      const rect = parent?.getBoundingClientRect() ?? canvas.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.floor(rect.width));
      const nextHeight = Math.max(1, Math.floor(rect.height));
      const sizeChanged =
        Math.abs(nextWidth - width) > 48 || Math.abs(nextHeight - height) > 48;
      width = nextWidth;
      height = nextHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodes.length === 0 || sizeChanged) {
        seed();
      }
    };

    const pickNeighbor = (index: number, maxDist: number) => {
      const from = nodes[index];
      let best = (index + 1) % nodes.length;
      let bestDist = Number.POSITIVE_INFINITY;
      for (let i = 0; i < nodes.length; i += 1) {
        if (i === index) {
          continue;
        }
        const dist = Math.hypot(from.x - nodes[i].x, from.y - nodes[i].y);
        if (dist < bestDist && dist < maxDist * 1.4) {
          bestDist = dist;
          best = i;
        }
      }
      return best;
    };

    const paint = () => {
      if (tick % 45 === 0) {
        accent = readAccent();
      }
      tick += 1;

      const { r, g, b } = accent;
      const dark = document.documentElement.classList.contains("dark");
      const lineAlpha = dark ? 0.18 : 0.11;
      const nodeAlpha = dark ? 0.62 : 0.4;
      const maxDist = Math.min(168, Math.max(96, width * 0.118));

      context.clearRect(0, 0, width, height);

      if (!reduced) {
        for (const node of nodes) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.pulse >= 0) {
            node.pulse += 0.008;
          }
          if (node.x < 0 || node.x > width) {
            node.vx *= -1;
          }
          if (node.y < 0 || node.y > height) {
            node.vy *= -1;
          }
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist > maxDist) {
            continue;
          }
          const strength = 1 - dist / maxDist;
          context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineAlpha * strength})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(nodes[i].x, nodes[i].y);
          context.lineTo(nodes[j].x, nodes[j].y);
          context.stroke();
        }
      }

      if (!reduced) {
        for (const packet of packets) {
          packet.t += packet.speed;
          if (packet.t > 1) {
            packet.t = 0;
            packet.a = Math.floor(Math.random() * nodes.length);
            packet.b = pickNeighbor(packet.a, maxDist);
          }
          const from = nodes[packet.a];
          const to = nodes[packet.b];
          if (!from || !to) {
            continue;
          }
          const dist = Math.hypot(from.x - to.x, from.y - to.y);
          if (dist > maxDist * 1.45) {
            continue;
          }
          const x = from.x + (to.x - from.x) * packet.t;
          const y = from.y + (to.y - from.y) * packet.t;
          context.fillStyle = `rgba(${r}, ${g}, ${b}, ${dark ? 0.92 : 0.72})`;
          context.beginPath();
          context.arc(x, y, 1.7, 0, Math.PI * 2);
          context.fill();
        }
      }

      for (const node of nodes) {
        const pulse = node.pulse >= 0 ? ((node.pulse % 1) + 1) % 1 : -1;
        if (!reduced && pulse >= 0 && pulse < 0.55) {
          context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.22 * (1 - pulse / 0.55)})`;
          context.lineWidth = 1;
          context.beginPath();
          context.arc(node.x, node.y, node.r + pulse * 10, 0, Math.PI * 2);
          context.stroke();
        }
        context.fillStyle = `rgba(${r}, ${g}, ${b}, ${nodeAlpha})`;
        context.beginPath();
        context.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        context.fill();
      }
    };

    const loop = () => {
      if (!running) {
        return;
      }
      if (visible) {
        paint();
      }
      if (!reduced) {
        raf = window.requestAnimationFrame(loop);
      }
    };

    const onVisibility = () => {
      visible = document.visibilityState !== "hidden";
    };

    resize();
    paint();
    if (!reduced) {
      raf = window.requestAnimationFrame(loop);
    }

    const observer = new ResizeObserver(resize);
    if (parent) {
      observer.observe(parent);
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="hero-backdrop" aria-hidden="true">
      <div className="hero-backdrop__glow" />
      <div className="hero-backdrop__floor" />
      <div className="hero-backdrop__grid" />
      <div className="hero-backdrop__orb hero-backdrop__orb--a" />
      <div className="hero-backdrop__orb hero-backdrop__orb--b" />
      <div className="hero-backdrop__orb hero-backdrop__orb--c" />
      <canvas ref={canvasRef} className="hero-backdrop__network" />
      <div className="hero-backdrop__scan" />
      <div className="hero-backdrop__vignette" />
    </div>
  );
}
