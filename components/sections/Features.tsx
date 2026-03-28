import Card from "@/components/ui/Card";
import AnimatedWaveform from "@/components/ui/AnimatedWaveform";
import AnimatedChat from "@/components/ui/AnimatedChat";

export default function Features() {
  return (
    <section className="section-padding bg-gradient-to-b from-bg via-bg to-bg">
      <div className="container">
        <div className="flex flex-col gap-6">
          {/* Section header */}
          <div className="flex flex-col items-center text-center gap-4 mb-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-p-03 font-medium text-white/70">
                Наши продукты
              </span>
            </div>
            <h2 className="text-h2 font-bold max-w-2xl">
              Созданы специально для рынка недвижимости
            </h2>
            <p className="text-p-02 text-text-grey max-w-lg">
              Два продукта — один для текста, один для голоса. Вместе они
              закрывают 100% входящего потока клиентов.
            </p>
          </div>

          {/* Large card — Chatbot */}
          <Card className="p-0 overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center gap-0">
              {/* Text */}
              <div className="flex flex-col gap-6 p-8 lg:p-12 lg:w-1/2 lg:min-h-[400px] justify-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-green-light/20 px-3 py-1 self-start">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <span className="text-p-03 text-green-300 font-medium">
                    Обзор продукта
                  </span>
                </div>
                <h3 className="text-h3 font-bold text-white">
                  Чат-бот, который закрывает сделки, пока вы спите
                </h3>
                <p className="text-p-02 text-text-grey">
                  ИИ-ассистент отвечает в WhatsApp, Telegram и на сайте.
                  Квалифицирует лиды, отвечает на вопросы об объектах, записывает
                  на показ — без участия менеджера.
                </p>
                <ul className="flex flex-col gap-2">
                  {[
                    "Интеграция за 1 день",
                    "Понимает вопросы об объектах, ценах, документах",
                    "Автоматически передаёт горячих лидов в CRM",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                        >
                          <path
                            d="M1 4l2.5 2.5L9 1"
                            stroke="#cffe25"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="text-p-02 text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className="lg:w-1/2 w-full bg-gradient-to-br from-[#0f1a2e] to-card p-6 self-stretch flex items-center justify-center min-h-[300px] border-t lg:border-t-0 lg:border-l border-white/5">
                <AnimatedChat />
              </div>
            </div>
          </Card>

          {/* Two small cards below */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 2: Integration */}
            <Card className="p-8 flex flex-col gap-6">
              <div className="h-14 w-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path
                    d="M14 4v20M4 14h20M8 8l12 12M20 8L8 20"
                    stroke="#cffe25"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-h4 font-semibold text-white">
                  Лёгкая интеграция
                </h4>
                <p className="text-p-02 text-text-grey">
                  Подключается к AmoCRM, Битрикс24, WhatsApp Business, Telegram
                  и вашему сайту за один день без программиста.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {["AmoCRM", "Битрикс24", "WhatsApp", "Telegram"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-p-03 text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>

            {/* Card 3: Call center */}
            <Card className="p-8 flex flex-col gap-6 relative overflow-hidden">
              {/* Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-green-500/20 border border-green-500/30 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-p-03 text-green-300 font-medium">
                  Работает 24/7
                </span>
              </div>

              <div className="h-14 w-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path
                    d="M5 7a2 2 0 012-2h2.5l2 5-2.5 1.5a11 11 0 005.5 5.5L16 14.5l5 2V19a2 2 0 01-2 2C9.716 21 5 11.284 5 7z"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 8a4 4 0 014 4"
                    stroke="#cffe25"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18 4a8 8 0 018 8"
                    stroke="#cffe25"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-h4 font-semibold text-white">
                  AI Колл-центр
                </h4>
                <p className="text-p-02 text-text-grey">
                  Голосовой ИИ-агент принимает звонки, отвечает на вопросы об
                  объектах и записывает на показ — как живой менеджер, но
                  быстрее и дешевле.
                </p>
              </div>

              {/* Waveform visual */}
              <div className="mt-auto">
                <AnimatedWaveform />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
