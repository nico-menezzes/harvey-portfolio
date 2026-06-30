import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

/**
 * Pill-shaped primary action used across the site (e.g. "Let's talk").
 * Reuses design tokens: bg-accent / text-on-dark / tracking-tight.
 */
export function Button({ href, children, className = "", ...props }: ButtonProps) {
  return (
    <Link
      href={href}
      className={
        "inline-flex items-center justify-center rounded-full bg-accent px-4 py-3 " +
        "text-[var(--text-body)] font-medium tracking-[var(--tracking-tight)] text-on-dark " +
        "transition-opacity duration-200 hover:opacity-80 " +
        className
      }
      {...props}
    >
      {children}
    </Link>
  );
}
