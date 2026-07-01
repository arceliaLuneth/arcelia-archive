import { db } from '@/lib/db';
import type { Archive, ArchiveInput } from '@/types/archive';

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function createUniqueSlug(title: string, excludeId?: number) {
  const base = slugify(title) || `archive-${Date.now()}`;
  let slug = base;
  let counter = 2;

  while (true) {
    const [rows] = excludeId
      ? await db.query(
          'SELECT id FROM archives WHERE slug = ? AND id <> ? LIMIT 1',
          [slug, excludeId]
        )
      : await db.query('SELECT id FROM archives WHERE slug = ? LIMIT 1', [slug]);

    const items = rows as Array<{ id: number }>;
    if (items.length === 0) return slug;

    slug = `${base}-${counter++}`;
  }
}

export async function getArchives() {
  const [rows] = await db.query('SELECT * FROM archives ORDER BY id DESC');
  return rows as Archive[];
}

export async function getArchiveById(id: number) {
  const [rows] = await db.query('SELECT * FROM archives WHERE id = ? LIMIT 1', [id]);
  const items = rows as Archive[];
  return items[0] ?? null;
}

export async function getArchiveBySlugOrId(identifier: string) {
  const value = identifier.trim();
  if (!value) return null;

  const [slugRows] = await db.query('SELECT * FROM archives WHERE slug = ? LIMIT 1', [
    value,
  ]);
  const slugItems = slugRows as Archive[];
  if (slugItems[0]) return slugItems[0];

  const numericId = Number(value);
  if (!Number.isNaN(numericId)) {
    const [idRows] = await db.query('SELECT * FROM archives WHERE id = ? LIMIT 1', [
      numericId,
    ]);
    const idItems = idRows as Archive[];
    return idItems[0] ?? null;
  }

  return null;
}

export async function createArchive(input: ArchiveInput) {
  const {
    title,
    category,
    description,
    content = '',
    image = null,
    status = 1,
  } = input;

  const slug = input.slug?.trim()
    ? await createUniqueSlug(input.slug)
    : await createUniqueSlug(title);

  const [result]: any = await db.execute(
    `INSERT INTO archives
      (title, slug, category, description, content, image, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [title, slug, category, description, content, image, status]
  );

  return result.insertId as number;
}

export async function updateArchive(id: number, input: ArchiveInput) {
  const {
    title,
    category,
    description,
    content = '',
    image = null,
    status = 1,
  } = input;

  const current = await getArchiveById(id);

  const slug = input.slug?.trim()
    ? await createUniqueSlug(input.slug, id)
    : current?.slug ?? (await createUniqueSlug(title, id));

  await db.execute(
    `UPDATE archives
     SET title = ?,
         slug = ?,
         category = ?,
         description = ?,
         content = ?,
         image = ?,
         status = ?,
         updated_at = NOW()
     WHERE id = ?`,
    [title, slug, category, description, content, image, status, id]
  );
}

export async function deleteArchive(id: number) {
  await db.execute('DELETE FROM archives WHERE id = ?', [id]);
}