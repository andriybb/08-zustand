"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote }  from "@/lib/api";
import type {Note} from "@/types/note";
import toast from "react-hot-toast";
import css from "./NoteList.module.css";
import { useState } from "react";
import Link from "next/link";
interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);
 
  const { mutate: deleteNoteMutation, isPending } = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete note');
    },
    onSettled: () => {

      setDeletingId(null);
    }
  });

  return (
    <ul className={css.list}>
    {notes.map((note) => {
    
      const isThisNoteDeleting = deletingId === note.id;

      return (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <div className={css.link}><Link href={`/notes/${note.id}`} >View Details</Link></div>
            <button 
              className={css.button} 
              disabled={isPending} 
              onClick={() => {
                setDeletingId(note.id); 
                deleteNoteMutation(note.id);
              }}
            >
              {isThisNoteDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      );
    })}
  </ul>
);
}