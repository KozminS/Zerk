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

/* ── Card visuals ── */

function SpeedVisual() {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start: number;
    const target = 28;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(animate);
      else setTimeout(() => { start = 0; setVal(0); setTimeout(() => requestAnimationFrame(animate), 400); }, 2000);
    };
    const id = setTimeout(() => requestAnimationFrame(animate), 600);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-end gap-2">
        <span className="text-[48px] font-black leading-none text-accent tabular-nums">{val}</span>
        <span className="text-white/40 text-[15px] mb-2">сек</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-white/8 overflow-hidden">
        <div
          className="h-full rounded-full bg-accent transition-all duration-100"
          style={{ width: `${(val / 28) * 100}%` }}
        />
      </div>
      <span className="text-white/30 text-[11px]">среднее время ответа</span>
    </div>
  );
}

function ClockVisual() {
  const [deg, setDeg] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setDeg(d => (d + 6) % 360), 80);
    return () => clearInterval(id);
  }, []);
  const minuteDeg = deg;
  const hourDeg = deg / 12;
  const toXY = (angle: number, r: number) => ({
    x: 40 + r * Math.sin((angle * Math.PI) / 180),
    y: 40 - r * Math.cos((angle * Math.PI) / 180),
  });
  const min = toXY(minuteDeg, 28);
  const hour = toXY(hourDeg, 18);

  return (
    <div className="flex items-center gap-5">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
        <circle cx="40" cy="40" r="36" stroke="rgba(207,254,37,0.25)" strokeWidth="1.5"
          strokeDasharray={`${2 * Math.PI * 36}`} strokeDashoffset={`${2 * Math.PI * 36 * 0.25}`}
          strokeLinecap="round" />
        {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
          const p = toXY(i * 30, 30);
          return <circle key={i} cx={p.x} cy={p.y} r={i % 3 === 0 ? 2 : 1} fill="rgba(255,255,255,0.2)" />;
        })}
        <line x1="40" y1="40" x2={hour.x} y2={hour.y} stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="40" y1="40" x2={min.x} y2={min.y} stroke="#cffe25" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="40" cy="40" r="3" fill="#cffe25" />
      </svg>
      <div className="flex flex-col gap-1">
        <span className="text-white/70 text-[13px]">Отвечает</span>
        <span className="text-accent font-bold text-[15px]">24 / 7</span>
        <span className="text-white/30 text-[12px]">без выходных</span>
      </div>
    </div>
  );
}

function FunnelVisual() {
  const leads = [
    { label: "Входящие лиды", count: 100, color: "rgba(255,255,255,0.2)" },
    { label: "Квалифицированы", count: 68,  color: "rgba(207,254,37,0.4)" },
    { label: "Горячие", count: 32,  color: "#cffe25" },
  ];
  return (
    <div className="flex flex-col gap-2 w-full">
      {leads.map((l) => (
        <div key={l.label} className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-white/40">{l.label}</span>
            <span className="text-[11px] text-white/50 tabular-nums">{l.count}</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${l.count}%`, background: l.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function CRMVisual() {
  const [active, setActive] = useState(0);
  const items = ["AmoCRM", "Битрикс24", "Telegram", "WhatsApp"];
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % items.length), 1400);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex flex-col gap-2 w-full">
      {items.map((name, i) => (
        <div key={name}
          className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-500"
          style={{ background: active === i ? "rgba(207,254,37,0.1)" : "rgba(255,255,255,0.04)" }}>
          <div className="w-2 h-2 rounded-full transition-all duration-500"
            style={{ background: active === i ? "#cffe25" : "rgba(255,255,255,0.2)" }} />
          <span className="text-[13px] transition-all duration-500"
            style={{ color: active === i ? "rgba(207,254,37,0.9)" : "rgba(255,255,255,0.4)" }}>
            {name}
          </span>
          {active === i && (
            <span className="ml-auto text-[10px] text-accent/70">лид получен</span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Cards config ── */
const cards = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#cffe25" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Первый ответ за 30 секунд",
    desc: "Пока конкурент думает, Zerk уже ответил и уточнил детали. Скорость ответа решает, кому достанется клиент.",
    visual: <SpeedVisual />,
    span: "lg:col-span-2",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8"/>
        <path d="M12 6v6l4 2" stroke="#cffe25" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: "Работает ночью и в выходные",
    desc: "Заявка в 3 ночи обрабатывается так же, как в 11 утра. Без переработок и доп. штата.",
    visual: <ClockVisual />,
    span: "lg:col-span-1",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 4h16v4L12 14 4 8V4z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M4 8v12h16V8" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M9 14l2 2 4-4" stroke="#cffe25" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Квалифицирует и отсеивает",
    desc: "До менеджера доходят только горячие лиды. Нецелевые обращения Zerk закрывает сам.",
    visual: <FunnelVisual />,
    span: "lg:col-span-1",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="5" rx="9" ry="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8"/>
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8"/>
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" stroke="#cffe25" strokeWidth="1.8"/>
      </svg>
    ),
    title: "Всё автоматически в CRM",
    desc: "Лид, запись на показ, история диалога — всё в AmoCRM или Битрикс24. Никакой ручной работы.",
    visual: <CRMVisual />,
    span: "lg:col-span-2",
  },
];

export default function Offer() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="section-padding">
      <div className="container">
        <div ref={ref} className="flex flex-col gap-10">

          {/* Header */}
          <div
            className="flex flex-col items-center text-center gap-4 transition-all duration-700 ease-out"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-p-03 font-medium text-white/60">Что мы предлагаем</span>
            </div>
            <h2 className="text-h2 font-bold max-w-2xl">
              ИИ, который работает.{" "}
              <span className="text-accent">Не просто красиво выглядит</span>
            </h2>
            <p className="text-p-02 text-text-grey max-w-lg">
              Каждая система заточена под одно: чтобы ни один входящий лид не ушёл без ответа.
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card, i) => (
              <div
                key={card.title}
                className={`${card.span} transition-all duration-700 ease-out`}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(40px)",
                  transitionDelay: `${i * 80 + 100}ms`,
                }}
              >
                <div className="group relative rounded-xl border border-white/8 bg-card p-6 flex flex-col gap-5 h-full hover:border-white/16 transition-colors duration-300 overflow-hidden">
                  {/* Subtle glow on hover */}
                  <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-accent/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Icon + Title */}
                  <div className="flex flex-col gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-h5 font-semibold text-white leading-snug">{card.title}</h3>
                      <p className="text-p-03 text-text-grey mt-1.5">{card.desc}</p>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className="mt-auto pt-2">
                    {card.visual}
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
