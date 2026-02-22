import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotePreviewPage from './NotePreview.client';
import { fetchNoteById } from '@/lib/api';

interface NoteModalProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NoteModal({ params }: NoteModalProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewPage />
    </HydrationBoundary>
  );
}