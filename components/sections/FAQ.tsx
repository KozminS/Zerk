"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";

const faqs = [
  {
    q: "А клиенты не поймут, что общаются с ботом?",
    a: "По кейсам, 99,9% обращающихся не отличают бота от живого сотрудника. Наша система отвечает за 30 секунд, а если вопрос нестандартный — мгновенно переключает на менеджера или оставляет данные для дальнейшего контакта человека.",
  },
  {
    q: "У нас и так всё нормально работает, зачем нам это?",
    a: "Возможно. Но если в день приходит 30–40 обращений и 20–25% теряются — это 6–10 упущенных клиентов ежедневно. Большинство наших клиентов были уверены, что «всё ок», пока не увидели реальные цифры потерь.",
  },
  {
    q: "А наша клиентская база не утечёт?",
    a: "Данные обрабатываются на российских серверах по 152-ФЗ. Бот подключается как надстройка к вашей CRM — мы не храним и не копируем вашу базу. Вся информация остаётся внутри вашего контура.",
  },
  {
    q: "Мы уже пробовали автоматизацию и не сработало.",
    a: "Обычно «не сработало» — это универсальное решение без адаптации под нишу или перестройка всех процессов, которую команда забросила. Мы настраиваем бота под вашу отрасль и подключаем к уже используемой CRM. Внедрение занимает ~14 дней, без ломки привычных процессов.",
  },
  {
    q: "А если не сработает, я потеряю деньги?",
    a: "Наша гарантия простая: если хотя бы одно обращение будет пропущено системой — мы вернём деньги. Перед внедрением мы предлагаем бесплатный трёхдневный пилот: вы увидите результат на реальных обращениях до того, как примете решение.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-padding">
      <div className="container">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-p-03 font-medium text-white/70">FAQ</span>
            </div>
            <h2 className="text-h2 font-bold">Частые вопросы</h2>
            <p className="text-p-02 text-text-grey max-w-md">
              Отвечаем честно на то, что спрашивают чаще всего
            </p>
          </div>

          <div className="flex flex-col gap-3 max-w-3xl mx-auto w-full">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  className={clsx(
                    "rounded-xl border overflow-hidden transition-colors duration-300",
                    isOpen
                      ? "border-accent/30 bg-white/5"
                      : "border-white/10 bg-card"
                  )}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span
                      className={clsx(
                        "text-p-01 font-semibold transition-colors duration-200",
                        isOpen ? "text-white" : "text-white/80"
                      )}
                    >
                      {faq.q}
                    </span>

                    <motion.span
                      animate={{
                        rotate: isOpen ? 45 : 0,
                        borderColor: isOpen
                          ? "rgba(207,254,37,0.6)"
                          : "rgba(255,255,255,0.2)",
                        backgroundColor: isOpen
                          ? "rgba(207,254,37,0.15)"
                          : "rgba(255,255,255,0.05)",
                      }}
                      transition={{ duration: 0.25 }}
                      className="h-7 w-7 rounded-full border flex items-center justify-center shrink-0"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <motion.path
                          d="M6 1v10M1 6h10"
                          stroke={isOpen ? "#cffe25" : "white"}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          animate={{ stroke: isOpen ? "#cffe25" : "white" }}
                          transition={{ duration: 0.2 }}
                        />
                      </svg>
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p className="px-6 pb-5 text-p-02 text-text-grey leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
