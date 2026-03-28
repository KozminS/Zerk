import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";

const posts = [
  {
    slug: "ai-call-center-realtor",
    tag: "Колл-центр",
    title: "Как AI колл-центр помог агентству увеличить конверсию на 34%",
    excerpt:
      "Разбираем кейс московского агентства, которое внедрило Zerk и перестало терять клиентов ночью.",
    date: "15 марта 2026",
    readTime: "6 мин",
  },
  {
    slug: "chatbot-vs-manager",
    tag: "Чат-бот",
    title: "Чат-бот против менеджера: кто лучше квалифицирует лиды?",
    excerpt:
      "Сравниваем скорость ответа, качество квалификации и стоимость обработки заявки.",
    date: "8 марта 2026",
    readTime: "8 мин",
  },
  {
    slug: "amocrm-integration",
    tag: "Интеграции",
    title: "Как настроить интеграцию Zerk с AmoCRM за 30 минут",
    excerpt:
      "Пошаговая инструкция: от регистрации до первого автоматического лида в вашей воронке.",
    date: "1 марта 2026",
    readTime: "5 мин",
  },
];

export default function Blog() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="flex flex-col gap-12">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div className="flex flex-col gap-3">
              <h2 className="text-h2 font-bold">Блог Zerk</h2>
              <p className="text-p-02 text-text-grey">
                Практические материалы об автоматизации агентств
              </p>
            </div>
            <Button variant="outline" href="/blog">
              Все статьи
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="p-6 flex flex-col gap-4 h-full cursor-pointer">
                  <div className="aspect-[16/9] rounded-lg bg-gradient-to-br from-white/5 to-white/2 border border-white/5 flex items-center justify-center">
                    <span className="text-p-03 text-text-grey">
                      {post.tag}
                    </span>
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
      </div>
    </section>
  );
}
