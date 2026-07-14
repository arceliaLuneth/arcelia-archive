'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });

    router.push('/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-black text-white md:flex">
      <aside className="border-b border-white/10 p-6 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
        <h2 className="text-2xl font-bold">Admin Panel</h2>

        <nav className="mt-6 space-y-2 text-sm">
          <Link
            href="/admin"
            className="block rounded-lg px-3 py-2 hover:bg-white/10"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/archive"
            className="block rounded-lg px-3 py-2 hover:bg-white/10"
          >
            Archive
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="block w-full rounded-lg px-3 py-2 text-left hover:bg-white/10"
          >
            Logout
          </button>
        </nav>
      </aside>

      <section className="flex-1">{children}</section>
    </div>
  );
}