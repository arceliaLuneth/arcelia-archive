"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

type LoadingScreenProps = {
  duration?: number;
  onComplete?: () => void;
};

export default function LoadingScreen({
  duration = 3800,
  onComplete,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const next = Math.min(100, (elapsed / duration) * 100);
      setProgress(next);

      if (elapsed < duration) {
        raf = window.requestAnimationFrame(tick);
        return;
      }

      gsap.to(".loading-shell", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          setVisible(false);
          onComplete?.();
        },
      });
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [duration, onComplete]);

  if (!visible) return null;

  return (
    <div
      className="loading-shell fixed inset-0 z-[200] overflow-hidden bg-[#020617] text-white"
      aria-label="Loading screen"
    >
      {/* Soft ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_42%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_30%,transparent_70%,rgba(255,255,255,0.02))]" />

      {/* Left edge system mark */}
      <div className="absolute left-5 top-5 z-10 text-[0.62rem] uppercase tracking-[0.55em] text-sky-200/80">
        Initializing
      </div>

      {/* Vertical progress rail */}
      <div className="absolute left-5 top-14 bottom-5 w-px bg-white/10 overflow-hidden">
        <div
          className="absolute left-0 top-0 w-px bg-gradient-to-b from-sky-300 via-cyan-200 to-white shadow-[0_0_18px_rgba(125,211,252,0.95)]"
          style={{ height: `${progress}%` }}
        />
      </div>

      {/* Minimal side detail */}
      <div className="absolute left-10 top-14 text-[0.65rem] uppercase tracking-[0.45em] text-slate-400">
        Archive Boot
      </div>

      {/* Small status on bottom left */}
      <div className="absolute left-10 bottom-6 text-[0.62rem] uppercase tracking-[0.45em] text-slate-500">
        {String(Math.round(progress)).padStart(3, "0")}
      </div>

      {/* Simple corner accents */}
      <div className="pointer-events-none absolute right-6 top-6 text-slate-500/70">✦</div>
      <div className="pointer-events-none absolute right-6 bottom-6 text-slate-500/70">✦</div>
    </div>
  );
}
