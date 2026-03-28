import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "О нас — Zerk",
  description:
    "Zerk — команда ИИ-разработчиков, специализирующихся на автоматизации агентств недвижимости.",
};

const values = [
  {
    title: "Специализация",
    desc: "Мы работаем только с рынком недвижимости. Это позволяет нам глубоко понимать специфику и создавать по-настоящему полезные продукты.",
  },
  {
    title: "Результат",
    desc: "Нас оценивают не по красивым презентациям, а по конкретным цифрам: снижению стоимости лида, росту конверсии и количеству закрытых сделок.",
  },
  {
    title: "Скорость",
    desc: "Запускаем за 24 часа. Интеграция с вашей CRM, каналами и обучение модели под ваши объекты — без долгих согласований.",
  },
];

const team = [
  { name: "Артём Зерков", role: "CEO & Co-founder", initials: "АЗ" },
  { name: "Михаил Орлов", role: "CTO", initials: "МО" },
  { name: "Анна Белова", role: "Head of Product", initials: "АБ" },
  { name: "Кирилл Фёдоров", role: "Head of Sales", initials: "КФ" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20">
        <div className="container flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-p-03 font-medium text-white/70">О компании</span>
          </div>
          <h1 className="text-h1 font-bold">
            Мы превращаем ИИ в продажи недвижимости
          </h1>
          <p className="text-p-01 text-text-grey">
            Zerk основан в 2024 году командой, которая прошла путь от
            разработчиков чат-ботов до создателей комплексной ИИ-платформы для
            рынка недвижимости.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h2 className="text-h2 font-bold">Наша миссия</h2>
              <p className="text-p-01 text-text-grey">
                Сделать так, чтобы каждое агентство недвижимости — от частного
                риелтора до федеральной сети — могло позволить себе
                профессиональный AI колл-центр и умный чат-бот.
              </p>
              <p className="text-p-02 text-text-grey">
                Рынок недвижимости теряет миллиарды рублей из-за пропущенных
                звонков и медленных ответов. Мы решаем эту проблему.
              </p>
              <Button variant="primary" href="/contact">
                Познакомиться с командой
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "2024", label: "Год основания" },
                { value: "120+", label: "Клиентов" },
                { value: "24ч", label: "Срок запуска" },
                { value: "96%", label: "Удовлетворённость" },
              ].map((stat) => (
                <Card key={stat.label} className="p-6 text-center">
                  <p className="text-h2 font-bold text-accent">{stat.value}</p>
                  <p className="text-p-03 text-text-grey mt-1">{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container flex flex-col gap-10">
          <h2 className="text-h2 font-bold text-center">Наши принципы</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {values.map((v) => (
              <Card key={v.title} className="p-7 flex flex-col gap-3">
                <h4 className="text-h4 font-semibold text-white">{v.title}</h4>
                <p className="text-p-02 text-text-grey">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container flex flex-col gap-10">
          <h2 className="text-h2 font-bold text-center">Команда</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {team.map((member) => (
              <Card key={member.name} className="p-6 flex flex-col items-center gap-4 text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-accent/30 to-white/5 border border-accent/20 flex items-center justify-center">
                  <span className="text-h5 font-bold text-accent">
                    {member.initials}
                  </span>
                </div>
                <div>
                  <p className="text-p-02 font-semibold text-white">
                    {member.name}
                  </p>
                  <p className="text-p-03 text-text-grey">{member.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
