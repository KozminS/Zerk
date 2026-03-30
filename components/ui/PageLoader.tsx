"use client";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Animate progress bar: 0 → ~80% quickly, then 80 → 100% on load
    let raf: number;
    const startTime = performance.now();
    const fastDuration = 600; // ms to reach 80%

    const animateFast = (now: number) => {
      const t = Math.min((now - startTime) / fastDuration, 1);
      const ease = 1 - Math.pow(1 - t, 2);
      setProgress(ease * 80);
      if (t < 1) raf = requestAnimationFrame(animateFast);
    };
    raf = requestAnimationFrame(animateFast);

    const onLoad = () => {
      cancelAnimationFrame(raf);
      // Jump to 100%
      setProgress(100);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setVisible(false), 1000);
      }, 150);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 1s ease",
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      {/* Logo */}
      <span className="text-h3 font-bold text-white select-none">Zerk</span>

      {/* Single progress bar */}
      <div className="mt-14 w-[380px] max-w-[70vw] h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-white/70 rounded-full"
          style={{
            width: `${progress}%`,
            transition: "width 0.1s linear",
          }}
        />
      </div>
    </div>
  );
}
