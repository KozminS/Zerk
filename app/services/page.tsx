import type { Metadata } from "next";
import Features from "@/components/sections/Features";
import Capabilities from "@/components/sections/Capabilities";
import Integration from "@/components/sections/Integration";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Услуги — Zerk",
  description:
    "AI-чатботы и голосовые колл-центры для агентств недвижимости от Zerk.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-40 pb-20">
        <div className="container flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-p-03 font-medium text-white/70">Наши услуги</span>
          </div>
          <h1 className="text-h1 font-bold">
            ИИ-продукты для рынка недвижимости
          </h1>
          <p className="text-p-01 text-text-grey">
            Два продукта для полной автоматизации входящего потока:
            AI-чатбот для текстовых каналов и AI Колл-центр для голосовых.
          </p>
        </div>
      </section>
      <Features />
      <Capabilities />
      <Integration />
      <CTA />
    </>
  );
}
