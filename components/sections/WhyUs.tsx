"use client";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
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

/* ── Card 1: Speedometer ── */
function GaugeIllustration({ hovered }: { hovered: boolean }) {
  // Animated angle state for smooth needle movement
  const [angle, setAngle] = useState(215);
  const targetAngle = hovered ? 295 : 215;
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = angle;
    const end = targetAngle;
    const duration = 700;
    const startTime = performance.now();

    const animate = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setAngle(start + (end - start) * ease);
      if (t < 1) rafRef.current = requestAnimationFrame(animate);
    };

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hovered]); // eslint-disable-line react-hooks/exhaustive-deps

  const cx = 160, cy = 160, r = 100;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  // Arc: 215° → 325° through 270° (top in SVG y-down)
  // sweep=1 (increasing θ), small-arc (110° < 180°) → large-arc=0
  const startDeg = 215, endDeg = 325;
  const sx = cx + r * Math.cos(toRad(startDeg));
  const sy = cy + r * Math.sin(toRad(startDeg));
  const ex = cx + r * Math.cos(toRad(endDeg));
  const ey = cy + r * Math.sin(toRad(endDeg));
  const trackPath = `M ${sx} ${sy} A ${r} ${r} 0 0 1 ${ex} ${ey}`;

  // Dash animation: arcLen = full track length
  const arcLen = Math.PI * r * ((endDeg - startDeg) / 180);
  // How much to show: 0 at base, 2/3 at hover
  const progress = (angle - startDeg) / (endDeg - startDeg);
  const dashOffset = arcLen * (1 - progress);

  // Needle computed from angle
  const rad = toRad(angle);
  const needleLen = r - 16;
  const tipX = cx + needleLen * Math.cos(rad);
  const tipY = cy + needleLen * Math.sin(rad);
  const tailX = cx - 12 * Math.cos(rad);
  const tailY = cy - 12 * Math.sin(rad);

  return (
    <svg viewBox="0 0 320 220" fill="none" className="w-full h-full">
      <defs>
        <filter id="gaugeGlow2" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="arcGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cffe25" stopOpacity="1" />
          <stop offset="100%" stopColor="#cffe25" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Circle body */}
      <circle cx={cx} cy={cy} r={r}
        fill="rgba(255,255,255,0.022)"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="1.5"
      />

      {/* Track */}
      <path d={trackPath}
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />

      {/* Filled accent arc */}
      <path
        d={trackPath}
        stroke="url(#arcGrad2)"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
        filter="url(#gaugeGlow2)"
        strokeDasharray={arcLen}
        strokeDashoffset={dashOffset}
      />

      {/* Needle */}
      <line
        x1={tailX} y1={tailY}
        x2={tipX} y2={tipY}
        stroke="rgba(255,255,255,0.82)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Center hub */}
      <circle cx={cx} cy={cy} r="6" fill="rgba(18,18,22,1)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="2.8" fill="rgba(180,180,200,0.65)" />
    </svg>
  );
}

/* ── Card 2: Bar chart ── */
function BarChartIllustration({ hovered }: { hovered: boolean }) {
  const bars = [
    { idleH: 70,  fullH: 80,  x: 60 },
    { idleH: 100, fullH: 112, x: 110 },
    { idleH: 88,  fullH: 100, x: 160 },
    { idleH: 118, fullH: 132, x: 210 },
  ];
  const baseY = 180;

  return (
    <svg viewBox="0 0 320 200" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cffe25" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#cffe25" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="40" y1={y} x2="280" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}

      {bars.map((b) => {
        const h = hovered ? b.fullH : b.idleH;
        return (
          <rect
            key={b.x}
            x={b.x}
            y={baseY - h}
            width="36"
            height={h}
            rx="5"
            fill="url(#barGrad2)"
            style={{ transition: "y 0.55s cubic-bezier(.4,0,.2,1), height 0.55s cubic-bezier(.4,0,.2,1)" }}
          />
        );
      })}
    </svg>
  );
}

