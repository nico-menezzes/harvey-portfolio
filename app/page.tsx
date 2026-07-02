import { PageBuilder, type Block } from "@/components/PageBuilder";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CreativeStatement } from "@/components/CreativeStatement";
import { About } from "@/components/About";
import { PhotoBanner } from "@/components/PhotoBanner";
import { Services } from "@/components/Services";
import { Works } from "@/components/Works";
import { Testimonials } from "@/components/Testimonials";
import { News } from "@/components/News";
import { Footer } from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY } from "@/sanity/lib/queries";

/**
 * Homepage — the page built in the CMS with the slug "home". If the CMS has no
 * home page yet, we fall back to the built-in sections with their defaults so
 * the site never renders blank.
 */
export default async function Home() {
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug: "home" },
  });
  const page = data as { pageBuilder?: Block[] } | null;

  if (page?.pageBuilder?.length) {
    return (
      <main className="relative">
        <PageBuilder blocks={page.pageBuilder} />
      </main>
    );
  }

  // Safety net: the original section order with each component's own defaults.
  return (
    <main className="relative">
      <div className="absolute inset-x-0 top-0 z-50 px-[var(--gutter)]">
        <Navbar />
      </div>
      <Hero />
      <CreativeStatement />
      <About />
      <PhotoBanner />
      <Services />
      <Works />
      <Testimonials />
      <News />
      <Footer />
    </main>
  );
}
