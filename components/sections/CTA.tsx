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
            <h2 className="text-h2 font-bold text-white">
              Начните зарабатывать больше с нами
            </h2>

            <p className="text-p-01 text-white/60">
              Сделаем всё, чтобы ваши клиенты оставались только с вами.
            </p>

            <div className="flex items-center gap-4 flex-wrap justify-center">
              <Button variant="primary" href="/contact">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-1.5">
                  <path d="M2 3.5C2 2.67 2.67 2 3.5 2h1.75c.37 0 .7.25.79.61l.75 3a.8.8 0 01-.22.79L5.5 7.5a8.6 8.6 0 004 4l1.1-1.07a.8.8 0 01.79-.22l3 .75c.36.09.61.42.61.79V13.5c0 .83-.67 1.5-1.5 1.5C6.1 15 1 9.9 1 3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Записаться на созвон
              </Button>
              <Button variant="outline" href="/chat">
                Попробовать демо
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-1.5">
                  <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