/* ── Card 3: Network nodes ── */
function NetworkIllustration({ hovered }: { hovered: boolean }) {
  const [time, setTime] = useState(0);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);

  useEffect(() => {
    if (!hovered) return;
    lastRef.current = performance.now();
    const tick = (now: number) => {
      setTime((t) => t + (now - lastRef.current) / 1000);
      lastRef.current = now;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hovered]);

  const cx = 160, cy = 100;
  const satellites = [
    { r: 75, speed: 0.4,  phase: 0 },
    { r: 75, speed: 0.4,  phase: (2 * Math.PI) / 3 },
    { r: 75, speed: 0.4,  phase: (4 * Math.PI) / 3 },
    { r: 130, speed: -0.25, phase: Math.PI / 4 },
    { r: 130, speed: -0.25, phase: Math.PI / 4 + Math.PI },
  ];

  const pts = satellites.map((s) => ({
    x: cx + s.r * Math.cos(s.speed * time + s.phase),
    y: cy + s.r * Math.sin(s.speed * time + s.phase),
  }));

  return (
    <svg viewBox="0 0 320 200" fill="none" className="w-full h-full">
      {/* Orbit rings */}
      <circle cx={cx} cy={cy} r="75" stroke="rgba(207,254,37,0.1)" strokeWidth="1" strokeDasharray="4 5" />
      <circle cx={cx} cy={cy} r="130" stroke="rgba(207,254,37,0.06)" strokeWidth="1" strokeDasharray="3 7" />

      {/* Lines to center */}
      {pts.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y}
          stroke="rgba(207,254,37,0.18)" strokeWidth="1" strokeDasharray="3 4" />
      ))}

      {/* Satellite nodes */}
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="12" fill="rgba(13,13,16,0.95)"
            stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <circle cx={p.x} cy={p.y} r="4" fill="rgba(255,255,255,0.35)" />
        </g>
      ))}

      {/* Center node */}
      <circle cx={cx} cy={cy} r="18" fill="rgba(13,13,16,0.95)"
        stroke="rgba(207,254,37,0.5)" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="10" fill="rgba(207,254,37,0.12)" />
      <circle cx={cx} cy={cy} r="5" fill="#cffe25" />
    </svg>
  );
}

const cards = [
  {
    badge: "Скорость",
    title: "Ответ за 30 секунд",
    desc: "ИИ принимает заявку мгновенно — в любое время суток, без очередей и ожидания.",
    Visual: GaugeIllustration,
  },
  {
    badge: "Результат",
    title: "Измеримый рост продаж",
    desc: "Отслеживайте конверсию, количество квалифицированных лидов и выручку в реальном времени.",
    Visual: BarChartIllustration,
  },
  {
    badge: "Интеграция",
    title: "Работает с вашим стеком",
    desc: "Подключается к AmoCRM, Битрикс24, WhatsApp и Telegram за один день без программиста.",
    Visual: NetworkIllustration,
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
                <path d="M7 1l1.5 4h4l-3.2 2.4 1.2 4L7 9.2 3.5 11.4l1.2-4L1.5 5h4z" fill="#cffe25" />
              </svg>
              <span className="text-p-03 font-medium text-white/60 tracking-widest uppercase">Преимущества</span>
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
            {cards.map((card, i) => {
              const [hovered, setHovered] = useState(false);
              return (
                <div
                  key={card.title}
                  className="transition-all duration-700 ease-out"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(48px)",
                    transitionDelay: `${i * 100 + 100}ms`,
                  }}
                >
                  <div
                    className="group relative rounded-xl overflow-hidden border border-white/8 bg-card flex flex-col h-full cursor-default"
                    style={{
                      borderColor: hovered ? "rgba(255,255,255,0.16)" : undefined,
                      transition: "border-color 0.3s",
                    }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                  >
                    {/* Illustration area */}
                    <div className="relative h-52 bg-gradient-to-b from-[#0a0a0d] to-[#0d0d10] flex items-center justify-center overflow-hidden px-4 pt-6">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(207,254,37,0.04)_0%,transparent_70%)]" />
                      {/* Hover glow */}
                      <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{
                          width: hovered ? "220px" : "112px",
                          height: hovered ? "120px" : "64px",
                          background: "rgba(207,254,37,1)",
                          filter: "blur(48px)",
                          opacity: hovered ? 0.22 : 0.1,
                          transition: "all 0.5s ease",
                        }}
                      />
                      <card.Visual hovered={hovered} />
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
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
