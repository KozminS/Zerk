import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Контакты — Zerk",
  description: "Свяжитесь с командой Zerk для получения демо или консультации.",
};

export default function ContactPage() {
  return (
    <section className="pt-40 pb-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Left */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 self-start">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="text-p-03 font-medium text-white/70">Связаться</span>
              </div>
              <h1 className="text-h1 font-bold">Давайте поговорим</h1>
              <p className="text-p-01 text-text-grey">
                Оставьте заявку — наш менеджер свяжется в течение 30 минут в
                рабочее время и расскажет, как Zerk поможет вашему агентству.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: "Email", value: "hello@zerk.ai" },
                { label: "Телефон", value: "8 800 123-45-67" },
                { label: "Telegram", value: "@zerkflow" },
              ].map((contact) => (
                <div key={contact.label} className="flex items-center gap-4">
                  <span className="text-p-03 text-text-grey w-20">
                    {contact.label}
                  </span>
                  <span className="text-p-02 text-white font-medium">
                    {contact.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <Card className="p-8">
            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-p-03 text-text-grey">Имя</label>
                  <input
                    type="text"
                    placeholder="Алексей"
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-p-02 text-white placeholder:text-white/30 outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-p-03 text-text-grey">Телефон</label>
                  <input
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-p-02 text-white placeholder:text-white/30 outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-p-03 text-text-grey">Email</label>
                <input
                  type="email"
                  placeholder="you@agency.ru"
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-p-02 text-white placeholder:text-white/30 outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-p-03 text-text-grey">
                  Название агентства
                </label>
                <input
                  type="text"
                  placeholder="АН «Ваше агентство»"
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-p-02 text-white placeholder:text-white/30 outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-p-03 text-text-grey">Сообщение</label>
                <textarea
                  rows={4}
                  placeholder="Расскажите о вашем агентстве и задаче..."
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-p-02 text-white placeholder:text-white/30 outline-none focus:border-accent/50 transition-colors resize-none"
                />
              </div>
              <Button variant="primary" type="submit" className="w-full justify-center">
                Отправить заявку
              </Button>
              <p className="text-p-03 text-text-grey text-center">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <a href="/privacy" className="text-white/60 hover:text-white underline transition-colors">
                  политикой конфиденциальности
                </a>
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
