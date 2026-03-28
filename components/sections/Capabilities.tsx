import Card from "@/components/ui/Card";

const capabilities = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="#cffe25" strokeWidth="1.8" />
        <path d="M14 8v6l4 2" stroke="#cffe25" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Ответы 24/7",
    desc: "Никогда не пропустит звонок или сообщение — работает без выходных и ночью.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20l6-6 4 4 8-10" stroke="#cffe25" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="22" cy="6" r="2" fill="#cffe25" />
      </svg>
    ),
    title: "Квалификация лидов",
    desc: "ИИ задаёт уточняющие вопросы и автоматически отсеивает нецелевые обращения.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="8" width="8" height="12" rx="2" stroke="#cffe25" strokeWidth="1.8" />
        <rect x="16" y="4" width="8" height="12" rx="2" stroke="#cffe25" strokeWidth="1.8" />
        <path d="M8 20v2M20 16v6M8 22h12" stroke="#cffe25" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "CRM-интеграция",
    desc: "Синхронизация с AmoCRM, Битрикс24 — лиды и записи автоматически появляются в вашей базе.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 22V16M9 22v-8M14 22V10M19 22V6M24 22V4" stroke="#cffe25" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Аналитика звонков",
    desc: "Полный лог переговоров, записи, транскрипции. Видите, о чём спрашивают клиенты.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M12 4C12 4 8 6 8 14s4 10 4 10M16 4s4 2 4 10-4 10-4 10M4 14h20" stroke="#cffe25" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="14" cy="14" r="10" stroke="white" strokeWidth="1.2" strokeDasharray="2 3" />
      </svg>
    ),
    title: "Мультиязычность",
    desc: "Русский, английский и другие языки. Подходит для работы с иностранными покупателями.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="12" width="18" height="12" rx="3" stroke="#cffe25" strokeWidth="1.8" />
        <path d="M9 12V9a5 5 0 0110 0v3" stroke="#cffe25" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="14" cy="18" r="2" fill="#cffe25" />
      </svg>
    ),
    title: "Безопасность данных",
    desc: "Шифрование данных, соответствие 152-ФЗ. Данные ваших клиентов в безопасности.",
  },
];

export default function Capabilities() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center text-center gap-4">
            <h2 className="text-h2 font-bold max-w-2xl">
              Всё что нужно для автоматизации агентства
            </h2>
            <p className="text-p-02 text-text-grey max-w-lg">
              Zerk — это полноценная платформа, а не просто чат-бот.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap) => (
              <Card key={cap.title} className="p-7 flex flex-col gap-5">
                <div className="h-14 w-14 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
                  {cap.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h5 className="text-h5 font-semibold text-white">
                    {cap.title}
                  </h5>
                  <p className="text-p-02 text-text-grey">{cap.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
