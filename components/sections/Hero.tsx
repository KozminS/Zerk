"use client";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Earth background image ── */}
      <div className="absolute inset-0 z-0">
        {/* Raw photo — hue-rotated from blue → accent yellow-green */}
        <div
          className="absolute inset-0"
          style={{ filter: "hue-rotate(195deg) saturate(1.4) brightness(0.85)" }}
        >
          <Image
            src="/hero-earth.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Dark overlay to match #0c0c0f brand bg */}
        <div className="absolute inset-0 bg-bg/55" />

        {/* Top vignette — stars area stays dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-transparent to-bg/0" />

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
          }}
        />
      </div>

      {/* Bottom fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-10 bg-gradient-to-t from-bg to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center pt-36 pb-24 px-4">
        <div className="flex flex-col items-center text-center gap-8 max-w-4xl">

          {/* Badge */}
          <div
            className="opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
          >
            <Badge>ИИ Колл-центр 24/7 — теперь доступен</Badge>
          </div>

          {/* Heading */}
          <div
            className="opacity-0 animate-fade-in-up"
            style={{ animationDelay: "120ms", animationFillMode: "forwards" }}
          >
            <h1 className="text-[44px] md:text-[58px] lg:text-[68px] leading-[1.05] font-bold tracking-tight text-center">
              Автоматизируйте продажи{" "}
              <span className="text-accent">недвижимости</span>{" "}
              с помощью ИИ
            </h1>
          </div>

          {/* Subtitle */}
          <div
            className="opacity-0 animate-fade-in-up"
            style={{ animationDelay: "240ms", animationFillMode: "forwards" }}
          >
            <p className="text-p-01 text-white/60 max-w-xl">
              Zerk создаёт AI-чатботы и голосовые колл-центры для агентств
              недвижимости. Отвечаем на звонки и заявки 24/7 — без найма
              операторов.
            </p>
          </div>

          {/* CTAs */}
          <div
            className="opacity-0 animate-fade-in-up flex items-center gap-4 flex-wrap justify-center"
            style={{ animationDelay: "360ms", animationFillMode: "forwards" }}
          >
            <Button variant="primary" href="/contact">
              Получить демо
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
            <Button variant="outline" href="/#pricing">
              Смотреть тарифы
            </Button>
          </div>


        </div>
      </div>

    </section>
  );
}
