"use client";
import { useEffect, useRef, useState } from "react";

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

export default function Solution() {
  const { ref, inView } = useInView(0.2);

  return (
    <section className="section-padding">
      <div className="container">
        <div
          ref={ref}
          className="flex flex-col items-center text-center gap-6 transition-all duration-700 ease-out"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(32px)",
          }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-p-03 font-medium text-accent tracking-widest uppercase">Решение</span>
          </div>

          {/* Headline */}
          <h2 className="text-h2 font-bold max-w-2xl">
            Zerk берёт первый контакт{" "}
            <em className="not-italic text-accent">на себя</em>
          </h2>

          {/* Subheadline */}
          <p className="text-p-01 text-text-grey max-w-xl">
            Пока агентство занято делом — ИИ отвечает, квалифицирует клиента
            и передаёт готовый лид в CRM. Без задержек. Без потерь.
          </p>

          {/* Divider with dots */}
          <div className="flex items-center gap-3 mt-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/15" />
          </div>
        </div>
      </div>
    </section>
  );
}
