"use client";

import { useState } from "react";

/**
 * A framed, isolated live preview of one component (rendered in an iframe so its
 * scroll animations don't interfere with the rest of the library). Includes a
 * desktop/mobile width toggle and an "open" link.
 */
export function PreviewFrame({
  src,
  title,
  height,
  frame,
}: {
  src: string;
  title: string;
  height: number;
  frame: "light" | "dark";
}) {
  const [mobile, setMobile] = useState(false);

  const tab =
    "font-mono text-[11px] uppercase tracking-[var(--tracking-tight)] px-2 py-1 rounded-full transition-colors duration-150";

  return (
    <div className="flex flex-col gap-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMobile(false)}
            className={`${tab} ${!mobile ? "bg-foreground text-on-dark" : "text-muted hover:bg-foreground/10"}`}
          >
            Desktop
          </button>
          <button
            type="button"
            onClick={() => setMobile(true)}
            className={`${tab} ${mobile ? "bg-foreground text-on-dark" : "text-muted hover:bg-foreground/10"}`}
          >
            Mobile
          </button>
        </div>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[11px] uppercase tracking-[var(--tracking-tight)] text-muted underline underline-offset-2 hover:opacity-60"
        >
          Open ↗
        </a>
      </div>

      {/* Canvas */}
      <div
        className={`relative overflow-hidden rounded-lg border border-foreground/15 ${
          frame === "dark" ? "bg-black" : "bg-paper"
        }`}
      >
        <div
          className="mx-auto transition-[max-width] duration-300 ease-out"
          style={{ maxWidth: mobile ? 390 : "100%" }}
        >
          <iframe
            src={src}
            title={title}
            loading="lazy"
            className="block w-full border-0 bg-transparent"
            style={{ height }}
          />
        </div>
        {/* Width readout */}
        <span className="pointer-events-none absolute bottom-2 right-3 font-mono text-[10px] uppercase tracking-[var(--tracking-tight)] text-muted/60">
          {mobile ? "390px" : "fluid"}
        </span>
      </div>
    </div>
  );
}
