"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type ArchiveItem = {
  title: string;
  excerpt: string;
  slug?: string;
  category?: string;
  publishedAt?: string;
  image: string;
};

type NewsArchiveData = {
  eyebrow?: string;
  searchPlaceholder?: string;
  items?: ArchiveItem[];
};

function formatDate(iso?: string) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

const label =
  "font-mono text-[length:var(--text-label)] uppercase tracking-[var(--tracking-tight)] text-muted";

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-[18px] shrink-0">
      <path d="M7 17 17 7M17 7H8m9 0v9" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function Card({ item }: { item: ArchiveItem }) {
  const href = item.slug ? `/news/${item.slug}` : "#";
  return (
    <Link href={href} className="group flex flex-col gap-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
        />
        {item.category && (
          <span className="absolute left-3 top-3 rounded-3xl bg-white/30 px-2 py-1 font-mono text-[11px] uppercase tracking-[var(--tracking-tight)] text-[#111] backdrop-blur-[10px]">
            {item.category}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[var(--tracking-tight)] text-muted/70">
        <span>{formatDate(item.publishedAt)}</span>
      </div>
      <h3 className="text-[20px] font-semibold leading-[1.15] tracking-[var(--tracking-tight)]">
        {item.title}
      </h3>
      <p className="text-[length:var(--text-body)] leading-[1.45] tracking-[var(--tracking-tight)] text-muted line-clamp-3">
        {item.excerpt}
      </p>
      <span className="mt-1 inline-flex items-center gap-2 text-[length:var(--text-body)] font-medium tracking-[var(--tracking-tight)] transition-opacity group-hover:opacity-60">
        Read <ArrowUpRight />
      </span>
    </Link>
  );
}

/**
 * NewsArchive — the searchable, filterable list of every post. Simple text
 * search (title + excerpt) and one-click category filters, derived from the
 * posts themselves. Cards link to the internal article page (/news/slug).
 */
export function NewsArchive({ data }: { data?: NewsArchiveData } = {}) {
  const items = data?.items ?? [];
  const eyebrow = data?.eyebrow || "[ All posts ]";
  const placeholder = data?.searchPlaceholder || "Search posts…";

  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.category && set.add(i.category));
    return ["All", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      const matchCat = active === "All" || i.category === active;
      const matchQuery =
        !q ||
        i.title.toLowerCase().includes(q) ||
        i.excerpt.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [items, query, active]);

  return (
    <section className="bg-paper px-[var(--gutter)] pb-24 pt-6 text-foreground">
      {/* Controls */}
      <div className="flex flex-col gap-6 border-t border-foreground/15 pt-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <span className={label}>
            {eyebrow} — {filtered.length}
          </span>

          {/* Search */}
          <div className="relative w-full max-w-[320px]">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              aria-label="Search posts"
              className="w-full border-0 border-b border-foreground/25 bg-transparent pb-2 pl-6 text-[length:var(--text-body)] tracking-[var(--tracking-tight)] outline-none transition-colors placeholder:text-muted/40 focus:border-foreground"
            />
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
              className="pointer-events-none absolute left-0 top-1 size-4 text-muted"
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
              <path d="m20 20-3-3" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const on = active === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(c)}
                className={`rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[var(--tracking-tight)] transition-colors duration-150 ${
                  on
                    ? "bg-foreground text-on-dark"
                    : "border border-foreground/25 text-muted hover:border-foreground/60"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <Card key={item.slug || i} item={item} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-start gap-2">
          <p className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium tracking-[var(--tracking-tight)]">
            Nothing here — yet.
          </p>
          <p className="text-[length:var(--text-body)] text-muted">
            Try a different search or category.
          </p>
        </div>
      )}
    </section>
  );
}
