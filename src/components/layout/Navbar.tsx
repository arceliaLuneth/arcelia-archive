"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type NavItem = {
  label: string;
  href: string;
  left: string;
  top: string;
  path: string;
  delay: number;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "HOME",
    href: "#hero",
    left: "16%",
    top: "28%",
    path: "M 92 78 C 140 92, 188 118, 320 208 C 284 214, 226 224, 172 236",
    delay: 0.08,
  },
  {
    label: "ARCHIVE",
    href: "#archive",
    left: "68%",
    top: "34%",
    path: "M 92 78 C 160 92, 214 132, 320 208 C 428 182, 548 166, 690 248",
    delay: 0.14,
  },
  {
    label: "ABOUT",
    href: "#about",
    left: "23%",
    top: "75%",
    path: "M 92 78 C 140 104, 220 160, 320 208 C 286 314, 268 450, 260 618",
    delay: 0.2,
  },
  {
    label: "CONTACT",
    href: "#contact-section",
    left: "71%",
    top: "80%",
    path: "M 92 78 C 170 110, 248 190, 320 208 C 430 372, 562 512, 740 628",
    delay: 0.26,
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLParagraphElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const footerRef = useRef<HTMLParagraphElement>(null);
  const noiseRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const junctionRef = useRef<HTMLDivElement>(null);

  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const lineRefs = useRef<Array<SVGPathElement | null>>([]);

  const setItemRef = (index: number) => (el: HTMLAnchorElement | null) => {
    itemRefs.current[index] = el;
  };

  const setDotRef = (index: number) => (el: HTMLSpanElement | null) => {
    dotRefs.current[index] = el;
  };

  const setLineRef = (index: number) => (el: SVGPathElement | null) => {
    lineRefs.current[index] = el;
  };

  const openMenu = () => {
    setMounted(true);
    setOpen(true);
  };

  const closeMenu = () => {
    if (!mounted) return;

    const allTargets = [
      overlayRef.current,
      panelRef.current,
      brandRef.current,
      closeRef.current,
      footerRef.current,
      noiseRef.current,
      glowRef.current,
      junctionRef.current,
      ...itemRefs.current,
      ...dotRefs.current,
      ...lineRefs.current,
    ];

    gsap.killTweensOf(allTargets);

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        setOpen(false);
        setMounted(false);
      },
    });

    tl.to(
      itemRefs.current,
      {
        opacity: 0,
        y: 14,
        duration: 0.22,
        stagger: 0.035,
      },
      0
    )
      .to(
        dotRefs.current,
        {
          opacity: 0,
          scale: 0.6,
          duration: 0.16,
          stagger: 0.03,
        },
        0.02
      )
      .to(
        lineRefs.current,
        {
          strokeDashoffset: (i, target) => {
            const path = target as SVGPathElement;
            return path.getTotalLength();
          },
          opacity: 0,
          duration: 0.28,
          stagger: 0.035,
        },
        0
      )
      .to(
        junctionRef.current,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.18,
        },
        0.02
      )
      .to(
        [brandRef.current, closeRef.current, footerRef.current],
        {
          opacity: 0,
          y: -8,
          duration: 0.18,
          stagger: 0.02,
        },
        0.02
      )
      .to(
        glowRef.current,
        {
          opacity: 0,
          duration: 0.22,
        },
        0.03
      )
      .to(
        panelRef.current,
        {
          opacity: 0,
          scale: 1.02,
          duration: 0.28,
        },
        0.06
      )
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.22,
        },
        0.06
      );
  };

  useEffect(() => {
    if (!mounted || !open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const allTargets = [
      overlayRef.current,
      panelRef.current,
      brandRef.current,
      closeRef.current,
      footerRef.current,
      noiseRef.current,
      glowRef.current,
      junctionRef.current,
      ...itemRefs.current,
      ...dotRefs.current,
      ...lineRefs.current,
    ];

    gsap.killTweensOf(allTargets);

    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(panelRef.current, { opacity: 0, scale: 1.03 });
    gsap.set([brandRef.current, closeRef.current, footerRef.current], {
      opacity: 0,
      y: -10,
    });
    gsap.set(glowRef.current, { opacity: 0 });
    gsap.set(noiseRef.current, { opacity: 0 });
    gsap.set(junctionRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(itemRefs.current, { opacity: 0, y: 14 });
    gsap.set(dotRefs.current, { opacity: 0, scale: 0.6 });

    lineRefs.current.forEach((line) => {
      if (!line) return;
      const len = line.getTotalLength();
      gsap.set(line, {
        opacity: 1,
        strokeDasharray: len,
        strokeDashoffset: len,
      });
    });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.to(overlayRef.current, { opacity: 1, duration: 0.18 }, 0)
      .to(panelRef.current, { opacity: 1, scale: 1, duration: 0.42 }, 0.03)
      .to(glowRef.current, { opacity: 1, duration: 0.25 }, 0.05)
      .to(
        [brandRef.current, closeRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 0.24,
          stagger: 0.03,
        },
        0.1
      )
      .to(
        junctionRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.18,
        },
        0.12
      )
      .to(
        lineRefs.current,
        {
          strokeDashoffset: 0,
          duration: 0.88,
          stagger: 0.08,
          ease: "power4.out",
        },
        0.12
      )
      .to(
        dotRefs.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.22,
          stagger: 0.05,
        },
        0.24
      )
      .to(
        itemRefs.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.06,
          ease: "power3.out",
        },
        0.26
      )
      .to(
        footerRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.22,
        },
        0.34
      )
      .to(noiseRef.current, { opacity: 0.08, duration: 0.18 }, 0.05);

    return () => {
      document.body.style.overflow = prevOverflow;
      gsap.killTweensOf(allTargets);
    };
  }, [mounted, open]);

  return (
    <>
      <button
        onClick={open ? closeMenu : openMenu}
        className="
          group
          fixed
          right-4
          top-4
          z-[150]
          flex
          h-[96px]
          w-[96px]
          flex-col
          items-center
          justify-center
          gap-2
          border
          border-[#1f52ff]/20
          bg-[#1f52ff]
          text-white
          shadow-[0_20px_50px_rgba(31,82,255,0.28)]
          transition-all
          duration-300
          hover:bg-white
          hover:text-[#1f52ff]
          sm:h-[110px]
          sm:w-[110px]
        "
      >
        <span className="h-px w-4 bg-current transition-all duration-300 group-hover:w-7" />
        <span className="text-[10px] uppercase tracking-[0.5em] transition-transform duration-300 group-hover:scale-105">
          {open ? "CLOSE" : "MENU"}
        </span>
        <span className="h-px w-4 bg-current transition-all duration-300 group-hover:w-7" />
      </button>

      {mounted && (
        <>
          <div
            ref={overlayRef}
            onClick={closeMenu}
            className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-md"
          />

          <div
            ref={panelRef}
            className="fixed inset-0 z-[120] overflow-hidden bg-[#dfe9f0] text-[#1f52ff]"
          >
            <div
              ref={glowRef}
              className="
                pointer-events-none
                absolute
                inset-0
                bg-[radial-gradient(circle_at_18%_20%,rgba(31,82,255,0.10),transparent_24%),radial-gradient(circle_at_80%_78%,rgba(31,82,255,0.08),transparent_22%)]
              "
            />

            <div
              ref={noiseRef}
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-0
                mix-blend-multiply
              "
              style={{
                backgroundImage:
                  "radial-gradient(rgba(31,82,255,0.18) 0.6px, transparent 0.6px)",
                backgroundSize: "8px 8px",
              }}
            />

            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 1000 800"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="lineGlow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="2.2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {NAV_ITEMS.map((item, index) => (
                <path
                  key={item.label}
                  ref={setLineRef(index)}
                  d={item.path}
                  fill="none"
                  stroke="rgba(31,82,255,0.32)"
                  strokeWidth="1.4"
                  filter="url(#lineGlow)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
            </svg>

            <div className="relative flex h-full flex-col p-6 sm:p-8">
              <div className="flex items-start justify-between">
                <p
                  ref={brandRef}
                  className="text-xs uppercase tracking-[0.4em] text-[#1f52ff]"
                >
                  + Arcelia Luneth
                </p>

                <button
                  ref={closeRef}
                  onClick={closeMenu}
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    border
                    border-[#1f52ff]/20
                    text-[#1f52ff]
                    transition-all
                    duration-300
                    hover:bg-[#1f52ff]
                    hover:text-white
                  "
                >
                  ✕
                </button>
              </div>

              <nav className="relative mt-10 flex-1">
                <div
                  ref={junctionRef}
                  className="
                    absolute
                    left-[9.2%]
                    top-[9.8%]
                    h-2.5
                    w-2.5
                    rounded-full
                    bg-[#1f52ff]
                    shadow-[0_0_0_8px_rgba(31,82,255,0.08),0_0_22px_rgba(31,82,255,0.55)]
                  "
                />

                {NAV_ITEMS.map((item, index) => (
                  <a
                    key={item.label}
                    ref={setItemRef(index)}
                    href={item.href}
                    onClick={closeMenu}
                    className={`
                      group
                      absolute
                      -translate-x-1/2
                      -translate-y-1/2
                      left-[${item.left}]
                      top-[${item.top}]
                      inline-flex
                      items-center
                      gap-3
                      text-3xl
                      font-light
                      uppercase
                      tracking-[0.16em]
                      transition-all
                      duration-300
                      hover:-translate-y-[calc(50%+4px)]
                      hover:tracking-[0.22em]
                      hover:text-black
                      sm:text-5xl
                    `}
                    style={{
                      left: item.left,
                      top: item.top,
                    }}
                  >
                    <span
                      ref={setDotRef(index)}
                      className="
                        inline-flex
                        h-2
                        w-2
                        items-center
                        justify-center
                        rounded-full
                        bg-[#1f52ff]
                        shadow-[0_0_0_6px_rgba(31,82,255,0.08),0_0_18px_rgba(31,82,255,0.45)]
                        transition-all
                        duration-300
                        group-hover:scale-125
                        group-hover:shadow-[0_0_0_8px_rgba(31,82,255,0.10),0_0_24px_rgba(31,82,255,0.70)]
                      "
                    />

                    <span>{item.label}</span>

                    <span
                      className="
                        h-px
                        w-8
                        origin-left
                        bg-current
                        opacity-30
                        transition-all
                        duration-300
                        group-hover:w-14
                        group-hover:opacity-100
                      "
                    />
                  </a>
                ))}
              </nav>

              <p
                ref={footerRef}
                className="text-xs uppercase tracking-[0.35em] text-[#1f52ff]/60"
              >
                © Arcelia Archive
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}