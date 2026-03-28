import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Блог — Zerk",
  description: "Статьи об автоматизации агентств недвижимости с помощью ИИ.",
};

const posts = [
  {
    slug: "ai-call-center-realtor",
    tag: "Колл-центр",
    title: "Как AI колл-центр помог агентству увеличить конверсию на 34%",
    excerpt: "Разбираем кейс московского агентства, которое внедрило Zerk и перестало терять клиентов ночью.",
    date: "15 марта 2026",
    readTime: "6 мин",
  },
  {
    slug: "chatbot-vs-manager",
    tag: "Чат-бот",
    title: "Чат-бот против менеджера: кто лучше квалифицирует лиды?",
    excerpt: "Сравниваем скорость ответа, качество квалификации и стоимость обработки заявки.",
    date: "8 марта 2026",
    readTime: "8 мин",
  },
  {
    slug: "amocrm-integration",
    tag: "Интеграции",
    title: "Как настроить интеграцию Zerk с AmoCRM за 30 минут",
    excerpt: "Пошаговая инструкция: от регистрации до первого автоматического лида в вашей воронке.",
    date: "1 марта 2026",
    readTime: "5 мин",
  },
  {
    slug: "missed-calls-cost",
    tag: "Аналитика",
    title: "Сколько стоит один пропущенный звонок для агентства недвижимости?",
    excerpt: "Считаем реальную стоимость потери клиента из-за неответа и находим способ её устранить.",
    date: "22 февраля 2026",
    readTime: "7 мин",
  },
  {
    slug: "whatsapp-bot-setup",
    tag: "Чат-бот",
    title: "WhatsApp-бот для риелтора: пошаговая настройка",
    excerpt: "Как подключить Zerk к WhatsApp Business и начать автоматически отвечать клиентам.",
    date: "15 февраля 2026",
    readTime: "10 мин",
  },
  {
    slug: "ai-trends-2026",
    tag: "Тренды",
    title: "ИИ в недвижимости 2026: что меняется и как к этому готовиться",
    excerpt: "Обзор ключевых технологических трендов, которые изменят рынок недвижимости в этом году.",
    date: "5 февраля 2026",
    readTime: "12 мин",
  },
];

export default function BlogPage() {
  return (
    <section className="pt-40 pb-20">
      <div className="container flex flex-col gap-12">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-p-03 font-medium text-white/70">Блог</span>
          </div>
          <h1 className="text-h1 font-bold">Практики автоматизации</h1>
          <p className="text-p-01 text-text-grey max-w-xl">
            Кейсы, инструкции и аналитика для агентств недвижимости
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="p-6 flex flex-col gap-4 h-full cursor-pointer">
                <div className="aspect-[16/9] rounded-lg bg-gradient-to-br from-white/5 to-white/2 border border-white/5 flex items-center justify-center">
                  <span className="text-p-03 text-text-grey">{post.tag}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-accent/10 px-3 py-0.5 text-p-03 text-accent font-medium">
                    {post.tag}
                  </span>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <h5 className="text-h5 font-semibold text-white leading-snug">
                    {post.title}
                  </h5>
                  <p className="text-p-03 text-text-grey">{post.excerpt}</p>
                </div>
                <div className="flex items-center gap-3 text-p-03 text-text-grey mt-auto pt-2 border-t border-white/5">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime} чтения</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
