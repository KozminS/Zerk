"use client";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Video background ── */}
      <div className="absolute inset-0 z-0">
        <video
          src="/hero-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-bg/60" />

        {/* Top vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-transparent to-bg/0" />
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
            <Badge>AI-инфраструктура для недвижимости</Badge>
          </div>

          {/* Heading */}
          <div
            className="opacity-0 animate-fade-in-up"
            style={{ animationDelay: "120ms", animationFillMode: "forwards" }}
          >
            <h1 className="text-[44px] md:text-[58px] lg:text-[68px] leading-[1.05] font-bold tracking-tight text-center">
              Автоматизируем 100% входящих для{" "}
              <span className="text-accent">вашего агентства</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div
            className="opacity-0 animate-fade-in-up"
            style={{ animationDelay: "240ms", animationFillMode: "forwards" }}
          >
            <p className="text-p-01 text-white/60 max-w-xl">
              Бот принимает заявку, квалифицирует клиента, записывает на показ,
              и всё это попадает в вашу CRM.
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
