export interface Archive {
  id: number;
  title: string;
  slug: string | null;
  category: string;
  description: string;
  content: string;
  image: string | null;
  status: string | number;
  created_at?: string;
  updated_at?: string;
}

export interface ArchiveInput {
  title: string;
  category: string;
  description: string;
  content: string;
  image?: string | null;
  status?: string | number;
  slug?: string;
}