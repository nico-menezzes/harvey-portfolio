import { Hero } from "@/components/Hero";
import { CreativeStatement } from "@/components/CreativeStatement";
import { About } from "@/components/About";

export default function Home() {
  return (
    <main>
      <Hero />
      <CreativeStatement />
      <About />
    </main>
  );
}
