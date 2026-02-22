
import { Metadata } from "next";
import css from "./CreateNote.module.css";
import CreateNoteClient from "./CreateNoteClient";

export const metadata: Metadata = {
  title: "Create Note - NoteHub",
  description: "Create a new note in NoteHub, your personal note management app.",
  openGraph: {
    title: `Create Note - NoteHub`,
    description: "Create a new note in NoteHub, your personal note management app.",
    url: `https://notehub.com/`,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: "Create Note - NoteHub",
      },
    ],
    type: 'article',
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
    <div className={css.container}>
      <h1 className={css.title}>Create note</h1>
      <CreateNoteClient />
    </div>
  </main>
  );
}