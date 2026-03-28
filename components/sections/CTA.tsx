import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="relative rounded-2xl overflow-hidden p-12 md:p-20 flex flex-col items-center text-center gap-8">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-accent/5 to-transparent" />
          <div className="absolute inset-0 border border-accent/20 rounded-2xl pointer-events-none" />
          {/* Glow */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(207,254,37,0.3) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-p-03 font-medium text-accent">
                Бесплатное демо
              </span>
            </div>

            <h2 className="text-h2 font-bold text-white">
              Готовы автоматизировать ваше агентство?
            </h2>

            <p className="text-p-01 text-white/60">
              Запустим Zerk для вашего агентства за 24 часа. Первые 14 дней
              бесплатно — без обязательств и кредитных карт.
            </p>

            <div className="flex items-center gap-4 flex-wrap justify-center">
              <Button variant="primary" href="/contact">
                Получить бесплатное демо
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
              <Button variant="outline" href="/#pricing">
                Сравнить тарифы
              </Button>
            </div>

            <p className="text-p-03 text-white/30">
              Уже работают 120+ агентств недвижимости · Настройка за 1 день
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
