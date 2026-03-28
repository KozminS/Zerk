import Marquee from "@/components/ui/Marquee";

const teamRow1 = [
  { name: "Алексей Котов", role: "Директор АН «Простор»" },
  { name: "Мария Иванова", role: "Риелтор, Est-a-Tet" },
  { name: "Дмитрий Захаров", role: "Руководитель отдела продаж, Этажи" },
  { name: "Ольга Семёнова", role: "Учредитель, АН «Капитал»" },
  { name: "Иван Петров", role: "CTO, PropTech стартап" },
];

const teamRow2 = [
  { name: "Наталья Козлова", role: "Директор, Инком" },
  { name: "Сергей Лебедев", role: "Менеджер продаж, НДВ" },
  { name: "Юлия Фролова", role: "Партнёр, Century 21" },
  { name: "Андрей Волков", role: "Основатель, АН «Миэль»" },
  { name: "Татьяна Новикова", role: "Специалист, Бон Тон" },
];

function ClientCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="relative mx-3 flex items-center gap-3 rounded-xl border border-white/10 bg-card px-5 py-4 w-[240px] shrink-0 overflow-hidden group hover:border-white/20 transition-colors duration-300">
      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent/30 to-white/5 border border-white/10 flex items-center justify-center shrink-0">
        <span className="text-p-03 font-bold text-accent">
          {name.charAt(0)}
        </span>
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-p-02 font-semibold text-white truncate">
          {name}
        </span>
        <span className="text-p-03 text-text-grey truncate">{role}</span>
      </div>
      {/* Hover color accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}

export default function Team() {
  return (
    <section className="section-padding overflow-hidden">
      <div className="container mb-10">
        <div className="flex flex-col gap-2">
          <h4 className="text-h4 font-semibold text-white max-w-lg">
            Нам доверяют лидеры рынка недвижимости
          </h4>
          <p className="text-p-02 text-text-grey">
            Более 120 агентств и частных риелторов уже работают с Zerk.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 relative">
        {/* Shadow overlays */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-bg to-transparent" />

        {/* Row 1 — left to right */}
        <Marquee fadeEdges={false}>
          <div className="flex py-1">
            {teamRow1.map((person) => (
              <ClientCard key={person.name} {...person} />
            ))}
          </div>
        </Marquee>

        {/* Row 2 — right to left */}
        <Marquee fadeEdges={false} reverse>
          <div className="flex py-1">
            {teamRow2.map((person) => (
              <ClientCard key={person.name} {...person} />
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
