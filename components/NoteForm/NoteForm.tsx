"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import toast from "react-hot-toast";
import css from "./NoteForm.module.css";
import { NoteTag } from "@/types/note";
import { useNoteDraftStore } from '@/lib/store/noteStore';
import { useRouter } from 'next/navigation';
interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,   
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };
  const mutation = useMutation({
    mutationFn: ({ title, content, tag }: { title: string; content: string; tag: NoteTag }) =>
      createNote(title, content, tag),
    onSuccess: () => {
      toast.success('Note created successfully');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.push('/notes/filter/all');
      onClose();
    },
    onError: () => {
      toast.error('Failed to create note');
    }
  });
  const handleCancel = () => router.push('/notes/filter/all');
  const handleSubmit = async (formData: FormData) => {
    const values = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as NoteTag,
    };

    mutation.mutate(values);
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input 
          id="title" 
          name="title" 
          required 
          minLength={3} 
          maxLength={50} 
          className={css.input} 
          placeholder="Enter title..."
          defaultValue={draft?.title} onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea 
          id="content" 
          name="content" 
          rows={8} 
          maxLength={500} 
          className={css.textarea} 
          placeholder="Enter content..."
          defaultValue={draft?.content} onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" className={css.select} defaultValue={draft?.tag || "Todo"} onChange={handleChange}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}