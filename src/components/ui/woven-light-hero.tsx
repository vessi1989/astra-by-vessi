"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import * as THREE from "three";

export const WovenLightHero = () => {
  const textControls = useAnimation();
  const buttonControls = useAnimation();

  useEffect(() => {
    textControls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.04 + 0.6, duration: 1, ease: [0.2, 0.65, 0.3, 0.9] },
    }));
    buttonControls.start({ opacity: 1, transition: { delay: 1.8, duration: 0.8 } });
  }, [textControls, buttonControls]);

  return (
    <div className="relative flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-black">
      {/* Three.js canvas — sits behind everything */}
      <WovenCanvas />

      {/* Dark radial gradient behind text so it stays readable */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.82) 0%, transparent 100%)",
        }}
      />
      {/* Subtle cyan core glow — premium depth */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 52%, rgba(56,189,248,0.055) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 pointer-events-none select-none">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-8 inline-flex items-center gap-2"
        >
          <span className="text-[12px] uppercase tracking-[0.28em] text-sky-400/90 font-semibold border border-sky-500/25 px-4 py-1.5 rounded-full bg-sky-500/8 backdrop-blur-sm">
            AI-Powered B2B Sales Agency
          </span>
        </motion.div>

        {/* ASTRA — plain white, crisp */}
        <h1 className="text-[clamp(72px,14vw,160px)] font-black leading-none tracking-[-0.03em] text-white">
          {"ASTRA".split("").map((char, j) => (
            <motion.span
              key={j}
              custom={j}
              initial={{ opacity: 0, y: 60 }}
              animate={textControls}
              className="inline-block"
              style={{
                filter: "drop-shadow(0 0 60px rgba(255,255,255,0.12))",
              }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Tagline */}
        <motion.p
          custom={7}
          initial={{ opacity: 0, y: 24 }}
          animate={textControls}
          className="mt-6 text-[clamp(19px,2.6vw,28px)] font-light text-white/65 tracking-wide"
        >
          We Automate Your Growth.&nbsp;
          <span className="text-sky-400 font-normal">You Close More Deals.</span>
        </motion.p>

        {/* Sub-copy */}
        <motion.p
          custom={9}
          initial={{ opacity: 0, y: 16 }}
          animate={textControls}
          className="mt-5 max-w-xl mx-auto text-[15px] text-white/40 leading-relaxed"
        >
          AI lead generation · intelligent outreach · conversational sales agents · pipeline acceleration
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={buttonControls}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center pointer-events-auto"
        >
          {/* Primary CTA — extended glow halo */}
          <div className="relative inline-flex">
            <div className="absolute -inset-[14px] rounded-full bg-sky-500/25 blur-2xl pointer-events-none" />
            <div className="absolute -inset-[6px] rounded-full bg-sky-400/15 blur-md pointer-events-none" />
            <button
              onClick={() => window.open("https://www.instagram.com/vessi_minev/", "_blank")}
              className="relative px-11 py-4 rounded-full text-[14px] font-bold text-white uppercase tracking-widest bg-sky-500 hover:bg-sky-400 transition-all duration-200 shadow-[0_0_40px_rgba(56,189,248,0.65)] hover:shadow-[0_0_60px_rgba(56,189,248,0.9)] cursor-pointer"
            >
              Book a Strategy Call
            </button>
          </div>
          <button
            onClick={() => document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" })}
            className="px-9 py-4 rounded-full text-[13px] font-semibold text-white/60 uppercase tracking-widest border border-white/12 hover:border-white/30 hover:text-white/85 transition-all duration-200 backdrop-blur-sm cursor-pointer"
          >
            How It Works →
          </button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </div>
  );
};

/* ─── Three.js Canvas ─────────────────────────────────────────────────────── */
const WovenCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    /* ── Stars (cold, dim) ── */
    const STAR_COUNT = 2000;
    const starPos = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      starPos[i * 3]     = (Math.random() - 0.5) * 40;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xadd8e6,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    /* ── Torus-knot particle system (ice-blue palette) ── */
    const P_COUNT = 18000;
    const positions  = new Float32Array(P_COUNT * 3);
    const origPos    = new Float32Array(P_COUNT * 3);
    const velocities = new Float32Array(P_COUNT * 3);
    const pColors    = new Float32Array(P_COUNT * 3);

    const srcGeo = new THREE.TorusKnotGeometry(1.6, 0.45, 180, 24);

    for (let i = 0; i < P_COUNT; i++) {
      const vi = i % srcGeo.attributes.position.count;
      const x = srcGeo.attributes.position.getX(vi) + (Math.random() - 0.5) * 0.08;
      const y = srcGeo.attributes.position.getY(vi) + (Math.random() - 0.5) * 0.08;
      const z = srcGeo.attributes.position.getZ(vi) + (Math.random() - 0.5) * 0.08;

      positions[i * 3] = origPos[i * 3] = x;
      positions[i * 3 + 1] = origPos[i * 3 + 1] = y;
      positions[i * 3 + 2] = origPos[i * 3 + 2] = z;

      /* Ice-blue → slate-white gradient */
      const t = i / P_COUNT;
      const c = new THREE.Color();
      if (t < 0.5) {
        c.setRGB(0.22 + t * 0.4, 0.74 + t * 0.1, 0.98); // sky-blue
      } else {
        c.setRGB(0.8, 0.9, 1.0);                           // near-white
      }
      pColors[i * 3]     = c.r;
      pColors[i * 3 + 1] = c.g;
      pColors[i * 3 + 2] = c.b;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute("color",    new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.012,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.7,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    /* ── Mouse ── */
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    /* ── Animation ── */
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      const mx = mouse.x * 2, my = mouse.y * 2;

      for (let i = 0; i < P_COUNT; i++) {
        const ix = i * 3, iy = ix + 1, iz = ix + 2;
        const dx = mx - positions[ix];
        const dy = my - positions[iy];
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 1.0) {
          const f = (1.0 - dist) * 0.006;
          velocities[ix] -= (dx / dist) * f;
          velocities[iy] -= (dy / dist) * f;
        }
        velocities[ix] += (origPos[ix] - positions[ix]) * 0.0008;
        velocities[iy] += (origPos[iy] - positions[iy]) * 0.0008;
        velocities[iz] += (origPos[iz] - positions[iz]) * 0.0008;
        velocities[ix] *= 0.97;
        velocities[iy] *= 0.97;
        velocities[iz] *= 0.97;
        positions[ix] += velocities[ix];
        positions[iy] += velocities[iy];
        positions[iz] += velocities[iz];
      }
      pGeo.attributes.position.needsUpdate = true;

      points.rotation.y = t * 0.07;
      points.rotation.x = Math.sin(t * 0.025) * 0.15;
      starField.rotation.y = t * 0.008;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
      pGeo.dispose(); pMat.dispose();
      starGeo.dispose(); starMat.dispose();
      srcGeo.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};
