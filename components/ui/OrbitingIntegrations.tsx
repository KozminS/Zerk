"use client";
import { useState } from "react";
import Image from "next/image";

const integrations = [
  {
    label: "AmoCRM",
    src: "/logos/amocrm.svg",
    // SVG has white bg + colored text → grayscale + invert → white logo on black
    filter: "grayscale(1) invert(1) brightness(1.2)",
    padding: "8px",
  },
  {
    label: "Битрикс24",
    src: "/logos/bitrix24.jpg",
    filter: "grayscale(1) invert(1) brightness(1.1)",
    padding: "6px",
  },
  {
    label: "Telegram",
    src: "/logos/telegram.png",
    filter: "grayscale(1) contrast(20) invert(1)",
    padding: "6px",
    bg: "#000",
  },
  {
    label: "WhatsApp",
    src: "/logos/whatsapp.jpg",
    // Black outline on white → invert → white on black
    filter: "invert(1) brightness(1.1)",
    padding: "6px",
  },
  {
    label: "ЦИАН",
    src: "/logos/cian.png",
    filter: "grayscale(1) contrast(20)",
    padding: "0px",
  },
  {
    label: "Авито",
    src: "/logos/avito.avif",
    filter: "invert(1) brightness(1.1)",
    padding: "6px",
  },
];

export default function OrbitingIntegrations() {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="grid grid-cols-3 gap-3 w-full max-w-[320px]">
        {integrations.map((item) => (
          <Tile key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}

function Tile({ item }: { item: typeof integrations[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-center gap-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-full aspect-square flex items-center justify-center transition-all duration-300 cursor-default overflow-hidden"
        style={{
          background: item.bg ?? (hovered ? "rgba(28,28,35,1)" : "rgba(20,20,26,0.95)"),
          border: `1px solid ${hovered ? "rgba(207,254,37,0.4)" : "rgba(255,255,255,0.1)"}`,
          borderRadius: "14px",
          boxShadow: hovered
            ? "0 0 18px rgba(207,254,37,0.12), 0 4px 20px rgba(0,0,0,0.5)"
            : "0 2px 8px rgba(0,0,0,0.35)",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          padding: item.padding,
        }}
      >
        <Image
          src={item.src}
          alt={item.label}
          width={80}
          height={80}
          className="w-full h-full"
          style={{
            filter: item.filter,
            objectFit: item.padding === "0px" ? "cover" : "contain",
          }}
          unoptimized
        />
      </div>
      <span className="text-[11px] text-white/40 font-medium">{item.label}</span>
    </div>
  );
}
