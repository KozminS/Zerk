"use client";
import { clsx } from "clsx";
import Link from "next/link";

type ButtonVariant = "primary" | "outline";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className,
  type = "button",
}: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3.5 text-p-03 font-semibold transition-all duration-300 group";

  const variants = {
    primary:
      "bg-accent text-bg hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]",
    outline:
      "border border-white/20 text-white hover:border-white/50 hover:bg-white/5 active:scale-[0.98]",
  };

  const classes = clsx(base, variants[variant], className);

  const inner = (
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}
