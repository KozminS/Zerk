"use client";
import Link from "next/link";
import { Mail, Phone, Send } from "lucide-react";
import { TextHoverEffect, FooterBackgroundGradient } from "@/components/ui/hover-footer";
import { useRouter } from "next/navigation";

const footerLinks = {
  services: {
    label: "Услуги",
    links: [
      { label: "AI-чатбот", href: "/#chatbot" },
      { label: "AI Колл-центр", href: "/#callcenter" },
      { label: "Интеграции", href: "/#integrations" },
    ],
  },
  company: {
    label: "Компания",
    links: [
      { label: "Демо", href: "/chat" },
      { label: "О нас", href: "/#how-we-work" },
      { label: "Услуги", href: "/#features" },
      { label: "Контакты", href: "/contact" },
    ],
  },
  legal: {
    label: "Документы",
    links: [
      { label: "Политика конфиденциальности", href: "/privacy" },
      { label: "Условия использования", href: "/terms" },
    ],
  },
};

const contactInfo = [
  {
    icon: <Mail size={16} className="text-accent shrink-0" />,
    text: "hello@zerk.ai",
    href: "mailto:hello@zerk.ai",
  },
  {
    icon: <Phone size={16} className="text-accent shrink-0" />,
    text: "8 800 123-45-67",
    href: "tel:+78001234567",
  },
  {
    icon: <Send size={16} className="text-accent shrink-0" />,
    text: "Telegram",
    href: "https://t.me/",
  },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  const router = useRouter();

  if (href.includes("#")) {
    const [path, hash] = href.split("#");
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        router.push(href);
      }
    };
    return (
      <a href={href} onClick={handleClick} className="text-p-02 text-text-grey hover:text-white transition-colors">
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className="text-p-02 text-text-grey hover:text-white transition-colors">
      {label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-bg rounded-tl-3xl rounded-tr-3xl border border-b-0 border-white/10">
      <FooterBackgroundGradient />

      <div className="relative z-10 container py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-1">
              <span className="text-h5 font-bold text-white">Zerk</span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1" />
            </Link>
            <p className="text-p-02 text-text-grey max-w-xs">
              ИИ-решения для агентств недвижимости. Автоматизируем общение с
              клиентами 24/7.
            </p>
            {/* Contact */}
            <ul className="flex flex-col gap-2.5 mt-1">
              {contactInfo.map((item) => (
                <li key={item.text} className="flex items-center gap-2.5">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-p-03 text-text-grey hover:text-white transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-p-03 text-text-grey">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="flex flex-col gap-4">
              <h6 className="text-p-02 font-semibold text-white">{section.label}</h6>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-p-03 text-text-grey">
            © {new Date().getFullYear()} Zerk. Все права защищены.
          </p>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-p-03 text-text-grey">Работаем 24/7</span>
          </div>
        </div>
      </div>

      {/* Big hover text */}
      <div className="lg:flex hidden h-64 -mt-16 -mb-10 relative z-10">
        <TextHoverEffect text="ZERK AI" />
      </div>
    </footer>
  );
}
