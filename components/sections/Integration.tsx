import Button from "@/components/ui/Button";

const integrations = [
  {
    name: "AmoCRM",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <rect x="4" y="12" width="32" height="20" rx="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 20h20M10 26h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="30" cy="9" r="4" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: "Битрикс24",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <path d="M8 8h10v10H8zM22 8h10v10H22zM8 22h10v10H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M22 27h10M27 22v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <path d="M20 5C11.716 5 5 11.716 5 20c0 2.993.84 5.79 2.3 8.163L5 35l7.1-2.27A14.94 14.94 0 0020 35c8.284 0 15-6.716 15-15S28.284 5 20 5z" stroke="currentColor" strokeWidth="2"/>
        <path d="M14.5 17.5s.5-1 1.5.5 3 5 5 5 3-2 3-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Telegram",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <path d="M34 8L6 19.5l11 3.5 3.5 10 5.5-7 7.5 5.5L34 8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M17 23l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "ЦИАН",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <path d="M20 5L5 16v19h10V24h10v11h10V16L20 5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <circle cx="20" cy="16" r="3" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    name: "Авито",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <circle cx="13" cy="14" r="6" stroke="currentColor" strokeWidth="2"/>
        <circle cx="27" cy="14" r="6" stroke="currentColor" strokeWidth="2"/>
        <circle cx="20" cy="27" r="6" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    name: "Яндекс",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <path d="M23 7h-5C13.477 7 9 11.477 9 16c0 4.1 2.8 7.55 6.6 8.56L9 33h5l7-9h3v9h5V7h-6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "Calltouch",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <path d="M10 9h4l2 7-3 2a17 17 0 008 8l2-3 7 2v4a2 2 0 01-2 2C13 31 9 22 9 11a2 2 0 012-2h-1z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M26 9a9 9 0 019 9M26 14a4 4 0 014 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "1С",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <rect x="5" y="5" width="30" height="30" rx="5" stroke="currentColor" strokeWidth="2"/>
        <path d="M15 28V14l-3 2M22 14h4a4 4 0 010 8h-4v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "Salesforce",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <path d="M16 11a6 6 0 0110 3.5A6.5 6.5 0 0132 21a6.5 6.5 0 01-6.5 6.5H13A6 6 0 0112 16a6 6 0 014-5z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    name: "GetCourse",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="2"/>
        <path d="M24 20a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" strokeWidth="2"/>
        <path d="M24 20h9M7 20h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Slack",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <path d="M16 8a4 4 0 00-4 4v1h8v-1a4 4 0 00-4-4zM12 17H8a4 4 0 000 8h4v-8zM16 32a4 4 0 004-4v-1h-8v1a4 4 0 004 4zM20 23h-8v8h8v-8zM24 32a4 4 0 004-4v-1h-8v1a4 4 0 004 4zM28 23h4a4 4 0 000-8h-4v8zM24 8a4 4 0 00-4 4v1h8v-1a4 4 0 00-4-4zM20 17h8v8h-8v-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

// Small square separator between icons
function Separator() {
  return (
    <div className="shrink-0 mx-5 flex items-center">
      <div className="h-2 w-2 rounded-[2px] bg-white/15 rotate-45" />
    </div>
  );
}

function IntegrationIcon({ name, icon }: { name: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 shrink-0 group">
      <div className="flex flex-col items-center gap-2">
        <div className="text-white/35 group-hover:text-white/70 transition-colors duration-300">
          {icon}
        </div>
        <span className="text-p-03 text-white/25 group-hover:text-white/50 transition-colors duration-300 whitespace-nowrap">
          {name}
        </span>
      </div>
    </div>
  );
}

// One strip with separator between each icon
function Strip() {
  return (
    <div className="flex items-center">
      {integrations.map((item, i) => (
        <div key={i} className="flex items-center">
          <IntegrationIcon name={item.name} icon={item.icon} />
          <Separator />
        </div>
      ))}
    </div>
  );
}

export default function Integration() {
  return (
    <section className="section-padding overflow-hidden">
      {/* ── Copywriting header ── */}
      <div className="container mb-14">
        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-20">
          <div className="flex flex-col gap-5 max-w-lg">
            <h2 className="text-h2 font-bold leading-tight">
              Не меняйте то, что работает
            </h2>
            <p className="text-p-02 text-text-grey leading-relaxed">
              Zerk встраивается в ваш стек как надстройка — без переезда на
              новую CRM, без обучения команды, без простоя. Просто добавьте ИИ
              поверх и начните принимать обращения уже завтра.
            </p>
          </div>
          <div className="shrink-0">
            <Button variant="outline" href="/services#integrations">
              Все интеграции
            </Button>
          </div>
        </div>
      </div>

      {/* ── Single animated row ── */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-bg to-transparent" />

        {/* Marquee: duplicate strip for seamless loop */}
        <div className="flex animate-marquee-slow">
          <Strip />
          <Strip />
        </div>
      </div>
    </section>
  );
}
