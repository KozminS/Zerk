import { clsx } from "clsx";

interface MarqueeProps {
  children: React.ReactNode;
  reverse?: boolean;
  speed?: "normal" | "slow";
  className?: string;
  fadeEdges?: boolean;
}

export default function Marquee({
  children,
  reverse = false,
  speed = "normal",
  className,
  fadeEdges = true,
}: MarqueeProps) {
  const animClass = reverse
    ? "animate-marquee-reverse"
    : speed === "slow"
    ? "animate-marquee-slow"
    : "animate-marquee";

  return (
    <div className={clsx("relative overflow-hidden marquee-wrap", className)}>
      {/* Fade edges */}
      {fadeEdges && (
        <>
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-48 bg-gradient-to-r from-bg to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-48 bg-gradient-to-l from-bg to-transparent" />
        </>
      )}

      {/* Track: doubled for seamless loop */}
      <div className={clsx("flex w-max gap-0", animClass)}>
        {children}
        {children}
      </div>
    </div>
  );
}
