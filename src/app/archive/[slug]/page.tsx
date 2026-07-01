import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArchiveBySlugOrId, getArchives } from '@/services/archive';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(input?: string) {
  if (!input) return '-';
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input;

  return date
    .toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replaceAll('/', '.');
}

function MetaCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/35">
        {label}
      </p>
      <p className="mt-3 text-sm leading-6 text-white/75">{value}</p>
    </div>
  );
}

export default async function ArchiveDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const archive = await getArchiveBySlugOrId(slug);

  if (!archive) notFound();

  const archives = await getArchives();
  const currentIndex = archives.findIndex((item) => item.id === archive.id);

  const previous = currentIndex > 0 ? archives[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < archives.length - 1
      ? archives[currentIndex + 1]
      : null;

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
        <Link
          href="/archive"
          className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.4em] text-white/45 transition-colors hover:text-white"
        >
          <span className="text-lg leading-none">←</span>
          Back to Archive
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <section className="space-y-8">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.45em] text-white/40">
                {archive.category}
              </p>

              <h1 className="mt-5 font-serif text-5xl font-light leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl">
                {archive.title}
              </h1>

              <div className="mt-6 h-px w-16 bg-white/20" />

              <p className="mt-6 max-w-2xl text-sm leading-8 tracking-[0.08em] text-white/68 sm:text-base">
                {archive.description}
              </p>
            </div>

            <div className="space-y-5">
              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/35">
                Content
              </p>

              <div className="max-w-3xl whitespace-pre-line text-sm leading-8 tracking-[0.06em] text-white/78 sm:text-base">
                {archive.content || archive.description}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              {previous ? (
                <Link
                  href={`/archive/${previous.slug ?? previous.id}`}
                  className="rounded-full border border-white/15 px-5 py-3 text-[0.65rem] uppercase tracking-[0.4em] text-white/70 transition-all hover:border-white/40 hover:bg-white hover:text-black"
                >
                  ← Previous
                </Link>
              ) : (
                <span className="rounded-full border border-white/8 px-5 py-3 text-[0.65rem] uppercase tracking-[0.4em] text-white/25">
                  ← Previous
                </span>
              )}

              {next ? (
                <Link
                  href={`/archive/${next.slug ?? next.id}`}
                  className="rounded-full border border-white/15 px-5 py-3 text-[0.65rem] uppercase tracking-[0.4em] text-white/70 transition-all hover:border-white/40 hover:bg-white hover:text-black"
                >
                  Next →
                </Link>
              ) : (
                <span className="rounded-full border border-white/8 px-5 py-3 text-[0.65rem] uppercase tracking-[0.4em] text-white/25">
                  Next →
                </span>
              )}
            </div>
          </section>

          <aside className="space-y-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0c0c0c]">
              {archive.image ? (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url(${archive.image})` }}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-950 to-black" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <MetaCard
                label="ID"
                value={`#${String(archive.id).padStart(3, '0')}`}
              />
              <MetaCard label="Status" value={String(archive.status)} />
              <MetaCard label="Slug" value={archive.slug || '-'} />
              <MetaCard label="Date" value={formatDate(archive.created_at)} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}