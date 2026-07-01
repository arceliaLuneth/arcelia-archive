'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Archive = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string | null;
  status: string;
};

export default function AdminArchivePage() {
  const [archives, setArchives] = useState<Archive[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function fetchArchives() {
    try {
      setLoading(true);
      setError('');

      const res = await fetch('/api/archive', {
        cache: 'no-store',
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || 'Gagal mengambil data');
      }

      setArchives(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArchives();
  }, []);

  async function handleDelete(id: number) {
    const ok = confirm('Hapus data ini?');
    if (!ok) return;

    try {
      const res = await fetch(`/api/archive/${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || 'Gagal menghapus');
      }

      fetchArchives();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Terjadi kesalahan');
    }
  }

  return (
    <main className="p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Archive</h1>
          <p className="mt-1 text-sm text-gray-400">
            Kelola data archive.
          </p>
        </div>

        <Link
          href="/admin/archive/create"
          className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/10"
        >
          + Tambah Archive
        </Link>
      </div>

      {loading && <p>Loading...</p>}

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-gray-300">
              <tr>
                <th className="px-4 py-3">Judul</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {archives.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-gray-400" colSpan={4}>
                    Belum ada data archive.
                  </td>
                </tr>
              ) : (
                archives.map((item) => (
                  <tr key={item.id} className="border-t border-white/10">
                    <td className="px-4 py-3 font-medium">{item.title}</td>
                    <td className="px-4 py-3">{item.category}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border border-white/15 px-2 py-1 text-xs">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <Link
                          href={`/admin/archive/edit/${item.id}`}
                          className="text-blue-400 hover:underline"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-400 hover:underline"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}