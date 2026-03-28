import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Условия использования — Zerk",
};

export default function TermsPage() {
  return (
    <section className="pt-40 pb-20">
      <div className="container max-w-3xl">
        <h1 className="text-h1 font-bold mb-8">Условия использования</h1>
        <div className="flex flex-col gap-6 text-p-02 text-text-grey">
          <p>
            Используя сайт и сервисы Zerk, вы соглашаетесь с настоящими
            условиями.
          </p>
          <h2 className="text-h4 font-semibold text-white">
            1. Описание сервиса
          </h2>
          <p>
            Zerk предоставляет платформу для автоматизации коммуникаций
            агентств недвижимости с использованием технологий искусственного
            интеллекта.
          </p>
          <h2 className="text-h4 font-semibold text-white">
            2. Условия использования
          </h2>
          <p>
            Запрещается использование сервиса для рассылки спама, мошеннической
            деятельности или нарушения законодательства РФ.
          </p>
          <h2 className="text-h4 font-semibold text-white">3. Оплата</h2>
          <p>
            Оплата производится согласно выбранному тарифному плану. Все цены
            указаны в рублях включая НДС.
          </p>
          <h2 className="text-h4 font-semibold text-white">4. Контакты</h2>
          <p>
            По вопросам:{" "}
            <a
              href="mailto:hello@zerk.ai"
              className="text-white hover:text-accent transition-colors"
            >
              hello@zerk.ai
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
