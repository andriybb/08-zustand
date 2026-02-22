"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";
import Link from "next/link";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (isError) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
	    <h2>{note?.title}</h2>
	  </div>
      <p className={css.tag}>{note?.tag}</p>
	  <p className={css.content}>{note?.content}</p>
    <div className={css.backlinkContainer}>
      <div className={css.link}><Link href="/notes" className={css.backLink}>Back to Notes</Link></div>
  	  <p className={css.date}>{note?.updatedAt ? note.updatedAt : note?.createdAt}</p>
    </div>
	</div>
</div>
  );
};


