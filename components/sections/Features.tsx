"use client";
import { useEffect, useRef, useState } from "react";
import AnimatedChat from "@/components/ui/AnimatedChat";
import AnimatedWaveform from "@/components/ui/AnimatedWaveform";
import OrbitingIntegrations from "@/components/ui/OrbitingIntegrations";

function useInView(threshold = 0.2) {
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

const checkIcon = (
  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
    <path d="M1 4l2.5 2.5L9 1" stroke="#cffe25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


/* ── 24/7 illustration ── */
function CallCenterIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none">
      {/* Big background text */}
      <span
        className="absolute text-[120px] md:text-[150px] font-black text-white leading-none tracking-tighter"
        style={{ opacity: 0.055, userSelect: "none" }}
      >
        24/7
      </span>

      {/* Accent glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(207,254,37,0.08)_0%,transparent_70%)]" />

      {/* Center pill */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="flex items-center gap-3 bg-accent rounded-full px-7 py-4 shadow-[0_0_40px_rgba(207,254,37,0.35)]">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 2a9 9 0 100 18A9 9 0 0011 2z" stroke="#0c0c0f" strokeWidth="1.8"/>
            <circle cx="11" cy="11" r="3" fill="#0c0c0f"/>
            <path d="M11 2v2M11 18v2M2 11h2M18 11h2" stroke="#0c0c0f" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="text-bg font-bold text-[17px] tracking-tight">AI Поддержка</span>
        </div>

        {/* Waveform below */}
        <AnimatedWaveform />
      </div>
    </div>
  );
}

export default function Features() {
  const introRef = useInView(0.15);
  const chatRef = useInView(0.2);
  const callRef = useInView(0.2);
  const intRef = useInView(0.2);

  return (
    <section className="section-padding">
      <div className="container">
        <div className="flex flex-col gap-24">

          {/* ── Intro ── */}
          <div
            ref={introRef.ref}
            className="flex flex-col items-center text-center gap-4 transition-all duration-700 ease-out"
            style={{
              opacity: introRef.inView ? 1 : 0,
              transform: introRef.inView ? "translateY(0)" : "translateY(32px)",
            }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-p-03 font-medium text-white/60">Наши продукты</span>
            </div>
            <h2 className="text-h2 font-bold max-w-2xl">
              Созданы специально для рынка недвижимости
            </h2>
            <p className="text-p-02 text-text-grey max-w-xl">
              Три системы — чат-бот, голосовой колл-центр и интеграционный слой.
              Вместе они закрывают 100% входящего потока без участия менеджера.
            </p>
          </div>

          {/* ── Block 1: Chatbot — text left, visual right ── */}
          <div
            ref={chatRef.ref}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center transition-all duration-700 ease-out"
            style={{
              opacity: chatRef.inView ? 1 : 0,
              transform: chatRef.inView ? "translateX(0)" : "translateX(-80px)",
            }}
          >
            {/* Text */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-500/15 border border-green-500/25 px-3 py-1 self-start">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                <span className="text-p-03 text-green-300 font-medium">Чат-бот</span>
              </div>
              <h3 className="text-h3 font-bold text-white">
                Закрывает сделки, пока вы спите
              </h3>
              <p className="text-p-02 text-text-grey">
                ИИ-ассистент отвечает в WhatsApp, Telegram и на сайте. Квалифицирует
                лиды, отвечает на вопросы об объектах, записывает на показ —
                без участия менеджера.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Интеграция за 1 день",
                  "Понимает вопросы об объектах, ценах, документах",
                  "Автоматически передаёт горячих лидов в CRM",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      {checkIcon}
                    </span>
                    <span className="text-p-02 text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual */}
            <div className="relative rounded-xl overflow-hidden border border-white/8 bg-gradient-to-br from-[#0f1a2e] to-card min-h-[320px] flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(207,254,37,0.05)_0%,transparent_70%)]" />
              <AnimatedChat />
            </div>
          </div>

          {/* ── Block 2: Call center — visual left, text right ── */}
          <div
            ref={callRef.ref}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center transition-all duration-700 ease-out"
            style={{
              opacity: callRef.inView ? 1 : 0,
              transform: callRef.inView ? "translateX(0)" : "translateX(80px)",
            }}
          >
            {/* Visual — left on desktop */}
            <div className="relative rounded-xl overflow-hidden border border-white/8 bg-[#0a0a0d] min-h-[320px] flex items-center justify-center order-2 lg:order-1">
              <CallCenterIllustration />
            </div>

            {/* Text — right on desktop */}
            <div className="flex flex-col gap-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-500/15 border border-green-500/25 px-3 py-1 self-start">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-p-03 text-green-300 font-medium">Работает 24/7</span>
              </div>
              <h3 className="text-h3 font-bold text-white">
                AI Колл-центр — как живой менеджер
              </h3>
              <p className="text-p-02 text-text-grey">
                Голосовой ИИ-агент принимает звонки, отвечает на вопросы об объектах
                и записывает на показ. Ни один звонок не останется без ответа —
                даже в 3 ночи.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Отвечает за 3 секунды, без очереди",
                  "Говорит естественно — клиенты не понимают, что это ИИ",
                  "Полная транскрипция и запись каждого звонка",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      {checkIcon}
                    </span>
                    <span className="text-p-02 text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Block 3: Integration — text left, orbit right ── */}
          <div
            ref={intRef.ref}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center transition-all duration-700 ease-out"
            style={{
              opacity: intRef.inView ? 1 : 0,
              transform: intRef.inView ? "translateX(0)" : "translateX(-80px)",
            }}
          >
            {/* Text */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 self-start">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="text-p-03 text-white/60 font-medium">Интеграции</span>
              </div>
              <h3 className="text-h3 font-bold text-white">
                Подключается к вашему стеку за 1 день
              </h3>
              <p className="text-p-02 text-text-grey">
                Не меняйте то, что работает. Zerk встраивается в AmoCRM,
                Битрикс24, WhatsApp Business и ваш сайт без программиста.
                ЦИАН и Авито — тоже поддерживаются.
              </p>
              <div className="flex flex-wrap gap-2">
                {["AmoCRM", "Битрикс24", "WhatsApp", "Telegram", "ЦИАН", "Авито"].map((tag) => (
                  <span key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-p-03 text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Orbit visual */}
            <div className="relative rounded-xl overflow-hidden border border-white/8 bg-[#0a0a0d] min-h-[380px] flex items-center justify-center">
              <OrbitingIntegrations />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
