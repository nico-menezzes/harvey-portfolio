import { Hero } from "@/components/Hero";
import { CreativeStatement } from "@/components/CreativeStatement";
import { About } from "@/components/About";
import { PhotoBanner } from "@/components/PhotoBanner";
import { Services } from "@/components/Services";
import { Works } from "@/components/Works";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <CreativeStatement />
      <About />
      <PhotoBanner />
      <Services />
      <Works />
      <Testimonials />
    </main>
  );
}
