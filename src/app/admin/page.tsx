import Link from 'next/link';

export default function AdminPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Dashboard Admin</h1>
      <p className="mt-2 text-sm text-gray-400">
        Kelola data website dari sini.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Link
          href="/admin/archive"
          className="rounded-xl border border-white/15 p-5 hover:bg-white/5"
        >
          <h2 className="text-xl font-semibold">Archive</h2>
          <p className="mt-1 text-sm text-gray-400">Data Archive.</p>
        </Link>

        <div className="rounded-xl border border-white/15 p-5">
          <h2 className="text-xl font-semibold">User</h2>
          <p className="mt-1 text-sm text-gray-400">Akun Admin.</p>
        </div>
      </div>
    </main>
  );
}