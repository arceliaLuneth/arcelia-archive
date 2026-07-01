"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.5 8.2c1.2-.8 2.6-1.2 4.5-1.2s3.3.4 4.5 1.2" />
      <path d="M6.2 17.8c1.4 1 3.3 1.6 5.8 1.6s4.4-.6 5.8-1.6" />
      <path d="M6 8.5C4.9 10.7 4.5 13 4.5 15.5" />
      <path d="M18 8.5c1.1 2.2 1.5 4.5 1.5 7" />
      <circle cx="9.5" cy="12.2" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="12.2" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ArrowIcon({
  className = "h-4 w-4",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

type CardProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  dark?: boolean;
  full?: boolean;
};

function ContactCard({ href, icon, label, value, dark = false, full = false }: CardProps) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noreferrer"
      style={{
        height: "180px",
        minHeight: "180px",
        maxHeight: "180px",
        borderRadius: "24px",
        padding: "32px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: dark ? "#000000" : "#d9d9d9",
        backgroundColor: dark ? "#000000" : "#ffffff",
        color: dark ? "#ffffff" : "#000000",
      }}
      className={[
        "contact-card group relative transition-all duration-300 ease-out hover:-translate-y-1.5",
        dark
          ? "hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)]"
          : "hover:border-black/40 hover:shadow-[0_18px_40px_-16px_rgba(0,0,0,0.18)]",
        full ? "sm:col-span-2" : "",
      ].join(" ")}
    >
      <div className="flex items-start justify-between" style={{ flexShrink: 0 }}>
        <div style={{ color: dark ? "#ffffff" : "#000000" }}>{icon}</div>
        <ArrowIcon
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)" }}
        />
      </div>

      <div style={{ flexShrink: 0 }}>
        <p
          style={{
            marginBottom: "8px",
            fontSize: "0.78rem",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.35em",
            color: dark ? "#ffffff" : "#000000",
          }}
        >
          {label}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTopWidth: "1px",
            borderTopStyle: "solid",
            borderTopColor: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
            paddingTop: "12px",
          }}
        >
          <p
            style={{
              fontSize: "0.875rem",
              color: dark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.55)",
            }}
          >
            {value}
          </p>
        </div>
      </div>
    </a>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const targets = [
      titleRef.current,
      dividerRef.current,
      ...(cardsRef.current ? Array.from(cardsRef.current.children) : []),
      footerRef.current,
    ].filter(Boolean) as Element[];

    // Safety net: if anything goes wrong with GSAP/ScrollTrigger,
    // the content must never stay invisible.
    const safetyTimeout = setTimeout(() => {
      gsap.set(targets, { clearProps: "opacity,transform" });
    }, 2500);

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 1 }); // ensure visible by default before animating

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(titleRef.current, { x: -50, opacity: 0, duration: 1 })
        .from(dividerRef.current, { scaleX: 0, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(
          cardsRef.current ? Array.from(cardsRef.current.children) : [],
          { y: 28, opacity: 0, duration: 0.7, stagger: 0.12 },
          "-=0.5"
        )
        .from(footerRef.current, { opacity: 0, duration: 0.6 }, "-=0.2");

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      clearTimeout(safetyTimeout);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact-section"
      className="relative w-full bg-[#f8f8f8] px-6 py-24 text-black sm:px-10 md:py-32 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.025),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.02),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[42fr_58fr] lg:gap-10">
          <div className="flex flex-col justify-start">
            <h2
              ref={titleRef}
              className="text-[3.4rem] font-light leading-[0.92] tracking-tight text-black sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem]"
            >
              Contact
            </h2>
            <div ref={dividerRef} className="mt-8 h-px w-24 origin-left bg-black/20" />
          </div>

          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2"
            style={{ gap: "20px" }}
          >
            <ContactCard
              href="mailto:arcelialuneth@gmail.com"
              icon={<EmailIcon />}
              label="Email"
              value="arcelialuneth@gmail.com"
            />
            <ContactCard
              href="https://github.com/arcelialuneth"
              icon={<GithubIcon />}
              label="GitHub"
              value="github.com/arcelia"
              dark
            />
            <ContactCard
              href="https://discord.com/users/1316808197532680233"
              icon={<DiscordIcon />}
              label="Discord"
              value="@1221311 0"
              full
            />
          </div>
        </div>

        <div ref={footerRef} className="mt-20 border-t border-black/10 pt-6">
          <p className="text-[0.72rem] uppercase tracking-[0.45em] text-black/45">
            © 2026
          </p>
        </div>
      </div>
    </section>
  );
}
