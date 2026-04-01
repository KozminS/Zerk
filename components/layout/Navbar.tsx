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
  { label: "Демо", href: "/chat" },
  { label: "О нас", href: "/#how-we-work" },
  { label: "Услуги", href: "/#features" },
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
            <span className="text-[17px] md:text-h5 font-bold text-white">Zerk</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 ml-16">
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
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" href="/chat" className="!px-4 !py-2 !text-xs">
              Демо
            </Button>
            <Button variant="primary" href="/contact" className="!px-4 !py-2 !text-xs">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="mr-1.5">
                <path d="M2 3.5C2 2.67 2.67 2 3.5 2h1.75c.37 0 .7.25.79.61l.75 3a.8.8 0 01-.22.79L5.5 7.5a8.6 8.6 0 004 4l1.1-1.07a.8.8 0 01.79-.22l3 .75c.36.09.61.42.61.79V13.5c0 .83-.67 1.5-1.5 1.5C6.1 15 1 9.9 1 3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Записаться на созвон
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
            <Button
              variant="outline"
              href="/chat"
              className="w-full justify-center"
              onClick={() => setOpen(false)}
            >
              Попробовать демо
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="ml-1.5">
                <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
            <Button
              variant="primary"
              href="/contact"
              className="w-full justify-center"
              onClick={() => setOpen(false)}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mr-1.5">
                <path d="M2 3.5C2 2.67 2.67 2 3.5 2h1.75c.37 0 .7.25.79.61l.75 3a.8.8 0 01-.22.79L5.5 7.5a8.6 8.6 0 004 4l1.1-1.07a.8.8 0 01.79-.22l3 .75c.36.09.61.42.61.79V13.5c0 .83-.67 1.5-1.5 1.5C6.1 15 1 9.9 1 3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Записаться на созвон
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
