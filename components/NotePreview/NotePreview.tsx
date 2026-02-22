'use client';

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from '@/lib/api';
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();


  const { data: note, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id, // Запит виконується тільки якщо є id
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return <div className={css.container}>Завантаження...</div>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note?.title}</h2>
        </div>
        <p className={css.tag}>{note?.tag}</p>
        <p className={css.content}>{note?.content}</p>
        
        <div className={css.backlinkContainer}>
          <div className={css.link}>
            <button onClick={handleClose} className={css.backBtn}>
              Back to Notes
            </button>
          </div>
          <p className={css.date}>
            {note?.updatedAt ? note.updatedAt : note?.createdAt}
          </p>
        </div>
      </div>
    </div>
  );
}