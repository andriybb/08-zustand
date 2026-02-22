import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesByCategory from './Notes.client';
import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';

interface Props {
  params: Promise<{ slug: string[] }>;
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