import css from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/notes/filter/all">Всі нотатки</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}