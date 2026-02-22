import Link from 'next/link';
import css from './SidebarNotes.module.css';
import type { NoteTag } from '@/types/note';

const tags: (NoteTag | 'all')[] = ['all', 'Todo', 'Personal', 'Work', 'Meeting', 'Shopping'];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            <strong>{tag === 'all' ? 'All notes' : tag}</strong>
          </Link>
        </li>
      ))}
    </ul>
  );
}