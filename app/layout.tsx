import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
export const metadata: Metadata = {
  title: "Zerk — ИИ-решения для агентств недвижимости",
  description:
    "Zerk создаёт AI-чатботы и голосовые колл-центры для агентств недвижимости. Отвечаем на звонки и заявки 24/7 — без найма операторов.",
  keywords: "ИИ, чатбот, колл-центр, недвижимость, автоматизация, AI",
  openGraph: {
    title: "Zerk — ИИ-решения для агентств недвижимости",
    description:
      "AI-чатботы и голосовые колл-центры для агентств недвижимости. Работаем 24/7.",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zerk — ИИ-решения для агентств недвижимости",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-bg text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
