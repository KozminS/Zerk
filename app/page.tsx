import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Features from "@/components/sections/Features";
import WhyUs from "@/components/sections/WhyUs";
import Capabilities from "@/components/sections/Capabilities";
import HowWeWork from "@/components/sections/HowWeWork";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import { SectionReveal } from "@/components/ui/SectionReveal";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionReveal><Problem /></SectionReveal>
      <SectionReveal><Features /></SectionReveal>
      <SectionReveal><WhyUs /></SectionReveal>
      <SectionReveal><Capabilities /></SectionReveal>
      <SectionReveal><HowWeWork /></SectionReveal>
      <SectionReveal><FAQ /></SectionReveal>
      <SectionReveal><CTA /></SectionReveal>
    </>
  );
}
