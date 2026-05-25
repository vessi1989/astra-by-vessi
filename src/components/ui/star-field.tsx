"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  prevZ: number;
}

export function StarField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const NUM_STARS = 800;
    const SPEED = 2;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animId: number;

    canvas.width = width;
    canvas.height = height;

    const stars: Star[] = Array.from({ length: NUM_STARS }, () => ({
      x: Math.random() * width - width / 2,
      y: Math.random() * height - height / 2,
      z: Math.random() * width,
      prevZ: 0,
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (const star of stars) {
        star.prevZ = star.z;
        star.z -= SPEED;

        if (star.z <= 0) {
          star.x = Math.random() * width - cx;
          star.y = Math.random() * height - cy;
          star.z = width;
          star.prevZ = star.z;
        }

        const sx = (star.x / star.z) * width + cx;
        const sy = (star.y / star.z) * width + cy;
        const px = (star.x / star.prevZ) * width + cx;
        const py = (star.y / star.prevZ) * width + cy;

        const size = Math.max(0.5, (1 - star.z / width) * 3);
        const brightness = 1 - star.z / width;

        // Draw streak
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = `rgba(${Math.floor(180 + brightness * 75)}, ${Math.floor(160 + brightness * 75)}, 255, ${brightness * 0.9})`;
        ctx.lineWidth = size;
        ctx.stroke();

        // Draw star dot
        ctx.beginPath();
        ctx.arc(sx, sy, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 200, 255, ${brightness})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ background: "transparent" }}
    />
  );
}
