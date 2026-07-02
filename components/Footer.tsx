type FooterLink = { label: string; href: string };

type FooterData = {
  ctaText?: string;
  ctaButtonLabel?: string;
  ctaButtonHref?: string;
  socials?: FooterLink[];
  legal?: FooterLink[];
  wordmark?: string;
  credit?: string;
};

const DEFAULT_SOCIALS: FooterLink[] = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "x.com", href: "#" },
  { label: "Linkedin", href: "#" },
];

const DEFAULT_LEGAL: FooterLink[] = [
  { label: "Licences", href: "#" },
  { label: "Privacy policy", href: "#" },
];

const social =
  "text-[18px] uppercase leading-[1.1] tracking-[var(--tracking-tight)] transition-opacity duration-200 hover:opacity-60";
const legal =
  "text-[12px] uppercase leading-[1.1] tracking-[var(--tracking-tight)] underline underline-offset-2 transition-opacity duration-200 hover:opacity-60";

// Fills the width on desktop, matches the mobile size, and bleeds off the bottom.
const wordmark =
  "font-semibold capitalize leading-[0.8] tracking-[-0.06em] text-[clamp(90px,20vw,290px)] -mb-[0.16em]";

/**
 * Site footer — a black block with a "Have a project in mind?" CTA, social +
 * legal links, and a huge "H.Studio" wordmark that bleeds off the bottom edge
 * (with a vertical "Coded By Claude" credit). Doubles as the #contact anchor.
 */
export function Footer({ data }: { data?: FooterData } = {}) {
  const ctaText = data?.ctaText || "Have a project in mind?";
  const ctaButtonLabel = data?.ctaButtonLabel || "Let's talk";
  const ctaButtonHref = data?.ctaButtonHref || "#contact";
  const SOCIALS = data?.socials && data.socials.length > 0 ? data.socials : DEFAULT_SOCIALS;
  const LEGAL = data?.legal && data.legal.length > 0 ? data.legal : DEFAULT_LEGAL;
  const wordmarkText = data?.wordmark || "H.Studio";
  const credit = data?.credit || "[ Coded By Claude ]";

  return (
    <footer
      id="contact"
      className="overflow-hidden bg-black px-[var(--gutter)] pt-12 text-white"
    >
      {/* Top: CTA + links + divider */}
      <div className="flex flex-col gap-6 lg:gap-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          {/* CTA */}
          <div className="flex w-[298px] max-w-full flex-col gap-3">
            <p className="text-[24px] font-light italic uppercase leading-[1.1] tracking-[var(--tracking-tight)]">
              {ctaText}
            </p>
            <a
              href={ctaButtonHref}
              className="inline-flex w-fit items-center justify-center rounded-full border border-white px-4 py-3 text-[length:var(--text-body)] font-medium tracking-[var(--tracking-tight)] transition-colors duration-200 hover:bg-white hover:text-black"
            >
              {ctaButtonLabel}
            </a>
          </div>

          {/* Socials — stacked on mobile, split into two aligned columns on desktop */}
          <div className="flex flex-col gap-4 lg:hidden">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} className={social}>
                {s.label}
              </a>
            ))}
          </div>
          <div className="hidden w-[298px] flex-col items-center gap-0 text-center lg:flex">
            {SOCIALS.slice(0, 2).map((s) => (
              <a key={s.label} href={s.href} className={social}>
                {s.label}
              </a>
            ))}
          </div>
          <div className="hidden w-[298px] flex-col items-end gap-0 text-right lg:flex">
            {SOCIALS.slice(2).map((s) => (
              <a key={s.label} href={s.href} className={social}>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <hr className="w-full border-0 border-t border-white/30" />
      </div>

      {/* Bottom — mobile: legal centered, then credit + wordmark */}
      <div className="mt-12 flex flex-col items-center gap-4 lg:hidden">
        <div className="flex gap-[34px] pb-8">
          {LEGAL.map((l) => (
            <a key={l.label} href={l.href} className={legal}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="w-full">
          <p className="mb-3 font-mono text-[10px] uppercase leading-[1.1]">
            {credit}
          </p>
          <p className={wordmark}>{wordmarkText}</p>
        </div>
      </div>

      {/* Bottom — desktop: wordmark left (with vertical credit), legal right */}
      <div className="mt-[120px] hidden items-end justify-between gap-8 lg:flex">
        <div className="relative min-w-0 flex-1">
          <div className="absolute left-0 top-1/2 flex h-[160px] w-[15px] -translate-y-1/2 items-center justify-center">
            <span className="-rotate-90 whitespace-nowrap font-mono text-[length:var(--text-label)] uppercase">
              {credit}
            </span>
          </div>
          <p className={`pl-10 ${wordmark}`}>{wordmarkText}</p>
        </div>
        <div className="flex shrink-0 gap-[34px] pb-8">
          {LEGAL.map((l) => (
            <a key={l.label} href={l.href} className={legal}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
