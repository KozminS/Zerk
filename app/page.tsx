import Hero from "@/components/sections/Hero";
import Brands from "@/components/sections/Brands";
import Intro from "@/components/sections/Intro";
import Features from "@/components/sections/Features";
import Team from "@/components/sections/Team";
import Capabilities from "@/components/sections/Capabilities";
import HowWeWork from "@/components/sections/HowWeWork";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Brands />
      <Intro />
      <Features />
      <Team />
      <Capabilities />
      <HowWeWork />
      <FAQ />
      <CTA />
    </>
  );
}
