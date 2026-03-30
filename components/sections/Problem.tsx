"use client";
import { useEffect, useRef, useState } from "react";
import Card from "@/components/ui/Card";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function PhoneMissedIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M16.5 2.5l5 5M21.5 2.5l-5 5"
        stroke="#ef4444"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.01 2.84 2 2 0 012 .67h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.47a16 16 0 006.44 6.44l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
        stroke="#ef4444"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="1.8" />
      <path
        d="M12 6v6l4 2"
        stroke="#ef4444"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneSilentIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.01 2.84 2 2 0 012 .67h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.47a16 16 0 006.44 6.44l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
        stroke="#ef4444"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 2l4 4M18 6l4-4"
        stroke="#ef4444"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

const problems = [
  {
    Icon: PhoneMissedIcon,
    tag: "Пропущенный звонок",
    text: "Риэлтор на показе — звонок пропущен. Клиент ушёл к конкуренту.",
  },
  {
    Icon: ClockIcon,
    tag: "Поздняя заявка",
    text: "Заявка с ЦИАН в 23:00. Утром клиент уже нашёл другое агентство.",
  },
  {
    Icon: PhoneSilentIcon,
    tag: "Поздний перезвон",
    text: "Менеджер перезвонил через 2 часа. Клиент не берёт трубку.",
  },
];

function ProblemCard({
  Icon,
  tag,
  text,
  delay,
  inView,
}: {
  Icon: () => JSX.Element;
  tag: string;
  text: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <div
      className="transition-all duration-700 ease-out"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(48px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <Card className="p-6 flex flex-col gap-5 h-full group hover:border-red-500/20">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4">
          <div className="h-12 w-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-red-500/15">
            <Icon />
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-p-03 text-red-400 font-medium">{tag}</span>
          </div>
        </div>

        {/* Loss marker */}
        <div className="h-px w-full bg-gradient-to-r from-red-500/30 via-red-500/10 to-transparent" />

        {/* Text */}
        <p className="text-p-01 font-medium text-white/85 leading-snug">{text}</p>
      </Card>
    </div>
  );
}

export default function Problem() {
  const { ref, inView } = useInView(0.15);

  return (
    <section className="section-padding">
      <div className="container">
        <div ref={ref} className="flex flex-col gap-12">

          {/* Header */}
          <div
            className="flex flex-col items-center text-center gap-4 transition-all duration-700 ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0px)" : "translateY(32px)",
              transitionDelay: "0ms",
            }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
              <span className="text-p-03 font-medium text-red-400">
                Реальные потери
              </span>
            </div>
            <h2 className="text-h2 font-bold max-w-2xl">
              Сколько клиентов ваше агентство{" "}
              <span className="text-red-400">потеряло</span> на этой неделе?
            </h2>
            <p className="text-p-02 text-text-grey max-w-lg">
              Пока ваш менеджер занят или спит — конкурент уже ответил.
              Каждый пропущенный контакт — это сделка, которую вы не увидите.
            </p>
          </div>

          {/* Problem cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {problems.map((p, i) => (
              <ProblemCard
                key={p.tag}
                Icon={p.Icon}
                tag={p.tag}
                text={p.text}
                delay={i * 120}
                inView={inView}
              />
            ))}
          </div>

          {/* Big stat */}
          <div
            className="transition-all duration-700 ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0px)" : "translateY(32px)",
              transitionDelay: "480ms",
            }}
          >
            <Card hover={false} className="p-8 md:p-12 relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent pointer-events-none" />
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-red-500/5 blur-3xl pointer-events-none" />

              <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                {/* Number */}
                <div className="flex flex-col items-center md:items-start shrink-0">
                  <span className="text-[72px] md:text-[88px] font-bold leading-none text-red-400 tracking-tight">
                    20–30%
                  </span>
                  <span className="text-p-02 text-text-grey mt-1">входящих теряется</span>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px self-stretch bg-white/10" />
                <div className="block md:hidden h-px w-full bg-white/10" />

                {/* Context */}
                <div className="flex flex-col gap-4 justify-center">
                  <p className="text-h5 font-semibold text-white/90 leading-snug">
                    Среднее агентство теряет каждого четвёртого клиента просто
                    потому, что не успело ответить.
                  </p>
                  <p className="text-p-02 text-text-grey">
                    При средней комиссии{" "}
                    <span className="text-white font-medium">200 000 ₽</span>{" "}
                    за сделку — это{" "}
                    <span className="text-accent font-semibold">миллионы рублей</span>{" "}
                    упущенной выручки в год. Не из-за плохих менеджеров —
                    из-за скорости ответа.
                  </p>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
