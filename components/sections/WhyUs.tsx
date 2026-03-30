"use client";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Illustration 1: Speedometer ── */
function GaugeIllustration() {
  // Arc center at (160, 175), radius 110
  // Sweep from 210° to 330° (240° total) — classic speedometer
  const cx = 160, cy = 175, r = 110;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  // Arc point helper
  const pt = (deg: number, radius = r) => ({
    x: cx + radius * Math.cos(toRad(deg)),
    y: cy + radius * Math.sin(toRad(deg)),
  });

  // Full arc: 210° → 330°  (going clockwise = large-arc=1, sweep=1)
  const arcPath = (startDeg: number, endDeg: number, radius = r) => {
    const s = pt(startDeg, radius);
    const e = pt(endDeg, radius);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  // Track: 210° → 330°
  const trackPath = arcPath(210, 330);
  // Filled: 210° → 295° (~71% filled)
  const filledPath = arcPath(210, 295);

  // Tick marks
  const ticks = [210, 240, 270, 300, 330];

  // Needle points at 295°
  const needleDeg = 295;
  const needleTip = pt(needleDeg, r - 18);
  const needleBase = pt(needleDeg + 90, 10);
  const needleBase2 = pt(needleDeg - 90, 10);

  return (
    <svg viewBox="0 0 320 220" fill="none" className="w-full h-full">
      <defs>
        {/* Glow filter for accent arc */}
        <filter id="gaugeGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Gradient along the arc */}
        <linearGradient id="arcGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cffe25" stopOpacity="1" />
          <stop offset="100%" stopColor="#cffe25" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Background track */}
      <path
        d={trackPath}
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="20"
        strokeLinecap="round"
        fill="none"
      />

      {/* Filled accent arc */}
      <path
        d={filledPath}
        stroke="url(#arcGrad)"
        strokeWidth="20"
        strokeLinecap="round"
        fill="none"
        filter="url(#gaugeGlow)"
      />

      {/* Tick marks */}
      {ticks.map((deg) => {
        const outer = pt(deg, r + 2);
        const inner = pt(deg, r - 28);
        const isMajor = deg === 210 || deg === 270 || deg === 330;
        return (
          <line key={deg}
            x1={outer.x} y1={outer.y}
            x2={inner.x} y2={inner.y}
            stroke={isMajor ? "rgba(255,255,255,0.30)" : "rgba(255,255,255,0.12)"}
            strokeWidth={isMajor ? 2 : 1.5}
            strokeLinecap="round"
          />
        );
      })}

      {/* Needle — tapered triangle */}
      <polygon
        points={`${needleTip.x},${needleTip.y} ${needleBase.x},${needleBase.y} ${needleBase2.x},${needleBase2.y}`}
        fill="white"
        opacity="0.95"
      />

      {/* Center hub outer ring */}
      <circle cx={cx} cy={cy} r="14"
        fill="#0a0a0d"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1.5"
      />
      {/* Center hub inner */}
      <circle cx={cx} cy={cy} r="7"
        fill="#0a0a0d"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1.5"
      />
      {/* Center accent dot */}
      <circle cx={cx} cy={cy} r="3" fill="#cffe25" />

      {/* Tip dot on arc end */}
      <circle
        cx={pt(295).x} cy={pt(295).y} r="5"
        fill="#cffe25"
        filter="url(#gaugeGlow)"
      />
    </svg>
  );
}

