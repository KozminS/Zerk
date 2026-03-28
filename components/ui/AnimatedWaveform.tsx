"use client";
import { useEffect, useRef, useState } from "react";

const BAR_COUNT = 48;

// Generates a natural speech-like waveform frame
function generateHeights(timestamp: number): number[] {
  const t = timestamp / 1000;

  // Two overlapping speech envelopes → simulate turn-taking / natural rhythm
  const envelope1 = Math.max(0, Math.sin(t * 1.6) * Math.sin(t * 0.5 + 0.8));
  const envelope2 = Math.max(0, Math.sin(t * 2.1 + 1.2) * Math.sin(t * 0.9));
  const envelope = Math.max(envelope1, envelope2);

  const isSpeaking = envelope > 0.08;

  return Array.from({ length: BAR_COUNT }, (_, i) => {
    if (!isSpeaking) {
      // Quiet noise — tiny bars
      return 6 + Math.random() * 8;
    }

    // Combine two sine waves at different frequencies to mimic formants
    const wave1 = (Math.sin(i * 0.35 + t * 14) * 0.5 + 0.5);
    const wave2 = (Math.sin(i * 0.7  + t * 9  + 1) * 0.3 + 0.7);
    const noise  = Math.random() * 0.25;

    const raw = (wave1 * wave2 + noise) * envelope * 90 + 8;
    return Math.min(95, Math.max(5, raw));
  });
}

export default function AnimatedWaveform() {
  const [heights, setHeights] = useState<number[]>(
    Array.from({ length: BAR_COUNT }, () => 12)
  );
  const rafRef   = useRef<number>(0);
  const lastRef  = useRef<number>(0);

  useEffect(() => {
    const loop = (ts: number) => {
      // ~24 fps — fast enough to look live, cheap on CPU
      if (ts - lastRef.current >= 42) {
        lastRef.current = ts;
        setHeights(generateHeights(ts));
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="flex items-end gap-[3px] h-12 w-full">
      {heights.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-full bg-accent/70"
          style={{
            height: `${h}%`,
            // stagger transition so bars don't all move in sync
            transition: `height ${55 + (i % 5) * 8}ms ease-out`,
          }}
        />
      ))}
    </div>
  );
}
