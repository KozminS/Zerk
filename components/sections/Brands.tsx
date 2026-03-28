import Marquee from "@/components/ui/Marquee";

const brands = [
  { name: "Этажи", width: 100 },
  { name: "Century 21", width: 120 },
  { name: "Инком Недвижимость", width: 140 },
  { name: "Миэль", width: 90 },
  { name: "НДВ", width: 80 },
  { name: "Риелти", width: 95 },
  { name: "Est-a-Tet", width: 110 },
  { name: "Бон Тон", width: 100 },
];

function BrandLogo({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center mx-8 shrink-0">
      <span className="text-p-02 font-semibold text-white/30 whitespace-nowrap hover:text-white/60 transition-colors duration-300">
        {name}
      </span>
    </div>
  );
}

export default function Brands() {
  return (
    <section className="py-12 border-y border-white/5">
      <div className="container mb-8">
        <p className="text-p-02 text-text-grey text-center">
          Нам доверяют ведущие агентства недвижимости
        </p>
      </div>

      <Marquee>
        <div className="flex items-center py-2">
          {brands.map((brand) => (
            <BrandLogo key={brand.name} name={brand.name} />
          ))}
        </div>
      </Marquee>
    </section>
  );
}