/* ── Illustration 2: Bar chart ── */
function BarChartIllustration() {
  const bars = [
    { h: 60, x: 60 },
    { h: 90, x: 110 },
    { h: 120, x: 160 },
    { h: 155, x: 210 },
  ];
  return (
    <svg viewBox="0 0 320 200" fill="none" className="w-full h-full">
      {/* Grid lines */}
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="40" y1={y} x2="280" y2={y}
          stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      {bars.map((b) => (
        <g key={b.x}>
          {/* Bar bg */}
          <rect x={b.x} y={200 - b.h - 20} width="36" height={b.h}
            rx="6" fill="rgba(255,255,255,0.05)" />
          {/* Bar fill */}
          <rect x={b.x} y={200 - b.h - 20} width="36" height={b.h}
            rx="6" fill="url(#barGrad)" opacity="0.9" />
        </g>
      ))}
      {/* Last bar extra highlight */}
      <rect x="210" y="25" width="36" height="155"
        rx="6" fill="rgba(207,254,37,0.15)" />
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cffe25" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#cffe25" stopOpacity="0.15" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Illustration 3: Network nodes ── */
function NetworkIllustration() {
  const nodes = [
    { cx: 160, cy: 100, r: 20, accent: true },
    { cx: 60,  cy: 50,  r: 10, accent: false },
    { cx: 270, cy: 60,  r: 10, accent: false },
    { cx: 55,  cy: 155, r: 10, accent: false },
    { cx: 265, cy: 150, r: 10, accent: false },
    { cx: 160, cy: 175, r: 10, accent: false },
  ];
  const edges = [
    [0,1],[0,2],[0,3],[0,4],[0,5],
  ];
  return (
    <svg viewBox="0 0 320 200" fill="none" className="w-full h-full">
      {edges.map(([a, b]) => (
        <line key={`${a}-${b}`}
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="rgba(207,254,37,0.2)" strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r={n.r + 6}
            fill={n.accent ? "rgba(207,254,37,0.08)" : "rgba(255,255,255,0.03)"} />
          <circle cx={n.cx} cy={n.cy} r={n.r}
            fill={n.accent ? "#0c0c0f" : "#151518"}
            stroke={n.accent ? "#cffe25" : "rgba(255,255,255,0.15)"}
            strokeWidth={n.accent ? "2" : "1.5"}
          />
          {n.accent && (
            <>
              <circle cx={n.cx} cy={n.cy} r="6" fill="#cffe25" opacity="0.9" />
            </>
          )}
          {!n.accent && (
            <circle cx={n.cx} cy={n.cy} r="3.5"
              fill="rgba(255,255,255,0.4)" />
          )}
        </g>
      ))}
    </svg>
  );
}

const cards = [
  {
    badge: "Скорость",
    title: "Ответ за 30 секунд",
    desc: "ИИ принимает заявку мгновенно — в любое время суток, без очередей и ожидания.",
    Illustration: GaugeIllustration,
  },
  {
    badge: "Результат",
    title: "Измеримый рост продаж",
    desc: "Отслеживайте конверсию, количество квалифицированных лидов и выручку в реальном времени.",
    Illustration: BarChartIllustration,
  },
  {
    badge: "Интеграция",
    title: "Работает с вашим стеком",
    desc: "Подключается к AmoCRM, Битрикс24, WhatsApp и Telegram за один день без программиста.",
    Illustration: NetworkIllustration,
  },
];

export default function WhyUs() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="section-padding">
      <div className="container">
        <div ref={ref} className="flex flex-col gap-12">

          {/* Header */}
          <div
            className="flex flex-col items-center text-center gap-4 transition-all duration-700 ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(32px)",
            }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1l1.5 4h4l-3.2 2.4 1.2 4L7 9.2 3.5 11.4l1.2-4L1.5 5h4z"
                  fill="#cffe25" />
              </svg>
              <span className="text-p-03 font-medium text-white/60 tracking-widest uppercase">
                Преимущества
              </span>
            </div>
            <h2 className="text-h2 font-bold">
              Почему выбирают{" "}
              <em className="not-italic" style={{ fontStyle: "italic", opacity: 0.5 }}>Zerk?</em>
            </h2>
            <p className="text-p-02 text-text-grey max-w-lg">
              Всё необходимое для автоматизации, роста и контроля — в одной платформе.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cards.map((card, i) => (
              <div
                key={card.title}
                className="transition-all duration-700 ease-out"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(48px)",
                  transitionDelay: `${i * 100 + 100}ms`,
                }}
              >
                <div className="group relative rounded-xl overflow-hidden bg-card border border-white/8 hover:border-white/16 transition-colors duration-300 flex flex-col h-full">

                  {/* Illustration area */}
                  <div className="relative h-52 bg-gradient-to-b from-[#0a0a0d] to-[#0d0d10] flex items-center justify-center overflow-hidden px-4 pt-6">
                    {/* Subtle radial glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(207,254,37,0.04)_0%,transparent_70%)]" />
                    <card.Illustration />
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent" />

                  {/* Text */}
                  <div className="flex flex-col gap-3 p-6">
                    <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-accent/10 border border-accent/20 px-3 py-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span className="text-p-03 text-accent font-medium">{card.badge}</span>
                    </div>
                    <h4 className="text-h5 font-semibold text-white">{card.title}</h4>
                    <p className="text-p-02 text-text-grey">{card.desc}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
