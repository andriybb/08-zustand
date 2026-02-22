export interface Note {
    id: string;
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
    createdAt: string;
    updatedAt: string;
  }
  
  export interface NoteResponse {
    notes: Note[];
  }

  export const NOTE_TAGS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const;
export type NoteTag = (typeof NOTE_TAGS)[number];