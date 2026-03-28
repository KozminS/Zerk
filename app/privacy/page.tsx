import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — Zerk",
};

export default function PrivacyPage() {
  return (
    <section className="pt-40 pb-20">
      <div className="container max-w-3xl">
        <h1 className="text-h1 font-bold mb-8">Политика конфиденциальности</h1>
        <div className="flex flex-col gap-6 text-p-02 text-text-grey">
          <p>
            Настоящая политика конфиденциальности описывает, как Zerk собирает,
            использует и защищает информацию пользователей сайта.
          </p>
          <h2 className="text-h4 font-semibold text-white">1. Сбор данных</h2>
          <p>
            Мы собираем только те данные, которые вы предоставляете
            добровольно при заполнении форм на сайте: имя, email, телефон,
            название организации.
          </p>
          <h2 className="text-h4 font-semibold text-white">
            2. Использование данных
          </h2>
          <p>
            Данные используются для обработки заявок, обратной связи и
            отправки информационных материалов по запросу пользователя.
          </p>
          <h2 className="text-h4 font-semibold text-white">
            3. Защита данных
          </h2>
          <p>
            Все данные хранятся на защищённых серверах с шифрованием. Мы
            соблюдаем требования Федерального закона № 152-ФЗ «О персональных
            данных».
          </p>
          <h2 className="text-h4 font-semibold text-white">4. Контакты</h2>
          <p>
            По вопросам обработки персональных данных обращайтесь:{" "}
            <a
              href="mailto:privacy@zerk.ai"
              className="text-white hover:text-accent transition-colors"
            >
              privacy@zerk.ai
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
