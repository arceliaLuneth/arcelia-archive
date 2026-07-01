"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

type ArchiveItem = {
  id: number;
  slug: string;
  title: string;
  category: string;
  description?: string;
  content?: string;
  image: string | null;
  status?: string;
  created_at?: string;
  updated_at?: string;
};

const staticFilters = ["All", "Visual", "Project", "Renders", "Other"] as const;
type StaticFilter = (typeof staticFilters)[number];

function normalizeCategory(category: string) {
  return category.trim().toLowerCase();
}

function formatDate(input?: string) {
  if (!input) return "";
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input;
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).replaceAll("/", ".");
}

// Bento sizing pattern — purely visual, cycles per card index to reproduce
// the asymmetrical 2x2 museum grid (big / small / small / big...).
function getBentoSpan(index: number) {
  const pattern = index % 4;
  if (pattern === 0) return "lg:col-span-7";
  if (pattern === 1) return "lg:col-span-5";
  if (pattern === 2) return "lg:col-span-5";
  return "lg:col-span-7";
}

function getBentoHeight(index: number) {
  const pattern = index % 4;
  if (pattern === 0) return "lg:h-[480px]";
  if (pattern === 1) return "lg:h-[480px]";
  if (pattern === 2) return "lg:h-[420px]";
  return "lg:h-[420px]";
}

export default function Archive() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const [archives, setArchives] = useState<ArchiveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState<StaticFilter>("All");

  useEffect(() => {
    const fetchArchives = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/api/archive", {
          cache: "no-store",
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
          throw new Error(result.message || "Gagal mengambil data archive");
        }

        const onlyPublished = (result.data || []).filter(
          (item: ArchiveItem) =>
            !item.status || item.status === "publish" || item.status === "1"
        );

        setArchives(onlyPublished);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchArchives();
  }, []);

  const dynamicFilters = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(archives.map((item) => item.category).filter(Boolean))
    );

    return ["All", ...uniqueCategories];
  }, [archives]);

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return archives;

    const activeNormalized = normalizeCategory(activeFilter);

    return archives.filter((item) => {
      const cat = normalizeCategory(item.category);

      if (activeNormalized === "visual") {
        return cat.includes("visual");
      }

      return cat === activeNormalized;
    });
  }, [activeFilter, archives]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(headRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.9,
      })
        .from(
          tabsRef.current,
          {
            opacity: 0,
            y: 16,
            duration: 0.7,
          },
          "-=0.3"
        )
        .fromTo(
          gridRef.current?.children ?? [],
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            clearProps: "all",
          },
          "-=0.15"
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 14,
            duration: 0.65,
          },
          "-=0.15"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, error, filteredItems.length]);

  return (
    <section
      id="archive"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#070707] py-20 text-white md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,140,255,0.06),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.025),transparent_25%)]" />
      <div className="pointer-events-none absolute left-6 top-6 select-none text-2xl text-white/15 lg:left-10 lg:top-10">
        +
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        {/* Filter tabs — top */}
        <div
          ref={tabsRef}
          className="flex flex-wrap items-center gap-x-7 gap-y-3"
        >
          {dynamicFilters.map((filter) => {
            const active = activeFilter === filter;

            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as StaticFilter)}
                className={`group relative pb-2 text-[0.65rem] uppercase tracking-[0.4em] transition-colors ${
                  active ? "text-white" : "text-white/35 hover:text-white/65"
                }`}
              >
                {filter}
                <span
                  className={`absolute -bottom-[1px] left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ${
                    active ? "scale-x-100" : "group-hover:scale-x-100"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Body: left sidebar heading + right bento grid */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-12 xl:grid-cols-[340px_1fr]">
          <div ref={headRef} className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-serif text-5xl font-light leading-[0.95] tracking-tight sm:text-6xl">
              The
              <br />
              Archive
            </h2>
            <div className="mt-6 h-px w-12 bg-white/25" />
            <p className="mt-6 text-sm leading-relaxed text-white/45">
              Collection of works, experiments, and ideas.
            </p>
          </div>

          <div>
            {loading && (
              <p className="text-sm tracking-wide text-white/45">
                Loading archive…
              </p>
            )}

            {error && (
              <p className="text-sm tracking-wide text-red-400/80">{error}</p>
            )}

            {!loading && !error && (
              <div
                ref={gridRef}
                className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-5"
              >
                {filteredItems.length === 0 ? (
                  <div className="col-span-full border border-white/10 py-20 text-center text-sm tracking-wide text-white/40">
                    Belum ada data archive.
                  </div>
                ) : (
                  filteredItems.map((item, index) => (
                    <Link
                      key={item.id}
                      href={`/archive/${item.slug}`}
                      className={`archive-card group col-span-1 block overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] transition-colors duration-500 hover:border-white/25 ${getBentoSpan(
                        index
                      )}`}
                    >
                      <article className="flex h-full flex-col">
                        <div
                          className={`relative h-64 overflow-hidden bg-black ${getBentoHeight(
                            index
                          )}`}
                        >
                          {item.image ? (
                            <div
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                              style={{ backgroundImage: `url(${item.image})` }}
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-950 to-black" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </div>

                        <div className="flex flex-1 flex-col justify-between p-6 md:p-7">
                          <div>
                            <p className="text-[0.62rem] uppercase tracking-[0.4em] text-white/40">
                              {`A-${String(index + 1).padStart(2, "0")}`}
                            </p>
                            <h3 className="mt-3 font-serif text-2xl font-light leading-tight text-white md:text-[1.75rem]">
                              {item.title}
                            </h3>
                            {item.description ? (
                              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/55">
                                {item.description}
                              </p>
                            ) : null}
                          </div>

                          <div className="mt-6 flex items-center justify-between">
                            <div>
                              <p className="text-[0.62rem] uppercase tracking-[0.35em] text-white/40">
                                {item.category}
                              </p>
                              <div className="mt-2 h-px w-6 bg-white/20" />
                            </div>
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-sm text-white/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-white/50 group-hover:text-white">
                              ↗
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))
                )}
              </div>
            )}

            <div className="mt-12 flex justify-center md:mt-14 lg:justify-start">
              <button
                ref={ctaRef}
                className="inline-flex items-center gap-4 rounded-full border border-white/15 px-8 py-4 text-[0.65rem] uppercase tracking-[0.4em] text-white/70 transition-all duration-300 hover:border-white/40 hover:bg-white hover:text-black"
              >
                View All Archives
                <span className="text-base leading-none">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
