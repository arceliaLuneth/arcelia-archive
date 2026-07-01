'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditArchivePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    content: '',
    image: '',
    status: 'publish',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArchive = async () => {
      try {
        const res = await fetch(`/api/archive/${id}`, {
          cache: 'no-store',
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
          throw new Error(result.message || 'Gagal mengambil data');
        }

        const item = result.data;

        setForm({
          title: item.title || '',
          category: item.category || '',
          description: item.description || '',
          content: item.content || '',
          image: item.image || '',
          status: item.status || 'publish',
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArchive();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const res = await fetch(`/api/archive/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || 'Gagal mengupdate archive');
      }

      router.push('/admin/archive');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <main className="p-6">Loading...</main>;
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Edit Archive</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-white/10 p-6"
      >
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Judul"
          className="w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 outline-none"
          required
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Kategori"
          className="w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 outline-none"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Deskripsi"
          rows={5}
          className="w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 outline-none"
          required
        />

        <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Isi artikel lengkap..."
        rows={12}
        className="w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 outline-none"
        required
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL / path"
          className="w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 outline-none"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full rounded-lg border border-white/15 bg-black px-4 py-3 outline-none"
        >
          <option value="publish">Publish</option>
          <option value="draft">Draft</option>
        </select>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg border border-white/20 px-4 py-2 font-medium hover:bg-white/10 disabled:opacity-60"
          >
            {saving ? 'Menyimpan...' : 'Update'}
          </button>

          <button
            type="button"
            onClick={() => router.push('/admin/archive')}
            className="rounded-lg border border-white/20 px-4 py-2 font-medium hover:bg-white/10"
          >
            Batal
          </button>
        </div>
      </form>
    </main>
  );
}