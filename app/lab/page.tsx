import type { Metadata } from "next";
import { SHOWCASE, type ShowcaseEntry } from "@/lib/showcase";
import { PreviewFrame } from "@/components/lab/PreviewFrame";

// Internal reference page — keep it out of search engines entirely.
export const metadata: Metadata = {
  title: "Component Library — H.Studio (internal)",
  robots: { index: false, follow: false },
};

const mono =
  "font-mono text-[length:var(--text-label)] uppercase tracking-[var(--tracking-tight)] text-muted";

const two = (i: number) => String(i).padStart(2, "0");
const indexOf = (slug: string) => SHOWCASE.findIndex((e) => e.slug === slug) + 1;

function IndexGroup({ title, items }: { title: string; items: ShowcaseEntry[] }) {
  return (
    <div>
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[var(--tracking-tight)] text-muted/70">
        {title}
      </p>
      <ul className="flex flex-col">
        {items.map((e) => (
          <li key={e.slug}>
            <a
              href={`#${e.slug}`}
              className="flex items-baseline gap-2 py-[3px] text-[14px] tracking-[var(--tracking-tight)] transition-opacity duration-150 hover:opacity-55"
            >
              <span className="font-mono text-[11px] text-muted/60">{two(indexOf(e.slug))}</span>
              <span>{e.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Entry({ entry, n }: { entry: ShowcaseEntry; n: number }) {
  return (
    <article
      id={entry.slug}
      className="scroll-mt-6 border-t border-foreground/15 px-[var(--gutter)] py-14 first:border-t-0"
    >
      {/* Spec header */}
      <div className="flex items-start gap-4">
        <span className="pt-2 font-mono text-[length:var(--text-label)] text-muted/60">
          [ {two(n)} ]
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-medium capitalize leading-none tracking-[var(--tracking-statement)]">
              {entry.name}
            </h2>
            <span className="rounded-full border border-foreground/25 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[var(--tracking-tight)] text-muted">
              {entry.category}
            </span>
          </div>
          <p className="mt-2 font-mono text-[12px] tracking-[var(--tracking-tight)] text-muted/80">
            {entry.path}
          </p>
        </div>
      </div>

      <p className="mt-5 max-w-[640px] text-[length:var(--text-body)] leading-[1.6] tracking-[var(--tracking-tight)] text-muted">
        {entry.description}
      </p>

      {/* Props table */}
      <div className="mt-7 overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-left">
          <thead>
            <tr className="border-y border-foreground/20 font-mono text-[11px] uppercase tracking-[var(--tracking-tight)] text-muted/70">
              <th className="w-1/5 py-2 pr-4 font-normal">Prop</th>
              <th className="w-1/5 py-2 pr-4 font-normal">Type</th>
              <th className="w-1/5 py-2 pr-4 font-normal">Default</th>
              <th className="py-2 font-normal">Description</th>
            </tr>
          </thead>
          <tbody>
            {entry.props.map((p) => (
              <tr key={p.name} className="border-b border-foreground/10 align-top">
                <td className="py-2.5 pr-4 font-mono text-[12px] tracking-[var(--tracking-tight)]">
                  {p.name}
                </td>
                <td className="py-2.5 pr-4 font-mono text-[12px] tracking-[var(--tracking-tight)] text-muted">
                  {p.type}
                </td>
                <td className="py-2.5 pr-4 font-mono text-[12px] tracking-[var(--tracking-tight)] text-muted/80">
                  {p.default ?? "—"}
                </td>
                <td className="py-2.5 text-[13px] leading-snug tracking-[var(--tracking-tight)] text-muted">
                  {p.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Live preview */}
      <div className="mt-8">
        <PreviewFrame
          src={`/lab/preview/${entry.slug}`}
          title={entry.name}
          height={entry.height}
          frame={entry.frame}
        />
      </div>
    </article>
  );
}

export default function LabPage() {
  const sections = SHOWCASE.filter((e) => e.category === "Section");
  const ui = SHOWCASE.filter((e) => e.category === "UI");

  return (
    <main className="min-h-screen bg-paper text-foreground">
      {/* Header */}
      <header className="border-b border-foreground/15 px-[var(--gutter)] pb-12 pt-12 lg:pt-16">
        <div className={`flex items-center justify-between ${mono}`}>
          <span>H.Studio — Component Library</span>
          <span className="text-right">Internal · Not indexed</span>
        </div>

        <h1 className="mt-10 text-[clamp(3rem,11vw,9rem)] font-medium capitalize leading-[0.82] tracking-[var(--tracking-hero)]">
          The&nbsp;Library
        </h1>

        <p className="mt-6 max-w-[560px] text-[length:var(--text-body)] leading-[1.6] tracking-[var(--tracking-tight)] text-muted">
          Every section and UI primitive on the site, rendered live with its name
          and props. Toggle desktop / mobile on any preview, or open it on its own.
        </p>

        <div className={`mt-9 flex flex-wrap gap-x-8 gap-y-2 ${mono}`}>
          <span>[ {two(SHOWCASE.length)} components ]</span>
          <span>[ {two(sections.length)} sections ]</span>
          <span>[ {two(ui.length)} primitives ]</span>
        </div>
      </header>

      {/* Body: sticky index + entries */}
      <div className="lg:grid lg:grid-cols-[240px_1fr]">
        <nav className="hidden border-r border-foreground/15 p-[var(--gutter)] lg:block">
          <div className="sticky top-8 flex flex-col gap-7">
            <IndexGroup title="Sections" items={sections} />
            <IndexGroup title="UI / Primitives" items={ui} />
          </div>
        </nav>

        <div className="flex flex-col">
          {SHOWCASE.map((entry, i) => (
            <Entry key={entry.slug} entry={entry} n={i + 1} />
          ))}
        </div>
      </div>

      <footer className="border-t border-foreground/15 px-[var(--gutter)] py-10">
        <p className={mono}>[ End of library — {two(SHOWCASE.length)} components ]</p>
      </footer>
    </main>
  );
}
