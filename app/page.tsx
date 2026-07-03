import { PageBuilder, type Block } from "@/components/PageBuilder";
import { PageShell, type SiteSettings } from "@/components/PageShell";
import { Hero } from "@/components/Hero";
import { CreativeStatement } from "@/components/CreativeStatement";
import { About } from "@/components/About";
import { PhotoBanner } from "@/components/PhotoBanner";
import { Services } from "@/components/Services";
import { Works } from "@/components/Works";
import { Testimonials } from "@/components/Testimonials";
import { News } from "@/components/News";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";

/**
 * Homepage — the page built in the CMS with the slug "home", wrapped in the
 * global menu + footer (from Site Settings). Falls back to the built-in
 * sections with their defaults if the CMS has no home page yet.
 */
export default async function Home() {
  const [pageRes, settingsRes] = await Promise.all([
    sanityFetch({ query: PAGE_QUERY, params: { slug: "home" } }),
    sanityFetch({ query: SETTINGS_QUERY }),
  ]);
  const page = pageRes.data as { pageBuilder?: Block[]; menuTheme?: string } | null;
  const settings = settingsRes.data as SiteSettings;

  if (page?.pageBuilder?.length) {
    return (
      <PageShell settings={settings} menuTheme={page.menuTheme ?? "onDark"}>
        <PageBuilder blocks={page.pageBuilder} />
      </PageShell>
    );
  }

  // Safety net: the original section order with each component's own defaults.
  return (
    <PageShell settings={settings} menuTheme="onDark">
      <Hero />
      <CreativeStatement />
      <About />
      <PhotoBanner />
      <Services />
      <Works />
      <Testimonials />
      <News />
    </PageShell>
  );
}
