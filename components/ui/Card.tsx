import { clsx } from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={clsx(
        "relative rounded-xl bg-card overflow-hidden",
        hover &&
          "group transition-all duration-300 hover:border-accent/20",
        className
      )}
    >
      {children}
      {/* Card outline border */}
      <div className="absolute inset-0 rounded-xl border border-white/10 pointer-events-none transition-colors duration-300 group-hover:border-white/20" />
    </div>
  );
}
