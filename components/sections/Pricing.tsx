"use client";
import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { clsx } from "clsx";

const plans = [
  {
    name: "Старт",
    priceMonth: 9900,
    priceYear: 7900,
    desc: "Для небольших агентств, только начинающих автоматизацию",
    features: [
      "Чат-бот для 1 канала",
      "До 500 диалогов/мес",
      "Базовая CRM-интеграция",
      "Email поддержка",
      "Статистика и аналитика",
    ],
    cta: "Начать бесплатно",
    accent: false,
  },
  {
    name: "Бизнес",
    priceMonth: 24900,
    priceYear: 19900,
    desc: "Для активных агентств с большим входящим потоком",
    features: [
      "Чат-бот + AI Колл-центр",
      "До 3 000 диалогов/мес",
      "Интеграция с AmoCRM и Битрикс24",
      "WhatsApp + Telegram",
      "Приоритетная поддержка 24/7",
      "Запись и транскрипция звонков",
    ],
    cta: "Получить демо",
    accent: true,
    badge: "Популярный",
  },
  {
    name: "Корпоратив",
    priceMonth: null,
    priceYear: null,
    desc: "Для сетевых агентств и крупных застройщиков",
    features: [
      "Безлимитные диалоги",
      "Все каналы связи",
      "Кастомная модель под ваш бренд",
      "SLA 99.9%",
      "Выделенный менеджер",
      "Интеграция с любым ПО",
    ],
    cta: "Связаться с нами",
    accent: false,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="section-padding">
      <div className="container">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-p-03 font-medium text-white/70">Тарифы</span>
            </div>
            <h2 className="text-h2 font-bold">
              Прозрачные цены без скрытых платежей
            </h2>

            {/* Toggle */}
            <div className="flex items-center gap-3">
              <span
                className={clsx(
                  "text-p-02 transition-colors",
                  !annual ? "text-white" : "text-text-grey"
                )}
              >
                Помесячно
              </span>
              <button
                onClick={() => setAnnual(!annual)}
                className={clsx(
                  "relative h-7 w-12 rounded-full transition-colors duration-300",
                  annual ? "bg-accent" : "bg-white/10"
                )}
              >
                <span
                  className={clsx(
                    "absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-300",
                    annual ? "left-6" : "left-1"
                  )}
                />
              </button>
              <span
                className={clsx(
                  "text-p-02 transition-colors flex items-center gap-2",
                  annual ? "text-white" : "text-text-grey"
                )}
              >
                Годовой
                <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[11px] font-semibold text-accent">
                  −20%
                </span>
              </span>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={clsx(
                  "relative rounded-xl p-8 flex flex-col gap-6 transition-all duration-300",
                  plan.accent
                    ? "bg-white/5 border border-accent/40 shadow-[0_0_40px_rgba(207,254,37,0.08)]"
                    : "bg-card border border-white/10"
                )}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1">
                    <span className="text-p-03 font-semibold text-bg">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <h4 className="text-h4 font-semibold text-white">
                    {plan.name}
                  </h4>
                  <p className="text-p-03 text-text-grey">{plan.desc}</p>
                </div>

                <div className="flex items-end gap-2">
                  {plan.priceMonth ? (
                    <>
                      <span className="text-h2 font-bold text-white">
                        {(annual ? plan.priceYear! : plan.priceMonth).toLocaleString("ru-RU")} ₽
                      </span>
                      <span className="text-p-02 text-text-grey pb-1">/мес</span>
                    </>
                  ) : (
                    <span className="text-h3 font-bold text-white">
                      Индивидуально
                    </span>
                  )}
                </div>

                <div className="h-px bg-white/8" />

                <ul className="flex flex-col gap-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path
                            d="M1 4l2.5 2.5L9 1"
                            stroke="#cffe25"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="text-p-02 text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.accent ? "primary" : "outline"}
                  href="/contact"
                  className="w-full justify-center"
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
