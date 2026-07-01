import Link from 'next/link';
import Archive from '@/components/sections/Archive';

export default function ArchivePage() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <div className="mx-auto max-w-[1600px] px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/40 transition hover:text-white"
        >
          ← Back to Home
        </Link>
      </div>

      <Archive />
    </main>
  );
}