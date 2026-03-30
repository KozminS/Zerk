"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScroll } from "@/components/ui/use-scroll";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "Главная", href: "/" },
  { label: "Демо-чат", href: "/chat" },
  { label: "О нас", href: "/#about" },
  { label: "Услуги", href: "/#services" },
  { label: "Цены", href: "/#pricing" },
];

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(20);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const floating = scrolled && !open

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] flex justify-center px-4">
      <motion.div
        initial={false}
        animate={{
          marginTop: floating ? 12 : 0,
          borderRadius: floating ? 18 : 0,
          maxWidth: floating ? 880 : 1400,
          backgroundColor: floating ? "rgba(12,12,15,0.85)" : "rgba(12,12,15,0)",
          borderColor: floating ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0)",
          boxShadow: floating
            ? "0 8px 32px rgba(0,0,0,0.45)"
            : "0 0px 0px rgba(0,0,0,0)",
          backdropFilter: floating ? "blur(14px)" : "blur(0px)",
          WebkitBackdropFilter: floating ? "blur(14px)" : "blur(0px)",
        }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%",
          borderWidth: 1,
          borderStyle: "solid",
        }}
      >
        <nav className="flex items-center justify-between px-6 h-[64px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 shrink-0">
            <span className="text-h5 font-bold text-white">Zerk</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-p-02 text-text-grey hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="text-p-02 text-text-grey hover:text-white transition-colors"
            >
              Войти
            </Link>
            <Button variant="primary" href="/contact">
              Оставить заявку
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 text-white hover:bg-white/5 transition-colors"
            aria-label="Меню"
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </button>
        </nav>
      </motion.div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden fixed top-0 left-0 right-0 bottom-0 z-[-1] bg-bg/95 backdrop-blur-[14px] border-t border-white/5 pt-[72px] transition-all duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <div
          className={cn(
            "container py-6 flex flex-col gap-2 transition-all duration-300 ease-out",
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
          )}
          style={{ transitionDelay: open ? "60ms" : "0ms" }}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-p-01 text-white/80 hover:text-white py-3 border-b border-white/5 transition-colors"
              style={{ transitionDelay: open ? `${i * 40 + 80}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <Link
              href="/contact"
              className="text-p-02 text-white/60 hover:text-white text-center py-2 transition-colors"
              onClick={() => setOpen(false)}
            >
              Войти
            </Link>
            <Button
              variant="primary"
              href="/contact"
              className="w-full justify-center"
            >
              Оставить заявку
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
