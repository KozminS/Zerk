"use client";
import { useEffect, useRef, useState } from "react";
import Card from "@/components/ui/Card";

function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return { count, ref };
}

function StatCard({
  value,
  suffix,
  label,
  description,
}: {
  value: number;
  suffix: string;
  label: string;
  description: string;
}) {
  const { count, ref } = useCounter(value);

  return (
    <Card className="p-6">
      <div ref={ref} className="flex flex-col gap-3">
        <div className="flex items-end gap-2">
          <span className="text-h1 font-bold text-white leading-none">
            {count.toLocaleString("ru-RU")}
          </span>
          <span className="text-h2 font-bold text-accent leading-none pb-1">
            {suffix}
          </span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-green-light/20 px-3 py-1 self-start">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          <span className="text-p-03 text-green-300 font-medium">{label}</span>
        </div>
        <p className="text-p-03 text-text-grey">{description}</p>
      </div>
    </Card>
  );
}

export default function Intro() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left: Testimonial */}
          <Card className="p-8 flex flex-col gap-8 h-full">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 self-start">
                <span className="text-p-03 font-medium text-white/70">
                  Отзыв клиента
                </span>
              </div>
              <blockquote>
                <p className="text-h5 text-white/70 leading-relaxed font-medium">
                  &ldquo;Внедрили Zerk три месяца назад — пропущенных звонков
                  больше нет. ИИ отвечает клиентам в 2 часа ночи так же
                  вежливо, как наш лучший менеджер. Конверсия из звонка в показ
                  выросла на 34%.&rdquo;
                </p>
              </blockquote>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/20 flex items-center justify-center">
                  <span className="text-p-02 font-bold text-accent">АК</span>
                </div>
                <div>
                  <p className="text-p-02 font-semibold text-white">
                    Алексей Котов
                  </p>
                  <p className="text-p-03 text-text-grey">
                    Директор, АН «Простор»
                  </p>
                </div>
              </div>
              <div className="text-h5 font-bold text-white/20">Простор</div>
            </div>
          </Card>

          {/* Right: Stats */}
          <div className="flex flex-col gap-4">
            <StatCard
              value={120000}
              suffix="+"
              label="Обработанных звонков"
              description="Голосовой ИИ ежемесячно принимает и квалифицирует десятки тысяч обращений для наших клиентов."
            />
            <StatCard
              value={96}
              suffix="%"
              label="Удовлетворённость клиентов"
              description="Мы гордимся высоким рейтингом по результатам опросов агентств, работающих с Zerk."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
