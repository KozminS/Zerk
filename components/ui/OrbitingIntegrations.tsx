"use client";
import { useEffect, useState, memo } from "react";

interface NodeConfig {
  id: string;
  x: number; // offset from center in px
  y: number;
  size: number;
  icon: () => React.JSX.Element;
  label: string;
  orbitRadius: number;
  speed: number;
  phaseShift: number;
}

/* ── Minimalist white icons ── */
const Icons = {
  signal: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" stroke="#0c0c0f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  star: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  chat: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  chevronDown: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <polyline points="6 9 12 15 18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  loader: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  circle: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.8"/>
      <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.8"/>
    </svg>
  ),
  zap: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
};

const nodesConfig: NodeConfig[] = [
  { id: "n1", orbitRadius: 100, size: 44, speed: 0.18,  phaseShift: Math.PI * 1.35, icon: Icons.star,        label: "AmoCRM",    x: 0, y: 0 },
  { id: "n2", orbitRadius: 100, size: 40, speed: 0.18,  phaseShift: Math.PI * 0.1,  icon: Icons.chat,        label: "Telegram",  x: 0, y: 0 },
  { id: "n3", orbitRadius: 155, size: 44, speed: -0.12, phaseShift: Math.PI * 1.7,  icon: Icons.chevronDown, label: "WhatsApp",  x: 0, y: 0 },
  { id: "n4", orbitRadius: 155, size: 40, speed: -0.12, phaseShift: Math.PI * 0.55, icon: Icons.loader,      label: "Битрикс24", x: 0, y: 0 },
  { id: "n5", orbitRadius: 200, size: 42, speed: 0.09,  phaseShift: Math.PI * 1.1,  icon: Icons.circle,      label: "ЦИАН",      x: 0, y: 0 },
  { id: "n6", orbitRadius: 200, size: 38, speed: 0.09,  phaseShift: Math.PI * 0.0,  icon: Icons.zap,         label: "Авито",     x: 0, y: 0 },
];

const OrbitNode = memo(({ config, angle }: { config: NodeConfig; angle: number }) => {
  const [hovered, setHovered] = useState(false);
  const x = Math.cos(angle) * config.orbitRadius;
  const y = Math.sin(angle) * config.orbitRadius;
  const Icon = config.icon;

  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{
        width: config.size,
        height: config.size,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: hovered ? 20 : 10,
        transition: "z-index 0s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-full h-full rounded-full flex items-center justify-center p-2.5 transition-all duration-300 cursor-pointer"
        style={{
          background: hovered ? "rgba(30,30,35,0.98)" : "rgba(18,18,22,0.95)",
          border: `1px solid ${hovered ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)"}`,
          boxShadow: hovered ? "0 0 18px rgba(207,254,37,0.15)" : "none",
          transform: hovered ? "scale(1.15)" : "scale(1)",
        }}
      >
        <Icon />
      </div>
      {hovered && (
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-card border border-white/10 rounded text-[11px] text-white/70 whitespace-nowrap pointer-events-none">
          {config.label}
        </div>
      )}
    </div>
  );
});
OrbitNode.displayName = "OrbitNode";

export default function OrbitingIntegrations() {
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    let rafId: number;
    let last = performance.now();
    const tick = (now: number) => {
      setTime((t) => t + (now - last) / 1000);
      last = now;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [paused]);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-[440px] h-[440px] flex items-center justify-center">

        {/* Concentric rings */}
        {[100, 155, 200].map((r) => (
          <div
            key={r}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: r * 2,
              height: r * 2,
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          />
        ))}

        {/* Center accent circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: "#cffe25",
              boxShadow: "0 0 40px rgba(207,254,37,0.45), 0 0 80px rgba(207,254,37,0.15)",
            }}
          >
            <div className="w-9 h-9">
              <Icons.signal />
            </div>
          </div>
        </div>

        {/* Orbiting nodes */}
        {nodesConfig.map((cfg) => (
          <OrbitNode
            key={cfg.id}
            config={cfg}
            angle={time * cfg.speed + cfg.phaseShift}
          />
        ))}
      </div>
    </div>
  );
}
