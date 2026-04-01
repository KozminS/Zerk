"use client";
import { useEffect, useRef, useState } from "react";
import AnimatedChat from "@/components/ui/AnimatedChat";
import OrbitingIntegrations from "@/components/ui/OrbitingIntegrations";
import AnimatedWaveform from "@/components/ui/AnimatedWaveform";

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


/* ── Call center illustration ── */
const WAVE_BARS = 36;

function useCallWave(active: boolean) {
  const [bars, setBars] = useState<number[]>(Array(WAVE_BARS).fill(3));
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);
  useEffect(() => {
    if (!active) { setBars(Array(WAVE_BARS).fill(3)); return; }
    const loop = (ts: number) => {
      if (ts - lastRef.current >= 40) {
        lastRef.current = ts;
        const t = ts / 1000;
        const env = Math.max(0, Math.sin(t * 1.8) * Math.sin(t * 0.6 + 0.7));
        setBars(Array.from({ length: WAVE_BARS }, (_, i) => {
          if (env < 0.08) return 3 + Math.random() * 3;
          const w = Math.sin(i * 0.5 + t * 13) * 0.5 + 0.5;
          return Math.min(100, Math.max(5, w * env * 100 + 5));
        }));
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);
  return bars;
}

function CallCenterIllustration() {
  const [phase, setPhase] = useState<"ringing" | "active">("ringing");
  const [secs, setSecs] = useState(0);
  const bars = useCallWave(phase === "active");

  // Phase loop: ring 2.5s → active 8s → repeat
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const ring = () => {
      setPhase("ringing");
      setSecs(0);
      timeout = setTimeout(() => { setPhase("active"); timeout = setTimeout(ring, 8000); }, 2500);
    };
    ring();
    return () => clearTimeout(timeout);
  }, []);

  // Timer during active call
  useEffect(() => {
    if (phase !== "active") return;
    const id = setInterval(() => setSecs(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [phase]);

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-6 overflow-hidden select-none py-8">
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(207,254,37,0.07)_0%,transparent_65%)]" />

      {/* Time */}
      <span className="relative z-10 text-white/25 text-[13px] font-mono tabular-nums">03:14</span>

      {/* Avatar */}
      <div className="relative z-10 flex items-center justify-center">
        {phase === "ringing" && <>
          <div className="absolute rounded-full border border-accent/25 animate-ping" style={{ width: 88, height: 88, animationDuration: "1.3s" }} />
          <div className="absolute rounded-full border border-accent/12 animate-ping" style={{ width: 112, height: 112, animationDuration: "1.3s", animationDelay: "0.25s" }} />
        </>}
        <div className="w-16 h-16 rounded-full bg-white/8 border border-white/12 flex items-center justify-center">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M20 21a8 8 0 10-16 0" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="12" cy="10" r="4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
          </svg>
        </div>
      </div>

      {/* Name + status */}
      <div className="relative z-10 flex flex-col items-center gap-1">
        <span className="text-white font-semibold text-[15px]">+7 (999) 823-41-09</span>
        {phase === "ringing"
          ? <span className="text-white/40 text-[12px]">Входящий звонок...</span>
          : <span className="text-accent text-[12px] font-medium tabular-nums">{mm}:{ss}</span>
        }
      </div>

      {/* Waveform — only during active call */}
      <div className="relative z-10 flex items-end gap-[3px] w-full max-w-[260px] px-2" style={{ height: 48 }}>
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-full"
            style={{
              height: `${h}%`,
              background: phase === "active"
                ? `rgba(207,254,37,${0.35 + (h / 100) * 0.65})`
                : "rgba(255,255,255,0.08)",
              transition: `height ${40 + (i % 5) * 8}ms ease-out, background 0.5s`,
            }}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="relative z-10 flex items-center gap-4">
        {phase === "ringing" ? (
          /* Answer button */
          <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-[0_0_24px_rgba(207,254,37,0.4)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.01 2.84 2 2 0 012 .67h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 8.47a16 16 0 006.44 6.44l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" fill="#0c0c0f"/>
            </svg>
          </div>
        ) : (
          /* End call button */
          <div className="w-14 h-14 rounded-full bg-red-500/80 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.3)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.01 2.84 2 2 0 012 .67h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 8.47a16 16 0 006.44 6.44l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" fill="white"/>
            </svg>
          </div>
        )}
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
    <section id="features" className="section-padding">
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
              Три системы. Один поток лидов. Ни один не теряется.
            </h2>
            <p className="text-p-02 text-text-grey max-w-xl">
              Чат-бот, голосовой ИИ и интеграционный слой работают вместе
              и передают в CRM только готовых к сделке клиентов.
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
                Назначает встречи, пока вы спите
              </h3>
              <p className="text-p-02 text-text-grey">
                Наш ИИ-ассистент отвечает в WhatsApp, Telegram и на сайте.
                Квалифицирует лиды, отвечает на вопросы об объектах, записывает
                на показ. Всё без участия человека.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Интеграция с любыми платформами",
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
                Звонок в 3 ночи. Отвечает Zerk
              </h3>
              <p className="text-p-02 text-text-grey">
                Голосовой ИИ говорит живым языком, отвечает на вопросы об объектах
                и записывает на показ. Клиенты не чувствуют разницы,
                а вы не теряете звонки.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Отвечает за 3 секунды, без очереди",
                  "Говорит естественно, клиенты не понимают, что это ИИ",
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
                Встраивается в то, что уже работает
              </h3>
              <p className="text-p-02 text-text-grey">
                Не надо менять CRM или нанимать разработчика. Zerk подключается
                к AmoCRM, Битрикс24, WhatsApp и Telegram за один день.
                Лиды сразу появляются в вашей базе.
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
