import axios from "axios";
import { type Note, type NoteTag } from "@/types/note";

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

const API_BASE_URL = "https://notehub-public.goit.study/api/notes";

export async function fetchNotes(
    search: string,
    page: number,
    tag?: NoteTag | 'all',
  ): Promise<NoteResponse> {
    const response = await axios.get<NoteResponse>(API_BASE_URL, {
      params: {
        search,
        page,
        tag: tag === 'all' ? undefined : tag, 
      },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    });
    return response.data;
  }

export async function createNote(
  title: string,
  content: string,
  tag: NoteTag,
): Promise<Note> {
  const response = await axios.post<Note>(
    API_BASE_URL,
    { title, content, tag },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    },
  );
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(`${API_BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(`${API_BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
}