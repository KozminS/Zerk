import { clsx } from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "green" | "transparent";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <div
      className={clsx(
        "relative inline-flex items-center gap-2 rounded-full px-4 py-2",
        variant === "default" && "bg-white/5 border border-white/10",
        variant === "green" && "bg-green-light border border-green-light/20",
        variant === "transparent" && "bg-transparent border border-white/10",
        className
      )}
    >
      <span
        className={clsx(
          "h-1.5 w-1.5 rounded-full",
          variant === "green" ? "bg-green-600" : "bg-accent"
        )}
      />
      <span
        className={clsx(
          "text-p-03 font-medium",
          variant === "green" ? "text-green-800" : "text-white/80"
        )}
      >
        {children}
      </span>
    </div>
  );
}
