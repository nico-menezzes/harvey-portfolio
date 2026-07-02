import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageBuilder, type Block } from "@/components/PageBuilder";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY, PAGE_SLUGS_QUERY } from "@/sanity/lib/queries";

/**
 * Any page built in the CMS (other than "home") is served here at /its-slug.
 * We pre-build the known slugs, but new pages still work on demand.
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
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  });
  const page = data as { pageBuilder?: Block[] } | null;

  if (!page) notFound();

  return (
    <main className="relative">
      <PageBuilder blocks={page.pageBuilder} />
    </main>
  );
}
