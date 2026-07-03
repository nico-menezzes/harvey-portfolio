"use client";

import { Fragment, useEffect, useRef, useState, type FormEvent } from "react";
import { gsap } from "gsap";

type ContactData = {
  eyebrow?: string;
  index?: string;
  heading?: string;
  intro?: string;
  email?: string;
  location?: string;
  availability?: string;
  socials?: { label: string; href: string }[];
  projectTypes?: string[];
  successMessage?: string;
};

const DEFAULTS = {
  eyebrow: "[ Contact ]",
  index: "005",
  heading: "Say hello & tell me everything.",
  intro:
    "Got a project, a rough idea, or just want to compare notes? Fill this in and I'll get back to you within a day.",
  email: "hello@h.studio",
  location: "Chicago, IL — working worldwide",
  availability: "[ Booking projects for Q3 2026 ]",
  socials: [
    { label: "Instagram", href: "https://instagram.com/h.studio" },
    { label: "Linkedin", href: "https://linkedin.com/company/h-studio" },
    { label: "x.com", href: "https://x.com/h_studio" },
  ],
  projectTypes: ["Branding", "Web Design", "Photography", "Other"],
  successMessage:
    "Your message just landed in my inbox. I'll reply from a real email, usually within 24 hours.",
};

/** Turn any "&" into the decorative italic serif ampersand (brand accent). */
function amp(text: string) {
  return text.split("&").map((part, i, arr) => (
    <Fragment key={i}>
      {part}
      {i < arr.length - 1 && <span className="font-serif italic normal-case">&amp;</span>}
    </Fragment>
  ));
}

const labelCls =
  "font-mono text-[length:var(--text-label)] uppercase tracking-[var(--tracking-tight)] text-muted";

/** L-shaped corner ticks that frame the form (reused brand motif). */
function Corners() {
  const base = "pointer-events-none absolute h-4 w-4 border-foreground/40";
  return (
    <>
      <span aria-hidden className={`${base} left-0 top-0 border-l border-t`} />
      <span aria-hidden className={`${base} right-0 top-0 border-r border-t`} />
      <span aria-hidden className={`${base} bottom-0 left-0 border-b border-l`} />
      <span aria-hidden className={`${base} bottom-0 right-0 border-b border-r`} />
    </>
  );
}

/** Editorial underline field (input or textarea). */
function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  required,
  textarea,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
}) {
  const base =
    "w-full border-0 border-b bg-transparent pb-2 pt-1 text-[length:var(--text-body)] tracking-[var(--tracking-tight)] text-foreground outline-none transition-colors duration-200 placeholder:text-muted/35 " +
    (error ? "border-[#9a1f1f]" : "border-foreground/25 focus:border-foreground");
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelCls}>
        {label} {required && <span className="text-muted/50">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          placeholder={placeholder}
          aria-invalid={!!error}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-invalid={!!error}
          className={base}
        />
      )}
      {error && (
        <span className="font-mono text-[11px] tracking-[var(--tracking-tight)] text-[#9a1f1f]">
          {error}
        </span>
      )}
    </div>
  );
}

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Contact — an editorial split: a big statement + direct contact details on the
 * left, and a working form on the right (underline fields, project-type chips,
 * inline validation, and idle → submitting → success states). Submissions POST
 * to /api/contact. Reveals on load with GSAP; motion-safe.
 */
