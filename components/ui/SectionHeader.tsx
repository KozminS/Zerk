import { clsx } from "clsx";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-4",
        centered && "items-center text-center",
        className
      )}
    >
      {label && (
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 self-start">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="text-p-03 font-medium text-white/70">{label}</span>
        </div>
      )}
      <h2
        className={clsx(
          "text-h2 font-bold text-white",
          centered && "max-w-3xl"
        )}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <p
          className={clsx(
            "text-p-02 text-text-grey",
            centered && "max-w-xl"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
