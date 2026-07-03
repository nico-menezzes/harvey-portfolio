import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { PortableTextBlock } from "@portabletext/types";
import { PageShell, type SiteSettings } from "@/components/PageShell";
import { PortableTextBody } from "@/components/PortableTextBody";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { POST_QUERY, POST_SLUGS_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";

type Post = {
  title?: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  image?: string;
  imageAlt?: string;
  body?: PortableTextBlock[];
};

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(POST_SLUGS_QUERY);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await sanityFetch({ query: POST_QUERY, params: { slug }, stega: false });
  const post = data as Post | null;
  return { title: post?.title ? `${post.title} — H.Studio` : "News — H.Studio" };
}

function formatDate(iso?: string) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [postRes, settingsRes] = await Promise.all([
    sanityFetch({ query: POST_QUERY, params: { slug } }),
    sanityFetch({ query: SETTINGS_QUERY }),
  ]);
  const post = postRes.data as Post | null;
  const settings = settingsRes.data as SiteSettings;

  if (!post) notFound();

  const meta = [post.category, formatDate(post.publishedAt)].filter(Boolean).join("  ·  ");

  return (
    <PageShell settings={settings} menuTheme="onLight">
      <article className="bg-paper px-[var(--gutter)] pb-24 pt-28 text-foreground lg:pt-32">
        {/* Header */}
        <div className="mx-auto max-w-[760px]">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 font-mono text-[length:var(--text-label)] uppercase tracking-[var(--tracking-tight)] text-muted transition-opacity hover:opacity-60"
          >
            ← Back to news
          </Link>

          {meta && (
            <p className="mt-8 font-mono text-[length:var(--text-label)] uppercase tracking-[var(--tracking-tight)] text-muted">
              {meta}
            </p>
          )}

          <h1 className="mt-4 text-[clamp(2.25rem,6vw,4.5rem)] font-medium capitalize leading-[0.95] tracking-[var(--tracking-hero)]">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-6 max-w-[560px] text-[clamp(1.05rem,1.8vw,1.35rem)] font-medium leading-[1.4] tracking-[var(--tracking-tight)] text-muted">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Thumbnail */}
        {post.image && (
          <div className="mx-auto mt-12 max-w-[1000px]">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <Image
                src={post.image}
                alt={post.imageAlt || post.title || ""}
                fill
                priority
                sizes="(min-width: 1024px) 1000px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Rich text */}
        <div className="mx-auto mt-14 max-w-[680px]">
          <PortableTextBody value={post.body} />
        </div>
      </article>
    </PageShell>
  );
}