export function Contact({ data }: { data?: ContactData } = {}) {
  const ref = useRef<HTMLElement>(null);

  const eyebrow = data?.eyebrow || DEFAULTS.eyebrow;
  const index = data?.index || DEFAULTS.index;
  const heading = data?.heading || DEFAULTS.heading;
  const intro = data?.intro || DEFAULTS.intro;
  const email = data?.email || DEFAULTS.email;
  const location = data?.location || DEFAULTS.location;
  const availability = data?.availability || DEFAULTS.availability;
  const socials = data?.socials?.length ? data.socials : DEFAULTS.socials;
  const projectTypes = data?.projectTypes?.length ? data.projectTypes : DEFAULTS.projectTypes;
  const successMessage = data?.successMessage || DEFAULTS.successMessage;

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    services: [] as string[],
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof typeof form) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please add your name.";
    if (!form.email.trim()) e.email = "Please add your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "That email looks off.";
    if (!form.message.trim()) e.message = "Tell me a little about it.";
    return e;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          projectType: form.services.join(", "),
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setForm({ name: "", email: "", company: "", services: [], message: "" });
    setErrors({});
    setStatus("idle");
  }

  return (
    <section
      ref={ref}
      id="contact"
      className="relative isolate overflow-hidden bg-paper px-[var(--gutter)] pb-24 pt-28 text-foreground lg:pt-32"
    >
      {/* Top label row */}
      <div data-reveal className={`flex items-start justify-between ${labelCls}`}>
        <span>{eyebrow}</span>
        <span>{index}</span>
      </div>

      <div className="mt-10 grid gap-14 lg:mt-16 lg:grid-cols-2 lg:gap-20">
        {/* Left — statement + direct details */}
        <div className="flex flex-col">
          <h1
            data-reveal
            className="text-[clamp(2.75rem,7vw,6rem)] font-medium capitalize leading-[0.9] tracking-[var(--tracking-hero)]"
          >
            {amp(heading)}
          </h1>

          <p
            data-reveal
            className="mt-7 max-w-[440px] text-[length:var(--text-body)] leading-[1.55] tracking-[var(--tracking-tight)] text-muted"
          >
            {intro}
          </p>

          <div data-reveal className="mt-12 flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <span className={labelCls}>Email</span>
              <a
                href={`mailto:${email}`}
                className="w-fit text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium tracking-[var(--tracking-tight)] underline decoration-1 underline-offset-4 transition-opacity hover:opacity-60"
              >
                {email}
              </a>
            </div>

            <div className="flex flex-col gap-1">
              <span className={labelCls}>Studio</span>
              <p className="text-[length:var(--text-body)] tracking-[var(--tracking-tight)] text-muted">
                {location}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className={labelCls}>Elsewhere</span>
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="text-[length:var(--text-body)] uppercase tracking-[var(--tracking-tight)] transition-opacity hover:opacity-60"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <p className={labelCls}>{availability}</p>
          </div>
        </div>

        {/* Right — the form (or the success state) */}
        <div data-reveal className="relative">
          <Corners />
          <div className="p-6 lg:p-10">
            {status === "success" ? (
              <div className="flex min-h-[420px] flex-col justify-center gap-5">
                <span className={labelCls}>[ Message sent ]</span>
                <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium capitalize leading-[0.95] tracking-[var(--tracking-statement)]">
                  Thanks — talk soon.
                </h2>
                <p className="max-w-[420px] text-[length:var(--text-body)] leading-[1.55] tracking-[var(--tracking-tight)] text-muted">
                  {successMessage}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="w-fit font-mono text-[12px] uppercase tracking-[var(--tracking-tight)] underline underline-offset-4 transition-opacity hover:opacity-60"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-7">
                <Field
                  id="c-name"
                  label="Your name"
                  required
                  value={form.name}
                  onChange={set("name")}
                  error={errors.name}
                  placeholder="Harvey Specter"
                />
                <Field
                  id="c-email"
                  label="Email"
                  type="email"
                  required
                  value={form.email}
                  onChange={set("email")}
                  error={errors.email}
                  placeholder="you@studio.com"
                />
                <Field
                  id="c-company"
                  label="Company (optional)"
                  value={form.company}
                  onChange={set("company")}
                  placeholder="Where you work"
                />

                {/* Project type chips */}
                <div className="flex flex-col gap-3">
                  <span className={labelCls}>
                    What&apos;s it about?{" "}
                    <span className="text-muted/50">(select any)</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((t) => {
                      const on = form.services.includes(t);
                      return (
                        <button
                          key={t}
                          type="button"
                          aria-pressed={on}
                          onClick={() =>
                            setForm((f) => ({
                              ...f,
                              services: on
                                ? f.services.filter((s) => s !== t)
                                : [...f.services, t],
                            }))
                          }
                          className={`rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[var(--tracking-tight)] transition-colors duration-150 ${
                            on
                              ? "bg-foreground text-on-dark"
                              : "border border-foreground/25 text-muted hover:border-foreground/60"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Field
                  id="c-message"
                  label="Message"
                  required
                  textarea
                  value={form.message}
                  onChange={set("message")}
                  error={errors.message}
                  placeholder="Tell me about the project, timeline, and what success looks like."
                />

                <div className="mt-1 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-[length:var(--text-body)] font-medium tracking-[var(--tracking-tight)] text-on-dark transition-opacity duration-200 hover:opacity-80 disabled:opacity-50"
                  >
                    {status === "submitting" ? "Sending…" : "Send message"}
                    <span aria-hidden>→</span>
                  </button>
                  {status === "error" && (
                    <span className="font-mono text-[11px] tracking-[var(--tracking-tight)] text-[#9a1f1f]">
                      Something went wrong — email me directly instead.
                    </span>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
