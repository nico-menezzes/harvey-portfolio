import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageBuilder, type Block } from "@/components/PageBuilder";
import { PageShell, type SiteSettings } from "@/components/PageShell";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY, PAGE_SLUGS_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";

/**
 * Any page built in the CMS (other than "home") is served here at /its-slug,
 * wrapped in the global menu + footer.
 */
export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(PAGE_SLUGS_QUERY);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
    stega: false,
  });
  const page = data as { title?: string } | null;
  return { title: page?.title ? `${page.title} — H.Studio` : "H.Studio" };
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [pageRes, settingsRes] = await Promise.all([
    sanityFetch({ query: PAGE_QUERY, params: { slug } }),
    sanityFetch({ query: SETTINGS_QUERY }),
  ]);
  const page = pageRes.data as { pageBuilder?: Block[]; menuTheme?: string } | null;
  const settings = settingsRes.data as SiteSettings;

  if (!page) notFound();

  return (
    <PageShell settings={settings} menuTheme={page.menuTheme ?? "onLight"}>
      <PageBuilder blocks={page.pageBuilder} />
    </PageShell>
  );
}
