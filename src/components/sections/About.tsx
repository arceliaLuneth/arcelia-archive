"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pastikan layout sudah final sebelum ScrollTrigger menghitung posisi
    const ctx = gsap.context(() => {
      const gridItems = gridRef.current
        ? Array.from(gridRef.current.children)
        : [];

      // Set state awal pakai autoAlpha (opacity + visibility) biar lebih aman
      gsap.set(
        [
          leftRef.current,
          titleRef.current,
          subtitleRef.current,
          introRef.current,
          imageWrapRef.current,
          ...gridItems,
        ],
        { autoAlpha: 1 } // default visible dulu, biar kalau animasi gagal, konten tetap kelihatan
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          // hapus "once: true" sementara biar gampang debug, bisa balikin lagi nanti
          toggleActions: "play none none none",
          // markers: true, // aktifkan ini kalau mau lihat posisi trigger di layar
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(leftRef.current, { autoAlpha: 0, y: 20, duration: 0.7 })
        .from(
          titleRef.current,
          { autoAlpha: 0, y: 22, duration: 0.8 },
          "-=0.45"
        )
        .from(
          subtitleRef.current,
          { autoAlpha: 0, y: 14, duration: 0.45 },
          "-=0.45"
        )
        .from(
          introRef.current,
          { autoAlpha: 0, y: 14, duration: 0.55 },
          "-=0.32"
        )
        .from(
          imageWrapRef.current,
          { autoAlpha: 0, scale: 0.985, x: 18, duration: 0.8 },
          "-=0.45"
        )
        .from(
          gridItems,
          { autoAlpha: 0, y: 18, duration: 0.45, stagger: 0.08 },
          "-=0.55"
        );

      // Refresh setelah semua di-set, supaya posisi trigger akurat
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] py-24 text-white md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.03),transparent_22%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-0 lg:grid-cols-[1.04fr_0.9fr_1.12fr] lg:items-stretch">
          {/* LEFT */}
          <div ref={leftRef} className="flex flex-col justify-start lg:pr-10">
            <div className="max-w-[520px]">
              <h2
                ref={titleRef}
                className="text-6xl font-light leading-[0.88] tracking-tight sm:text-7xl md:text-[7rem] lg:text-[8rem]"
              >
                ABOUT
              </h2>

              <p
                ref={subtitleRef}
                className="mt-10 text-[0.72rem] uppercase tracking-[0.45em] text-white/70 sm:text-xs"
              >
                A LITTLE ABOUT ME
              </p>

              <div className="mt-4 h-px w-full max-w-[430px] bg-white/18" />

              <p
                ref={introRef}
                className="mt-8 max-w-[430px] text-sm leading-[1.9] tracking-[0.08em] text-white/78 sm:text-base"
              >
                I enjoy building small ideas,
                exploring new possibilities,
                and turning curiosity
                into personal projects.

                This archive grows    
                with every experiment,
                every lesson,
                and every new beginning.
              </p>
            </div>
          </div>

          {/* CENTER IMAGE */}
<div
  ref={imageWrapRef}
  className="relative min-h-[760px] overflow-hidden border border-white/10 bg-[#111111] shadow-[0_0_60px_rgba(255,255,255,0.03)]"
>
  <Image
    src="/images/Arcelia.JPG"
    alt="Arcelia"
    fill
    priority
    className="object-cover object-[52%_center]"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.06),transparent_65%)]" />
</div>

          {/* RIGHT GRID 2x2 */}
          <div
            ref={gridRef}
            className="grid min-h-[760px] grid-cols-2 grid-rows-2"
          >
            <div className="border border-white/10 bg-[#0b0b0b] p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-[#101010] hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]">
              <p className="text-[0.7rem] uppercase tracking-[0.4em] text-white/80">
                + ABOUT ME
              </p>
              <p className="mt-10 max-w-[250px] text-sm leading-[1.9] tracking-[0.08em] text-white/72">
                I enjoy making things for fun, for learning, and for myself.
                This is where all those moments come together.
              </p>
            </div>

            <div className="border border-l-0 border-white/10 bg-[#1a1a1a] p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-[#202020] hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]">
              <p className="text-[0.7rem] uppercase tracking-[0.4em] text-white/80">
                + WHAT I DO
              </p>
              <p className="mt-10 max-w-[250px] text-sm leading-[1.9] tracking-[0.08em] text-white/72">
                I enjoy creating
personal projects,
trying new ideas,
and seeing them
come to life.
              </p>
            </div>

            <div className="border border-t-0 border-white/10 bg-[#1a1a1a] p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-[#202020] hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]">
              <p className="text-[0.7rem] uppercase tracking-[0.4em] text-white/80">
                + WHY I BUILD
              </p>
              <p className="mt-10 max-w-[250px] text-sm leading-[1.9] tracking-[0.08em] text-white/72">
                Every project begins
with curiosity.

The process
is just as meaningful
as the result.
              </p>
            </div>

            <div className="border border-l-0 border-t-0 border-white/10 bg-[#0b0b0b] p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-[#101010] hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]">
              <p className="text-[0.7rem] uppercase tracking-[0.4em] text-white/80">
                + CURRENTLY
              </p>
              <p className="mt-10 max-w-[250px] text-sm leading-[1.9] tracking-[0.08em] text-white/72">
                Building new ideas,

trying different technologies,

and enjoying
every step
of the journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
