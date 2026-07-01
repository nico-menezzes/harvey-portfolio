import { Hero } from "@/components/Hero";
import { CreativeStatement } from "@/components/CreativeStatement";
import { About } from "@/components/About";
import { PhotoBanner } from "@/components/PhotoBanner";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <main>
      <Hero />
      <CreativeStatement />
      <About />
      <PhotoBanner />
      <Services />
    </main>
  );
}
