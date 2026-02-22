import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesByCategory from './Notes.client';
import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] ?? 'all';

  return {
    title: `NoteHub — ${tag} notes`,
    description: `Page with notes filtered by category: ${tag}`,
    openGraph: {
      title: `NoteHub — ${tag} notes`,
      description: `Page with notes filtered by category: ${tag}`,
      url: `https://notehub.com/notes/${tag}`,
      siteName: 'NoteHub - Your Personal Note Management App',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub - notes filtered by ${tag}`,
        },
      ],
      type: 'article',
    },
  };
}

export default async function NoteFilter({ params }: Props) {
  const { slug } = await params;
  const tag = slug?.[0] as NoteTag | 'all' | undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag, '', 1],
    queryFn: () => fetchNotes('', 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesByCategory tag={tag} />
    </HydrationBoundary>
  );
}