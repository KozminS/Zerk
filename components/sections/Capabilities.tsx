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

const capabilities = [
  {
    icons: (
      <>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" stroke="rgba(255,255,255,0.3)" strokeWidth="1.8"/>
          <path d="M16 9v7l4 2" stroke="#cffe25" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M28 22.56v3.44a2.29 2.29 0 01-2.5 2.29 22.65 22.65 0 01-9.88-3.51 22.32 22.32 0 01-6.86-6.86 22.65 22.65 0 01-3.51-9.92A2.29 2.29 0 017.54 5.71h3.44a2.29 2.29 0 012.29 1.97c.14 1.1.41 2.18.8 3.22a2.29 2.29 0 01-.51 2.41L12.13 14.7a18.29 18.29 0 007.17 7.17l1.39-1.43a2.29 2.29 0 012.41-.51c1.04.39 2.12.66 3.22.8a2.29 2.29 0 011.97 2.33z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </>
    ),
    title: "Ответы 24/7",
    desc: "Никогда не пропустит звонок или сообщение — работает без выходных и ночью.",
  },
  {
    icons: (
      <>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M5 7h22l-8 10v8l-6-3V17L5 7z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" stroke="rgba(255,255,255,0.3)" strokeWidth="1.8"/>
          <path d="M10.5 16.5l3.5 3.5 7.5-7.5" stroke="#cffe25" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </>
    ),
    title: "Квалификация лидов",
    desc: "ИИ задаёт уточняющие вопросы и автоматически отсеивает нецелевые обращения.",
  },
  {
    icons: (
      <>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <ellipse cx="16" cy="9" rx="10" ry="4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8"/>
          <path d="M6 9v7c0 2.21 4.48 4 10 4s10-1.79 10-4V9" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8"/>
          <path d="M6 16v7c0 2.21 4.48 4 10 4s10-1.79 10-4v-7" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8"/>
        </svg>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M25 12a10 10 0 00-18.54-3M7 22a10 10 0 0018.54 3" stroke="rgba(255,255,255,0.3)" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M6 6v6h6M26 26v-6h-6" stroke="#cffe25" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </>
    ),
    title: "CRM-интеграция",
    desc: "Синхронизация с AmoCRM, Битрикс24 — лиды и записи автоматически появляются в вашей базе.",
  },
  {
    icons: (
      <>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M6 26V18M11 26V12M16 26V8M21 26V14M26 26V6" stroke="#cffe25" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M6 22l7-7 5 5 8-10" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 10h5v5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </>
    ),
    title: "Аналитика звонков",
    desc: "Полный лог переговоров, записи, транскрипции. Видите, о чём спрашивают клиенты.",
  },
  {
    icons: (
      <>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" stroke="#cffe25" strokeWidth="1.8"/>
          <path d="M4 16h24M16 4s-5 5-5 12 5 12 5 12M16 4s5 5 5 12-5 12-5 12" stroke="#cffe25" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M28 16c0 6.63-5.37 12-12 12a12.17 12.17 0 01-5.36-1.24L4 28l1.24-6.64A11.93 11.93 0 014 16C4 9.37 9.37 4 16 4s12 5.37 12 12z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </>
    ),
    title: "Мультиязычность",
    desc: "Русский, английский и другие языки. Подходит для работы с иностранными покупателями.",
  },
  {
    icons: (
      <>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 4l11 4v8c0 6-4.81 11.27-11 12C9.81 27.27 5 22 5 16V8l11-4z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16l3 3 5-5" stroke="#cffe25" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="7" y="14" width="18" height="14" rx="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8"/>
          <path d="M11 14v-4a5 5 0 0110 0v4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="16" cy="21" r="2" fill="#cffe25"/>
        </svg>
      </>
    ),
    title: "Безопасность данных",
    desc: "Шифрование данных, соответствие 152-ФЗ. Данные ваших клиентов в безопасности.",
  },
];

export default function Capabilities() {
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
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-p-03 font-medium text-white/60">Возможности</span>
            </div>
            <h2 className="text-h2 font-bold max-w-2xl">
              Всё что нужно для автоматизации агентства
            </h2>
            <p className="text-p-02 text-text-grey max-w-lg">
              Zerk — это полноценная платформа, а не просто чат-бот.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap, i) => (
              <div
                key={cap.title}
                className="transition-all duration-700 ease-out"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(48px)",
                  transitionDelay: `${i * 80 + 100}ms`,
                }}
              >
                <div className="group relative rounded-xl border border-white/8 bg-card hover:border-white/16 transition-all duration-300 flex flex-col h-full overflow-hidden">

                  {/* Icon area */}
                  <div className="relative flex items-center justify-center h-44 bg-gradient-to-b from-[#0a0a0d] to-card px-6 overflow-hidden">
                    {/* Subtle grid lines */}
                    <div
                      className="absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                        backgroundSize: "32px 32px",
                      }}
                    />
                    {/* Accent glow centered behind icon box */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-16 bg-accent/15 blur-2xl rounded-full transition-all duration-500 group-hover:w-56 group-hover:h-32 group-hover:bg-accent/25 group-hover:blur-3xl" />
                    {/* Icon pair box */}
                    <div className="relative flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-6 py-4 group-hover:border-accent/30 group-hover:bg-accent/5 transition-all duration-300">
                      {cap.icons}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-white/6" />

                  {/* Text */}
                  <div className="flex flex-col gap-2 p-6">
                    <h5 className="text-h5 font-semibold text-white">{cap.title}</h5>
                    <p className="text-p-02 text-text-grey">{cap.desc}</p>
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
