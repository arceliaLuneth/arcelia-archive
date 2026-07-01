"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const titleLines = ["Arcelia", "Luneth"];
const subtitleLines = ["Digital", "Archive", "Keeper"];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);
  const blueGlowRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const titleLineRefs = useRef<HTMLSpanElement[]>([]);
  const subtitleLineRefs = useRef<HTMLSpanElement[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);

  const setTitleLineRef = (index: number) => (el: HTMLSpanElement | null) => {
    if (el) titleLineRefs.current[index] = el;
  };

  const setSubtitleLineRef = (index: number) => (el: HTMLSpanElement | null) => {
    if (el) subtitleLineRefs.current[index] = el;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(navRef.current, {
        opacity: 0,
        y: -16,
      });

      gsap.set(
        [bgGlowRef.current, blueGlowRef.current, grainRef.current, scrollRef.current],
        {
          opacity: 0,
        }
      );

      gsap.set([titleLineRefs.current, subtitleLineRefs.current], {
        yPercent: 120,
        opacity: 0,
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.to(bgGlowRef.current, {
        opacity: 1,
        duration: 0.8,
      })
        .to(
          blueGlowRef.current,
          {
            opacity: 1,
            duration: 0.8,
          },
          "-=0.5"
        )
        .to(
          grainRef.current,
          {
            opacity: 1,
            duration: 0.6,
          },
          "-=0.45"
        )
        .to(
          titleLineRefs.current,
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.14,
          },
          "-=0.2"
        )
        .to(
          subtitleLineRefs.current,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
          },
          "-=0.72"
        )
        .to(
          scrollRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.35"
        );

      gsap.to(bgGlowRef.current, {
        x: 36,
        y: -18,
        scale: 1.08,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(blueGlowRef.current, {
        x: -28,
        y: 20,
        scale: 1.05,
        duration: 11,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(grainRef.current, {
        backgroundPosition: "120px 120px",
        duration: 12,
        repeat: -1,
        ease: "none",
      });

      gsap.to(scrollLineRef.current, {
        scaleY: 1.35,
        transformOrigin: "top center",
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top+=120",
        end: "bottom top",
        onEnter: () => {
          gsap.to(navRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(navRef.current, {
            opacity: 0,
            y: -16,
            duration: 0.35,
            ease: "power3.out",
          });
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen overflow-hidden bg-black text-white"
    >

      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      <div
        ref={bgGlowRef}
        className="absolute -top-24 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[120px]"
      />

      <div
        ref={blueGlowRef}
        className="absolute right-[-8rem] top-1/3 h-[24rem] w-[24rem] rounded-full bg-blue-500/10 blur-[120px]"
      />

      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/90 via-[#020617]/35 to-[#020617]/20" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35" />

      {/* Grain overlay */}
      <div
        ref={grainRef}
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.18) 0.55px, transparent 0.55px)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-between px-6 md:px-10 lg:px-20">
        {/* LEFT */}
        <div className="max-w-4xl">
          <div className="space-y-2 md:space-y-3">
            {titleLines.map((line, index) => (
              <span
                key={line}
                ref={setTitleLineRef(index)}
                className="block overflow-hidden"
              >
                <span
                  className="
                    block
                    text-4xl
                    font-light
                    leading-[0.9]
                    tracking-tight
                    text-white
                    md:text-6xl
                    lg:text-8xl
                  "
                >
                  {line}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="max-w-[12rem] text-right sm:max-w-[14rem] md:max-w-[16rem]">
          <div className="space-y-1 md:space-y-2">
            {subtitleLines.map((line, index) => (
              <span
                key={line}
                ref={setSubtitleLineRef(index)}
                className="block overflow-hidden"
              >
                <span
                  className="
                    block
                    uppercase
                    text-[0.65rem]
                    leading-[2]
                    tracking-[0.6em]
                    text-slate-200
                    md:text-xs
                  "
                >
                  {line}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center md:bottom-10"
      >
        <p className="uppercase text-[10px] tracking-[0.5em] text-slate-300">
          Scroll To Explore
        </p>

        <div
          ref={scrollLineRef}
          className="mx-auto mt-3 h-10 w-px bg-gradient-to-b from-slate-300 to-transparent"
        />
      </div>
    </section>
  );
}